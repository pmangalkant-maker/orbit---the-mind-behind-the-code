import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const normalized = name.toLowerCase().replace(/[\s.-]/g, '');

  switch (normalized) {
    case 'html5':
    case 'html':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="HTML5">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="rgba(163, 230, 53, 0.08)" stroke="#a3e635" />
          <path d="M17 7H7l.5 5h9l-.5 4.5-4 1-4-1-.2-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'css3':
    case 'css':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="CSS3">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="rgba(163, 230, 53, 0.08)" stroke="#a3e635" />
          <path d="M16.5 7.5H7.5l.4 4h8.2l-.6 5-3.5 1-3.5-1-.2-2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="JavaScript">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#a3e635" fill="rgba(163, 230, 53, 0.08)" />
          <path d="M8 12v4.5a1.5 1.5 0 0 1-3 0" stroke="currentColor" strokeLinecap="round" />
          <path d="M12.5 15.5c.5.7 1.3 1 2.2 1 1.3 0 2.3-.7 2.3-1.8 0-1-.7-1.5-1.8-1.8l-1-.3c-1.3-.4-2-1-2-2.2 0-1.3 1.1-2.4 2.6-2.4 1 0 1.8.4 2.4 1" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case 'react':
    case 'reactjs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="React.js">
          <ellipse cx="12" cy="12" rx="3" ry="3" fill="#a3e635" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" stroke="#a3e635" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" stroke="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" stroke="currentColor" />
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="C Programming Language">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#a3e635" fill="rgba(163, 230, 53, 0.08)" />
          <path d="M15.5 8.5a4.5 4.5 0 1 0 0 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
      );
    case 'cpp':
    case 'c++':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="C++ Programming Language">
          <rect x="2.5" y="3" width="19" height="18" rx="4" stroke="#a3e635" fill="rgba(163, 230, 53, 0.08)" />
          <path d="M10 8.5a3.5 3.5 0 1 0 0 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M14 11v2M13 12h2M18 11v2M17 12h2" stroke="#a3e635" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      );
    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="Java">
          <path d="M8 18c2 1 6 1 8 0M7 20c3 1 7 1 10 0" stroke="#a3e635" strokeLinecap="round" />
          <path d="M6 14c4 1 8 1 12 0s-2 4-6 4-6-3-6-4z" stroke="currentColor" />
          <path d="M12 4c-1 2 2 3 1 5s-2 2-1 4" stroke="currentColor" strokeLinecap="round" />
          <path d="M15 6c-1 1.5 1.5 2.5.8 4.2" stroke="#a3e635" strokeLinecap="round" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="Python">
          <path d="M12 3c-3 0-5 .5-5 2.5V8h5V9H6c-2 0-3.5 1.5-3.5 3.5S3.5 16 6 16h2v-2c0-1.5 1-2.5 2.5-2.5h5c1 0 2-.8 2-2V5c0-1.7-1.5-2-3.5-2z" fill="rgba(163, 230, 53, 0.1)" stroke="#a3e635" />
          <path d="M12 21c3 0 5-.5 5-2.5V16h-5v-1h6c2 0 3.5-1.5 3.5-3.5S20.5 8 18 8h-2v2c0 1.5-1 2.5-2.5 2.5h-5c-1 0-2 .8-2 2v4.5c0 1.7 1.5 2 3.5 2z" stroke="currentColor" />
          <circle cx="9" cy="5.5" r=".75" fill="#a3e635" />
          <circle cx="15" cy="18.5" r=".75" fill="#a3e635" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-label="Figma">
          <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2H12v5H8.5A2.5 2.5 0 0 1 6 4.5z" stroke="#a3e635" fill="rgba(163, 230, 53, 0.1)" />
          <path d="M12 2h3.5A2.5 2.5 0 0 1 18 4.5 2.5 2.5 0 0 1 15.5 7H12V2z" stroke="currentColor" />
          <path d="M12 7h3.5A2.5 2.5 0 0 1 18 9.5 2.5 2.5 0 0 1 15.5 12H12V7z" stroke="currentColor" />
          <path d="M6 9.5A2.5 2.5 0 0 1 8.5 7H12v5H8.5A2.5 2.5 0 0 1 6 9.5z" stroke="#a3e635" fill="rgba(163, 230, 53, 0.1)" />
          <path d="M6 14.5A2.5 2.5 0 0 1 8.5 12H12v2.5a2.5 2.5 0 1 1-5 0z" stroke="#a3e635" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#a3e635" />
          <path d="M9 12h6M12 9v6" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
  }
};
