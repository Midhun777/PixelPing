import React from 'react';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { sounds } from '../services/audio';

export interface GameCategoryItem {
  id: string;
  name: string;
  count: number;
  icon: string;
  gradient: string;
}

export const CASUAL_CATEGORIES: GameCategoryItem[] = [
  { id: 'puzzle', name: 'Puzzle', count: 12, icon: '🧩', gradient: 'from-[#6366F1] to-[#818CF8]' },
  { id: 'arcade', name: 'Arcade', count: 18, icon: '🕹️', gradient: 'from-[#10B981] to-[#34D399]' },
  { id: 'strategy', name: 'Strategy', count: 10, icon: '♞', gradient: 'from-[#F59E0B] to-[#FBBF24]' },
  { id: 'memory', name: 'Memory', count: 8, icon: '🧠', gradient: 'from-[#EC4899] to-[#F43F5E]' },
  { id: 'word', name: 'Word', count: 9, icon: '🔤', gradient: 'from-[#06B6D4] to-[#38BDF8]' },
  { id: 'other', name: 'Other', count: 7, icon: '⭐', gradient: 'from-[#8B5CF6] to-[#A855F7]' },
];

interface CasualCategoriesGridProps {
  onCategoryClick?: (categoryId: string) => void;
  onViewAllClick?: () => void;
}

export const CasualCategoriesGrid: React.FC<CasualCategoriesGridProps> = ({
  onCategoryClick,
  onViewAllClick,
}) => {
  return (
    <section id="all-games-categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      {/* Section Header matching Reference: Title + "View all ->" */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-[#6366F1] dark:text-[#818CF8]" />
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            All Games
          </h2>
        </div>

        {onViewAllClick && (
          <button
            onClick={() => {
              sounds.playPop();
              onViewAllClick();
            }}
            className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#6366F1] dark:text-[#818CF8] hover:text-[#4F46E5] transition-colors group"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Categories Grid matching reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {CASUAL_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              sounds.playPop();
              onCategoryClick?.(cat.id);
            }}
            className="group glass-card rounded-[24px] p-5 border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center"
          >
            {/* Centered 3D Icon Container */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br ${cat.gradient} bg-opacity-15 p-0.5 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mb-3`}>
              <div className="w-full h-full bg-[#F8FAFC]/90 dark:bg-[#0F1523]/90 rounded-[22px] flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                {cat.icon}
              </div>
            </div>

            <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
              {cat.name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {cat.count} games
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
