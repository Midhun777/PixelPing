export interface GameRecord {
  gameId: string;
  gameTitle: string;
  highScore: number;
  gamesPlayed: number;
  gamesWon: number;
  bestStreak: number;
  bestAccuracy: number;
  totalCorrect: number;
  totalWrong: number;
  lastPlayed: string;
}

export interface MatchHistoryItem {
  id: string;
  gameTitle: string;
  timestamp: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyPercent: number;
  longestStreak: number;
  isWin: boolean;
}

export interface UserStats {
  level: number;
  currentXp: number;
  totalXp: number;
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalCorrect: number;
  totalWrong: number;
  globalLongestStreak: number;
  totalScreenTimeSeconds: number;
  gameRecords: Record<string, GameRecord>;
  matchHistory: MatchHistoryItem[];
}

const STORAGE_KEY = 'pixelping_user_stats';

const DEFAULT_STATS: UserStats = {
  level: 1,
  currentXp: 0,
  totalXp: 0,
  totalGamesPlayed: 0,
  totalWins: 0,
  totalLosses: 0,
  totalCorrect: 0,
  totalWrong: 0,
  globalLongestStreak: 0,
  totalScreenTimeSeconds: 0,
  gameRecords: {},
  matchHistory: [],
};

// Calculate level based on XP (100 XP per level)
export function calculateLevelInfo(totalXp: number): { level: number; currentXp: number; xpForNextLevel: number } {
  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const currentXp = totalXp % xpPerLevel;
  return { level, currentXp, xpForNextLevel: xpPerLevel };
}

export function getUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATS;
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      totalScreenTimeSeconds: parsed.totalScreenTimeSeconds || 0,
      gameRecords: parsed.gameRecords || {},
      matchHistory: parsed.matchHistory || [],
    };
  } catch (err) {
    console.error('Failed to load user stats from localStorage:', err);
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save user stats to localStorage:', err);
  }
}

export function addScreenTimeSeconds(seconds: number): void {
  const stats = getUserStats();
  stats.totalScreenTimeSeconds = (stats.totalScreenTimeSeconds || 0) + seconds;
  saveUserStats(stats);
}

export function formatScreenTime(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0m';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

export function recordGameSession(session: {
  gameTitle: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyPercent: number;
  longestStreak: number;
}): UserStats {
  const currentStats = getUserStats();

  // A game is considered a win if accuracy >= 70% or score >= 50
  const isWin = session.accuracyPercent >= 70 || session.score >= 50;

  // XP calculation: 10 XP per correct answer + 50 XP bonus for a win
  const xpEarned = session.correctAnswers * 10 + (isWin ? 50 : 10);
  const newTotalXp = currentStats.totalXp + xpEarned;
  const { level } = calculateLevelInfo(newTotalXp);

  // Update Game Record
  const gameId = session.gameTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const existingRecord: GameRecord = currentStats.gameRecords[gameId] || {
    gameId,
    gameTitle: session.gameTitle,
    highScore: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    bestStreak: 0,
    bestAccuracy: 0,
    totalCorrect: 0,
    totalWrong: 0,
    lastPlayed: new Date().toISOString(),
  };

  const updatedRecord: GameRecord = {
    gameId,
    gameTitle: session.gameTitle,
    highScore: Math.max(existingRecord.highScore, session.score),
    gamesPlayed: existingRecord.gamesPlayed + 1,
    gamesWon: existingRecord.gamesWon + (isWin ? 1 : 0),
    bestStreak: Math.max(existingRecord.bestStreak, session.longestStreak),
    bestAccuracy: Math.max(existingRecord.bestAccuracy, session.accuracyPercent),
    totalCorrect: existingRecord.totalCorrect + session.correctAnswers,
    totalWrong: existingRecord.totalWrong + session.wrongAnswers,
    lastPlayed: new Date().toISOString(),
  };

  // Update Match History (keep last 30 entries)
  const historyItem: MatchHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    gameTitle: session.gameTitle,
    timestamp: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    score: session.score,
    correctAnswers: session.correctAnswers,
    wrongAnswers: session.wrongAnswers,
    accuracyPercent: session.accuracyPercent,
    longestStreak: session.longestStreak,
    isWin,
  };

  const updatedMatchHistory = [historyItem, ...currentStats.matchHistory].slice(0, 30);

  const updatedStats: UserStats = {
    ...currentStats,
    level,
    totalXp: newTotalXp,
    currentXp: newTotalXp % 100,
    totalGamesPlayed: currentStats.totalGamesPlayed + 1,
    totalWins: currentStats.totalWins + (isWin ? 1 : 0),
    totalLosses: currentStats.totalLosses + (isWin ? 0 : 1),
    totalCorrect: currentStats.totalCorrect + session.correctAnswers,
    totalWrong: currentStats.totalWrong + session.wrongAnswers,
    globalLongestStreak: Math.max(currentStats.globalLongestStreak, session.longestStreak),
    gameRecords: {
      ...currentStats.gameRecords,
      [gameId]: updatedRecord,
    },
    matchHistory: updatedMatchHistory,
  };

  saveUserStats(updatedStats);
  return updatedStats;
}

export function resetUserStats(): UserStats {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_STATS;
}
