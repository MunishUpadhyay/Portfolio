import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { FiArrowRight, FiChevronDown, FiCheck, FiLayers, FiCpu, FiActivity, FiDatabase, FiTerminal } from 'react-icons/fi';
import type { PageType } from '../../App';

const Skills3DCanvas = lazy(() => import('../3d/Skills3DCanvas'));

interface SkillsProps {
  preview?: boolean;
  setCurrentPage?: (page: PageType) => void;
}

// Fixed coordinate layout for skills tree circuit board (width 1100px, height 1050px)
const coordinateMap: Record<string, { x: number; y: number; layer: 1 | 2 | 3 }> = {
  // Layer 1: Foundations (X: 120) - 4 nodes
  'Python': { x: 120, y: 200, layer: 1 },
  'C++': { x: 120, y: 420, layer: 1 },
  'Java': { x: 120, y: 640, layer: 1 },
  'SQL': { x: 120, y: 860, layer: 1 },

  // Layer 2: Frameworks & Databases (X: 530) - 14 nodes
  'NumPy': { x: 530, y: 60, layer: 2 },
  'Pandas': { x: 530, y: 130, layer: 2 },
  'Scikit-learn': { x: 530, y: 200, layer: 2 },
  'PyTorch': { x: 530, y: 270, layer: 2 },
  'TensorFlow': { x: 530, y: 340, layer: 2 },
  'OpenCV': { x: 530, y: 410, layer: 2 },
  'Large Language Models / LLMs': { x: 530, y: 480, layer: 2 },
  'Django': { x: 530, y: 550, layer: 2 },
  'FastAPI': { x: 530, y: 620, layer: 2 },
  'React': { x: 530, y: 690, layer: 2 },
  'JDBC': { x: 530, y: 760, layer: 2 },
  'MySQL': { x: 530, y: 830, layer: 2 },
  'PostgreSQL': { x: 530, y: 900, layer: 2 },
  'ChromaDB': { x: 530, y: 970, layer: 2 },

  // Layer 3: Cloud & Tools (X: 940) - 14 nodes
  'Generative AI': { x: 940, y: 60, layer: 3 },
  'RAG - Retrieval Augmented Generation': { x: 940, y: 130, layer: 3 },
  'Jupyter': { x: 940, y: 200, layer: 3 },
  'Google Colab': { x: 940, y: 270, layer: 3 },
  'Django REST Framework': { x: 940, y: 340, layer: 3 },
  'Redis': { x: 940, y: 410, layer: 3 },
  'Celery': { x: 940, y: 480, layer: 3 },
  'Docker': { x: 940, y: 560, layer: 3 },
  'AWS': { x: 940, y: 640, layer: 3 },
  'Render': { x: 940, y: 720, layer: 3 },
  'Git': { x: 940, y: 800, layer: 3 },
  'GitHub': { x: 940, y: 870, layer: 3 },
  'Vercel': { x: 940, y: 940, layer: 3 },
  'CI/CD': { x: 940, y: 1010, layer: 3 },
};

