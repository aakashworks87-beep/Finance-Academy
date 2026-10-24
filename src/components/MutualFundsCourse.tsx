import React, { useState } from 'react';
import { COURSE_LEVELS } from '../data/courseData';
import { CheckCircle2, XCircle, Lightbulb, Calculator, HelpCircle, ChevronRight, Award, Eye } from 'lucide-react';

export const MutualFundsCourse: React.FC = () => {
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const activeLevel = COURSE_LEVELS.find((l) => l.id === activeLevelId) || COURSE_LEVELS[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleToggleReveal = (questionId: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const markLevelComplete = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
    }
    if (levelId < COURSE_LEVELS.length) {
      setActiveLevelId(levelId + 1);
      window.scrollTo({
        top: document.getElementById('course')?.offsetTop || 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="course" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            Core Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Learn Mutual Funds: Zero to Confident
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Follow this 7-level structured pathway. Plain English explanations, everyday analogies, real numeric examples, and 3-question quick quizzes with instant answers.
          </p>

          {/* Progress Indicator */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Completed {completedLevels.length} of 7 Levels</span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#d4af37] transition-all duration-300"
                style={{ width: `${(completedLevels.length / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Level Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {COURSE_LEVELS.map((level) => {
            const isCurrent = level.id === activeLevelId;
            const isDone = completedLevels.includes(level.id);

            return (
              <button
                key={level.id}
                onClick={() => setActiveLevelId(level.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                    : isDone
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-slate-800'
                    : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
        </div>

        {/* Active Level Content Container */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/90 p-6 sm:p-8 md:p-10 backdrop-blur-sm shadow-xl">
          {/* Level Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                Module {activeLevel.id} of 7
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
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
                    // Render bold key terms simply
                    const formatted = paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    );
                    return <p key={pIdx} dangerouslySetInnerHTML={{ __html: formatted }} />;
                  })}
                </div>

                {section.everydayAnalogy && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-100/90 flex gap-3 items-start mt-3">
                    <Lightbulb className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#fae596] block mb-1">Everyday Real-Life Analogy:</strong>
                      <span>{section.everydayAnalogy}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Simple Numeric Example Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-amber-500/30 mb-12 shadow-lg">
            <div className="flex items-center gap-2.5 text-sm font-bold text-[#d4af37] uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Simple Numeric Walkthrough</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-4">
              {activeLevel.numericExample.scenario}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {activeLevel.numericExample.breakdown.map((item, bIdx) => (
                <div
                  key={bIdx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between"
                >
                  <span className="text-xs text-slate-400 font-medium mb-1">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-100">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs sm:text-sm text-[#fae596] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{activeLevel.numericExample.conclusion}</span>
            </div>
          </div>

          {/* 3-Question Quick Quiz with Instant Show-Answer */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Quick Knowledge Check: 3 Questions</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Test your understanding. Select an answer to verify, or click &ldquo;Show Answer&rdquo; for instant solution and explanation.
            </p>

            <div className="space-y-6">
              {activeLevel.quiz.map((q, qIndex) => {
                const userChoice = selectedAnswers[q.id];
                const isRevealed = revealedAnswers[q.id];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-sm sm:text-base font-semibold text-white">
                        <span className="text-[#d4af37] font-bold mr-2">Q{qIndex + 1}.</span>
                        {q.question}
                      </div>

                      {/* Show Answer button as explicitly requested */}
                      <button
                        onClick={() => handleToggleReveal(q.id)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                      </button>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = userChoice === optIdx;
                        const isThisCorrect = q.correctIndex === optIdx;

                        let styleClass =
                          'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

                        if (isRevealed) {
                          if (isThisCorrect) {
                            styleClass = 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200 font-medium';
                          } else if (isThisSelected) {
                            styleClass = 'bg-rose-950/50 border-rose-700/70 text-rose-300';
                          }
                        } else if (hasAnswered) {
                          if (isThisSelected) {
                            styleClass = isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium'
                              : 'bg-rose-950/50 border-rose-600 text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${styleClass}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </span>

                            {/* Status icon */}
                            {((isRevealed && isThisCorrect) || (hasAnswered && isThisSelected && isCorrect)) && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {hasAnswered && isThisSelected && !isCorrect && !isRevealed && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if answered or revealed */}
                    {(hasAnswered || isRevealed) && (
                      <div
                        className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          isCorrect || (isRevealed && hasAnswered && isCorrect)
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

            {/* Next Level Action */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Level {activeLevel.id} of 7. Keep going to earn complete mastery.
              </div>
              <button
                onClick={() => markLevelComplete(activeLevel.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>{activeLevel.id === 7 ? 'Complete Entire Course' : `Mark Done & Go to Level ${activeLevel.id + 1}`}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
