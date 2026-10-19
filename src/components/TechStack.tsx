import React from 'react';
import { TechStackCategory } from '../types/portfolio.ts';
import { TechIcon } from './TechIcons.tsx';

interface TechStackProps {
  categories: TechStackCategory[];
}

export const TechStack: React.FC<TechStackProps> = ({ categories }) => {
  return (
    <section id="tech-stack" className="py-24 px-6 md:px-10 border-t border-white/5 relative">
      {/* Background accent glow */}
      <div
        className="absolute bottom-10 left-10 w-80 h-80 bg-lime-400/[0.02] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/5">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
              03. Tooling & Technologies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Technology Stack
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Technologies and tools utilized across client applications, systems programming, algorithmic practice, and user interface prototyping.
            </p>
          </div>

          <div className="text-xs font-mono-code text-zinc-400 bg-zinc-900/80 px-3.5 py-2 rounded-lg border border-white/10 shrink-0">
            <span>Separate from Skills · Working Proficiency</span>
          </div>
        </div>

        {/* Dedicated Subsections for Each Category */}
        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-6">
              {/* Category Header Bar */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono-code text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                  Tier 0{catIdx + 1}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {cat.category}
                </h3>
                <div className="h-px bg-white/10 flex-1 ml-2" />
              </div>

              {/* Technologies Grid for this Category */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/10 hover:border-lime-400/40 transition-all duration-200"
                  >
                    {/* Icon container */}
                    <div className="w-11 h-11 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center p-2 text-zinc-300 group-hover:text-lime-300 group-hover:border-lime-400/30 transition-colors shrink-0 shadow-sm">
                      <TechIcon name={tech.iconKey || tech.name} className="w-6 h-6" />
                    </div>

                    {/* Tech details */}
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-semibold text-white group-hover:text-lime-300 transition-colors block truncate">
                        {tech.name}
                      </span>
                      <span className="text-[11px] font-mono-code text-zinc-500 block truncate">
                        {cat.category.split(' ')[0]}
                      </span>
                    </div>

                    {/* Subtle corner highlight */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-lime-400/0 group-hover:bg-lime-400/80 transition-all duration-200" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Grounding statement to strictly comply with Accuracy Rule */}
        <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>
            <strong>Accuracy Note:</strong> The above list represents technologies used in projects and coursework. Detailed current proficiency and active learning progress are cataloged in the Skills section above.
          </span>
          <span className="font-mono-code text-lime-400 text-nowrap">Updated 2026</span>
        </div>
      </div>
    </section>
  );
};