const links = [
  // L1 -> L2 Connections
  { from: 'Python', to: 'NumPy' },
  { from: 'Python', to: 'Pandas' },
  { from: 'Python', to: 'Scikit-learn' },
  { from: 'Python', to: 'PyTorch' },
  { from: 'Python', to: 'TensorFlow' },
  { from: 'Python', to: 'OpenCV' },
  { from: 'Python', to: 'Large Language Models / LLMs' },
  { from: 'Python', to: 'Django' },
  { from: 'Python', to: 'FastAPI' },
  { from: 'C++', to: 'OpenCV' },
  { from: 'C++', to: 'PyTorch' },
  { from: 'C++', to: 'TensorFlow' },
  { from: 'C++', to: 'Git' },
  { from: 'C++', to: 'GitHub' },
  { from: 'Java', to: 'JDBC' },
  { from: 'SQL', to: 'MySQL' },
  { from: 'SQL', to: 'PostgreSQL' },
  { from: 'SQL', to: 'ChromaDB' },

  // L2 -> L3 / L3 -> L3 Connections
  { from: 'PyTorch', to: 'Large Language Models / LLMs' },
  { from: 'PyTorch', to: 'Jupyter' },
  { from: 'TensorFlow', to: 'Google Colab' },
  { from: 'NumPy', to: 'Jupyter' },
  { from: 'Large Language Models / LLMs', to: 'Generative AI' },
  { from: 'Large Language Models / LLMs', to: 'RAG - Retrieval Augmented Generation' },
  { from: 'ChromaDB', to: 'RAG - Retrieval Augmented Generation' },
  { from: 'Django', to: 'Django REST Framework' },
  { from: 'Django', to: 'Redis' },
  { from: 'Django', to: 'Celery' },
  { from: 'Django', to: 'Docker' },
  { from: 'FastAPI', to: 'Render' },
  { from: 'React', to: 'Render' },
  { from: 'React', to: 'Vercel' },
  { from: 'React', to: 'AWS' },
  { from: 'Django REST Framework', to: 'AWS' },
  { from: 'Redis', to: 'Celery' },
  { from: 'Celery', to: 'Docker' },
  { from: 'PostgreSQL', to: 'AWS' },
  { from: 'MySQL', to: 'AWS' },
  { from: 'Git', to: 'GitHub' },
  { from: 'GitHub', to: 'Vercel' },
  { from: 'GitHub', to: 'CI/CD' },
  { from: 'Docker', to: 'CI/CD' },
];


const tabDetails = {
  all: {
    label: 'All Connections',
    color: '#a855f7',
    activeClass: 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
    hoverClass: 'hover:bg-purple-500/5 hover:border-purple-500/20 hover:text-purple-300',
    icon: FiLayers
  },
  languages: {
    label: 'Languages & Core',
    color: '#c084fc',
    activeClass: 'bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.15)]',
    hoverClass: 'hover:bg-fuchsia-500/5 hover:border-fuchsia-500/20 hover:text-fuchsia-300',
    icon: FiCpu
  },
  ai: {
    label: 'AI & ML',
    color: '#f472b6',
    activeClass: 'bg-pink-500/10 border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.15)]',
    hoverClass: 'hover:bg-pink-500/5 hover:border-pink-500/20 hover:text-pink-300',
    icon: FiActivity
  },
  web: {
    label: 'Web & DB',
    color: '#34d399',
    activeClass: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]',
    hoverClass: 'hover:bg-emerald-500/5 hover:border-emerald-500/20 hover:text-emerald-300',
    icon: FiDatabase
  },
  devops: {
    label: 'DevOps & Tools',
    color: '#fbbf24',
    activeClass: 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
    hoverClass: 'hover:bg-amber-500/5 hover:border-amber-500/20 hover:text-amber-300',
    icon: FiTerminal
  }
};

