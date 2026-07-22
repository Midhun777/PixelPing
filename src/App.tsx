import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { GameGrid } from './components/GameGrid';
import { GameModal } from './components/GameModal';
import { GAMES_DATA } from './data/gamesData';
import type { GameItem } from './data/gamesData';

function App() {
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

  // Game Modal State
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

        {/* Game Cards Grid */}
        <GameGrid
          games={GAMES_DATA}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onPlayGame={handleLaunchGame}
          onResetFilters={() => {}}
        />
      </main>

      {/* Interactive Mini-Game Modal */}
      <GameModal game={activeModalGame} onClose={() => setActiveModalGame(null)} />
    </div>
  );
}

export default App;
