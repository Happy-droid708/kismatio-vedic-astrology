import React from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import { Zap, ShoppingBag, ArrowRight, Clock, Star, Flame } from 'lucide-react';

interface MonthEndWorldProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
}

export const MonthEndWorld: React.FC<MonthEndWorldProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // Prominent featured centerpiece: Royal Blue Kashmir Sapphire
  const heroPrimary =
    products.find((p) => p.id === 'gem-blue-sapphire') ||
    products.find((p) => p.id === 'rud-1-mukhi') ||
    products[1];

  // Supporting items for the asymmetrical composition
  const secondaryProducts = products.filter((p) => p.id !== heroPrimary.id).slice(0, 5);

  return (
    <section
      id="month-end"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#080E22] via-[#0d1433] to-[#0a0f26] text-[#F6F8FF] py-16 sm:py-24 px-4 sm:px-8 select-none transition-colors"
      style={{
        background: `radial-gradient(ellipse at 80% 20%, rgba(65, 105, 255, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(130, 87, 255, 0.15) 0%, transparent 60%), linear-gradient(180deg, #080E22 0%, #0e173a 50%, #080E22 85%, #101010 100%)`,
      }}
    >
      {/* =================================================================== */}
      {/* BACKGROUND ABSTRACT LUMINOUS TRAILS & GRID                          */}
      {/* =================================================================== */}
      {/* Cyber-Vedic Perspective Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #4169FF 1px, transparent 1px), linear-gradient(to bottom, #4169FF 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
        }}
      />

      {/* Luminous Electric Aurora Ribbons */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#4169FF]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[420px] h-[420px] rounded-full bg-[#8257FF]/20 blur-3xl pointer-events-none" />

      {/* =================================================================== */}
      {/* HERO EDITORIAL COMPOSITION                                          */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto relative z-10 mb-14 sm:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4169FF]/20 pb-8">
          <div className="space-y-4 max-w-2xl">
            {/* Editorial Campaign Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4169FF]/15 border border-[#4169FF]/30 text-[#A9E7FF] text-xs font-mono font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-[#4169FF]" />
              <span>The Month-End Edit</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-luxury font-bold text-4xl sm:text-6xl text-[#F6F8FF] leading-tight tracking-tight">
              Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A9E7FF] via-[#4169FF] to-[#8257FF]">
                Great Find
              </span> <br />
              Starts Here.
            </h2>

            {/* Supporting Prose */}
            <p className="text-sm sm:text-base text-[#F6F8FF]/80 max-w-lg font-light leading-relaxed">
              End the month on a high note with offers worth opening your wallet for. High-energy gemstones and energized beads curated for peak performance and career breakthrough.
            </p>
          </div>

          {/* Action Button & Flash Tag */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A9E7FF] bg-[#141b3d] px-3 py-1.5 rounded-full border border-[#4169FF]/30">
              <Clock className="w-3.5 h-3.5 text-[#4169FF]" />
              <span>Month-End Closing Window</span>
            </div>
            <a
              href="#month-end-grid"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4169FF] via-[#5c7eff] to-[#8257FF] text-white font-mono font-bold text-xs uppercase tracking-wider hover:shadow-[0_8px_24px_rgba(65,105,255,0.4)] active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Discover the Deals</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ASYMMETRICAL VARIED PRODUCT COMPOSITION                             */}
      {/* =================================================================== */}
      <div id="month-end-grid" className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. LARGE PROMINENT FEATURED PRODUCT (Col 1-7) */}
          <div
            onClick={() => onSelectProduct(heroPrimary)}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#121b44]/90 via-[#0e173a]/95 to-[#080E22] border border-[#4169FF]/40 hover:border-[#4169FF] p-6 sm:p-9 flex flex-col justify-between shadow-[0_20px_50px_rgba(8,14,34,0.8)] backdrop-blur-md group cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient Electric Background Radial */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#4169FF]/15 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#4169FF]/20 border border-[#4169FF]/40 text-[#A9E7FF] text-xs font-mono font-bold uppercase tracking-wider">
                ⚡ Spotlight Featured
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#A9E7FF] font-mono">
                <Star className="w-3.5 h-3.5 fill-[#FFD76A] text-[#FFD76A]" />
                <span>{heroPrimary.rating} ({heroPrimary.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="my-6 flex justify-center group-hover:scale-105 transition-transform duration-300">
              <ShoppingProductArtwork product={heroPrimary} size="xl" />
            </div>

            <div className="space-y-2 relative z-10 pt-4 border-t border-[#4169FF]/20">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#F6F8FF] group-hover:text-[#A9E7FF] transition-colors">
                    {heroPrimary.name}
                  </h3>
                  <p className="text-xs text-[#A9E7FF] font-mono mt-0.5">
                    {heroPrimary.sanskritName} · {heroPrimary.planetOrDeity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-serif-luxury font-bold text-2xl text-[#A9E7FF]">
                    ₹{heroPrimary.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-[#F6F8FF]/50 line-through">
                    ₹{heroPrimary.originalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#F6F8FF]/70 line-clamp-2 pt-1 font-light">
                {heroPrimary.description}
              </p>

              <div className="flex items-center justify-between pt-3">
                <span className="text-[11px] font-mono text-emerald-400">
                  Save ₹{(heroPrimary.originalPrice - heroPrimary.price).toLocaleString('en-IN')} this month
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(heroPrimary);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#4169FF] hover:bg-[#5c7eff] text-white font-mono text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. SUPPORTING ASYMMETRICAL DEALS (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {secondaryProducts.slice(0, 3).map((prod) => {
              const savings = prod.originalPrice - prod.price;
              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="p-4 rounded-2xl bg-[#0f183d]/80 hover:bg-[#15204f] border border-transparent hover:border-[#4169FF]/50 flex items-center gap-4 cursor-pointer transition-all duration-200 group shadow-md"
                >
                  <div className="shrink-0 group-hover:scale-105 transition-transform">
                    <ShoppingProductArtwork product={prod} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono uppercase text-[#4169FF] truncate">
                        {prod.astrologyTag}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                        -₹{savings.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h4 className="font-serif-luxury font-bold text-xs sm:text-sm text-[#F6F8FF] truncate group-hover:text-[#A9E7FF] transition-colors mt-0.5">
                      {prod.name}
                    </h4>

                    <div className="flex items-center justify-between pt-1 mt-1">
                      <div>
                        <span className="font-serif-luxury font-bold text-xs sm:text-sm text-[#A9E7FF]">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#F6F8FF]/40 line-through ml-1.5">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod);
                        }}
                        className="p-1.5 rounded-lg bg-[#4169FF]/20 hover:bg-[#4169FF] text-[#A9E7FF] hover:text-white transition-colors cursor-pointer"
                        title="Add to Bag"
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
      </div>
    </section>
  );
};
