import React, { useState, useEffect, useRef } from 'react';
import { Mic, Clock, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeakingTaskData, SpeakingGradingResult, ExamDeliveryMode } from '../types/celpip';
import { audioEngine } from '../services/audioPlayer';
import { geminiClientService } from '../services/geminiService';

interface SpeakingComponentProps {
  tasks: SpeakingTaskData[];
  deliveryMode: ExamDeliveryMode;
  onComplete: (audioRecordings: Record<string, string>, results: Record<string, SpeakingGradingResult>) => void;
  fontSizeClass: string;
}

type SpeakingPhase = 'intro' | 'preparing' | 'recording' | 'finished_task';

export const SpeakingComponent: React.FC<SpeakingComponentProps> = ({
  tasks,
  deliveryMode,
  onComplete,
  fontSizeClass
}) => {
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [phase, setPhase] = useState<SpeakingPhase>('intro');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [isProcessingGrading, setIsProcessingGrading] = useState(false);
  const [gradingProgressText, setGradingProgressText] = useState('');
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [_speakingResults, setSpeakingResults] = useState<Record<string, SpeakingGradingResult>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentTask = tasks[currentTaskIdx];
  const isPractice = currentTask.taskNumber === 0;

  useEffect(() => {
    return () => {
      stopRecordingCleanup();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    setPhase('preparing');
    setSecondsRemaining(currentTask.preparationSeconds);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          transitionToRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentTaskIdx]);

  const transitionToRecording = async () => {
    await audioEngine.playOfficialBeep();

    setPhase('recording');
    setSecondsRemaining(currentTask.speakingSeconds);
    await startMicrophoneRecording();

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          finishCurrentTaskRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startMicrophoneRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioUrls((prev) => ({
          ...prev,
          [currentTask.taskId]: audioUrl
        }));

        geminiClientService.transcribeAudioBlob(audioBlob).then((t) => {
          setTranscripts((prev) => ({
            ...prev,
            [currentTask.taskId]: t
          }));
        });
      };

      mediaRecorder.start(250);
      setupWaveformVisualizer(stream);
    } catch (err) {
      console.warn('Could not access microphone during test:', err);
    }
  };

  const setupWaveformVisualizer = (stream: MediaStream) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWaveform = () => {
        animFrameRef.current = requestAnimationFrame(drawWaveform);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = '#0f172a';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          // Gradient bar colors
          const gradient = canvasCtx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
          gradient.addColorStop(0, '#38bdf8');
          gradient.addColorStop(1, '#6366f1');

          canvasCtx.fillStyle = gradient;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      drawWaveform();
    } catch {
      // Ignore visualizer errors
    }
  };

  const stopRecordingCleanup = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const finishCurrentTaskRecording = () => {
    stopRecordingCleanup();
    setPhase('finished_task');

    if (deliveryMode === 'exam') {
      setTimeout(() => {
        handleAdvanceNext();
      }, 1500);
    }
  };

  const handleAdvanceNext = async () => {
    if (currentTaskIdx < tasks.length - 1) {
      setCurrentTaskIdx((prev) => prev + 1);
    } else {
      await evaluateAllSpeakingAndFinish();
    }
  };

  const evaluateAllSpeakingAndFinish = async () => {
    setIsProcessingGrading(true);
    setGradingProgressText('AI Audio Evaluation & Filler Analysis via Gemini...');

    const results: Record<string, SpeakingGradingResult> = {};

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.taskNumber === 0) continue;

      setGradingProgressText(`Grading Speaking Task ${task.taskNumber}: ${task.title}...`);
      const transcript = transcripts[task.taskId] || '';
      const recordedDuration = task.speakingSeconds;

      const res = await geminiClientService.gradeSpeaking(
        task.taskNumber,
        task.situation,
        transcript,
        recordedDuration
      );
      results[task.taskId] = res;
    }

    setSpeakingResults(results);
    setIsProcessingGrading(false);
    onComplete(audioUrls, results);
  };

  if (isProcessingGrading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xl max-w-xl mx-auto space-y-6 relative overflow-hidden"
      >
        <div className="relative inline-flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-indigo-400/20 blur-xl"
          />
          <div className="relative p-5 bg-indigo-50 text-indigo-600 rounded-3xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Assessing Spoken Delivery</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {gradingProgressText}
          </p>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${fontSizeClass}`}>
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-wider">
              {isPractice ? 'Practice Task' : `Speaking Task ${currentTask.taskNumber} of 8`}
            </span>
            <span className="text-xs text-slate-500 font-medium">CELPIP-General Speaking</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{currentTask.title}</h2>
          <p className="text-xs text-slate-600 mt-0.5">{currentTask.instructions}</p>
        </div>

        {/* Phase Badge & Countdown */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.div
            animate={phase === 'recording' ? { scale: [1, 1.04, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2 text-sm font-bold shadow-xs ${
              phase === 'preparing'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : phase === 'recording'
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {phase === 'preparing' ? (
              <>
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Preparation: {secondsRemaining}s</span>
              </>
            ) : phase === 'recording' ? (
              <>
                <Mic className="w-4 h-4 text-rose-600" />
                <span>Recording: {secondsRemaining}s</span>
              </>
            ) : (
              <span>Recording Completed</span>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Situation & Guidance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`speaking_task_${currentTaskIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 md:p-8 space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Prompt Situation
            </h3>
            <p className="text-base md:text-lg text-slate-900 font-medium leading-relaxed">
              {currentTask.situation}
            </p>
          </div>

          {/* Image Prompts (Tasks 3, 4, 5, 8) */}
          {currentTask.imagePrompt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-900 text-white space-y-2 shadow-sm"
            >
              <div className="p-3.5 bg-slate-800 flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-sky-400" /> Visual Context
                </span>
                <span>{currentTask.imagePrompt.alt}</span>
              </div>
              <div className="relative max-h-72 flex justify-center bg-black/40 overflow-hidden">
                <img
                  src={currentTask.imagePrompt.url}
                  alt={currentTask.imagePrompt.alt}
                  className="max-h-72 object-contain"
                  loading="eager"
                />
              </div>
              <div className="p-3.5 bg-slate-800/90 text-xs text-slate-300">
                <span className="font-bold text-sky-300">Scene Description: </span>
                {currentTask.imagePrompt.description}
              </div>
            </motion.div>
          )}

          {/* Task 5 Comparison Options */}
          {currentTask.comparisonOptions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl space-y-2">
                <div className="font-bold text-sky-950 text-sm">
                  {currentTask.comparisonOptions.option1.title}
                </div>
                <ul className="text-xs text-sky-900 space-y-1">
                  {currentTask.comparisonOptions.option1.details.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="font-bold text-slate-900 text-sm">
                  {currentTask.comparisonOptions.option2.title}
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  {currentTask.comparisonOptions.option2.details.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Guidance Questions */}
          {currentTask.guidanceQuestions && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs md:text-sm text-slate-700">
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                Points to consider:
              </span>
              <ul className="space-y-1.5 list-disc list-inside">
                {currentTask.guidanceQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Audio Recording Waveform Visualizer */}
          {phase === 'recording' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-5 bg-slate-900 rounded-3xl space-y-3 shadow-md"
            >
              <div className="flex items-center justify-between text-xs text-sky-300 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  Live Microphone Stream
                </span>
                <span>Speak clearly into your microphone</span>
              </div>
              <canvas ref={canvasRef} width={600} height={70} className="w-full h-18 rounded-xl" />
            </motion.div>
          )}

          {/* Finished / Playback State */}
          {phase === 'finished_task' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <Mic className="w-4 h-4 text-emerald-600" />
                Recording Saved Successfully
              </div>
              {audioUrls[currentTask.taskId] && (
                <div className="flex items-center gap-3">
                  <audio controls src={audioUrls[currentTask.taskId]} className="w-full max-w-md h-10" />
                </div>
              )}
              <p className="text-xs text-emerald-700">
                Your audio has been captured and submitted for CLB Band 11-12 criteria scoring.
              </p>
            </motion.div>
          )}

          {/* Action Row */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              {phase === 'preparing'
                ? 'Prepare your points. Recording will start automatically when the timer reaches zero.'
                : phase === 'recording'
                ? 'Speak until the timer ends.'
                : 'Task completed.'}
            </div>

            {phase === 'finished_task' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdvanceNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                <span>{currentTaskIdx < tasks.length - 1 ? 'Next Speaking Task' : 'Submit Speaking Section'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
