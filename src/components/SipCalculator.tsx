import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, IndianRupee, PieChart, Sparkles, Check } from 'lucide-react';

export const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [timePeriodYears, setTimePeriodYears] = useState<number>(10);
  const [stepUpPercent, setStepUpPercent] = useState<number>(0); // Optional step up SIP

  const calculation = useMemo(() => {
    const monthlyRate = expectedReturnRate / 100 / 12;
    const totalMonths = timePeriodYears * 12;

    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthly = monthlyInvestment;

    const yearlyData: { year: number; invested: number; totalValue: number }[] = [];

    if (stepUpPercent === 0) {
      // Standard SIP formula
      // FV = P * [((1 + r)^n - 1) / r] * (1 + r)
      if (monthlyRate === 0) {
        futureValue = monthlyInvestment * totalMonths;
      } else {
        futureValue =
          monthlyInvestment *
          ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
      totalInvested = monthlyInvestment * totalMonths;

      // Generate yearly checkpoints for charts
      for (let y = 1; y <= timePeriodYears; y++) {
        const m = y * 12;
        const yVal =
          monthlyRate === 0
            ? monthlyInvestment * m
            : monthlyInvestment *
              ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) *
              (1 + monthlyRate);
        yearlyData.push({
          year: y,
          invested: monthlyInvestment * m,
          totalValue: Math.round(yVal),
        });
      }
    } else {
      // Step Up SIP Month-by-month calculation
      let runningValue = 0;
      let cumInvested = 0;
      for (let m = 1; m <= totalMonths; m++) {
        // Increase monthly investment every 12 months
        if (m > 1 && (m - 1) % 12 === 0) {
          currentMonthly = Math.round(currentMonthly * (1 + stepUpPercent / 100));
        }
        cumInvested += currentMonthly;
        runningValue = (runningValue + currentMonthly) * (1 + monthlyRate);

        if (m % 12 === 0) {
          yearlyData.push({
            year: m / 12,
            invested: cumInvested,
            totalValue: Math.round(runningValue),
          });
        }
      }
      totalInvested = cumInvested;
      futureValue = runningValue;
    }

    const estimatedGains = Math.max(0, futureValue - totalInvested);

    return {
      totalInvested: Math.round(totalInvested),
      estimatedGains: Math.round(estimatedGains),
      finalValue: Math.round(futureValue),
      yearlyData,
    };
  }, [monthlyInvestment, expectedReturnRate, timePeriodYears, stepUpPercent]);

  // Format INR nicely with Lakhs and Crores
  const formatInr = (val: number): string => {
    if (val >= 10000000) {
      return `Rs ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `Rs ${(val / 100000).toFixed(2)} Lakh`;
    }
    return `Rs ${val.toLocaleString('en-IN')}`;
  };

  // SVG Donut calculation
  const investedRatio =
    calculation.finalValue > 0 ? calculation.totalInvested / calculation.finalValue : 0.5;
  const gainsRatio = 1 - investedRatio;
  const circumference = 2 * Math.PI * 40; // r=40
  const investedStrokeDash = investedRatio * circumference;
  const gainsStrokeDash = gainsRatio * circumference;

  return (
    <section id="calculator" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            Interactive Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Systematic Investment Plan (SIP) Calculator
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Witness the exponential power of compounding. Adjust your monthly contribution, anticipated annual return, and investing horizon to visualize your financial future.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            {/* Monthly Investment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-200">
                  Monthly Investment Amount
                </label>
                <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono font-bold text-sm">
                  <span>Rs {monthlyInvestment.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <input
                type="range"
                min={500}
                max={150000}
                step={500}
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[2500, 5000, 10000, 25000, 50000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlyInvestment(preset)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                      monthlyInvestment === preset
                        ? 'bg-[#d4af37] text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    Rs {preset >= 1000 ? `${preset / 1000}k` : preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Annual Return */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-200">
                  Expected Annual Return Rate (p.a.)
                </label>
                <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono font-bold text-sm">
                  <span>{expectedReturnRate}%</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={0.5}
                value={expectedReturnRate}
                onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Conservative Debt (7%)</span>
                <span>Nifty Index Fund (12%)</span>
                <span>Active Equity (14%)</span>
              </div>
            </div>

            {/* Time Period Years */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-200">
                  Investment Time Horizon
                </label>
                <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono font-bold text-sm">
                  <span>{timePeriodYears} Years</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={35}
                step={1}
                value={timePeriodYears}
                onChange={(e) => setTimePeriodYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[5, 10, 15, 20, 25].map((y) => (
                  <button
                    key={y}
                    onClick={() => setTimePeriodYears(y)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                      timePeriodYears === y
                        ? 'bg-[#d4af37] text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    {y} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Step-Up Feature */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="text-xs font-semibold text-slate-300">
                    Annual Step-Up SIP (Optional)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#d4af37]">
                  {stepUpPercent > 0 ? `+${stepUpPercent}% each year` : 'Flat SIP'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[0, 5, 10, 15].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStepUpPercent(s)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      stepUpPercent === s
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-amber-200 font-bold'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s === 0 ? 'No Step-Up' : `+${s}% / yr`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Donut Chart Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#d4af37] tracking-wider uppercase block mb-1">
                Projected Wealth Summary
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                {formatInr(calculation.finalValue)}
              </div>

              {/* Donut Chart Visual */}
              <div className="relative flex items-center justify-center my-6">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                  {/* Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="12"
                  />
                  {/* Total Invested arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${investedStrokeDash} ${circumference}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Gains arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#d4af37"
                    strokeWidth="12"
                    strokeDasharray={`${gainsStrokeDash} ${circumference}`}
                    strokeDashoffset={-investedStrokeDash}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Inner center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Wealth Multiple</span>
                  <span className="text-xl font-extrabold text-amber-200">
                    {(calculation.finalValue / (calculation.totalInvested || 1)).toFixed(1)}x
                  </span>
                  <span className="text-[10px] text-slate-500">of Invested Capital</span>
                </div>
              </div>

              {/* Breakdown numbers */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-300 font-medium">Total Invested Amount:</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">
                    {formatInr(calculation.totalInvested)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                    <span className="text-xs text-slate-300 font-medium">Estimated Wealth Gain:</span>
                  </div>
                  <span className="text-sm font-bold text-[#fae596] font-mono">
                    {formatInr(calculation.estimatedGains)}
                  </span>
                </div>
              </div>
            </div>

            {/* Formula Context Note */}
            <p className="text-[11px] text-slate-500 leading-relaxed pt-4 border-t border-slate-800">
              *Calculation based on monthly compound growth rate assuming regular uninterrupted SIP debit. Past market performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
