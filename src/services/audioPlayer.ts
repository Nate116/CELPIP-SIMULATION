/**
 * Audio Player & Synthesis Engine
 * Features:
 * - Exam sound effects (Official CELPIP start/stop beep, audio chime)
 * - Multi-speaker Web Speech API synthesizer with Canadian/North American voices
 * - Remote audio / Base64 WAV playback
 * - One-play enforcement for Listening exam mode
 */

import { SpeakerTurn } from '../types/celpip';

import { audioCache } from './audioCache';
import { geminiClientService } from './geminiService';

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private speechUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Official CELPIP Speaking Task "Beep" Tone
   * Frequency: 950Hz, Duration: 600ms, smooth gain decay
   */
  public playOfficialBeep(): Promise<void> {
    return new Promise((resolve) => {
      try {
        const ctx = this.getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, ctx.currentTime);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.6);

        setTimeout(() => resolve(), 600);
      } catch (err) {
        console.warn('Could not play beep:', err);
        resolve();
      }
    });
  }

  /**
   * End of preparation warning chime (double short beep)
   */
  public playWarningChime(): Promise<void> {
    return new Promise((resolve) => {
      try {
        const ctx = this.getAudioContext();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.frequency.setValueAtTime(800, now);
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.15);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.frequency.setValueAtTime(1100, now + 0.18);
        gain2.gain.setValueAtTime(0.25, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.35);

        setTimeout(() => resolve(), 380);
      } catch {
        resolve();
      }
    });
  }

  /**
   * Play base64 or URL audio file
   */
  public playAudioUrl(url: string, onEnded?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stop();
      const audio = new Audio(url);
      this.currentAudioElement = audio;

      audio.onended = () => {
        this.currentAudioElement = null;
        if (onEnded) onEnded();
        resolve();
      };

      audio.onerror = (e) => {
        this.currentAudioElement = null;
        reject(e);
      };

      audio.play().catch(reject);
    });
  }

  /**
   * Realistic Gemini 3.8 Flash TTS Dialogue Engine with IndexedDB Caching
   * Automatically generates high-quality multi-speaker audio on-demand
   * and replays instantly from local cache if already generated.
   */
  public playGeminiDialogue(
    partId: string,
    script: SpeakerTurn[],
    onStatusChange?: (status: 'generating' | 'cached' | 'playing' | 'fallback') => void,
    onProgress?: (turnIndex: number, currentSpeaker: string) => void,
    onComplete?: () => void
  ): { stop: () => void } {
    this.stop();
    let isCancelled = false;

    const executePlayback = async () => {
      // 1. Check if all turns are already cached in IndexedDB
      const cachedTurnUrls = await audioCache.getDialogueTurns(partId, script.length);

      let turnUrls: string[] = [];

      if (cachedTurnUrls && cachedTurnUrls.length === script.length) {
        if (onStatusChange) onStatusChange('cached');
        turnUrls = cachedTurnUrls;
      } else {
        // 2. Synthesize on-demand via Gemini 3.8 Flash TTS
        if (onStatusChange) onStatusChange('generating');
        const synthResult = await geminiClientService.synthesizeDialogue(script);

        if (isCancelled) return;

        if (synthResult && synthResult.length > 0) {
          // Cache each turn for instantaneous zero-latency replay
          for (const item of synthResult) {
            turnUrls[item.turnIndex] = item.audioDataUrl;
            await audioCache.setAudio(`${partId}_turn_${item.turnIndex}`, item.audioDataUrl, item.speaker);
          }
        } else {
          // Graceful fallback to client Web Speech API if backend TTS unavailable
          if (onStatusChange) onStatusChange('fallback');
          return this.playMultiSpeakerDialogue(script, onProgress, onComplete);
        }
      }

      if (isCancelled) return;
      if (onStatusChange) onStatusChange('playing');

      // 3. Play sequential dialogue turns with realistic conversational pauses
      for (let i = 0; i < turnUrls.length; i++) {
        if (isCancelled) break;
        const url = turnUrls[i];
        const turn = script[i];

        if (onProgress) onProgress(i, turn ? turn.speaker : '');

        if (url) {
          await new Promise<void>((resolve) => {
            this.playAudioUrl(url, () => {
              // Natural conversational cadence gap between speaker turns
              setTimeout(resolve, 450);
            }).catch(() => {
              // Fallback to brief timeout if audio element errors
              setTimeout(resolve, 800);
            });
          });
        }
      }

      if (!isCancelled && onComplete) {
        onComplete();
      }
    };

    executePlayback().catch((err) => {
      console.warn('Gemini dialogue playback issue, switching to fallback:', err);
      if (!isCancelled) {
        if (onStatusChange) onStatusChange('fallback');
        this.playMultiSpeakerDialogue(script, onProgress, onComplete);
      }
    });

    return {
      stop: () => {
        isCancelled = true;
        this.stop();
      }
    };
  }

  /**
   * Natural Multi-Speaker Dialogue Synthesizer (Web Speech API Fallback)
   * Alternates voices and pitch/rate per speaker turn
   */
  public playMultiSpeakerDialogue(
    script: SpeakerTurn[],
    onProgress?: (turnIndex: number, currentSpeaker: string) => void,
    onComplete?: () => void
  ): { stop: () => void } {
    this.stop();

    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported on this browser.');
      if (onComplete) onComplete();
      return { stop: () => {} };
    }

    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));

    let currentTurn = 0;
    let isCancelled = false;

    const playNextTurn = () => {
      if (isCancelled || currentTurn >= script.length) {
        this.isSpeaking = false;
        if (onComplete && !isCancelled) onComplete();
        return;
      }

      const turn = script[currentTurn];
      if (onProgress) onProgress(currentTurn, turn.speaker);

      const utterance = new SpeechSynthesisUtterance(turn.text);
      this.speechUtterance = utterance;

      const isFemale = turn.voiceGender === 'female' ||
        turn.speaker.toLowerCase().includes('evelyn') ||
        turn.speaker.toLowerCase().includes('chloe') ||
        turn.speaker.toLowerCase().includes('nadia') ||
        turn.speaker.toLowerCase().includes('brenda') ||
        turn.speaker.toLowerCase().includes('sandra') ||
        turn.speaker.toLowerCase().includes('woman');

      const preferredVoice = englishVoices.find(v => {
        const name = v.name.toLowerCase();
        if (isFemale) {
          return name.includes('female') || name.includes('samantha') || name.includes('victoria') || name.includes('zira');
        } else {
          return name.includes('male') || name.includes('david') || name.includes('alex') || name.includes('daniel');
        }
      }) || englishVoices[currentTurn % englishVoices.length] || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.98;
      utterance.pitch = isFemale ? 1.05 : 0.95;

      utterance.onend = () => {
        currentTurn++;
        setTimeout(() => {
          if (!isCancelled) playNextTurn();
        }, 450);
      };

      utterance.onerror = (e) => {
        console.warn('Utterance error:', e);
        currentTurn++;
        if (!isCancelled) playNextTurn();
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    };

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (!isCancelled) playNextTurn();
      };
    } else {
      playNextTurn();
    }

    return {
      stop: () => {
        isCancelled = true;
        this.stop();
      }
    };
  }

  public stop(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.speechUtterance = null;
  }
}

export const audioEngine = new AudioEngine();
