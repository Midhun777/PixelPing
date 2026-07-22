import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { GEOGRAPHY_GAMES, preloadAllFlags } from '../../data/geographyData';
import type { GeographyGameMeta } from '../../data/geographyData';
import { GameSetupModal } from './GameSetupModal';
import type { GameSetupConfig } from './GameSetupModal';
import { GeographyGameEngine } from './GeographyGameEngine';
import { sounds } from '../../services/audio';

export const GeographyHome: React.FC = () => {
  useEffect(() => {
    preloadAllFlags();
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSetupGame, setSelectedSetupGame] = useState<GeographyGameMeta | null>(null);
  const [activeGameSession, setActiveGameSession] = useState<{
    game: GeographyGameMeta;
    config: GameSetupConfig;
  } | null>(null);

  const categories = ['All', 'Flags', 'Capitals', 'Cities', 'Continents', 'Population', 'Landmarks', 'Rivers', 'Mountains', 'Mixed'];

  const filteredGames = activeCategory === 'All'
    ? GEOGRAPHY_GAMES
    : GEOGRAPHY_GAMES.filter((g) => g.category === activeCategory);

  const handleCardClick = (game: GeographyGameMeta) => {
    sounds.playPop();
    setSelectedSetupGame(game);
  };

  const handleStartGame = (config: GameSetupConfig) => {
    if (selectedSetupGame) {
      setActiveGameSession({ game: selectedSetupGame, config });
      setSelectedSetupGame(null);
    }
  };

  if (activeGameSession) {
    return (
      <GeographyGameEngine
        game={activeGameSession.game}
        config={activeGameSession.config}
        onReturnHome={() => setActiveGameSession(null)}
        onChangeSettings={() => {
          setSelectedSetupGame(activeGameSession.game);
          setActiveGameSession(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 select-none">
      {/* Category Scrollable Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sounds.playPop();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white border-[#5B7FFF] shadow-lg shadow-[#5B7FFF]/30 scale-105'
                : 'glass-card text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-white/10 hover:border-[#5B7FFF]/40'
            }`}
          >
            {cat === 'All' ? '🌍 All Geography' : cat}
          </button>
        ))}
      </div>

      {/* Geography Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleCardClick(game)}
            className="group glass-card rounded-[24px] p-6 border border-white/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Ambient Background Gradient Accent */}
            <div className={`absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-gradient-to-br ${game.gradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`} />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-[11px] font-bold">
                  {game.category}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF]">
                  {game.difficulty}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-4 mb-3 z-10 relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0`}>
                  {game.icon}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-snug group-hover:text-[#5B7FFF] dark:group-hover:text-[#6C8DFF] transition-colors">
                    {game.title}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    ⏱️ {game.estimatedTime}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 z-10 relative">
                {game.description}
              </p>
            </div>

            {/* Play Button */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 z-10 relative">
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white font-bold text-xs shadow-md group-hover:shadow-lg group-hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Game</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pre-Game Setup Modal */}
      <GameSetupModal
        game={selectedSetupGame}
        onClose={() => setSelectedSetupGame(null)}
        onStartGame={handleStartGame}
      />
    </div>
  );
};
