import React from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';

export type ShoppingWorldId = 'all' | 'navratri' | 'month-end' | 'vault' | 'value';

interface ShoppingWorldsNavProps {
  activeWorld: ShoppingWorldId;
  onSelectWorld: (world: ShoppingWorldId) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ShoppingWorldsNav: React.FC<ShoppingWorldsNavProps> = ({
  activeWorld,
  onSelectWorld,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
}) => {
  const worlds = [
    { id: 'all' as const, label: '✦ All Worlds', icon: '✦' },
    { id: 'navratri' as const, label: 'Navratri Festival', icon: '🪔' },
    { id: 'month-end' as const, label: 'Month-End Rush', icon: '⚡' },
    { id: 'vault' as const, label: 'The Vault', icon: '🏛️' },
    { id: 'value' as const, label: 'Smart Value', icon: '🌿' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#12091F]/85 backdrop-blur-md border-b border-[#453052]/20 px-3 sm:px-6 py-2.5 transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* World Selectors (Horizontal Scrollable Strip) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 min-w-0">
          {worlds.map((w) => {
            const isActive = activeWorld === w.id;
            return (
              <button
                key={w.id}
                onClick={() => onSelectWorld(w.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFD76A] via-[#E7B743] to-[#A87B2A] text-[#180D2B] shadow-[0_2px_12px_rgba(231,183,67,0.35)] scale-[1.02]'
                    : 'bg-[#24133B]/80 text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#352044] hover:border-[#A87B2A]/30'
                }`}
              >
                <span>{w.icon}</span>
                <span>{w.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Controls: Search & Bag */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden md:flex items-center w-48 lg:w-56">
            <Search className="w-3.5 h-3.5 text-[#9685AE] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search all worlds..."
              className="w-full pl-8 pr-7 py-1 text-xs text-[#F7F0FF] placeholder:text-[#9685AE] bg-[#180D2B] rounded-full border border-transparent clay-input outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-0.5 text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Cart Bag Icon with live badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-[#24133B] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 text-[#E7B743] cursor-pointer transition-all active:scale-95 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] flex items-center justify-center min-h-[38px] min-w-[38px]"
            title="Open Sanctum Bag"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#E7B743] to-[#FFD76A] text-[#180D2B] text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
