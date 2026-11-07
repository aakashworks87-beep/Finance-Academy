import React, { useState } from 'react';
import { LOGO_IMG_SRC } from '../assets/logo';
import { BookOpen, Sparkles, Menu, X, Calculator, ShieldCheck, Landmark, Library, Award, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat: () => void;
  activeSection: string;
  onCertificateClick: () => void;
  isCertificateUnlocked: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiChat,
  activeSection,
  onCertificateClick,
  isCertificateUnlocked,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Course', href: '#course', icon: BookOpen },
    { label: 'Beyond MFs', href: '#beyond', icon: Landmark },
    { label: 'RBI & SEBI', href: '#regulators', icon: ShieldCheck },
    { label: 'SIP Calculator', href: '#calculator', icon: Calculator },
    { label: 'Glossary', href: '#glossary', icon: Library },
    { label: 'Live Updates', href: '#regulatory-topics' },
    { label: 'Analysis', href: '#analysis' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/85 border-b border-white/10 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy by Aakash Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/40 shadow-sm group-hover:border-[#d4af37] transition-all"
            />
            <div>
              <div className="text-base font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Finance Academy</span>
                <span className="text-[#d4af37] text-xs px-1.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 font-sans">by Aakash</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">Free Investor Learning Hub</div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide transition-all ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-[#d4af37] bg-white/5 border border-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action: Certificate & Ask AI Tutor */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onCertificateClick}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-semibold border transition-all ${
                isCertificateUnlocked
                  ? 'bg-amber-500/15 border-amber-500/50 text-[#fae596] hover:bg-amber-500/25'
                  : 'bg-[#121318] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {isCertificateUnlocked ? (
                <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>Certificate</span>
            </button>

            <button
              onClick={onOpenAiChat}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-950 bg-[#d4af37] hover:brightness-110 transition-all active:scale-95 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              <span>Ask Aakash AI Tutor</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAiChat}
              className="p-2 rounded-lg bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 text-xs flex items-center gap-1 font-sans font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-black/95 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-sans font-medium text-slate-200 hover:text-[#d4af37] hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCertificateClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-semibold border border-white/10 bg-[#121318] text-slate-200"
            >
              {isCertificateUnlocked ? (
                <Award className="w-4 h-4 text-[#d4af37]" />
              ) : (
                <Lock className="w-4 h-4 text-slate-500" />
              )}
              <span>{isCertificateUnlocked ? 'Claim Certificate' : 'Certificate (Locked)'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-bold text-slate-950 bg-[#d4af37]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Aakash AI Tutor</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
