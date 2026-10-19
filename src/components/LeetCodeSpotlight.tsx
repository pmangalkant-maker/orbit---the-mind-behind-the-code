import React from 'react';
import { ExternalLink, Code2, Terminal, Cpu, ArrowUpRight } from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface LeetCodeSpotlightProps {
  profile: Profile;
}

export const LeetCodeSpotlight: React.FC<LeetCodeSpotlightProps> = ({ profile }) => {
  return (
    <section className="py-16 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900/70 to-zinc-950 border border-white/10 p-8 sm:p-10 overflow-hidden">
          {/* Subtle neon lime glow */}
          <div
            className="absolute -right-10 -bottom-10 w-72 h-72 bg-lime-400/[0.04] rounded-full blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Problem Solving Philosophy */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400">
                  <Code2 className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
                  Algorithm & Problem-Solving Track
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Data Structures, Algorithms & C++ Systems Focus
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                Regularly practicing algorithmic challenges on LeetCode with C++. Focus areas include Array manipulation, Two-Pointer technique, Hash Maps, Tree & Graph traversals, and dynamic space/time optimization using the C++ Standard Template Library (STL).
              </p>

              {/* Verified topics practiced - without fake stats */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono-code text-zinc-300">
                <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md">C++ STL</span>
                <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md">Two Pointers</span>
                <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md">Binary Search</span>
                <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md">Trees & Graphs</span>
                <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md">Dynamic Programming Basics</span>
              </div>
            </div>

            {/* Right Column: Verified LeetCode Direct Card */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="w-full max-w-sm p-5 rounded-xl bg-zinc-900/90 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-[#FFA116]/10 border border-[#FFA116]/30 flex items-center justify-center text-[#FFA116] font-bold text-xs">
                      LC
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 block font-mono-code">Handle</span>
                      <span className="text-sm font-bold text-white font-mono-code">@{profile.leetcodeUsername}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                    Verified
                  </span>
                </div>

                <div className="text-xs text-zinc-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-zinc-500" /> Primary Lang</span>
                    <span className="font-semibold text-white font-mono-code">C++20</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-zinc-500" /> Methodology</span>
                    <span className="text-zinc-300 font-mono-code">Time & Space Rigor</span>
                  </div>
                </div>

                <a
                  href={profile.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                >
                  <span>Visit LeetCode Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
