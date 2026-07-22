import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

const ICONS = ['🎮', '🚀', '💎', '⚡', '🔮', '🎲', '🎨', '🌟'];

interface CardItem {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    const saved = localStorage.getItem('miniarcade_best_memory');
    return saved ? parseInt(saved, 10) : null;
  });

  const initGame = () => {
    sounds.playPop();
    const deck = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({
        id: idx,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedIds.length >= 2) return;

    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    sounds.playFlip();

    const updatedCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const card1 = updatedCards.find((c) => c.id === firstId);
      const card2 = updatedCards.find((c) => c.id === secondId);

      if (card1 && card2 && card1.icon === card2.icon) {
        sounds.playVictory();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c))
          );
          setFlippedIds([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setIsWon(true);
      sounds.playVictory();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      if (!bestMoves || moves < bestMoves) {
        setBestMoves(moves);
        localStorage.setItem('miniarcade_best_memory', moves.toString());
      }
    }
  }, [cards, moves, bestMoves]);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>MOVES: {moves}</span>
        <span>BEST: {bestMoves ? `${bestMoves} moves` : 'None'}</span>
      </div>

      {isWon ? (
        <div className="py-8 flex flex-col items-center gap-3">
          <Trophy className="w-14 h-14 text-amber-400 animate-bounce" />
          <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Puzzle Solved! 🎉
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You completed the Memory Matrix in <strong className="text-[#5B7FFF]">{moves} moves</strong>.
          </p>
          <button
            onClick={initGame}
            className="mt-3 px-6 py-3 rounded-2xl bg-[#5B7FFF] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`h-16 rounded-2xl font-bold text-2xl flex items-center justify-center transition-all duration-300 transform select-none shadow-md ${
                  card.isFlipped || card.isMatched
                    ? 'bg-gradient-to-br from-[#5B7FFF] to-[#4364F7] text-white rotate-0 scale-105'
                    : 'bg-slate-200 dark:bg-slate-800 text-transparent hover:scale-102 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {card.isFlipped || card.isMatched ? card.icon : '❓'}
              </button>
            ))}
          </div>

          <button
            onClick={initGame}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Restart Puzzle
          </button>
        </>
      )}
    </div>
  );
};
