import React, { useEffect } from 'react';
import { X, Printer, Mail, Phone, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] my-auto overflow-y-auto bg-[#0f0f14] border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono-code text-lime-400">
            <span className="w-2 h-2 rounded-full bg-lime-400" />
            <span>Verified Professional Summary · 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume view"
              className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="mt-8 space-y-8 bg-zinc-950 p-6 sm:p-10 rounded-xl border border-white/10">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <h2 id="modal-resume-title" className="text-3xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h2>
            <p className="text-base text-lime-400 font-medium">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-mono-code pt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="hover:text-white">{profile.phone}</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-zinc-500" />
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-zinc-500" />
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <a href={profile.leetcodeUrl} target="_blank" rel="noreferrer" className="hover:text-white">LeetCode (@{profile.leetcodeUsername})</a>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono-code text-lime-400 font-bold">
              Summary
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Technical Competencies */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono-code text-lime-400 font-bold">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <span className="text-zinc-400 font-semibold block font-mono-code">Programming & Systems</span>
                <span className="text-zinc-200">C++, C, Python, Object-Oriented Programming (OOP)</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <span className="text-zinc-400 font-semibold block font-mono-code">Web & Frontend</span>
                <span className="text-zinc-200">Full-Stack Web Development, HTML5, CSS3, JavaScript, React.js</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <span className="text-zinc-400 font-semibold block font-mono-code">Computer Science Core</span>
                <span className="text-zinc-200">Data Structures & Algorithms (DSA), Problem Solving, Complexity Analysis</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <span className="text-zinc-400 font-semibold block font-mono-code">Emerging & Design</span>
                <span className="text-zinc-200">Artificial Intelligence (AI), Machine Learning (Active Study), Figma UI/UX</span>
              </div>
            </div>
          </div>

          {/* Key Featured Projects */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-mono-code text-lime-400 font-bold">
              Representative Projects
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">SkillMap</span>
                  <span className="text-zinc-500 font-mono-code">React, TypeScript, Graph UI · In Progress</span>
                </div>
                <p className="text-zinc-300">
                  Interactive career skill-mapping and prerequisite node visualization platform helping developers chart learning paths.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Medsick</span>
                  <span className="text-zinc-500 font-mono-code">React, TypeScript, Node.js · In Progress</span>
                </div>
                <p className="text-zinc-300">
                  AI-assisted healthcare triage concept platform streamlining vitals monitoring, symptom categorization, and practitioner directories.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Amazon Frontend Practice Clone</span>
                  <span className="text-zinc-500 font-mono-code">HTML5, CSS3, JavaScript, React · Completed</span>
                </div>
                <p className="text-zinc-300">
                  Independent practice clone implementing responsive e-commerce catalog grids, stateful cart drawer, and dynamic checkout calculations.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Python File Manager</span>
                  <span className="text-zinc-500 font-mono-code">Python, OS/Shutil · Completed</span>
                </div>
                <p className="text-zinc-300">
                  Automated file system utility for batch directory sorting, safe duplicate identification, and storage space auditing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
