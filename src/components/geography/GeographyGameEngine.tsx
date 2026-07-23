import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Heart, Clock, Zap, XCircle, Send, ArrowLeft, RotateCcw, Flame } from 'lucide-react';
import { COUNTRIES, getSmartDistractors, fuzzyMatch } from '../../data/geographyData';
import type { CountryData, GeographyGameMeta } from '../../data/geographyData';
import type { GameSetupConfig } from './GameSetupModal';
import { GameResultsScreen } from './GameResultsScreen';
import type { GameResultsStats } from './GameResultsScreen';
import { sounds } from '../../services/audio';
import { recordGameSession } from '../../services/statsService';

interface GeographyGameEngineProps {
  game: GeographyGameMeta;
  config: GameSetupConfig;
  onReturnHome: () => void;
  onChangeSettings: () => void;
}

interface QuestionItem {
  type: string;
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  targetCountry: CountryData;
  secondaryCountry?: CountryData;
  displayElement?: React.ReactNode;
}

export const CountryFlagImage: React.FC<{
  country: CountryData;
  className?: string;
  variant?: 'main' | 'compact';
}> = ({
  country,
  className = 'max-h-full max-w-full object-contain rounded-md drop-shadow-2xl hover:scale-105 transition-transform duration-300',
  variant = 'main',
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const flagCode = (country.iso2 || country.id).toLowerCase();
  const cdnUrl = `https://flagcdn.com/w320/${flagCode}.png`;

  useEffect(() => {
    setUseFallback(false);
  }, [country.id, country.iso2]);

  if (useFallback) {
    return <span className={variant === 'compact' ? 'text-2xl' : 'text-7xl sm:text-8xl select-none'}>{country.flag}</span>;
  }

  if (variant === 'compact') {
    return (
      <div className="h-9 px-2 py-1 rounded-lg bg-[#080C14]/80 border border-white/20 shadow-md flex items-center justify-center min-w-[48px] overflow-hidden backdrop-blur-sm shrink-0">
        <img
          key={`${country.id}-${flagCode}`}
          src={cdnUrl}
          alt={`${country.name} Flag`}
          onError={() => setUseFallback(true)}
          className="max-h-full max-w-full object-contain rounded-sm"
          decoding="async"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="p-3 rounded-2xl bg-[#080C14]/90 border border-white/20 shadow-2xl flex items-center justify-center min-w-[200px] sm:min-w-[280px] max-w-[320px] h-36 sm:h-44 overflow-hidden backdrop-blur-md relative group">
      <img
        key={`${country.id}-${flagCode}`}
        src={cdnUrl}
        alt={`${country.name} Flag`}
        onError={() => setUseFallback(true)}
        className={className}
        decoding="async"
        loading="eager"
      />
    </div>
  );
};

export const GeographyGameEngine: React.FC<GeographyGameEngineProps> = ({
  game,
  config,
  onReturnHome,
  onChangeSettings,
}) => {
  // Filter dataset by Region
  const filteredDataset = useMemo(() => {
    if (config.regionFilter === 'World') return COUNTRIES;
    return COUNTRIES.filter((c) => c.continent === config.regionFilter || c.subregion.includes(config.regionFilter));
  }, [config.regionFilter]);

  const pool = filteredDataset.length > 5 ? filteredDataset : COUNTRIES;

  // Strict Non-repeating Deck Queue
  const shuffledDeck = useRef<CountryData[]>([]);

  // Function to get next non-used country in session
  const getNextCountry = useCallback(() => {
    if (shuffledDeck.current.length === 0) {
      shuffledDeck.current = [...pool].sort(() => 0.5 - Math.random());
    }
    return shuffledDeck.current.pop() || pool[Math.floor(Math.random() * pool.length)];
  }, [pool]);

  // Game Engine State
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [livesRemaining, setLivesRemaining] = useState<number>(config.lives);
  const [timeLeft, setTimeLeft] = useState<number>(config.timeModeSeconds);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState<string>('');
  const [feedbackState, setFeedbackState] = useState<'none' | 'correct' | 'wrong'>('none');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Generate Current Question (Strictly Non-Repeating)
  const generateQuestion = useCallback(
    (index: number): QuestionItem => {
      const mode = game.id === 'mixed_geography'
        ? ['country_flag', 'capital_guess', 'city_country', 'landmark_guess', 'mountain_challenge', 'river_challenge', 'country_continent', 'population_challenge'][index % 8]
        : game.id;

      const randomCountry = getNextCountry();

      if (mode === 'country_flag') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.name, 3);
        const options = [...distractors, randomCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'country_flag',
          prompt: 'Which country does this flag belong to?',
          correctAnswer: randomCountry.name,
          options,
          targetCountry: randomCountry,
          displayElement: <CountryFlagImage key={randomCountry.id} country={randomCountry} />,
        };
      }

      if (mode === 'flag_country') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.name, 3);
        const options = [...distractors, randomCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'flag_country',
          prompt: `Select the country that belongs to this flag`,
          correctAnswer: randomCountry.name,
          options,
          targetCountry: randomCountry,
          displayElement: <CountryFlagImage key={randomCountry.id} country={randomCountry} />,
        };
      }

      if (mode === 'capital_guess') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.capital, 3);
        const options = [...distractors, randomCountry.capital].sort(() => 0.5 - Math.random());
        return {
          type: 'capital_guess',
          prompt: `What is the official capital city of ${randomCountry.name}?`,
          correctAnswer: randomCountry.capital,
          options,
          targetCountry: randomCountry,
          displayElement: (
            <div className="flex flex-col items-center gap-3">
              <CountryFlagImage key={randomCountry.id} country={randomCountry} variant="compact" />
              <span className="font-display font-black text-2xl sm:text-3xl text-white">{randomCountry.name}</span>
            </div>
          ),
        };
      }

      if (mode === 'country_capital') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.name, 3);
        const options = [...distractors, randomCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'country_capital',
          prompt: `Which country's capital city is ${randomCountry.capital}?`,
          correctAnswer: randomCountry.name,
          options,
          targetCountry: randomCountry,
          displayElement: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-4xl shadow-inner mb-1">
                🏛️
              </div>
              <span className="font-display font-black text-3xl sm:text-4xl text-amber-400">{randomCountry.capital}</span>
            </div>
          ),
        };
      }

      if (mode === 'city_country') {
        const cityPool = pool.filter((c) => c.famousCities && c.famousCities.length > 0);
        const target = cityPool.length > 0 ? (cityPool.find((c) => c.id === randomCountry.id) || cityPool[0]) : randomCountry;
        const famousCity = target.famousCities?.[0] || target.capital;
        const distractors = getSmartDistractors(target, pool, (c) => c.name, 3);
        const options = [...distractors, target.name].sort(() => 0.5 - Math.random());
        return {
          type: 'city_country',
          prompt: `Which country is the city of ${famousCity} located in?`,
          correctAnswer: target.name,
          options,
          targetCountry: target,
          displayElement: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-4xl shadow-inner mb-1">
                🏙️
              </div>
              <span className="font-display font-black text-3xl sm:text-4xl text-cyan-400">{famousCity}</span>
            </div>
          ),
        };
      }

      if (mode === 'landmark_guess') {
        const landmarkPool = pool.filter((c) => c.landmark && c.landmark.length > 0);
        const target = landmarkPool.length > 0 ? (landmarkPool.find((c) => c.id === randomCountry.id) || landmarkPool[0]) : randomCountry;
        const landmarkName = target.landmark || 'Great Pyramids of Giza';
        const distractors = getSmartDistractors(target, pool, (c) => c.name, 3);
        const options = [...distractors, target.name].sort(() => 0.5 - Math.random());
        return {
          type: 'landmark_guess',
          prompt: `Which country is the famous landmark "${landmarkName}" located in?`,
          correctAnswer: target.name,
          options,
          targetCountry: target,
          displayElement: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-4xl shadow-inner mb-1">
                🗿
              </div>
              <span className="font-display font-black text-2xl sm:text-3xl text-purple-300">{landmarkName}</span>
            </div>
          ),
        };
      }

      if (mode === 'mountain_challenge') {
        const mountainPool = pool.filter((c) => c.mountain && c.mountain.length > 0);
        const target = mountainPool.length > 0 ? (mountainPool.find((c) => c.id === randomCountry.id) || mountainPool[0]) : randomCountry;
        const mountainName = target.mountain || 'Mount Everest';
        const distractors = getSmartDistractors(target, pool, (c) => c.name, 3);
        const options = [...distractors, target.name].sort(() => 0.5 - Math.random());
        return {
          type: 'mountain_challenge',
          prompt: `Which country is home to "${mountainName}"?`,
          correctAnswer: target.name,
          options,
          targetCountry: target,
          displayElement: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-4xl shadow-inner mb-1">
                🏔️
              </div>
              <span className="font-display font-black text-2xl sm:text-3xl text-blue-300">{mountainName}</span>
            </div>
          ),
        };
      }

      if (mode === 'river_challenge') {
        const riverPool = pool.filter((c) => c.river && c.river.length > 0);
        const target = riverPool.length > 0 ? (riverPool.find((c) => c.id === randomCountry.id) || riverPool[0]) : randomCountry;
        const riverName = target.river || 'Amazon River';
        const distractors = getSmartDistractors(target, pool, (c) => c.name, 3);
        const options = [...distractors, target.name].sort(() => 0.5 - Math.random());
        return {
          type: 'river_challenge',
          prompt: `Which country does the river "${riverName}" flow through?`,
          correctAnswer: target.name,
          options,
          targetCountry: target,
          displayElement: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-4xl shadow-inner mb-1">
                🌊
              </div>
              <span className="font-display font-black text-2xl sm:text-3xl text-teal-300">{riverName}</span>
            </div>
          ),
        };
      }

      if (mode === 'population_challenge' || mode === 'area_challenge') {
        const isPop = mode === 'population_challenge';
        const availableOthers = pool.filter((c) => c.id !== randomCountry.id);
        const otherCountry = availableOthers.length > 0 ? availableOthers[Math.floor(Math.random() * availableOthers.length)] : pool[0];
        const isRandomLarger = isPop
          ? randomCountry.population >= otherCountry.population
          : randomCountry.areaSqKm >= otherCountry.areaSqKm;
        const winner = isRandomLarger ? randomCountry : otherCountry;

        return {
          type: mode,
          prompt: isPop ? 'Which country has a LARGER population?' : 'Which country has a LARGER total land area?',
          correctAnswer: winner.name,
          options: [randomCountry.name, otherCountry.name],
          targetCountry: randomCountry,
          secondaryCountry: otherCountry,
          displayElement: (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full py-2">
              <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/15 shadow-lg w-full sm:w-auto justify-center">
                <CountryFlagImage key={randomCountry.id} country={randomCountry} variant="compact" />
                <span className="font-display font-extrabold text-base text-white">{randomCountry.name}</span>
              </div>
              <span className="text-amber-400 font-black px-3 py-1 bg-amber-400/20 rounded-full border border-amber-400/40 text-xs shadow-md">VS</span>
              <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/15 shadow-lg w-full sm:w-auto justify-center">
                <CountryFlagImage key={otherCountry.id} country={otherCountry} variant="compact" />
                <span className="font-display font-extrabold text-base text-white">{otherCountry.name}</span>
              </div>
            </div>
          ),
        };
      }

      // Default: Country -> Continent
      const options = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'].sort(() => 0.5 - Math.random());
      return {
        type: 'country_continent',
        prompt: `Which continent is ${randomCountry.name} located on?`,
        correctAnswer: randomCountry.continent,
        options,
        targetCountry: randomCountry,
        displayElement: (
          <div className="flex items-center gap-4">
            <CountryFlagImage key={randomCountry.id} country={randomCountry} className="w-20 h-13 object-cover rounded-xl shadow-lg" />
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">{randomCountry.name}</span>
          </div>
        ),
      };
    },
    [game.id, getNextCountry, pool]
  );

  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem>(() => generateQuestion(0));

  // Timer countdown hook
  useEffect(() => {
    if (config.timeModeSeconds <= 0 || isGameOver) return;
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
  }, [config.timeModeSeconds, isGameOver]);

  const handleAnswerSubmit = (answer: string) => {
    if (feedbackState !== 'none' || isGameOver) return;

    setSelectedOption(answer);
    const isCorrect = config.answerMode === 'typing'
      ? fuzzyMatch(answer, currentQuestion.correctAnswer, currentQuestion.targetCountry.altNames)
      : answer === currentQuestion.correctAnswer;

    const timeSpentMs = Date.now() - questionStartTime;
    const fastBonus = timeSpentMs < 3000 ? 5 : 0;

    if (isCorrect) {
      sounds.playVictory();
      setFeedbackState('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > longestStreak) setLongestStreak(nextStreak);
      setScore((prev) => prev + 10 + fastBonus + (nextStreak > 2 ? 5 : 0));
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playError();
      setFeedbackState('wrong');
      setStreak(0);
      setWrongCount((prev) => prev + 1);

      if (config.lives > 0) {
        const remaining = livesRemaining - 1;
        setLivesRemaining(remaining);
        if (remaining <= 0) {
          setTimeout(() => setIsGameOver(true), 1200);
          return;
        }
      }
    }

    // Transition to next question
    setTimeout(() => {
      const nextIdx = questionIndex + 1;
      if (config.questionCount > 0 && nextIdx >= config.questionCount) {
        setIsGameOver(true);
      } else {
        setQuestionIndex(nextIdx);
        setCurrentQuestion(generateQuestion(nextIdx));
        setSelectedOption(null);
        setTypedInput('');
        setFeedbackState('none');
        setQuestionStartTime(Date.now());
      }
    }, 1200);
  };

  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (isGameOver && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      const totalAnswered = correctCount + wrongCount;
      const accuracyPercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
      recordGameSession({
        gameTitle: game.title,
        score,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        accuracyPercent,
        longestStreak,
      });
    }
  }, [isGameOver, correctCount, wrongCount, game.title, score, longestStreak]);

  const handleResetSession = () => {
    hasRecordedRef.current = false;
    shuffledDeck.current = [...pool].sort(() => 0.5 - Math.random());
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setLongestStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setLivesRemaining(config.lives);
    setTimeLeft(config.timeModeSeconds);
    setIsGameOver(false);
    setFeedbackState('none');
    setCurrentQuestion(generateQuestion(0));
  };

  if (isGameOver) {
    const totalAnswered = correctCount + wrongCount;
    const accuracyPercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const stats: GameResultsStats = {
      gameTitle: game.title,
      score,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      accuracyPercent,
      longestStreak,
      averageTimeSeconds: 3.5,
    };
    return (
      <GameResultsScreen
        stats={stats}
        onPlayAgain={handleResetSession}
        onChangeSettings={onChangeSettings}
        onReturnHome={onReturnHome}
      />
    );
  }

  // Progress Bar percentage
  const progressPercent = config.questionCount > 0
    ? Math.min(100, Math.round(((questionIndex + 1) / config.questionCount) * 100))
    : 100;

  const letterLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 select-none">
      {/* Top Header Control Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => {
            sounds.playPop();
            onReturnHome();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-display font-extrabold text-slate-300 hover:text-white hover:bg-white/10 transition-all btn-tactile"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>

        {/* Finish / End Game Button */}
        <button
          onClick={() => {
            sounds.playVictory();
            setIsGameOver(true);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-display font-black text-xs shadow-lg shadow-emerald-500/25 btn-tactile"
        >
          <span>Finish Game 🏁</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Category Badge */}
          <span className="px-3 py-1 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-[11px] font-extrabold uppercase tracking-wider font-display hidden sm:inline">
            {game.category}
          </span>

          <button
            onClick={() => {
              sounds.playPop();
              onChangeSettings();
            }}
            title="Session Settings"
            className="w-8 h-8 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all btn-tactile"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Game Screen Card Container */}
      <div className="bg-[#0F1523]/95 rounded-[32px] p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden text-white backdrop-blur-2xl">
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br ${game.gradient} opacity-20 blur-3xl pointer-events-none`} />

        {/* Animated Progress Bar */}
        {config.questionCount > 0 && (
          <div className="w-full bg-white/10 h-2 rounded-full mb-5 overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-[#6366F1] via-[#10B981] to-[#F59E0B] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Score & Game Ticker Bar */}
        <div className="flex items-center justify-between mb-4 text-xs font-display font-extrabold text-slate-400 pb-3 border-b border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>{score} PTS</span>
            </div>

            {streak > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-rose-400" />
                <span>{streak}x</span>
              </div>
            )}
          </div>

          {/* Live Correct / Wrong / Accuracy Counter */}
          <div className="flex items-center gap-2 text-[11px] font-extrabold">
            <span className="text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
              ✅ {correctCount}
            </span>
            <span className="text-rose-400 bg-rose-500/15 px-2.5 py-1 rounded-full border border-rose-500/30">
              ❌ {wrongCount}
            </span>
            <span className="text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-full border border-indigo-500/30">
              🎯 {correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0}% Acc
            </span>
          </div>

          <div className="flex items-center gap-3">
            {config.timeModeSeconds > 0 && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                timeLeft <= 10
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
                  : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}

            {config.lives > 0 && (
              <div className="flex items-center gap-1 text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>{livesRemaining}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Country Pool & Deck Ticker Bar */}
        <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-slate-400 mb-4 px-1">
          <span className="flex items-center gap-1 text-emerald-400">
            <span>🌍 Guessed:</span>
            <span className="text-white font-black">{questionIndex + 1} / {pool.length} Countries</span>
          </span>

          <span className="flex items-center gap-1 text-cyan-400">
            <span>📦 Deck Remaining:</span>
            <span className="text-white font-black">{Math.max(0, pool.length - (questionIndex + 1))} Left</span>
          </span>
        </div>

        {/* Main Question Display Arena */}
        <div className="flex flex-col items-center justify-center text-center my-4 min-h-[180px] p-5 rounded-3xl bg-white/5 border border-white/10 relative shadow-inner">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-4 leading-tight">
            {currentQuestion.prompt}
          </h3>
          {currentQuestion.displayElement}
        </div>

        {/* Answer Options Body */}
        {config.answerMode === 'multiple_choice' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options?.map((option, i) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              const letter = letterLabels[i % letterLabels.length];

              let btnStyle = 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20';
              if (feedbackState !== 'none') {
                if (isCorrectOption) {
                  btnStyle = 'bg-[#10B981] text-slate-950 border-[#10B981] font-black scale-105 shadow-xl shadow-[#10B981]/30';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-500 text-white border-rose-500 font-black animate-shake shadow-lg shadow-rose-500/30';
                } else {
                  btnStyle = 'opacity-30 bg-white/5 border-white/5';
                }
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswerSubmit(option)}
                  disabled={feedbackState !== 'none'}
                  className={`py-3.5 px-4 rounded-2xl font-display font-extrabold text-sm flex items-center justify-between border transition-all duration-200 btn-tactile ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black shrink-0">
                      {letter}
                    </span>
                    <span className="text-left font-bold">{option}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (typedInput.trim()) handleAnswerSubmit(typedInput.trim());
            }}
            className="flex flex-col gap-3.5"
          >
            <div className="relative">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Type country name here..."
                disabled={feedbackState !== 'none'}
                autoFocus
                className="w-full bg-slate-900 text-white placeholder-slate-500 rounded-2xl p-4 pr-14 text-base font-bold border border-white/20 focus:outline-none focus:border-[#6366F1]"
              />
              <button
                type="submit"
                disabled={!typedInput.trim() || feedbackState !== 'none'}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#6366F1] text-white font-bold flex items-center justify-center disabled:opacity-30 btn-tactile shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {feedbackState === 'wrong' && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-extrabold flex items-center gap-2.5 font-display">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Correct Answer: {currentQuestion.correctAnswer}</span>
              </div>
            )}
          </form>
        )}

        {/* Educational Country Fact Card (Displayed on Answer Feedback) */}
        {feedbackState !== 'none' && (
          <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 text-xs font-display font-medium text-slate-200 animate-fade-in flex flex-col gap-1.5 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between font-extrabold text-amber-400 pb-1.5 border-b border-white/10">
              <span className="text-sm">💡 Country Educational Fact Card</span>
              <span>{currentQuestion.targetCountry.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-bold">
              <span className="text-slate-300">🏛️ Capital: <strong className="text-white">{currentQuestion.targetCountry.capital}</strong></span>
              <span className="text-slate-300">🌍 Region: <strong className="text-white">{currentQuestion.targetCountry.continent}</strong></span>
              <span className="text-slate-300">👥 Population: <strong className="text-white">{currentQuestion.targetCountry.population}M</strong></span>
              {currentQuestion.targetCountry.landmark && (
                <span className="text-slate-300">🗿 Landmark: <strong className="text-white">{currentQuestion.targetCountry.landmark}</strong></span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
