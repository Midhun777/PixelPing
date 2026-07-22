import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, Navigation, Award, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-slate-950 text-slate-100">
      {/* Background gradients for premium glassmorphism effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-8 animate-pulse">
          <Zap className="h-3.5 w-3.5" />
          <span>Welcome to the future of Geography Learning</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none max-w-4xl">
          Unlock the Secrets of the{' '}
          <span className="bg-gradient-to-r from-brand-400 via-accent-300 to-accent-400 bg-clip-text text-transparent">
            Globe
          </span>
        </h1>

        {/* Hero Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Embark on an interactive quest to master world geography, map coordinates, and explore the planet's wonders. Learning geography has never been this immersive.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/explore"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-slate-950 font-bold bg-gradient-to-r from-brand-400 to-accent-400 hover:from-brand-300 hover:to-accent-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-premium hover:shadow-premium-hover flex items-center justify-center space-x-2 group"
          >
            <span>Start Exploring</span>
            <Compass className="h-5 w-5 text-slate-950 group-hover:rotate-95 transition-transform duration-300" />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-slate-200 font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all duration-300 flex items-center justify-center"
          >
            Learn More
          </Link>
        </div>

        {/* Interactive Feature Highlights */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 group hover:shadow-premium">
            <div className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-all mb-5">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Interactive Sandbox</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore a full-screen interactive world map. Click anywhere to discover precise coordinates and coordinates feedback instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 group hover:shadow-premium">
            <div className="p-3.5 rounded-xl bg-accent-500/10 text-accent-400 group-hover:bg-accent-500/20 transition-all mb-5">
              <Navigation className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">OSM Cartography</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Powered by MapLibre GL and OpenStreetMap tiles. Experience ultra-smooth zooming, panning, and modern map style interactions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 group hover:shadow-premium">
            <div className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-all mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Gamified Quizzes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Challenge yourself with interactive capital guessing and flag mapping modules (coming soon in the next release!).
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
