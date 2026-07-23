import React, { useState, useEffect } from 'react';
import { History, Play, Zap, Target, Flame } from 'lucide-react';
import { getUserStats } from '../services/statsService';
import type { MatchHistoryItem } from '../services/statsService';
import { sounds } from '../services/audio';

interface RecentlyPlayedBarProps {
  onReplayGame?: (gameTitle: string) => void;
}

export const RecentlyPlayedBar: React.FC<RecentlyPlayedBarProps> = ({ onReplayGame }) => {
  const [recentHistory, setRecentHistory] = useState<MatchHistoryItem[]>([]);

  useEffect(() => {
    const stats = getUserStats();
    setRecentHistory(stats.matchHistory || []);
  }, []);

  if (recentHistory.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 select-none animate-fade-in">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6366F1]/15 flex items-center justify-center text-[#818CF8]">
            <History className="w-4 h-4" />
          </div>
          <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
            Recently Played Games & Stats
          </h3>
        </div>

        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Last {recentHistory.length} matches
        </span>
      </div>

      {/* Horizontal Scrollable History Cards Feed */}
      <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2">
        {recentHistory.slice(0, 10).map((match) => (
          <div
            key={match.id}
            onClick={() => {
              sounds.playPop();
              onReplayGame?.(match.gameTitle);
            }}
            className="group glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shrink-0 w-64 cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white truncate group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                {match.gameTitle}
              </span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                  match.isWin
                    ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                    : 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                }`}
              >
                {match.isWin ? 'VICTORY' : 'COMPLETED'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 my-1">
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>{match.score} PTS</span>
              </div>

              <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400">
                <Target className="w-3.5 h-3.5" />
                <span>{match.accuracyPercent}% Acc</span>
              </div>

              {match.longestStreak > 1 && (
                <div className="flex items-center gap-1 text-rose-500 dark:text-rose-400">
                  <Flame className="w-3.5 h-3.5 fill-rose-400" />
                  <span>{match.longestStreak}x</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-200/60 dark:border-white/10 text-[10px] font-medium text-slate-400">
              <span>{match.timestamp}</span>
              <span className="flex items-center gap-1 text-[#6366F1] dark:text-[#818CF8] font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Play Again</span>
                <Play className="w-2.5 h-2.5 fill-current" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
