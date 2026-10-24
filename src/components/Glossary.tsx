import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { Search, Library, Tag } from 'lucide-react';

export const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Basics', 'Mutual Funds', 'Macro', 'Tax & Legal', 'Metrics'];
  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLetter =
        selectedLetter === 'ALL' || item.term.toUpperCase().startsWith(selectedLetter);

      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      return matchesSearch && matchesLetter && matchesCategory;
    });
  }, [searchTerm, selectedLetter, selectedCategory]);

  return (
    <section id="glossary" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            A to Z Encyclopedia
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Financial Terms Glossary
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Over 75 essential financial concepts defined in exactly one simple, jargon-free sentence each. Search by keyword or filter alphabetically.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10 max-w-4xl mx-auto">
          {/* Search box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms (e.g. NAV, Expense Ratio, Repo Rate, Compounding)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#d4af37] text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alphabet Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1 overflow-x-auto pb-2 scrollbar-none text-xs">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  selectedLetter === letter
                    ? 'bg-[#d4af37] text-slate-950 font-bold scale-110'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-2">
            <span>
              Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} financial terms
            </span>
            {(searchTerm || selectedLetter !== 'ALL' || selectedCategory !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLetter('ALL');
                  setSelectedCategory('ALL');
                }}
                className="text-[#d4af37] hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((item) => (
            <div
              key={item.term}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-[#d4af37]/40 hover:bg-slate-900/70 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {item.term}
                  </h4>
                  <span className="text-[10px] uppercase font-semibold text-amber-300/80 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              <Library className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm">No terms matched your search filter.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLetter('ALL');
                  setSelectedCategory('ALL');
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-slate-800 text-xs text-white hover:bg-slate-700"
              >
                Show all terms
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
