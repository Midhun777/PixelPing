import React, { useState } from 'react';
import { Gamepad2, Sun, Moon, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRandomClick: () => void;
  onLaunchGame: (gameId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

// 4 Vibrant Interactive Gradient Palettes
const COLOR_PALETTES = [
  {
    pixel: 'from-[#5B7FFF] via-[#6C8DFF] to-[#27D980]',
    ping: 'from-[#27D980] via-[#FFD84D] to-[#FF5C5C]',
    glow: 'from-[#5B7FFF]/20 via-[#27D980]/20 to-[#FFD84D]/20',
  },
  {
    pixel: 'from-[#FF5C5C] via-[#FF85A1] to-[#FFD84D]',
    ping: 'from-[#FFD84D] via-[#27D980] to-[#5B7FFF]',
    glow: 'from-[#FF5C5C]/20 via-[#FFD84D]/20 to-[#5B7FFF]/20',
  },
  {
    pixel: 'from-[#00F2FE] via-[#4FACFE] to-[#00E676]',
    ping: 'from-[#00E676] via-[#FFE600] to-[#FF2A85]',
    glow: 'from-[#00F2FE]/20 via-[#00E676]/20 to-[#FF2A85]/20',
  },
  {
    pixel: 'from-[#A855F7] via-[#EC4899] to-[#F43F5E]',
    ping: 'from-[#F43F5E] via-[#FB923C] to-[#FACC15]',
    glow: 'from-[#A855F7]/20 via-[#EC4899]/20 to-[#FACC15]/20',
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
        particleCount: 150,
        spread: 100,
        origin: { y: 0.3 },
      });
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  };

  return (
    <section className="relative pt-6 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden select-none">
      {/* Top Corner Quick Action Controls */}
      <div className="max-w-5xl mx-auto flex items-center justify-end gap-2 mb-4 relative z-20">
        <button
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          aria-label="Toggle Sound FX"
          className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
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
          className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 text-amber-400 rotate-0 transition-transform duration-500" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-slate-700 -rotate-12 transition-transform duration-500" />
          )}
        </button>
      </div>

      {/* Floating Background Shapes */}
      <div className="absolute top-10 left-6 sm:left-16 pointer-events-none animate-float-slow opacity-70 z-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B7FFF]/20 to-[#FFD84D]/30 backdrop-blur-md border border-[#5B7FFF]/20 flex items-center justify-center text-lg shadow-lg rotate-12">
          🎲
        </div>
      </div>

      <div className="absolute top-12 right-6 sm:right-20 pointer-events-none animate-float-reverse opacity-70 z-0">
        <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-[#27D980]/20 to-[#5B7FFF]/20 backdrop-blur-md border border-[#27D980]/20 flex items-center justify-center text-xl shadow-lg -rotate-6">
          🧩
        </div>
      </div>

      {/* Interactive Title Header Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Ambient Radial Glow */}
        <div
          className={`absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[220px] rounded-full bg-gradient-to-r ${currentPalette.glow} blur-3xl transition-all duration-700 pointer-events-none`}
        />

        {/* Secret Easter Egg Alert Pill */}
        {showEasterEgg && (
          <div className="mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-extrabold text-xs shadow-xl animate-bounce flex items-center gap-1.5 z-30">
            <Sparkles className="w-4 h-4 fill-white" />
            <span>🎉 SECRET EASTER EGG UNLOCKED! PARTY MODE!</span>
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
        )}

        {/* Interactive Title Logo */}
        <div
          onClick={handleHeaderClick}
          title="Click title to cycle colors!"
          className="flex flex-col items-center gap-2 relative z-10 cursor-pointer group"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r ${currentPalette.pixel} uppercase select-none drop-shadow-sm transition-all duration-500 group-hover:scale-105`}
            >
              PIXEL
            </h1>

            {/* Glowing 3D Controller Badge (3-tap Easter Egg Trigger) */}
            <div
              onClick={handleBadgeClick}
              title="Tap 3 times for a secret!"
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#5B7FFF] via-[#27D980] to-[#FFD84D] p-1 shadow-2xl shadow-[#5B7FFF]/30 flex items-center justify-center rotate-6 hover:rotate-180 hover:scale-125 transition-all duration-500 active:scale-95"
            >
              <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#0F1115] rounded-[20px] flex items-center justify-center shadow-inner">
                <Gamepad2 className="w-8 h-8 sm:w-11 sm:h-11 text-[#5B7FFF] animate-pulse-slow" />
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
