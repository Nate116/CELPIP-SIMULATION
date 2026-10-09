import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SkillComponent,
  DifficultyLevel,
  TestMode,
  ExamDeliveryMode,
  SimulationPackage,
  TestAttemptRecord,
  UserTargetProfile,
  SectionScoreSummary,
  WritingGradingResult,
  SpeakingGradingResult
} from './types/celpip';
import { storageService } from './services/storageService';
import { SAMPLE_SIMULATIONS } from './data/sampleSimulations';
import { convertListeningRawScore, convertReadingRawScore } from './data/scoringRubrics';
import { DashboardView } from './components/DashboardView';
import { ExamLayout } from './components/ExamLayout';
import { ListeningComponent } from './components/ListeningComponent';
import { ReadingComponent } from './components/ReadingComponent';
import { WritingComponent } from './components/WritingComponent';
import { SpeakingComponent } from './components/SpeakingComponent';
import { ResultsView } from './components/ResultsView';
import { StrategyView } from './components/StrategyView';
import { VocabularyTrainer } from './components/VocabularyTrainer';
import { HeadsetCheckModal } from './components/HeadsetCheckModal';
import { ScoreReportModal } from './components/ScoreReportModal';

type AppView = 'dashboard' | 'exam' | 'results' | 'strategy' | 'srs_vocab';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [userProfile, setUserProfile] = useState<UserTargetProfile>(() => storageService.getUserProfile());
  const [attempts, setAttempts] = useState<TestAttemptRecord[]>(() => storageService.getAttempts());

  // Active Simulation State
  const [activeSimulation, setActiveSimulation] = useState<SimulationPackage>(SAMPLE_SIMULATIONS[0]);
  const [testMode, setTestMode] = useState<TestMode>('full_mock');
  const [deliveryMode, setDeliveryMode] = useState<ExamDeliveryMode>('exam');
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('elite');
  const [activeSkill, setActiveSkill] = useState<SkillComponent>('listening');
  const [plannedSkills, setPlannedSkills] = useState<SkillComponent[]>(['listening', 'reading', 'writing', 'speaking']);
  const [skillSequenceIndex, setSkillSequenceIndex] = useState(0);

  // In-progress test session data
  const [currentAttempt, setCurrentAttempt] = useState<Partial<TestAttemptRecord>>({});
  const [completedAttempt, setCompletedAttempt] = useState<TestAttemptRecord | null>(null);

  // Equipment Check Modal
  const [showEquipmentCheck, setShowEquipmentCheck] = useState(false);
  const [pendingSimConfig, setPendingSimConfig] = useState<{
    mode: TestMode;
    deliveryMode: ExamDeliveryMode;
    difficulty: DifficultyLevel;
    selectedSkill?: SkillComponent;
    customSimId?: string;
  } | null>(null);

  // Score Report Modal
  const [showScoreReportModal, setShowScoreReportModal] = useState(false);

  // Accessibility
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Refresh profile & attempts
  const refreshUserData = () => {
    setUserProfile(storageService.getUserProfile());
    setAttempts(storageService.getAttempts());
  };

  // Launch Simulation Workflow
  const handleRequestStartSimulation = (config: {
    mode: TestMode;
    deliveryMode: ExamDeliveryMode;
    difficulty: DifficultyLevel;
    selectedSkill?: SkillComponent;
    customSimId?: string;
  }) => {
    setPendingSimConfig(config);
    // If exam includes listening or speaking, trigger equipment check
    const needsAudio = config.mode === 'full_mock' || config.selectedSkill === 'listening' || config.selectedSkill === 'speaking';
    if (needsAudio) {
      setShowEquipmentCheck(true);
    } else {
      executeStartSimulation(config);
    }
  };

  const executeStartSimulation = (config: {
    mode: TestMode;
    deliveryMode: ExamDeliveryMode;
    difficulty: DifficultyLevel;
    selectedSkill?: SkillComponent;
    customSimId?: string;
  }) => {
    // 1. Pick simulation (use specified, or pick unseen to guarantee zero repetition!)
    let sim: SimulationPackage;
    if (config.customSimId) {
      sim = SAMPLE_SIMULATIONS.find(s => s.id === config.customSimId) || SAMPLE_SIMULATIONS[0];
    } else {
      sim = storageService.getNextUnseenSimulation(config.difficulty);
    }

    setActiveSimulation(sim);
    setTestMode(config.mode);
    setDeliveryMode(config.deliveryMode);
    setCurrentDifficulty(config.difficulty);

    // Determine sequence of skills
    let sequence: SkillComponent[] = ['listening', 'reading', 'writing', 'speaking'];
    if (config.mode === 'section_mock' && config.selectedSkill) {
      sequence = [config.selectedSkill];
    } else if (config.mode === 'weak_spot') {
      sequence = ['reading', 'listening'];
    } else if (config.mode === 'sprint') {
      sequence = ['listening', 'reading'];
    }

    setPlannedSkills(sequence);
    setSkillSequenceIndex(0);
    setActiveSkill(sequence[0]);

    // Initialize fresh attempt record
    const newAttempt: Partial<TestAttemptRecord> = {
      id: `attempt_${Date.now()}`,
      simulationId: sim.id,
      simulationTitle: sim.title,
      date: new Date().toISOString(),
      deliveryMode: config.deliveryMode,
      testMode: config.mode,
      startingDifficulty: config.difficulty,
      finalDifficulty: config.difficulty,
      userAnswers: {
        listening: {},
        reading: {},
        writing: {},
        speakingTranscripts: {},
        speakingAudioBlobs: {}
      }
    };
    setCurrentAttempt(newAttempt);
    setCurrentView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section completion handlers
  const handleListeningComplete = (
    answers: Record<string, string>,
    rawScore: number,
    totalQuestions: number
  ) => {
    const conversion = convertListeningRawScore(rawScore);
    const scoreSummary: SectionScoreSummary = {
      skill: 'listening',
      rawScore,
      totalQuestions,
      estimatedCelpipBand: conversion.band,
      clbLevel: conversion.clb,
      timeSpentSeconds: 45 * 60,
      accuracyPercentage: Math.round((rawScore / totalQuestions) * 100)
    };

    const updated = {
      ...currentAttempt,
      listeningScore: scoreSummary,
      userAnswers: {
        ...currentAttempt.userAnswers,
        listening: answers
      }
    };
    setCurrentAttempt(updated);
    advanceToNextSkill(updated);
  };

  const handleReadingComplete = (
    answers: Record<string, string>,
    rawScore: number,
    totalQuestions: number
  ) => {
    const conversion = convertReadingRawScore(rawScore);
    const scoreSummary: SectionScoreSummary = {
      skill: 'reading',
      rawScore,
      totalQuestions,
      estimatedCelpipBand: conversion.band,
      clbLevel: conversion.clb,
      timeSpentSeconds: 50 * 60,
      accuracyPercentage: Math.round((rawScore / totalQuestions) * 100)
    };

    const updated = {
      ...currentAttempt,
      readingScore: scoreSummary,
      userAnswers: {
        ...currentAttempt.userAnswers,
        reading: answers
      }
    };
    setCurrentAttempt(updated);
    advanceToNextSkill(updated);
  };

  const handleWritingComplete = (
    userTexts: Record<string, string>,
    results: Record<string, WritingGradingResult>
  ) => {
    const t1 = results['w_task_1'] || results[activeSimulation.writingTasks[0]?.taskId];
    const t2 = results['w_task_2'] || results[activeSimulation.writingTasks[1]?.taskId];
    const avgBand = Math.round(((t1?.overallBand || 9) + (t2?.overallBand || 9)) / 2);

    const updated = {
      ...currentAttempt,
      writingScore: {
        task1: t1,
        task2: t2,
        overallBand: avgBand,
        clbLevel: avgBand
      },
      userAnswers: {
        ...currentAttempt.userAnswers,
        writing: userTexts
      }
    };
    setCurrentAttempt(updated);
    advanceToNextSkill(updated);
  };

  const handleSpeakingComplete = (
    audioRecordings: Record<string, string>,
    results: Record<string, SpeakingGradingResult>
  ) => {
    const tasksArray = Object.values(results);
    const avgBand =
      tasksArray.length > 0
        ? Math.round(tasksArray.reduce((acc, t) => acc + t.overallBand, 0) / tasksArray.length)
        : 9;

    const updated = {
      ...currentAttempt,
      speakingScore: {
        tasks: results,
        overallBand: avgBand,
        clbLevel: avgBand
      },
      userAnswers: {
        ...currentAttempt.userAnswers,
        speakingAudioBlobs: audioRecordings
      }
    };
    setCurrentAttempt(updated);
    advanceToNextSkill(updated);
  };

  const advanceToNextSkill = (updatedAttempt: Partial<TestAttemptRecord>) => {
    const nextIdx = skillSequenceIndex + 1;
    if (nextIdx < plannedSkills.length) {
      setSkillSequenceIndex(nextIdx);
      setActiveSkill(plannedSkills[nextIdx]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finalizeAttempt(updatedAttempt);
    }
  };

  const finalizeAttempt = (attemptDraft: Partial<TestAttemptRecord>) => {
    // Calculate final overall score
    const lBand = attemptDraft.listeningScore?.estimatedCelpipBand || 9;
    const rBand = attemptDraft.readingScore?.estimatedCelpipBand || 9;
    const wBand = attemptDraft.writingScore?.overallBand || 9;
    const sBand = attemptDraft.speakingScore?.overallBand || 9;

    // In CELPIP, overall benchmark is typically represented across all components or lowest/average
    const overallBand = Math.round((lBand + rBand + wBand + sBand) / 4);

    const finalRecord: TestAttemptRecord = {
      id: attemptDraft.id || `attempt_${Date.now()}`,
      simulationId: activeSimulation.id,
      simulationTitle: activeSimulation.title,
      date: attemptDraft.date || new Date().toISOString(),
      deliveryMode: attemptDraft.deliveryMode || deliveryMode,
      testMode: attemptDraft.testMode || testMode,
      startingDifficulty: attemptDraft.startingDifficulty || currentDifficulty,
      finalDifficulty: currentDifficulty,
      overallCelpipBand: overallBand,
      overallClbLevel: overallBand,
      listeningScore: attemptDraft.listeningScore,
      readingScore: attemptDraft.readingScore,
      writingScore: attemptDraft.writingScore,
      speakingScore: attemptDraft.speakingScore,
      userAnswers: attemptDraft.userAnswers || {
        listening: {},
        reading: {},
        writing: {},
        speakingTranscripts: {},
        speakingAudioBlobs: {}
      },
      completed: true
    };

    storageService.saveAttempt(finalRecord);
    setCompletedAttempt(finalRecord);
    refreshUserData();
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isHighContrast ? 'bg-black text-amber-300' : 'bg-slate-100 text-slate-900'}`}>
      <AnimatePresence mode="wait">
        {/* 1. DASHBOARD VIEW */}
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard_view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-4 md:p-8"
          >
            <DashboardView
              userProfile={userProfile}
              attempts={attempts}
              onStartSimulation={handleRequestStartSimulation}
              onOpenSrsVocab={() => setCurrentView('srs_vocab')}
              onOpenStrategy={() => setCurrentView('strategy')}
            />
          </motion.div>
        )}

        {/* 2. EXAM ENVIRONMENT VIEW */}
        {currentView === 'exam' && (
          <motion.div
            key="exam_view"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.25 }}
          >
            <ExamLayout
              currentSkill={activeSkill}
              examMode={deliveryMode}
              simulationTitle={activeSimulation.title}
              fontSize={fontSize}
              isHighContrast={isHighContrast}
              onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
              onChangeFontSize={setFontSize}
              onExitExam={() => {
                setCurrentView('dashboard');
                refreshUserData();
              }}
            >
              {activeSkill === 'listening' && (
                <ListeningComponent
                  parts={activeSimulation.listeningParts}
                  deliveryMode={deliveryMode}
                  fontSizeClass={fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'}
                  onComplete={handleListeningComplete}
                />
              )}

              {activeSkill === 'reading' && (
                <ReadingComponent
                  parts={activeSimulation.readingParts}
                  deliveryMode={deliveryMode}
                  fontSizeClass={fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'}
                  onComplete={handleReadingComplete}
                />
              )}

              {activeSkill === 'writing' && (
                <WritingComponent
                  tasks={activeSimulation.writingTasks}
                  deliveryMode={deliveryMode}
                  fontSizeClass={fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'}
                  onComplete={handleWritingComplete}
                />
              )}

              {activeSkill === 'speaking' && (
                <SpeakingComponent
                  tasks={activeSimulation.speakingTasks}
                  deliveryMode={deliveryMode}
                  fontSizeClass={fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'}
                  onComplete={handleSpeakingComplete}
                />
              )}
            </ExamLayout>
          </motion.div>
        )}

        {/* 3. RESULTS & DIAGNOSTICS VIEW */}
        {currentView === 'results' && completedAttempt && (
          <motion.div
            key="results_view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-4 md:p-8"
          >
            <ResultsView
              attempt={completedAttempt}
              simulation={activeSimulation}
              onRetake={() => setCurrentView('dashboard')}
              onOpenScoreReportModal={() => setShowScoreReportModal(true)}
            />
          </motion.div>
        )}

        {/* 4. TEST-DAY STRATEGY CARDS VIEW */}
        {currentView === 'strategy' && (
          <motion.div
            key="strategy_view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="p-4 md:p-8"
          >
            <StrategyView onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        )}

        {/* 5. SRS VOCABULARY TRAINER VIEW */}
        {currentView === 'srs_vocab' && (
          <motion.div
            key="srs_vocab_view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="p-4 md:p-8"
          >
            <VocabularyTrainer onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* EQUIPMENT CHECK MODAL */}
      <HeadsetCheckModal
        isOpen={showEquipmentCheck}
        requiredComponents={
          pendingSimConfig?.selectedSkill === 'writing' || pendingSimConfig?.selectedSkill === 'reading'
            ? []
            : pendingSimConfig?.selectedSkill === 'listening'
            ? ['audio']
            : ['audio', 'mic']
        }
        onProceed={() => {
          setShowEquipmentCheck(false);
          if (pendingSimConfig) {
            executeStartSimulation(pendingSimConfig);
          }
        }}
        onClose={() => setShowEquipmentCheck(false)}
      />

      {/* PRINTABLE PDF SCORE REPORT MODAL */}
      {completedAttempt && (
        <ScoreReportModal
          isOpen={showScoreReportModal}
          onClose={() => setShowScoreReportModal(false)}
          attempt={completedAttempt}
          simulation={activeSimulation}
        />
      )}
    </div>
  );
}
