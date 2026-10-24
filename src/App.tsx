import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MutualFundsCourse } from './components/MutualFundsCourse';
import { BeyondMutualFunds } from './components/BeyondMutualFunds';
import { RegulatorsGuide } from './components/RegulatorsGuide';
import { SipCalculator } from './components/SipCalculator';
import { Glossary } from './components/Glossary';
import { LiveUpdates } from './components/LiveUpdates';
import { MyAnalysis } from './components/MyAnalysis';
import { AiChatbotModal } from './components/AiChatbotModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('course');

  // Track active section for top nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['course', 'beyond', 'regulators', 'calculator', 'glossary', 'regulatory-topics', 'analysis'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fae596]">
      {/* Top Navigation */}
      <Navbar
        onOpenAiChat={() => setIsAiModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartLearning={() => scrollTo('course')}
          onOpenCalculator={() => scrollTo('calculator')}
          onOpenAi={() => setIsAiModalOpen(true)}
        />

        {/* 2. Learn Mutual Funds (Levels 1 to 7) */}
        <MutualFundsCourse />

        {/* 3. Investing Beyond MFs */}
        <BeyondMutualFunds />

        {/* 4 & 5. Understand RBI and SEBI */}
        <RegulatorsGuide />

        {/* 9. Tools: Working SIP Calculator */}
        <SipCalculator />

        {/* 6. Glossary (A to Z) */}
        <Glossary />

        {/* 7. Key regulatory topics, curated from official sources */}
        <LiveUpdates />

        {/* 8. My Analysis (Blog) */}
        <MyAnalysis />
      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />

      {/* Floating Ask Aakash AI Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-[#d4af37]/25 hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-105 active:scale-95 transition-all"
          aria-label="Open AI Mentor"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="tracking-wide">Ask Aakash AI Tutor</span>
        </button>
      </div>

      {/* Gemini AI Multi-turn Chatbot Modal */}
      <AiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Honest Privacy Note Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
