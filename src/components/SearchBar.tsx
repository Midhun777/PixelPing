import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { sounds } from '../services/audio';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 mb-8">
      <div className="relative glass-card rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center border border-white/60 dark:border-white/10 group focus-within:ring-2 focus-within:ring-[#5B7FFF]/40 transition-all">
        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 ml-3 mr-2 group-focus-within:text-[#5B7FFF] transition-colors" />

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search mini games (press '/' to focus)..."
          className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-0"
        />

        {searchQuery ? (
          <button
            onClick={() => {
              sounds.playPop();
              onSearchChange('');
            }}
            aria-label="Clear search query"
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 mr-2">
            /
          </kbd>
        )}
      </div>

      {searchQuery && (
        <div className="text-center mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          Found {resultCount} game{resultCount === 1 ? '' : 's'} matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};
