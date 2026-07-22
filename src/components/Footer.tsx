import React, { useState, useEffect } from 'react';
import { Gamepad2, Moon, Sun, Volume2, VolumeX, Keyboard } from 'lucide-react';
import { sounds } from '../services/audio';

interface FooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDark, onToggleTheme }) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setShowKeyboardModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-slate-800 bg-[#FAFAFA]/80 dark:bg-[#0F1115]/80 backdrop-blur-md py-10 px-4 sm:px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5B7FFF] to-[#27D980] flex items-center justify-center text-white shadow-md">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
              PixelPing Platform
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} PixelPing. All rights reserved.
            </span>
          </div>
        </div>

        {/* Center: Controls & Shortcuts */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKeyboardModal(true)}
            className="px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#5B7FFF]" />
            <span>Hotkeys (?)</span>
          </button>

          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Toggle Sound FX"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

        {/* Right: Version & Links */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <span>•</span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            v2.4.0
          </span>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Modal */}
      {showKeyboardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setShowKeyboardModal(false)}
        >
          <div
            className="w-full max-w-sm glass-card rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
              Keyboard Shortcuts ⌨️
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Focus Search Bar</span>
                <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-200">
                  /
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Close Game Modal</span>
                <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-200">
                  Esc
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Move Tiles in 2048</span>
                <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-200">
                  Arrow Keys
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Toggle Hotkey Helper</span>
                <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-200">
                  ?
                </kbd>
              </div>
            </div>
            <button
              onClick={() => setShowKeyboardModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#5B7FFF] text-white font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
