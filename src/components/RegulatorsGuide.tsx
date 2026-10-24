import React, { useState } from 'react';
import { RBI_INSTRUMENTS, SEBI_FRAUDS } from '../data/rbiSebiData';
import { Landmark, ShieldCheck, HelpCircle, ArrowRight, AlertOctagon, CheckCircle2, Search, ExternalLink } from 'lucide-react';

export const RegulatorsGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rbi' | 'sebi'>('rbi');
  const [loanRateChange, setLoanRateChange] = useState<number>(0.5);

  return (
    <section id="regulators" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            Indian Regulators
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Demystifying RBI and SEBI
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            The two pillars of Indian financial safety. Learn how the Reserve Bank of India governs your borrowing and currency, and how the Securities and Exchange Board of India defends your capital in the markets.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('rbi')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'rbi'
                  ? 'bg-[#d4af37] text-slate-950 shadow-md shadow-[#d4af37]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Understand RBI</span>
            </button>
            <button
              onClick={() => setActiveTab('sebi')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'sebi'
                  ? 'bg-[#d4af37] text-slate-950 shadow-md shadow-[#d4af37]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Understand SEBI</span>
            </button>
          </div>
        </div>

        {/* Tab 1: UNDERSTAND RBI */}
        {activeTab === 'rbi' && (
          <div className="space-y-12">
            {/* Overview Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    What the Reserve Bank of India (RBI) Does in Plain Words
                  </h3>
                  <span className="text-xs text-[#fae596] font-medium">Established 1935, Headquartered in Mumbai</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                The **Reserve Bank of India (RBI)** is the nation&apos;s central bank. Think of it as the ultimate regulator, banker to the Government of India, and supervisor of all commercial banks. Its primary job is to maintain price stability (keeping inflation within the target range of 4% plus or minus 2%) while nurturing economic growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">1. Currency Issuer</strong>
                  Sole authority to design, print, and manage all Indian Rupee banknotes.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">2. Banking Supervisor</strong>
                  Conducts audits, sets capital adequacy rules, and protects depositor money.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">3. Forex & Debt Manager</strong>
                  Manages foreign exchange reserves and conducts borrowing for the government.
                </div>
              </div>
            </div>

            {/* Core Instruments with "Why it matters to you" */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Key Monetary Policy Instruments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Each tool explained simply, with a direct one-line explanation of how it impacts your wallet.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {RBI_INSTRUMENTS.map((inst) => (
                  <div
                    key={inst.name}
                    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#d4af37] tracking-wider uppercase mb-1">
                        {inst.fullName}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{inst.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {inst.explanation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <strong className="text-[#fae596] block mb-1">Why it matters to you:</strong>
                      <span>{inst.whyItMatters}</span>
                    </div>
                  </div>
                ))}

                {/* MPC Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#d4af37] tracking-wider uppercase mb-1">
                      Statutory Decision Body
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">The MPC (Monetary Policy Committee)</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      A statutory 6-member committee comprising 3 members from the RBI (including the Governor) and 3 external economic experts appointed by the Central Government. They meet bi-monthly to vote on interest rate decisions.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-amber-100">
                    <strong className="text-[#fae596] block mb-1">Why it matters to you:</strong>
                    <span>Each member casts an independent vote published with detailed minutes 14 days later, ensuring transparent policy shifts without sudden surprises.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How Rate Changes Affect Your Loans and FDs */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span>How Repo Rate Changes Affect Your Loans and Fixed Deposits</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Under RBI rules, all floating retail loans (home, auto, personal) sanctioned since October 2019 are pegged directly to external benchmarks, primarily the RBI Repo Rate.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* When RBI Hikes Rates */}
                <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-800/40">
                  <div className="text-sm font-bold text-rose-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>When the RBI Hikes Rates (Inflation Fighting)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Home Loans:</strong> Your interest rate rises immediately. Banks usually extend your loan tenure first; if tenure hits maximum, your monthly EMI goes up.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Fixed Deposits (FDs):</strong> Banks offer higher interest rates on fresh FDs to attract customer deposits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Debt Mutual Funds:</strong> Bond prices fall temporarily as market yields rise, causing short-term drag on long-duration funds.</span>
                    </li>
                  </ul>
                </div>

                {/* When RBI Cuts Rates */}
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
                  <div className="text-sm font-bold text-emerald-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>When the RBI Cuts Rates (Growth Stimulus)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Home Loans:</strong> Floating interest rates drop. Your total loan tenure reduces or your monthly EMI payment decreases.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Fixed Deposits (FDs):</strong> Banks lower interest rates on new deposits. Existing fixed deposits continue at their contracted rates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Debt Mutual Funds:</strong> Existing long-term bonds gain capital appreciation as their higher coupons become more valuable.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: UNDERSTAND SEBI */}
        {activeTab === 'sebi' && (
          <div className="space-y-12">
            {/* What SEBI Does */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    What SEBI Does as India&apos;s Capital Markets Watchdog
                  </h3>
                  <span className="text-xs text-[#fae596] font-medium">Securities and Exchange Board of India (Act of 1992)</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                The **Securities and Exchange Board of India (SEBI)** regulates all stock exchanges (NSE, BSE), mutual funds, depository participants (CDSL, NSDL), stock brokers, and investment advisers. Its triple mandate is: protecting the interests of investors in securities, promoting the development of the securities market, and regulating fair market practices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">1. Investor Charter</strong>
                  Grants you rights to receive fair execution, transparent disclosures, and audited factsheets.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">2. Insider Trading Defense</strong>
                  Tracks algorithmic trading and penalizes corporate insiders who misuse non-public information.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <strong className="text-white block mb-1">3. Intermediary Registration</strong>
                  Every genuine broker, AMC, and research analyst must obtain a valid registration number.
                </div>
              </div>
            </div>

            {/* How to File a Complaint via SCORES */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">How to File a Complaint via SCORES (SEBI Complaints Redress System)</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    If an AMC, broker, or listed firm refuses to resolve your legitimate grievance, use the statutory SCORES portal.
                  </p>
                </div>
                <a
                  href="https://scores.sebi.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs font-semibold text-[#fae596] hover:bg-[#d4af37]/25 transition-all self-start sm:self-auto"
                >
                  <span>Visit scores.sebi.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-slate-950 font-bold text-xs flex items-center justify-center mb-2">1</span>
                  <h4 className="text-sm font-bold text-white mb-1">First Approach Entity</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    Lodge your dispute directly with the AMC, broker, or registrar (CAMS/KFintech) via their customer support.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-slate-950 font-bold text-xs flex items-center justify-center mb-2">2</span>
                  <h4 className="text-sm font-bold text-white mb-1">Wait 30 Days</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    If they fail to resolve the issue within 30 days or provide an unsatisfactory answer, proceed to SCORES.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-slate-950 font-bold text-xs flex items-center justify-center mb-2">3</span>
                  <h4 className="text-sm font-bold text-white mb-1">Register on SCORES</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    Sign up with your PAN, email, and mobile on scores.sebi.gov.in and upload your supporting transaction receipts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-slate-950 font-bold text-xs flex items-center justify-center mb-2">4</span>
                  <h4 className="text-sm font-bold text-white mb-1">Automated Tracking</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    SEBI auto-routes the ticket to designated compliance officers with mandatory 21-day legal resolution windows.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Verify a Registered Adviser */}
            <div className="p-6 sm:p-7 rounded-2xl bg-amber-500/5 border border-amber-500/30 flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-sm font-bold text-[#d4af37] uppercase tracking-wide">
                  <Search className="w-4 h-4" />
                  <span>How to Verify a SEBI Registered Investment Adviser (RIA)</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Never pay an unregistered influencer for stock or fund recommendations.
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Anyone giving customized fee-based investment advice in India must possess a valid SEBI RIA or RA registration number (e.g. INA0000xxxxx). Always cross-reference this number directly on the official SEBI directory before parting with any money.
                </p>
              </div>
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-5 py-3 rounded-xl bg-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#d4af37]/20 flex items-center gap-2 transition-all"
              >
                <span>Verify on SEBI Directory</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Five Common Investment Frauds to Avoid */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-wide mb-1">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Statutory Fraud Warnings</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Five Common Investment Frauds to Avoid
                </h3>
              </div>

              <div className="space-y-4">
                {SEBI_FRAUDS.map((fraud, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-rose-900/60 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{fraud.name}</span>
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <strong className="text-amber-300 block mb-1">Warning Signs:</strong>
                        <span className="text-slate-300">{fraud.warningSigns}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <strong className="text-rose-300 block mb-1">Modus Operandi:</strong>
                        <span className="text-slate-300">{fraud.howItWorks}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                        <strong className="text-emerald-300 block mb-1">Prevention Rule:</strong>
                        <span className="text-emerald-100">{fraud.preventionTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
