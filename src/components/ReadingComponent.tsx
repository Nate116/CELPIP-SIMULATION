import React, { useState } from 'react';
import { BookOpen, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReadingPartData, ExamDeliveryMode } from '../types/celpip';

interface ReadingComponentProps {
  parts: ReadingPartData[];
  deliveryMode: ExamDeliveryMode;
  onComplete: (userAnswers: Record<string, string>, rawScore: number, totalQuestions: number) => void;
  fontSizeClass: string;
}

export const ReadingComponent: React.FC<ReadingComponentProps> = ({
  parts,
  deliveryMode: _deliveryMode,
  onComplete,
  fontSizeClass
}) => {
  const [currentPartIdx, setCurrentPartIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const currentPart = parts[currentPartIdx];

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextPart = () => {
    if (currentPartIdx < parts.length - 1) {
      setCurrentPartIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateAndFinish();
    }
  };

  const handlePrevPart = () => {
    if (currentPartIdx > 0) {
      setCurrentPartIdx((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateAndFinish = () => {
    let score = 0;
    let total = 0;
    parts.forEach((p) => {
      p.questions.forEach((q) => {
        total++;
        if (userAnswers[q.id] === q.correctOptionId) {
          score++;
        }
      });
    });
    onComplete(userAnswers, score, total);
  };

  const answeredCountForPart = currentPart.questions.filter((q) => !!userAnswers[q.id]).length;
  const progressPercent = Math.round((answeredCountForPart / currentPart.questions.length) * 100);

  return (
    <div className={`space-y-6 ${fontSizeClass}`}>
      {/* Top Part Header with Animated Progress */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wider">
              Part {currentPart.partNumber} of {parts.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">CELPIP-General Reading</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{currentPart.title}</h2>
          <p className="text-xs text-slate-600 mt-0.5">{currentPart.instructions}</p>
        </div>

        {/* Progress summary for this part */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-700">Questions Answered</div>
            <div className="text-sm font-bold text-indigo-600">
              {answeredCountForPart} of {currentPart.questions.length}
            </div>
          </div>
          <motion.div
            key={progressPercent}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-sm shadow-xs"
          >
            {progressPercent}%
          </motion.div>
        </div>
      </motion.div>

      {/* Split-Screen with AnimatePresence on Part Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`part_${currentPartIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left Pane: Reading Passage */}
          <div className="lg:col-span-6 bg-white rounded-3xl shadow-xs border border-slate-200 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-210px)] sticky top-20">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                {currentPart.passageTitle}
              </h3>
            </div>

            {/* Diagram Display if Part 2 */}
            {currentPart.diagram && (
              <div className="border border-indigo-200 rounded-2xl overflow-hidden bg-indigo-50/40 text-xs md:text-sm shadow-xs">
                <div className="bg-indigo-700 text-white font-bold p-3">
                  {currentPart.diagram.title}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-100/80 border-b border-indigo-200 text-indigo-950 font-semibold">
                        {currentPart.diagram.columns?.map((c, i) => (
                          <th key={i} className="p-2.5 border-r border-indigo-200 last:border-r-0">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentPart.diagram.rows?.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-indigo-100 bg-white hover:bg-indigo-50/50">
                          <td className="p-2.5 font-bold text-slate-800 border-r border-indigo-100">
                            {row.label}
                          </td>
                          {row.cells.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-slate-700 border-r border-indigo-100 last:border-r-0">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {currentPart.diagram.bulletPoints && (
                  <div className="p-3 bg-white border-t border-indigo-100 space-y-1">
                    {currentPart.diagram.bulletPoints.map((b, i) => (
                      <div key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {b}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Passage Text */}
            <div className="space-y-4 text-slate-800 text-sm md:text-base leading-relaxed whitespace-pre-line font-serif">
              {currentPart.passageText}
            </div>
          </div>

          {/* Right Pane: Questions List */}
          <div className="lg:col-span-6 space-y-4">
            {currentPart.questions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isActive = activeQuestionId === q.id;

              return (
                <motion.div
                  key={q.id}
                  id={`q_${q.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`bg-white rounded-3xl shadow-xs border p-6 transition-all space-y-4 ${
                    isActive
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : isAnswered
                      ? 'border-slate-200 bg-slate-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Question {idx + 1} of {currentPart.questions.length}
                    </span>
                    {isAnswered && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-600"
                      >
                        <Check className="w-3.5 h-3.5" /> Answered
                      </motion.span>
                    )}
                  </div>

                  {/* Prompt */}
                  <p className="font-semibold text-slate-900 text-sm md:text-base leading-snug">
                    {q.promptText}
                  </p>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((option) => {
                      const isSelected = userAnswers[q.id] === option.id;

                      return (
                        <motion.button
                          key={option.id}
                          type="button"
                          whileHover={{ scale: 1.008 }}
                          whileTap={{ scale: 0.995 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAnswer(q.id, option.id);
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs md:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-500'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {option.id}
                          </span>
                          <div className="flex-1 leading-relaxed">{option.text}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom Navigation */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center justify-between shadow-xs">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevPart}
                disabled={currentPartIdx === 0}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Part
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextPart}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <span>{currentPartIdx < parts.length - 1 ? 'Next Reading Part' : 'Submit Reading Section'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
