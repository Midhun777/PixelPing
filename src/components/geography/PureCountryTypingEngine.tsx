import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { COUNTRIES, fuzzyMatch } from '../../data/geographyData';
import type { GeographyGameMeta } from '../../data/geographyData';
import { CountryFlagImage } from './GeographyGameEngine';
import { sounds } from '../../services/audio';
import { recordGameSession } from '../../services/statsService';
import { GameResultsScreen } from './GameResultsScreen';

interface PureCountryTypingEngineProps {
  game: GeographyGameMeta;
  onReturnHome: () => void;
}

export const PureCountryTypingEngine: React.FC<PureCountryTypingEngineProps> = ({
  game,
  onReturnHome,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [guessedIds, setGuessedIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const totalCountries = COUNTRIES.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle live instant typing check (No Enter key required, no wrong penalties)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);

    if (!val.trim() || isGameOver) return;

    const cleanInput = val.trim().toLowerCase();

    // Find matching un-guessed country
    const match = COUNTRIES.find((c) => {
      if (guessedIds.has(c.id)) return false;
      return (
        c.name.toLowerCase() === cleanInput ||
        fuzzyMatch(cleanInput, c.name, c.altNames)
      );
    });

    if (match) {
      sounds.playVictory();
      setGuessedIds((prev) => new Set(prev).add(match.id));
      setScore((prev) => prev + 10);
      setInputVal(''); // Auto-clear input instantly

      // Check if all countries guessed
      if (guessedIds.size + 1 >= totalCountries) {
        setIsGameOver(true);
      }
    }
  };

  const hasRecordedRef = useRef(false);
  useEffect(() => {
    if (isGameOver && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      const count = guessedIds.size;
      const accuracyPercent = Math.round((count / totalCountries) * 100);
      recordGameSession({
        gameTitle: game.title,
        score,
        correctAnswers: count,
        wrongAnswers: 0,
        accuracyPercent,
        longestStreak: count,
      });
    }
  }, [isGameOver, guessedIds.size, totalCountries, game.title, score]);

  const handleReset = () => {
    hasRecordedRef.current = false;
    setGuessedIds(new Set());
    setScore(0);
    setInputVal('');
    setIsGameOver(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (isGameOver) {
    const count = guessedIds.size;
    const accuracyPercent = Math.round((count / totalCountries) * 100);
    return (
      <GameResultsScreen
        stats={{
          gameTitle: game.title,
          score,
          correctAnswers: count,
          wrongAnswers: 0,
          accuracyPercent,
          longestStreak: count,
          averageTimeSeconds: 2.0,
        }}
        onPlayAgain={handleReset}
        onChangeSettings={handleReset}
        onReturnHome={onReturnHome}
      />
    );
  }

  const guessedCount = guessedIds.size;
  const progressPercent = Math.round((guessedCount / totalCountries) * 100);
  const guessedList = COUNTRIES.filter((c) => guessedIds.has(c.id));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 select-none animate-fade-in">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => {
            sounds.playPop();
            onReturnHome();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-display font-extrabold text-slate-300 hover:text-white hover:bg-white/10 transition-all btn-tactile"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Game</span>
        </button>

        <button
          onClick={() => {
            sounds.playVictory();
            setIsGameOver(true);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-display font-black text-xs shadow-lg shadow-emerald-500/25 btn-tactile"
        >
          <span>Finish Session 🏁</span>
        </button>

        <button
          onClick={handleReset}
          title="Restart Session"
          className="w-8 h-8 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all btn-tactile"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Game Container */}
      <div className="bg-[#0F1523]/95 rounded-[32px] p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden text-white backdrop-blur-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20 blur-3xl pointer-events-none" />

        {/* Live Score & Named Counter Ticker */}
        <div className="flex items-center justify-between mb-5 text-xs font-display font-extrabold text-slate-400 pb-3 border-b border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>{score} PTS</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 font-black text-sm">
              🌍 {guessedCount} / {totalCountries} Named ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full mb-6 overflow-hidden p-0.5 border border-white/10">
          <div
            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Direct Open Typing Box */}
        <div className="mb-6">
          <label className="block text-center text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 font-display">
            Type any country name (Auto-validates instantly as you type!)
          </label>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            placeholder="Type country (e.g. France, Japan, Brazil, India)..."
            className="w-full bg-[#080C14] text-white text-center placeholder-slate-500 rounded-2xl p-4 sm:p-5 text-lg sm:text-xl font-display font-black border-2 border-emerald-500/40 focus:outline-none focus:border-emerald-400 shadow-2xl transition-all"
            autoFocus
          />
        </div>

        {/* Discovered Countries Grid Feed */}
        <div>
          <h4 className="font-display font-extrabold text-sm text-slate-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Discovered World Nations ({guessedList.length})</span>
          </h4>

          {guessedList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-xs font-bold text-slate-400">
              Start typing country names above! They will automatically pop into your collection.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto no-scrollbar pr-1">
              {guessedList.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-extrabold text-white animate-fade-in shadow-sm"
                >
                  <CountryFlagImage country={country} variant="compact" />
                  <div className="truncate">
                    <div className="truncate">{country.name}</div>
                    <div className="text-[9px] text-amber-400 font-bold truncate">🏛️ {country.capital}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
