import React, { useState } from 'react';
import { BookOpen, Sparkles, Menu, X, Calculator, ShieldCheck, Landmark, Library } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Course', href: '#course', icon: BookOpen },
    { label: 'Beyond MFs', href: '#beyond', icon: Landmark },
    { label: 'RBI & SEBI', href: '#regulators', icon: ShieldCheck },
    { label: 'SIP Calculator', href: '#calculator', icon: Calculator },
    { label: 'Glossary', href: '#glossary', icon: Library },
    { label: 'Regulatory Sources', href: '#regulatory-topics' },
    { label: 'Analysis', href: '#analysis' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080d1a]/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/images/academy_logo.jpg"
              alt="Finance Academy by Aakash Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/40 shadow-sm group-hover:border-[#d4af37] transition-all"
            />
            <div>
              <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Finance Academy</span>
                <span className="text-[#d4af37] text-xs px-1.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">by Aakash</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Free Investor Learning Hub</div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-[#d4af37] bg-[#d4af37]/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action: Ask AI Mentor */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAiChat}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              <span>Ask Aakash AI Tutor</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAiChat}
              className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#080d1a] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-[#d4af37] hover:bg-slate-800/80"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-[#d4af37] to-amber-400"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Gemini AI Mentor</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
