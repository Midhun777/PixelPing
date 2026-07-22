import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

type Grid = number[][];

export const Tile2048Game: React.FC = () => {
  const [grid, setGrid] = useState<Grid>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const addRandomTile = useCallback((board: Grid): Grid => {
    const emptyCells: [number, number][] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) emptyCells.push([r, c]);
      }
    }
    if (emptyCells.length === 0) return board;

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  }, []);

  const initGame = useCallback(() => {
    sounds.playPop();
    let b: Grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    b = addRandomTile(b);
    b = addRandomTile(b);
    setGrid(b);
    setScore(0);
    setHasWon(false);
  }, [addRandomTile]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const slideLeft = (row: number[]): { newRow: number[]; addedScore: number } => {
    const filter = row.filter((val) => val !== 0);
    let addedScore = 0;
    for (let i = 0; i < filter.length - 1; i++) {
      if (filter[i] === filter[i + 1]) {
        filter[i] *= 2;
        addedScore += filter[i];
        filter[i + 1] = 0;
      }
    }
    const finalFilter = filter.filter((val) => val !== 0);
    while (finalFilter.length < 4) finalFilter.push(0);
    return { newRow: finalFilter, addedScore };
  };

  const move = useCallback(
    (direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN') => {
      let current = grid.map((r) => [...r]);
      let totalAddedScore = 0;

      // Rotate if UP / DOWN / RIGHT
      if (direction === 'RIGHT') {
        current = current.map((row) => row.reverse());
      } else if (direction === 'UP') {
        current = [0, 1, 2, 3].map((col) => [grid[0][col], grid[1][col], grid[2][col], grid[3][col]]);
      } else if (direction === 'DOWN') {
        current = [0, 1, 2, 3].map((col) => [grid[3][col], grid[2][col], grid[1][col], grid[0][col]]);
      }

      let moved = false;
      const nextGrid: Grid = [];

      for (let r = 0; r < 4; r++) {
        const { newRow, addedScore } = slideLeft(current[r]);
        nextGrid.push(newRow);
        totalAddedScore += addedScore;
        if (JSON.stringify(newRow) !== JSON.stringify(current[r])) {
          moved = true;
        }
      }

      if (!moved) return;

      sounds.playFlip();

      // Unrotate
      let finalGrid: Grid = nextGrid;
      if (direction === 'RIGHT') {
        finalGrid = nextGrid.map((row) => row.reverse());
      } else if (direction === 'UP') {
        finalGrid = [0, 1, 2, 3].map((col) => [nextGrid[0][col], nextGrid[1][col], nextGrid[2][col], nextGrid[3][col]]);
      } else if (direction === 'DOWN') {
        finalGrid = [0, 1, 2, 3].map((col) => [nextGrid[3][col], nextGrid[2][col], nextGrid[1][col], nextGrid[0][col]]);
      }

      const updatedWithTile = addRandomTile(finalGrid);
      setGrid(updatedWithTile);
      setScore((s) => s + totalAddedScore);

      // Check 2048 win tile
      if (!hasWon && updatedWithTile.some((row) => row.includes(2048))) {
        setHasWon(true);
        sounds.playVictory();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    },
    [grid, addRandomTile, hasWon]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move('LEFT');
      if (e.key === 'ArrowRight') move('RIGHT');
      if (e.key === 'ArrowUp') move('UP');
      if (e.key === 'ArrowDown') move('DOWN');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getTileColor = (val: number): string => {
    switch (val) {
      case 2:
        return 'bg-[#FAFAFA] dark:bg-slate-800 text-slate-900 dark:text-white';
      case 4:
        return 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200';
      case 8:
        return 'bg-amber-400 text-slate-950 font-bold';
      case 16:
        return 'bg-orange-500 text-white font-bold';
      case 32:
        return 'bg-rose-500 text-white font-bold';
      case 64:
        return 'bg-[#5B7FFF] text-white font-bold';
      case 128:
        return 'bg-[#27D980] text-slate-950 font-black shadow-md';
      case 256:
      case 512:
      case 1024:
      case 2048:
        return 'bg-gradient-to-tr from-[#FFD84D] to-amber-500 text-slate-950 font-black shadow-lg';
      default:
        return 'bg-slate-200/50 dark:bg-slate-800/40 text-transparent';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center select-none">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>SCORE: {score}</span>
        <span>HINT: Swipe / Use Arrow Keys</span>
      </div>

      {hasWon && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-300 font-bold text-xs">
          <Trophy className="w-4 h-4" /> 2048 TILE REACHED!
        </div>
      )}

      {/* 4x4 Grid */}
      <div className="p-3 glass-card rounded-3xl grid grid-cols-4 gap-2.5 w-full max-w-xs shadow-xl border border-slate-200 dark:border-slate-800">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`h-16 rounded-2xl flex items-center justify-center font-display font-bold text-lg transition-all duration-150 ${getTileColor(
                val
              )}`}
            >
              {val > 0 ? val : ''}
            </div>
          ))
        )}
      </div>

      {/* On-screen Directional Touch Pad */}
      <div className="flex flex-col items-center gap-1.5 mt-2">
        <button
          onClick={() => move('UP')}
          className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#5B7FFF] hover:text-white transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => move('LEFT')}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#5B7FFF] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => move('DOWN')}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#5B7FFF] hover:text-white transition-colors"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => move('RIGHT')}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#5B7FFF] hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={initGame}
        className="mt-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Restart 2048 Grid
      </button>
    </div>
  );
};
