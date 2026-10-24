import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { BookOpen, CheckCircle2, ChevronRight, X, Clock, UserCheck } from 'lucide-react';

export const MyAnalysis: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="analysis" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
            Author Perspective
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            My Analysis: Stories from Indian Markets
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Conversational deep-dives translating regulatory shifts and fund mechanics into practical personal knowledge. Written in plain words to help you navigate your wealth journey with calm confidence.
          </p>
        </div>

        {/* 3 Storyteller Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#d4af37]/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#fae596] transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>By Aakash</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#fae596] group-hover:text-[#d4af37] transition-colors"
                >
                  <span>Read Full Story</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full Story Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-3xl bg-[#090e1a] border border-[#d4af37]/40 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
              {/* Modal Top Bar */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#d4af37]/15 text-[#fae596] font-semibold border border-[#d4af37]/30">
                    {selectedPost.category}
                  </span>
                  <span className="text-slate-400">{selectedPost.date}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedPost.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 pb-4 border-b border-slate-800">
                  <span className="font-semibold text-slate-200">Written by Aakash Hegde</span>
                  <span>•</span>
                  <span>Finance Academy Analysis</span>
                </div>

                {/* Full Article Text */}
                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {selectedPost.storyContent.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Key Insights Box */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 mt-6">
                  <h4 className="text-xs font-bold text-[#fae596] uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" />
                    <span>Key Takeaways for Investors</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {selectedPost.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Educational commentary for Indian retail investors.
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
