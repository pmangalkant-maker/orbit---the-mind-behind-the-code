import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: unknown) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not reach server. Please reach out directly via email.'
      );
    }
  };

  const directMailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hello Mangal,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-widest text-lime-400 font-semibold font-mono-code">
            05. Direct Channels
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get In Touch
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Interested in collaboration, internship opportunities, or discussing software engineering? Send a direct message or connect through my verified channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Verified Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono-code text-zinc-400">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-white/5 group hover:border-lime-400/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-900 text-lime-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-zinc-500 font-mono-code block">Email</span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-semibold text-white hover:text-lime-300 transition-colors truncate block"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(profile.email, 'email')}
                    className="p-1.5 text-zinc-500 hover:text-white rounded-md transition-colors"
                    title="Copy Email"
                    aria-label="Copy Email address"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-white/5 group hover:border-lime-400/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-900 text-lime-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-zinc-500 font-mono-code block">Phone</span>
                      <a
                        href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                        className="text-sm font-semibold text-white hover:text-lime-300 transition-colors truncate block"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="p-1.5 text-zinc-500 hover:text-white rounded-md transition-colors"
                    title="Copy Phone"
                    aria-label="Copy Phone number"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn */}
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-white/5 group hover:border-[#0077B5]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-900 text-[#0077B5] shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-zinc-500 font-mono-code block">LinkedIn</span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#0077B5] transition-colors truncate block">
                        Mangal Kant Pandey
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono-code">Connect ↗</span>
                </a>

                {/* GitHub */}
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-white/5 group hover:border-lime-400/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-900 text-white shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-zinc-500 font-mono-code block">GitHub</span>
                      <span className="text-sm font-semibold text-white group-hover:text-lime-300 transition-colors truncate block">
                        @pmangalkant-maker
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono-code">View ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 relative">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-zinc-400 mb-6 font-mono-code">
                Messages submit directly to the server. Real submission feedback guaranteed.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-lime-400/10 border border-lime-400/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Safely Dispatched</h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Thank you! Your message has been recorded on the server. Mangal Kant will respond as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot spam detection */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300 font-mono-code">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300 font-mono-code">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 font-mono-code">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Frontend Engineering Opportunity / Collaboration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 font-mono-code">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Share project details, inquiry, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                      <div className="space-y-2">
                        <p>{errorMessage}</p>
                        <a
                          href={directMailtoUrl}
                          className="inline-flex items-center gap-1.5 font-semibold text-lime-400 underline"
                        >
                          Send via Default Mail Client Instead ↗
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 disabled:opacity-50 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    >
                      {status === 'submitting' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={directMailtoUrl}
                      className="text-xs font-mono-code text-zinc-400 hover:text-lime-300 transition-colors"
                    >
                      Or open email app directly ↗
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
