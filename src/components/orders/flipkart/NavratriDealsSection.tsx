import React, { useRef } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { Sparkles, ChevronLeft, ChevronRight, Flame, Clock } from 'lucide-react';

interface NavratriDealsSectionProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct, e: React.MouseEvent) => void;
  onViewAll?: () => void;
}

export const NavratriDealsSection: React.FC<NavratriDealsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter or prioritize products suitable for Navratri festive grace:
  // Rubies (Sun/Durga), Emeralds (Budh), Sapphires (Jupiter/Lakshmi), Pearls (Moon), 7-Mukhi Rudraksha (Mahalakshmi), 9-Mukhi (Durga)
  const navratriProducts = products
    .filter((p) => {
      const id = p.id;
      return (
        id.includes('ruby') ||
        id.includes('yellow-sapphire') ||
        id.includes('emerald') ||
        id.includes('pearl') ||
        id.includes('rudraksha-7') ||
        id.includes('rudraksha-9') ||
        id.includes('rudraksha-2') ||
        id.includes('necklace') ||
        id.includes('pendant')
      );
    })
    .slice(0, 10);

  // Fallback if filter is narrow
  const displayList = navratriProducts.length >= 4 ? navratriProducts : products.slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-5">
      {/* Section Container with subtle Flipkart-like elevated border and header */}
      <div className="rounded-2xl bg-gradient-to-b from-[#251037] to-[#180A26] border border-[#482065]/40 shadow-[0_6px_24px_rgba(0,0,0,0.4)] p-3 sm:p-5">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#3D1A54]/50 gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF4668] to-[#991B1B] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(255,70,104,0.35)] shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-base sm:text-xl text-[#F7F0FF] tracking-tight">
                  Navratri Special Deals
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF4668]/20 text-[#FF6E88] border border-[#FF4668]/30">
                  <Clock className="w-3 h-3" />
                  <span>Ends in 2d 14h</span>
                </span>
              </div>
              <p className="text-xs text-[#C5B8D9] font-serif-luxury mt-0.5">
                Discover festive favourites and meaningful finds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="px-3 py-1.5 rounded-xl bg-[#2D1644] hover:bg-[#3D1E5C] text-[#E7B743] font-bold text-xs transition-colors border border-[#E7B743]/20 flex items-center gap-1 cursor-pointer"
              >
                <span>VIEW ALL</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full bg-[#1F0D33] hover:bg-[#341655] text-[#F7F0FF] flex items-center justify-center border border-[#482065]/50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-[#1F0D33] hover:bg-[#341655] text-[#F7F0FF] flex items-center justify-center border border-[#482065]/50 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pt-3 sm:pt-4 pb-1"
        >
          {displayList.map((product) => (
            <MarketplaceProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              compact={true}
              badgeLabel="FESTIVE DEAL"
              badgeType="festive"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
