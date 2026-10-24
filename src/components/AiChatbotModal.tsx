import React, { useState, useRef, useEffect } from 'react';
import { LOGO_IMG_SRC } from '../assets/logo';
import { API_ENDPOINTS } from '../config/api';
import { ChatMessage } from '../types';
import { FormattedMessage } from './FormattedMessage';
import { Sparkles, Send, X, Bot, User, BrainCircuit, Zap, BookOpen, Trash2, AlertTriangle } from 'lucide-react';

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatbotModal: React.FC<AiChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'Namaste! I am your AI Financial Tutor at Finance Academy by Aakash. I can explain any mutual fund concept, break down factsheets, demystify RBI policies, clarify SEBI safeguards, or help test your knowledge. What would you like to explore today?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'standard' | 'deep' | 'fast'>('standard');
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check backend health for genuine online/offline status
  const checkHealth = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.health);
      if (res.ok) {
        const data = await res.json();
        setIsOnline(Boolean(data.online));
      } else {
        setIsOnline(false);
      }
    } catch {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode: chatMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend failed');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Never show raw API error JSON to users
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'The tutor is having trouble right now, please try again in a bit.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: 'Conversation cleared. How can I help you learn about Indian mutual funds or investing today?',
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl bg-[#090e1a] border border-[#d4af37]/40 rounded-2xl h-[90vh] max-h-[750px] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy Logo"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-xl object-cover border border-[#d4af37]/40 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Aakash AI Finance Tutor
                </h3>
                {/* Truthful Online/Offline badge based on health check */}
                {isOnline === true ? (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>Offline</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Educational answers on Indian mutual funds, RBI policies, and SEBI rules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClear}
              title="Clear conversation"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close tutor"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real Model Mode Switcher without fictional names */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium hidden sm:inline">Tutor Mode:</span>
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setChatMode('standard')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chatMode === 'standard'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Standard Tutor</span>
            </button>

            <button
              onClick={() => setChatMode('deep')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chatMode === 'deep'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Deep Analysis</span>
            </button>

            <button
              onClick={() => setChatMode('fast')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chatMode === 'fast'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Quick Answers</span>
            </button>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {isUser ? (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-blue-600 text-white">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <img
                    src={LOGO_IMG_SRC}
                    alt="AI Tutor"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-xl object-cover border border-[#d4af37]/40 shadow-sm shrink-0"
                  />
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-1 ${isUser ? 'text-right' : ''}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                      isUser
                        ? 'bg-blue-600/90 text-white rounded-tr-none whitespace-pre-wrap'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800/90 rounded-tl-none shadow-md'
                    }`}
                  >
                    {isUser ? m.content : <FormattedMessage content={m.content} />}
                  </div>
                  <div className="text-[10px] text-slate-500 px-1">
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#d4af37] text-slate-950 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-none text-xs text-slate-300 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
                <span className="text-amber-200/90 ml-1">
                  Crafting educational response...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">Try asking:</span>
            {[
              'What is NAV?',
              'Direct vs Regular plan math',
              'How repo rate affects home loans',
              'LTCG tax above Rs 1.25 Lakh',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-[#d4af37]/20 hover:border-[#d4af37]/40 border border-slate-700 text-slate-300 text-[11px] transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Explicit Privacy Warning Box Directly Above Input */}
        <div className="mx-3 sm:mx-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-[11px] text-amber-200/90 leading-tight">
          <AlertTriangle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p>
            Please do not share personal details here: no names, phone numbers, PAN, bank account numbers, passwords, or portfolio screenshots. Your messages are sent to Google&apos;s AI servers to generate answers, and Google may log and use this data as described in Google&apos;s privacy policy.
          </p>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about mutual funds, RBI, SEBI, or tax rules..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-400 text-slate-950 font-bold hover:shadow-lg hover:shadow-[#d4af37]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-500 mt-2 px-1 text-center">
            Educational guidance only. Never a stock or fund buy recommendation.
          </div>
        </div>
      </div>
    </div>
  );
};
