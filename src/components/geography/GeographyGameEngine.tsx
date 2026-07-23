import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Heart, Clock, Zap, XCircle, Send } from 'lucide-react';
import { COUNTRIES, getSmartDistractors, fuzzyMatch } from '../../data/geographyData';
import type { CountryData, GeographyGameMeta } from '../../data/geographyData';
import type { GameSetupConfig } from './GameSetupModal';
import { GameResultsScreen } from './GameResultsScreen';
import type { GameResultsStats } from './GameResultsScreen';
import { sounds } from '../../services/audio';

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

export const CountryFlagImage: React.FC<{ country: CountryData; className?: string }> = ({
  country,
  className = 'w-28 h-18 sm:w-36 sm:h-24 object-cover rounded-2xl shadow-xl border-2 border-white/20',
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const flagCode = (country.iso2 || country.id).toLowerCase();
  const cdnUrl = `https://flagcdn.com/w320/${flagCode}.png`;

  // Always reset fallback state when country changes
  useEffect(() => {
    setUseFallback(false);
  }, [country.id, country.iso2]);

  if (useFallback) {
    return <span className="text-6xl select-none">{country.flag}</span>;
  }

  return (
    <img
      key={`${country.id}-${flagCode}`}
      src={cdnUrl}
      alt={`${country.name} Flag`}
      onError={() => setUseFallback(true)}
      className={className}
    />
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
          prompt: `What is the capital city of ${randomCountry.name}?`,
          correctAnswer: randomCountry.capital,
          options,
          targetCountry: randomCountry,
          displayElement: (
            <div className="flex items-center gap-4">
              <CountryFlagImage key={randomCountry.id} country={randomCountry} className="w-16 h-11 object-cover rounded-lg shadow" />
              <span className="font-display font-extrabold text-2xl text-white">{randomCountry.name}</span>
            </div>
          ),
        };
      }

      if (mode === 'country_capital') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.name, 3);
        const options = [...distractors, randomCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'country_capital',
          prompt: `Which country's capital is ${randomCountry.capital}?`,
          correctAnswer: randomCountry.name,
          options,
          targetCountry: randomCountry,
          displayElement: <span className="font-display font-extrabold text-3xl text-amber-400">🏛️ {randomCountry.capital}</span>,
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
          displayElement: <span className="font-display font-extrabold text-3xl text-cyan-400">🏙️ {famousCity}</span>,
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
          displayElement: <span className="font-display font-extrabold text-3xl text-purple-400">🗿 {landmarkName}</span>,
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
          displayElement: <span className="font-display font-extrabold text-3xl text-blue-400">🏔️ {mountainName}</span>,
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
          displayElement: <span className="font-display font-extrabold text-3xl text-teal-400">🌊 {riverName}</span>,
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full py-2">
              <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <CountryFlagImage key={randomCountry.id} country={randomCountry} className="w-12 h-8 object-cover rounded-md shadow" />
                <span className="font-extrabold text-sm text-white">{randomCountry.name}</span>
              </div>
              <span className="text-amber-400 font-black px-2.5 py-1 bg-amber-400/20 rounded-full border border-amber-400/30 text-xs">VS</span>
              <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <CountryFlagImage key={otherCountry.id} country={otherCountry} className="w-12 h-8 object-cover rounded-md shadow" />
                <span className="font-extrabold text-sm text-white">{otherCountry.name}</span>
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
          <div className="flex items-center gap-3">
            <CountryFlagImage key={randomCountry.id} country={randomCountry} className="w-16 h-11 object-cover rounded-lg shadow" />
            <span className="font-display font-extrabold text-2xl text-white">{randomCountry.name}</span>
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

  const handleResetSession = () => {
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

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0F1523]/95 rounded-[32px] p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden text-white select-none backdrop-blur-2xl">
      {/* Top Header Controls Bar */}
      <div className="flex items-center justify-between mb-5 text-xs font-extrabold text-slate-400 pb-3 border-b border-white/10 font-display">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Zap className="w-4 h-4 fill-amber-400" />
          <span>{score} PTS</span>
          {streak > 1 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold">🔥 {streak}x</span>}
        </div>

        {config.questionCount > 0 && (
          <span>
            Q {questionIndex + 1} / {config.questionCount}
          </span>
        )}

        {config.timeModeSeconds > 0 && (
          <div className="flex items-center gap-1 text-cyan-400">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        )}

        {config.lives > 0 && (
          <div className="flex items-center gap-1 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>{livesRemaining}</span>
          </div>
        )}
      </div>

      {/* Main Question Display Box */}
      <div className="flex flex-col items-center justify-center text-center my-6 min-h-[170px] p-6 rounded-3xl bg-white/5 border border-white/10 relative">
        <h3 className="font-display font-bold text-lg text-slate-200 mb-4">{currentQuestion.prompt}</h3>
        {currentQuestion.displayElement}
      </div>

      {/* Answer Options Body */}
      {config.answerMode === 'multiple_choice' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options?.map((option, i) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQuestion.correctAnswer;

            let btnStyle = 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20';
            if (feedbackState !== 'none') {
              if (isCorrectOption) {
                btnStyle = 'bg-[#10B981] text-slate-950 border-[#10B981] font-black scale-105 shadow-xl';
              } else if (isSelected && !isCorrectOption) {
                btnStyle = 'bg-rose-500 text-white border-rose-500 font-black animate-shake';
              } else {
                btnStyle = 'opacity-40 bg-white/5 border-white/5';
              }
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleAnswerSubmit(option)}
                className={`py-3.5 px-4 rounded-2xl font-display font-extrabold text-sm flex items-center justify-center gap-2 border transition-all duration-200 btn-tactile ${btnStyle}`}
              >
                <span>{option}</span>
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
          className="flex flex-col gap-3"
        >
          <div className="relative">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="Type country name here..."
              disabled={feedbackState !== 'none'}
              autoFocus
              className="w-full bg-slate-900 text-white placeholder-slate-500 rounded-2xl p-4 pr-12 text-base font-bold border border-white/20 focus:outline-none focus:border-[#6366F1]"
            />
            <button
              type="submit"
              disabled={!typedInput.trim() || feedbackState !== 'none'}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#6366F1] text-white font-bold flex items-center justify-center disabled:opacity-30 btn-tactile"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {feedbackState === 'wrong' && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>Correct Answer: {currentQuestion.correctAnswer}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
