import React, { useState, useMemo } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { Sparkles, Tag, SlidersHorizontal } from 'lucide-react';

interface ValueForMoneySectionProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct, e: React.MouseEvent) => void;
}

type ValueFilter = 'all' | 'under-5k' | 'under-10k' | 'gemstones' | 'rudraksha' | 'jewellery';

export const ValueForMoneySection: React.FC<ValueForMoneySectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<ValueFilter>('all');

  const filterTabs: { id: ValueFilter; label: string }[] = [
    { id: 'all', label: 'All Smart Value' },
    { id: 'under-5k', label: 'Under ₹5,000' },
    { id: 'under-10k', label: 'Under ₹10,000' },
    { id: 'gemstones', label: 'Gemstones' },
    { id: 'rudraksha', label: 'Rudraksha' },
    { id: 'jewellery', label: 'Sacred Rings' },
  ];

  const filteredList = useMemo(() => {
    return products.filter((p) => {
      if (activeFilter === 'under-5k') return p.price <= 5000;
      if (activeFilter === 'under-10k') return p.price <= 10000;
      if (activeFilter === 'gemstones') return p.category === 'gemstones';
      if (activeFilter === 'rudraksha') return p.category === 'rudraksha';
      if (activeFilter === 'jewellery') return p.category === 'jewellery';
      return true;
    });
  }, [products, activeFilter]);

  return (
    <section id="value" className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="rounded-2xl bg-gradient-to-b from-[#211136] to-[#160B24] border border-[#442266]/40 shadow-[0_6px_24px_rgba(0,0,0,0.4)] p-3 sm:p-5">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#3B1D59]/40 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(16,185,129,0.35)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-base sm:text-xl text-[#F7F0FF] tracking-tight">
                  Value for Money
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30">
                  <Tag className="w-3 h-3" />
                  <span>Verified Deals</span>
                </span>
              </div>
              <p className="text-xs text-[#C5B8D9] font-serif-luxury mt-0.5">
                Smart picks. Better choices. More value.
              </p>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E7B743] text-[#180C2A] shadow-sm font-bold'
                      : 'bg-[#291442] hover:bg-[#381B5A] text-[#C5B8D9] hover:text-[#F7F0FF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-3 flex items-center justify-between text-xs text-[#9685AE]">
          <span>
            Showing <strong className="text-[#FFD76A]">{filteredList.length}</strong> authentic items
          </span>
          <span className="font-mono text-[11px] text-[#A78BFA]">
            All include Vedic Consecration
          </span>
        </div>

        {/* Dense Responsive Marketplace Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        {filteredList.length === 0 ? (
          <div className="py-12 text-center text-[#9685AE] space-y-2">
            <p>No products found under this specific filter.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-xs text-[#E7B743] underline font-bold"
            >
              Reset to All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filteredList.map((product) => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                badgeType="bestseller"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
