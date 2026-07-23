import React from 'react';
import { Globe, Heart, Code2, Share2 } from 'lucide-react';
import { sounds } from '../services/audio';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'geography' | 'casual') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-white/10 glass-pill py-8 px-4 sm:px-6 mt-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#10B981] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-[#6366F1] dark:text-[#818CF8]" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-none">
              PixelPing
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Explore. Learn. Play.
            </span>
          </div>
        </div>

        {/* Center: Footer Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-display font-extrabold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('home');
            }}
            className="hover:text-[#6366F1] dark:hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('geography');
            }}
            className="hover:text-[#6366F1] dark:hover:text-white transition-colors"
          >
            Geography
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('casual');
            }}
            className="hover:text-[#6366F1] dark:hover:text-white transition-colors"
          >
            Casual Games
          </button>
          <a
            href="https://github.com/Midhun777/PixelPing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6366F1] dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Right: Social Icons & Copyright */}
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-medium">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all border border-slate-200/80 dark:border-white/10"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-[#38BDF8]" />
          </a>

          <a
            href="https://github.com/Midhun777/PixelPing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all border border-slate-200/80 dark:border-white/10"
            aria-label="GitHub Repository"
          >
            <Code2 className="w-4 h-4 text-slate-200" />
          </a>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
