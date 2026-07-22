export interface GameItem {
  id: string;
  title: string;
  description: string;
  category: 'Geography' | 'Puzzle' | 'Memory' | 'Speed' | 'Logic' | 'Strategy' | 'Educational';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playTime: string;
  icon: string;
  gradient: string;
  hasPlayableModal: boolean;
}

export const GAMES_DATA: GameItem[] = [
  {
    id: 'reaction',
    title: 'Flash Reflex Tester',
    description: 'Measure your visual response time down to the millisecond when the indicator turns green.',
    category: 'Speed',
    difficulty: 'Easy',
    playTime: '30 Sec',
    icon: '⚡',
    gradient: 'from-amber-400 to-orange-500',
    hasPlayableModal: true,
  },
  {
    id: 'memory',
    title: 'Memory Matrix Switch',
    description: 'Flip and match pairs of geometric icons in minimum turns.',
    category: 'Memory',
    difficulty: 'Medium',
    playTime: '2 Mins',
    icon: '🧩',
    gradient: 'from-[#5B7FFF] to-indigo-600',
    hasPlayableModal: true,
  },
  {
    id: 'geoquiz',
    title: 'Flag & Capital Sprint',
    description: 'Identify national flags and match capital cities against time.',
    category: 'Geography',
    difficulty: 'Medium',
    playTime: '90 Sec',
    icon: '🌍',
    gradient: 'from-emerald-400 to-teal-600',
    hasPlayableModal: true,
  },
  {
    id: 'colormatch',
    title: 'Stroop Color Rush',
    description: 'Evaluate cognitive response by matching word labels with ink colors.',
    category: 'Speed',
    difficulty: 'Hard',
    playTime: '45 Sec',
    icon: '🎨',
    gradient: 'from-rose-400 to-red-600',
    hasPlayableModal: true,
  },
  {
    id: 'tile2048',
    title: '2048 Mini Grid',
    description: 'Slide adjacent numbered tiles to combine identical values.',
    category: 'Puzzle',
    difficulty: 'Hard',
    playTime: '3 Mins',
    icon: '🔢',
    gradient: 'from-amber-500 to-yellow-600',
    hasPlayableModal: true,
  },
  {
    id: 'tictactoe',
    title: 'Tic-Tac-Toe AI Mind',
    description: 'Classic 3x3 grid strategy game against a local AI algorithm.',
    category: 'Strategy',
    difficulty: 'Medium',
    playTime: '1 Min',
    icon: '❌',
    gradient: 'from-purple-500 to-indigo-700',
    hasPlayableModal: true,
  },
  {
    id: 'typing',
    title: 'Keyboard Speed Burst',
    description: 'Type dropping words accurately to measure typing speed and finger dexterity.',
    category: 'Educational',
    difficulty: 'Medium',
    playTime: '1 Min',
    icon: '⌨️',
    gradient: 'from-cyan-400 to-blue-600',
    hasPlayableModal: true,
  },
  {
    id: 'pattern',
    title: 'Sequence Memory Echo',
    description: 'Memorize expanding light patterns and repeat the exact order.',
    category: 'Memory',
    difficulty: 'Medium',
    playTime: '2 Mins',
    icon: '🔔',
    gradient: 'from-[#27D980] to-green-600',
    hasPlayableModal: true,
  },
];
