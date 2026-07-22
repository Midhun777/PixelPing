import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
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
    <div
      onClick={() => {
        sounds.playPop();
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg bg-slate-900/90 dark:bg-slate-900/95 rounded-[32px] p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Background Ambient Glow */}
        <div
          className={`absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-gradient-to-br ${game.gradient} opacity-20 blur-3xl pointer-events-none`}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-2xl shadow-lg shadow-black/20 shrink-0`}
            >
              {game.icon}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                  {game.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  {game.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Instant Play
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            aria-label="Close Game Modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-300 hover:scale-110 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playable Game Body */}
        <div className="relative z-10 overflow-y-auto no-scrollbar py-1">
          {renderGameContent()}
        </div>
      </div>
    </div>
  );
};
