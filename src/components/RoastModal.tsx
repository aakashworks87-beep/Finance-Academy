import React from 'react';
import { ShieldAlert, ArrowRight, Lock, Sparkles } from 'lucide-react';

interface RoastModalProps {
  isOpen: boolean;
  message: string;
  nextRequiredLevel: number;
  attemptedItemName: string;
  onDismiss: () => void;
}

export const RoastModal: React.FC<RoastModalProps> = ({
  isOpen,
  message,
  nextRequiredLevel,
  attemptedItemName,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-[#090e1a] border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#d4af37]/20 blur-2xl rounded-full pointer-events-none" />

        {/* Lock / Alert Header Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center mb-5 shadow-inner">
          <Lock className="w-8 h-8 text-[#d4af37] animate-pulse" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Cheat Guard Triggered</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
          Hold on, Champion!
        </h3>

        <p className="text-xs text-slate-400 mb-5">
          You tried to open <span className="text-amber-300 font-semibold">{attemptedItemName}</span> before earning it.
        </p>

        {/* Roast Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner mb-6 text-left relative">
          <div className="text-[#d4af37] text-2xl font-serif leading-none mb-1">&ldquo;</div>
          <p className="text-sm sm:text-base font-semibold text-amber-100 leading-relaxed pl-2 italic">
            {message}
          </p>
          <div className="text-right text-[#d4af37] text-2xl font-serif leading-none mt-1">&rdquo;</div>
        </div>

        {/* Guidance info */}
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Finance Academy rewards real financial understanding, not hurried clicks. Complete{' '}
          <strong className="text-white">Level {nextRequiredLevel}</strong> and score at least 2 out of 3 on its quiz to unlock the next step.
        </p>

        {/* CTA Button */}
        <button
          onClick={onDismiss}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm shadow-xl shadow-[#d4af37]/25 hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Take Me to Level {nextRequiredLevel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
