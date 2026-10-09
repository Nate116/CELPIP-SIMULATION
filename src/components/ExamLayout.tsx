import React, { useState } from 'react';
import {
  Clock,
  Volume2,
  ZoomIn,
  Sun,
  Moon,
  HelpCircle,
  LogOut,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { SkillComponent, ExamDeliveryMode } from '../types/celpip';

interface ExamLayoutProps {
  currentSkill: SkillComponent;
  examMode: ExamDeliveryMode;
  simulationTitle: string;
  totalTimeRemainingSeconds?: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onExitExam: () => void;
  children: React.ReactNode;
}

export const ExamLayout: React.FC<ExamLayoutProps> = ({
  currentSkill,
  examMode,
  simulationTitle,
  totalTimeRemainingSeconds,
  fontSize,
  isHighContrast,
  onToggleHighContrast,
  onChangeFontSize,
  onExitExam,
  children
}) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const formatOverallTime = (seconds?: number) => {
    if (seconds === undefined) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getFontSizeClass = () => {
    if (fontSize === 'xlarge') return 'text-lg';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isHighContrast
          ? 'bg-black text-amber-300'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Official CELPIP Header Bar */}
      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          isHighContrast
            ? 'bg-black border-amber-500/50 text-amber-300'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand & Active Simulation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-wider text-sky-400">
                CELPIP
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-bold uppercase tracking-wider">
                General
              </span>
            </div>

            <div className="hidden md:block w-px h-5 bg-slate-700" />

            <div className="hidden md:block text-xs font-semibold text-slate-300 truncate max-w-xs">
              {simulationTitle}
            </div>
          </div>

          {/* Center: Component Steps Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
            {(['listening', 'reading', 'writing', 'speaking'] as SkillComponent[]).map(
              (skill, idx) => {
                const isActive = currentSkill === skill;
                return (
                  <React.Fragment key={skill}>
                    <div
                      className={`px-3 py-1 rounded-lg capitalize transition ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {skill}
                    </div>
                    {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                  </React.Fragment>
                );
              }
            )}
          </div>

          {/* Right Controls: Timer, Accessibility, Exit */}
          <div className="flex items-center gap-3">
            {/* Overall Remaining Timer */}
            {totalTimeRemainingSeconds !== undefined && (
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-xs font-bold text-sky-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatOverallTime(totalTimeRemainingSeconds)}</span>
              </div>
            )}

            {/* Font Sizer */}
            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-800 text-xs">
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-2 py-1 font-bold ${
                  fontSize === 'normal' ? 'bg-sky-600 text-white' : 'text-slate-300'
                }`}
                title="Normal Font"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-2 py-1 font-bold ${
                  fontSize === 'large' ? 'bg-sky-600 text-white' : 'text-slate-300'
                }`}
                title="Large Font"
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-2 py-1 font-bold ${
                  fontSize === 'xlarge' ? 'bg-sky-600 text-white' : 'text-slate-300'
                }`}
                title="Extra Large Font"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={onToggleHighContrast}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Toggle High Contrast"
            >
              {isHighContrast ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Test Instructions & Rules"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Exit Button */}
            <button
              onClick={() => setShowExitConfirm(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-semibold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Assessment Container */}
      <main className={`flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 ${getFontSizeClass()}`}>
        {children}
      </main>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 text-slate-900">
            <div className="flex items-center gap-3 text-rose-600 font-bold text-lg">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <span>Quit Current Simulation?</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              In official CELPIP test centers, exiting a section cannot be undone. Any unfinished questions will be recorded as unattempted.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Resume Test
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onExitExam();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Instructions Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">CELPIP Official Test Rules</h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-80 overflow-y-auto">
              <p>
                <strong>Listening:</strong> Audio clips play once only. You cannot pause or rewind the audio in exam mode. Ensure your headset volume is adjusted beforehand.
              </p>
              <p>
                <strong>Reading:</strong> Passages appear on the left; questions on the right. You may scroll each pane independently and navigate between questions in the current part.
              </p>
              <p>
                <strong>Writing:</strong> Tasks 1 and 2 each have their own countdown clock. Spellcheck is disabled to emulate official test computers. Keep word count strictly between 150 and 200 words.
              </p>
              <p>
                <strong>Speaking:</strong> Read the prompt during the preparation period. When you hear the single tone beep, start speaking immediately until the time bar ends.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
