import React, { useState } from 'react';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';

interface InChatSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  matchCount: number;
  currentMatchIndex: number;
  onNextMatch: () => void;
  onPrevMatch: () => void;
}

export const InChatSearchBar: React.FC<InChatSearchBarProps> = ({
  isOpen,
  onClose,
  onSearch,
  matchCount,
  currentMatchIndex,
  onNextMatch,
  onPrevMatch,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="bg-[#24133B] border-b border-[#453052] px-3 py-2 flex items-center justify-between gap-2 animate-in slide-in-from-top-2 duration-150 z-20">
      <div className="flex-1 flex items-center gap-2 bg-[#12091F] border border-[#453052] rounded-xl px-2.5 py-1.5 focus-within:border-[#E7B743]">
        <Search className="w-3.5 h-3.5 text-[#E7B743] shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search in conversation..."
          autoFocus
          className="w-full bg-transparent text-xs text-[#F7F0FF] placeholder-[#9685AE] focus:outline-none"
        />
        {query && (
          <button onClick={handleClear} className="text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0 text-xs">
        <span className="text-[10px] sm:text-[11px] font-mono text-[#9685AE] px-0.5 sm:px-1">
          {query ? (matchCount > 0 ? `${currentMatchIndex + 1}/${matchCount}` : '0') : ''}
        </span>

        <button
          onClick={onPrevMatch}
          disabled={matchCount === 0}
          className="p-1 rounded-lg hover:bg-[#352044] text-[#C5B8D9] hover:text-[#F7F0FF] disabled:opacity-40 cursor-pointer"
          title="Previous match"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <button
          onClick={onNextMatch}
          disabled={matchCount === 0}
          className="p-1 rounded-lg hover:bg-[#352044] text-[#C5B8D9] hover:text-[#F7F0FF] disabled:opacity-40 cursor-pointer"
          title="Next match"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            handleClear();
            onClose();
          }}
          className="p-1 rounded-lg hover:bg-[#1a1d2c] text-[#a8a192] hover:text-[#ede8dc] cursor-pointer ml-1"
          title="Close search"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
