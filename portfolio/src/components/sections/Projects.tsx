import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { FiArrowRight } from 'react-icons/fi';
import type { PageType } from '../../App';

interface ProjectsProps {
  preview?: boolean;
  setCurrentPage?: (page: PageType) => void;
}

// Custom SVG System Schematic for Prahari (5-Agent network)
const PrahariSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" stroke="#a855f7" strokeWidth="0.75" strokeDasharray="3,3" className="animate-[spin_40s_linear_infinite]" />
    <line x1="50" y1="50" x2="25" y2="25" stroke="#a855f7" strokeWidth="1" />
    <line x1="50" y1="50" x2="75" y2="25" stroke="#a855f7" strokeWidth="1" />
    <line x1="50" y1="50" x2="25" y2="75" stroke="#a855f7" strokeWidth="1" />
    <line x1="50" y1="50" x2="75" y2="75" stroke="#a855f7" strokeWidth="1" />
    
    <circle cx="50" cy="50" r="7" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="2.5" fill="#a855f7" className="animate-pulse" />
    
    <circle cx="25" cy="25" r="4" fill="#a855f7" />
    <circle cx="75" cy="25" r="4" fill="#a855f7" />
    <circle cx="25" cy="75" r="4" fill="#a855f7" />
    <circle cx="75" cy="75" r="4" fill="#a855f7" />
  </svg>
);

// Custom SVG Mental Health / Wave Schematic for YuVA Wellness
const YuvaSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" stroke="#ec4899" strokeWidth="0.75" strokeDasharray="2,2" />
    <path d="M15 50 Q32.5 20 50 50 T85 50" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 50 Q32.5 80 50 50 T85 50" stroke="#ec4899" strokeWidth="0.75" strokeLinecap="round" opacity="0.3" />
    
    <circle cx="50" cy="50" r="5" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="2" fill="#ec4899" className="animate-pulse" />
    <circle cx="20" cy="50" r="3.5" fill="#ec4899" />
    <circle cx="80" cy="50" r="3.5" fill="#ec4899" />
  </svg>
);

// Custom SVG Ocular/MediaPipe Schematic for Autism & ADHD behavior analyzer
const VisionSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="2,2" />
    <circle cx="50" cy="50" r="24" stroke="#06b6d4" strokeWidth="1" />
    <circle cx="50" cy="50" r="7" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="2.5" fill="#06b6d4" className="animate-pulse" />
    
    <line x1="50" y1="50" x2="78" y2="22" stroke="#06b6d4" strokeWidth="1" />
    <line x1="50" y1="50" x2="22" y2="78" stroke="#06b6d4" strokeWidth="1" />
    <line x1="50" y1="50" x2="22" y2="22" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="1,1" />
    <line x1="50" y1="50" x2="78" y2="78" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="1,1" />
    
    <circle cx="78" cy="22" r="3" fill="#06b6d4" />
    <circle cx="22" cy="78" r="3" fill="#06b6d4" />
  </svg>
);

// Custom SVG Text Scanner Schematic for Legal Document Classifier
const LegalSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="16" width="44" height="68" rx="4" stroke="#f97316" strokeWidth="1.5" fill="#0f172a" />
    <line x1="38" y1="30" x2="62" y2="30" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="38" y1="40" x2="62" y2="40" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="38" y1="50" x2="52" y2="50" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    
    {/* Scanning line */}
    <line x1="22" y1="45" x2="78" y2="45" stroke="#fb923c" strokeWidth="1.2" className="animate-[bounce_3s_infinite]" />
    
    <circle cx="50" cy="66" r="6" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
    <circle cx="50" cy="66" r="2" fill="#f97316" className="animate-pulse" />
  </svg>
);

