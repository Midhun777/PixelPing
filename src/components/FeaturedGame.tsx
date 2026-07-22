import React from 'react';
import { Play, Heart, Clock, Gauge, Sparkles } from 'lucide-react';
import { sounds } from '../services/audio';

interface FeaturedGameProps {
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlayGame: (id: string) => void;
}

export const FeaturedGame: React.FC<FeaturedGameProps> = ({
  isFavorite,
  onToggleFavorite,
  onPlayGame,
}) => {
  const gameId = 'memory';

  return (
    <section id="featured" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#5B7FFF]" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Spotlight Game
          </h2>
        </div>
      </div>

      {/* Featured Spotlight Card */}
      <div className="group glass-card rounded-[24px] p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-1.5 transition-all duration-300 shine-sweep relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#5B7FFF]/20 via-[#27D980]/20 to-transparent blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Graphic Preview */}
          <div className="md:col-span-6 relative flex items-center justify-center">
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5B7FFF_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="flex justify-end items-start relative z-10">
                <span className="text-3xl animate-float-slow">🧩</span>
              </div>

              {/* Mini cards visual */}
              <div className="grid grid-cols-4 gap-2 my-auto relative z-10 max-w-xs mx-auto">
                <div className="h-12 rounded-xl bg-gradient-to-br from-[#5B7FFF] to-[#4364F7] flex items-center justify-center text-white font-bold text-lg shadow-md rotate-3 group-hover:rotate-6 transition-transform">
                  🎮
                </div>
                <div className="h-12 rounded-xl bg-gradient-to-br from-[#27D980] to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md -rotate-3 group-hover:-rotate-6 transition-transform">
                  💎
                </div>
                <div className="h-12 rounded-xl bg-gradient-to-br from-[#FFD84D] to-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md rotate-2 transition-transform">
                  🚀
                </div>
                <div className="h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md -rotate-2 transition-transform">
                  ⚡
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <span className="text-xs font-mono text-slate-400">MEMORY & RECALL</span>
                <span className="text-xs font-semibold text-emerald-400">Client-Side Play</span>
              </div>
            </div>
          </div>

          {/* Right Column: Game Info */}
          <div className="md:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF] font-semibold text-xs uppercase tracking-wider">
                  Memory & Logic
                </span>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => {
                    sounds.playPop();
                    onToggleFavorite(gameId);
                  }}
                  aria-label="Add to Favorites"
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isFavorite ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'
                    }`}
                  />
                </button>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
                Memory Matrix Switch
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Match pairs of geometric tiles in as few turns as possible. Test visual recall with dynamic card shuffling.
              </p>

              {/* Specs */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Gauge className="w-4 h-4 text-[#5B7FFF]" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>~2 Mins</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => {
                sounds.playPop();
                onPlayGame(gameId);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#5B7FFF] via-[#4364F7] to-[#5B7FFF] text-white font-bold text-base shadow-xl shadow-[#5B7FFF]/30 hover:shadow-[#5B7FFF]/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Play Memory Matrix</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
