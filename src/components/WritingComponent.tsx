import React, { useState, useEffect, useRef } from 'react';
import { PenTool, CheckCircle2, Clock, AlertCircle, Sparkles, Send, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WritingTaskData, WritingGradingResult, ExamDeliveryMode } from '../types/celpip';
import { geminiClientService } from '../services/geminiService';

interface WritingComponentProps {
  tasks: WritingTaskData[];
  deliveryMode: ExamDeliveryMode;
  onComplete: (userTexts: Record<string, string>, results: Record<string, WritingGradingResult>) => void;
  fontSizeClass: string;
}

export const WritingComponent: React.FC<WritingComponentProps> = ({
  tasks,
  deliveryMode,
  onComplete,
  fontSizeClass
}) => {
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [userTexts, setUserTexts] = useState<Record<string, string>>({
    w_task_1: '',
    w_task_2: ''
  });
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(27 * 60);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingProgressText, setGradingProgressText] = useState('');
  const [gradingResults, setGradingResults] = useState<Record<string, WritingGradingResult>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTask = tasks[currentTaskIdx];
  const currentText = userTexts[currentTask?.taskId] || '';

  // Live word counter
  const words = currentText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isWordCountOptimal = wordCount >= 150 && wordCount <= 200;
  const isWordCountSlightlyOff = (wordCount >= 130 && wordCount < 150) || (wordCount > 200 && wordCount <= 220);
  const wordProgressPercent = Math.min(100, Math.round((wordCount / 200) * 100));

  useEffect(() => {
    if (currentTask) {
      setTimeLeftSeconds(currentTask.timeAllowedMinutes * 60);
    }

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          handleNextTask();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentTaskIdx]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserTexts((prev) => ({
      ...prev,
      [currentTask.taskId]: e.target.value
    }));
  };

  const handleNextTask = async () => {
    if (currentTaskIdx < tasks.length - 1) {
      setCurrentTaskIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      await evaluateAllAndFinish();
    }
  };

  const evaluateAllAndFinish = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGrading(true);
    setGradingProgressText('Executing Dual-Pass Diagnostic & Holistic Assessment via Gemini...');

    const results: Record<string, WritingGradingResult> = {};

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const text = userTexts[task.taskId] || '';
      setGradingProgressText(`Evaluating Writing Task ${task.taskNumber}: ${task.title}...`);

      const res = await geminiClientService.gradeWriting(
        task.taskNumber,
        `${task.instructions}\n${task.promptContext}\n${task.bulletPoints?.join('\n') || ''}`,
        text
      );
      results[task.taskId] = res;
    }

    setGradingResults(results);
    setIsGrading(false);
    onComplete(userTexts, results);
  };

  if (isGrading) {
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
            className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl"
          />
          <div className="relative p-5 bg-sky-50 text-sky-600 rounded-3xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Calibrating Writing Scores</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {gradingProgressText}
          </p>
        </div>

        {/* Animated Progress Shimmer */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-6 ${fontSizeClass}`}>
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
              Writing Task {currentTask.taskNumber} of {tasks.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">CELPIP-General Writing</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{currentTask.title}</h2>
          <p className="text-xs text-slate-600 mt-0.5">Target: 150 – 200 words | Exam Mode: No spellcheck</p>
        </div>

        {/* Timer & Word Count Bar */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Word Count Progress */}
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Word Count</div>
            <motion.div
              key={wordCount}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={`text-base font-bold ${
                isWordCountOptimal
                  ? 'text-emerald-600'
                  : isWordCountSlightlyOff
                  ? 'text-amber-600'
                  : 'text-slate-800'
              }`}
            >
              {wordCount} <span className="text-xs font-normal text-slate-400">/ 150-200</span>
            </motion.div>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-2xl text-slate-800 font-bold text-sm font-mono shadow-2xs">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>
        </div>
      </motion.div>

      {/* Split-Screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`writing_task_${currentTaskIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left Pane: Prompt */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xs border border-slate-200 p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-slate-800 font-bold">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-base md:text-lg">Prompt Instructions</h3>
            </div>

            <div className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {currentTask.instructions}
            </div>

            {/* Task 1 Mandatory Bullets */}
            {currentTask.bulletPoints && currentTask.bulletPoints.length > 0 && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2.5 shadow-2xs">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Mandatory Content to Address:
                </span>
                <ul className="space-y-2 text-xs md:text-sm text-amber-950">
                  {currentTask.bulletPoints.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Task 2 Option A vs Option B Cards */}
            {currentTask.optionA && currentTask.optionB && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Survey Options:
                </span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs md:text-sm">
                    {currentTask.optionA.title}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">{currentTask.optionA.description}</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs md:text-sm">
                    {currentTask.optionB.title}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">{currentTask.optionB.description}</div>
                </div>
              </div>
            )}

            {/* Practice Mode Tips */}
            {deliveryMode === 'practice' && (
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl space-y-2 text-xs text-sky-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lightbulb className="w-4 h-4 text-sky-600" /> Practice Strategy:
                </div>
                <p className="leading-relaxed">
                  Structure your response into 3-4 distinct paragraphs. Avoid contractions (use &ldquo;cannot&rdquo; instead of &ldquo;can&rsquo;t&rdquo;). Aim for around 175 words to stay safely within the optimal 150-200 zone.
                </p>
              </div>
            )}
          </div>

          {/* Right Pane: Text Editor */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xs border border-slate-200 p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Candidate Response Box
              </span>

              {/* Word status badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordCount < 150 ? 'short' : wordCount <= 200 ? 'optimal' : 'over'}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  {wordCount < 150 ? (
                    <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-medium border border-amber-200 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Need {150 - wordCount} more words
                    </span>
                  ) : wordCount <= 200 ? (
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Length (150–200)
                    </span>
                  ) : (
                    <span className="text-xs text-rose-700 bg-rose-50 px-3 py-1 rounded-full font-medium border border-rose-200 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {wordCount - 200} words over limit
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <textarea
              value={currentText}
              onChange={handleTextChange}
              placeholder={
                currentTask.taskNumber === 1
                  ? 'Dear Building Management,\n\nI am writing to bring to your attention...'
                  : 'Taking both survey options into consideration, I strongly endorse Option A...'
              }
              spellCheck={deliveryMode === 'practice'}
              className="w-full h-80 md:h-96 p-4 rounded-2xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-500/20 text-slate-900 placeholder-slate-400 font-sans text-sm md:text-base leading-relaxed resize-none transition outline-none"
            />

            {/* Action Row */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                Responses auto-saved locally. Pressing next will advance to the next task.
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextTask}
                disabled={wordCount < 20}
                className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl font-semibold text-sm shadow-md shadow-sky-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <span>{currentTaskIdx < tasks.length - 1 ? 'Save & Start Task 2' : 'Submit Writing Section'}</span>
                {currentTaskIdx < tasks.length - 1 ? <ArrowRight className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
