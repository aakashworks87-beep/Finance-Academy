import React, { useState } from 'react';
import { ExternalLink, Landmark, ShieldCheck, FileText } from 'lucide-react';

interface RegulatoryTopic {
  id: string;
  source: 'RBI' | 'SEBI';
  title: string;
  category: string;
  documentType: string;
  summary: string;
  url: string;
}

export const LiveUpdates: React.FC = () => {
  const [activeSource, setActiveSource] = useState<'ALL' | 'RBI' | 'SEBI'>('ALL');

  const topics: RegulatoryTopic[] = [
    {
      id: 'rbi-1',
      source: 'RBI',
      title: 'Monetary Policy Framework and Policy Repo Rate Resolutions',
      category: 'Monetary Policy',
      documentType: 'Official Resolution',
      summary: 'Decisions of the Monetary Policy Committee (MPC) regarding benchmark repo rate settings, liquidity adjustments, and macroeconomic growth projections.',
      url: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    },
    {
      id: 'rbi-2',
      source: 'RBI',
      title: 'Direct Retail Access to Sovereign Government Debt via RBI Retail Direct',
      category: 'Retail Securities',
      documentType: 'Statutory Portal',
      summary: 'Enables individual citizens to maintain Retail Direct Gilt accounts and purchase sovereign Treasury Bills and Government of India Bonds directly with zero intermediary fees.',
      url: 'https://rbiretaildirect.org.in/',
    },
    {
      id: 'rbi-3',
      source: 'RBI',
      title: 'Advisories on Digital Financial Safeguards and Mule Accounts',
      category: 'Consumer Protection',
      documentType: 'Public Notification',
      summary: 'Guidelines and warnings issued by the Reserve Bank regarding unauthorized digital lending platforms, illegal offshore forex portals, and digital payment security.',
      url: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    },
    {
      id: 'rbi-4',
      source: 'RBI',
      title: 'Master Direction on Financial Literacy and Banking Standards',
      category: 'Financial Education',
      documentType: 'Master Circular',
      summary: 'Standardized framework establishing customer rights, banking transparency, and financial education centers across commercial banks in India.',
      url: 'https://rbi.org.in/Scripts/NotificationUser.aspx',
    },
    {
      id: 'sebi-1',
      source: 'SEBI',
      title: 'Categorization and Rationalization of Mutual Fund Schemes',
      category: 'Mutual Fund Mandate',
      documentType: 'Master Circular',
      summary: 'The statutory circular establishing standardized scheme categories for Equity, Debt, and Hybrid funds to ensure portfolios remain transparent and true-to-label.',
      url: 'https://www.sebi.gov.in/legal/circulars.html',
    },
    {
      id: 'sebi-2',
      source: 'SEBI',
      title: 'SCORES 2.0 Centralized Investor Grievance Redressal System',
      category: 'Investor Redressal',
      documentType: 'Redressal Portal',
      summary: 'Two-tier automated review mechanism enabling retail investors to lodge and track complaints against listed companies and market intermediaries with mandatory 21-day resolution timelines.',
      url: 'https://scores.sebi.gov.in/',
    },
    {
      id: 'sebi-3',
      source: 'SEBI',
      title: 'Investor Caution on Unregistered Advisers and Tip Groups',
      category: 'Fraud Alert',
      documentType: 'Public Caution Notice',
      summary: 'Official advisory warning retail investors against unlicensed operators offering guaranteed profit schemes on social messaging platforms.',
      url: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13',
    },
    {
      id: 'sebi-4',
      source: 'SEBI',
      title: 'Mandatory Monthly Risk-o-meter and Portfolio Disclosures',
      category: 'Transparency Mandate',
      documentType: 'Regulatory Mandate',
      summary: 'Mandates all Asset Management Companies to publish monthly portfolio holdings, expense ratios, and updated Risk-o-meter ratings for investor evaluation.',
      url: 'https://www.sebi.gov.in/legal/press-releases.html',
    },
  ];

  const filteredTopics = topics.filter((t) => {
    if (activeSource === 'ALL') return true;
    return t.source === activeSource;
  });

  return (
    <section id="regulatory-topics" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with requested new heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Primary Sources</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Key regulatory topics, curated from official sources
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Essential reference documents and statutory portals from the Reserve Bank of India (rbi.org.in) and the Securities and Exchange Board of India (sebi.gov.in). Each card links directly to the official government source.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSource('ALL')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSource === 'ALL'
                  ? 'bg-[#d4af37] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Topics ({topics.length})
            </button>
            <button
              onClick={() => setActiveSource('RBI')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSource === 'RBI'
                  ? 'bg-[#d4af37] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Reserve Bank of India</span>
            </button>
            <button
              onClick={() => setActiveSource('SEBI')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSource === 'SEBI'
                  ? 'bg-[#d4af37] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEBI Directives</span>
            </button>
          </div>
        </div>

        {/* Curated Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                      topic.source === 'RBI'
                        ? 'bg-blue-950/60 text-blue-300 border-blue-700/60'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                    }`}
                  >
                    {topic.source} Directive
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{topic.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {topic.summary}
                </p>
              </div>

              {/* Direct Official Link */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{topic.documentType}</span>
                <a
                  href={topic.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fae596] hover:text-[#d4af37] transition-colors"
                >
                  <span>Open on {topic.source === 'RBI' ? 'rbi.org.in' : 'sebi.gov.in'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Full, untruncated primary source statement */}
        <div className="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 text-center leading-relaxed">
          <p>
            <strong className="text-white block mb-1">Primary Source Commitment:</strong>
            All regulatory topics listed here originate directly from official government and regulatory documentation published by the Reserve Bank of India and the Securities and Exchange Board of India. We do not host synthetic or AI-generated news. Every card provides direct navigation to primary regulatory records.
          </p>
        </div>
      </div>
    </section>
  );
};
