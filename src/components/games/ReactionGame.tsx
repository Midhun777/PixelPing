import React, { useState, useEffect } from 'react';
import { Zap, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

export const ReactionGame: React.FC = () => {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('miniarcade_best_reaction');
    return saved ? parseInt(saved, 10) : null;
  });
  const [startTime, setStartTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const startTest = () => {
    sounds.playPop();
    setState('waiting');
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 2500) + 1500;
    const timeout = setTimeout(() => {
      setState('ready');
      setStartTime(Date.now());
    }, delay);

    setTimerId(timeout);
  };

  const handleTap = () => {
    if (state === 'waiting') {
      if (timerId) clearTimeout(timerId);
      sounds.playError();
      setState('idle');
      alert('Too early! Wait for the screen to turn bright green.');
    } else if (state === 'ready') {
      const ms = Date.now() - startTime;
      sounds.playVictory();
      setReactionTime(ms);
      setState('result');

      if (!bestScore || ms < bestScore) {
        setBestScore(ms);
        localStorage.setItem('miniarcade_best_reaction', ms.toString());
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  return (
    <div className="flex flex-col items-center gap-6 text-center select-none">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>BEST SCORE: {bestScore ? `${bestScore} ms` : 'None yet'}</span>
        <span>BENCHMARK: ~250 ms</span>
      </div>

      <div
        onClick={state === 'ready' || state === 'waiting' ? handleTap : undefined}
        className={`w-full h-64 sm:h-72 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 relative overflow-hidden shadow-xl ${
          state === 'idle'
            ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-700'
            : state === 'waiting'
            ? 'bg-amber-400 text-slate-950 animate-pulse'
            : state === 'ready'
            ? 'bg-[#27D980] text-slate-950 scale-105 shadow-2xl'
            : 'bg-gradient-to-br from-[#5B7FFF] to-indigo-700 text-white'
        }`}
      >
        {state === 'idle' && (
          <div className="flex flex-col items-center gap-3">
            <Zap className="w-12 h-12 text-amber-400 animate-bounce" />
            <h3 className="font-display font-bold text-xl">Reflex Speed Test</h3>
            <p className="text-xs text-slate-300 max-w-xs">
              Tap when the screen turns green. Be quick!
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-2 px-6 py-3 rounded-2xl bg-[#5B7FFF] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Start Speed Test
            </button>
          </div>
        )}

        {state === 'waiting' && (
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-display font-extrabold text-2xl tracking-wider text-slate-950">
              WAIT FOR GREEN...
            </h3>
            <p className="text-xs font-bold text-slate-800">Do NOT tap yet!</p>
          </div>
        )}

        {state === 'ready' && (
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-display font-black text-4xl tracking-widest text-slate-950">
              TAP NOW! ⚡
            </h3>
          </div>
        )}

        {state === 'result' && (
          <div className="flex flex-col items-center gap-3">
            <Trophy className="w-10 h-10 text-amber-300" />
            <span className="font-display font-black text-4xl text-amber-300">
              {reactionTime} ms
            </span>
            <p className="text-xs font-semibold">
              {reactionTime && reactionTime < 200
                ? '🏆 Superhuman Reflexes!'
                : reactionTime && reactionTime < 260
                ? '⚡ Fast as Lightning!'
                : '🐢 Room for improvement!'}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-2 px-6 py-2.5 rounded-2xl bg-white text-[#5B7FFF] font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
