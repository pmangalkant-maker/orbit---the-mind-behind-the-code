import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { TechStack } from './components/TechStack.tsx';
import { LeetCodeSpotlight } from './components/LeetCodeSpotlight.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectDetailModal } from './components/ProjectDetailModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { OwnerGuideModal } from './components/OwnerGuideModal.tsx';
import { initialPortfolioData } from './data/initialData.ts';
import { PortfolioData, Project } from './types/portfolio.ts';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Initialize session token and check for /admin or #admin
  useEffect(() => {
    const savedToken = sessionStorage.getItem('orbit_admin_token');
    if (savedToken) {
      // Verify with backend
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => {
          if (res.ok) {
            setAdminToken(savedToken);
          } else {
            sessionStorage.removeItem('orbit_admin_token');
          }
        })
        .catch(() => {
          // If offline, keep local state
          setAdminToken(savedToken);
        });
    }

    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setIsAdminOpen(true);
    }
  }, []);

  // Fetch live portfolio data from server
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data: PortfolioData) => {
        if (data && data.profile && data.projects) {
          setPortfolioData(data);
        }
      })
      .catch((err) => {
        console.warn('Could not load data from /api/portfolio, using client fallback:', err);
      });
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    sessionStorage.setItem('orbit_admin_token', token);
  };

  const handleLogout = async () => {
    if (adminToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } catch (e) {
        console.error('Logout error:', e);
      }
    }
    setAdminToken(null);
    sessionStorage.removeItem('orbit_admin_token');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-lime-400 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminAuthenticated={Boolean(adminToken)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={portfolioData.profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onAvatarUpdated={(newUrl) => {
            setPortfolioData((prev) => ({
              ...prev,
              profile: { ...prev.profile, avatarUrl: newUrl },
            }));
          }}
        />

        {/* About Me Section */}
        <About about={portfolioData.about} />

        {/* Skills Section (Grounded competencies) */}
        <Skills skills={portfolioData.skills} />

        {/* Dedicated Technology Stack Section */}
        <TechStack categories={portfolioData.techStack} />

        {/* Algorithm & Problem Solving Spotlight (LeetCode) */}
        <LeetCodeSpotlight profile={portfolioData.profile} />

        {/* Projects Showcase */}
        <Projects
          projects={portfolioData.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Contact Section */}
        <Contact profile={portfolioData.profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={portfolioData.profile}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        isAdminAuthenticated={Boolean(adminToken)}
      />

      {/* Modals & Dialogs */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={portfolioData.profile}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        portfolioData={portfolioData}
        onDataUpdated={(newData) => setPortfolioData(newData)}
        token={adminToken}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      <OwnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
