import React, { useRef } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { Moon, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface MonthEndDealsSectionProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct, e: React.MouseEvent) => void;
  onViewAll?: () => void;
}

export const MonthEndDealsSection: React.FC<MonthEndDealsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Month-end rush deals: high discount products or high-rating items
  const monthEndProducts = [...products]
    .sort((a, b) => {
      const discountA = a.originalPrice - a.price;
      const discountB = b.originalPrice - b.price;
      return discountB - discountA;
    })
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-5">
      <div className="rounded-2xl bg-gradient-to-b from-[#161D3A] to-[#0F1226] border border-[#2B3968]/50 shadow-[0_6px_24px_rgba(0,0,0,0.4)] p-3 sm:p-5">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#232F54]/60 gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(59,130,246,0.35)] shrink-0">
              <Moon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-base sm:text-xl text-[#F7F0FF] tracking-tight">
                  Month-End Deals
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30">
                  <Zap className="w-3 h-3 text-[#60A5FA]" />
                  <span>Midnight Rush</span>
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-serif-luxury mt-0.5">
                Explore standout products and offers worth discovering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="px-3 py-1.5 rounded-xl bg-[#1E294B] hover:bg-[#283866] text-[#60A5FA] font-bold text-xs transition-colors border border-[#3B82F6]/30 flex items-center gap-1 cursor-pointer"
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
                className="w-8 h-8 rounded-full bg-[#17213D] hover:bg-[#253664] text-[#F7F0FF] flex items-center justify-center border border-[#2B3968]/60 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-[#17213D] hover:bg-[#253664] text-[#F7F0FF] flex items-center justify-center border border-[#2B3968]/60 transition-colors cursor-pointer"
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
          {monthEndProducts.map((product) => (
            <MarketplaceProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              compact={true}
              badgeLabel="MONTH-END PICK"
              badgeType="deal"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
