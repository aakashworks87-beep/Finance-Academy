import React from 'react';
import { ShieldCheck, EyeOff, X } from 'lucide-react';

interface CopyGuardModalProps {
  isOpen: boolean;
  message: string;
  onDismiss: () => void;
}

export const CopyGuardModal: React.FC<CopyGuardModalProps> = ({
  isOpen,
  message,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-[#0a0f1d] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-[#d4af37]/25 blur-2xl rounded-full pointer-events-none" />

        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mb-4">
          <EyeOff className="w-7 h-7 text-[#d4af37] animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Exam Mode Active: Copy Blocked</span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-3">
          Eyes on Your Own Paper!
        </h3>

        {/* Message Card */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-amber-200 text-sm font-semibold leading-relaxed mb-6 italic shadow-inner">
          &ldquo;{message}&rdquo;
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Copy and cut actions are disabled during the Final Exam to preserve the genuine value of your certificate.
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          I Understand, Return to Exam
        </button>
      </div>
    </div>
  );
};
