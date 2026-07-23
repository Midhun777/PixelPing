import React from 'react';
import { Rocket, Map, Compass, Navigation, Globe } from 'lucide-react';
import { sounds } from '../services/audio';

interface FeatureBannerProps {
  onStartPlayingClick: () => void;
}

export const FeatureBanner: React.FC<FeatureBannerProps> = ({ onStartPlayingClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      <div className="glass-card rounded-[32px] p-8 sm:p-12 border border-slate-200/80 dark:border-white/15 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#6366F1]/10 via-[#10B981]/10 to-[#F59E0B]/10">
        {/* Left Side: 3D Backpack & Explorer Illustrations */}
        <div className="flex items-center justify-center shrink-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-[#6366F1] to-[#10B981] p-1 shadow-2xl rotate-3 hover:rotate-6 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#080C14] rounded-[22px] flex flex-col items-center justify-center text-5xl sm:text-6xl shadow-inner relative overflow-hidden">
              <span>🎒</span>
              <div className="absolute -bottom-2 -right-2 text-2xl">📸</div>
            </div>
          </div>
        </div>

        {/* Center: Main Callout Message & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-grow">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Learn geography.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#38BDF8]">
              Have fun.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-xl mb-6">
            Simple games, real learning, endless exploration. Master flags, capitals, and landmarks at your own speed.
          </p>

          <button
            onClick={() => {
              sounds.playPop();
              onStartPlayingClick();
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-display font-extrabold text-sm shadow-xl shadow-[#6366F1]/25 flex items-center gap-2.5 btn-tactile"
          >
            <span>Start Playing</span>
            <Rocket className="w-4.5 h-4.5 fill-white/20" />
          </button>
        </div>

        {/* Right Side: Wooden Directional Signpost Graphic ("Asia", "Europe", "Americas", "Oceania") */}
        <div className="flex flex-col items-center gap-2 shrink-0 select-none">
          <div className="flex flex-col items-center gap-1.5 font-display font-black text-xs text-white">
            <div className="px-5 py-2 rounded-xl bg-amber-700/80 border border-amber-500/30 shadow-md rotate-2 flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Asia</span>
            </div>
            <div className="px-5 py-2 rounded-xl bg-amber-800/80 border border-amber-500/30 shadow-md -rotate-3 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-emerald-300" />
              <span>Europe</span>
            </div>
            <div className="px-5 py-2 rounded-xl bg-amber-700/80 border border-amber-500/30 shadow-md rotate-1 flex items-center gap-2">
              <Map className="w-3.5 h-3.5 text-cyan-300" />
              <span>Americas</span>
            </div>
            <div className="px-5 py-2 rounded-xl bg-amber-800/80 border border-amber-500/30 shadow-md -rotate-2 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-rose-300" />
              <span>Oceania</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
