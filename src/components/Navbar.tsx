import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Globe, User, BookOpen } from 'lucide-react';
import { sounds } from '../services/audio';
import { getUserStats } from '../services/statsService';

interface NavbarProps {
  onOpenProfile: () => void;
  onOpenAtlas: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProfile,
  onOpenAtlas,
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
}) => {
  const [playerLevel, setPlayerLevel] = useState<number>(1);

  useEffect(() => {
    const stats = getUserStats();
    setPlayerLevel(stats.level || 1);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-pill border-b border-slate-200/80 dark:border-white/10 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 select-none">
        {/* Left: Page / Brand Name */}
        <div
          onClick={() => {
            sounds.playPop();
            window.location.hash = 'geography';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#10B981] to-[#F59E0B] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#F8FAFC] dark:bg-[#080C14] rounded-[14px] flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#6366F1] dark:text-[#818CF8]" />
            </div>
          </div>
          <span className="font-display font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#10B981]">
            PixelPing
          </span>
        </div>

        {/* Right Controls: World Atlas Highlight Button, Profile Button, Sound FX Mute Toggle, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Highlighted World Atlas Quick Button */}
          <button
            onClick={() => {
              sounds.playPop();
              window.location.hash = 'atlas';
              onOpenAtlas();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-display font-black text-xs shadow-lg shadow-emerald-500/25 btn-tactile border border-white/20 animate-pulse hover:animate-none"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">World Atlas</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full font-bold">195</span>
          </button>

          {/* User Profile Access Button */}
          <button
            onClick={() => {
              sounds.playPop();
              window.location.hash = 'profile';
              const updatedStats = getUserStats();
              setPlayerLevel(updatedStats.level || 1);
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-slate-200/80 dark:border-white/10 text-xs font-display font-extrabold text-slate-800 dark:text-white hover:border-[#6366F1]/50 transition-all btn-tactile shadow-sm"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] dark:text-[#818CF8]">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Profile</span>
            <span className="px-2 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#6366F1] dark:text-[#818CF8] text-[10px] font-black uppercase">
              LVL {playerLevel}
            </span>
          </button>

          {/* Sound Mute Toggle Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound FX"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />}
          </button>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleTheme();
            }}
            title="Toggle Light / Dark Theme"
            aria-label="Toggle Theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 transition-transform duration-500 hover:rotate-45" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 transition-transform duration-500 hover:-rotate-45" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
