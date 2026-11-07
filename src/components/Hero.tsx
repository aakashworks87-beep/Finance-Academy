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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Emblem Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-[#d4af37]/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy by Aakash Emblem"
              referrerPolicy="no-referrer"
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/15 shadow-2xl"
            />
          </div>
        </div>

        {/* Small Label in Manrope */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121318] border border-white/10 shadow-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="text-xs font-sans font-semibold text-[#f1f5f9] tracking-wider uppercase">
            Finance Academy by Aakash &bull; Free Investor Education
          </span>
        </div>

        {/* Hero Headline: Fraunces 900. "Learn Finance." in silver white, "Build Wealth." in dark letters on gold marker band */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight leading-[1.12] mb-6">
          <span className="text-[#f1f5f9] block sm:inline">Learn Finance.</span>{' '}
          <span className="relative inline-block bg-[#d4af37] text-slate-950 px-3.5 py-0.5 rounded-sm shadow-sm rotate-[-0.5deg]">
            Build Wealth.
          </span>
        </h1>

        {/* One-line promise */}
        <p className="text-xl sm:text-2xl md:text-2xl font-serif font-semibold text-slate-200 max-w-3xl mx-auto mb-5 leading-snug">
          Go from &ldquo;what is a mutual fund&rdquo; to reading a factsheet like a pro.
        </p>

        {/* Sub-description in Newsreader body font */}
        <p className="text-base sm:text-lg font-serif text-slate-300/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          A completely free learning hub designed for Indian beginners. Zero jargon, grounded in real INR math, standard textbook finance, and direct regulatory insights from the RBI and SEBI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartLearning}
            className="px-7 py-3.5 rounded-xl font-sans font-bold text-sm text-slate-950 bg-[#d4af37] hover:brightness-110 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Start Learning</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-3.5 rounded-xl font-sans font-semibold text-sm text-slate-200 bg-[#121318] border border-white/10 hover:border-white/25 hover:text-white transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            <span>Try SIP Calculator</span>
          </button>

          <button
            onClick={onOpenAi}
            className="px-6 py-3.5 rounded-xl font-sans font-semibold text-sm text-[#fae596] bg-black/60 border border-[#d4af37]/35 hover:bg-[#d4af37]/10 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Ask AI Tutor</span>
          </button>
        </div>

        {/* Calm Night Classroom Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
          <div className="p-4 rounded-xl bg-[#0f1015] border border-white/10 shadow-sm hover:border-white/25 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-serif font-black text-white mb-0.5">
              <Layers className="w-5 h-5 text-[#d4af37]" />
              <span>7</span>
            </div>
            <div className="text-xs font-sans text-slate-400 font-medium">Core Modules</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f1015] border border-white/10 shadow-sm hover:border-white/25 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-serif font-black text-white mb-0.5">
              <HelpCircle className="w-5 h-5 text-[#d4af37]" />
              <span>21</span>
            </div>
            <div className="text-xs font-sans text-slate-400 font-medium">Interactive Quizzes</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f1015] border border-white/10 shadow-sm hover:border-white/25 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-serif font-black text-white mb-0.5">
              <BookOpenCheck className="w-5 h-5 text-[#d4af37]" />
              <span>75+</span>
            </div>
            <div className="text-xs font-sans text-slate-400 font-medium">Glossary Terms</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f1015] border border-white/10 shadow-sm hover:border-white/25 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-serif font-black text-[#d4af37] mb-0.5">
              <span>100%</span>
            </div>
            <div className="text-xs font-sans text-slate-400 font-medium">Free & Ad-Free</div>
          </div>
        </div>

        {/* Visible Education Disclaimer */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121318] border border-amber-500/25 text-xs text-amber-200/90 text-left max-w-2xl mx-auto shadow-sm">
          <ShieldAlert className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span className="font-sans leading-relaxed">
            <strong>Investor Notice:</strong> This is purely educational content, not financial or investment advice. We never recommend specific mutual fund schemes or stocks to buy or sell. Mutual funds are subject to market risks.
          </span>
        </div>
      </div>
    </section>
  );
};
