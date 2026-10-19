import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { Project, ProjectStatus } from '../types/portfolio.ts';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.status === filter;
  });

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return 'text-lime-400 bg-lime-400/10 border-lime-400/25';
      case 'In Progress':
        return 'text-amber-300 bg-amber-400/10 border-amber-400/25';
      case 'Planned':
        return 'text-sky-300 bg-sky-400/10 border-sky-400/25';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
              04. Selected Works & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Projects & Engineering Work
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Real projects demonstrating software architecture, algorithmic logic, user experience design, and problem solving.
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-white/10 rounded-xl shrink-0 self-start md:self-auto">
            {(['All', 'Completed', 'In Progress', 'Planned'] as const).map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => setFilter(statusOption)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${
                  filter === statusOption
                    ? 'bg-lime-400 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Dynamic Layout with Asymmetric Bento Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
            const hasLiveDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl.trim().length > 0);
            const isFeatured = project.featured || idx === 0;

            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-lime-400/40 transition-all duration-200 overflow-hidden ${
                  isFeatured && filteredProjects.length > 2 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Header */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-white/5 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={`${project.title} preview`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono-code text-xs">
                      No Preview Available
                    </div>
                  )}

                  {/* Top Status & Date Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span
                      className={`text-[11px] font-mono-code px-2.5 py-0.5 rounded border backdrop-blur-md ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                    {project.date && (
                      <span className="text-[11px] font-mono-code text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                        {project.date}
                      </span>
                    )}
                  </div>

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-xl sm:text-2xl font-bold text-white group-hover:text-lime-300 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-lime-400 hover:text-black text-zinc-300 transition-colors shrink-0"
                        title="Open Case Study"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Key Implemented or Focus features */}
                    {project.implementedFeatures && project.implementedFeatures.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider font-mono-code text-zinc-500 font-medium block">
                          Key Features
                        </span>
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {project.implementedFeatures.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-center gap-1.5 truncate">
                              <span className="text-lime-400">·</span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Technologies & Action Footer */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    {/* Technologies list */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono-code text-zinc-300 bg-zinc-800/60 border border-white/10 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons (only show valid links) */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-semibold text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1 py-1"
                      >
                        <span>Case Study Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                            title="GitHub Repository"
                            aria-label={`${project.title} GitHub Repository`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}

                        {hasLiveDemo && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                            title="Live Demo"
                            aria-label={`${project.title} Live Demo`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/30 border border-white/10 text-zinc-400">
            <p>No projects found matching the selected status filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};
