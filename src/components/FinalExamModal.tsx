import React, { useState, useEffect, useCallback } from 'react';
import { FINAL_EXAM_QUESTIONS, ExamQuestion } from '../data/finalExamData';
import {
  ShieldAlert,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { CopyGuardModal } from './CopyGuardModal';
import {
  CourseProgress,
  saveCourseProgress,
  getRandomCopyRoast,
  generateCertificateId,
  getRandomQuote,
  formatCompletionDate,
} from '../utils/courseProgress';

interface FinalExamModalProps {
  isOpen: boolean;
  progress: CourseProgress;
  onClose: () => void;
  onUpdateProgress: (newProgress: CourseProgress) => void;
  onGoToCertificate: () => void;
}

const PASSING_SCORE = 10; // 10 out of 14 (approx 71%)

export const FinalExamModal: React.FC<FinalExamModalProps> = ({
  isOpen,
  progress,
  onClose,
  onUpdateProgress,
  onGoToCertificate,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [copyRoastModalOpen, setCopyRoastModalOpen] = useState(false);
  const [currentCopyRoast, setCurrentCopyRoast] = useState('');

  // Trigger copy roast popup
  const triggerCopyGuard = useCallback((e?: Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentCopyRoast(getRandomCopyRoast());
    setCopyRoastModalOpen(true);
  }, []);

  // Copy guard event listeners active ONLY during exam
  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    const handleCopyCut = (e: ClipboardEvent) => {
      triggerCopyGuard(e);
    };

    const handleContextMenu = (e: MouseEvent) => {
      triggerCopyGuard(e);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+C, Ctrl+X, Cmd+C, Cmd+X
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) {
        triggerCopyGuard(e);
      }
    };

    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitted, triggerCopyGuard]);

  // Reset attempt on new opening if not already submitted
  useEffect(() => {
    if (isOpen && !isSubmitted) {
      // Prevent body scrolling while exam mode is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = FINAL_EXAM_QUESTIONS.length;

  const handleSubmitExam = () => {
    let score = 0;
    FINAL_EXAM_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setExamScore(score);
    setIsSubmitted(true);

    const hasPassed = score >= PASSING_SCORE;

    if (hasPassed) {
      const updated: CourseProgress = {
        ...progress,
        finalExamPassed: true,
        finalExamScore: {
          score,
          total: totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
        },
        certificateId: progress.certificateId || generateCertificateId(),
        certificateQuote: progress.certificateQuote || getRandomQuote(),
        certificateDate: progress.certificateDate || formatCompletionDate(),
      };
      onUpdateProgress(updated);
      saveCourseProgress(updated);
    } else {
      const updated: CourseProgress = {
        ...progress,
        finalExamScore: {
          score,
          total: totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
        },
      };
      onUpdateProgress(updated);
      saveCourseProgress(updated);
    }
  };

  const handleExitAttempt = () => {
    if (isSubmitted) {
      onClose();
      return;
    }
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setExamScore(null);
    setShowExitConfirm(false);
    onClose();
  };

  const handleRetakeExam = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setExamScore(null);
  };

  const hasPassed = examScore !== null && examScore >= PASSING_SCORE;

  return (
    <div className="fixed inset-0 z-50 bg-[#070b16] overflow-y-auto flex flex-col animate-in fade-in select-none">
      {/* Top Exam Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#090e1d]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d4af37] to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Final Exam: Mutual Funds Mastery</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-[#fae596] border border-amber-500/40 font-semibold uppercase tracking-wider">
                Exam Mode
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              14 Comprehensive Questions Across All 7 Modules
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400">Progress:</span>
              <span className="font-bold text-[#d4af37]">
                {answeredCount} / {totalQuestions} Answered
              </span>
            </div>
          )}

          <button
            onClick={handleExitAttempt}
            className="px-3 py-1.5 rounded-xl border border-rose-800/60 bg-rose-950/40 text-rose-300 text-xs font-semibold hover:bg-rose-900/60 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isSubmitted ? 'Close' : 'Exit Exam'}</span>
          </button>
        </div>
      </header>

      {/* Main Exam Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Exam Mode Instruction Banner */}
        {!isSubmitted ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-[#d4af37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Strict Exam Mode Active</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                All external lessons and hints are locked until you submit. Copy and cut actions are guarded. Score at least 10 out of 14 correct (70%+) to earn your official Certificate.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shrink-0">
              Passing Mark: 10 / 14
            </div>
          </div>
        ) : (
          /* Submission Results Banner */
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 text-center shadow-2xl ${
              hasPassed
                ? 'bg-emerald-950/40 border-emerald-500/80 shadow-emerald-500/10'
                : 'bg-rose-950/40 border-rose-600/80 shadow-rose-500/10'
            }`}
          >
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-slate-900/80 border border-slate-700">
              {hasPassed ? (
                <Award className="w-8 h-8 text-[#d4af37]" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-400" />
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-slate-900 border border-slate-700 text-slate-300">
              {hasPassed ? 'Official Milestone Achieved' : 'Retake Required'}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {hasPassed
                ? 'Congratulations! You Passed the Final Exam!'
                : 'Good Effort, but You Fell Just Short'}
            </h3>

            <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
              {hasPassed
                ? `You scored ${examScore} out of ${totalQuestions} (${Math.round(
                    ((examScore || 0) / totalQuestions) * 100
                  )}%). Your Certificate of Completion has been generated and unlocked!`
                : `You scored ${examScore} out of ${totalQuestions}. You need at least ${PASSING_SCORE} out of ${totalQuestions} to earn your certificate. Review the detailed explanations below and try again.`}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {hasPassed ? (
                <button
                  onClick={() => {
                    onClose();
                    onGoToCertificate();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm shadow-xl shadow-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Claim Your Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRetakeExam}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm shadow-xl shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Final Exam</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {FINAL_EXAM_QUESTIONS.map((q, index) => {
            const userPick = selectedAnswers[q.id];
            const hasAnswered = userPick !== undefined;
            const isCorrect = userPick === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-slate-900/60 border-emerald-600/70'
                      : 'bg-slate-900/60 border-rose-700/70'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-[#d4af37] text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                      {index + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Module {q.levelId}
                    </span>
                  </div>

                  {isSubmitted && (
                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-rose-400 font-bold">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-white mb-4 leading-snug">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="space-y-2.5 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userPick === optIdx;
                    const isThisTheCorrectAnswer = q.correctIndex === optIdx;

                    let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isSubmitted) {
                      if (isThisTheCorrectAnswer) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-600 text-rose-300';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-[#d4af37]/15 border-[#d4af37] text-white font-semibold shadow-sm';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${optionStyle}`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                              isSelected
                                ? 'border-[#d4af37] text-[#d4af37] font-bold'
                                : 'border-slate-700 text-slate-500'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </span>

                        {isSubmitted && isThisTheCorrectAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation revealed only AFTER submission */}
                {isSubmitted && (
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-300'
                    }`}
                  >
                    <strong className="text-white block mb-1">
                      Correct Answer: {String.fromCharCode(65 + q.correctIndex)} ({q.options[q.correctIndex]})
                    </strong>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Exam Action Footer */}
        {!isSubmitted ? (
          <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {answeredCount === totalQuestions ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>All 14 questions answered. Ready to submit!</span>
                </span>
              ) : (
                <span>
                  Answered <strong className="text-white">{answeredCount}</strong> of{' '}
                  <strong className="text-white">{totalQuestions}</strong> questions.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleExitAttempt}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                Exit Attempt
              </button>

              <button
                onClick={handleSubmitExam}
                disabled={answeredCount === 0}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                Submit Exam
              </button>
            </div>
          </div>
        ) : (
          /* Bottom button after review */
          <div className="text-center pt-4 pb-8">
            {hasPassed ? (
              <button
                onClick={() => {
                  onClose();
                  onGoToCertificate();
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Claim Your Certificate</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleRetakeExam}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Retake Final Exam Now</span>
              </button>
            )}
          </div>
        )}
      </main>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#090e1d] border border-rose-800/80 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="mx-auto w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-700/60 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h4 className="text-base font-bold text-white">
              Discard Exam Attempt?
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Exiting the exam will discard all answers you have selected for this attempt. Are you sure you want to exit?
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all"
              >
                Continue Exam
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all"
              >
                Yes, Discard & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Guard Modal */}
      <CopyGuardModal
        isOpen={copyRoastModalOpen}
        message={currentCopyRoast}
        onDismiss={() => setCopyRoastModalOpen(false)}
      />
    </div>
  );
};
