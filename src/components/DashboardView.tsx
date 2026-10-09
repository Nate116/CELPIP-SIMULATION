import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  Target,
  Play,
  Zap,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserTargetProfile,
  TestAttemptRecord,
  DifficultyLevel,
  TestMode,
  ExamDeliveryMode,
  SkillComponent
} from '../types/celpip';
import { SAMPLE_SIMULATIONS } from '../data/sampleSimulations';
import { storageService } from '../services/storageService';

interface DashboardViewProps {
  userProfile: UserTargetProfile;
  attempts: TestAttemptRecord[];
  onStartSimulation: (config: {
    mode: TestMode;
    deliveryMode: ExamDeliveryMode;
    difficulty: DifficultyLevel;
    selectedSkill?: SkillComponent;
    customSimId?: string;
  }) => void;
  onOpenSrsVocab: () => void;
  onOpenStrategy: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  attempts: _attempts,
  onStartSimulation,
  onOpenSrsVocab,
  onOpenStrategy
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('elite');
  const [deliveryMode, setDeliveryMode] = useState<ExamDeliveryMode>('exam');
  const [selectedSkill, setSelectedSkill] = useState<SkillComponent>('listening');
  const [targetLevel, setTargetLevel] = useState<number>(userProfile.targetClbLevel || 10);
  const [examDate, setExamDate] = useState<string>(userProfile.examDate || '2026-06-15');

