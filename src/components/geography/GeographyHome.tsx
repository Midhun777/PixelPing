import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Globe } from 'lucide-react';
import { GEOGRAPHY_GAMES, preloadAllFlags } from '../../data/geographyData';
import type { GeographyGameMeta } from '../../data/geographyData';
import { GameSetupModal } from './GameSetupModal';
import type { GameSetupConfig } from './GameSetupModal';
import { GeographyGameEngine } from './GeographyGameEngine';
import { sounds } from '../../services/audio';

interface GeographyHomeProps {
  searchQuery?: string;
  onViewAllClick?: () => void;
}

export const GeographyHome: React.FC<GeographyHomeProps> = ({
  searchQuery = '',
  onViewAllClick,
}) => {
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

  // Filter games by category and search query
  const filteredGames = GEOGRAPHY_GAMES.filter((g) => {
    const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <section id="geography-games" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      {/* Section Header matching Reference: Title + "View all ->" */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#6366F1] dark:text-[#818CF8]" />
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Geography Games
          </h2>
        </div>

        {onViewAllClick && (
          <button
            onClick={() => {
              sounds.playPop();
              onViewAllClick();
            }}
            className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#6366F1] dark:text-[#818CF8] hover:text-[#4F46E5] transition-colors group"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Category Filter Chips Bar */}
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
              className={`px-4 py-2 rounded-full text-xs font-display font-extrabold transition-all shrink-0 border btn-tactile ${
                isActive
                  ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-md scale-105'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-[#6366F1]/40'
              }`}
            >
              {cat === 'All' ? '🌍 All Geography' : cat}
            </button>
          );
        })}
      </div>

      {/* Portrait Cards Grid Matching GeoPlay Reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleCardClick(game)}
            className="group glass-card rounded-[24px] p-5 border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between items-center text-center"
          >
            {/* Top 3D Icon Container Centered */}
            <div className="w-full flex flex-col items-center mb-4">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${game.gradient} bg-opacity-20 p-0.5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex items-center justify-center mb-3 relative overflow-hidden`}>
                <div className="w-full h-full bg-[#F8FAFC]/90 dark:bg-[#0F1523]/90 rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
                  {game.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                {game.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-normal line-clamp-2">
                {game.description}
              </p>
            </div>

            {/* Bottom Row matching reference: Difficulty Badge + Circular ▶ Play Button */}
            <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 z-10">
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  game.difficulty === 'Easy'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : game.difficulty === 'Medium'
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20'
                }`}
              >
                {game.difficulty}
              </span>

              {/* Circular Play Button ▶ */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-md group-hover:scale-110 active:scale-95 transition-all btn-tactile"
              >
                <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
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
    </section>
  );
};
