import { personalInfo } from '../../data/portfolio';
import { 
  FiMail, 
  FiMapPin, 
  FiGithub, 
  FiLinkedin, 
  FiHome, 
  FiUser, 
  FiCpu, 
  FiBriefcase, 
  FiFolder, 
  FiAward, 
  FiMessageSquare, 
  FiDownload 
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { FaHackerrank } from 'react-icons/fa';
import type { PageType } from '../../App';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export const Footer = ({ setCurrentPage }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-6 md:mt-8 w-full bg-zinc-950/60 backdrop-blur-xl border-t-2 border-purple-500/20 overflow-hidden z-10">
      {/* Background radial glow spots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top thin gradient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 text-left mb-6 border-b border-zinc-900/50 pb-6">
          
          {/* Column 1: Contact Info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-normal">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 min-w-0"
              >
                <FiMail className="text-purple-400 shrink-0" />
                <span className="hover:underline text-xs lg:text-sm whitespace-nowrap">
                  {personalInfo.email}
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <FiMapPin className="text-purple-400 shrink-0" />
                <span>{personalInfo.bornIn}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Social Links
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-normal">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300"
              >
                <FiLinkedin className="text-purple-400 shrink-0" />
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300"
              >
                <FiGithub className="text-purple-400 shrink-0" />
                GitHub
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300"
              >
                <SiLeetcode className="text-purple-400 shrink-0" />
                LeetCode
              </a>
              {personalInfo.hackerrank && (
                <a
                  href={personalInfo.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300"
                >
                  <FaHackerrank className="text-purple-400 shrink-0" />
                  HackerRank
                </a>
              )}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-normal">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiHome className="text-purple-400 shrink-0" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiUser className="text-purple-400 shrink-0" />
                About
              </button>
              <button
                onClick={() => setCurrentPage('skills')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiCpu className="text-purple-400 shrink-0" />
                Skills
              </button>
              <button
                onClick={() => setCurrentPage('experience')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiBriefcase className="text-purple-400 shrink-0" />
                Experience
              </button>
            </div>
          </div>

          {/* Column 4: Explore */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-normal">
              <button
                onClick={() => setCurrentPage('projects')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiFolder className="text-purple-400 shrink-0" />
                Projects
              </button>
              <button
                onClick={() => setCurrentPage('certifications')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiAward className="text-purple-400 shrink-0" />
                Certifications
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left w-full"
              >
                <FiMessageSquare className="text-purple-400 shrink-0" />
                Contact
              </button>
              <a
                href={personalInfo.resume}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 text-left cursor-pointer w-full"
              >
                <FiDownload className="text-purple-400 shrink-0" />
                Download CV
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="flex justify-center items-center text-xs font-semibold text-foreground/45">
          <span>© {currentYear} {personalInfo.name}. All rights reserved. ✨</span>
        </div>
      </div>
    </footer>
  );
};
