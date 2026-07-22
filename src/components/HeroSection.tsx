import React, { useState, useEffect } from 'react';
import { Dices, ChevronDown, Zap, Trophy, RefreshCw } from 'lucide-react';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRandomClick: () => void;
  onLaunchGame: (gameId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onRandomClick,
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
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Floating Decorative Shapes */}
      <div className="absolute top-10 left-5 sm:left-12 pointer-events-none animate-float-slow opacity-80 z-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B7FFF]/20 to-[#FFD84D]/30 backdrop-blur-md border border-[#5B7FFF]/20 flex items-center justify-center text-xl shadow-lg rotate-12">
          🎲
        </div>
      </div>

      <div className="absolute top-36 right-6 sm:right-16 pointer-events-none animate-float-reverse opacity-80 z-0">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#27D980]/20 to-[#5B7FFF]/20 backdrop-blur-md border border-[#27D980]/20 flex items-center justify-center text-2xl shadow-lg -rotate-6">
          🧩
        </div>
      </div>

      <div className="absolute bottom-16 left-10 sm:left-24 pointer-events-none animate-float-slow opacity-70 z-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD84D]/30 to-[#FF5C5C]/20 backdrop-blur-md border border-[#FFD84D]/30 flex items-center justify-center text-lg shadow-md">
          ⚡
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] max-w-4xl text-slate-900 dark:text-white mb-6">
          Tiny Games.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B7FFF] via-[#27D980] to-[#FFD84D]">
            Infinite Fun.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Discover modern, lightweight browser games designed for touch and desktop.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={() => {
              sounds.playPop();
              onExploreClick();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white font-bold text-base shadow-xl shadow-[#5B7FFF]/30 hover:shadow-[#5B7FFF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Games</span>
            <ChevronDown className="w-5 h-5 text-white/80" />
          </button>

          <button
            onClick={() => {
              sounds.playDiceRoll();
              onRandomClick();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <Dices className="w-5 h-5 text-[#5B7FFF]" />
            <span>Surprise Me</span>
          </button>
        </div>

        {/* Hero Interactive Reflex Speed Test Widget */}
        <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 shadow-2xl relative group overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Reflex Speed Test
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF] font-semibold border border-[#5B7FFF]/20">
              Interactive Demo
            </span>
          </div>

          <div
            onClick={heroGameState === 'ready' || heroGameState === 'waiting' ? handleHeroTap : undefined}
            className={`w-full h-36 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer select-none transition-all duration-300 relative overflow-hidden ${
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
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Tap when the indicator turns green
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startHeroTest();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#5B7FFF] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" /> Start Reflex Test
                </button>
              </div>
            )}

            {heroGameState === 'waiting' && (
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-lg text-slate-950">
                  WAIT FOR GREEN...
                </span>
                <span className="text-xs font-semibold text-slate-800 mt-1">
                  Don't tap yet!
                </span>
              </div>
            )}

            {heroGameState === 'ready' && (
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-2xl text-slate-950 tracking-wider">
                  TAP NOW! ⚡
                </span>
              </div>
            )}

            {heroGameState === 'result' && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-amber-300">
                  <Trophy className="w-5 h-5 fill-amber-300" />
                  <span className="font-display font-extrabold text-3xl">
                    {reactionTime} ms
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startHeroTest();
                    }}
                    className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Try Again
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playPop();
                      onLaunchGame('reaction');
                    }}
                    className="px-3 py-1 rounded-lg bg-white text-[#5B7FFF] font-bold text-xs shadow-sm hover:scale-105"
                  >
                    Full Version
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              sounds.playPop();
              onExploreClick();
            }}
            aria-label="Scroll down to games section"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center animate-bounce shadow-sm hover:scale-110 transition-transform"
          >
            <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
