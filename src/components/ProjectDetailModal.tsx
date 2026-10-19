import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio.ts';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
  const hasLiveDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl.trim().length > 0);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-lime-400 bg-lime-400/10 border-lime-400/30';
      case 'In Progress':
        return 'text-amber-300 bg-amber-400/10 border-amber-400/30';
      case 'Planned':
        return 'text-sky-300 bg-sky-400/10 border-sky-400/30';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] my-auto overflow-y-auto bg-[#0d0d12] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-xs font-mono-code px-2.5 py-0.5 rounded border ${getStatusColor(
                project.status
              )}`}
            >
              Status: {project.status}
            </span>
            {project.date && (
              <span className="text-xs font-mono-code text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.date}
              </span>
            )}
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Thumbnail Preview */}
        {project.thumbnailUrl && (
          <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 aspect-video relative">
            <img
              src={project.thumbnailUrl}
              alt={`${project.title} interface screenshot`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Case Study Sections */}
        <div className="mt-8 space-y-8 divide-y divide-white/10">
          {/* 1. Overview & Detailed Description */}
          <div className="space-y-3 pt-6 first:pt-0">
            <h3 className="text-sm uppercase tracking-wider font-mono-code text-lime-400 font-semibold">
              01. Project Overview & Context
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.detailedDescription || project.overview}
            </p>
          </div>

          {/* 2. Problem & Solution */}
          {(project.problem || project.solution) && (
            <div className="space-y-4 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.problem && (
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono-code text-zinc-400 font-semibold">
                    The Problem / Purpose
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono-code text-lime-400 font-semibold">
                    The Solution
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. Implemented vs Planned Features */}
          <div className="space-y-4 pt-6">
            <h3 className="text-sm uppercase tracking-wider font-mono-code text-lime-400 font-semibold">
              02. Feature Implementation Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Implemented */}
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-lime-300 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Implemented Features</span>
                </div>
                {project.implementedFeatures && project.implementedFeatures.length > 0 ? (
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {project.implementedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-lime-400 shrink-0">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-zinc-500 italic">No implemented features logged yet.</p>
                )}
              </div>

              {/* Planned */}
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>Planned Features (Roadmap)</span>
                </div>
                {project.plannedFeatures && project.plannedFeatures.length > 0 ? (
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {project.plannedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 shrink-0">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-zinc-500 italic">No future features queued.</p>
                )}
              </div>
            </div>
          </div>

          {/* 4. Technologies Used */}
          <div className="space-y-3 pt-6">
            <h3 className="text-sm uppercase tracking-wider font-mono-code text-lime-400 font-semibold">
              03. Technologies & Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono-code text-zinc-200 bg-zinc-900 border border-white/10 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Contribution & Lessons Learned */}
          {(project.myContribution || project.lessonsLearned) && (
            <div className="space-y-4 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.myContribution && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono-code text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                    My Contribution
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.myContribution}
                  </p>
                </div>
              )}
              {project.lessonsLearned && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono-code text-zinc-400 font-semibold">
                    What I Learned
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.lessonsLearned}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions (Only show valid URLs) */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}

            {!hasGithub && !hasLiveDemo && (
              <span className="text-xs font-mono-code text-zinc-500 italic">
                Source repository & demo access can be requested via contact form.
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 rounded-lg transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
