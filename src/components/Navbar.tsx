import React, { useState, useEffect } from 'react';
import { Lock, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          aria-label="ORBIT Portfolio Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-lime-400 group-hover:scale-125 transition-transform"></span>
          <span className="tracking-widest font-extrabold text-white group-hover:text-lime-300 transition-colors">
            ORBIT
          </span>
        </a>

        {/* Zone 2: Navigation Links (Single-Line Clean Text, Subtle Underline) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Owner Auth Control */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title={isAdminAuthenticated ? 'Owner Dashboard (Active)' : 'Owner Portal'}
            aria-label="Owner Admin Portal"
            className={`p-2 rounded-lg transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${
              isAdminAuthenticated
                ? 'bg-lime-400/10 border-lime-400/40 text-lime-400'
                : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide uppercase text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-all duration-150 active:scale-95 whitespace-nowrap shrink-0 shadow-sm shadow-lime-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e] border-b border-white/10 px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-4 text-base font-medium text-zinc-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-lime-400 transition-colors border-b border-white/5 pb-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-lg"
              >
                Get In Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
