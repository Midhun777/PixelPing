import React, { useState, useEffect } from 'react';
import { X, Trophy, Flame, Target, RotateCcw, Zap, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { getUserStats, resetUserStats, calculateLevelInfo, formatScreenTime } from '../../services/statsService';
import type { UserStats } from '../../services/statsService';
import { sounds } from '../../services/audio';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [activeTab, setActiveTab] = useState<'records' | 'history'>('records');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStats(getUserStats());
      setShowResetConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { level, currentXp, xpForNextLevel } = calculateLevelInfo(stats.totalXp);
  const winRate = stats.totalGamesPlayed > 0
    ? Math.round((stats.totalWins / stats.totalGamesPlayed) * 100)
    : 0;

  // Rank title logic
  let rankTitle = 'Novice Explorer';
  if (level >= 10) rankTitle = 'Grand Sovereign Explorer';
  else if (level >= 7) rankTitle = 'Master Navigator';
  else if (level >= 5) rankTitle = 'Globe Trotter';
  else if (level >= 3) rankTitle = 'Cartographer';

  const gameRecordsList = Object.values(stats.gameRecords || {});

  const handleReset = () => {
    sounds.playPop();
    const clean = resetUserStats();
    setStats(clean);
    setShowResetConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-[#0F1523]/95 border border-white/15 rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white flex flex-col max-h-[90vh]">
        {/* Top Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-80 h-80 rounded-full bg-gradient-to-r from-[#6366F1]/30 via-[#10B981]/20 to-[#F59E0B]/30 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all btn-tactile z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Banner & Level Card */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-white/10 relative z-10">
          {/* Avatar Graphic */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#6366F1] via-[#10B981] to-[#F59E0B] p-1 shadow-2xl flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#080C14] rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
              👑
            </div>
          </div>

          {/* Player Info & Level Progress */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
                Player Profile
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-xs font-extrabold uppercase tracking-wider font-display">
                LVL {level}
              </span>
            </div>

            <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-display">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{rankTitle}</span>
            </p>

            {/* XP Progress Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 max-w-md">
              <div
                className="bg-gradient-to-r from-[#6366F1] to-[#10B981] h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(currentXp / xpForNextLevel) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-1">
              {currentXp} / {xpForNextLevel} XP to Level {level + 1}
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-5 relative z-10 shrink-0">
          <div className="p-3 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase font-display mb-0.5">Screen Time</span>
            <span className="font-display font-black text-lg text-cyan-400 flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-400 inline" />
              {formatScreenTime(stats.totalScreenTimeSeconds || 0)}
            </span>
          </div>

          <div className="p-3 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase font-display mb-0.5">Wins</span>
            <span className="font-display font-black text-lg text-emerald-400 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-emerald-400 inline" />
              {stats.totalWins}
            </span>
          </div>

          <div className="p-3 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase font-display mb-0.5">Win Rate</span>
            <span className="font-display font-black text-lg text-indigo-400">
              {winRate}%
            </span>
          </div>

          <div className="p-3 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase font-display mb-0.5">Best Streak</span>
            <span className="font-display font-black text-lg text-amber-400 flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 inline" />
              {stats.globalLongestStreak}x
            </span>
          </div>

          <div className="p-3 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase font-display mb-0.5">Played</span>
            <span className="font-display font-black text-lg text-cyan-400">
              {stats.totalGamesPlayed}
            </span>
          </div>
        </div>

        {/* Tab Switcher: Records vs History */}
        <div className="flex items-center gap-2 p-1 rounded-full glass-card border border-white/10 mb-4 shrink-0">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab('records');
            }}
            className={`flex-1 py-2 rounded-full text-xs font-display font-extrabold transition-all btn-tactile ${
              activeTab === 'records'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏆 Top Game Records
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab('history');
            }}
            className={`flex-1 py-2 rounded-full text-xs font-display font-extrabold transition-all btn-tactile ${
              activeTab === 'history'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📜 Recent History
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="overflow-y-auto no-scrollbar flex-grow pr-1 space-y-3">
          {activeTab === 'records' ? (
            gameRecordsList.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-medium text-sm">
                No games played yet! Play any geography or casual game to start recording high scores.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gameRecordsList.map((record) => (
                  <div
                    key={record.gameId}
                    className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
                  >
                    <h4 className="font-display font-extrabold text-sm text-white mb-2">
                      {record.gameTitle}
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-300">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <Zap className="w-3.5 h-3.5 fill-amber-400" />
                        <span>High: {record.highScore} PTS</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Target className="w-3.5 h-3.5" />
                        <span>Acc: {record.bestAccuracy}%</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                        <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                        <span>Streak: {record.bestStreak}x</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span>Games: {record.gamesPlayed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            stats.matchHistory.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-medium text-sm">
                No match history recorded yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.matchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        item.isWin ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {item.isWin ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="font-display font-extrabold text-sm text-white">
                          {item.gameTitle}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-display font-extrabold">
                      <span className="text-amber-400">{item.score} PTS</span>
                      <span className="text-slate-300">{item.accuracyPercent}% Acc</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer Actions: Reset Stats */}
        <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between shrink-0">
          {showResetConfirm ? (
            <div className="flex items-center gap-2 w-full justify-end">
              <span className="text-xs text-rose-400 font-bold mr-auto">Reset all statistics?</span>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold shadow-md btn-tactile"
              >
                Yes, Reset
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-slate-500 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Statistics</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
