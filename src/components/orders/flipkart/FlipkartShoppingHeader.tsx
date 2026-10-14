import React from 'react';
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  PackageCheck,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface FlipkartShoppingHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToOrders: () => void;
  onOpenFilter: () => void;
  isFilterActive?: boolean;
}

export const FlipkartShoppingHeader: React.FC<FlipkartShoppingHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onNavigateToOrders,
  onOpenFilter,
  isFilterActive = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 w-full bg-[#180B28]/95 backdrop-blur-md border-b border-[#3E1F5A]/50 px-2 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E7B743] to-[#A87B2A] flex items-center justify-center text-[#180C2A] font-serif-luxury font-bold text-sm shadow-[0_2px_8px_rgba(231,183,67,0.3)]">
            ॐ
          </div>
          <div className="hidden xs:block">
            <h1 className="font-display font-bold text-sm sm:text-base text-[#F7F0FF] leading-none tracking-tight">
              Kismatio <span className="text-[#FFD76A]">Sanctum</span>
            </h1>
            <span className="text-[9px] text-[#A78BFA] font-mono tracking-wider block">
              VEDIC MARKETPLACE
            </span>
          </div>
        </div>

        {/* Central Search Input (Flipkart style) */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#9685AE] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 33+ gemstones, rudraksha, rings..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#26123D] border border-[#482868]/50 text-xs text-[#F7F0FF] placeholder:text-[#8E7EAA] focus:outline-none focus:border-[#E7B743] focus:ring-1 focus:ring-[#E7B743] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-0.5 rounded-full text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons: Filter, My Orders, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Filter Button */}
          <button
            type="button"
            onClick={onOpenFilter}
            title="Filter items"
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isFilterActive
                ? 'bg-[#E7B743]/20 border-[#E7B743] text-[#FFD76A]'
                : 'bg-[#26123D] border-[#482868]/50 text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#341852]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">Filters</span>
          </button>

          {/* Orders History Link */}
          <button
            type="button"
            onClick={onNavigateToOrders}
            title="My Orders"
            className="p-2 rounded-xl bg-[#26123D] border border-[#482868]/50 text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#341852] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PackageCheck className="w-4 h-4 text-[#A78BFA]" />
            <span className="hidden md:inline">Orders</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="p-2 rounded-xl bg-[#26123D] border border-[#482868]/50 text-[#C5B8D9] hover:text-[#E7B743] hover:bg-[#341852] text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-[#24133B]" /> : <Sun className="w-4 h-4 text-[#E7B743]" />}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative px-3 py-2 rounded-xl bg-gradient-to-r from-[#E7B743] to-[#C99827] hover:from-[#F0C356] hover:to-[#DBA833] text-[#180C2A] font-bold text-xs flex items-center gap-1.5 shadow-[0_2px_10px_rgba(231,183,67,0.3)] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#180C2A] text-[#FFD76A] font-mono font-bold text-[10px] leading-tight ml-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
