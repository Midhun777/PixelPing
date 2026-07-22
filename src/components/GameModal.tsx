import React, { useEffect } from 'react';
import { X, Gamepad2, Sparkles } from 'lucide-react';
import type { GameItem } from '../data/gamesData';
import { ReactionGame } from './games/ReactionGame';
import { MemoryGame } from './games/MemoryGame';
import { GeoQuizGame } from './games/GeoQuizGame';
import { ColorMatchGame } from './games/ColorMatchGame';
import { Tile2048Game } from './games/Tile2048Game';
import { TicTacToeGame } from './games/TicTacToeGame';
import { sounds } from '../services/audio';

interface GameModalProps {
  game: GameItem | null;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sounds.playPop();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const renderGameContent = () => {
    switch (game.id) {
      case 'reaction':
        return <ReactionGame />;
      case 'memory':
        return <MemoryGame />;
      case 'geoquiz':
        return <GeoQuizGame />;
      case 'colormatch':
        return <ColorMatchGame />;
      case 'tile2048':
        return <Tile2048Game />;
      case 'tictactoe':
        return <TicTacToeGame />;
      default:
        return <MemoryGame />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg glass-card rounded-[28px] p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 rounded-full bg-[#5B7FFF]/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-2xl shadow-md`}
            >
              {game.icon}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  {game.title}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF]">
                  {game.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant Browser Play • No Installs
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            aria-label="Close Game Modal"
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:scale-105 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playable Game Body */}
        <div className="relative z-10 overflow-y-auto no-scrollbar py-2">
          {renderGameContent()}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono z-10">
          <span className="flex items-center gap-1">
            <Gamepad2 className="w-3.5 h-3.5" /> PixelPing Engine v2.4
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Client-Side Execution
          </span>
        </div>
      </div>
    </div>
  );
};
