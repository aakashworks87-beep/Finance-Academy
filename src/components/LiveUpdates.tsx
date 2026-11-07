import React, { useState, useEffect } from 'react';
import { ExternalLink, Landmark, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface FeedItem {
  title: string;
  date: string;
  link: string;
  label?: string;
}

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

  const [rbiLiveItems, setRbiLiveItems] = useState<FeedItem[]>([]);
  const [rbiLoading, setRbiLoading] = useState(true);
  const [rbiError, setRbiError] = useState(false);
  const [rbiLastUpdated, setRbiLastUpdated] = useState<string>('');

  const [sebiLiveItems, setSebiLiveItems] = useState<FeedItem[]>([]);
  const [sebiLoading, setSebiLoading] = useState(true);
  const [sebiError, setSebiError] = useState(false);
  const [sebiLastUpdated, setSebiLastUpdated] = useState<string>('');

  useEffect(() => {
    fetch(API_ENDPOINTS.rbiFeeds)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.items)) {
          setRbiLiveItems(data.items.slice(0, 8));
          if (data.lastUpdated) {
            setRbiLastUpdated(new Date(data.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
        setRbiLoading(false);
      })
      .catch(() => {
        setRbiError(true);
        setRbiLoading(false);
      });

    fetch(API_ENDPOINTS.sebiFeeds)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.items)) {
          setSebiLiveItems(data.items.slice(0, 8));
          if (data.lastUpdated) {
            setSebiLastUpdated(new Date(data.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
        setSebiLoading(false);
      })
      .catch(() => {
        setSebiError(true);
        setSebiLoading(false);
      });
  }, []);

  const topics: RegulatoryTopic[] = [
    {
      id: 'rbi-1',
      source: 'RBI',
      title: 'Monetary Policy Framework and Policy Repo Rate Resolutions',
      category: 'Monetary Policy',
      documentType: 'Official Resolution',
      summary: 'Decisions of the Monetary Policy Committee regarding benchmark repo rate settings, liquidity adjustments, and macroeconomic growth projections.',
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
      title: 'Master Direction on Financial Benchmarks and Base Lending Rates',
      category: 'Banking Framework',
      documentType: 'Master Direction',
      summary: 'Statutory rules governing how commercial banks link floating home loans and retail credit to external benchmarks like the RBI Repo Rate.',
      url: 'https://rbi.org.in/Scripts/BS_ViewMasDirections.aspx',
    },
    {
      id: 'sebi-1',
      source: 'SEBI',
      title: 'Categorisation and Rationalization of Mutual Fund Schemes',
      category: 'Fund Categorization',
      documentType: 'SEBI Master Circular',
      summary: 'The landmark October 2017 circular creating 5 distinct mutual fund groups (Equity, Debt, Hybrid, Solution Oriented, Other) with rigid asset allocation rules.',
      url: 'https://www.sebi.gov.in/legal/master-circulars/may-2023/master-circular-for-mutual-funds_71457.html',
    },
    {
      id: 'sebi-2',
      source: 'SEBI',
      title: 'Mandatory Implementation of Direct Plans and Unbundled Expense Ratios',
      category: 'Fee Transparency',
      documentType: 'Statutory Circular',
      summary: 'Rules requiring every mutual fund scheme to offer a Direct Plan with zero distributor commissions and lower Total Expense Ratios (TER).',
      url: 'https://www.sebi.gov.in/legal/circulars/sep-2012/circular-for-mutual-funds_23467.html',
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
    <section id="regulatory-topics" className="py-16 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-white/10 text-xs font-sans font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Primary Sources</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight mb-4">
            Key regulatory topics and live official feeds
          </h2>
          <p className="text-slate-300 font-serif text-base leading-relaxed">
            Real-time regulatory announcements from the Reserve Bank of India (rbi.org.in) and the Securities and Exchange Board of India (sebi.gov.in), alongside curated primary source documentation.
          </p>
        </div>

        {/* Live Official Feeds Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Latest from RBI */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0e14] border border-white/10 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black border border-white/10 text-slate-300">
                    <Landmark className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">Latest from RBI</h3>
                    <p className="text-xs font-sans text-slate-400">Official press releases and notifications</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-sans">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                  {rbiLastUpdated && (
                    <span className="text-[11px] text-slate-400">Updated {rbiLastUpdated}</span>
                  )}
                </div>
              </div>

              {rbiLoading ? (
                <div className="py-12 text-center text-xs font-sans text-slate-400 animate-pulse">
                  Loading live RBI feed...
                </div>
              ) : rbiError || rbiLiveItems.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs font-serif text-slate-300">
                    Live RBI feed could not load directly. Please visit the official Reserve Bank of India website at rbi.org.in.
                  </p>
                  <a
                    href="https://rbi.org.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-bold text-[#fae596] hover:text-[#d4af37]"
                  >
                    <span>Visit rbi.org.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  {rbiLiveItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group block p-4 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        {item.label && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                            {item.label}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium ml-auto">{item.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-[#fae596] transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-sans text-slate-400">
              <span>Source: Reserve Bank of India RSS</span>
              <a
                href="https://rbi.org.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>rbi.org.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Latest from SEBI */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0e14] border border-white/10 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black border border-white/10 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">Latest from SEBI</h3>
                    <p className="text-xs font-sans text-slate-400">Official orders, circulars, and updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-sans">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                  {sebiLastUpdated && (
                    <span className="text-[11px] text-slate-400">Updated {sebiLastUpdated}</span>
                  )}
                </div>
              </div>

              {sebiLoading ? (
                <div className="py-12 text-center text-xs font-sans text-slate-400 animate-pulse">
                  Loading live SEBI feed...
                </div>
              ) : sebiError || sebiLiveItems.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs font-serif text-slate-300">
                    Live SEBI feed could not load directly. Please visit the official Securities and Exchange Board of India website at sebi.gov.in.
                  </p>
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-bold text-[#fae596] hover:text-[#d4af37]"
                  >
                    <span>Visit sebi.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  {sebiLiveItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group block p-4 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                          SEBI Update
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium ml-auto">{item.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-[#fae596] transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-sans text-slate-400">
              <span>Source: SEBI RSS</span>
              <a
                href="https://www.sebi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>sebi.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills for Static Reference Cards */}
        <div className="text-center max-w-3xl mx-auto mb-8 font-sans">
          <h3 className="text-xl font-serif font-bold text-white mb-2">Curated Regulatory Reference Library</h3>
          <p className="text-xs sm:text-sm font-serif text-slate-400">
            Essential reference documents and statutory portals from official archives.
          </p>
          <div className="mt-4 inline-flex p-1 rounded-xl bg-[#0d0e14] border border-white/10 text-xs">
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
              className="p-6 rounded-2xl bg-[#0d0e14] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border bg-white/5 text-slate-300 border-white/10">
                    {topic.source} Directive
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{topic.category}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-2 leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed mb-6">
                  {topic.summary}
                </p>
              </div>

              {/* Direct Official Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-sans">
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

        {/* Full primary source statement */}
        <div className="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-[#0d0e14] border border-white/10 text-xs text-slate-300 text-center leading-relaxed font-serif">
          <p>
            <strong className="text-white block mb-1 font-sans">Primary Source Commitment:</strong>
            All regulatory topics listed here originate directly from official government and regulatory documentation published by the Reserve Bank of India and the Securities and Exchange Board of India. We do not host synthetic or AI-generated news. Every card provides direct navigation to primary regulatory records.
          </p>
        </div>
      </div>
    </section>
  );
};
