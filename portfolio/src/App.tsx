import { Suspense, useState, useEffect, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const BackgroundCanvas = lazy(() => import('./components/3d/BackgroundCanvas'));

import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';

export type PageType = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'certifications' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const saved = localStorage.getItem('portfolio_page');
    const validPages: PageType[] = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
    return validPages.includes(saved as PageType) ? (saved as PageType) : 'home';
  });

  // Persist current page on tab switches
  useEffect(() => {
    localStorage.setItem('portfolio_page', currentPage);
  }, [currentPage]);

  // Butter-smooth scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="w-full flex flex-col items-center">
            <Hero setCurrentPage={setCurrentPage} />
            <Projects preview={true} setCurrentPage={setCurrentPage} />
            <Skills preview={true} setCurrentPage={setCurrentPage} />
          </div>
        );
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'experience':
        return <Experience />;
      case 'certifications':
        return <Certifications />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <div className="w-full flex flex-col items-center">
            <Hero setCurrentPage={setCurrentPage} />
            <Projects preview={true} setCurrentPage={setCurrentPage} />
            <Skills preview={true} setCurrentPage={setCurrentPage} />
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03030c] text-foreground font-outfit overflow-x-hidden selection:bg-purple-500/30 selection:text-white flex flex-col justify-between">
      <Toaster position="top-right" />

      {/* 1. FIXED BACKGROUND 3D CANVAS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <BackgroundCanvas />
        </Suspense>
      </div>

      {/* 2. FOREGROUND LAYOUT */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="relative z-10 w-full flex-grow flex items-center justify-center pt-28 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="w-full flex flex-col items-center"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. GLOBAL FOOTER */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;