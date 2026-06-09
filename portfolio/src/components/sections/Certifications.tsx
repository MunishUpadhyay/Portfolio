import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../../data/portfolio';
import { FiAward, FiArrowUpRight } from 'react-icons/fi';

export const Certifications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ml' | 'tech'>('all');

  const tabs: { label: string; id: typeof activeTab }[] = [
    { label: 'All Credentials', id: 'all' },
    { label: 'AI, ML & Analytics', id: 'ml' },
    { label: 'Core Infrastructure', id: 'tech' },
  ];

  const getFilteredCertifications = () => {
    if (activeTab === 'ml') {
      return certifications.filter(c => c.title.includes('Machine') || c.title.includes('Marketing'));
    }
    if (activeTab === 'tech') {
      return certifications.filter(c => c.title.includes('Networking'));
    }
    return certifications;
  };

  const displayedCerts = getFilteredCertifications();



  return (
    <section id="certifications" className="pt-16 md:pt-20 pb-20 md:pb-24 w-full px-6 bg-[#03030c]/10 relative z-10 overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            05. Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Certifications</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500/60 to-indigo-500/60 mt-4"></div>
        </div>

        {/* Credentials Tabs Filter */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950/80 border-2 border-zinc-900/80 rounded-2xl max-w-xl mx-auto mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-grow sm:flex-none px-5 py-2.5 text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 border-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500/10 border-purple-500/25 text-purple-400 font-bold shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                  : 'text-foreground/60 hover:text-white border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Certificate Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -6,
                  borderColor: cert.color ? `${cert.color}90` : 'rgba(168, 85, 247, 0.6)',
                  boxShadow: cert.color ? `0 12px 30px -5px ${cert.color}25` : '0 12px 30px -5px rgba(168, 85, 247, 0.25)',
                  borderWidth: '2px'
                }}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="group relative obsidian-card bg-[#0e1026]/95 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Subtle back corner glow on hover */}
              <div 
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: cert.color }}
              />

              {/* Cyber dot-grid pattern overlay */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ '--pattern-color': `${cert.color || '#a855f7'}15` } as React.CSSProperties}
              />

              {/* Blurred neon bottom underglow (light halo spill) */}
              <div 
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: cert.color || '#a855f7' }}
              />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border-2 border-purple-500/20">
                      <FiAward className="text-base" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-foreground/45 block tracking-wider uppercase">
                        Issuer
                      </span>
                      <span className="text-sm font-bold text-purple-400">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm bg-zinc-950 border-2 border-zinc-900 px-3 py-1 rounded-lg text-foreground/60">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm text-foreground/80 font-normal leading-relaxed mb-8">
                  {cert.description}
                </p>
              </div>

              {cert.link && (
                <div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 hover:text-white transition-colors hover:underline"
                  >
                    Verify Credential
                    <FiArrowUpRight />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
