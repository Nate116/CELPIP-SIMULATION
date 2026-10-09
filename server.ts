import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));

// Server-side Google GenAI initialization with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. WRITING EVALUATION (Dual-Pass AI Grader)
app.post('/api/evaluate-writing', async (req: Request, res: Response) => {
  try {
    const { taskNumber, promptInstructions, userText } = req.body;

    if (!userText || typeof userText !== 'string') {
      return res.status(400).json({ error: 'userText is required' });
    }

    const systemPrompt = `You are an official senior Canadian Language Benchmark (CLB) examiner and CELPIP-General writing assessor.
Evaluate the candidate's response against the 4 official CELPIP writing criteria:
1. Content and Coherence (paragraph progression, clarity, idea development)
2. Vocabulary (lexical range, Canadian idioms, precision, collocation)
3. Readability and Grammar (syntactic variety, accuracy, punctuation, cohesion)
4. Task Fulfillment (150-200 word count compliance, register, addressing all prompt bullets or survey options)

Calibrate your scoring strictly between Band 1 and 12 (mapping to CLB 1-12).
Provide sentence-level annotations highlighting specific grammatical, lexical, or register flaws.
Provide an exemplary Band-12 model response and an improved "Level-Up" version of the user's submission.`;

    const prompt = `Assessment Target: CELPIP Writing Task ${taskNumber}
Prompt Context & Instructions:
${promptInstructions}

Candidate Submission:
"${userText}"

Execute a thorough dual-pass assessment and return a structured JSON response matching the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallBand: { type: Type.INTEGER, description: 'Estimated CELPIP band 1-12' },
            clbLevel: { type: Type.INTEGER, description: 'CLB equivalent level 1-12' },
            confidenceRating: { type: Type.STRING, description: 'e.g. High (94%)' },
            wordCount: { type: Type.INTEGER },
            wordCountStatus: { type: Type.STRING, description: 'Optimal (150-200 range), Slightly Short, Too Short, or Over Limit' },
            registerAnalysis: { type: Type.STRING },
            criteriaScores: {
              type: Type.OBJECT,
              properties: {
                contentAndCoherence: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                vocabulary: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                readabilityAndGrammar: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                taskFulfillment: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                }
              },
              required: ['contentAndCoherence', 'vocabulary', 'readabilityAndGrammar', 'taskFulfillment']
            },
            sentenceAnnotations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  originalSentence: { type: Type.STRING },
                  correctedSentence: { type: Type.STRING },
                  category: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['originalSentence', 'correctedSentence', 'category', 'explanation']
              }
            },
            band12ModelAnswer: { type: Type.STRING },
            levelUpVersion: { type: Type.STRING }
          },
          required: [
            'overallBand',
            'clbLevel',
            'confidenceRating',
            'wordCount',
            'wordCountStatus',
            'registerAnalysis',
            'criteriaScores',
            'sentenceAnnotations',
            'band12ModelAnswer',
            'levelUpVersion'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: unknown) {
    console.error('Error in evaluate-writing:', error);
    res.status(500).json({ error: 'Failed to evaluate writing' });
  }
});

// 2. SPEAKING EVALUATION (Fluency, Fillers, Time Management & Rubric)
app.post('/api/evaluate-speaking', async (req: Request, res: Response) => {
  try {
    const { taskNumber, situation, transcript, durationSeconds } = req.body;

    const systemPrompt = `You are a certified senior CELPIP-General speaking examiner and Canadian Language Benchmark (CLB) assessor.
Assess the candidate transcript and delivery analytics across the official CELPIP speaking criteria:
1. Content and Coherence (logic, discourse structure, topic development)
2. Vocabulary Range (idioms, precision, collocations)
3. Fluency and Pace (rhythm, pauses, filler words: um, uh, like, you know)
4. Grammar and Syntax (structural variety, conditional clauses, accuracy)
5. Task Fulfillment (answering prompt constraints, register, time utilization)

Map strictly to CELPIP levels 1-12 and CLB 1-12.`;

    const prompt = `Assessment: CELPIP Speaking Task ${taskNumber}
Scenario & Situation:
${situation}

Candidate Spoken Transcript:
"${transcript || '(Silence / Inaudible speech)'}"

Recorded Duration: ${durationSeconds || 0} seconds (Target: ${(taskNumber === 1 || taskNumber === 7) ? 90 : 60} seconds)

Perform evaluation and return JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallBand: { type: Type.INTEGER, description: 'Band 1-12' },
            clbLevel: { type: Type.INTEGER },
            confidenceRating: { type: Type.STRING },
            transcript: { type: Type.STRING },
            timeManagement: {
              type: Type.OBJECT,
              properties: {
                speakingDurationSeconds: { type: Type.INTEGER },
                targetDurationSeconds: { type: Type.INTEGER },
                efficiencyRating: { type: Type.STRING },
                feedback: { type: Type.STRING }
              },
              required: ['speakingDurationSeconds', 'targetDurationSeconds', 'efficiencyRating', 'feedback']
            },
            fillerAnalysis: {
              type: Type.OBJECT,
              properties: {
                totalFillerCount: { type: Type.INTEGER },
                fillersDetected: { type: Type.ARRAY, items: { type: Type.STRING } },
                fillersPerMinute: { type: Type.NUMBER },
                impactLevel: { type: Type.STRING }
              },
              required: ['totalFillerCount', 'fillersDetected', 'fillersPerMinute', 'impactLevel']
            },
            criteriaScores: {
              type: Type.OBJECT,
              properties: {
                contentAndCoherence: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                vocabularyRange: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                fluencyAndPace: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                grammarAndSyntax: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                },
                taskFulfillment: {
                  type: Type.OBJECT,
                  properties: { band: { type: Type.INTEGER }, feedback: { type: Type.STRING } },
                  required: ['band', 'feedback']
                }
              },
              required: ['contentAndCoherence', 'vocabularyRange', 'fluencyAndPace', 'grammarAndSyntax', 'taskFulfillment']
            },
            band12ModelResponse: { type: Type.STRING },
            keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            'overallBand',
            'clbLevel',
            'confidenceRating',
            'transcript',
            'timeManagement',
            'fillerAnalysis',
            'criteriaScores',
            'band12ModelResponse',
            'keyTakeaways'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: unknown) {
    console.error('Error in evaluate-speaking:', error);
    res.status(500).json({ error: 'Failed to evaluate speaking' });
  }
});

// 3. AUDIO TRANSCRIPTION (Using gemini-3.5-transcribe)
app.post('/api/transcribe-audio', async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'audioBase64 is required' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioBase64
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          { text: 'Transcribe this spoken response accurately. Do not add commentary or formatting. Output only the verbatim spoken transcript.' }
        ]
      }
    });

    res.json({ transcript: (response.text || '').trim() });
  } catch (error: unknown) {
    console.error('Error in transcribe-audio:', error);
    res.status(500).json({ error: 'Transcription failed', transcript: '' });
  }
});

// 4. TTS AUDIO GENERATION (Using gemini-3.8-flash-lite-tts)
app.post('/api/tts-speech', async (req: Request, res: Response) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text,
              speechMetadata: {
                style: 'Clear, natural Canadian English conversational tone'
              }
            }
          ]
        }
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audioDataUrl: `data:audio/wav;base64,${base64Audio}` });
    }
    res.status(500).json({ error: 'No audio data received' });
  } catch (error: unknown) {
    console.error('Error in tts-speech:', error);
    res.status(500).json({ error: 'TTS generation failed' });
  }
});

// START SERVER & MOUNT VITE MIDDLEWARE
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`CELPIP Master 12 full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer();
