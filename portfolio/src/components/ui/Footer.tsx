import { personalInfo } from '../../data/portfolio';
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import type { PageType } from '../../App';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export const Footer = ({ setCurrentPage }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const quickLinks: { name: string; id: PageType }[] = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative mt-10 w-full bg-zinc-950/60 backdrop-blur-xl border-t-2 border-purple-500/20 overflow-hidden z-10">
      {/* Background radial glow spots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top thin gradient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left mb-10 border-b-2 border-zinc-900/60 pb-10">
          
          {/* Column 1: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-foreground/80 font-normal">
              <li className="flex items-center gap-2.5 hover:text-white transition-colors min-w-0">
                <FiMail className="text-purple-400 shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline text-[12px] sm:text-xs md:text-[11px] lg:text-sm break-all">
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMapPin className="text-purple-400 shrink-0" />
                <span>{personalInfo.bornIn}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Socials */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Social Links
            </h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-normal">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <FiLinkedin className="text-purple-400 shrink-0" />
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <FiGithub className="text-purple-400 shrink-0" />
                GitHub
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <SiLeetcode className="text-purple-400 shrink-0" />
                LeetCode
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold tracking-wider text-purple-400 uppercase">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-foreground/80 font-normal">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className="text-left hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <a
                href={personalInfo.resume}
                download
                target="_blank"
                rel="noreferrer"
                className="text-left hover:text-purple-400 transition-colors cursor-pointer"
              >
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
