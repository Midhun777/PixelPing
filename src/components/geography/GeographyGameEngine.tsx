import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

export const CountryFlagImage: React.FC<{ countryId: string; flagEmoji: string; className?: string }> = ({
  countryId,
  flagEmoji,
  className = 'w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-xl shadow-lg border border-white/20',
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const flagCode = countryId.toLowerCase();
  const cdnUrl = `https://flagcdn.com/w320/${flagCode}.png`;

  if (useFallback) {
    return <span className="text-6xl select-none">{flagEmoji}</span>;
  }

  return (
    <img
      src={cdnUrl}
      alt="Flag"
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

  // Generate Current Question
  const generateQuestion = useCallback(
    (index: number): QuestionItem => {
      const mode = game.id === 'mixed_geography'
        ? ['country_flag', 'capital_guess', 'city_country', 'country_continent', 'population_challenge', 'landmark_guess'][index % 6]
        : game.id;

      const randomCountry = pool[Math.floor(Math.random() * pool.length)];

      if (mode === 'country_flag') {
        const distractors = getSmartDistractors(randomCountry, pool, (c) => c.name, 3);
        const options = [...distractors, randomCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'country_flag',
          prompt: 'Which country does this flag belong to?',
          correctAnswer: randomCountry.name,
          options,
          targetCountry: randomCountry,
          displayElement: <CountryFlagImage countryId={randomCountry.id} flagEmoji={randomCountry.flag} />,
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
          displayElement: <CountryFlagImage countryId={randomCountry.id} flagEmoji={randomCountry.flag} />,
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
              <CountryFlagImage countryId={randomCountry.id} flagEmoji={randomCountry.flag} className="w-16 h-11 object-cover rounded-lg shadow" />
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
        const cityCountry = cityPool.length > 0 ? cityPool[Math.floor(Math.random() * cityPool.length)] : randomCountry;
        const famousCity = cityCountry.famousCities?.[0] || cityCountry.capital;
        const distractors = getSmartDistractors(cityCountry, pool, (c) => c.name, 3);
        const options = [...distractors, cityCountry.name].sort(() => 0.5 - Math.random());
        return {
          type: 'city_country',
          prompt: `Which country is the city of ${famousCity} located in?`,
          correctAnswer: cityCountry.name,
          options,
          targetCountry: cityCountry,
          displayElement: <span className="font-display font-extrabold text-3xl text-cyan-400">🏙️ {famousCity}</span>,
        };
      }

      if (mode === 'population_challenge' || mode === 'area_challenge') {
        const isPop = mode === 'population_challenge';
        const otherCountry = pool.find((c) => c.id !== randomCountry.id) || pool[0];
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
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                <CountryFlagImage countryId={randomCountry.id} flagEmoji={randomCountry.flag} className="w-14 h-9 object-cover rounded-md shadow" />
                <span className="font-bold text-sm text-white">{randomCountry.name}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                <CountryFlagImage countryId={otherCountry.id} flagEmoji={otherCountry.flag} className="w-14 h-9 object-cover rounded-md shadow" />
                <span className="font-bold text-sm text-white">{otherCountry.name}</span>
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
            <CountryFlagImage countryId={randomCountry.id} flagEmoji={randomCountry.flag} className="w-16 h-11 object-cover rounded-lg shadow" />
            <span className="font-display font-extrabold text-2xl text-white">{randomCountry.name}</span>
          </div>
        ),
      };
    },
    [game.id, pool]
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
        onPlayAgain={() => {
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
        }}
        onChangeSettings={onChangeSettings}
        onReturnHome={onReturnHome}
      />
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/95 rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden text-white select-none">
      {/* Top Header Controls Bar */}
      <div className="flex items-center justify-between mb-5 text-xs font-bold text-slate-400 pb-3 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Zap className="w-4 h-4 fill-amber-400" />
          <span>{score} PTS</span>
          {streak > 1 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">🔥 {streak}x</span>}
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
                btnStyle = 'bg-[#27D980] text-slate-950 border-[#27D980] font-black scale-105 shadow-xl';
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
                className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border transition-all duration-200 ${btnStyle}`}
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
              className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-2xl p-4 pr-12 text-base font-bold border border-white/20 focus:outline-none focus:border-[#5B7FFF]"
            />
            <button
              type="submit"
              disabled={!typedInput.trim() || feedbackState !== 'none'}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#5B7FFF] text-white flex items-center justify-center disabled:opacity-30"
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
