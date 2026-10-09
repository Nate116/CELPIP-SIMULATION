import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Volume2,
  PenTool,
  Mic,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Download,
  PlusCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TestAttemptRecord, SimulationPackage } from '../types/celpip';
import { CELPIP_BAND_DESCRIPTORS } from '../data/scoringRubrics';
import { storageService } from '../services/storageService';

interface ResultsViewProps {
  attempt: TestAttemptRecord;
  simulation: SimulationPackage;
  onRetake: () => void;
  onOpenScoreReportModal: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  attempt,
  simulation,
  onRetake,
  onOpenScoreReportModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listening' | 'reading' | 'writing' | 'speaking'>('overview');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [addedVocabSuccess, setAddedVocabSuccess] = useState<string | null>(null);

  const toggleQuestionExpand = (qId: string) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleAddMistakeToSrs = (term: string, explanation: string, contextSentence: string) => {
    storageService.addVocabularyMistake(term, explanation, contextSentence);
    setAddedVocabSuccess(term);
    setTimeout(() => setAddedVocabSuccess(null), 3000);
  };

  const overallDescriptor = CELPIP_BAND_DESCRIPTORS[attempt.overallCelpipBand] || CELPIP_BAND_DESCRIPTORS[9];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Top Score Banner */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="bg-gradient-to-r from-sky-800 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-sky-700/40 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-sky-200 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-sky-300" />
              <span>Official CELPIP Diagnostic Equating</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Assessment Score Summary</h1>
            <p className="text-sky-200 text-sm max-w-xl">
              {simulation.title} • Completed on {new Date(attempt.date).toLocaleDateString()}
            </p>
          </div>

