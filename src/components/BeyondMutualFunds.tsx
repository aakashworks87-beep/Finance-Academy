import React from 'react';
import { BEYOND_ASSETS } from '../data/investingBeyondData';
import { TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export const BeyondMutualFunds: React.FC = () => {
  return (
    <section id="beyond" className="py-16 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-white/10 text-xs font-sans font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            <span>Asset Classes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight mb-4">
            Investing Beyond Mutual Funds
          </h2>
          <p className="text-slate-300 font-serif text-base leading-relaxed">
            Mutual funds are the foundation, but a comprehensive financial plan often incorporates other vital asset classes. Here is how each compares in risk, suitability, and liquidity.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BEYOND_ASSETS.map((asset) => {
            const riskColors = {
              Low: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60',
              Medium: 'bg-amber-950/60 text-amber-300 border-amber-700/60',
              High: 'bg-rose-950/60 text-rose-300 border-rose-700/60',
            }[asset.riskLevel];

            return (
              <div
                key={asset.id}
                className="group relative p-6 rounded-2xl bg-[#0d0e14] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Category & Risk Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 font-sans">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {asset.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${riskColors}`}
                    >
                      {asset.riskLevel === 'Low' && <ShieldCheck className="w-3 h-3" />}
                      {asset.riskLevel === 'Medium' && <TrendingUp className="w-3 h-3" />}
                      {asset.riskLevel === 'High' && <AlertTriangle className="w-3 h-3" />}
                      <span>{asset.riskLevel} Risk</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#fae596] transition-colors mb-3">
                    {asset.title}
                  </h3>

                  {/* Two-line description as required */}
                  <p className="text-slate-300 font-serif text-sm leading-relaxed mb-4 min-h-[44px]">
                    {asset.summary}
                  </p>

                  {/* Who it suits */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 mb-4 font-sans">
                    <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                      Who It Suits
                    </span>
                    <p className="text-xs text-slate-300 leading-normal">{asset.whoItSuits}</p>
                  </div>
                </div>

                {/* Return, Liquidity, and Key Takeaway Footer */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Expected Return:</span>
                    <span className="font-semibold text-slate-200">{asset.expectedReturn}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Liquidity:</span>
                    <span className="font-semibold text-slate-200">{asset.liquidity}</span>
                  </div>
                  <p className="text-[11px] text-amber-200/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 mt-2">
                    <strong>Rule:</strong> {asset.keyRule}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
