import React, { useState, useEffect } from 'react';
import { Zap, Trophy, RefreshCw, Award } from 'lucide-react';
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
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  return (
    <div className="flex flex-col items-center gap-5 text-center select-none w-full">
      {/* Top Real Best Score Banner */}
      <div className="flex items-center justify-between w-full px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Trophy className="w-4 h-4 fill-amber-400" />
          <span>BEST: {bestScore ? `${bestScore} ms` : 'None yet'}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Award className="w-4 h-4 text-[#5B7FFF]" />
          <span>PRO AVERAGE: ~230 ms</span>
        </div>
      </div>

      {/* Main Touch Area */}
      <div
        onClick={state === 'ready' || state === 'waiting' ? handleTap : undefined}
        className={`w-full h-72 sm:h-80 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 relative overflow-hidden shadow-2xl ${
          state === 'idle'
            ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20'
            : state === 'waiting'
            ? 'bg-amber-400 text-slate-950 shadow-[0_0_60px_rgba(251,191,36,0.6)] animate-pulse'
            : state === 'ready'
            ? 'bg-[#27D980] text-slate-950 scale-[1.02] shadow-[0_0_80px_rgba(39,217,128,0.7)]'
            : 'bg-gradient-to-br from-[#5B7FFF] via-indigo-600 to-purple-700 text-white'
        }`}
      >
        {state === 'idle' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-400/10 animate-bounce">
              <Zap className="w-10 h-10 text-amber-400 fill-amber-400" />
            </div>
            <h3 className="font-display font-extrabold text-2xl tracking-tight">Reflex Speed Test</h3>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Tap anywhere the exact millisecond the pad turns neon green.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#4364F7] text-white font-bold text-sm shadow-xl shadow-[#5B7FFF]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" /> Start Reflex Test
            </button>
          </div>
        )}

        {state === 'waiting' && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-slate-950/20 flex items-center justify-center animate-spin">
              <Zap className="w-8 h-8 text-slate-950" />
            </div>
            <h3 className="font-display font-black text-3xl tracking-wider text-slate-950">
              WAIT FOR GREEN...
            </h3>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Ready fingers!
            </p>
          </div>
        )}

        {state === 'ready' && (
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-display font-black text-5xl tracking-widest text-slate-950 animate-bounce">
              TAP NOW! ⚡
            </h3>
          </div>
        )}

        {state === 'result' && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shadow-lg">
              <Trophy className="w-9 h-9 text-amber-300 fill-amber-300" />
            </div>
            <span className="font-display font-black text-5xl text-amber-300 drop-shadow-md">
              {reactionTime} ms
            </span>
            <p className="text-xs font-bold text-white/90 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              {reactionTime && reactionTime < 200
                ? '🏆 Superhuman Reflexes!'
                : reactionTime && reactionTime < 260
                ? '⚡ Fast as Lightning!'
                : '🐢 Keep practicing!'}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-3 px-7 py-3 rounded-2xl bg-white text-[#5B7FFF] font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
