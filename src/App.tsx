import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { GameGrid } from './components/GameGrid';
import { GameModal } from './components/GameModal';
import { GeographyHome } from './components/geography/GeographyHome';
import { GAMES_DATA } from './data/gamesData';
import type { GameItem } from './data/gamesData';
import { sounds } from './services/audio';

function App() {
  // Primary Section Tab State
  const [activeSection, setActiveSection] = useState<'geography' | 'casual'>('geography');

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('miniarcade_theme');
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('miniarcade_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('miniarcade_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('miniarcade_favorites');
    return saved ? JSON.parse(saved) : ['memory', 'reaction'];
  });

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      localStorage.setItem('miniarcade_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Casual Game Modal State
  const [activeModalGame, setActiveModalGame] = useState<GameItem | null>(null);

  const handleLaunchGame = (gameId: string) => {
    const target = GAMES_DATA.find((g) => g.id === gameId);
    if (target) {
      setActiveModalGame(target);
    }
  };

  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * GAMES_DATA.length);
    const randomGame = GAMES_DATA[randomIndex];
    setActiveModalGame(randomGame);
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#5B7FFF]/20 selection:text-[#5B7FFF] pb-12">
      {/* Dynamic Animated Particle Grid Canvas */}
      <BackgroundCanvas isDark={isDark} />

      {/* Main Content Area */}
      <main className="flex-grow z-10">
        {/* Playful PIXEL PING Header Title & Quick Controls */}
        <HeroSection
          onExploreClick={() => {}}
          onRandomClick={handleRandomGame}
          onLaunchGame={handleLaunchGame}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        {/* Primary Platform Section Switcher Bar */}
        <div className="max-w-md mx-auto px-4 mb-6 relative z-20">
          <div className="p-1.5 rounded-2xl glass-card border border-white/60 dark:border-white/10 shadow-xl flex items-center justify-center gap-1.5">
            <button
              onClick={() => {
                sounds.playPop();
                setActiveSection('geography');
              }}
              className={`flex-1 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeSection === 'geography'
                  ? 'bg-gradient-to-r from-[#5B7FFF] to-[#27D980] text-slate-950 shadow-lg scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🌍 Geography Games</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/20 font-bold">
                FEATURED
              </span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setActiveSection('casual');
              }}
              className={`flex-1 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeSection === 'casual'
                  ? 'bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white shadow-lg scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🎮 Casual Games</span>
            </button>
          </div>
        </div>

        {/* Dynamic Section Content */}
        {activeSection === 'geography' ? (
          <GeographyHome />
        ) : (
          <GameGrid
            games={GAMES_DATA}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onPlayGame={handleLaunchGame}
            onResetFilters={() => {}}
          />
        )}
      </main>

      {/* Interactive Mini-Game Modal */}
      <GameModal game={activeModalGame} onClose={() => setActiveModalGame(null)} />
    </div>
  );
}

export default App;
