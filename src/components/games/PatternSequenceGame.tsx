import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw, Trophy, Flame } from 'lucide-react';
import { sounds } from '../../services/audio';
import { recordGameSession } from '../../services/statsService';

const BUTTONS = [
  { id: 0, color: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-400', activeColor: 'bg-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.9)] scale-105' },
  { id: 1, color: 'bg-rose-500 hover:bg-rose-400 border-rose-400', activeColor: 'bg-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.9)] scale-105' },
  { id: 2, color: 'bg-amber-500 hover:bg-amber-400 border-amber-400', activeColor: 'bg-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-105' },
  { id: 3, color: 'bg-cyan-500 hover:bg-cyan-400 border-cyan-400', activeColor: 'bg-cyan-300 shadow-[0_0_25px_rgba(56,189,248,0.9)] scale-105' },
];

export const PatternSequenceGame: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const startNextRound = (currentSeq: number[]) => {
    const nextItem = Math.floor(Math.random() * 4);
    const nextSeq = [...currentSeq, nextItem];
    setSequence(nextSeq);
    setPlayerStep(0);
    playSequence(nextSeq);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlayingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setActiveButton(seq[i]);
      sounds.playPop();
      await new Promise((r) => setTimeout(r, 500));
      setActiveButton(null);
    }
    setIsPlayingSequence(false);
  };

  useEffect(() => {
    startNextRound([]);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      recordGameSession({
        gameTitle: 'Sequence Memory Echo',
        score,
        correctAnswers: sequence.length - 1,
        wrongAnswers: 1,
        accuracyPercent: 90,
        longestStreak: streak,
      });
    }
  }, [isGameOver, score, sequence.length, streak]);

  const handleButtonClick = (id: number) => {
    if (isPlayingSequence || isGameOver) return;

    setActiveButton(id);
    sounds.playPop();
    setTimeout(() => setActiveButton(null), 200);

    if (id === sequence[playerStep]) {
      if (playerStep + 1 === sequence.length) {
        // Round completed
        sounds.playVictory();
        setScore((prev) => prev + 20);
        setStreak((prev) => prev + 1);
        setTimeout(() => startNextRound(sequence), 800);
      } else {
        setPlayerStep((prev) => prev + 1);
      }
    } else {
      // Wrong button
      sounds.playError();
      setIsGameOver(true);
    }
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    startNextRound([]);
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 select-none">
        <Trophy className="w-16 h-16 text-amber-400 mb-3 animate-bounce" />
        <h3 className="font-display font-black text-2xl text-white mb-1">Sequence Ended!</h3>
        <p className="text-sm font-bold text-emerald-400 mb-4">Reached Level: {sequence.length} | Score: {score} PTS</p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-full bg-[#6366F1] text-white font-extrabold text-xs btn-tactile shadow-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center select-none py-2">
      {/* Ticker Bar */}
      <div className="w-full flex items-center justify-between mb-4 text-xs font-extrabold text-slate-300 px-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          <span>{score} PTS</span>
        </div>

        {streak > 1 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
            <Flame className="w-3.5 h-3.5 fill-rose-400" />
            <span>{streak}x</span>
          </div>
        )}

        <div className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Level {sequence.length}
        </div>
      </div>

      <p className="text-xs font-bold text-slate-400 mb-4 text-center">
        {isPlayingSequence ? 'Watch the sequence carefully...' : 'Your turn! Repeat the pattern:'}
      </p>

      {/* 2x2 Simon Pads Grid */}
      <div className="grid grid-cols-2 gap-4 w-64 h-64 my-2">
        {BUTTONS.map((btn) => {
          const isActive = activeButton === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => handleButtonClick(btn.id)}
              disabled={isPlayingSequence}
              className={`rounded-3xl border-2 transition-all duration-150 btn-tactile ${
                isActive ? btn.activeColor : `${btn.color} opacity-80 hover:opacity-100`
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
