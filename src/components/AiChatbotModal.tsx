import React, { useState, useRef, useEffect } from 'react';
import { LOGO_IMG_SRC } from '../assets/logo';
import { API_ENDPOINTS } from '../config/api';
import { ChatMessage } from '../types';
import { FormattedMessage } from './FormattedMessage';
import { TutorAvatar } from './TutorAvatar';
import {
  Sparkles,
  Send,
  X,
  User,
  BrainCircuit,
  Zap,
  BookOpen,
  Trash2,
  AlertTriangle,
  Volume2,
  VolumeX,
  Square,
  Loader2,
} from 'lucide-react';

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenExam: () => void;
  onOpenCertificate: () => void;
}

function parseMessageWithAction(content: string) {
  const regex = /\[ACTION:\s*(.*?)\s*\|\s*(.*?)\]/g;
  let match;
  let text = content;
  const actions: { label: string; target: string }[] = [];

  while ((match = regex.exec(content)) !== null) {
    actions.push({ label: match[1], target: match[2] });
  }

  text = text.replace(regex, '').trim();
  return { text, actions };
}

// Clean text for speech synthesis: strip action markers, markdown asterisks, URLs
function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/\[ACTION:.*?\]/g, '')
    .replace(/[*_#`~]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .trim();
}

export const AiChatbotModal: React.FC<AiChatbotModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenExam,
  onOpenCertificate,
}) => {
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

  // Tutor Voice Settings
  // Requirement: Voice is OFF by default. Answers are text-only when OFF.
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Record<string, string>>({});

  // Stop any currently playing audio
  const stopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    setPlayingMessageId(null);
    setAudioLoadingId(null);
  };

  // Toggle voice on/off
  const toggleVoice = () => {
    if (voiceEnabled) {
      // User turned voice OFF: immediately halt any speaking audio
      stopAudio();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
    }
  };

  // Play audio for a specific tutor message
  const handlePlayAudio = async (messageId: string, rawContent: string) => {
    if (!voiceEnabled) return;

    // If currently playing this same message, clicking speaker stops it
    if (playingMessageId === messageId) {
      stopAudio();
      return;
    }

    // Stop any other currently playing message first
    stopAudio();

    const spokenText = cleanTextForSpeech(rawContent);
    if (!spokenText) return;

    // Check memory cache first
    const cachedUrl = audioCacheRef.current[messageId];
    if (cachedUrl) {
      playAudioElement(messageId, cachedUrl);
      return;
    }

    // Fetch from backend /api/tts
    setAudioLoadingId(messageId);
    try {
      const response = await fetch(API_ENDPOINTS.tts, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: spokenText }),
      });

      if (!response.ok) {
        throw new Error('TTS failed');
      }

      let audioUrl = '';
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (data.audio) {
          audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audio}`;
        } else {
          throw new Error('No audio in response');
        }
      } else {
        const audioBlob = await response.blob();
        audioUrl = URL.createObjectURL(audioBlob);
      }

      audioCacheRef.current[messageId] = audioUrl;

      // Ensure voice is still enabled before playing
      if (voiceEnabled) {
        playAudioElement(messageId, audioUrl);
      }
    } catch (err) {
      console.error('Audio playback error:', err);
      setPlayingMessageId(null);
    } finally {
      setAudioLoadingId(null);
    }
  };

  const playAudioElement = (messageId: string, url: string) => {
    const audio = new Audio(url);
    audioPlayerRef.current = audio;
    setPlayingMessageId(messageId);

    audio.onended = () => {
      setPlayingMessageId(null);
      audioPlayerRef.current = null;
    };
    audio.onerror = () => {
      setPlayingMessageId(null);
      audioPlayerRef.current = null;
    };
    audio.onpause = () => {
      if (audioPlayerRef.current === audio && audio.ended) {
        setPlayingMessageId(null);
      }
    };

    audio.play().catch((err) => {
      console.warn('Playback error or blocked:', err);
      setPlayingMessageId(null);
    });
  };

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
    } else {
      // When closed, stop audio
      stopAudio();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
      // Note: Voice NEVER plays automatically per explicit requirement
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
    stopAudio();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl bg-[#09090b] border border-white/10 rounded-2xl h-[92vh] max-h-[820px] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-3 sm:p-4 border-b border-white/10 bg-[#0c0d12] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMG_SRC}
              alt="Finance Academy Logo"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-xl object-cover border border-[#d4af37]/40 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-serif font-black text-white tracking-wide">
                  Aakash AI Finance Tutor
                </h3>
                {/* Truthful Online/Offline badge based on health check */}
                {isOnline === true ? (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-sans font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 font-sans font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>Offline</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Educational answers on Indian mutual funds, RBI policies, and SEBI rules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice On/Off Toggle Button */}
            <button
              onClick={toggleVoice}
              title={voiceEnabled ? 'Turn Voice Off' : 'Turn Voice On (Gemini TTS)'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans font-semibold border transition-all ${
                voiceEnabled
                  ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-sm'
                  : 'bg-black/50 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="hidden sm:inline">Voice: ON</span>
                  <span className="sm:hidden">ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Voice: OFF</span>
                  <span className="sm:hidden">OFF</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              title="Clear conversation"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              title="Close tutor"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="px-4 py-2 bg-[#0c0d12]/90 border-b border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-sans font-medium hidden sm:inline">Tutor Mode:</span>
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setChatMode('standard')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-sans font-semibold transition-all ${
                chatMode === 'standard'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Standard Tutor</span>
            </button>

            <button
              onClick={() => setChatMode('deep')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-sans font-semibold transition-all ${
                chatMode === 'deep'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Deep Analysis</span>
            </button>

            <button
              onClick={() => setChatMode('fast')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-sans font-semibold transition-all ${
                chatMode === 'fast'
                  ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Quick Answers</span>
            </button>
          </div>
        </div>

        {/* Main Body: Tutor Character beside Chat (desktop) / above Chat (mobile) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Tutor Character Side Panel */}
          <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-white/10 bg-[#0b0c10] p-3 sm:p-4 flex md:flex-col items-center justify-between md:justify-start gap-3 shrink-0">
            {/* Cartoon Tutor Avatar */}
            <div className="flex md:flex-col items-center gap-3 md:gap-2">
              <TutorAvatar isSpeaking={playingMessageId !== null} />
            </div>

            {/* Quick Context & Voice Info for Desktop */}
            <div className="hidden md:flex flex-col gap-2.5 w-full mt-3 pt-3 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <p className="text-[11px] font-sans font-semibold text-slate-200">
                  Voice Guide:
                </p>
                <p className="text-[10px] font-sans text-slate-400 leading-relaxed">
                  {voiceEnabled
                    ? 'Voice is active. Click the speaker icon beside any tutor reply to hear it spoken aloud.'
                    : 'Voice is currently muted. Turn Voice ON above if you want to listen to explanations.'}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <p className="text-[11px] font-sans font-semibold text-slate-200">
                  Ask me about:
                </p>
                <ul className="text-[10px] font-sans text-slate-400 space-y-0.5 list-disc list-inside">
                  <li>Mutual fund categories and NAV</li>
                  <li>RBI repo rate changes and FDs</li>
                  <li>SEBI investor safeguards</li>
                  <li>Website guide and certification</li>
                </ul>
              </div>
            </div>

            {/* Mobile Voice Status Pill */}
            <div className="md:hidden flex flex-col items-end gap-1">
              <span className="text-[10px] font-sans text-slate-400">
                Voice: {voiceEnabled ? 'Enabled' : 'Muted'}
              </span>
              {playingMessageId && (
                <span className="text-[9px] font-sans px-2 py-0.5 rounded-full bg-[#d4af37] text-slate-950 font-bold animate-pulse">
                  Playing audio
                </span>
              )}
            </div>
          </aside>

          {/* Chat Messages + Input Column */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
            {/* Messages Thread */}
            <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                const isThisPlaying = playingMessageId === m.id;
                const isThisAudioLoading = audioLoadingId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 sm:gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    {isUser ? (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-slate-800 text-slate-200 border border-white/10">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#121318] border border-[#d4af37]/30 text-[#d4af37]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[88%] sm:max-w-[80%] space-y-1 ${isUser ? 'text-right' : ''}`}>
                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                          isUser
                            ? 'bg-[#1e2029] text-slate-100 rounded-tr-none border border-white/10 whitespace-pre-wrap font-sans'
                            : 'bg-[#121318] text-slate-200 border border-white/10 rounded-tl-none shadow-md font-sans'
                        }`}
                      >
                        {isUser ? (
                          m.content
                        ) : (
                          (() => {
                            const { text, actions } = parseMessageWithAction(m.content);
                            return (
                              <>
                                <FormattedMessage content={text} />
                                {actions.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                    {actions.map((act, actIdx) => (
                                      <button
                                        key={actIdx}
                                        onClick={() => {
                                          stopAudio();
                                          onClose();
                                          if (act.target === 'exam') {
                                            onOpenExam();
                                          } else if (act.target === 'certificate') {
                                            onOpenCertificate();
                                          } else {
                                            onNavigateSection(act.target);
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d4af37] text-slate-950 font-sans font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                                      >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{act.label}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </>
                            );
                          })()
                        )}
                      </div>

                      {/* Footer under message: Timestamp and Speaker Play Button */}
                      <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-500 ${isUser ? 'justify-end' : 'justify-between'}`}>
                        <span>{m.timestamp}</span>

                        {/* Speaker button: Only shown when voice is enabled and message is from model */}
                        {!isUser && voiceEnabled && (
                          <button
                            onClick={() => handlePlayAudio(m.id, m.content)}
                            disabled={isThisAudioLoading}
                            title={isThisPlaying ? 'Stop speaking' : 'Listen to answer'}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold border transition-all ${
                              isThisPlaying
                                ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm'
                                : 'bg-black/40 text-slate-300 hover:text-white border-white/10 hover:border-[#d4af37]/40'
                            }`}
                          >
                            {isThisAudioLoading ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-[#d4af37]" />
                                <span>Generating voice...</span>
                              </>
                            ) : isThisPlaying ? (
                              <>
                                <Square className="w-3 h-3 fill-current" />
                                <span>Stop audio</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-[#d4af37]" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
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
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121318] border border-white/10 rounded-tl-none text-xs text-slate-300 flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-amber-200/90 ml-1 font-sans">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length <= 2 && (
              <div className="px-3 sm:px-4 py-2 border-t border-white/10 bg-[#0c0d12]/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <span className="text-[11px] text-slate-400 shrink-0 font-sans font-medium">Try asking:</span>
                {[
                  'What is NAV?',
                  'Direct vs Regular plan math',
                  'How repo rate affects home loans',
                  'LTCG tax above ₹1.25 Lakh',
                  'Guide me through the website',
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:border-[#d4af37]/40 border border-white/10 text-slate-300 text-[11px] font-sans transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Privacy Warning Box */}
            <div className="mx-3 sm:mx-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-[11px] text-amber-200/90 leading-tight">
              <AlertTriangle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="font-sans">
                Please do not share personal details here: no names, phone numbers, PAN, bank account numbers, passwords, or portfolio screenshots. Your messages are sent to Google&apos;s AI servers to generate answers, and Google may log and use this data as described in Google&apos;s privacy policy.
              </p>
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-[#0c0d12] border-t border-white/10">
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
                  className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-[#14151b] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#d4af37] transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-4 py-2.5 sm:py-3 rounded-xl bg-[#d4af37] text-slate-950 font-sans font-bold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-slate-500 mt-2 px-1 text-center font-sans">
                Educational guidance only. Never a stock or fund buy recommendation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
