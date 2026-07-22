import React, { useState } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

type Player = 'X' | 'O' | null;

export const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'DRAW' | null>(null);

  const checkWinner = (b: Player[]): Player | 'DRAW' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    if (b.every((cell) => cell !== null)) return 'DRAW';
    return null;
  };

  const aiMove = (currentBoard: Player[]) => {
    const emptyIndices: number[] = [];
    currentBoard.forEach((cell, idx) => {
      if (cell === null) emptyIndices.push(idx);
    });

    if (emptyIndices.length === 0) return;

    // Smart AI check win or block
    let chosenIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const updatedBoard = [...currentBoard];
    updatedBoard[chosenIdx] = 'O';

    const w = checkWinner(updatedBoard);
    setBoard(updatedBoard);
    if (w) {
      setWinner(w);
      if (w === 'X') {
        sounds.playVictory();
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } else if (w === 'O') {
        sounds.playError();
      }
    } else {
      setTurn('X');
    }
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] !== null || winner !== null || turn !== 'X') return;

    sounds.playPop();

    const newBoard = [...board];
    newBoard[idx] = 'X';
    setBoard(newBoard);

    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
      if (w === 'X') {
        sounds.playVictory();
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setTurn('O');
      setTimeout(() => aiMove(newBoard), 400);
    }
  };

  const restart = () => {
    sounds.playPop();
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center select-none">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>YOU: ❌ (Player)</span>
        <span>AI: ⭕ (Bot)</span>
      </div>

      {winner && (
        <div className="py-2 flex items-center gap-2 font-display font-extrabold text-xl text-slate-900 dark:text-white">
          {winner === 'X' && (
            <>
              <Trophy className="w-6 h-6 text-amber-400" /> You Beat the AI! 🎉
            </>
          )}
          {winner === 'O' && <span className="text-rose-500">AI Won! Try Again.</span>}
          {winner === 'DRAW' && <span className="text-slate-400">It's a Draw!</span>}
        </div>
      )}

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs p-4 glass-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`h-20 rounded-2xl font-display font-black text-3xl flex items-center justify-center transition-all duration-200 select-none shadow-sm ${
              cell === 'X'
                ? 'bg-gradient-to-br from-[#5B7FFF] to-[#4364F7] text-white scale-105'
                : cell === 'O'
                ? 'bg-gradient-to-br from-[#27D980] to-emerald-600 text-slate-950 scale-105'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={restart}
        className="px-4 py-2.5 rounded-xl bg-[#5B7FFF] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Restart Tic-Tac-Toe
      </button>
    </div>
  );
};