// Custom SVG Clinical cross/ECG Schematic for Multiple Disease Prediction
const DiseaseSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="42" stroke="#f43f5e" strokeWidth="0.75" strokeDasharray="3,3" />
    <path d="M44 26 H56 V44 H74 V56 H56 V74 H44 V56 H26 V44 H44 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
    
    {/* ECG Pulse line */}
    <path d="M32 50 H41 L44 42 L48 58 L52 46 L55 50 H68" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    <circle cx="50" cy="16" r="2.5" fill="#f43f5e" />
    <circle cx="84" cy="50" r="2.5" fill="#f43f5e" />
    <circle cx="16" cy="50" r="2.5" fill="#f43f5e" />
  </svg>
);

// Custom SVG System Schematic for Crop recommendation
const CropSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="0.75" strokeDasharray="3,3" className="animate-[spin_40s_linear_infinite]" />
    <circle cx="50" cy="50" r="16" stroke="#10b981" strokeWidth="1" />
    
    <path d="M18 25 H40 L50 40" stroke="#10b981" strokeWidth="0.75" strokeDasharray="1,2" />
    <path d="M18 50 H34" stroke="#10b981" strokeWidth="0.75" />
    <path d="M18 75 H40 L50 60" stroke="#10b981" strokeWidth="0.75" strokeDasharray="1,2" />
    
    <circle cx="18" cy="25" r="2.5" fill="#10b981" />
    <circle cx="18" cy="50" r="2.5" fill="#10b981" />
    <circle cx="18" cy="75" r="2.5" fill="#10b981" />
    
    <path d="M50 44 C48 46 48 54 50 56 C52 54 52 46 50 44 Z" fill="#10b981" className="animate-pulse" />
    <circle cx="80" cy="50" r="3" fill="#10b981" />
    <line x1="66" y1="50" x2="77" y2="50" stroke="#10b981" strokeWidth="1" />
  </svg>
);

// Custom SVG MRI grid schematic for Brain Tumor Segmentation
const MriSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="50" x2="90" y2="50" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
    <line x1="50" y1="10" x2="50" y2="90" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
    
    <circle cx="50" cy="50" r="36" stroke="#6366f1" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="28" stroke="#6366f1" strokeWidth="0.75" opacity="0.4" />
    
    <path d="M38 38 Q46 32 54 40 Q60 50 50 56 Q38 52 38 38 Z" fill="#6366f1" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1" className="animate-pulse" />
    <circle cx="46" cy="42" r="1.5" fill="#a855f7" />
  </svg>
);

// Custom SVG Transaction Ledger split schematic for Expense Splitter
const SplitterSchematic = () => (
  <svg className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="50" r="6" stroke="#3b82f6" strokeWidth="1.5" />
    <circle cx="28" cy="50" r="2.5" fill="#3b82f6" />
    
    <path d="M34 50 L70 28" stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2,2" />
    <path d="M34 50 L70 50" stroke="#3b82f6" strokeWidth="1" />
    <path d="M34 50 L70 72" stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2,2" />
    
    <rect x="44" y="42" width="16" height="16" rx="2" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
    
    <circle cx="76" cy="28" r="3.5" stroke="#3b82f6" strokeWidth="1" />
    <circle cx="76" cy="50" r="3.5" stroke="#3b82f6" strokeWidth="1" />
    <circle cx="76" cy="72" r="3.5" stroke="#3b82f6" strokeWidth="1" />
  </svg>
);

