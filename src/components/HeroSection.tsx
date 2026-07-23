import React, { useState } from 'react';
import { Gamepad2, Sun, Moon, Volume2, VolumeX, Sparkles, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRandomClick: () => void;
  onLaunchGame: (gameId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

// 4 Premium Curated Playful Gradient Palettes
const COLOR_PALETTES = [
  {
    name: 'Electric Aurora',
    pixel: 'from-[#6366F1] via-[#818CF8] to-[#10B981]',
    ping: 'from-[#10B981] via-[#F59E0B] to-[#F43F5E]',
    glow: 'from-[#6366F1]/25 via-[#10B981]/25 to-[#F59E0B]/25',
    accentBg: 'bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8]',
  },
  {
    name: 'Neon Sunset',
    pixel: 'from-[#F43F5E] via-[#FB7185] to-[#F59E0B]',
    ping: 'from-[#F59E0B] via-[#10B981] to-[#6366F1]',
    glow: 'from-[#F43F5E]/25 via-[#F59E0B]/25 to-[#6366F1]/25',
    accentBg: 'bg-[#F43F5E]/10 text-[#F43F5E] dark:text-[#FB7185]',
  },
  {
    name: 'Cyber Mint',
    pixel: 'from-[#06B6D4] via-[#38BDF8] to-[#34D399]',
    ping: 'from-[#34D399] via-[#FBBF24] to-[#EC4899]',
    glow: 'from-[#06B6D4]/25 via-[#34D399]/25 to-[#EC4899]/25',
    accentBg: 'bg-[#06B6D4]/10 text-[#06B6D4] dark:text-[#38BDF8]',
  },
  {
    name: 'Cosmic Violet',
    pixel: 'from-[#8B5CF6] via-[#A855F7] to-[#EC4899]',
    ping: 'from-[#EC4899] via-[#FB923C] to-[#FACC15]',
    glow: 'from-[#8B5CF6]/25 via-[#EC4899]/25 to-[#FACC15]/25',
    accentBg: 'bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#A855F7]',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const currentPalette = COLOR_PALETTES[paletteIndex];

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleHeaderClick = () => {
    sounds.playPop();
    setPaletteIndex((prev) => (prev + 1) % COLOR_PALETTES.length);
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playDiceRoll();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 3) {
      sounds.playVictory();
      setShowEasterEgg(true);
      setClickCount(0);
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.35 },
      });
      setTimeout(() => setShowEasterEgg(false), 4500);
    }
  };

  return (
    <section className="relative pt-6 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden select-none">
      {/* Top Corner Quick Control Action Pills */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 mb-6 relative z-20">
        {/* Left Side Tagline Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-slate-200/80 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
          <Globe className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8]" />
          <span className="hidden sm:inline">120+ Countries & Mini-Games</span>
          <span className="sm:hidden">PIXEL PING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        </div>

        {/* Right Side Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound FX"
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-500" /> : <Volume2 className="w-4.5 h-4.5 text-emerald-500" />}
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onToggleTheme();
            }}
            title="Toggle Theme"
            aria-label="Toggle Light / Dark Mode"
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            {isDark ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform duration-500 hover:rotate-45" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-700 transition-transform duration-500 hover:-rotate-45" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Background Accent Shapes */}
      <div className="absolute top-12 left-4 sm:left-14 pointer-events-none animate-float-slow opacity-80 z-0">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6366F1]/20 to-[#FBBF24]/30 backdrop-blur-md border border-[#6366F1]/20 flex items-center justify-center text-lg shadow-lg rotate-12">
          🌍
        </div>
      </div>

      <div className="absolute top-14 right-4 sm:right-16 pointer-events-none animate-float-reverse opacity-80 z-0">
        <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-[#10B981]/20 to-[#6366F1]/20 backdrop-blur-md border border-[#10B981]/20 flex items-center justify-center text-xl shadow-lg -rotate-6">
          🏆
        </div>
      </div>

      {/* Interactive Title Header Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Ambient Radial Glow */}
        <div
          className={`absolute -top-12 left-1/2 -translate-x-1/2 w-[550px] h-[240px] rounded-full bg-gradient-to-r ${currentPalette.glow} blur-3xl transition-all duration-700 pointer-events-none`}
        />

        {/* Secret Easter Egg Alert Pill */}
        {showEasterEgg && (
          <div className="mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 text-white font-extrabold text-xs shadow-2xl animate-bounce flex items-center gap-2 z-30">
            <Sparkles className="w-4 h-4 fill-white" />
            <span>🎉 SECRET EASTER EGG UNLOCKED! PARTY MODE ACTIVATED!</span>
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
        )}

        {/* Interactive Title Logo Display */}
        <div
          onClick={handleHeaderClick}
          title="Click logo to cycle color theme!"
          className="flex flex-col items-center gap-2 relative z-10 cursor-pointer group"
        >
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r ${currentPalette.pixel} uppercase select-none drop-shadow-sm transition-all duration-500 group-hover:scale-105`}
            >
              PIXEL
            </h1>

            {/* Glowing 3D Controller Badge (3-tap Easter Egg Trigger) */}
            <div
              onClick={handleBadgeClick}
              title="Tap 3 times for a party secret!"
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#6366F1] via-[#10B981] to-[#F59E0B] p-1 shadow-2xl shadow-[#6366F1]/30 flex items-center justify-center rotate-6 hover:rotate-180 hover:scale-125 transition-all duration-500 active:scale-95"
            >
              <div className="w-full h-full bg-[#F8FAFC] dark:bg-[#080B11] rounded-[20px] flex items-center justify-center shadow-inner">
                <Gamepad2 className="w-8 h-8 sm:w-11 sm:h-11 text-[#6366F1] dark:text-[#818CF8] animate-pulse-slow" />
              </div>
            </div>

            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r ${currentPalette.ping} uppercase select-none drop-shadow-sm transition-all duration-500 group-hover:scale-105`}
            >
              PING
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
