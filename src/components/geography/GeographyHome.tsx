import React, { useState, useEffect } from 'react';
import { Play, BookOpen } from 'lucide-react';
import { GEOGRAPHY_GAMES, preloadAllFlags } from '../../data/geographyData';
import type { GeographyGameMeta } from '../../data/geographyData';
import { GameSetupModal } from './GameSetupModal';
import type { GameSetupConfig } from './GameSetupModal';
import { GeographyGameEngine } from './GeographyGameEngine';
import { PureCountryTypingEngine } from './PureCountryTypingEngine';
import { CountryAtlasModal } from './CountryAtlasModal';
import { sounds } from '../../services/audio';

interface GeographyHomeProps {
  searchQuery?: string;
  onViewAllClick?: () => void;
  isAtlasOpenProp?: boolean;
  onToggleAtlasProp?: (open: boolean) => void;
}

export const GeographyHome: React.FC<GeographyHomeProps> = ({
  searchQuery = '',
  onViewAllClick: _onViewAllClick,
  isAtlasOpenProp,
  onToggleAtlasProp,
}) => {
  useEffect(() => {
    preloadAllFlags();
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSetupGame, setSelectedSetupGame] = useState<GeographyGameMeta | null>(null);
  const [internalAtlasOpen, setInternalAtlasOpen] = useState<boolean>(false);

  const isAtlasOpen = isAtlasOpenProp !== undefined ? isAtlasOpenProp : internalAtlasOpen;
  const setAtlasOpen = (val: boolean) => {
    if (onToggleAtlasProp) onToggleAtlasProp(val);
    setInternalAtlasOpen(val);
  };

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

  const [isPureTypingActive, setIsPureTypingActive] = useState<boolean>(false);

  const handleCardClick = (game: GeographyGameMeta) => {
    sounds.playPop();
    if (game.id === 'pure_country_typing') {
      setIsPureTypingActive(true);
    } else {
      setSelectedSetupGame(game);
    }
  };

  const handleStartGame = (config: GameSetupConfig) => {
    if (selectedSetupGame) {
      setActiveGameSession({ game: selectedSetupGame, config });
      setSelectedSetupGame(null);
    }
  };

  if (isPureTypingActive) {
    const pureGame = GEOGRAPHY_GAMES.find((g) => g.id === 'pure_country_typing') || GEOGRAPHY_GAMES[0];
    return (
      <PureCountryTypingEngine
        game={pureGame}
        onReturnHome={() => setIsPureTypingActive(false)}
      />
    );
  }

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-[10px] font-extrabold uppercase tracking-wider font-display">
              Core Specialty
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            World Geography Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Explore 195+ world countries, flags, capitals, landmarks & population duels
          </p>
        </div>

        {/* Highlighted Open Atlas Encyclopedia Button */}
        <button
          onClick={() => {
            sounds.playPop();
            setAtlasOpen(true);
          }}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-slate-950 font-display font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 btn-tactile flex items-center gap-2 border border-white/20 hover:scale-105 transition-all"
        >
          <BookOpen className="w-4 h-4 text-slate-950" />
          <span>Open Atlas Encyclopedia 🌐</span>
        </button>
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

      {/* World Geography Atlas & Reference Encyclopedia Modal */}
      <CountryAtlasModal
        isOpen={isAtlasOpen}
        onClose={() => setAtlasOpen(false)}
      />
    </section>
  );
};
