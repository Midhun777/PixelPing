import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Globe, User, Gamepad2 } from 'lucide-react';
import { sounds } from '../services/audio';
import { getUserStats } from '../services/statsService';

interface NavbarProps {
  activeTab: 'geography' | 'casual';
  onSelectTab: (tab: 'geography' | 'casual') => void;
  onOpenProfile: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 select-none">
        {/* Left: Page / Brand Name */}
        <div
          onClick={() => {
            sounds.playPop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#10B981] to-[#F59E0B] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#F8FAFC] dark:bg-[#080C14] rounded-[14px] flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#6366F1] dark:text-[#818CF8]" />
            </div>
          </div>
          <span className="font-display font-black text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#10B981] hidden xs:inline">
            PixelPing
          </span>
        </div>

        {/* Center: Game Type Switcher Pill Bar */}
        <div className="flex items-center gap-1 p-1 rounded-full glass-card border border-slate-200/80 dark:border-white/10 shadow-inner">
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('geography');
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-display font-extrabold transition-all btn-tactile flex items-center gap-1.5 ${
              activeTab === 'geography'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Geography</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('casual');
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-display font-extrabold transition-all btn-tactile flex items-center gap-1.5 ${
              activeTab === 'casual'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Casual Arcade</span>
          </button>
        </div>

        {/* Right Controls: Profile Button, Sound FX Mute Toggle, Dark Mode Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User Profile Access Button */}
          <button
            onClick={() => {
              sounds.playPop();
              const updatedStats = getUserStats();
              setPlayerLevel(updatedStats.level || 1);
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full glass-card border border-slate-200/80 dark:border-white/10 text-xs font-display font-extrabold text-slate-800 dark:text-white hover:border-[#6366F1]/50 transition-all btn-tactile shadow-sm"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] dark:text-[#818CF8]">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="hidden md:inline">Profile</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#6366F1] dark:text-[#818CF8] text-[10px] font-black uppercase">
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
