import React, { useState, useMemo } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import { Leaf, ShoppingBag, Star, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ValueForMoneyWorldProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
}

export const ValueForMoneyWorld: React.FC<ValueForMoneyWorldProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [filterTag, setFilterTag] = useState<'all' | 'under3000' | 'gemstones' | 'rudraksha'>('all');

  // Filter for products that provide outstanding value (under ₹7,500 or specifically designated value pieces)
  const valueCatalog = useMemo(() => {
    return products.filter((p) => {
      if (filterTag === 'under3000') return p.price <= 3000;
      if (filterTag === 'gemstones') return p.category === 'gemstones' && p.price <= 10000;
      if (filterTag === 'rudraksha') return p.category === 'rudraksha';
      return p.price <= 9000;
    });
  }, [products, filterTag]);

  // Dynamic value labels based on price and rating
  const getValueBadge = (product: ShoppingProduct) => {
    if (product.price <= 2000) return { label: 'BEST VALUE', bg: 'bg-[#1A805D]/20 text-[#B9F0D1]' };
    if (product.rating >= 4.95) return { label: 'CUSTOMER FAVOURITE', bg: 'bg-[#E7BC67]/20 text-[#FFD76A]' };
    if (product.category === 'rudraksha') return { label: 'EVERYDAY ESSENTIAL', bg: 'bg-[#B9F0D1]/20 text-[#B9F0D1]' };
    return { label: 'SMART PICK', bg: 'bg-emerald-500/20 text-emerald-300' };
  };

  return (
    <section
      id="value"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#123D32] via-[#0d2a23] to-[#091b16] text-[#F8F5EA] py-16 sm:py-24 px-4 sm:px-8 select-none transition-colors"
      style={{
        background: `radial-gradient(circle at 20% 20%, rgba(26, 128, 93, 0.25) 0%, transparent 60%), linear-gradient(180deg, #123D32 0%, #154538 40%, #0d2a22 80%, #180D2B 100%)`,
      }}
    >
      {/* =================================================================== */}
      {/* BACKGROUND BOTANICAL FORMS & ORGANIC ACCENTS                        */}
      {/* =================================================================== */}
      {/* Translucent Emerald Organic Leaf Blob */}
      <div className="absolute top-10 -right-20 w-[450px] h-[450px] rounded-full bg-[#1A805D]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#B9F0D1]/10 blur-3xl pointer-events-none" />

      {/* =================================================================== */}
      {/* HERO SECTION                                                        */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto relative z-10 mb-12 sm:mb-16">
        <div className="max-w-3xl space-y-4">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A805D]/30 border border-[#B9F0D1]/30 text-[#B9F0D1] text-xs font-mono font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#B9F0D1]" />
            <span>Smart Spending Curation</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif-luxury font-bold text-4xl sm:text-6xl text-[#F8F5EA] leading-tight tracking-tight">
            Good Taste. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9F0D1] via-[#1A805D] to-[#F8F5EA]">
              Smart Spending.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-[#F8F5EA]/80 font-light max-w-xl leading-relaxed">
            Thoughtful picks that deliver more value without asking you to spend more. Every item is consecrated at sacred Peeths, authenticated with lab reports, and backed by our Vedic purity pledge.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-6 pb-2">
          {[
            { id: 'all' as const, label: '✦ All Smart Value' },
            { id: 'under3000' as const, label: 'Under ₹3,000' },
            { id: 'gemstones' as const, label: 'Value Gemstones' },
            { id: 'rudraksha' as const, label: 'Sacred Rudraksha' },
          ].map((tab) => {
            const isActive = filterTag === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterTag(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#B9F0D1] whitespace-nowrap ${
                  isActive
                    ? 'bg-[#B9F0D1] text-[#123D32] font-bold shadow-xs'
                    : 'bg-[#123D32]/80 text-[#F8F5EA]/70 hover:text-[#F8F5EA] hover:bg-[#1A805D]/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* HIGHLY USABLE VALUE PRODUCT GRID                                    */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {valueCatalog.map((prod) => {
            const badge = getValueBadge(prod);
            const savings = prod.originalPrice - prod.price;

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="group rounded-2xl bg-[#0f2e26]/85 hover:bg-[#143e33] border border-transparent hover:border-[#1A805D]/60 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-lg cursor-pointer relative"
              >
                {/* Top Badge: Value Label + Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-[#F8F5EA]/80 font-mono">
                    <Star className="w-3 h-3 fill-[#E7BC67] text-[#E7BC67]" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Artwork */}
                <div className="my-4 flex justify-center group-hover:scale-105 transition-transform duration-200">
                  <ShoppingProductArtwork product={prod} size="md" />
                </div>

                {/* Details */}
                <div className="space-y-1.5 mt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#B9F0D1]/70 block truncate">
                    {prod.category} · {prod.astrologyTag}
                  </span>

                  <h3 className="font-serif-luxury font-bold text-xs sm:text-sm text-[#F8F5EA] group-hover:text-[#B9F0D1] transition-colors truncate">
                    {prod.name}
                  </h3>

                  <p className="text-[10px] text-[#F8F5EA]/60 font-serif italic truncate">
                    {prod.sanskritName}
                  </p>

                  {/* Price & Add to Bag */}
                  <div className="pt-3 mt-2 border-t border-[#1A805D]/30 flex items-center justify-between">
                    <div>
                      <div className="font-serif-luxury font-bold text-sm sm:text-base text-[#B9F0D1]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#F8F5EA]/40 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-2 rounded-xl bg-[#1A805D] hover:bg-[#239f75] text-[#F8F5EA] transition-all active:scale-95 cursor-pointer shadow-xs"
                      title="Add to Sanctum Bag"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
