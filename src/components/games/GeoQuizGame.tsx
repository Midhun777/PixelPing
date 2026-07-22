import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../services/audio';

interface QuizQuestion {
  flag: string;
  country: string;
  correctCapital: string;
  options: string[];
}

const QUIZ_DATA: QuizQuestion[] = [
  { flag: '🇫🇷', country: 'France', correctCapital: 'Paris', options: ['Lyon', 'Paris', 'Marseille', 'Nice'] },
  { flag: '🇯🇵', country: 'Japan', correctCapital: 'Tokyo', options: ['Kyoto', 'Osaka', 'Tokyo', 'Sapporo'] },
  { flag: '🇧🇷', country: 'Brazil', correctCapital: 'Brasília', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'] },
  { flag: '🇦🇺', country: 'Australia', correctCapital: 'Canberra', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'] },
  { flag: '🇪🇬', country: 'Egypt', correctCapital: 'Cairo', options: ['Alexandria', 'Giza', 'Cairo', 'Luxor'] },
  { flag: '🇨🇦', country: 'Canada', correctCapital: 'Ottawa', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'] },
  { flag: '🇮🇹', country: 'Italy', correctCapital: 'Rome', options: ['Milan', 'Venice', 'Rome', 'Florence'] },
];

export const GeoQuizGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const q = QUIZ_DATA[currentIdx];

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);

    if (option === q.correctCapital) {
      sounds.playVictory();
      setScore((s) => s + 1);
    } else {
      sounds.playError();
    }

    setTimeout(() => {
      if (currentIdx + 1 < QUIZ_DATA.length) {
        setCurrentIdx((i) => i + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        sounds.playVictory();
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      }
    }, 900);
  };

  const restartQuiz = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center select-none">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>QUESTION {currentIdx + 1} OF {QUIZ_DATA.length}</span>
        <span>SCORE: {score}</span>
      </div>

      {isFinished ? (
        <div className="py-6 flex flex-col items-center gap-3">
          <Trophy className="w-14 h-14 text-amber-400 animate-bounce" />
          <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Quiz Completed! 🌍
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-300">
            You scored <strong className="text-[#5B7FFF]">{score} / {QUIZ_DATA.length}</strong>!
          </p>
          <button
            onClick={restartQuiz}
            className="mt-3 px-6 py-3 rounded-2xl bg-[#5B7FFF] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Quiz Again
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full glass-card rounded-3xl p-6 mb-5 border border-slate-200 dark:border-slate-800 shadow-md">
            <span className="text-6xl mb-2 block animate-bounce-subtle">{q.flag}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Identify Capital City
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              What is the capital of {q.country}?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {q.options.map((opt) => {
              const isChosen = selectedOption === opt;
              const isCorrect = opt === q.correctCapital;

              let btnStyle = 'glass-card text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

              if (selectedOption) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white font-bold shadow-lg';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-500 text-white font-bold';
                } else {
                  btnStyle = 'opacity-40 glass-card';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-between shadow-sm ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {selectedOption && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
