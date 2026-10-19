import React from 'react';
import { Layers, Terminal, Sparkles, Compass } from 'lucide-react';
import { AboutDetails } from '../types/portfolio.ts';

interface AboutProps {
  about: AboutDetails;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  const pillars = [
    {
      title: 'Development Interests',
      icon: Layers,
      content: about.developmentInterests,
    },
    {
      title: 'Problem-Solving Journey',
      icon: Terminal,
      content: about.problemSolvingJourney,
    },
    {
      title: 'AI & Machine Learning',
      icon: Sparkles,
      content: about.aiInterest,
    },
    {
      title: 'Current Learning Goals',
      icon: Compass,
      content: about.learningGoals,
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
            01. Philosophy & Purpose
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Building with clarity, discipline, and purpose.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            &ldquo;{about.introduction}&rdquo;
          </p>
        </div>

        {/* 4 Core Focus Areas - Clean Editorial Grid without Pill Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-8 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-lime-400/40 transition-all duration-200"
              >
                {/* Index & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-lime-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-wider">
                      Area 0{idx + 1}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {pillar.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
