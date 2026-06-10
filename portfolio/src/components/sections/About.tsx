import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowRight, FiTerminal, FiAward, FiCpu } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import type { PageType } from '../../App';

interface AboutProps {
  preview?: boolean;
  setCurrentPage?: (page: PageType) => void;
}

export const About = ({ preview = false, setCurrentPage }: AboutProps) => {
  const [activeCmd, setActiveCmd] = useState<'bio' | 'skills' | 'leetcode'>('bio');
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leetcodeSolved, setLeetcodeSolved] = useState<number>(282);

  // Dynamic LeetCode Problems Solved count fetching
  useEffect(() => {
    fetch('https://leetcode-api-faisalshohag.vercel.app/Munish_01')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalSolved === 'number') {
          setLeetcodeSolved(data.totalSolved);
        }
      })
      .catch((err) => console.error('Error fetching LeetCode solved count:', err));
  }, []);

  const commands = useMemo(() => ({
    bio: {
      cmd: 'cat biography.json',
      output: JSON.stringify({
        name: personalInfo.name,
        role: personalInfo.role,
        focus: "Production-grade Backend Systems & Generative AI",
        education: "VIT Bhopal University (CSE, 2023 - 2027)",
        current_gpa: "9.13 / 10.0"
      }, null, 2)
    },
    skills: {
      cmd: 'npm info core-stack',
      output: `core-languages: Python, C++, Java, SQL
backend-web: Django, FastAPI, REST APIs, PostgreSQL
data-science-ai: PyTorch, LLMs, Generative AI, RAG
tools-devops: Git, Docker, Redis, Celery`
    },
    leetcode: {
      cmd: 'leetcode --status',
      output: `username: Munish_01
dsa-solved: ${leetcodeSolved} problems
specialties: Arrays, Graphs, DP, Trees
ranking: Top 25% of active monthly coders`
    }
  }), [leetcodeSolved]);

  useEffect(() => {
    setIsTyping(true);
    setTerminalText('');
    let index = 0;
    const fullText = `munish@vitbhopal ~ % ${commands[activeCmd].cmd}\n${commands[activeCmd].output}`;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText[index];
        setTerminalText((prev) => prev + char);
        index++;
      }
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 6); // Very fast typing for instant feedback
    
    return () => clearInterval(interval);
  }, [activeCmd, commands]);

  return (
    <section id="about" className="pt-12 md:pt-16 pb-12 md:pb-16 w-full px-6 bg-[#03030c]/30 relative z-10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            01. Profile
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {preview ? 'Profile Insight' : 'About Me'}
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500/60 to-indigo-500/60 mt-4"></div>
        </div>

        {/* Dual Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column: Structured Sections in Siddhartha-style layout (Col-span 3) */}
          <div className="lg:col-span-3 space-y-12 text-left">
            
            {/* Section 1: Who I Am */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3 flex items-center gap-2.5">
                Who I Am
              </h3>
              <p className="text-base text-foreground/80 leading-relaxed font-normal">
                {personalInfo.description[0]}
              </p>
            </div>

            {/* Section 2: My Journey */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3">
                My Journey
              </h3>
              <p className="text-base text-foreground/80 leading-relaxed font-normal">
                {personalInfo.description[1]}
              </p>
            </div>

            {/* Section 3: What I Do */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3">
                What I Do
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5 text-base text-foreground/80 font-normal">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_#a855f7]" />
                  <span>Build production-grade backend systems and scalable, secure RESTful APIs.</span>
                </li>
                <li className="flex items-start gap-3.5 text-base text-foreground/80 font-normal">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_#a855f7]" />
                  <span>Engineer intelligent, multi-agent LLM reasoning pipelines and retrieval-augmented generation (RAG) platforms.</span>
                </li>
                <li className="flex items-start gap-3.5 text-base text-foreground/80 font-normal">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_#a855f7]" />
                  <span>Design structured data pipelines using relational databases, vector DBs (ChromaDB), and caches (Redis).</span>
                </li>
                <li className="flex items-start gap-3.5 text-base text-foreground/80 font-normal">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_#a855f7]" />
                  <span>Implement dockerized microservices and asynchronous task workers via Celery to serve model inferences.</span>
                </li>
              </ul>
            </div>

            {/* Section 4: Beyond Code */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3">
                Beyond Code
              </h3>
              <p className="text-base text-foreground/80 leading-relaxed font-normal">
                I thrive in collaborative environments and enjoy converting research prototypes into deployable solutions. I believe in continuous learning, clean code practices, and sharing knowledge to create high-impact backend systems and AI applications.
              </p>
            </div>

            {/* Section 5: Education */}
            <div className="space-y-4 pt-6 border-t border-zinc-800/40">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3">
                Education
              </h3>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0e1026]/40 border border-zinc-850/60 rounded-2xl p-5 shadow-sm">
                <div>
                  <h5 className="text-base font-extrabold text-white">VIT Bhopal University</h5>
                  <p className="text-sm text-foreground/75 mt-1 font-normal">B.Tech in Computer Science & Engineering</p>
                  <p className="text-xs text-purple-400 font-bold mt-0.5">CGPA: 9.13 / 10.0</p>
                </div>
                <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-lg shrink-0">
                  Sept 2023 - May 2027
                </span>
              </div>
            </div>

            {/* Section 6: Interactive Terminal Console (Differentiator Playground) */}
            <div className="space-y-4 pt-6 border-t border-zinc-800/40">
              <h3 className="text-xl md:text-2xl font-black text-white border-l-4 border-purple-500 pl-3 flex items-center justify-between">
                <span>Interactive Terminal</span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 animate-pulse">bash shell</span>
              </h3>
              
              <div className="space-y-4">
                {/* Terminal Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(['bio', 'skills', 'leetcode'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveCmd(key)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-mono font-bold transition-all border-2 ${
                        activeCmd === key
                          ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                          : 'bg-zinc-950/40 border-transparent text-foreground/50 hover:text-white hover:bg-zinc-900/40'
                      }`}
                    >
                      {key === 'bio' ? 'biography.json' : key === 'skills' ? 'core-stack.sh' : 'leetcode.stats'}
                    </button>
                  ))}
                </div>

                {/* macOS Terminal Window */}
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-800/60 bg-zinc-950/90">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800/60">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] text-foreground/45 font-mono select-none flex items-center gap-1">
                      <FiTerminal className="text-purple-400" /> bash — munish@vitbhopal
                    </span>
                    <div className="w-10" />
                  </div>
                  
                  <div className="p-4 font-mono text-left text-xs md:text-sm text-green-400 min-h-[190px] max-h-[260px] overflow-y-auto bg-zinc-950/70 select-text scrollbar-thin">
                    <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                      {terminalText}
                      {isTyping && <span className="inline-block w-1.5 h-4 bg-green-400 ml-0.5 animate-[pulse_0.8s_infinite]" />}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {preview && setCurrentPage && (
              <div className="pt-4 flex">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="btn-neon-primary group text-xs py-3 px-5 rounded-lg"
                >
                  Read Full Biography
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: High-Impact Vertical Stats Stack & Facts (Col-span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Column - stacked vertically like Siddhartha's portfolio */}
            <div className="flex flex-col gap-4">
              
              {/* Stat 1: CGPA */}
              <motion.div
                whileHover={{ y: -4, borderColor: '#a855f7', borderWidth: '2px', boxShadow: '0 8px 25px -5px rgba(168,85,247,0.2)' }}
                className="obsidian-card p-5 md:p-6 flex flex-col justify-between items-start text-left bg-[#0e1026]/90 border-2 border-zinc-800/50 rounded-2xl relative overflow-hidden min-h-[7rem]"
              >
                <div className="absolute top-4 right-4 text-purple-400 opacity-20 text-3xl">
                  <FiAward />
                </div>
                <span className="text-[10px] md:text-xs font-extrabold text-foreground/45 uppercase tracking-wider block mb-1">
                  Grade / CGPA
                </span>
                <span className="text-2xl md:text-3xl font-black text-white block mb-1">
                  9.13 / 10.0
                </span>
                <span className="text-xs text-purple-400 font-semibold truncate w-full">
                  VIT Bhopal (CSE)
                </span>
              </motion.div>

              {/* Stat 2: LeetCode (Dynamic updates) */}
              <motion.div
                whileHover={{ y: -4, borderColor: '#ec4899', borderWidth: '2px', boxShadow: '0 8px 25px -5px rgba(236,72,153,0.2)' }}
                className="obsidian-card p-5 md:p-6 flex flex-col justify-between items-start text-left bg-[#0e1026]/90 border-2 border-zinc-800/50 rounded-2xl relative overflow-hidden min-h-[7rem]"
              >
                <div className="absolute top-4 right-4 text-pink-400 opacity-20 text-3xl animate-pulse">
                  <SiLeetcode />
                </div>
                <span className="text-[10px] md:text-xs font-extrabold text-foreground/45 uppercase tracking-wider block mb-1">
                  DSA Solved
                </span>
                <span className="text-2xl md:text-3xl font-black text-white block mb-1">
                  {leetcodeSolved} Problems
                </span>
                <span className="text-xs text-pink-400 font-semibold truncate w-full">
                  LeetCode (Updated Dynamically)
                </span>
              </motion.div>

              {/* Stat 3: Portfolio Projects */}
              <motion.div
                whileHover={{ y: -4, borderColor: '#06b6d4', borderWidth: '2px', boxShadow: '0 8px 25px -5px rgba(6,182,212,0.2)' }}
                className="obsidian-card p-5 md:p-6 flex flex-col justify-between items-start text-left bg-[#0e1026]/90 border-2 border-zinc-800/50 rounded-2xl relative overflow-hidden min-h-[7rem]"
              >
                <div className="absolute top-4 right-4 text-cyan-400 opacity-20 text-3xl">
                  <FiCpu />
                </div>
                <span className="text-[10px] md:text-xs font-extrabold text-foreground/45 uppercase tracking-wider block mb-1">
                  Portfolio Size
                </span>
                <span className="text-2xl md:text-3xl font-black text-white block mb-1">
                  10+ Projects
                </span>
                <span className="text-xs text-cyan-400 font-semibold truncate w-full">
                  Full Stack & AI
                </span>
              </motion.div>

              {/* Stat 4: Core Stack (Removed fixed h-28 to be 100% visible) */}
              <motion.div
                whileHover={{ y: -4, borderColor: '#3b82f6', borderWidth: '2px', boxShadow: '0 8px 25px -5px rgba(59,130,246,0.2)' }}
                className="obsidian-card p-5 md:p-6 flex flex-col justify-between items-start text-left bg-[#0e1026]/90 border-2 border-zinc-800/50 rounded-2xl relative overflow-hidden min-h-[7.5rem]"
              >
                <div className="absolute top-4 right-4 text-blue-400 opacity-20 text-3xl">
                  🐍
                </div>
                <span className="text-[10px] md:text-xs font-extrabold text-foreground/45 uppercase tracking-wider block mb-1">
                  Core Stack
                </span>
                <span className="text-lg md:text-xl font-black text-white block mb-1.5 leading-snug w-full">
                  Python · Django · FastAPI
                </span>
                <span className="text-xs text-blue-400 font-semibold truncate w-full">
                  APIs & Backends
                </span>
              </motion.div>
            </div>

            {/* Quick Facts Container */}
            <div className="obsidian-card space-y-4 p-6 text-left">
              <h3 className="text-base font-bold text-white border-b border-zinc-800/40 pb-3">
                Quick Facts
              </h3>
              
              <div className="space-y-3">
                <motion.div
                  whileHover={{ y: -2, borderColor: 'rgba(168, 85, 247, 0.9)', borderWidth: '2px', boxShadow: '0 4px 15px -5px rgba(168,85,247,0.2)' }}
                  className="group relative p-3 bg-[#0e1026]/90 border-2 border-zinc-800/50 rounded-xl flex items-center justify-between text-xs md:text-sm text-foreground/85 shadow-md overflow-hidden cursor-default"
                >
                  <span className="text-foreground/45 flex items-center gap-1.5 font-medium relative z-10"><FiMapPin className="text-purple-400" /> Origin</span>
                  <span className="font-semibold relative z-10">{personalInfo.bornIn}</span>
                </motion.div>
              </div>
            </div>

            {/* Social Network Connections */}
            {!preview && (
              <div className="obsidian-card space-y-4 p-6 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-zinc-800/40 pb-3">
                  Find Me Online
                </h4>
                <div className="flex flex-col gap-2.5 text-xs md:text-sm">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-foreground/75 hover:text-white transition-colors py-1 hover:translate-x-1 duration-200"
                  >
                    <FiGithub className="text-purple-400 text-base" />
                    github.com/MunishUpadhyay
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-foreground/75 hover:text-white transition-colors py-1 hover:translate-x-1 duration-200"
                  >
                    <FiLinkedin className="text-purple-400 text-base" />
                    linkedin.com/in/munish-upadhyay-747171286
                  </a>
                  <a
                    href={personalInfo.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-foreground/75 hover:text-white transition-colors py-1 hover:translate-x-1 duration-200"
                  >
                    <SiLeetcode className="text-purple-400 text-base" />
                    leetcode.com/u/Munish_01
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-foreground/75 hover:text-white transition-colors py-1 hover:translate-x-1 duration-200 truncate"
                  >
                    <FiMail className="text-purple-400 text-base shrink-0" />
                    <span>{personalInfo.email}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
