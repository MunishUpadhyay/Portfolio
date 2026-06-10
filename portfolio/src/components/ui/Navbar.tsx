import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';
import type { PageType } from '../../App';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { name: string; id: PageType }[] = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 md:py-4 bg-zinc-950/80 backdrop-blur-xl border-b-2 border-zinc-900/60 shadow-[0_8px_30px_rgba(3,3,12,0.6)]'
            : 'py-4 md:py-8 bg-transparent border-transparent'
        }`}
      >
        {/* Animated Bottom Border Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-70" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Branding */}
          <button
            onClick={() => {
              if (currentPage === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setCurrentPage('home');
              }
            }}
            className="relative group text-xl md:text-2xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 text-neon-glow select-none animate-gradient"
          >
            {personalInfo.name}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm md:text-[15px] font-bold transition-all duration-300 border-2 ${
                  currentPage === link.id
                    ? 'text-purple-400 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-neon-glow'
                    : 'text-foreground/80 hover:text-white hover:bg-zinc-900/40 border-transparent'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {currentPage === link.id && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border-2 border-purple-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden bg-[#03030c]/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-bold py-3.5 border-b border-zinc-900/40 text-left transition-all duration-300 ${
                    currentPage === link.id
                      ? 'text-purple-400 border-l-4 border-purple-500 pl-3 bg-purple-500/5 rounded-r-lg text-neon-glow'
                      : 'text-foreground/75 hover:text-white pl-1'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
            <div className="pt-6 border-t border-zinc-900/40 text-center text-xs font-semibold text-foreground/40">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
