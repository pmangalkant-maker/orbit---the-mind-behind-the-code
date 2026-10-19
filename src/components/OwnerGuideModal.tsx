import React, { useEffect } from 'react';
import { X, Terminal, Key, ShieldCheck, Download, Code, Globe, HelpCircle } from 'lucide-react';

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] my-auto overflow-y-auto bg-[#0a0a0f] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-lime-400/10 text-lime-400 border border-lime-400/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-guide-title" className="text-xl font-bold text-white tracking-tight">
                Owner Guide · Deployment & Source Code Ownership
              </h2>
              <p className="text-xs text-zinc-400 font-mono-code">
                Full instructions for running locally, managing data, and live hosting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close guide"
            className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-6 text-sm text-zinc-300">
          {/* Step 1: Local Development in VS Code */}
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-lime-400" />
              <span>1. Run Locally in VS Code</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Export or clone this codebase to your machine. Open the project root folder in VS Code.
            </p>
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 font-mono-code text-xs text-lime-300 space-y-1">
              <div># Install dependencies</div>
              <div className="text-white">npm install</div>
              <div className="pt-1 text-zinc-500"># Start dev server (Express backend + Vite client)</div>
              <div className="text-white">npm run dev</div>
            </div>
            <p className="text-xs text-zinc-400">
              The portfolio will be available at <code className="text-lime-400">http://localhost:3000</code>.
            </p>
          </div>

          {/* Step 2: Environment Variables & Security */}
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-lime-400" />
              <span>2. Configure Administrator Password</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your server uses an environment variable <code className="text-white">ADMIN_PASSWORD</code> to protect the owner dashboard.
            </p>
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 font-mono-code text-xs text-zinc-300 space-y-1">
              <div className="text-zinc-500"># Create .env from .env.example</div>
              <div>ADMIN_PASSWORD=&quot;your-secure-private-passkey&quot;</div>
              <div>ADMIN_SESSION_SECRET=&quot;a-random-secret-string&quot;</div>
            </div>
            <p className="text-xs text-zinc-400">
              Never commit your actual <code className="text-white">.env</code> file to public Git repositories. The <code className="text-white">.gitignore</code> file is already configured to prevent this.
            </p>
          </div>

          {/* Step 3: Data Management & Persistence */}
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-lime-400" />
              <span>3. Managing Content & Backups</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You can manage everything directly through the in-app Owner Dashboard (click the Lock icon in the top right or footer) OR by editing the JSON file:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1 font-mono-code list-disc pl-5">
              <li><strong className="text-white">data/portfolio-data.json</strong>: Stores all your projects, profile info, and skills. Back up this file anytime.</li>
              <li><strong className="text-white">data/messages.json</strong>: Stores contact form submissions from recruiters.</li>
              <li><strong className="text-white">src/data/initialData.ts</strong>: Fallback baseline data if JSON is reset.</li>
            </ul>
          </div>

          {/* Step 4: Live Deployment */}
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-lime-400" />
              <span>4. Live Deployment</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deploy effortlessly to services like Render, Railway, Fly.io, or Google Cloud Run:
            </p>
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 font-mono-code text-xs text-zinc-300 space-y-1">
              <div>Build Command: <span className="text-lime-300">npm run build</span></div>
              <div>Start Command: <span className="text-lime-300">npm start</span></div>
              <div>Node Version: <span className="text-lime-300">&gt;= 18</span></div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
