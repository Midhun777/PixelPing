import React from 'react';
import { Gamepad2, Cpu, Smartphone, Volume2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-card rounded-[24px] p-8 border border-white/60 dark:border-white/10 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/60 dark:divide-slate-800">
          <div className="flex flex-col items-center p-2">
            <Gamepad2 className="w-6 h-6 text-[#5B7FFF] mb-2" />
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              8 Mini Games
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Playable Instant Demos
            </span>
          </div>

          <div className="flex flex-col items-center p-2 pt-4 md:pt-2">
            <Cpu className="w-6 h-6 text-[#27D980] mb-2" />
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              100% Local
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Client-Side Web Audio & Logic
            </span>
          </div>

          <div className="flex flex-col items-center p-2 pt-4 md:pt-2">
            <Smartphone className="w-6 h-6 text-amber-500 mb-2" />
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Touch & Keyboard
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Thumb-Friendly Layout
            </span>
          </div>

          <div className="flex flex-col items-center p-2 pt-4 md:pt-2">
            <Volume2 className="w-6 h-6 text-indigo-400 mb-2" />
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Audio Feedback
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Web Audio Synthesizer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
