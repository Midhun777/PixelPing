import React, { useState, useEffect } from 'react';
import { Play, Clock } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 select-none">
      {/* Category Scrollable Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sounds.playPop();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-display font-extrabold transition-all duration-300 shrink-0 border btn-tactile ${
                isActive
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white border-[#6366F1] shadow-lg shadow-[#6366F1]/25 scale-105'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-[#6366F1]/40 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {cat === 'All' ? '🌍 All Geography' : cat}
            </button>
          );
        })}
      </div>

      {/* Geography Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleCardClick(game)}
            className="group glass-card rounded-[28px] p-6 border border-slate-200/80 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Ambient Background Gradient Accent */}
            <div className={`absolute top-0 right-0 -mr-14 -mt-14 w-44 h-44 rounded-full bg-gradient-to-br ${game.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />

            <div>
              {/* Card Top Header Badges */}
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-[11px] font-extrabold uppercase tracking-wider">
                  {game.category}
                </span>

                <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full border ${
                  game.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : game.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    : game.difficulty === 'Hard'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                }`}>
                  {game.difficulty}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-3 z-10 relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0`}>
                  {game.icon}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-snug group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>{game.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 z-10 relative font-medium">
                {game.description}
              </p>
            </div>

            {/* Tactile Play Button */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 z-10 relative">
              <button
                type="button"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-display font-extrabold text-xs shadow-md group-hover:shadow-lg transition-all flex items-center justify-center gap-2 btn-tactile uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Game Now</span>
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
