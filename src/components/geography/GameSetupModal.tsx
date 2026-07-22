import React, { useState } from 'react';
import { X, Play, Settings2, Globe, Clock, Heart, HelpCircle } from 'lucide-react';
import type { GeographyGameMeta } from '../../data/geographyData';
import { sounds } from '../../services/audio';

export interface GameSetupConfig {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  answerMode: 'multiple_choice' | 'typing';
  questionCount: number; // 5, 10, 20, 30, 50, -1 (unlimited)
  timeModeSeconds: number; // 0 (no timer), 30, 60, 90, 120
  lives: number; // -1 (unlimited), 1 (sudden death), 3, 5
  regionFilter: 'World' | 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania';
}

interface GameSetupModalProps {
  game: GeographyGameMeta | null;
  onClose: () => void;
  onStartGame: (config: GameSetupConfig) => void;
}

export const GameSetupModal: React.FC<GameSetupModalProps> = ({ game, onClose, onStartGame }) => {
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert'>(game?.difficulty || 'Medium');
  const [answerMode, setAnswerMode] = useState<'multiple_choice' | 'typing'>('multiple_choice');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeModeSeconds, setTimeModeSeconds] = useState<number>(60);
  const [lives, setLives] = useState<number>(-1);
  const [regionFilter, setRegionFilter] = useState<'World' | 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania'>('World');

  if (!game) return null;

  const handleStart = () => {
    sounds.playPop();
    onStartGame({
      difficulty,
      answerMode,
      questionCount,
      timeModeSeconds,
      lives,
      regionFilter,
    });
  };

  return (
    <div
      onClick={() => {
        sounds.playPop();
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-slate-900/95 rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] text-white select-none"
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br ${game.gradient} opacity-20 blur-3xl pointer-events-none`} />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
              {game.icon}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl text-white tracking-tight">{game.title}</h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {game.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Customize your session setup</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500 flex items-center justify-center text-slate-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Settings Body */}
        <div className="relative z-10 overflow-y-auto no-scrollbar space-y-6 pr-1">
          {/* 1. Answer Mode Toggle */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#5B7FFF]" /> Answer Input Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setAnswerMode('multiple_choice');
                }}
                className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  answerMode === 'multiple_choice'
                    ? 'bg-[#5B7FFF] text-white border-[#5B7FFF] shadow-lg shadow-[#5B7FFF]/30 scale-[1.02]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>🔘 4 Multiple Choice</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setAnswerMode('typing');
                }}
                className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  answerMode === 'typing'
                    ? 'bg-[#5B7FFF] text-white border-[#5B7FFF] shadow-lg shadow-[#5B7FFF]/30 scale-[1.02]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>⌨️ Type Answer</span>
              </button>
            </div>
          </div>

          {/* 2. Difficulty Chips */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-amber-400" /> Difficulty Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Easy', 'Medium', 'Hard', 'Expert'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setDifficulty(diff);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === diff
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-105'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Number of Questions */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Number of Questions
            </label>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 30, 50, -1].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setQuestionCount(cnt);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    questionCount === cnt
                      ? 'bg-[#27D980] text-slate-950 border-[#27D980] shadow-md scale-105'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cnt === -1 ? '♾️ Unlimited' : `${cnt} Qs`}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Timer Mode & Lives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Timer Mode
              </label>
              <select
                value={timeModeSeconds}
                onChange={(e) => {
                  sounds.playPop();
                  setTimeModeSeconds(Number(e.target.value));
                }}
                className="w-full bg-slate-800 text-white rounded-xl p-3 text-xs font-bold border border-white/10 focus:outline-none focus:border-[#5B7FFF]"
              >
                <option value={0}>⏳ No Timer (Relaxed)</option>
                <option value={30}>⚡ 30 Seconds</option>
                <option value={60}>⏱️ 60 Seconds</option>
                <option value={90}>⌛ 90 Seconds</option>
                <option value={120}>⏰ 120 Seconds</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Lives Mode
              </label>
              <select
                value={lives}
                onChange={(e) => {
                  sounds.playPop();
                  setLives(Number(e.target.value));
                }}
                className="w-full bg-slate-800 text-white rounded-xl p-3 text-xs font-bold border border-white/10 focus:outline-none focus:border-[#5B7FFF]"
              >
                <option value={-1}>❤️ Unlimited Lives</option>
                <option value={5}>❤️❤️❤️❤️❤️ 5 Lives</option>
                <option value={3}>❤️❤️❤️ 3 Lives</option>
                <option value={1}>💀 Sudden Death (1 Life)</option>
              </select>
            </div>
          </div>

          {/* 5. Region Filter */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" /> Region Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {(['World', 'Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'] as const).map(
                (reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setRegionFilter(reg);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      regionFilter === reg
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-105'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {reg}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Start Game Action Button */}
        <div className="pt-5 mt-4 border-t border-white/10 relative z-10">
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#5B7FFF] via-[#27D980] to-[#FFD84D] text-slate-950 font-black text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Start Game Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