          {/* Big Band Score Circle with Spring Bounce */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 350, damping: 20 }}
            className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/15 shadow-lg"
          >
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-sky-200 font-bold">Estimated Level</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                CELPIP {attempt.overallCelpipBand}
              </div>
              <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                CLB {attempt.overallClbLevel} Equivalent
              </div>
            </div>
          </motion.div>
        </div>

        {/* Band Descriptor Quote */}
        <div className="mt-6 pt-6 border-t border-white/10 text-xs md:text-sm text-sky-100/90 leading-relaxed">
          <span className="font-bold text-white">{overallDescriptor.title}: </span>
          {overallDescriptor.summary}
        </div>
      </motion.div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {addedVocabSuccess && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Added &ldquo;{addedVocabSuccess}&rdquo; to SRS trainer!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenScoreReportModal}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Official PDF Score Report
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetake}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            New Simulation
          </motion.button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview Radar', icon: Award },
          { id: 'listening', label: 'Listening Review', icon: Volume2 },
          { id: 'reading', label: 'Reading Review', icon: BookOpen },
          { id: 'writing', label: 'Writing AI Diagnostics', icon: PenTool },
          { id: 'speaking', label: 'Speaking AI Diagnostics', icon: Mic }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-sky-600 text-sky-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT WITH ANIMATEPRESENCE */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview_tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Listening Card */}
              <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Listening</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  CELPIP {attempt.listeningScore?.estimatedCelpipBand || 9}
                </div>
                <div className="text-xs text-slate-500">
                  Raw Score: {attempt.listeningScore?.rawScore || 0} / {attempt.listeningScore?.totalQuestions || 38} (
                  {Math.round(((attempt.listeningScore?.rawScore || 0) / (attempt.listeningScore?.totalQuestions || 38)) * 100)}%)
                </div>
              </motion.div>

              {/* Reading Card */}
              <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Reading</span>
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  CELPIP {attempt.readingScore?.estimatedCelpipBand || 9}
                </div>
                <div className="text-xs text-slate-500">
                  Raw Score: {attempt.readingScore?.rawScore || 0} / {attempt.readingScore?.totalQuestions || 38} (
                  {Math.round(((attempt.readingScore?.rawScore || 0) / (attempt.readingScore?.totalQuestions || 38)) * 100)}%)
                </div>
              </motion.div>

              {/* Writing Card */}
              <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Writing</span>
                  <PenTool className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  CELPIP {attempt.writingScore?.overallBand || 9}
                </div>
                <div className="text-xs text-slate-500">
                  Dual-Pass AI Evaluation • CLB {attempt.writingScore?.clbLevel || 9}
                </div>
              </motion.div>

              {/* Speaking Card */}
              <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Speaking</span>
                  <Mic className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  CELPIP {attempt.speakingScore?.overallBand || 9}
                </div>
                <div className="text-xs text-slate-500">
                  Acoustic & Fluency Grader • CLB {attempt.speakingScore?.clbLevel || 9}
                </div>
              </motion.div>
            </div>

            {/* Express Entry & Immigration Insights */}
            <div className="p-6 bg-sky-50 border border-sky-200 rounded-3xl space-y-3 text-sky-950">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" /> Immigration & Benchmark Significance
              </h3>
              <p className="text-xs md:text-sm leading-relaxed">
                Achieving <span className="font-bold">CLB 9 in all four language abilities</span> unlocks the maximum possible skill transferability points in Canada&rsquo;s Express Entry Comprehensive Ranking System (CRS). With your current overall performance at <span className="font-bold">CELPIP {attempt.overallCelpipBand}</span>, you are tracking well within this high-value tier.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LISTENING REVIEW */}
        {activeTab === 'listening' && (
          <motion.div
            key="listening_tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Detailed Review of Every Listening Question & Distractor Trap
            </div>

            {simulation.listeningParts.map((part) => (
              <div key={part.partId} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-sky-600 uppercase">
                      {part.partNumber === 0 ? 'Practice' : `Part ${part.partNumber}`}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{part.title}</h3>
                  </div>
                </div>

                {/* Audio Transcript Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-sky-600" /> Spoken Audio Script (Review Transcript)
                  </div>
                  <div className="text-xs md:text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-line">
                    {part.fullTranscript}
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {part.questions.map((q) => {
                    const userAnswer = attempt.userAnswers.listening?.[q.id];
                    const isCorrect = userAnswer === q.correctOptionId;
                    const isExpanded = !!expandedQuestions[q.id];

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                        }`}
                      >
                        <div
                          onClick={() => toggleQuestionExpand(q.id)}
                          className="flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-2.5">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className="text-xs font-bold text-slate-500 uppercase">
                                Question {q.questionNumber}
                              </span>
                              <div className="font-semibold text-slate-900 text-sm md:text-base">
                                {q.promptText}
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                Your Answer:{' '}
                                <span className="font-bold">
                                  Option {userAnswer || 'Unanswered'}
                                </span>{' '}
                                • Correct:{' '}
                                <span className="font-bold text-emerald-700">Option {q.correctOptionId}</span>
                              </div>
                            </div>
                          </div>

                          <button className="text-slate-400 hover:text-slate-600 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Animated Expandable Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-slate-200/60 space-y-3 overflow-hidden"
                            >
                              {q.evidenceText && (
                                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
                                  <span className="font-bold">Transcript Evidence: </span>
                                  &ldquo;{q.evidenceText}&rdquo;
                                </div>
                              )}

                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-600 uppercase">
                                  Option-by-Option Breakdown:
                                </span>
                                {q.options.map((opt) => (
                                  <div
                                    key={opt.id}
                                    className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                                      opt.isCorrect
                                        ? 'bg-emerald-100/70 text-emerald-950 font-semibold'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    <span className="font-bold shrink-0">Option {opt.id}:</span>
                                    <div>
                                      <span>{opt.text} — </span>
                                      <span className="font-normal opacity-90">{opt.rationale}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: READING REVIEW */}
        {activeTab === 'reading' && (
          <motion.div
            key="reading_tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Detailed Review of Every Reading Question & Text Evidence
            </div>

            {simulation.readingParts.map((part) => (
              <div key={part.partId} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase">Part {part.partNumber}</span>
                  <h3 className="text-lg font-bold text-slate-900">{part.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{part.passageTitle}</p>
                </div>

                <div className="space-y-4">
                  {part.questions.map((q) => {
                    const userAnswer = attempt.userAnswers.reading?.[q.id];
                    const isCorrect = userAnswer === q.correctOptionId;
                    const isExpanded = !!expandedQuestions[q.id];

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                        }`}
                      >
                        <div
                          onClick={() => toggleQuestionExpand(q.id)}
                          className="flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-2.5">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className="text-xs font-bold text-slate-500 uppercase">
                                Question {q.questionNumber}
                              </span>
                              <div className="font-semibold text-slate-900 text-sm md:text-base">
                                {q.promptText}
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                Your Answer: <span className="font-bold">Option {userAnswer || 'Unanswered'}</span> •
                                Correct:{' '}
                                <span className="font-bold text-emerald-700">Option {q.correctOptionId}</span>
                              </div>
                            </div>
                          </div>

                          <button className="text-slate-400 hover:text-slate-600 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-slate-200/60 space-y-3 overflow-hidden"
                            >
                              {q.evidenceText && (
                                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
                                  <span className="font-bold">Passage Evidence: </span>
                                  &ldquo;{q.evidenceText}&rdquo;
                                </div>
                              )}

                              <div className="space-y-2">
                                {q.options.map((opt) => (
                                  <div
                                    key={opt.id}
                                    className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                                      opt.isCorrect
                                        ? 'bg-emerald-100/70 text-emerald-950 font-semibold'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    <span className="font-bold shrink-0">Option {opt.id}:</span>
                                    <div>
                                      <span>{opt.text} — </span>
                                      <span className="font-normal opacity-90">{opt.rationale}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 4: WRITING AI EVALUATION */}
        {activeTab === 'writing' && (
          <motion.div
            key="writing_tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {simulation.writingTasks.map((task) => {
              const taskResult =
                task.taskNumber === 1
                  ? attempt.writingScore?.task1
                  : attempt.writingScore?.task2;
              const userText = attempt.userAnswers.writing?.[task.taskId] || '';

              return (
                <div key={task.taskId} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase">
                        Writing Task {task.taskNumber}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{task.title}</h3>
                    </div>
                    {taskResult && (
                      <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                        <div className="text-[10px] font-bold uppercase text-amber-800">Assessed Score</div>
                        <div className="text-xl font-black text-amber-950">
                          Band {taskResult.overallBand}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Your Submission:</span>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                      {userText || '(No submission recorded)'}
                    </div>
                  </div>

                  {taskResult && (
                    <>
                      {/* 4 Criteria Scores */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                            <span>Content & Coherence</span>
                            <span className="text-sky-600">Band {taskResult.criteriaScores.contentAndCoherence.band}</span>
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.criteriaScores.contentAndCoherence.feedback}</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                            <span>Vocabulary Range</span>
                            <span className="text-indigo-600">Band {taskResult.criteriaScores.vocabulary.band}</span>
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.criteriaScores.vocabulary.feedback}</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                            <span>Readability & Grammar</span>
                            <span className="text-amber-600">Band {taskResult.criteriaScores.readabilityAndGrammar.band}</span>
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.criteriaScores.readabilityAndGrammar.feedback}</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                            <span>Task Fulfillment</span>
                            <span className="text-emerald-600">Band {taskResult.criteriaScores.taskFulfillment.band}</span>
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.criteriaScores.taskFulfillment.feedback}</p>
                        </div>
                      </div>

                      {/* Sentence Annotations */}
                      {taskResult.sentenceAnnotations && taskResult.sentenceAnnotations.length > 0 && (
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Sentence-Level Corrections & Collocations:
                          </span>
                          <div className="space-y-2">
                            {taskResult.sentenceAnnotations.map((anno, aIdx) => (
                              <div key={aIdx} className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-1.5 text-xs">
                                <div className="flex items-center justify-between font-bold text-amber-900">
                                  <span>{anno.category} Improvement</span>
                                  <button
                                    onClick={() => handleAddMistakeToSrs(anno.correctedSentence.split(' ')[0] || 'Phrase', anno.explanation, anno.correctedSentence)}
                                    className="flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                                  >
                                    <PlusCircle className="w-3.5 h-3.5" /> Save to SRS Trainer
                                  </button>
                                </div>
                                <div className="text-slate-600 line-through">&ldquo;{anno.originalSentence}&rdquo;</div>
                                <div className="text-emerald-800 font-semibold">➔ &ldquo;{anno.correctedSentence}&rdquo;</div>
                                <div className="text-slate-500 italic text-[11px]">{anno.explanation}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Band 12 Model Response */}
                      <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl space-y-3 shadow-2xs">
                        <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          Band 12 Exemplary Model Response
                        </div>
                        <div className="text-xs md:text-sm text-emerald-900 whitespace-pre-line leading-relaxed font-sans">
                          {taskResult.band12ModelAnswer}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* TAB 5: SPEAKING AI EVALUATION */}
        {activeTab === 'speaking' && (
          <motion.div
            key="speaking_tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {simulation.speakingTasks.filter(t => t.taskNumber !== 0).map((task) => {
              const taskResult = attempt.speakingScore?.tasks?.[task.taskId];
              const audioUrl = attempt.userAnswers.speakingAudioBlobs?.[task.taskId];

              return (
                <div key={task.taskId} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 uppercase">
                        Speaking Task {task.taskNumber}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{task.title}</h3>
                    </div>
                    {taskResult && (
                      <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                        <div className="text-[10px] font-bold uppercase text-emerald-800">Assessed Score</div>
                        <div className="text-xl font-black text-emerald-950">
                          Band {taskResult.overallBand}
                        </div>
                      </div>
                    )}
                  </div>

                  {audioUrl && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <span className="text-xs font-bold text-slate-600">Your Recorded Audio:</span>
                      <audio controls src={audioUrl} className="w-full max-w-md h-9" />
                    </div>
                  )}

                  {taskResult && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="text-xs font-bold text-slate-700">Time Management Efficiency</div>
                          <div className="text-sm font-semibold text-slate-900">
                            {taskResult.timeManagement.speakingDurationSeconds}s of {taskResult.timeManagement.targetDurationSeconds}s target
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.timeManagement.feedback}</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="text-xs font-bold text-slate-700">Filler Word Analysis</div>
                          <div className="text-sm font-semibold text-slate-900">
                            {taskResult.fillerAnalysis.totalFillerCount} fillers ({taskResult.fillerAnalysis.fillersPerMinute}/min)
                          </div>
                          <p className="text-xs text-slate-600">{taskResult.fillerAnalysis.impactLevel}</p>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          Band 12 Model Spoken Response
                        </div>
                        <p className="text-xs md:text-sm text-emerald-900 leading-relaxed font-sans">
                          {taskResult.band12ModelResponse}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
