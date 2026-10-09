import React, { useState, useEffect, useRef } from 'react';
import { Volume2, CheckCircle2, ArrowRight, Info, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ListeningPartData, QuestionItem, ExamDeliveryMode } from '../types/celpip';
import { audioEngine } from '../services/audioPlayer';

interface ListeningComponentProps {
  parts: ListeningPartData[];
  deliveryMode: ExamDeliveryMode;
  onComplete: (userAnswers: Record<string, string>, rawScore: number, totalQuestions: number) => void;
  fontSizeClass: string;
}

export const ListeningComponent: React.FC<ListeningComponentProps> = ({
  parts,
  deliveryMode,
  onComplete,
  fontSizeClass
}) => {
  const [currentPartIdx, setCurrentPartIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showPracticeFeedback, setShowPracticeFeedback] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number>(35);

  const audioControllerRef = useRef<{ stop: () => void } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPart = parts[currentPartIdx];
  const isPractice = currentPart.partNumber === 0;
  const currentQuestion: QuestionItem | undefined = currentPart?.questions[currentQuestionIdx];

  // Auto-start audio when entering a new part
  useEffect(() => {
    setAudioPlayed(false);
    setCurrentQuestionIdx(0);
    setShowPracticeFeedback(false);
    setQuestionTimeLeft(35);

    const introTimer = setTimeout(() => {
      startAudioPlayback();
    }, 1500);

    return () => {
      clearTimeout(introTimer);
      stopAudioPlayback();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentPartIdx]);

  // Question countdown timer once audio concludes
  useEffect(() => {
    if (audioPlayed && !isPractice) {
      setQuestionTimeLeft(35);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 35;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [audioPlayed, currentQuestionIdx, currentPartIdx]);

  const startAudioPlayback = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    audioControllerRef.current = audioEngine.playMultiSpeakerDialogue(
      currentPart.audioScript,
      (_idx, speaker) => {
        setActiveSpeaker(speaker);
      },
      () => {
        setIsPlayingAudio(false);
        setAudioPlayed(true);
        setActiveSpeaker('');
      }
    );
  };

  const stopAudioPlayback = () => {
    if (audioControllerRef.current) {
      audioControllerRef.current.stop();
      audioControllerRef.current = null;
    }
    audioEngine.stop();
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));

    if (isPractice) {
      setShowPracticeFeedback(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < currentPart.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      if (currentPartIdx < parts.length - 1) {
        setCurrentPartIdx((prev) => prev + 1);
      } else {
        calculateAndFinish();
      }
    }
  };

  const calculateAndFinish = () => {
    stopAudioPlayback();
    let score = 0;
    let total = 0;
    parts.forEach((p) => {
      if (p.partNumber !== 0) {
        p.questions.forEach((q) => {
          total++;
          if (userAnswers[q.id] === q.correctOptionId) {
            score++;
          }
        });
      }
    });
    onComplete(userAnswers, score, total);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${fontSizeClass}`}>
      {/* Top Banner: Part Information & Rules */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full uppercase tracking-wider">
              {isPractice ? 'Unscored Practice Task' : `Part ${currentPart.partNumber} of 6`}
            </span>
            <span className="text-xs text-slate-500 font-medium">CELPIP-General Listening</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{currentPart.title}</h2>
          <p className="text-xs text-slate-600 mt-0.5">{currentPart.instructions}</p>
        </div>

        {/* Audio Status Indicator */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 shrink-0">
          <motion.div
            animate={isPlayingAudio ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className={`p-2.5 rounded-xl ${isPlayingAudio ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-200 text-slate-600'}`}
          >
            <Volume2 className="w-5 h-5" />
          </motion.div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              {isPlayingAudio ? 'Audio is Playing...' : audioPlayed ? 'Audio Concluded' : 'Preparing Audio...'}
            </div>
            <div className="text-[11px] text-slate-500">
              {isPlayingAudio && activeSpeaker ? `Speaking: ${activeSpeaker}` : deliveryMode === 'exam' ? 'Plays once only' : 'Practice mode'}
            </div>
          </div>

          {deliveryMode === 'practice' && audioPlayed && !isPlayingAudio && (
            <motion.button
              whileHover={{ rotate: -20, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startAudioPlayback}
              className="ml-2 text-xs flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold p-1.5 hover:bg-sky-50 rounded-lg cursor-pointer"
              title="Replay Audio (Practice Mode only)"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Main Playing / Question Area */}
      <AnimatePresence mode="wait">
        {isPlayingAudio ? (
          /* Listening State: Focus on audio */
          <motion.div
            key="audio_playing"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 rounded-3xl p-10 text-white text-center shadow-xl border border-sky-800 space-y-6 relative overflow-hidden"
          >
            {/* Animated Glow Rings */}
            <div className="relative inline-flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl"
              />
              <div className="relative p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/15">
                <Volume2 className="w-12 h-12 text-sky-300" />
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Listen Carefully to the Audio</h3>
              <p className="text-xs md:text-sm text-sky-200/90 leading-relaxed">
                In the official CELPIP test, each audio clip will play only once. Questions will appear on your screen immediately after the dialogue finishes.
              </p>
            </div>

            {/* Dynamic Equalizer Waveform Bars */}
            <div className="flex justify-center items-end gap-1.5 h-14 pt-4">
              {[45, 80, 55, 95, 65, 85, 40, 100, 70, 90, 50, 75, 60, 85].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['20%', `${h}%`, '30%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + (i % 4) * 0.15,
                    ease: 'easeInOut',
                    delay: i * 0.05
                  }}
                  className="w-1.5 bg-gradient-to-t from-sky-500 to-indigo-300 rounded-full shadow-xs"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeSpeaker && (
                <motion.div
                  key={activeSpeaker}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="inline-block px-4 py-1.5 bg-sky-800/80 rounded-full text-xs font-semibold text-sky-200 border border-sky-600/30 shadow-xs"
                >
                  Current Speaker: <span className="text-white font-bold">{activeSpeaker}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Question State with Slide Transition */
          <motion.div
            key={`question_${currentQuestion?.id || currentQuestionIdx}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 md:p-8 space-y-6"
          >
            {/* Question Header & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {currentPart.questions.length}
                </span>
              </div>

              {!isPractice && (
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-slate-500">Time to Answer:</span>
                  <motion.span
                    animate={questionTimeLeft <= 10 ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className={`px-3 py-1 rounded-lg font-mono ${
                      questionTimeLeft <= 10
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {questionTimeLeft}s
                  </motion.span>
                </div>
              )}
            </div>

            {/* Prompt Text */}
            {currentQuestion && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  {currentQuestion.promptText}
                </h3>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((option, optIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === option.id;
                    const isPracticeCorrect = isPractice && showPracticeFeedback && option.isCorrect;
                    const isPracticeWrong = isPractice && showPracticeFeedback && isSelected && !option.isCorrect;

                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: optIdx * 0.05 }}
                        whileHover={{ scale: 1.008 }}
                        whileTap={{ scale: 0.995 }}
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50 text-sky-950 font-semibold shadow-xs ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        } ${isPracticeCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : ''} ${
                          isPracticeWrong ? 'border-rose-400 bg-rose-50 text-rose-950' : ''
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                            isSelected
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-slate-200 text-slate-700'
                          } ${isPracticeCorrect ? 'bg-emerald-600 text-white' : ''}`}
                        >
                          {option.id}
                        </span>
                        <div className="flex-1 text-sm md:text-base leading-relaxed">
                          {option.text}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Practice Mode Feedback Banner */}
                <AnimatePresence>
                  {isPractice && showPracticeFeedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mt-4 space-y-2 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
                        <Info className="w-4 h-4 text-sky-600" />
                        Practice Question Explanation:
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {currentQuestion.options.find((o) => o.isCorrect)?.rationale}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextQuestion}
                disabled={!userAnswers[currentQuestion?.id || '']}
                className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl font-semibold text-sm shadow-md shadow-sky-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <span>
                  {currentQuestionIdx < currentPart.questions.length - 1
                    ? 'Next Question'
                    : currentPartIdx < parts.length - 1
                    ? 'Next Listening Part'
                    : 'Submit Listening'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
