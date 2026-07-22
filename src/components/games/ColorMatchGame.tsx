import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

const COLOR_NAMES = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'];
const COLOR_CODES: Record<string, string> = {
  RED: '#FF5C5C',
  BLUE: '#5B7FFF',
  GREEN: '#27D980',
  YELLOW: '#FFD84D',
  PURPLE: '#A855F7',
};

export const ColorMatchGame: React.FC = () => {
  const [word, setWord] = useState<string>('RED');
  const [colorKey, setColorKey] = useState<string>('RED');
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const generateCard = () => {
    const randomWord = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    const isMatch = Math.random() > 0.4;
    const randomColorKey = isMatch
      ? randomWord
      : COLOR_NAMES.filter((c) => c !== randomWord)[Math.floor(Math.random() * (COLOR_NAMES.length - 1))];

    setWord(randomWord);
    setColorKey(randomColorKey);
  };

  const startGame = () => {
    sounds.playPop();
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
    setIsGameOver(false);
    generateCard();
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setIsGameOver(true);
      sounds.playVictory();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleAnswer = (userSaysMatch: boolean) => {
    if (!isPlaying) return;
    const actualMatch = word === colorKey;

    if (userSaysMatch === actualMatch) {
      sounds.playPop();
      setScore((s) => s + 10);
    } else {
      sounds.playError();
      setScore((s) => Math.max(0, s - 5));
    }
    generateCard();
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center select-none">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>TIME LEFT: {timeLeft}s</span>
        <span>SCORE: {score}</span>
      </div>

      {!isPlaying && !isGameOver && (
        <div className="py-8 flex flex-col items-center gap-4">
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Stroop Color Rush 🎨
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs">
            Does the text word match the actual font color? Tap YES or NO fast!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-[#5B7FFF] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Start 20s Speed Round
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="w-full h-44 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-lg">
            <span
              className="font-display font-black text-5xl tracking-widest transition-colors duration-150"
              style={{ color: COLOR_CODES[colorKey] }}
            >
              {word}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => handleAnswer(false)}
              className="py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" /> NO MATCH
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="py-4 rounded-2xl bg-[#27D980] hover:bg-emerald-500 text-slate-950 font-bold text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Check className="w-5 h-5 text-slate-950" /> YES MATCH
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 flex flex-col items-center gap-3">
          <Trophy className="w-14 h-14 text-amber-400 animate-bounce" />
          <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Time's Up! ⏱️
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Final Score: <strong className="text-[#5B7FFF]">{score} PTS</strong>
          </p>
          <button
            onClick={startGame}
            className="mt-3 px-6 py-3 rounded-2xl bg-[#5B7FFF] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};
