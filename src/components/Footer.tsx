import React from 'react';
import { LOGO_IMG_SRC } from '../assets/logo';
import { ExternalLink, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] text-slate-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy Logo"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-xl object-cover border border-[#d4af37]/40 shadow-sm shrink-0"
            />
            <div>
              <div className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                <span>Finance Academy</span>
                <span className="text-[#d4af37] text-xs px-2 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
                  by Aakash
                </span>
              </div>
              {/* Required footer text */}
              <p className="text-xs sm:text-sm text-slate-300">
                Built for learners. Educational content only, not investment advice.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Honest Privacy Note Button */}
            <button
              onClick={onOpenPrivacy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-[#d4af37]/40 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Privacy Note</span>
            </button>

            {/* Required link to https://aakashworks87-beep.github.io/rupeenotes/ */}
            <a
              href="https://aakashworks87-beep.github.io/rupeenotes/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-[#d4af37]/40 text-xs sm:text-sm font-semibold text-[#fae596] hover:bg-[#d4af37]/15 hover:border-[#d4af37] transition-all shadow-sm"
            >
              <span>Visit RupeeNotes by Aakash</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Detailed Regulatory Disclaimers */}
        <div className="space-y-3 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <p>
            <strong>Statutory Mutual Fund Disclaimer:</strong> Mutual fund investments are subject to market risks. Please read all scheme related documents, key information memorandums (KIM), and scheme information documents (SID) carefully before investing. Past performance is no guarantee of future returns.
          </p>
          <p>
            <strong>Regulatory Independence:</strong> This learning portal is an independent educational resource created by Aakash. It is not affiliated with any specific Asset Management Company, bank, stockbroker, or government agency. We do not solicit investments, sell financial products, or collect investment advisory fees.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Finance Academy by Aakash. Free for all Indian retail investors.
          </div>
          <div className="flex items-center gap-4">
            <a href="#course" className="hover:text-white transition-colors">Course</a>
            <a href="#beyond" className="hover:text-white transition-colors">Beyond MFs</a>
            <a href="#regulators" className="hover:text-white transition-colors">RBI &amp; SEBI</a>
            <a href="#calculator" className="hover:text-white transition-colors">SIP Calculator</a>
            <a href="#glossary" className="hover:text-white transition-colors">Glossary</a>
            <button onClick={onOpenPrivacy} className="hover:text-[#d4af37] transition-colors">Privacy Note</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
