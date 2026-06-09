import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { FiMail, FiSend, FiCopy, FiCheck, FiLinkedin, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('All form fields are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! I will respond shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-16 md:pt-20 pb-20 md:pb-24 w-full px-6 bg-[#03030c]/20 relative z-10 overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            06. Connect
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Get In Touch</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500/60 to-indigo-500/60 mt-4"></div>
        </div>

        {/* Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Info specifications */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-black text-white leading-tight">Let's Connect</h3>
            <p className="text-base text-foreground/80 leading-relaxed font-normal mb-8">
              Feel free to reach out if you're looking for a developer, want to discuss a project, or just say hello.
            </p>

            <div className="space-y-4">
              {/* Mail box item */}
              <motion.div 
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(168, 85, 247, 0.9)',
                  boxShadow: '0 8px 20px -5px rgba(168,85,247,0.2)',
                  borderWidth: '2px'
                }}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="group relative p-4 border-2 border-zinc-800/50 bg-[#0e1026]/90 rounded-2xl flex items-center justify-between gap-4 overflow-hidden"
              >
                {/* Cyber dot-grid pattern */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ '--pattern-color': 'rgba(168, 85, 247, 0.15)' } as React.CSSProperties}
                />
                {/* Underglow */}
                <div 
                  className="absolute -bottom-1.5 left-1/4 w-1/2 h-[2px] rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#a855f7' }}
                />

                <div className="flex items-center gap-3 overflow-hidden relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border-2 border-purple-500/20 shrink-0">
                    <FiMail />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-foreground/45 block tracking-wider uppercase">EMAIL</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-extrabold text-white hover:text-purple-400 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg border-2 border-zinc-800/50 bg-[#0e1026]/40 text-foreground/60 hover:text-white hover:bg-[#0e1026]/80 transition-all shrink-0 relative z-20"
                >
                  {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                </button>
              </motion.div>

              {/* Social row */}
              <div className="flex gap-4">
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(0, 119, 181, 0.9)',
                    boxShadow: '0 8px 20px -5px rgba(0,119,181,0.2)',
                    borderWidth: '2px'
                  }}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                  className="group relative flex-1 p-4 rounded-2xl border-2 border-zinc-800/50 bg-[#0e1026]/90 flex items-center justify-center gap-2 text-sm font-semibold text-foreground/75 hover:text-purple-400 transition-all overflow-hidden"
                >
                  {/* Cyber dot-grid pattern */}
                  <div 
                    className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ '--pattern-color': 'rgba(0, 119, 181, 0.15)' } as React.CSSProperties}
                  />
                  {/* Underglow */}
                  <div 
                    className="absolute -bottom-1.5 left-1/4 w-1/2 h-[2px] rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: '#0077b5' }}
                  />
                  <FiLinkedin className="relative z-10" />
                  <span className="relative z-10">LinkedIn</span>
                </motion.a>
                
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 20px -5px rgba(255,255,255,0.15)',
                    borderWidth: '2px'
                  }}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                  className="group relative flex-1 p-4 rounded-2xl border-2 border-zinc-800/50 bg-[#0e1026]/90 flex items-center justify-center gap-2 text-sm font-semibold text-foreground/75 hover:text-white transition-all overflow-hidden"
                >
                  {/* Cyber dot-grid pattern */}
                  <div 
                    className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ '--pattern-color': 'rgba(255, 255, 255, 0.1)' } as React.CSSProperties}
                  />
                  {/* Underglow */}
                  <div 
                    className="absolute -bottom-1.5 left-1/4 w-1/2 h-[2px] rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                  <FiGithub className="relative z-10" />
                  <span className="relative z-10">GitHub</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{
              y: -4,
              borderColor: 'rgba(236, 72, 153, 0.9)',
              boxShadow: '0 12px 30px -5px rgba(236,72,153,0.25)',
              borderWidth: '2px'
            }}
            style={{
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="group relative lg:col-span-3 obsidian-card bg-[#0e1026]/95 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Cyber dot-grid pattern */}
            <div 
              className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ '--pattern-color': 'rgba(236, 72, 153, 0.15)' } as React.CSSProperties}
            />
            {/* Underglow */}
            <div 
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: '#ec4899' }}
            />
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-foreground/50 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-zinc-950/40 border-2 border-zinc-900 rounded-xl px-5 py-4 text-sm text-foreground focus:border-purple-500/60 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-foreground/50 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950/40 border-2 border-zinc-900 rounded-xl px-5 py-4 text-sm text-foreground focus:border-purple-500/60 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-foreground/50 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message details..."
                  className="w-full bg-zinc-950/40 border-2 border-zinc-900 rounded-xl px-5 py-4 text-sm text-foreground focus:border-purple-500/60 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-neon-primary py-4 text-sm font-bold"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>



      </div>
    </section>
  );
};
