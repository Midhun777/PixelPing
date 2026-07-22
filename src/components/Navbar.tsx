import React, { useState, useEffect } from 'react';
import { Gamepad2, Moon, Sun, Volume2, VolumeX, Menu, X, Sparkles, Dices } from 'lucide-react';
import { sounds } from '../services/audio';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onRandomClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, onRandomClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playPop();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 transition-all duration-300">
      <div
        className={`mx-auto max-w-5xl glass-pill rounded-full transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 px-5 shadow-xl shadow-black/5 dark:shadow-black/30 scale-[0.99]'
            : 'py-3 px-6 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              sounds.playPop();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B7FFF] via-[#27D980] to-[#FFD84D] p-0.5 shadow-md shadow-[#5B7FFF]/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#0F1115] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#5B7FFF] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111827] via-[#5B7FFF] to-[#111827] dark:from-white dark:via-[#6C8DFF] dark:to-white">
                PixelPing
              </span>
              <span className="text-[10px] font-medium text-[#6B7280] dark:text-slate-400 tracking-wide uppercase -mt-0.5">
                Play Instantly
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
            <a
              href="#featured"
              onClick={(e) => handleNavClick(e, 'featured')}
              className="px-3.5 py-1.5 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Featured
            </a>
            <a
              href="#games"
              onClick={(e) => handleNavClick(e, 'games')}
              className="px-3.5 py-1.5 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              All Games
            </a>
          </nav>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2">
            {/* Random Game Quick Button */}
            <button
              onClick={() => {
                sounds.playDiceRoll();
                onRandomClick();
              }}
              title="Surprise Me!"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#5B7FFF]/10 to-[#27D980]/10 text-[#5B7FFF] dark:text-[#6C8DFF] border border-[#5B7FFF]/20 hover:border-[#5B7FFF]/40 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <Dices className="w-4 h-4 animate-spin-slow" />
              <span>Surprise Me</span>
            </button>

            {/* Mute Audio Toggle */}
            <button
              onClick={handleMuteToggle}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              aria-label="Toggle Sound FX"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
            >
              {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-500" /> : <Volume2 className="w-4.5 h-4.5 text-emerald-500" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                sounds.playPop();
                onToggleTheme();
              }}
              title="Toggle Theme"
              aria-label="Toggle Light / Dark Mode"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-amber-400 rotate-0 transition-transform duration-500" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-700 -rotate-12 transition-transform duration-500" />
              )}
            </button>

            {/* GitHub link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playPop()}
              aria-label="GitHub Repository"
              className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 transition-all"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sounds.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Open Navigation Menu"
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl glass-pill rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2 font-medium">
            <a
              href="#featured"
              onClick={(e) => handleNavClick(e, 'featured')}
              className="px-4 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 flex items-center justify-between"
            >
              <span>Featured Spotlight</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </a>
            <a
              href="#games"
              onClick={(e) => handleNavClick(e, 'games')}
              className="px-4 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 flex items-center justify-between"
            >
              <span>All Mini Games</span>
              <Gamepad2 className="w-4 h-4 text-[#5B7FFF]" />
            </a>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sounds.playDiceRoll();
                  onRandomClick();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#27D980] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#5B7FFF]/25 active:scale-98 transition-all"
              >
                <Dices className="w-5 h-5" />
                <span>Play Random Game</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
