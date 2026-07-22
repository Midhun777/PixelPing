import React, { useEffect } from 'react';
import { Trophy, RefreshCw, Home, Settings2, Award, Zap, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

export interface GameResultsStats {
  gameTitle: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyPercent: number;
  longestStreak: number;
  averageTimeSeconds: number;
}

interface GameResultsScreenProps {
  stats: GameResultsStats;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  onReturnHome: () => void;
}

export const GameResultsScreen: React.FC<GameResultsScreenProps> = ({
  stats,
  onPlayAgain,
  onChangeSettings,
  onReturnHome,
}) => {
  useEffect(() => {
    sounds.playVictory();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
  }, []);

  const getPerformanceBadge = () => {
    if (stats.accuracyPercent >= 90) return { title: '🌍 Master Cartographer', color: 'from-amber-400 to-yellow-500' };
    if (stats.accuracyPercent >= 75) return { title: '⚡ Lightning Navigator', color: 'from-[#5B7FFF] to-indigo-500' };
    if (stats.accuracyPercent >= 50) return { title: '🧭 Global Explorer', color: 'from-[#27D980] to-emerald-600' };
    return { title: '🗺️ Geography Rookie', color: 'from-rose-400 to-pink-600' };
  };

  const badge = getPerformanceBadge();

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/95 rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden text-white text-center animate-in zoom-in-95 duration-200">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-[#5B7FFF]/20 blur-3xl pointer-events-none" />

      {/* Performance Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold uppercase tracking-wider mb-4">
        <Award className="w-4 h-4 text-amber-400" />
        <span>{badge.title}</span>
      </div>

      {/* Score Header */}
      <div className="flex flex-col items-center mb-6">
        <Trophy className="w-14 h-14 text-amber-400 drop-shadow-md mb-2 animate-bounce" />
        <h2 className="font-display font-black text-5xl text-amber-400 drop-shadow-md">{stats.score}</h2>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Points</span>
      </div>

      {/* Stats Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4" /> Accuracy
          </div>
          <span className="font-display font-black text-2xl text-emerald-400">{stats.accuracyPercent}%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
            <Zap className="w-4 h-4" /> Max Streak
          </div>
          <span className="font-display font-black text-2xl text-amber-400">{stats.longestStreak} 🔥</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-[#5B7FFF] text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4" /> Correct Answers
          </div>
          <span className="font-display font-black text-xl">{stats.correctAnswers}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-1">
            <XCircle className="w-4 h-4" /> Wrong Answers
          </div>
          <span className="font-display font-black text-xl">{stats.wrongAnswers}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            onPlayAgain();
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              sounds.playPop();
              onChangeSettings();
            }}
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/10"
          >
            <Settings2 className="w-4 h-4 text-amber-400" />
            <span>Setup Options</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onReturnHome();
            }}
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/10"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
