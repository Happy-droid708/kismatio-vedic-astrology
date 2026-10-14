import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface ChatSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const ChatSearchBar: React.FC<ChatSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClear,
  placeholder = 'Search by astrologer, gemstone, order (e.g. KS48291)...',
}) => {
  return (
    <div className="px-4 py-2 bg-[#24133B]">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-[#9685AE]">
          <Search className="w-3.5 h-3.5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 rounded-xl clay-input text-xs text-[#F7F0FF] placeholder-[#9685AE] transition-all min-h-[38px]"
        />

        {searchQuery ? (
          <button
            onClick={onClear}
            className="absolute right-2.5 p-1 rounded-full text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Quick Search Chips if search is active or focused */}
      {searchQuery && (
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-[10px] text-[#9685AE] scrollbar-none">
          <span className="shrink-0 flex items-center gap-1 text-[#E7B743]">
            <Sparkles className="w-2.5 h-2.5" /> Filter by:
          </span>
          {['career', 'gemstone', 'Blue Sapphire', 'KS48291', 'Pukhraj'].map((term) => (
            <button
              key={term}
              onClick={() => onSearchChange(term)}
              className="px-2.5 py-1 rounded-full clay-pill text-[10px] shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
