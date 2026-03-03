'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Briefcase, User } from 'lucide-react';

export default function ModeSwitcher() {
  const { mode, setMode } = useAppStore();

  const seekerStyle = {
    background: 'linear-gradient(135deg, #0066ff 0%, #0040b3 100%)',
    boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)',
  };

  const providerStyle = {
    background: 'linear-gradient(135deg, #00ff75 0%, #00b352 100%)',
    boxShadow: '0 0 20px rgba(0, 255, 117, 0.3)',
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center p-1 bg-dark-700 rounded-full border border-dark-500">
        {/* Seeker Mode Button */}
        <button
          onClick={() => setMode('SEEKER')}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            mode === 'SEEKER'
              ? 'text-white'
              : 'text-dark-400 hover:text-dark-300'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Seeker</span>
        </button>

        {/* Provider Mode Button */}
        <button
          onClick={() => setMode('PROVIDER')}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            mode === 'PROVIDER'
              ? 'text-dark-900'
              : 'text-dark-400 hover:text-dark-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-sm font-medium">Provider</span>
        </button>

        {/* Animated Background */}
        <motion.div
          className="absolute top-1 left-1 w-24 h-8 rounded-full z-0"
          initial={false}
          animate={{
            x: mode === 'SEEKER' ? 0 : 96,
            ...mode === 'SEEKER' ? seekerStyle : providerStyle,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}