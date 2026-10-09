import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Mic, Volume2, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../services/audioPlayer';

interface HeadsetCheckModalProps {
  isOpen: boolean;
  onProceed: () => void;
  onClose?: () => void;
  requiredComponents: ('audio' | 'mic')[];
}

export const HeadsetCheckModal: React.FC<HeadsetCheckModalProps> = ({
  isOpen,
  onProceed,
  onClose,
  requiredComponents
}) => {
  const [audioTested, setAudioTested] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [micTested, setMicTested] = useState(false);
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [audioVolumeLevel, setAudioVolumeLevel] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopMicCheck();
    };
  }, []);

  const testAudioPlayback = async () => {
    setIsPlayingAudio(true);
    await audioEngine.playOfficialBeep();
    setTimeout(() => {
      setIsPlayingAudio(false);
      setAudioTested(true);
    }, 800);
  };

  const startMicCheck = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsRecordingMic(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioVolumeLevel(normalized);

        if (normalized > 15) {
          setMicTested(true);
        }

        animFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (err) {
      console.error('Mic access error:', err);
      setMicError('Microphone access was denied or no device was detected. Please verify your browser permissions.');
      setMicTested(true);
    }
  };

  const stopMicCheck = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsRecordingMic(false);
  };

  const isReady =
    (!requiredComponents.includes('audio') || audioTested) &&
    (!requiredComponents.includes('mic') || micTested || micError !== null);

  const handleFinish = () => {
    stopMicCheck();
    onProceed();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-700 via-indigo-800 to-slate-900 p-6 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  className="p-3 bg-white/10 rounded-2xl backdrop-blur-md"
                >
                  <Headphones className="w-7 h-7 text-sky-200" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">CELPIP Equipment Check</h2>
                  <p className="text-sky-200 text-xs">Testing your headset and microphone for exam fidelity</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Step 1: Headset Audio */}
              {requiredComponents.includes('audio') && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">Headset Sound Test</span>
                    </div>
                    {audioTested && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    Click the button below to play the official exam sound cue. Ensure you hear the audio clearly through both earpieces.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={testAudioPlayback}
                    disabled={isPlayingAudio}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl text-sm font-medium transition cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    <Play className="w-4 h-4" />
                    {isPlayingAudio ? 'Playing Tone...' : audioTested ? 'Play Test Sound Again' : 'Play Test Sound'}
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Microphone */}
              {requiredComponents.includes('mic') && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                        <Mic className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">Microphone Input Test</span>
                    </div>
                    {micTested && !micError && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mic Detected
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    Click to activate your microphone, speak a sentence (e.g. &ldquo;Testing microphone for CELPIP speaking&rdquo;), and check that the green meter moves.
                  </p>

                  {micError && (
                    <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                      <span>{micError}</span>
                    </div>
                  )}

                  {/* Volume Meter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Input Sensitivity</span>
                      <span>{audioVolumeLevel}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          audioVolumeLevel > 60
                            ? 'bg-rose-500'
                            : audioVolumeLevel > 15
                            ? 'bg-emerald-500'
                            : 'bg-slate-400'
                        }`}
                        animate={{ width: `${Math.max(4, audioVolumeLevel)}%` }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    </div>
                  </div>

                  {!isRecordingMic ? (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startMicCheck}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-medium transition cursor-pointer shadow-xs"
                    >
                      <Mic className="w-4 h-4" />
                      Start Microphone Check
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={stopMicCheck}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition cursor-pointer"
                    >
                      Stop Test (Level Verified)
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3">
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <motion.button
                whileHover={isReady ? { scale: 1.02 } : {}}
                whileTap={isReady ? { scale: 0.98 } : {}}
                onClick={handleFinish}
                disabled={!isReady}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-sky-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Start Assessment
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