export const Projects = ({ preview = false, setCurrentPage }: ProjectsProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'fullstack' | 'core'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tabs: { label: string; id: typeof activeTab }[] = [
    { label: 'All Projects', id: 'all' },
    { label: 'AI, ML & NLP', id: 'ai' },
    { label: 'Full Stack & Web', id: 'fullstack' },
    { label: 'Core Software', id: 'core' },
  ];

  const getFilteredProjects = () => {
    let list = projects;
    if (activeTab === 'ai') {
      list = projects.filter(p => 
        p.category?.includes('AI') || 
        p.category?.includes('Learning') || 
        p.category?.includes('Vision') || 
        p.category?.includes('NLP') ||
        p.tech.includes('PyTorch') ||
        p.tech.includes('Scikit-learn')
      );
    } else if (activeTab === 'fullstack') {
      list = projects.filter(p => 
        p.category === 'Full Stack' || 
        p.tech.includes('Django') || 
        p.tech.includes('FastAPI') || 
        p.tech.includes('React.js') ||
        p.tech.includes('React')
      );
    } else if (activeTab === 'core') {
      list = projects.filter(p => 
        p.category === 'Full Stack' && p.tech.includes('Java') || 
        p.title.includes('Expense') || 
        (!p.category?.includes('AI') && !p.category?.includes('Learning') && !p.category?.includes('Vision') && !p.category?.includes('NLP') && !p.tech.includes('Django') && !p.tech.includes('FastAPI') && !p.tech.includes('React'))
      );
    }
    
    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.tech.some(t => t.toLowerCase().includes(q))
      );
    }

    // 3. Filter by selected tags
    if (selectedTags.length > 0) {
      list = list.filter(p => 
        selectedTags.every(tag => p.tech.includes(tag))
      );
    }
    
    return preview ? list.slice(0, 3) : list;
  };



  // Slice displayed projects
  const displayedProjects = getFilteredProjects();

  const getSchematic = (id?: string) => {
    switch (id) {
      case 'prahari': return <PrahariSchematic />;
      case 'yuva': return <YuvaSchematic />;
      case 'vision': return <VisionSchematic />;
      case 'legal': return <LegalSchematic />;
      case 'disease': return <DiseaseSchematic />;
      case 'crop': return <CropSchematic />;
      case 'tumor': return <MriSchematic />;
      case 'splitter': return <SplitterSchematic />;
      default: return <SplitterSchematic />;
    }
  };

  const getBadgeColor = (id?: string) => {
    switch (id) {
      case 'prahari': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'yuva': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'vision': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'legal': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'disease': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'crop': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'tumor': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'splitter': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getBorderColor = (id?: string) => {
    switch (id) {
      case 'prahari': return '#a855f7';
      case 'yuva': return '#ec4899';
      case 'vision': return '#06b6d4';
      case 'legal': return '#f59e0b';
      case 'disease': return '#f43f5e';
      case 'crop': return '#10b981';
      case 'tumor': return '#6366f1';
      case 'splitter': return '#3b82f6';
      default: return '#3b82f6';
    }
  };

  const getShadowColor = (id?: string) => {
    switch (id) {
      case 'prahari': return '0 12px 30px -5px rgba(168, 85, 247, 0.25)';
      case 'yuva': return '0 12px 30px -5px rgba(236, 72, 153, 0.25)';
      case 'vision': return '0 12px 30px -5px rgba(6, 182, 212, 0.25)';
      case 'legal': return '0 12px 30px -5px rgba(245, 158, 11, 0.25)';
      case 'disease': return '0 12px 30px -5px rgba(244, 63, 94, 0.25)';
      case 'crop': return '0 12px 30px -5px rgba(16, 185, 129, 0.25)';
      case 'tumor': return '0 12px 30px -5px rgba(99, 102, 241, 0.25)';
      case 'splitter': return '0 12px 30px -5px rgba(59, 130, 246, 0.25)';
      default: return '0 12px 30px -5px rgba(59, 130, 246, 0.25)';
    }
  };

  return (
    <section id="projects" className={`pt-16 md:pt-20 ${preview ? 'pb-16 md:pb-20' : 'pb-20 md:pb-24'} w-full px-6 bg-[#03030c]/20 relative z-10 overflow-hidden`}>
      {/* Top Divider with Blue Glow (only on Home page stacked context) */}
      {preview && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      )}

      {/* Background radial glow */}
      <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            {preview ? '01. Portfolio' : '03. Portfolio'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {preview ? 'Featured Projects' : 'All Projects'}
          </h2>
        </div>
        {/* Project Category Filter Tabs & Search Bar (only on full projects view) */}
        {!preview && (
          <div className="flex flex-col items-center gap-6 mb-12 max-w-2xl mx-auto w-full">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950/80 border-2 border-zinc-900/80 rounded-2xl w-full shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedTags([]); // Reset tags on tab switch
                  }}
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

            {/* High-tech Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search projects by name, description, or tech stack (e.g. Django, PyTorch)..."
                className="w-full bg-[#0e1026]/90 border-2 border-zinc-800/60 rounded-xl px-5 py-3.5 text-sm text-foreground placeholder-foreground/45 focus:border-purple-500/60 focus:outline-none transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-foreground/45 hover:text-white transition-colors"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Active Filter Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 w-full pt-2 text-left">
                <span className="text-xs font-bold text-foreground/45 uppercase tracking-wider">Active Tech Filters:</span>
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border-2 border-purple-500/30 text-purple-400 hover:border-red-500/50 hover:text-red-400 transition-all flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <span className="text-[10px] font-bold">×</span>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 underline underline-offset-2 ml-2 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        )}

        {/* Project Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -6,
                  borderColor: getBorderColor(project.schematicId),
                  boxShadow: getShadowColor(project.schematicId),
                  borderWidth: '2px'
                }}
              style={{
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
              className="group relative obsidian-card bg-[#0e1026]/95 border-2 border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden flex flex-col justify-between h-full p-6"
            >
              {/* Subtle back corner glow on hover */}
              <div 
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: getBorderColor(project.schematicId) }}
              />

              {/* Cyber dot-grid pattern overlay */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(var(--pattern-color)_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ '--pattern-color': `${getBorderColor(project.schematicId)}15` } as React.CSSProperties}
              />

              {/* Blurred neon bottom underglow (light halo spill) */}
              <div 
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: getBorderColor(project.schematicId) }}
              />

              <div>
                {/* Card Header: Floating Schematic & Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  {/* Compact logo schematic badge */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-zinc-950/40 border border-zinc-800/40 shadow-inner group-hover:border-zinc-700/30 transition-all duration-300 relative overflow-hidden p-2.5">
                    {/* Tiny radial glow behind the SVG schematic */}
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${getBorderColor(project.schematicId)} 0%, transparent 70%)`
                      }}
                    />
                    {getSchematic(project.schematicId)}
                  </div>

                  {/* Category Pill */}
                  <span className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-semibold uppercase tracking-wider border ${getBadgeColor(project.schematicId)}`}>
                    {project.category || 'Project'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-foreground/80 leading-relaxed font-normal mb-6 line-clamp-6 group-hover:text-foreground transition-colors">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech tags: pill style */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(project.technologies || project.tech || []).map((t) => (
                    <button
                      key={t}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!preview) {
                          if (selectedTags.includes(t)) {
                            setSelectedTags((prev) => prev.filter((tag) => tag !== t));
                          } else {
                            setSelectedTags((prev) => [...prev, t]);
                          }
                        }
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border-2 transition-all duration-200 ${
                        selectedTags.includes(t)
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400 font-semibold'
                          : 'bg-zinc-900/40 border-zinc-850/50 text-foreground/75 group-hover:border-zinc-750 group-hover:text-foreground hover:bg-purple-500/10 cursor-pointer'
                      }`}
                      disabled={preview}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-6 pt-4 border-t-2 border-zinc-800/50 text-sm font-semibold">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 group/link text-foreground/75 hover:text-white transition-all duration-200"
                    >
                      <span>Source Code</span>
                      <FiArrowRight 
                        className="group-hover/link:translate-x-1 transition-transform duration-200"
                        style={{ color: getBorderColor(project.schematicId) }}
                      />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 group/link text-foreground/75 hover:text-white transition-all duration-200"
                    >
                      <span>Live Demo</span>
                      <FiArrowRight 
                        className="group-hover/link:translate-x-1 transition-transform duration-200"
                        style={{ color: getBorderColor(project.schematicId) }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {preview && setCurrentPage && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setCurrentPage('projects')}
              className="btn-neon-primary group text-xs py-3.5 px-6 rounded-xl"
            >
              View All Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
