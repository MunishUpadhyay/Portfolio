import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 border border-border backdrop-blur-xl bg-background/80 hover:bg-accent text-foreground group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? 40 : 0,
            opacity: theme === 'dark' ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute"
        >
          <FiSun className="text-2xl text-amber-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? 0 : -40,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute"
        >
          <FiMoon className="text-2xl text-primary-400" />
        </motion.div>
      </div>
    </motion.button>
  );
};