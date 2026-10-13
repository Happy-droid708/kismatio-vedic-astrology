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
    <div className="px-4 py-2 bg-[#0e1017]">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-[#7d7668]">
          <Search className="w-3.5 h-3.5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#151825] border border-[#272d42] text-xs text-[#ede8dc] placeholder-[#6e685c] focus:outline-none focus:border-[#dfb76c] transition-colors min-h-[38px]"
        />

        {searchQuery ? (
          <button
            onClick={onClear}
            className="absolute right-2.5 p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Quick Search Chips if search is active or focused */}
      {searchQuery && (
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-[10px] text-[#9a9385] scrollbar-none">
          <span className="shrink-0 flex items-center gap-1 text-[#dfb76c]">
            <Sparkles className="w-2.5 h-2.5" /> Filter by:
          </span>
          {['career', 'gemstone', 'Blue Sapphire', 'KS48291', 'Pukhraj'].map((term) => (
            <button
              key={term}
              onClick={() => onSearchChange(term)}
              className="px-2 py-0.5 rounded-full bg-[#1b1f2e] border border-[#2d344b] text-[#cdc7ba] hover:border-[#dfb76c] shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
