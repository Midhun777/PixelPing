import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, Trophy, RefreshCw } from 'lucide-react';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRandomClick: () => void;
  onLaunchGame: (gameId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchGame,
}) => {
  // Hero Interactive Quick Tap Mini-Game State
  const [heroGameState, setHeroGameState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const startHeroTest = () => {
    sounds.playPop();
    setHeroGameState('waiting');
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 2000) + 1500;
    const timeout = setTimeout(() => {
      setHeroGameState('ready');
      setStartTime(Date.now());
    }, delay);

    setTimerId(timeout);
  };

  const handleHeroTap = () => {
    if (heroGameState === 'waiting') {
      if (timerId) clearTimeout(timerId);
      sounds.playError();
      setHeroGameState('idle');
      alert('Too early! Wait for the screen to turn green.');
    } else if (heroGameState === 'ready') {
      const ms = Date.now() - startTime;
      sounds.playVictory();
      setReactionTime(ms);
      setHeroGameState('result');
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  return (
    <section className="relative pt-8 pb-10 md:pt-12 md:pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Floating Decorative Shapes */}
      <div className="absolute top-6 left-6 sm:left-16 pointer-events-none animate-float-slow opacity-80 z-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B7FFF]/20 to-[#FFD84D]/30 backdrop-blur-md border border-[#5B7FFF]/20 flex items-center justify-center text-lg shadow-lg rotate-12">
          🎲
        </div>
      </div>

      <div className="absolute top-10 right-6 sm:right-20 pointer-events-none animate-float-reverse opacity-80 z-0">
        <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-[#27D980]/20 to-[#5B7FFF]/20 backdrop-blur-md border border-[#27D980]/20 flex items-center justify-center text-xl shadow-lg -rotate-6">
          🧩
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Playful Iconic Header Title (neal.fun style) */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-slate-900 dark:text-white uppercase select-none">
              PIXEL
            </h1>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#5B7FFF] via-[#27D980] to-[#FFD84D] p-0.5 shadow-xl shadow-[#5B7FFF]/20 flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#0F1115] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 sm:w-9 sm:h-9 text-[#5B7FFF]" />
              </div>
            </div>
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-slate-900 dark:text-white uppercase select-none">
              PING
            </h1>
          </div>

          <span className="font-display font-medium text-base sm:text-xl text-slate-500 dark:text-slate-400 tracking-wide">
            games and web stuff
          </span>
        </div>

        {/* Compact Interactive Reflex Speed Test Widget */}
        <div className="w-full max-w-md glass-card rounded-3xl p-5 border border-white/60 dark:border-white/10 shadow-xl relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="font-display font-bold text-xs text-slate-900 dark:text-white">
                Reflex Speed Test
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF] font-semibold">
              Tap to Test
            </span>
          </div>

          <div
            onClick={heroGameState === 'ready' || heroGameState === 'waiting' ? handleHeroTap : undefined}
            className={`w-full h-28 rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer select-none transition-all duration-300 relative overflow-hidden ${
              heroGameState === 'idle'
                ? 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-dashed border-slate-300 dark:border-slate-700'
                : heroGameState === 'waiting'
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : heroGameState === 'ready'
                ? 'bg-[#27D980] text-slate-950 scale-[1.02] shadow-xl'
                : 'bg-gradient-to-br from-[#5B7FFF] to-[#4364F7] text-white shadow-lg'
            }`}
          >
            {heroGameState === 'idle' && (
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startHeroTest();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5B7FFF] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Start Reflex Test
                </button>
              </div>
            )}

            {heroGameState === 'waiting' && (
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-base text-slate-950">
                  WAIT FOR GREEN...
                </span>
              </div>
            )}

            {heroGameState === 'ready' && (
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-xl text-slate-950 tracking-wider">
                  TAP NOW! ⚡
                </span>
              </div>
            )}

            {heroGameState === 'result' && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-amber-300">
                  <Trophy className="w-4 h-4 fill-amber-300" />
                  <span className="font-display font-extrabold text-2xl">
                    {reactionTime} ms
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startHeroTest();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-[11px] flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playPop();
                      onLaunchGame('reaction');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#5B7FFF] font-bold text-[11px] shadow-sm hover:scale-105"
                  >
                    Full Game
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
