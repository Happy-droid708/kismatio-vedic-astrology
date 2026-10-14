import React, { useState } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface NavratriWorldProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
}

export const NavratriWorld: React.FC<NavratriWorldProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Select festive highlight products (Rubies, Sapphires, Diamonds, Pearls)
  const heroPrimary = products.find((p) => p.id === 'gem-ruby') || products[3] || products[0];
  const heroSecondary = products.find((p) => p.id === 'gem-yellow-sapphire') || products[0];
  const heroTertiary = products.find((p) => p.id === 'gem-diamond') || products[4] || products[1];

  // Festive deal cards: top 6 high-demand festive gems & jewellery
  const festiveDeals = products.slice(0, 8);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="navratri"
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#321044] via-[#48123c] to-[#1e0728] text-[#FFF2D8] py-16 sm:py-24 px-4 sm:px-8 select-none transition-colors"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(231, 188, 103, 0.12) 0%, transparent 60%), linear-gradient(180deg, #321044 0%, #4a0f30 45%, #24082e 85%, #080E22 100%)`,
      }}
    >
      {/* =================================================================== */}
      {/* BACKGROUND DECORATIVE ELEMENTS                                      */}
      {/* =================================================================== */}
      {/* 1. Oversized Subtle Mandala SVG */}
      <div className="absolute -top-32 -right-32 sm:-right-48 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] pointer-events-none opacity-10 animate-spin-slower">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#E7BC67]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="0.75" />
          {/* 16 Radial Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <path
                  d="M100 25 C108 40, 115 65, 100 85 C85 65, 92 40, 100 25 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
                <circle cx="100" cy="18" r="2" fill="currentColor" opacity="0.6" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 2. Floating Festive Light Particles (Diyas/Starlight) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-2 h-2 rounded-full bg-[#E7BC67] blur-xs opacity-70 animate-pulse" />
        <div className="absolute top-1/3 left-[45%] w-1.5 h-1.5 rounded-full bg-[#E94B35] blur-xs opacity-60 animate-pulse [animation-delay:1s]" />
        <div className="absolute top-2/3 right-[15%] w-2.5 h-2.5 rounded-full bg-[#E7BC67] blur-xs opacity-80 animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 right-[35%] w-1.5 h-1.5 rounded-full bg-[#FFF2D8] blur-xs opacity-60 animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* 3. Golden Radiance Behind Headline */}
      <div className="absolute top-20 left-10 sm:left-24 w-80 h-80 rounded-full bg-[#E7BC67]/15 blur-3xl pointer-events-none" />

      {/* =================================================================== */}
      {/* HERO EDITORIAL COMPOSITION                                          */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto relative z-10 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Typography & Campaign Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Campaign Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7BC67]/15 border border-[#E7BC67]/30 text-[#E7BC67] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E7BC67]" />
              <span>Festive Edition 2026</span>
            </div>

            {/* Enormous Editorial Headline */}
            <h2 className="font-serif-luxury font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-[#FFF2D8] tracking-tight">
              Make This <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2D8] via-[#E7BC67] to-[#E94B35]">
                Festive Season
              </span> <br />
              Extraordinary.
            </h2>

            {/* Supporting Prose */}
            <p className="text-sm sm:text-base text-[#FFF2D8]/80 max-w-lg leading-relaxed font-light">
              Beautiful discoveries. Special prices. A little more magic in every moment. Consecrated with sacred Vedic Mantras for prosperity, health, and auspicious beginnings.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#festive-deals"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E7BC67] via-[#FFD76A] to-[#E7BC67] text-[#321044] font-serif-luxury font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_8px_24px_rgba(231,188,103,0.35)] flex items-center gap-2"
              >
                <span>Explore the Celebration</span>
                <ArrowRight className="w-4 h-4 text-[#321044]" />
              </a>

              <button
                onClick={() => onSelectProduct(heroPrimary)}
                className="px-5 py-3 rounded-xl bg-[#48123c]/80 hover:bg-[#5a184c] border border-[#E7BC67]/40 text-[#FFF2D8] font-mono text-xs transition-colors cursor-pointer"
              >
                View Spotlight Piece
              </button>
            </div>
          </div>

          {/* RIGHT: Layered Artistic Product Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px]">
            {/* Ambient Spotlight Circle */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#E94B35]/20 to-[#E7BC67]/25 blur-2xl" />

            {/* Archway Decorative Silhouette */}
            <div className="absolute inset-x-8 inset-y-4 rounded-t-full border border-[#E7BC67]/20 pointer-events-none" />

            {/* Primary Centerpiece: Burmese Ruby */}
            <div
              onClick={() => onSelectProduct(heroPrimary)}
              className="relative z-20 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#48123c]/90 via-[#321044]/95 to-[#1e0728] border border-[#E7BC67]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col items-center">
                <div className="relative mb-4">
                  <ShoppingProductArtwork product={heroPrimary} size="lg" />
                  <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#E94B35] text-white text-[9px] font-mono font-bold tracking-wider uppercase shadow-md">
                    Navratri Special
                  </span>
                </div>
                <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-[#FFF2D8] text-center">
                  {heroPrimary.name}
                </h3>
                <p className="text-xs text-[#E7BC67] font-mono mt-0.5">
                  {heroPrimary.sanskritName}
                </p>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#E7BC67]/20 w-full justify-center">
                  <span className="font-serif-luxury font-bold text-sm text-[#FFD76A]">
                    ₹{heroPrimary.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#FFF2D8]/50 line-through">
                    ₹{heroPrimary.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Floating Accent Left: Ceylon Yellow Sapphire */}
            <div
              onClick={() => onSelectProduct(heroSecondary)}
              className="absolute -bottom-4 -left-2 sm:-left-6 z-30 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-[#321044]/95 border border-[#E7BC67]/40 shadow-xl backdrop-blur-md flex items-center gap-3">
                <ShoppingProductArtwork product={heroSecondary} size="sm" />
                <div className="pr-2">
                  <span className="text-[9px] font-mono text-[#E7BC67] uppercase block">
                    Brihaspati Ratna
                  </span>
                  <h4 className="font-semibold text-xs text-[#FFF2D8] truncate max-w-[120px]">
                    {heroSecondary.name}
                  </h4>
                  <span className="text-xs font-bold text-[#FFD76A]">
                    ₹{heroSecondary.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Tertiary Floating Accent Right: Certified Jyotish Diamond */}
            <div
              onClick={() => onSelectProduct(heroTertiary)}
              className="absolute -top-4 -right-2 sm:-right-4 z-10 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-[#321044]/95 border border-[#E7BC67]/40 shadow-xl backdrop-blur-md flex items-center gap-3">
                <ShoppingProductArtwork product={heroTertiary} size="sm" />
                <div className="pr-2">
                  <span className="text-[9px] font-mono text-[#E94B35] uppercase block">
                    Shukra Grace
                  </span>
                  <h4 className="font-semibold text-xs text-[#FFF2D8] truncate max-w-[120px]">
                    {heroTertiary.name}
                  </h4>
                  <span className="text-xs font-bold text-[#FFD76A]">
                    ₹{heroTertiary.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* HORIZONTALLY FLOWING DEALS GALLERY                                  */}
      {/* =================================================================== */}
      <div id="festive-deals" className="max-w-7xl mx-auto space-y-4 pt-6">
        <div className="flex items-end justify-between border-b border-[#E7BC67]/20 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E7BC67] block">
              Curated Festival Treasures
            </span>
            <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#FFF2D8]">
              Festive Deals & Sacred Ornaments
            </h3>
          </div>
          <span className="text-xs text-[#E7BC67] font-mono hidden sm:inline">
            Verified Kashi Lab Authenticated ✦
          </span>
        </div>

        {/* Horizontal Card Track */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#E7BC67]/30 -mx-2 px-2">
          {festiveDeals.map((prod) => {
            const savings = prod.originalPrice - prod.price;
            const savingsPercent = Math.round((savings / prod.originalPrice) * 100);

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="w-56 sm:w-64 shrink-0 rounded-2xl bg-[#321044]/80 hover:bg-[#48123c]/90 border border-transparent hover:border-[#E7BC67]/50 p-4 flex flex-col justify-between transition-all duration-200 shadow-lg group cursor-pointer relative"
              >
                {/* Discount Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#E94B35]/25 border border-[#E94B35]/40 text-[#E94B35] text-[10px] font-mono font-bold">
                    {savingsPercent}% OFF
                  </span>
                  <span className="text-[10px] text-[#E7BC67] font-mono">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Product Artwork Centered */}
                <div className="my-3 flex justify-center group-hover:scale-105 transition-transform">
                  <ShoppingProductArtwork product={prod} size="md" />
                </div>

                {/* Details */}
                <div className="space-y-1 mt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#E7BC67]/75 block truncate">
                    {prod.planetOrDeity}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-xs sm:text-sm text-[#FFF2D8] truncate group-hover:text-[#FFD76A] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10.5px] text-[#FFF2D8]/60 truncate font-serif italic">
                    {prod.sanskritName}
                  </p>

                  {/* Pricing and Action */}
                  <div className="pt-2.5 mt-2 border-t border-[#E7BC67]/15 flex items-center justify-between">
                    <div>
                      <span className="font-serif-luxury font-bold text-sm text-[#FFD76A]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#FFF2D8]/40 line-through ml-1.5">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1.5 rounded-lg bg-[#E7BC67] hover:bg-[#FFD76A] text-[#321044] transition-transform active:scale-95 cursor-pointer shadow-xs"
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
