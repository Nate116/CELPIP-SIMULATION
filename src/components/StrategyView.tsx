import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, Copy, Check, ArrowLeft } from 'lucide-react';
import { STRATEGY_CARDS, StrategyCard } from '../data/strategyCards';

interface StrategyViewProps {
  onBack: () => void;
}

export const StrategyView: React.FC<StrategyViewProps> = ({ onBack }) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(STRATEGY_CARDS[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentCard: StrategyCard =
    STRATEGY_CARDS.find((c) => c.id === selectedCardId) || STRATEGY_CARDS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">CELPIP Test-Day Strategy & Score Maximizers</h1>
            <p className="text-xs text-slate-500">Official scoring rubrics, templates, timing formulas & trap decoders</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Calibrated for Band 11–12 Top Tier</span>
        </div>
      </div>

      {/* Main Grid: Sidebar Selector & Card Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
            Select Assessment Component
          </span>
          {STRATEGY_CARDS.map((card) => {
            const isSelected = card.id === selectedCardId;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`w-full text-left p-3.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-xs uppercase opacity-80">{card.section}</div>
                  <div className="text-sm font-semibold truncate mt-0.5">{card.title}</div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Pane: Strategy Card Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              {currentCard.section} Mastery Guide
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{currentCard.title}</h2>
          </div>

          {/* Timing Plan */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-slate-700 uppercase">Optimal Timing Formula:</span>
            <p className="text-slate-800 font-medium">{currentCard.timingPlan}</p>
          </div>

          {/* Score Maximizers */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Score Maximizer Rules (How to Exploit Criteria)
            </h3>
            <div className="space-y-2">
              {currentCard.scoreMaximizerTips.map((tip, i) => (
                <div key={i} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs md:text-sm text-emerald-950 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trap Patterns */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm text-rose-800">
              Common Trap Patterns to Avoid:
            </h3>
            <div className="space-y-2">
              {currentCard.trapPatterns.map((trap, i) => (
                <div key={i} className="p-3 bg-rose-50/50 border border-rose-200 rounded-xl text-xs text-rose-950">
                  • {trap}
                </div>
              ))}
            </div>
          </div>

          {/* Templates (if applicable) */}
          {currentCard.templates && currentCard.templates.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> High-Band Structural Templates
              </h3>
              {currentCard.templates.map((tpl, tIdx) => (
                <div key={tIdx} className="border border-indigo-200 rounded-xl overflow-hidden bg-indigo-50/20">
                  <div className="bg-indigo-100/70 p-3 font-bold text-xs text-indigo-950 flex items-center justify-between">
                    <span>{tpl.name}</span>
                  </div>
                  <div className="p-4 space-y-3 text-xs">
                    <div className="space-y-1.5 text-slate-700">
                      {tpl.structure.map((s, si) => (
                        <div key={si} className="flex items-start gap-2">
                          <span className="font-bold text-indigo-700 shrink-0">•</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-indigo-100 space-y-1.5">
                      <span className="font-bold text-slate-700 block">Recommended Sentence Openers:</span>
                      {tpl.phrases.map((phrase, pi) => (
                        <div key={pi} className="flex items-center justify-between p-2 bg-white rounded-lg border border-indigo-100 text-indigo-900">
                          <span className="italic">&ldquo;{phrase}&rdquo;</span>
                          <button
                            onClick={() => handleCopy(phrase)}
                            className="text-slate-400 hover:text-indigo-600 p-1 cursor-pointer"
                            title="Copy phrase"
                          >
                            {copiedText === phrase ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* High-Band Linking Expressions */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase">
              High-Band Discourse Markers & Linking Words:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {currentCard.linkingWords.map((word, wi) => (
                <span key={wi} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
