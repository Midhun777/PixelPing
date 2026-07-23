import React from 'react';
import { Search, Sun, Moon, Volume2, VolumeX, Globe } from 'lucide-react';
import { sounds } from '../services/audio';

interface NavbarProps {
  activeTab: 'home' | 'geography' | 'casual';
  onSelectTab: (tab: 'home' | 'geography' | 'casual') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-pill border-b border-slate-200/80 dark:border-white/10 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            sounds.playPop();
            onSelectTab('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#10B981] to-[#F59E0B] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#F8FAFC] dark:bg-[#080C14] rounded-[14px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#6366F1] dark:text-[#818CF8]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#10B981]">
              PixelPing
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest -mt-1 hidden sm:block">
              Geo & Arcade Games
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-card border border-slate-200/60 dark:border-white/10">
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('home');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-extrabold transition-all btn-tactile ${
              activeTab === 'home'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('geography');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-extrabold transition-all btn-tactile ${
              activeTab === 'geography'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Geography
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('casual');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-extrabold transition-all btn-tactile ${
              activeTab === 'casual'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Games
          </button>
        </nav>

        {/* Right: Search Input & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Live Search Input Box */}
          <div className="relative w-36 sm:w-56 lg:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:border-[#6366F1] transition-all"
            />
          </div>

          {/* Sound Mute Toggle Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound FX"
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleTheme();
            }}
            title="Toggle Light / Dark Theme"
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-500 hover:-rotate-45" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
