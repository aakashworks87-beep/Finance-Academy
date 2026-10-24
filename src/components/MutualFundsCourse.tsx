import React, { useState, useEffect } from 'react';
import { COURSE_LEVELS } from '../data/courseData';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Calculator,
  HelpCircle,
  ChevronRight,
  Award,
  Lock,
  Sparkles,
  RefreshCw,
  FileCheck2,
} from 'lucide-react';
import {
  CourseProgress,
  isLevelUnlocked,
  isFinalExamUnlocked,
  isCertificateUnlocked,
  getNextRequiredLevel,
  saveCourseProgress,
} from '../utils/courseProgress';

interface MutualFundsCourseProps {
  progress: CourseProgress;
  onUpdateProgress: (newProgress: CourseProgress) => void;
  onOpenExam: () => void;
  onOpenCertificate: () => void;
  onAttemptLockedItem: (itemName: string) => void;
  activeLevelId: number;
  setActiveLevelId: (lvl: number) => void;
}

export const MutualFundsCourse: React.FC<MutualFundsCourseProps> = ({
  progress,
  onUpdateProgress,
  onOpenExam,
  onOpenCertificate,
  onAttemptLockedItem,
  activeLevelId,
  setActiveLevelId,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<Record<number, boolean>>({});

  const activeLevel = COURSE_LEVELS.find((l) => l.id === activeLevelId) || COURSE_LEVELS[0];

  const isLevelPassed = progress.passedLevels.includes(activeLevel.id);
  const currentQuizSubmitted = isQuizSubmitted[activeLevel.id] || isLevelPassed;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (currentQuizSubmitted && !isLevelPassed) {
      // Allow modifying during retake
    }
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleLevelTabClick = (levelId: number) => {
    const unlocked = isLevelUnlocked(levelId, progress.passedLevels);
    if (!unlocked) {
      onAttemptLockedItem(`Level ${levelId}: ${COURSE_LEVELS[levelId - 1]?.title || ''}`);
      return;
    }
    setActiveLevelId(levelId);
  };

  const handleFinalExamTabClick = () => {
    const unlocked = isFinalExamUnlocked(progress.passedLevels);
    if (!unlocked) {
      onAttemptLockedItem('Final Exam');
      return;
    }
    onOpenExam();
  };

  const handleCertificateTabClick = () => {
    const unlocked = isCertificateUnlocked(progress.finalExamPassed);
    if (!unlocked) {
      onAttemptLockedItem('Certificate of Completion');
      return;
    }
    onOpenCertificate();
  };

  const handleSubmitLevelQuiz = () => {
    const questions = activeLevel.quiz;
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const passed = score >= 2; // at least 2 out of 3 required
    setIsQuizSubmitted((prev) => ({ ...prev, [activeLevel.id]: true }));

    const newPassedLevels = passed && !progress.passedLevels.includes(activeLevel.id)
      ? [...progress.passedLevels, activeLevel.id].sort((a, b) => a - b)
      : progress.passedLevels;

    const updated: CourseProgress = {
      ...progress,
      passedLevels: newPassedLevels,
      levelScores: {
        ...progress.levelScores,
        [activeLevel.id]: {
          score,
          total: 3,
          passed,
          completedAt: new Date().toISOString(),
        },
      },
    };

    onUpdateProgress(updated);
    saveCourseProgress(updated);
  };

  const handleRetakeQuiz = () => {
    // Clear selections for this level's questions
    const updatedAnswers = { ...selectedAnswers };
    activeLevel.quiz.forEach((q) => {
      delete updatedAnswers[q.id];
    });
    setSelectedAnswers(updatedAnswers);
    setIsQuizSubmitted((prev) => ({ ...prev, [activeLevel.id]: false }));
  };

  const handleProceedToNext = () => {
    if (activeLevel.id < 7) {
      setActiveLevelId(activeLevel.id + 1);
      window.scrollTo({
        top: document.getElementById('course')?.offsetTop || 0,
        behavior: 'smooth',
      });
    } else {
      onOpenExam();
    }
  };

  const answeredQuestionsCount = activeLevel.quiz.filter(
    (q) => selectedAnswers[q.id] !== undefined
  ).length;

  const currentLevelScore = progress.levelScores[activeLevel.id];

  return (
    <section id="course" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            Sequential Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Learn Mutual Funds: Zero to Confident
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Follow this 7-level cheat-proof pathway. Levels unlock sequentially upon scoring at least 2 out of 3 on the quick quiz. Pass all 7 levels to unlock the Final Exam and earn your verified certificate.
          </p>

          {/* Progress Indicator */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Passed {progress.passedLevels.length} of 7 Levels</span>
            <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#d4af37] transition-all duration-300"
                style={{ width: `${(progress.passedLevels.length / 7) * 100}%` }}
              />
            </div>
            {progress.passedLevels.length === 7 ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready for Final Exam!</span>
              </span>
            ) : (
              <span className="text-slate-400">
                Next: Level {getNextRequiredLevel(progress.passedLevels)}
              </span>
            )}
          </div>
        </div>

        {/* Level Navigation Tabs (with visual lock icons for locked items) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {COURSE_LEVELS.map((level) => {
            const isCurrent = level.id === activeLevelId;
            const isPassed = progress.passedLevels.includes(level.id);
            const isUnlocked = isLevelUnlocked(level.id, progress.passedLevels);

            return (
              <button
                key={level.id}
                onClick={() => handleLevelTabClick(level.id)}
                title={
                  isUnlocked
                    ? `Level ${level.id}: ${level.title}`
                    : `Level ${level.id} is locked. Pass Level ${level.id - 1} quiz first.`
                }
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/20 font-bold'
                    : isPassed
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-slate-800'
                    : isUnlocked
                    ? 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    : 'opacity-55 cursor-not-allowed bg-slate-950/60 border-slate-900 text-slate-500 hover:border-slate-800 hover:opacity-75'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : !isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                ) : (
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent ? 'bg-slate-950 text-[#d4af37]' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {level.id}
                  </span>
                )}
                <span>Level {level.id}</span>
              </button>
            );
          })}

          {/* Final Exam Tab */}
          <button
            onClick={handleFinalExamTabClick}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
              isFinalExamUnlocked(progress.passedLevels)
                ? progress.finalExamPassed
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-slate-800'
                  : 'bg-amber-500/20 text-[#fae596] border-amber-500/50 hover:bg-amber-500/30 shadow-md'
                : 'opacity-55 cursor-not-allowed bg-slate-950/60 border-slate-900 text-slate-500 hover:border-slate-800 hover:opacity-75'
            }`}
          >
            {progress.finalExamPassed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : !isFinalExamUnlocked(progress.passedLevels) ? (
              <Lock className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
            )}
            <span>Final Exam</span>
          </button>

          {/* Certificate Tab */}
          <button
            onClick={handleCertificateTabClick}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
              isCertificateUnlocked(progress.finalExamPassed)
                ? 'bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold shadow-md shadow-[#d4af37]/20 hover:scale-105'
                : 'opacity-55 cursor-not-allowed bg-slate-950/60 border-slate-900 text-slate-500 hover:border-slate-800 hover:opacity-75'
            }`}
          >
            {!isCertificateUnlocked(progress.finalExamPassed) ? (
              <Lock className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Award className="w-4 h-4 text-slate-950" />
            )}
            <span>Certificate</span>
          </button>
        </div>

        {/* Active Level Content Container */}
        <div className="bg-slate-900/50 rounded-3xl border border-slate-800/90 p-6 sm:p-8 md:p-10 backdrop-blur-sm shadow-xl">
          {/* Level Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Module {activeLevel.id} of 7
                </span>
                {isLevelPassed && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Quiz Passed</span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeLevel.title}
              </h3>
              <p className="text-slate-400 text-sm mt-1">{activeLevel.tagline}</p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
              <span>{activeLevel.readTime}</span>
            </div>
          </div>

          {/* Core Sections */}
          <div className="space-y-8 mb-12">
            {activeLevel.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-amber-200/95 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-[#d4af37]" />
                  <span>{section.heading}</span>
                </h4>

                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {section.content.map((paragraph, pIdx) => {
                    const formatted = paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    );
                    return (
                      <p
                        key={pIdx}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>

                {/* Everyday Analogy Callout */}
                {section.everydayAnalogy && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-200 block mb-0.5">Everyday Analogy:</strong>
                      <span>{section.everydayAnalogy}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Numeric Example */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 mb-12">
            <div className="flex items-center gap-2 text-sm font-bold text-[#d4af37] mb-3">
              <Calculator className="w-4 h-4" />
              <span>Real INR Numeric Example: {activeLevel.numericExample.scenario}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {activeLevel.numericExample.breakdown.map((row, bIdx) => (
                <div key={bIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">{row.label}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{row.value}</div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-[#d4af37] pl-3 py-1">
              <strong>Takeaway:</strong> {activeLevel.numericExample.conclusion}
            </p>
          </div>

          {/* Quiz Section (Strict Pass Required: 2 / 3) */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#d4af37]" />
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Level {activeLevel.id} Milestone Quiz
                </h4>
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                Rule: Score at least <strong className="text-white">2 out of 3</strong> to unlock Level {activeLevel.id < 7 ? activeLevel.id + 1 : 'Final Exam'}
              </div>
            </div>

            {/* Level Score Feedback Banner */}
            {currentLevelScore && (
              <div
                className={`p-4 rounded-2xl border mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  currentLevelScore.passed
                    ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-700/70 text-rose-200'
                }`}
              >
                <div>
                  <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                    {currentLevelScore.passed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Quiz Passed! ({currentLevelScore.score} / 3 Correct)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span>Needs 2 out of 3 to pass ({currentLevelScore.score} / 3 Correct)</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {currentLevelScore.passed
                      ? `Great job! Level ${activeLevel.id < 7 ? activeLevel.id + 1 : 'Final Exam'} is now completely unlocked.`
                      : 'Review the explanations below and click Retake Quiz when you are ready.'}
                  </p>
                </div>

                {!currentLevelScore.passed && (
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}
              </div>
            )}

            {/* Quiz Questions */}
            <div className="space-y-6">
              {activeLevel.quiz.map((q, qIndex) => {
                const userPick = selectedAnswers[q.id];
                const hasAnswered = userPick !== undefined;
                const isCorrect = userPick === q.correctIndex;
                const showResults = currentQuizSubmitted;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-sm sm:text-base font-semibold text-white leading-snug">
                        <span className="text-[#d4af37] font-bold mr-2">Q{qIndex + 1}.</span>
                        {q.question}
                      </div>

                      {showResults && hasAnswered && (
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

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = userPick === optIdx;
                        const isThisCorrect = q.correctIndex === optIdx;

                        let styleClass =
                          'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (showResults) {
                          if (isThisCorrect) {
                            styleClass =
                              'bg-emerald-950/60 border-emerald-600/80 text-emerald-200 font-medium';
                          } else if (isThisSelected && !isCorrect) {
                            styleClass = 'bg-rose-950/50 border-rose-700/70 text-rose-300';
                          } else {
                            styleClass = 'bg-slate-950/40 border-slate-900 text-slate-500';
                          }
                        } else if (isThisSelected) {
                          styleClass =
                            'bg-[#d4af37]/15 border-[#d4af37] text-white font-semibold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={showResults && isLevelPassed}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${styleClass}`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                                  isThisSelected
                                    ? 'border-[#d4af37] text-[#d4af37] font-bold'
                                    : 'border-slate-700 text-slate-500'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </span>

                            {showResults && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {showResults && isThisSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {showResults && (
                      <div
                        className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200'
                            : 'bg-slate-900 border border-slate-800 text-slate-300'
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

            {/* Quiz Action Footer */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                {!currentQuizSubmitted ? (
                  <span>
                    Answered <strong className="text-white">{answeredQuestionsCount}</strong> of 3 questions.
                  </span>
                ) : isLevelPassed ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Level {activeLevel.id} Completed! Ready for next step.</span>
                  </span>
                ) : (
                  <span className="text-rose-300">
                    Score was under 2/3. Click Retake Quiz above to unlock Level {activeLevel.id + 1}.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!currentQuizSubmitted ? (
                  <button
                    onClick={handleSubmitLevelQuiz}
                    disabled={answeredQuestionsCount < 3}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <span>Submit Level {activeLevel.id} Quiz</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : isLevelPassed ? (
                  <button
                    onClick={handleProceedToNext}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>
                      {activeLevel.id === 7 ? 'Proceed to Final Exam' : `Proceed to Level ${activeLevel.id + 1}`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetakeQuiz}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Quiz (Needs 2/3)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
