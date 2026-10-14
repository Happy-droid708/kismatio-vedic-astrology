import React from 'react';
import {
  Sparkles,
  Gem,
  CircleDot,
  Crown,
  Flame,
  ShieldCheck,
  Heart,
  Gift,
  Compass,
} from 'lucide-react';

export type CategoryFilterId =
  | 'all'
  | 'gemstones'
  | 'rudraksha'
  | 'jewellery'
  | 'malas'
  | 'crystals'
  | 'vastu'
  | 'gifting';

interface CategoryItem {
  id: CategoryFilterId;
  label: string;
  hindiLabel: string;
  icon: React.ReactNode;
  badge?: string;
}

interface FlipkartCategoryStripProps {
  selectedCategory: CategoryFilterId;
  onSelectCategory: (id: CategoryFilterId) => void;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    label: 'All Items',
    hindiLabel: 'सर्व संग्रह',
    icon: <Sparkles className="w-5 h-5 text-[#E7B743]" />,
  },
  {
    id: 'gemstones',
    label: 'Gemstones',
    hindiLabel: 'रत्न (Navaratna)',
    icon: <Gem className="w-5 h-5 text-[#60A5FA]" />,
    badge: 'Certified',
  },
  {
    id: 'rudraksha',
    label: 'Rudraksha',
    hindiLabel: 'रुद्राक्ष (1-14 Mukhi)',
    icon: <CircleDot className="w-5 h-5 text-[#F97316]" />,
    badge: 'Nepal',
  },
  {
    id: 'jewellery',
    label: 'Vedic Rings',
    hindiLabel: 'पवित्र मुद्रिका',
    icon: <Crown className="w-5 h-5 text-[#FBBF24]" />,
  },
  {
    id: 'malas',
    label: 'Malas & Bracelets',
    hindiLabel: 'माला व कंगन',
    icon: <Flame className="w-5 h-5 text-[#EC4899]" />,
  },
  {
    id: 'crystals',
    label: 'Crystal Healing',
    hindiLabel: 'स्फटिक शक्ति',
    icon: <ShieldCheck className="w-5 h-5 text-[#A78BFA]" />,
  },
  {
    id: 'vastu',
    label: 'Vastu & Yantras',
    hindiLabel: 'वास्तु यंत्र',
    icon: <Compass className="w-5 h-5 text-[#34D399]" />,
  },
  {
    id: 'gifting',
    label: 'Sacred Gifting',
    hindiLabel: 'शुभ उपहार',
    icon: <Gift className="w-5 h-5 text-[#F43F5E]" />,
    badge: 'Festive',
  },
];

export const FlipkartCategoryStrip: React.FC<FlipkartCategoryStripProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full bg-[#180C2A] border-b border-[#3D2554]/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col items-center gap-1 shrink-0 px-2 py-1 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E1848] text-[#F7F0FF] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                    : 'text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#25133B]/60'
                }`}
              >
                {/* Circular Icon Container */}
                <div className="relative">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E7B743]/20 via-[#A87B2A]/30 to-[#4B2068] ring-2 ring-[#E7B743] shadow-[0_0_12px_rgba(231,183,67,0.3)]'
                        : 'bg-[#26133C] group-hover:bg-[#341B50] ring-1 ring-[#482868]/40'
                    }`}
                  >
                    {cat.icon}
                  </div>

                  {cat.badge && (
                    <span className="absolute -top-1 -right-1.5 px-1 py-0.2 rounded-full text-[8px] font-mono font-bold bg-[#E7B743] text-[#180C2A] leading-tight shadow-sm">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Category Labels */}
                <div className="text-center">
                  <span
                    className={`block text-[11px] sm:text-xs font-semibold whitespace-nowrap leading-tight ${
                      isSelected ? 'text-[#FFD76A]' : 'text-[#F7F0FF]'
                    }`}
                  >
                    {cat.label}
                  </span>
                  <span className="block text-[9px] text-[#9685AE] font-serif-luxury truncate max-w-[80px]">
                    {cat.hindiLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
