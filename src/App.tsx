import { useState, useEffect, useMemo } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedGame } from './components/FeaturedGame';
import { CategoryFilter } from './components/CategoryFilter';
import type { CategoryType } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { GameGrid } from './components/GameGrid';
import { SurpriseSection } from './components/SurpriseSection';
import { Footer } from './components/Footer';
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

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtered games calculation
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeCategory === 'All') return true;
      return game.category === activeCategory;
    });
  }, [activeCategory, searchQuery]);

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

  const scrollToGames = () => {
    const el = document.getElementById('games');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#5B7FFF]/20 selection:text-[#5B7FFF]">
      {/* Dynamic Animated Particle Grid Canvas */}
      <BackgroundCanvas isDark={isDark} />

      {/* Floating Sticky Glass Header */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} onRandomClick={handleRandomGame} />

      {/* Main Content Area */}
      <main className="flex-grow z-10">
        {/* Hero Section with Floating Shapes & Interactive Reflex Test */}
        <HeroSection
          onExploreClick={scrollToGames}
          onRandomClick={handleRandomGame}
          onLaunchGame={handleLaunchGame}
        />

        {/* Featured Spotlight Card */}
        <FeaturedGame
          isFavorite={favorites.includes('memory')}
          onToggleFavorite={toggleFavorite}
          onPlayGame={handleLaunchGame}
        />

        {/* Category Scrollable Chips */}
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredGames.length}
        />

        {/* Responsive Mini Games Grid */}
        <GameGrid
          games={filteredGames}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onPlayGame={handleLaunchGame}
          onResetFilters={() => {
            setActiveCategory('All');
            setSearchQuery('');
          }}
        />

        {/* Surprise Me Dice Wheel Section */}
        <SurpriseSection onSpinDice={handleRandomGame} />
      </main>

      {/* Minimal Footer */}
      <Footer isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Interactive Mini-Game Modal */}
      <GameModal game={activeModalGame} onClose={() => setActiveModalGame(null)} />
    </div>
  );
}

export default App;
