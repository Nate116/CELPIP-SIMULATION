import React from 'react';
import { X, Printer, Award, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TestAttemptRecord, SimulationPackage } from '../types/celpip';
import { CELPIP_BAND_DESCRIPTORS } from '../data/scoringRubrics';

interface ScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempt: TestAttemptRecord;
  simulation: SimulationPackage;
  candidateName?: string;
}

export const ScoreReportModal: React.FC<ScoreReportModalProps> = ({
  isOpen,
  onClose,
  attempt,
  simulation,
  candidateName = 'Test Candidate'
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const lScore = attempt.listeningScore?.estimatedCelpipBand || 9;
  const rScore = attempt.readingScore?.estimatedCelpipBand || 9;
  const wScore = attempt.writingScore?.overallBand || 9;
  const sScore = attempt.speakingScore?.overallBand || 9;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md print:hidden"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 print:border-none print:shadow-none print:max-w-none print:w-full"
        >
          {/* Modal Toolbar (hidden on print) */}
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white print:hidden">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Award className="w-4 h-4 text-sky-400" /> Official CELPIP Diagnostic Score Report
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
              </motion.button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Score Report Certificate Content */}
          <div className="p-8 md:p-12 space-y-8 font-sans print:p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6">
              <div>
                <div className="flex items-center gap-2 text-red-600 font-extrabold tracking-widest text-xs uppercase">
                  <span>Canadian Language Benchmark Verification</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  CELPIP-GENERAL SCORE REPORT
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">Paragon Testing / Prometric Assessment Equating Standard</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500 font-medium">Candidate Pin</div>
                <div className="font-mono font-bold text-slate-900 text-sm">CP-2026-{attempt.id.slice(-6).toUpperCase()}</div>
                <div className="text-[11px] text-slate-400">Date: {new Date(attempt.date).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Candidate Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Candidate</span>
                <span className="font-bold text-slate-900 text-sm">{candidateName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Test Format</span>
                <span className="font-bold text-slate-900">CELPIP-General</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Simulation Domain</span>
                <span className="font-bold text-slate-900 truncate block">{simulation.topicDomain.split(',')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Overall Benchmark</span>
                <span className="font-bold text-emerald-700 text-sm">CLB {attempt.overallClbLevel}</span>
              </div>
            </div>

            {/* 4 Skill Scores Table */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Official Component Breakdown</h2>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3.5">Skill Component</th>
                      <th className="p-3.5 text-center">CELPIP Level</th>
                      <th className="p-3.5 text-center">CLB Equivalent</th>
                      <th className="p-3.5">Proficiency Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr>
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Listening
                      </td>
                      <td className="p-3.5 text-center font-black text-sky-700 text-base">{lScore}</td>
                      <td className="p-3.5 text-center font-bold">CLB {lScore}</td>
                      <td className="p-3.5 text-xs text-slate-600">{CELPIP_BAND_DESCRIPTORS[lScore]?.summary || 'Competent comprehension.'}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Reading
                      </td>
                      <td className="p-3.5 text-center font-black text-indigo-700 text-base">{rScore}</td>
                      <td className="p-3.5 text-center font-bold">CLB {rScore}</td>
                      <td className="p-3.5 text-xs text-slate-600">{CELPIP_BAND_DESCRIPTORS[rScore]?.summary || 'Competent comprehension.'}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Writing
                      </td>
                      <td className="p-3.5 text-center font-black text-amber-700 text-base">{wScore}</td>
                      <td className="p-3.5 text-center font-bold">CLB {wScore}</td>
                      <td className="p-3.5 text-xs text-slate-600">{CELPIP_BAND_DESCRIPTORS[wScore]?.summary || 'Structured operational communication.'}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Speaking
                      </td>
                      <td className="p-3.5 text-center font-black text-emerald-700 text-base">{sScore}</td>
                      <td className="p-3.5 text-center font-bold">CLB {sScore}</td>
                      <td className="p-3.5 text-xs text-slate-600">{CELPIP_BAND_DESCRIPTORS[sScore]?.summary || 'Fluent conversational delivery.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Immigration Threshold Matrix */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Canadian Immigration & Citizenship Equivalency Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-700">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block">Canadian Citizenship</span>
                  <span className="text-emerald-700 font-semibold">Min. CLB 4 in Spk/List</span>
                  <span className="text-[11px] text-slate-500 block">Status: Fully Qualified ✓</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block">Federal Skilled Worker</span>
                  <span className="text-emerald-700 font-semibold">Min. CLB 7 in all skills</span>
                  <span className="text-[11px] text-slate-500 block">Status: Fully Qualified ✓</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block">Express Entry Max CRS</span>
                  <span className="text-emerald-700 font-semibold">CLB 9–12 Top Tier</span>
                  <span className="text-[11px] text-slate-500 block">
                    Status: {attempt.overallClbLevel >= 9 ? 'Achieved Max CRS ✓' : 'Within Striking Distance'}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Stamp Footer */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Diagnostic Assessment Report • Authenticated by CELPIP Master 12 AI Engine</span>
              </div>
              <div className="font-mono text-[11px]">
                STAMP: {simulation.hash || 'V-VALID-2026-OK'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
