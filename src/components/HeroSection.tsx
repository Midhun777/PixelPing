import React from 'react';
import { Globe, Gamepad2, Compass, MapPin, Navigation } from 'lucide-react';
import { sounds } from '../services/audio';

interface HeroSectionProps {
  onExploreGeography: () => void;
  onExploreAllGames: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGeography,
  onExploreAllGames,
}) => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#6366F1]/20 via-[#10B981]/15 to-[#F59E0B]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Bold Hero Headline & Call to Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-slate-200/80 dark:border-white/10 text-xs font-extrabold text-slate-700 dark:text-slate-300 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-display">WORLD GEOGRAPHY & ARCADE PLATFORM</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-slate-900 dark:text-white mb-6">
            Play. Learn.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#38BDF8] block sm:inline">
              Explore the World.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-medium leading-relaxed mb-8">
            Fun geography games to test your knowledge, master flags, capitals, and explore the world in a whole new interactive way.
          </p>

          {/* Action Button Row matching reference */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => {
                sounds.playPop();
                onExploreGeography();
              }}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-display font-extrabold text-sm shadow-xl shadow-[#6366F1]/25 flex items-center gap-2.5 btn-tactile"
            >
              <span>Explore Geography</span>
              <Globe className="w-4.5 h-4.5 fill-white/20" />
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                onExploreAllGames();
              }}
              className="px-6 py-3.5 rounded-full glass-pill text-slate-800 dark:text-slate-100 font-display font-extrabold text-sm border border-slate-200/80 dark:border-white/15 flex items-center gap-2.5 btn-tactile hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <span>All Games</span>
              <Gamepad2 className="w-4.5 h-4.5 text-[#6366F1] dark:text-[#818CF8]" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Graphic & Floating Interactive World Elements */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Main Glowing Globe Backdrop Container */}
          <div className="w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-[#6366F1]/20 via-[#10B981]/30 to-[#F59E0B]/20 p-2 relative shadow-2xl animate-float-slow flex items-center justify-center border border-white/20 backdrop-blur-xl">
            {/* Center Globe Sphere Graphic */}
            <div className="w-full h-full rounded-full bg-slate-900/90 border border-white/20 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group">
              <div className="text-8xl sm:text-9xl group-hover:scale-110 transition-transform duration-700 select-none">
                🌍
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#6366F1]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Element 1: Compass Badge */}
            <div className="absolute -top-4 -left-4 p-3 rounded-2xl glass-card border border-white/20 shadow-xl animate-float-reverse flex items-center gap-2 text-xs font-extrabold text-white">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Compass</span>
            </div>

            {/* Floating Element 2: Map Pin Badge */}
            <div className="absolute top-1/3 -right-6 p-3 rounded-2xl glass-card border border-white/20 shadow-xl animate-float-slow flex items-center gap-2 text-xs font-extrabold text-white">
              <MapPin className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              <span>Capital Sprint</span>
            </div>

            {/* Floating Element 3: Paper Plane */}
            <div className="absolute -bottom-4 left-1/4 p-3 rounded-2xl glass-card border border-white/20 shadow-xl animate-float-reverse flex items-center gap-2 text-xs font-extrabold text-white">
              <Navigation className="w-5 h-5 text-cyan-400" />
              <span>Explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
