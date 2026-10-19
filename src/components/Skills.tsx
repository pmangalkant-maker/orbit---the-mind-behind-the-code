import React from 'react';
import { CheckCircle2, BookOpen } from 'lucide-react';
import { SkillCategory } from '../types/portfolio.ts';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-24 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
            02. Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Technical Skills & Domains
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            A grounded overview of my technical capabilities and active areas of study. I value depth and understanding of foundational mechanics over superficial vanity metrics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((categoryGroup, index) => (
            <div
              key={categoryGroup.category}
              className="p-6 rounded-xl bg-zinc-900/30 border border-white/10 hover:border-lime-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {categoryGroup.category}
                  </h3>
                  <span className="text-xs font-mono-code text-zinc-500">
                    0{index + 1}
                  </span>
                </div>

                {categoryGroup.description && (
                  <p className="text-xs text-zinc-400 mb-5 leading-normal">
                    {categoryGroup.description}
                  </p>
                )}

                <ul className="space-y-3">
                  {categoryGroup.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-start justify-between gap-3 text-sm text-zinc-200"
                    >
                      <div className="flex items-center gap-2.5">
                        {skill.tag === 'Currently Learning' ? (
                          <BookOpen className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-lime-400/80 shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>

                      {skill.tag && (
                        <span className="text-[11px] font-mono-code text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20 whitespace-nowrap shrink-0">
                          {skill.tag}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] font-mono-code text-zinc-500 flex items-center justify-between">
                <span>Verified Baseline</span>
                <span>Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
