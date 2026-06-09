import { motion } from 'framer-motion';
import { experience, education } from '../../data/portfolio';
import { FiBriefcase, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import type { PageType } from '../../App';

interface ExperienceProps {
  preview?: boolean;
  setCurrentPage?: (page: PageType) => void;
}

export const Experience = ({ preview = false, setCurrentPage }: ExperienceProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="experience" className="pt-16 md:pt-20 pb-20 md:pb-24 w-full px-6 bg-[#03030c]/30 relative z-10 overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            04. Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {preview ? 'Current Status' : 'Experience & Education'}
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500/60 to-indigo-500/60 mt-4"></div>
        </div>

        {preview ? (
          /* PREVIEW MODE: Summary of Current Education & Internships */
          <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Current Role Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(168, 85, 247, 0.9)',
                  boxShadow: '0 12px 30px -5px rgba(168,85,247,0.25)',
                  borderWidth: '2px'
                }}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="group relative obsidian-card bg-[#0e1026]/90 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-3xl p-6 md:p-8 overflow-hidden space-y-4 text-left"
              >
                {/* Subtle back corner glow on hover */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#a855f7' }}
                />
                
                {/* Cyber dot-grid pattern overlay */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ '--pattern-color': 'rgba(168, 85, 247, 0.15)' } as React.CSSProperties}
                />

                {/* Blurred neon bottom underglow (light halo spill) */}
                <div 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#a855f7' }}
                />

                <div className="flex items-center gap-3 border-b-2 border-zinc-800/50 pb-3 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border-2 border-purple-500/20">
                    <FiBriefcase className="text-sm" />
                  </div>
                  <h3 className="text-base font-bold text-white">Latest Experience</h3>
                </div>
                <div className="relative z-10">
                  <span className="text-xs text-foreground/50 block mb-1">{experience[0].period}</span>
                  <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {experience[0].role}
                  </h4>
                  <p className="text-sm font-semibold text-purple-400 mb-2">{experience[0].company}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-normal whitespace-pre-line">{experience[0].description}</p>
                </div>
              </motion.div>

              {/* Current Academics Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(99, 102, 241, 0.9)',
                  boxShadow: '0 12px 30px -5px rgba(99,102,241,0.25)',
                  borderWidth: '2px'
                }}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="group relative obsidian-card bg-[#0e1026]/90 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-3xl p-6 md:p-8 overflow-hidden space-y-4 text-left"
              >
                {/* Subtle back corner glow on hover */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#6366f1' }}
                />

                {/* Cyber dot-grid pattern overlay */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ '--pattern-color': 'rgba(99, 102, 241, 0.15)' } as React.CSSProperties}
                />

                {/* Blurred neon bottom underglow (light halo spill) */}
                <div 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#6366f1' }}
                />

                <div className="flex items-center gap-3 border-b-2 border-zinc-800/50 pb-3 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <FiBookOpen className="text-sm" />
                  </div>
                  <h3 className="text-base font-bold text-white">Current Education</h3>
                </div>
                <div className="relative z-10">
                  <span className="text-xs text-foreground/50 block mb-1">{education[0].period}</span>
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {education[0].degree}
                  </h4>
                  <p className="text-sm font-semibold text-indigo-400 mb-2">{education[0].institution}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                    Focusing on {education[0].coursework} with a current score of <strong>{education[0].field}</strong>.
                  </p>
                </div>
              </motion.div>
            </div>

            {setCurrentPage && (
              <button
                onClick={() => setCurrentPage('experience')}
                className="btn-neon-primary group text-xs py-3.5 px-6 rounded-xl"
              >
                Explore Full Journey & Education
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        ) : (
          /* FULL MODE: Full Experience & Education Timelines */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            
            {/* Work Timeline */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-zinc-800/50 pb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border-2 border-purple-500/20">
                  <FiBriefcase className="text-sm" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Work Experience
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="relative border-l-[3.5px] border-zinc-800/60 pl-6 space-y-6 ml-3"
              >
                {experience.map((job, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants} 
                    whileHover={{
                      y: -4,
                      borderColor: 'rgba(168, 85, 247, 0.9)',
                      boxShadow: '0 8px 25px -5px rgba(168,85,247,0.25)',
                      borderWidth: '2px'
                    }}
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className="relative group obsidian-card bg-[#0e1026]/90 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-2xl p-5 overflow-hidden text-left"
                  >
                    {/* Subtle back corner glow on hover */}
                    <div 
                      className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: '#a855f7' }}
                    />

                    {/* Cyber dot-grid pattern overlay */}
                    <div 
                      className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ '--pattern-color': 'rgba(168, 85, 247, 0.15)' } as React.CSSProperties}
                    />

                    {/* Blurred neon bottom underglow (light halo spill) */}
                    <div 
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: '#a855f7' }}
                    />

                    <div className="absolute -left-[32px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-purple-500/60 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)] group-hover:border-purple-400 transition-colors z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-xs md:text-sm text-foreground/50 block mb-1">
                        {job.period}
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        {job.role}
                      </h4>
                      <p className="text-sm font-semibold text-purple-400 mb-3">
                        {job.company}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed font-normal mb-4 whitespace-pre-line">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {job.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-900/60 border-2 border-zinc-800/80 text-foreground/75"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-zinc-800/50 pb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border-2 border-indigo-500/20">
                  <FiBookOpen className="text-sm" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Academic Background
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="relative border-l-[3.5px] border-zinc-800/60 pl-6 space-y-6 ml-3"
              >
                {education.map((edu, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants} 
                    whileHover={{
                      y: -4,
                      borderColor: 'rgba(99, 102, 241, 0.9)',
                      boxShadow: '0 8px 25px -5px rgba(99,102,241,0.25)',
                      borderWidth: '2px'
                    }}
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className="relative group obsidian-card bg-[#0e1026]/90 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-2xl p-5 overflow-hidden text-left"
                  >
                    {/* Subtle back corner glow on hover */}
                    <div 
                      className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: '#6366f1' }}
                    />

                    {/* Cyber dot-grid pattern overlay */}
                    <div 
                      className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ '--pattern-color': 'rgba(99, 102, 241, 0.15)' } as React.CSSProperties}
                    />

                    {/* Blurred neon bottom underglow (light halo spill) */}
                    <div 
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: '#6366f1' }}
                    />

                    <div className="absolute -left-[32px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-indigo-500/60 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)] group-hover:border-indigo-400 transition-colors z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-xs md:text-sm text-foreground/50 block mb-1">
                        {edu.period}
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {edu.degree}
                      </h4>
                      
                      <div className="flex justify-between items-center gap-2 mb-2">
                        <span className="text-sm text-foreground/75">{edu.institution}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                          {edu.cgpa}
                        </span>
                      </div>
                      
                      <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                        <span className="text-xs text-foreground/50 block mb-0.5 font-semibold">Focus fields</span>
                        {edu.coursework}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
