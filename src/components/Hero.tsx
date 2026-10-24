import React from 'react';
import { LOGO_IMG_SRC } from '../assets/logo';
import { ArrowDown, BookOpenCheck, ShieldAlert, Sparkles, TrendingUp, Layers, HelpCircle } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
  onOpenCalculator: () => void;
  onOpenAi: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onOpenCalculator, onOpenAi }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#d4af37]/10 via-amber-600/5 to-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/5 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Emblem Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-amber-400/20 to-[#d4af37]/40 blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy by Aakash Emblem"
              referrerPolicy="no-referrer"
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#d4af37]/60 shadow-2xl shadow-[#d4af37]/20"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#d4af37]/40 shadow-inner mb-6">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="text-xs font-semibold text-[#d4af37] tracking-wide uppercase">
            Free Investor Education Initiative
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Finance Academy <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-slate-100 to-[#d4af37] bg-clip-text text-transparent">
            by Aakash
          </span>
        </h1>

        {/* One-line promise as requested */}
        <p className="text-xl sm:text-2xl md:text-2xl font-semibold text-amber-200/95 max-w-3xl mx-auto mb-5 leading-snug">
          Go from &ldquo;what is a mutual fund&rdquo; to reading a factsheet like a pro.
        </p>

        {/* Sub-description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          A completely free learning hub designed for Indian beginners. Zero jargon, grounded in real INR math, standard textbook finance, and direct regulatory insights from the RBI and SEBI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartLearning}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] shadow-lg shadow-[#d4af37]/20 hover:shadow-xl hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Start Learning</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-[#d4af37]/50 hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            <span>Try SIP Calculator</span>
          </button>

          <button
            onClick={onOpenAi}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-[#fae596] bg-[#d4af37]/10 border border-[#d4af37]/30 hover:bg-[#d4af37]/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Ask AI Tutor</span>
          </button>
        </div>

        {/* Small stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white mb-0.5">
              <Layers className="w-5 h-5 text-[#d4af37]" />
              <span>7</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Core Modules</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white mb-0.5">
              <HelpCircle className="w-5 h-5 text-[#d4af37]" />
              <span>21</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Interactive Quizzes</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white mb-0.5">
              <BookOpenCheck className="w-5 h-5 text-[#d4af37]" />
              <span>75+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Glossary Terms</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-[#d4af37] mb-0.5">
              <span>100%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Free & Ad-Free</div>
          </div>
        </div>

        {/* Visible Education Disclaimer */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 text-left max-w-2xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span>
            <strong>Investor Notice:</strong> This is purely educational content, not financial or investment advice. We never recommend specific mutual fund schemes or stocks to buy or sell. Mutual funds are subject to market risks.
          </span>
        </div>
      </div>
    </section>
  );
};