export const Skills = ({ preview = false, setCurrentPage }: SkillsProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'ai' | 'web' | 'devops'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs: { label: string; id: typeof activeTab }[] = [
    { label: 'All Connections', id: 'all' },
    { label: 'Languages & Core', id: 'languages' },
    { label: 'AI & ML', id: 'ai' },
    { label: 'Web & DB', id: 'web' },
    { label: 'DevOps & Tools', id: 'devops' },
  ];

  // Map coordinate schema on top of base skills array
  const mappedSkills = skills.map((skill) => {
    const coords = coordinateMap[skill.name] || { x: 550, y: 500, layer: 2 };
    return {
      ...skill,
      ...coords,
    };
  });

  const getHighlightedElements = (hoveredId: string) => {
    const highlightedNodes = new Set<string>([hoveredId]);
    const highlightedLinks = new Set<string>();

    // Adjacency mapping for downstream traversal
    const adjList: Record<string, string[]> = {};
    // Reverse adjacency mapping for upstream traversal
    const revAdjList: Record<string, string[]> = {};

    links.forEach((link) => {
      if (!adjList[link.from]) adjList[link.from] = [];
      adjList[link.from].push(link.to);

      if (!revAdjList[link.to]) revAdjList[link.to] = [];
      revAdjList[link.to].push(link.from);
    });

    // Traverse downstream
    const visitDown = (curr: string) => {
      const neighbors = adjList[curr] || [];
      neighbors.forEach((next) => {
        if (!highlightedNodes.has(next)) {
          highlightedNodes.add(next);
          highlightedLinks.add(`${curr}->${next}`);
          visitDown(next);
        }
      });
    };

    // Traverse upstream
    const visitUp = (curr: string) => {
      const parents = revAdjList[curr] || [];
      parents.forEach((prev) => {
        if (!highlightedNodes.has(prev)) {
          highlightedNodes.add(prev);
          highlightedLinks.add(`${prev}->${curr}`);
          visitUp(prev);
        }
      });
    };

    visitDown(hoveredId);
    visitUp(hoveredId);

    return { nodes: highlightedNodes, links: highlightedLinks };
  };

  const activeHighlight = hoveredNodeId ? getHighlightedElements(hoveredNodeId) : null;

  const isNodeActive = (name: string) => {
    if (hoveredNodeId) {
      return activeHighlight?.nodes.has(name) ?? false;
    }
    if (activeTab === 'all') return true;
    const skill = skills.find((s) => s.name === name);
    if (!skill) return false;
    if (activeTab === 'languages') return skill.domain === 'programming' || skill.domain === 'dsa';
    if (activeTab === 'ai') return skill.domain === 'datascience' || skill.domain === 'computervision';
    if (activeTab === 'web') return skill.domain === 'web' || skill.domain === 'database' || skill.domain === 'backend';
    if (activeTab === 'devops') return skill.domain === 'devops' || skill.domain === 'tools';
    return true;
  };

  const isLinkActive = (from: string, to: string) => {
    if (hoveredNodeId) {
      return activeHighlight?.links.has(`${from}->${to}`) ?? false;
    }
    return isNodeActive(from) && isNodeActive(to);
  };

  const nodeWidth = 190;

  // Calculate visual connection curves
  const curves = links
    .map((link) => {
      const fromNode = mappedSkills.find((s) => s.name === link.from);
      const toNode = mappedSkills.find((s) => s.name === link.to);
      if (!fromNode || !toNode) return null;

      const startX = fromNode.x + nodeWidth / 2;
      const startY = fromNode.y;
      const endX = toNode.x - nodeWidth / 2;
      const endY = toNode.y;

      const controlOffset = Math.abs(endX - startX) * 0.5;
      const pathD = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;

      return {
        id: `${link.from}->${link.to}`,
        from: link.from,
        to: link.to,
        d: pathD,
        color: fromNode.color || '#a855f7',
      };
    })
    .filter(Boolean);

  return (
    <section id="skills" className="pt-12 md:pt-16 pb-12 md:pb-16 w-full px-6 bg-[#03030c]/10 relative z-10 overflow-hidden">
      {/* Top Divider with Indigo Glow (only on Home page stacked context) */}
      {preview && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      )}

      {/* Background radial glow */}
      <div className="absolute top-12 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
            02. Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {preview ? 'Skills Constellation' : 'Skills & Technologies'}
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500/60 to-indigo-500/60 mt-4"></div>
        </div>

        {preview ? (
          /* PREVIEW MODE: Centered 3D Constellation Sphere */
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center bg-[#0e1026]/40 border-2 border-zinc-800/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-grab active:cursor-grabbing">
              <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent pointer-events-none" />

              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <span className="text-xs font-mono text-purple-400">Loading Constellation...</span>
                  </div>
                }
              >
                <Skills3DCanvas />
              </Suspense>
            </div>

            {setCurrentPage && (
              <button
                onClick={() => setCurrentPage('skills')}
                className="btn-neon-primary group text-xs py-3.5 px-6 rounded-xl"
              >
                Explore Skill Blueprint
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        ) : (
          /* FULL MODE: Interactive Technology Tree Graph */
          <div className="w-full space-y-8">
            <style>{`
              @keyframes circuit-dash {
                to {
                  stroke-dashoffset: -40;
                }
              }
              .animate-circuit-dash {
                stroke-dasharray: 10 30;
                animation: circuit-dash 1.5s linear infinite;
              }
            `}</style>

            {/* Filter Tabs / Dropdown */}
            {/* Desktop Filter Tabs (Single Line, Distinct Accent Colors per Domain) */}
            <div className="hidden md:flex flex-row items-center justify-center gap-2.5 p-1.5 bg-zinc-950/70 border-2 border-zinc-900/80 rounded-2xl max-w-4xl mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
              {tabs.map((tab) => {
                const details = tabDetails[tab.id];
                const active = activeTab === tab.id;
                const IconComponent = details.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      borderColor: active ? `${details.color}50` : 'transparent',
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs lg:text-sm font-bold rounded-xl transition-all duration-300 border-2 ${
                      active ? details.activeClass : `text-foreground/60 border-transparent ${details.hoverClass}`
                    }`}
                  >
                    <IconComponent className="text-sm shrink-0 transition-colors duration-300" style={{ color: active ? details.color : undefined }} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Custom Glassmorphic Dropdown Selector */}
            <div ref={dropdownRef} className="relative md:hidden w-full max-w-xs mx-auto z-50">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  borderColor: `${tabDetails[activeTab].color}40`,
                  boxShadow: `0 0 20px ${tabDetails[activeTab].color}15`,
                }}
                className="w-full flex items-center justify-between px-4.5 py-3.5 bg-zinc-950/85 border-2 rounded-2xl text-xs md:text-sm font-bold text-white backdrop-blur-md select-none active:scale-98 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const ActiveIcon = tabDetails[activeTab].icon;
                    return <ActiveIcon style={{ color: tabDetails[activeTab].color }} className="text-base shrink-0" />;
                  })()}
                  <span>{tabDetails[activeTab].label}</span>
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <FiChevronDown className="text-foreground/60 text-base" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 6, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 right-0 top-full bg-zinc-950/95 border-2 border-zinc-900 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl overflow-hidden mt-1 p-1 flex flex-col gap-1"
                  >
                    {tabs.map((tab) => {
                      const details = tabDetails[tab.id];
                      const active = activeTab === tab.id;
                      const OptionIcon = details.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                            active
                              ? `${details.activeClass} border-2`
                              : `text-foreground/60 border-2 border-transparent ${details.hoverClass}`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <OptionIcon
                              className="text-base shrink-0"
                              style={{ color: active ? details.color : undefined }}
                            />
                            <span>{details.label}</span>
                          </div>
                          {active && (
                            <FiCheck className="text-sm shrink-0" style={{ color: details.color }} />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instruction Banner */}
            <div className="text-center text-xs text-foreground/45 font-mono">
              💡 Hover over any node to highlight its prerequisites & career applications. Swipe horizontally to view full tree.
            </div>

            {/* Scrollable Tree Container */}
            <div className="w-full overflow-x-auto pb-8 -mx-6 px-6">
              <div className="w-[1100px] h-[1050px] relative mx-auto bg-[#080816]/70 rounded-3xl border-2 border-zinc-900/80 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                {/* Blueprint grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />

                {/* SVG traces */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {curves.map((curve) => {
                    if (!curve) return null;
                    const active = isLinkActive(curve.from, curve.to);
                    const isDimmed = (hoveredNodeId !== null || activeTab !== 'all') && !active;

                    return (
                      <g key={curve.id} className="transition-opacity duration-300">
                        {/* Base trace line */}
                        <path
                          d={curve.d}
                          stroke={active ? curve.color : '#1e1b4b'}
                          strokeWidth={active ? 2.5 : 1.5}
                          strokeOpacity={isDimmed ? 0.08 : active ? 0.85 : 0.25}
                          fill="none"
                          className="transition-all duration-300"
                          style={{
                            filter: active ? `drop-shadow(0 0 5px ${curve.color}80)` : undefined,
                          }}
                        />
                        {/* Pulse animation for active wires */}
                        {active && (
                          <path
                            d={curve.d}
                            stroke="#ffffff"
                            strokeWidth={1.2}
                            fill="none"
                            className="animate-circuit-dash opacity-90"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Interactive Node Cards */}
                {mappedSkills.map((skill) => {
                  const active = isNodeActive(skill.name);
                  const isDimmed = (hoveredNodeId !== null || activeTab !== 'all') && !active;
                  const isHovered = hoveredNodeId === skill.name;

                  return (
                    <motion.div
                      key={skill.name}
                      onMouseEnter={() => setHoveredNodeId(skill.name)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      style={{
                        position: 'absolute',
                        left: skill.x - nodeWidth / 2,
                        top: skill.y - 25,
                        width: nodeWidth,
                        height: 50,
                        borderColor: isHovered
                          ? skill.color
                          : active && (hoveredNodeId !== null || activeTab !== 'all')
                          ? `${skill.color}80`
                          : 'rgba(39, 39, 42, 0.8)',
                        boxShadow: isHovered
                          ? `0 0 25px ${skill.color}50`
                          : active && (hoveredNodeId !== null || activeTab !== 'all')
                          ? `0 0 12px ${skill.color}25`
                          : 'none',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        zIndex: isHovered ? 50 : 10,
                      }}
                      className={`absolute z-10 py-1.5 px-2.5 rounded-xl bg-[#0e1026]/95 border-2 flex items-center gap-2.5 cursor-pointer transition-all duration-300 select-none group ${
                        isDimmed
                          ? 'opacity-20 grayscale-[40%] scale-95 border-zinc-800/40 brightness-[0.7]'
                          : ''
                      }`}
                    >
                      {/* Icon container */}
                      <div
                        className="w-8 h-8 rounded-lg bg-zinc-950 border flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner"
                        style={{ borderColor: skill.color ? `${skill.color}25` : 'rgba(168, 85, 247, 0.15)' }}
                      >
                        {skill.icon}
                      </div>

                      {/* Info layout */}
                      <div className="flex flex-col text-left overflow-hidden min-w-0 justify-center h-full">
                        <span className={`font-bold text-white group-hover:text-purple-300 transition-colors duration-300 ${
                          skill.name.length > 22
                            ? 'text-[9.5px] leading-[1.1] whitespace-normal'
                            : 'text-[11px] truncate'
                        }`}>
                          {skill.name}
                        </span>
                        <span
                          className="text-[8px] uppercase tracking-wider font-extrabold filter brightness-110 truncate"
                          style={{ color: skill.color || '#a855f7' }}
                        >
                          {skill.domain === 'programming'
                            ? 'Language'
                            : skill.domain === 'dsa'
                            ? 'Core DSA'
                            : skill.domain === 'datascience'
                            ? 'Data Science'
                            : skill.domain === 'computervision'
                            ? 'Computer Vision'
                            : skill.domain === 'web'
                            ? 'Web Dev'
                            : skill.domain === 'backend'
                            ? 'Backend'
                            : skill.domain === 'database'
                            ? 'Database'
                            : 'DevOps & Tools'}
                        </span>
                      </div>

                      {/* Ambient hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 100% 100%, ${skill.color || '#a855f7'} 0%, transparent 60%)`,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
