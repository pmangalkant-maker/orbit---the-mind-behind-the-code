import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  ArrowUp,
  ArrowDown,
  Lock,
  LogOut,
  FolderPlus,
  CheckCircle2,
  AlertCircle,
  Inbox,
  UserCheck,
  Layers,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { PortfolioData, Project, ProjectStatus, ContactMessage } from '../types/portfolio.ts';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onDataUpdated: (newData: PortfolioData) => void;
  token: string | null;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  portfolioData,
  onDataUpdated,
  token,
  onLoginSuccess,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'skills' | 'messages'>('projects');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Project Editor State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState(portfolioData.profile);
  const [aboutForm, setAboutForm] = useState(portfolioData.about);

  // Messages Inbox State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Synchronize internal state if portfolioData updates
  useEffect(() => {
    setProfileForm(portfolioData.profile);
    setAboutForm(portfolioData.about);
  }, [portfolioData]);

  // Fetch messages if authenticated and tab active
  useEffect(() => {
    if (token && activeTab === 'messages') {
      fetchMessages();
    }
  }, [token, activeTab]);

  const fetchMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      onLoginSuccess(data.token);
      setPassword('');
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Invalid credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- Project CRUD ---
  const handleSaveProject = async () => {
    if (!editingProject || !token) return;

    if (!editingProject.title.trim()) {
      alert('Project title is required.');
      return;
    }

    try {
      let updatedProjects: Project[];
      if (isCreatingNew) {
        const newProj = {
          ...editingProject,
          id: editingProject.id || 'proj_' + Date.now(),
        };
        updatedProjects = [newProj, ...portfolioData.projects];
      } else {
        updatedProjects = portfolioData.projects.map((p) =>
          p.id === editingProject.id ? editingProject : p
        );
      }

      const res = await fetch('/api/portfolio/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projects: updatedProjects }),
      });

      if (!res.ok) throw new Error('Failed to update projects on server.');

      onDataUpdated({ ...portfolioData, projects: updatedProjects });
      setEditingProject(null);
      setIsCreatingNew(false);
      setSaveStatus('Project saved successfully.');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/portfolio/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete project on server.');

      const updated = portfolioData.projects.filter((p) => p.id !== id);
      onDataUpdated({ ...portfolioData, projects: updated });
      if (editingProject?.id === id) {
        setEditingProject(null);
        setIsCreatingNew(false);
      }
      setSaveStatus('Project deleted.');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete error');
    }
  };

  const handleMoveProject = async (index: number, direction: 'up' | 'down') => {
    if (!token) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= portfolioData.projects.length) return;

    const list = [...portfolioData.projects];
    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);

    try {
      const res = await fetch('/api/portfolio/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projects: list }),
      });
      if (res.ok) {
        onDataUpdated({ ...portfolioData, projects: list });
      }
    } catch (err) {
      console.error('Failed to reorder projects:', err);
    }
  };

  const handleSaveProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/portfolio/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profile: profileForm, about: aboutForm }),
      });
      if (!res.ok) throw new Error('Failed to update profile.');

      onDataUpdated({
        ...portfolioData,
        profile: profileForm,
        about: aboutForm,
      });
      setSaveStatus('Profile and About info saved.');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-admin-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] my-auto overflow-y-auto bg-[#0a0a0f] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-admin-title" className="text-xl font-bold text-white tracking-tight">
                Owner Administration Dashboard
              </h2>
              <p className="text-xs text-zinc-400 font-mono-code">
                {token ? 'Authenticated as Mangal Kant (Owner)' : 'Server Authentication Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-red-400 bg-zinc-900 border border-white/10 rounded-lg transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close admin dashboard"
              className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {saveStatus && (
          <div className="mt-4 p-3 bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* View 1: Login Form if NOT Authenticated */}
        {!token ? (
          <div className="py-12 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Owner Security Verification</h3>
              <p className="text-xs text-zinc-400">
                This dashboard allows Mangal Kant to modify projects, skills, and profile data. Public visitors and recruiters do not have write permissions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 p-6 rounded-xl bg-zinc-900/60 border border-white/10">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-zinc-300">Administrator Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? 'Verifying...' : 'Authenticate & Unlock'}
              </button>

              <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg text-[11px] text-zinc-400 font-mono-code space-y-1">
                <div className="text-zinc-500 font-semibold">Initial Setup Note:</div>
                <div>Default configured passkey: <code className="text-lime-400">orbit-mangal-2026!</code></div>
                <div>You can change this in your root <code className="text-zinc-300">.env</code> via <code className="text-zinc-300">ADMIN_PASSWORD</code>.</div>
              </div>
            </form>
          </div>
        ) : (
          /* View 2: Authenticated Admin Controls */
          <div className="mt-6 space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'projects'
                    ? 'bg-lime-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Projects ({portfolioData.projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-lime-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Profile & About</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'messages'
                    ? 'bg-lime-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Inquiries Inbox ({messages.length})</span>
              </button>
            </div>

            {/* TAB 1: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {!editingProject ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-400 font-mono-code">
                        Reorder, edit, delete, or create new portfolio projects.
                      </p>
                      <button
                        onClick={() => {
                          setIsCreatingNew(true);
                          setEditingProject({
                            id: '',
                            title: '',
                            shortDescription: '',
                            detailedDescription: '',
                            overview: '',
                            problem: '',
                            solution: '',
                            implementedFeatures: [],
                            plannedFeatures: [],
                            technologies: [],
                            status: 'In Progress',
                            thumbnailUrl: '',
                            githubUrl: '',
                            liveDemoUrl: '',
                            myContribution: '',
                            lessonsLearned: '',
                            date: new Date().getFullYear().toString(),
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {portfolioData.projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Reordering arrows */}
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleMoveProject(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveProject(idx, 'down')}
                                disabled={idx === portfolioData.projects.length - 1}
                                className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm truncate">{proj.title}</span>
                                <span className="text-[10px] font-mono-code text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                                  {proj.status}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 truncate max-w-lg mt-0.5">
                                {proj.shortDescription}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setIsCreatingNew(false);
                                setEditingProject({ ...proj });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-400 bg-zinc-800 hover:bg-red-500/10 border border-white/10 rounded-lg transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Project Edit Form */
                  <div className="space-y-5 p-6 rounded-xl bg-zinc-900/60 border border-white/10">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <h3 className="font-bold text-white text-base">
                        {isCreatingNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
                      </h3>
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingNew(false);
                        }}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">Project Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">Project Status</label>
                        <select
                          value={editingProject.status}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              status: e.target.value as ProjectStatus,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        >
                          <option value="Planned">Planned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-mono-code text-zinc-400">Short Description</label>
                        <input
                          type="text"
                          value={editingProject.shortDescription}
                          onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-mono-code text-zinc-400">Detailed Description / Overview</label>
                        <textarea
                          rows={3}
                          value={editingProject.detailedDescription || editingProject.overview}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              detailedDescription: e.target.value,
                              overview: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">GitHub Repository URL</label>
                        <input
                          type="text"
                          placeholder="https://github.com/..."
                          value={editingProject.githubUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">Live Demo URL</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={editingProject.liveDemoUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-mono-code text-zinc-400">Thumbnail / Image URL</label>
                        <input
                          type="text"
                          value={editingProject.thumbnailUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-mono-code text-zinc-400">
                          Technologies Used (comma separated)
                        </label>
                        <input
                          type="text"
                          value={editingProject.technologies.join(', ')}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              technologies: e.target.value
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">
                          Implemented Features (1 per line)
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.implementedFeatures.join('\n')}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              implementedFeatures: e.target.value
                                .split('\n')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">
                          Planned Features (1 per line)
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.plannedFeatures.join('\n')}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              plannedFeatures: e.target.value
                                .split('\n')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">My Contribution</label>
                        <input
                          type="text"
                          value={editingProject.myContribution}
                          onChange={(e) => setEditingProject({ ...editingProject, myContribution: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono-code text-zinc-400">Lessons Learned</label>
                        <input
                          type="text"
                          value={editingProject.lessonsLearned}
                          onChange={(e) => setEditingProject({ ...editingProject, lessonsLearned: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingNew(false);
                        }}
                        className="px-4 py-2 text-xs text-zinc-300 hover:text-white bg-zinc-800 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Project</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROFILE & ABOUT EDIT */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 space-y-4">
                  <h3 className="font-bold text-white text-sm">Personal Profile Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Professional Identity</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Tagline</label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Phone</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">LeetCode Username</label>
                      <input
                        type="text"
                        value={profileForm.leetcodeUsername}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            leetcodeUsername: e.target.value,
                            leetcodeUrl: `https://leetcode.com/u/${e.target.value}/`,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-mono-code text-zinc-400">Profile Portrait Image URL</label>
                      <input
                        type="text"
                        value={profileForm.avatarUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 space-y-4">
                  <h3 className="font-bold text-white text-sm">About Section Content</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Introduction Narrative</label>
                      <textarea
                        rows={3}
                        value={aboutForm.introduction}
                        onChange={(e) => setAboutForm({ ...aboutForm, introduction: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Development Interests</label>
                      <textarea
                        rows={2}
                        value={aboutForm.developmentInterests}
                        onChange={(e) => setAboutForm({ ...aboutForm, developmentInterests: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Problem Solving Journey</label>
                      <textarea
                        rows={2}
                        value={aboutForm.problemSolvingJourney}
                        onChange={(e) => setAboutForm({ ...aboutForm, problemSolvingJourney: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">AI & Machine Learning Interest</label>
                      <textarea
                        rows={2}
                        value={aboutForm.aiInterest}
                        onChange={(e) => setAboutForm({ ...aboutForm, aiInterest: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono-code text-zinc-400">Current Learning Goals</label>
                      <textarea
                        rows={2}
                        value={aboutForm.learningGoals}
                        onChange={(e) => setAboutForm({ ...aboutForm, learningGoals: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile & About</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: MESSAGES INBOX */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <p className="text-xs text-zinc-400 font-mono-code">
                    Inquiries received through the public portfolio contact form.
                  </p>
                  <button
                    onClick={fetchMessages}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-md"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingMessages ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="p-10 text-center rounded-xl bg-zinc-900/30 border border-white/5 text-zinc-400 text-xs">
                    No contact messages received yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3 text-xs"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{msg.name}</span>
                              <span className="text-zinc-500 font-mono-code">({msg.email})</span>
                            </div>
                            <span className="text-lime-400 font-semibold block mt-0.5">{msg.subject}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500 font-mono-code text-[11px]">
                              {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-zinc-500 hover:text-red-400 p-1"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-zinc-300 bg-zinc-950 p-3.5 rounded-lg border border-white/5 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>

                        <div className="flex justify-end">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + msg.subject)}`}
                            className="text-lime-400 hover:underline font-mono-code text-[11px]"
                          >
                            Reply to {msg.email} ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
