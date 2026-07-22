import React, { useState } from 'react';
import { Dices } from 'lucide-react';
import { sounds } from '../services/audio';

interface SurpriseSectionProps {
  onSpinDice: () => void;
}

export const SurpriseSection: React.FC<SurpriseSectionProps> = ({ onSpinDice }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    sounds.playDiceRoll();
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinDice();
    }, 700);
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      <div className="glass-card rounded-[28px] p-8 sm:p-12 border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-indigo-900/10 via-[#5B7FFF]/10 to-emerald-900/10">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-[#5B7FFF]/20 via-[#FFD84D]/20 to-[#27D980]/20 blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#5B7FFF] via-[#27D980] to-[#FFD84D] p-0.5 shadow-xl mb-6">
            <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#0F1115] rounded-[22px] flex items-center justify-center">
              <Dices
                className={`w-8 h-8 text-[#5B7FFF] transition-transform ${
                  isSpinning ? 'animate-dice-spin text-[#FFD84D]' : ''
                }`}
              />
            </div>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Random Game Picker
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            Roll the dice to launch a random mini-game from the collection.
          </p>

          <button
            onClick={handleClick}
            disabled={isSpinning}
            className="group px-9 py-5 rounded-2xl bg-gradient-to-r from-[#5B7FFF] via-[#27D980] to-[#5B7FFF] text-white font-extrabold text-lg shadow-2xl shadow-[#5B7FFF]/40 hover:shadow-[#5B7FFF]/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 select-none"
          >
            <Dices className={`w-6 h-6 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            <span>{isSpinning ? 'Selecting...' : 'Roll Random Game 🎲'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
