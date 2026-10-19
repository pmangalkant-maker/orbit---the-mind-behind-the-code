import React from 'react';
import { Lock, Github, Linkedin, Code2, HelpCircle } from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface FooterProps {
  profile: Profile;
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  isAdminAuthenticated: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenAdmin,
  onOpenGuide,
  isAdminAuthenticated,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#060608] py-14 px-6 md:px-10 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="font-extrabold tracking-wider text-white text-sm">ORBIT</span>
              <span className="text-zinc-600 font-mono-code">/</span>
              <span className="text-zinc-400 font-medium text-xs">The Mind Behind the Code</span>
            </div>
            <p className="text-zinc-400 text-xs max-w-sm">
              Portfolio of {profile.name} — {profile.title}
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-[#0077B5] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.leetcodeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-lime-300 transition-colors"
              aria-label="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Guide, and Admin Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Built with precision and discipline.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenGuide}
              className="text-zinc-400 hover:text-lime-300 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-400 rounded p-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Owner Setup Guide</span>
            </button>

            <span className="text-zinc-700">·</span>

            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-400 rounded p-1 ${
                isAdminAuthenticated ? 'text-lime-400 hover:text-lime-300' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'Owner Dashboard (Active)' : 'Owner Portal'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
