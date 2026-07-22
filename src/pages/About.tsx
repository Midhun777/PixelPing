import React from 'react';
import { Shield, BookOpen, Layers, Milestone } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-16 md:py-24 overflow-hidden">
      {/* Background gradients for premium glassmorphism effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-accent-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page title */}
        <div className="text-center mb-16">
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              GeoQuest
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Making geography discovery engaging, visual, and accessible for learners and cartography enthusiasts.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-panel rounded-2xl p-8 mb-12 shadow-premium hover:shadow-premium-hover transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Our Mission</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">
            GeoQuest was founded with a simple goal: to replace static map textbooks with interactive, exploratory tools. We believe that geography isn't just about memorizing names and borders, but about understanding coordinates, scale, and relationships.
          </p>
          <p className="text-slate-300 leading-relaxed">
            By building a high-fidelity sandbox map using open cartographical tools, GeoQuest allows you to visual-test coordinates and inspect latitude/longitude relationships instantly.
          </p>
        </div>

        {/* Tech Stack grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Tech Stack Info */}
          <div className="glass-panel rounded-2xl p-8 shadow-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-500/10 text-accent-400">
                <Layers className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">Core Technologies</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">React & TypeScript:</span>
                  <span className="text-slate-400 text-sm block">Robust, type-safe development using Vite.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">MapLibre GL JS:</span>
                  <span className="text-slate-400 text-sm block">GPU-accelerated vector/raster map rendering.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">OpenStreetMap Tiles:</span>
                  <span className="text-slate-400 text-sm block">Reliable, open-source worldwide spatial tile data.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">Tailwind CSS:</span>
                  <span className="text-slate-400 text-sm block">Clean utility-first responsive layout design.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Development Roadmap */}
          <div className="glass-panel rounded-2xl p-8 shadow-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                <Milestone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">Project Roadmap</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">Phase 1</span>
                <span className="text-slate-200 text-sm font-semibold">Interactive map & coordinates sandbox (Active)</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Phase 2</span>
                <span className="text-slate-400 text-sm">Capital & Country Guessing Quiz Module</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Phase 3</span>
                <span className="text-slate-400 text-sm">Flag Mapping Challenge & Custom Badges</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Phase 4</span>
                <span className="text-slate-400 text-sm">Leaderboards & Multiplayer Quest Room</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Open Source */}
        <div className="glass-panel rounded-2xl p-6 text-center shadow-premium">
          <p className="text-slate-400 text-sm flex items-center justify-center space-x-2">
            <Shield className="h-4 w-4 text-brand-400" />
            <span>GeoQuest runs entirely locally. We collect no tracking data and respect map privacy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
