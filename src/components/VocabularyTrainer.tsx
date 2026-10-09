import React, { useState, useEffect } from 'react';
import { Flame, ArrowLeft, CheckCircle2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SrsVocabularyItem } from '../types/celpip';
import { storageService } from '../services/storageService';

interface VocabularyTrainerProps {
  onBack: () => void;
}

export const VocabularyTrainer: React.FC<VocabularyTrainerProps> = ({ onBack }) => {
  const [vocabList, setVocabList] = useState<SrsVocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTerm, setNewTerm] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newCollocation, setNewCollocation] = useState('');
  const [newSentence, setNewSentence] = useState('');

  useEffect(() => {
    loadVocab();
  }, []);

  const loadVocab = () => {
    const list = storageService.getSrsVocab();
    setVocabList(list);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const currentItem = vocabList[currentIndex];

  const handleGrade = (grade: 1 | 2 | 3 | 4 | 5) => {
    if (!currentItem) return;
    storageService.recordSrsReview(currentItem.id, grade);

    setIsRevealed(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      loadVocab();
    }
  };

  const handleAddNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm || !newDef) return;

    const items = storageService.getSrsVocab();
    const newItem: SrsVocabularyItem = {
      id: `srs_user_${Date.now()}`,
      term: newTerm.trim(),
      definition: newDef.trim(),
      canadianCollocation: newCollocation.trim() || `key usage: ${newTerm.trim()}`,
      sampleSentence: newSentence.trim() || `The decision regarding ${newTerm.trim()} was approved by the strata.`,
      sourceContext: 'User custom vocabulary addition',
      difficultyBand: 11,
      easeFactor: 2.5,
      intervalDays: 1,
      repetitionCount: 0,
      nextReviewDate: new Date().toISOString()
    };

    items.unshift(newItem);
    storageService.saveSrsVocab(items);
    setVocabList(items);

    setNewTerm('');
    setNewDef('');
    setNewCollocation('');
    setNewSentence('');
    setShowAddModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6 pb-16"
    >
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              Spaced Repetition (SRS) Vocabulary Trainer
            </h1>
            <p className="text-xs text-slate-500">
              Harvested Canadian collocations, exam idioms, and mistake remediation
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Word
        </motion.button>
      </div>

      {/* Main Flashcard Card */}
      {currentItem ? (
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card_${currentItem.id}`}
              initial={{ scale: 0.96, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.96, opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm text-center space-y-6 relative overflow-hidden"
            >
              {/* Card Progress */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-100 pb-4">
                <span>
                  Card {currentIndex + 1} of {vocabList.length}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[11px] font-bold">
                  Target: Band {currentItem.difficultyBand}
                </span>
              </div>

              {/* Front: Term */}
              <div className="space-y-3 py-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Term & Canadian Collocation
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {currentItem.term}
                </h2>
                <div className="text-sm font-semibold text-sky-700 bg-sky-50 px-4 py-1.5 rounded-full w-fit mx-auto border border-sky-200">
                  &ldquo;{currentItem.canadianCollocation}&rdquo;
                </div>
              </div>

              {/* Back: Definition & Context */}
              <AnimatePresence>
                {isRevealed ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-slate-100 space-y-4 overflow-hidden"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Definition</span>
                      <p className="text-base text-slate-800 font-medium max-w-lg mx-auto leading-relaxed">
                        {currentItem.definition}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-500 uppercase text-[10px]">Sample Context:</span>
                      <p className="italic text-slate-900 leading-relaxed font-serif">
                        &ldquo;{currentItem.sampleSentence}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsRevealed(true)}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-md transition cursor-pointer"
                  >
                    Reveal Definition & Sample
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Self-Rating Feedback Buttons (SM-2 Algorithm) */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2 shadow-xs"
              >
                <span className="text-center block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  How well did you recall this expression?
                </span>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGrade(1)}
                    className="py-2.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-2xl text-xs font-bold transition cursor-pointer"
                  >
                    Forgot (1)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGrade(2)}
                    className="py-2.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-2xl text-xs font-bold transition cursor-pointer"
                  >
                    Difficult (2)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGrade(3)}
                    className="py-2.5 px-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-2xl text-xs font-bold transition cursor-pointer"
                  >
                    Good (3)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGrade(5)}
                    className="py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold transition cursor-pointer"
                  >
                    Mastered (5)
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900">All due vocabulary cards reviewed!</h3>
          <p className="text-xs text-slate-500">Your spaced-repetition memory ledger is completely up to date.</p>
          <button
            onClick={loadVocab}
            className="px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Review Entire Bank Again
          </button>
        </motion.div>
      )}

      {/* Add Word Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200"
            >
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-600" /> Add Custom Word / Collocation
              </h3>
              <form onSubmit={handleAddNewWord} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Vocabulary Term</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ameliorate"
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Definition</label>
                  <textarea
                    required
                    placeholder="Make (something bad or unsatisfactory) better"
                    value={newDef}
                    onChange={(e) => setNewDef(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-600 h-16 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Canadian Collocation</label>
                  <input
                    type="text"
                    placeholder="e.g. ameliorate municipal traffic congestion"
                    value={newCollocation}
                    onChange={(e) => setNewCollocation(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sample Sentence</label>
                  <textarea
                    placeholder="The introduction of dedicated bus lanes will significantly ameliorate peak-hour bottlenecks."
                    value={newSentence}
                    onChange={(e) => setNewSentence(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-600 h-16 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                  >
                    Save to Flashcards
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