  const daysLeft = Math.max(0, Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const handleUpdateTarget = (newTarget: number) => {
    setTargetLevel(newTarget);
    storageService.saveUserProfile({
      ...userProfile,
      targetClbLevel: newTarget
    });
  };

  const handleUpdateExamDate = (newDate: string) => {
    setExamDate(newDate);
    storageService.saveUserProfile({
      ...userProfile,
      examDate: newDate
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8 pb-16"
    >
      {/* Top Hero Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 rounded-3xl p-8 md:p-10 text-white shadow-xl border border-sky-900/40 relative overflow-hidden"
      >
        {/* Subtle decorative glowing mesh */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-sky-200 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>Targeting Top-Tier Canadian Language Benchmarks (CLB 11-12)</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              CELPIP Master 12 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                Elite Exam Simulation Engine
              </span>
            </h1>

            <p className="text-sky-200 text-sm md:text-base leading-relaxed max-w-xl">
              Every simulation is dynamically generated and unique. Train with multi-speaker Canadian audio, authentic timing pressure, and AI rubrics calibrated to official score distributions.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  onStartSimulation({
                    mode: 'full_mock',
                    deliveryMode,
                    difficulty: selectedDifficulty
                  })
                }
                className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-sky-500/25 transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Launch Full Simulation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenStrategy}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold rounded-xl text-sm transition backdrop-blur-md cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Test-Day Strategies
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSrsVocab}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold rounded-xl text-sm transition backdrop-blur-md cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                SRS Collocation Trainer
              </motion.button>
            </div>
          </div>

          {/* Right Hero Card: Target & Countdown */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-sky-300" /> Target Benchmark
              </span>
              <div className="flex items-center gap-1">
                {[9, 10, 11, 12].map((lvl) => (
                  <motion.button
                    key={lvl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdateTarget(lvl)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                      targetLevel === lvl
                        ? 'bg-sky-400 text-slate-950 shadow-xs'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {lvl}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <motion.div
                  key={targetLevel}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-extrabold text-white"
                >
                  CLB {targetLevel}
                </motion.div>
                <div className="text-xs text-sky-200 mt-0.5">
                  {targetLevel >= 11
                    ? 'Elite Mastery (Top Band)'
                    : targetLevel === 10
                    ? 'Maximum Express Entry Transferability'
                    : 'Federal Skilled Worker Tier'}
                </div>
              </div>

              {/* Countdown Clock */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-amber-300 font-bold uppercase justify-end">
                  <Calendar className="w-3.5 h-3.5" /> Exam Date
                </div>
                <div className="text-2xl font-black text-white">{daysLeft} Days</div>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => handleUpdateExamDate(e.target.value)}
                  className="text-[10px] bg-white/10 border border-white/20 rounded px-1.5 py-0.5 text-sky-100 mt-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Estimated Levels Radar */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <span className="text-slate-300 font-medium block">Current Estimated Bands:</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">List</div>
                  <div className="font-bold text-sky-300 text-sm">
                    {userProfile.currentEstimatedLevels.listening}
                  </div>
                </div>
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">Read</div>
                  <div className="font-bold text-indigo-300 text-sm">
                    {userProfile.currentEstimatedLevels.reading}
                  </div>
                </div>
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">Write</div>
                  <div className="font-bold text-amber-300 text-sm">
                    {userProfile.currentEstimatedLevels.writing}
                  </div>
                </div>
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">Speak</div>
                  <div className="font-bold text-emerald-300 text-sm">
                    {userProfile.currentEstimatedLevels.speaking}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Simulator Control Panel */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Adaptive Simulation Configuration</h2>
          </div>
          <div className="text-xs text-slate-500 font-medium">Customize your next mock session</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty Dial */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Difficulty Level (Can be dialed above exam standard)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'foundation', label: 'Foundation (5-6)', desc: 'Fundamental concepts' },
                { id: 'standard', label: 'Standard (7-8)', desc: 'Official baseline' },
                { id: 'advanced', label: 'Advanced (9-10)', desc: 'Express Entry target' },
                { id: 'elite', label: 'Elite (11-12)', desc: 'Nuanced idioms & speed' },
                { id: 'beyond_exam', label: 'Beyond-Exam', desc: 'High lexical density stress' }
              ].map((d) => (
                <motion.button
                  key={d.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(d.id as DifficultyLevel)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    selectedDifficulty === d.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{d.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{d.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Exam Mode vs Practice Mode */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Test Administration Mode
            </span>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDeliveryMode('exam')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                  deliveryMode === 'exam'
                    ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold shadow-xs ring-1 ring-sky-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                  <Clock className="w-4 h-4 text-sky-600" /> Exam Mode (Strict)
                </div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Audio plays once only, strictly timed, no spellcheck, one recording attempt per speaking prompt.
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDeliveryMode('practice')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                  deliveryMode === 'practice'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Practice Mode
                </div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Audio replay enabled, instant question hints, spellcheck enabled, outline builder.
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Training Modes Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" /> Targeted Training Modes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Section Mock Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div className="space-y-2">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl w-fit">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Section Mock Test</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focus on a single component with full official question counts and timing.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value as SkillComponent)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl text-slate-800 bg-slate-50 cursor-pointer outline-none focus:border-sky-600"
              >
                <option value="listening">Listening Component (Parts 1-6)</option>
                <option value="reading">Reading Component (Parts 1-4)</option>
                <option value="writing">Writing Component (Tasks 1 & 2)</option>
                <option value="speaking">Speaking Component (Tasks 1-8)</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  onStartSimulation({
                    mode: 'section_mock',
                    deliveryMode,
                    difficulty: selectedDifficulty,
                    selectedSkill
                  })
                }
                className="w-full py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Start Section</span> <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Weak-Spot Drill Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div className="space-y-2">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Weak-Spot Targeting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically identifies and drills your lowest-scoring question types.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onStartSimulation({
                  mode: 'weak_spot',
                  deliveryMode,
                  difficulty: selectedDifficulty
                })
              }
              className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Target Weak Spots</span> <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          {/* Timed Sprint Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div className="space-y-2">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">15-Minute Timed Sprint</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-intensity, rapid-fire drills with shortened time windows to build speed.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onStartSimulation({
                  mode: 'sprint',
                  deliveryMode,
                  difficulty: selectedDifficulty
                })
              }
              className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Start 15-Min Sprint</span> <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          {/* SRS Vocabulary Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">SRS Collocation Trainer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Master high-yield Canadian collocations and review errors harvested from attempts.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSrsVocab}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Practice Flashcards</span> <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Simulation Bank Browser */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-xs"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Official Simulation Library (10 Full Exams)</h2>
            <p className="text-xs text-slate-500">Pick any specific Canadian civic scenario to practice</p>
          </div>
          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {SAMPLE_SIMULATIONS.length} Exams Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAMPLE_SIMULATIONS.map((sim, i) => (
            <motion.div
              key={sim.id}
              whileHover={{ scale: 1.012, x: 2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() =>
                onStartSimulation({
                  mode: 'full_mock',
                  deliveryMode,
                  difficulty: sim.difficultyLevel,
                  customSimId: sim.id
                })
              }
              className="p-4 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/30 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition">
                    {sim.title}
                  </span>
                </div>
                <div className="text-xs text-slate-500">{sim.topicDomain}</div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition shrink-0" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
