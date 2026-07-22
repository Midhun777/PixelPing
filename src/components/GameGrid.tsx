import React from 'react';
import type { GameItem } from '../data/gamesData';
import { GameCard } from './GameCard';
import { Frown, RefreshCw } from 'lucide-react';
import { sounds } from '../services/audio';

interface GameGridProps {
  games: GameItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onPlayGame: (id: string) => void;
  onResetFilters: () => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  favorites,
  onToggleFavorite,
  onPlayGame,
  onResetFilters,
}) => {
  if (games.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center text-4xl mb-4 animate-bounce">
          <Frown className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">
          No games found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          We couldn't find any mini-games matching your current search or category filter. Try clearing your search!
        </p>
        <button
          onClick={() => {
            sounds.playPop();
            onResetFilters();
          }}
          className="px-5 py-2.5 rounded-xl bg-[#5B7FFF] text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Reset Filters
        </button>
      </div>
    );
  }

  return (
    <section id="games" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isFavorite={favorites.includes(game.id)}
            onToggleFavorite={onToggleFavorite}
            onPlay={onPlayGame}
          />
        ))}
      </div>
    </section>
  );
};
