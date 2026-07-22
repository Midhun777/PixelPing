import React, { useState } from 'react';
import { Gamepad2, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRandomClick: () => void;
  onLaunchGame: (gameId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <section className="relative pt-6 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden">
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

      {/* Header Title Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Ambient Radial Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[450px] h-[200px] rounded-full bg-gradient-to-r from-[#5B7FFF]/15 via-[#27D980]/15 to-[#FFD84D]/15 blur-3xl pointer-events-none" />

        {/* Gorgeous Gradient Header Title */}
        <div className="flex flex-col items-center gap-2 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#5B7FFF] via-[#6C8DFF] to-[#27D980] uppercase select-none drop-shadow-sm">
              PIXEL
            </h1>

            {/* Glowing 3D Controller Badge */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#5B7FFF] via-[#27D980] to-[#FFD84D] p-1 shadow-2xl shadow-[#5B7FFF]/30 flex items-center justify-center rotate-6 hover:rotate-12 hover:scale-110 transition-all duration-300">
              <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#0F1115] rounded-[20px] flex items-center justify-center shadow-inner">
                <Gamepad2 className="w-8 h-8 sm:w-11 sm:h-11 text-[#5B7FFF] animate-pulse-slow" />
              </div>
            </div>

            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#27D980] via-[#FFD84D] to-[#FF5C5C] uppercase select-none drop-shadow-sm">
              PING
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
