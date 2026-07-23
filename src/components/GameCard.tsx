import React from 'react';
import { Play, Heart, Clock, Gauge } from 'lucide-react';
import type { GameItem } from '../data/gamesData';
import { sounds } from '../services/audio';

interface GameCardProps {
  game: GameItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: (id: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) => {
  return (
    <div className="group glass-card rounded-[28px] p-6 border border-slate-200/80 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Ambient Gradient Glow Accent */}
      <div className={`absolute top-0 right-0 -mr-14 -mt-14 w-44 h-44 rounded-full bg-gradient-to-br ${game.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4 z-10 relative">
        <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-[11px] font-extrabold uppercase tracking-wider">
          {game.category}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playPop();
            onToggleFavorite(game.id);
          }}
          aria-label={`Favorite ${game.title}`}
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm z-20 border border-slate-200/80 dark:border-white/10"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isFavorite ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'
            }`}
          />
        </button>
      </div>

      {/* Title & Icon */}
      <div className="flex items-start gap-4 mb-3 z-10 relative">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0`}
        >
          {game.icon}
        </div>

        <div className="flex flex-col">
          <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-snug group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#6366F1]" /> {game.playTime}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#10B981]" /> {game.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 z-10 font-medium line-clamp-2">
        {game.description}
      </p>

      {/* Tactile Play Button */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 z-10 relative">
        <button
          onClick={() => {
            sounds.playPop();
            onPlay(game.id);
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-display font-extrabold text-xs shadow-md group-hover:shadow-lg transition-all flex items-center justify-center gap-2 btn-tactile uppercase tracking-wider"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Play Game Now</span>
        </button>
      </div>
    </div>
  );
};
