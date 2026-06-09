import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

import type { PageType } from '../../App';

const Hero3D = lazy(() => import('../3d/Hero3D'));

interface HeroProps {
  setCurrentPage: (page: PageType) => void;
}

export const Hero = ({ setCurrentPage }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center px-6 md:px-12 lg:px-24 overflow-hidden pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center text-center lg:text-left z-10">
        
        {/* Left Column: Hero Text Info */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start w-full">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 mt-4 lg:mt-0"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
              Full Stack & AI/ML Developer | VIT Bhopal
            </span>
          </motion.div>

          {/* Large Typographic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4"
          >
            Hi, I'm <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 text-neon-glow whitespace-nowrap">{personalInfo.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl font-bold tracking-tight mb-8 text-purple-400 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5"
          >
            <span>Backend Developer</span>
            <span className="text-foreground/30 font-light">|</span>
            <span>AI/ML Developer</span>
            <span className="text-foreground/30 font-light">|</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 font-extrabold text-neon-glow">Problem Solver</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-foreground/80 leading-relaxed mb-12 font-normal lg:max-w-2xl"
          >
            I build high-performance backend systems, real-time data pipelines, and intelligent AI architectures. Specializing in Python, Django, FastAPI, and React, I turn complex engineering challenges into robust, production-grade applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
          >
            <button onClick={() => setCurrentPage('projects')} className="btn-neon-primary group">
              View My Work
            </button>
            <button onClick={() => setCurrentPage('contact')} className="btn-neon-outline group">
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Rubik's Cube Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="lg:col-span-2 hidden lg:flex items-center justify-center w-full"
        >
          <Suspense fallback={
            <div className="w-[300px] h-[300px] flex items-center justify-center rounded-2xl bg-[#0e1026]/40 border-2 border-zinc-800/40 relative overflow-hidden shadow-2xl">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          }>
            <Hero3D />
          </Suspense>
        </motion.div>
      </div>

    </section>
  );
};
