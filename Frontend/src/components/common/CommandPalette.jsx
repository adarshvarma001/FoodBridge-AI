import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Bot, LayoutDashboard, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useApp();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const role = user?.role?.toLowerCase() || 'donor';

  const actions = [
    { name: 'Dashboard', path: `/${role}/dashboard`, icon: LayoutDashboard },
    { name: 'Agent Center', path: '/agents', icon: Bot },
    { name: 'Create Donation', path: '/donor/donations', icon: Package },
  ];

  const filtered = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl bg-white dark:bg-charcoal-darker rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-charcoal-medium"
        >
          <div className="p-4 border-b border-gray-200 dark:border-charcoal-medium flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent outline-none text-sm"
              autoFocus
            />
            <button onClick={() => setIsCommandPaletteOpen(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="p-2 max-h-96 overflow-y-auto">
            {filtered.map(action => (
              <div
                key={action.name}
                onClick={() => {
                  navigate(action.path);
                  setIsCommandPaletteOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-charcoal-medium cursor-pointer transition-colors"
              >
                <action.icon className="w-5 h-5 text-brand-dark" />
                <span className="text-sm font-medium">{action.name}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">No results found.</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
