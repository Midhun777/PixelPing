import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GeographyHome } from './components/geography/GeographyHome';
import { CasualCategoriesGrid } from './components/CasualCategoriesGrid';
import { GameGrid } from './components/GameGrid';
import { GameModal } from './components/GameModal';
import { FeatureBanner } from './components/FeatureBanner';
import { Footer } from './components/Footer';
import { GAMES_DATA } from './data/gamesData';
import type { GameItem } from './data/gamesData';
import { sounds } from './services/audio';

function App() {
  // Navigation Tab State: 'home' | 'geography' | 'casual'
  const [activeTab, setActiveTab] = useState<'home' | 'geography' | 'casual'>('home');

  // Live Search Input State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('miniarcade_theme');
    if (saved !== null) return saved === 'dark';
    return true; // Default to sleek dark theme
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

  // Mute Sound State
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  const toggleMute = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
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

  // Filter casual games by search query and category
  const filteredCasualGames = GAMES_DATA.filter((g) => {
    const matchesSearch = searchQuery.trim() === '' ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || g.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#6366F1]/20 selection:text-[#6366F1]">
      {/* Dynamic Animated Canvas Backdrop */}
      <BackgroundCanvas isDark={isDark} />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedCategory(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Page Body Layout */}
      <main className="flex-grow z-10">
        {/* Render Hero Banner only on Home or when search is empty */}
        {activeTab === 'home' && !searchQuery && (
          <HeroSection
            onExploreGeography={() => {
              setActiveTab('geography');
              const el = document.getElementById('geography-games');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreAllGames={() => {
              setActiveTab('casual');
              const el = document.getElementById('all-games-categories');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* 1. Geography Section (Shown on Home or Geography Tab) */}
        {(activeTab === 'home' || activeTab === 'geography') && (
          <GeographyHome
            searchQuery={searchQuery}
            onViewAllClick={() => setActiveTab('geography')}
          />
        )}

        {/* 2. Casual Arcade & All Games Categories Section (Shown on Home or Casual Tab) */}
        {(activeTab === 'home' || activeTab === 'casual') && (
          <>
            <CasualCategoriesGrid
              onCategoryClick={(catId) => {
                setSelectedCategory(catId);
                setActiveTab('casual');
              }}
              onViewAllClick={() => setActiveTab('casual')}
            />

            <GameGrid
              games={filteredCasualGames}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onPlayGame={handleLaunchGame}
              onResetFilters={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            />
          </>
        )}

        {/* 3. GeoPlay Feature Callout Banner */}
        <FeatureBanner
          onStartPlayingClick={() => {
            setActiveTab('geography');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => setActiveTab(tab)} />

      {/* Casual Arcade Game Modal Overlay */}
      <GameModal game={activeModalGame} onClose={() => setActiveModalGame(null)} />
    </div>
  );
}

export default App;
