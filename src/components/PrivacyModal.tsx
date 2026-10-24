import React from 'react';
import { ShieldCheck, Lock, HardDrive, Server, X, AlertTriangle } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#090e1a] border border-[#d4af37]/40 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Privacy Note: Complete Transparency
              </h3>
              <p className="text-xs text-slate-400">
                Honest breakdown of what leaves your device and what stays local.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Core Zero Data Collection Principle */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex gap-3 items-start">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-200 block mb-1">Zero Personal Accounts or Data Collection:</strong>
              <span>This learning hub does not require user accounts, email sign-ups, phone numbers, or passwords. We do not set marketing tracking cookies, run advertisements, or collect any personal financial identities.</span>
            </div>
          </div>

          {/* What Stays in the Browser */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <HardDrive className="w-4 h-4 text-[#d4af37]" />
              <span>What Stays Locally in Your Browser</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Quiz Progress:</strong> Which questions you have answered and revealed stays entirely in your current browser memory.</li>
              <li><strong>SIP Calculator Inputs:</strong> Your monthly amounts, expected return percentages, and year horizons are calculated client-side in real time and are never stored on any server.</li>
              <li><strong>Glossary Searches:</strong> Your search queries and alphabet letter filters remain local to your device session.</li>
            </ul>
          </div>

          {/* What Leaves Your Device */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Server className="w-4 h-4 text-blue-400" />
              <span>What Leaves Your Device</span>
            </div>
            <p className="text-slate-300">
              <strong>Tutor Chat Messages Only:</strong> When you submit a question in the AI Tutor chat, that specific text message is transmitted through our backend proxy to Google Gemini AI servers to generate an educational answer. Google may log and use this data as described in Google&apos;s privacy policy.
            </p>
          </div>

          {/* Safety Rule */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex gap-3 items-start">
            <AlertTriangle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#fae596] block mb-1">Our Safety Rule:</strong>
              <span>Never share sensitive private identifiers in the tutor chat, including your real name, phone number, PAN, bank account details, demat numbers, passwords, or personal portfolio screenshots.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
