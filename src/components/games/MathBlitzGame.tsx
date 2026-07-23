import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw, Trophy, Flame } from 'lucide-react';
import { sounds } from '../../services/audio';
import { recordGameSession } from '../../services/statsService';

export const MathBlitzGame: React.FC = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<'+' | '-' | '*'>('+');
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateProblem = () => {
    const ops: ('+' | '-' | '*')[] = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = 0;
    let b = 0;
    let correct = 0;

    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      correct = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 60) + 20;
      b = Math.floor(Math.random() * a) + 5;
      correct = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      correct = a * b;
    }

    setNum1(a);
    setNum2(b);
    setOperator(op);

    // Generate 3 distractors
    const set = new Set<number>([correct]);
    while (set.size < 4) {
      const offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() < 0.5 ? 1 : -1);
      const wrong = correct + offset;
      if (wrong >= 0) set.add(wrong);
    }

    setOptions([...set].sort(() => 0.5 - Math.random()));
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      recordGameSession({
        gameTitle: 'Mental Math Blitz',
        score,
        correctAnswers: Math.floor(score / 10),
        wrongAnswers: 0,
        accuracyPercent: 90,
        longestStreak: streak,
      });
    }
  }, [isGameOver, score, streak]);

  const handleOptionClick = (val: number) => {
    if (isGameOver || feedback !== null) return;

    let correct = 0;
    if (operator === '+') correct = num1 + num2;
    if (operator === '-') correct = num1 - num2;
    if (operator === '*') correct = num1 * num2;

    if (val === correct) {
      sounds.playVictory();
      setFeedback('correct');
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setTimeout(generateProblem, 300);
    } else {
      sounds.playError();
      setFeedback('wrong');
      setStreak(0);
      setTimeout(generateProblem, 500);
    }
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setIsGameOver(false);
    generateProblem();
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 select-none">
        <Trophy className="w-16 h-16 text-amber-400 mb-3 animate-bounce" />
        <h3 className="font-display font-black text-2xl text-white mb-1">Blitz Complete!</h3>
        <p className="text-sm font-bold text-emerald-400 mb-4">Final Score: {score} PTS</p>
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
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Problem Display */}
      <div className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center my-4 shadow-inner">
        <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-widest">
          {num1} {operator === '*' ? '×' : operator} {num2} = ?
        </span>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3.5 w-full mt-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(opt)}
            disabled={feedback !== null}
            className="py-4 rounded-2xl bg-white/10 hover:bg-[#6366F1] hover:text-white border border-white/15 text-xl font-display font-black text-white transition-all btn-tactile shadow-md"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
