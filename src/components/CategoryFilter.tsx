import React from 'react';
import { sounds } from '../services/audio';

export type CategoryType =
  | 'All'
  | 'Memory'
  | 'Speed'
  | 'Geography'
  | 'Puzzle'
  | 'Logic'
  | 'Strategy'
  | 'Educational';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

const CATEGORIES: { label: CategoryType; icon: string }[] = [
  { label: 'All', icon: '✨' },
  { label: 'Memory', icon: '🧩' },
  { label: 'Speed', icon: '⚡' },
  { label: 'Geography', icon: '🌍' },
  { label: 'Puzzle', icon: '🎲' },
  { label: 'Logic', icon: '💡' },
  { label: 'Strategy', icon: '🎯' },
  { label: 'Educational', icon: '📚' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-8 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 pb-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => {
                sounds.playPop();
                onSelectCategory(cat.label);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 select-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white shadow-lg shadow-[#5B7FFF]/30 scale-105'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-102'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
