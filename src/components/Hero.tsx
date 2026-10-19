import React, { useState, useRef } from 'react';
import { Github, Linkedin, ArrowDown, FileText, Mail, Code2, ExternalLink, Camera, Check } from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
  onAvatarUpdated?: (newUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume, onAvatarUpdated }) => {
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allow owner to upload / replace the portrait directly if needed
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Data, filename: file.name }),
        });

        if (res.ok) {
          const result = await res.json();
          setImageError(false);
          setUploadSuccess(true);
          if (onAvatarUpdated) {
            onAvatarUpdated(result.avatarUrl);
          }
          setTimeout(() => setUploadSuccess(false), 3000);
        } else {
          alert('Could not update portrait image on server.');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Portrait upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-lime-500/5 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 right-10 w-96 h-96 bg-lime-400/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typographic Hierarchy & Primary Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Eyebrow / Professional Identity */}
          <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code flex items-center gap-2">
            <span>Full-Stack Web Developer</span>
            <span className="text-zinc-600">/</span>
            <span>C++ Problem Solver</span>
            <span className="text-zinc-600">/</span>
            <span>AI Enthusiast</span>
          </div>

          {/* Primary Name */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl text-lime-400/90 font-medium tracking-tight">
              &ldquo;{profile.tagline}&rdquo;
            </p>
          </div>

          {/* Concise Honest Introduction */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Focused on engineering resilient web architectures, mastering algorithm design in C++, and creating intuitive digital products with clean systems design.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide uppercase text-black bg-lime-400 hover:bg-lime-300 rounded-lg shadow-md shadow-lime-400/20 transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              Explore My Projects
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime-400/50 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <FileText className="w-4 h-4 text-lime-400" />
              <span>View Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-zinc-300 hover:text-white bg-transparent hover:bg-white/5 border border-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Verified Social & Coding Channels */}
          <div className="pt-4 flex items-center gap-5 border-t border-white/5">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Connect</span>
            <div className="flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-label="Mangal Kant's GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-400 hover:text-[#0077B5] hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-label="Mangal Kant's LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={profile.leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code text-zinc-300 hover:text-lime-300 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-label="Mangal Kant's LeetCode Profile"
              >
                <Code2 className="w-4 h-4 text-lime-400" />
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Rectangular Editorial Portrait (No Circular Cropping, Clean Proportions) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md rounded-xl bg-zinc-900/60 border border-white/10 p-2 shadow-2xl hover:border-lime-400/40 transition-all duration-300 group">
            {/* Hidden file input for fast photo replacement */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Rectangular Image Container - Preserving natural rectangular proportions without circular clipping */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden bg-zinc-950 border border-white/5">
              {!imageError && profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} - Professional Portrait`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-900 text-center">
                  <div className="w-16 h-16 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 font-bold text-2xl mb-4 font-mono-code">
                    MK
                  </div>
                  <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">{profile.title}</p>
                </div>
              )}

              {/* Minimal caption scrim at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
                <div>
                  <span className="text-xs font-semibold text-white tracking-wide block">{profile.name}</span>
                  <span className="text-[11px] text-zinc-400 font-mono-code block">ORBIT Portfolio</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-lime-400 font-mono-code">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Available for Opportunities</span>
                </div>
              </div>

              {/* Fast Photo Replacement Button Overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                aria-label="Upload or replace profile photo"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-black/75 hover:bg-black text-white hover:text-lime-300 border border-white/20 backdrop-blur-md text-xs flex items-center gap-1.5 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                title="Replace profile photo"
              >
                {uploadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-lime-400" />
                    <span className="font-mono-code text-[11px]">Updated</span>
                  </>
                ) : isUploading ? (
                  <span className="font-mono-code text-[11px]">Uploading...</span>
                ) : (
                  <>
                    <Camera className="w-3.5 h-3.5 text-lime-400" />
                    <span className="font-mono-code text-[11px]">Update Photo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-lime-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-md p-1"
        aria-label="Scroll to About section"
      >
        <span className="text-[11px] uppercase tracking-widest font-mono-code">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
