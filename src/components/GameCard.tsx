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
    <div className="group glass-card rounded-[20px] p-5 border border-white/60 dark:border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 shine-sweep flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top category & heart */}
      <div className="flex items-center justify-between mb-4 z-10">
        <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
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
          className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm z-20"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'
            }`}
          />
        </button>
      </div>

      {/* Center Icon & Title */}
      <div className="flex items-start gap-3.5 mb-4 z-10">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-2xl shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0`}
        >
          {game.icon}
        </div>

        <div className="flex flex-col">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug group-hover:text-[#5B7FFF] dark:group-hover:text-[#6C8DFF] transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {game.playTime}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#5B7FFF]" /> {game.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 z-10 line-clamp-2">
        {game.description}
      </p>

      {/* Bottom CTA */}
      <div className="flex items-center justify-end pt-3 border-t border-slate-200/60 dark:border-slate-800 z-10">
        <button
          onClick={() => {
            sounds.playPop();
            onPlay(game.id);
          }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white font-bold text-xs shadow-md group-hover:shadow-lg group-hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Play Game</span>
        </button>
      </div>
    </div>
  );
};
