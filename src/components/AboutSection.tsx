import React from 'react';
import { Smartphone, Zap, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] dark:text-[#6C8DFF] uppercase tracking-widest">
          Platform Design
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-3 mb-4">
          Minimal UI & Tactile Motion
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          PixelPing is a lightweight collection of interactive browser games built for quick gameplay across all modern devices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-[24px] p-6 border border-white/60 dark:border-white/10 shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5B7FFF] to-[#4364F7] flex items-center justify-center text-white mb-4 shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
            Mobile-First Ergonomics
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Designed for smartphone screens with generous touch targets, smooth gestures, and thumb-friendly navigation.
          </p>
        </div>

        <div className="glass-card rounded-[24px] p-6 border border-white/60 dark:border-white/10 shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#27D980] to-emerald-600 flex items-center justify-center text-slate-950 mb-4 shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
            Client-Side Performance
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All game logic, audio synthesis, and animations render locally in the browser with zero external redirects.
          </p>
        </div>

        <div className="glass-card rounded-[24px] p-6 border border-white/60 dark:border-white/10 shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD84D] to-amber-500 flex items-center justify-center text-slate-950 mb-4 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
            Privacy-First Architecture
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            No user tracking, no paywalls, and no third-party advertisements.
          </p>
        </div>
      </div>
    </section>
  );
};
