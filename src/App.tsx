import { useState, useEffect } from 'react';
import { Globe, Gamepad2 } from 'lucide-react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { GeographyHome } from './components/geography/GeographyHome';
import { CountryAtlasModal } from './components/geography/CountryAtlasModal';
import { CasualCategoriesGrid } from './components/CasualCategoriesGrid';
import { GameGrid } from './components/GameGrid';
import { GameModal } from './components/GameModal';
import { RecentlyPlayedBar } from './components/RecentlyPlayedBar';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { GAMES_DATA } from './data/gamesData';
import type { GameItem } from './data/gamesData';
import { sounds } from './services/audio';
import { addScreenTimeSeconds } from './services/statsService';

function App() {
  // Navigation Tab State: 'geography' | 'casual'
  const [activeTab, setActiveTab] = useState<'geography' | 'casual'>('geography');

  // Live Search Input State
  const [searchQuery] = useState<string>('');

  // Selected Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Profile Modal Open State
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // World Atlas Modal State
  const [isAtlasOpen, setIsAtlasOpen] = useState<boolean>(false);

  // Handle URL Hash Page Routing for shareable navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'arcade') {
        setActiveTab('casual');
      } else if (hash === 'geography') {
        setActiveTab('geography');
      } else if (hash === 'atlas') {
        setActiveTab('geography');
        setIsAtlasOpen(true);
      } else if (hash === 'profile') {
        setIsProfileOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Screen Time Tracker (increments 5s every 5s)
  useEffect(() => {
    const interval = setInterval(() => {
      addScreenTimeSeconds(5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Cosmic Interactive Particle Canvas Background */}
      <BackgroundCanvas isDark={isDark} />

      {/* Top Header Navbar */}
      <Navbar
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAtlas={() => setIsAtlasOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Page Body Layout */}
      <main className="flex-grow z-10 pt-4 sm:pt-6">
        {/* Floating Game Type Switcher Pill Bar (Positioned Outside Navbar) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-center select-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full glass-card border border-slate-200/80 dark:border-white/15 shadow-xl backdrop-blur-2xl">
            <button
              onClick={() => {
                sounds.playPop();
                window.location.hash = 'geography';
                setActiveTab('geography');
                setSelectedCategory(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-extrabold transition-all btn-tactile flex items-center gap-2 ${
                activeTab === 'geography'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-lg shadow-[#6366F1]/30 scale-105'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Geography Games</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                window.location.hash = 'arcade';
                setActiveTab('casual');
                setSelectedCategory(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-extrabold transition-all btn-tactile flex items-center gap-2 ${
                activeTab === 'casual'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-lg shadow-[#6366F1]/30 scale-105'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Casual Arcade</span>
            </button>
          </div>
        </div>

        {/* 1. Geography Section */}
        {activeTab === 'geography' && (
          <GeographyHome
            searchQuery={searchQuery}
            onViewAllClick={() => setActiveTab('geography')}
            isAtlasOpenProp={isAtlasOpen}
            onToggleAtlasProp={(open) => setIsAtlasOpen(open)}
          />
        )}

        {/* 2. Casual Arcade & Categories Section */}
        {activeTab === 'casual' && (
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
                setSelectedCategory(null);
              }}
            />
          </>
        )}

        {/* Recently Played History Feed Bar (Positioned at Bottom of Page) */}
        <RecentlyPlayedBar />
      </main>

      {/* User Profile & Statistics Dashboard Modal */}
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* World Atlas Reference Modal */}
      <CountryAtlasModal isOpen={isAtlasOpen} onClose={() => setIsAtlasOpen(false)} />

      {/* Casual Arcade Game Modal Overlay */}
      <GameModal game={activeModalGame} onClose={() => setActiveModalGame(null)} />
    </div>
  );
}

export default App;
