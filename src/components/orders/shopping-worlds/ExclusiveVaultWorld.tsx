import React from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import { ShieldCheck, ShoppingBag, ArrowRight, Lock, Sparkles } from 'lucide-react';

interface ExclusiveVaultWorldProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
}

export const ExclusiveVaultWorld: React.FC<ExclusiveVaultWorldProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // EXACTLY TWO STANDOUT OBJECTS
  // Object 01: Natural Certified Jyotish Diamond (Highest luxury tier)
  const objectOne =
    products.find((p) => p.id === 'gem-diamond') ||
    products.find((p) => p.price >= 20000) ||
    products[0];

  // Object 02: 1 Mukhi Half-Moon Rudraksha / Supreme Sacred Object
  const objectTwo =
    products.find((p) => p.id === 'rud-1-mukhi') ||
    products.find((p) => p.id === 'gem-blue-sapphire') ||
    products[1];

  return (
    <section
      id="vault"
      className="relative w-full overflow-hidden bg-[#101010] text-[#F4EEE4] py-20 sm:py-28 px-4 sm:px-8 select-none transition-colors"
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(216, 183, 119, 0.08) 0%, transparent 60%), linear-gradient(180deg, #101010 0%, #161616 50%, #101010 80%, #123D32 100%)`,
      }}
    >
      {/* =================================================================== */}
      {/* BACKGROUND VAULT ARCHITECTURE & SPOTLIGHT                           */}
      {/* =================================================================== */}
      {/* Vault Door Geometric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[700px] sm:h-[1000px] rounded-full border border-[#D8B777]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full border border-[#D8B777]/5 pointer-events-none" />

      {/* Atmospheric Hairlines */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[#D8B777]/20 to-transparent pointer-events-none" />

      {/* =================================================================== */}
      {/* HERO TYPOGRAPHY & VAULT NARRATIVE                                   */}
      {/* =================================================================== */}
      <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10 mb-16 sm:mb-24">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#252525] border border-[#D8B777]/30 text-[#D8B777] text-xs font-mono font-bold uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5 text-[#D8B777]" />
          <span>The Exclusive Edition</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-serif-luxury font-normal text-4xl sm:text-6xl lg:text-7xl text-[#F4EEE4] tracking-tight leading-[1.08]">
          Not Everything <br />
          <span className="italic font-light text-[#D8B777]">Needs a Crowd.</span>
        </h2>

        {/* Hairline Accent */}
        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D8B777] to-transparent opacity-60" />

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-[#F4EEE4]/70 max-w-md mx-auto font-light leading-relaxed">
          Two standout finds. Selected for those who appreciate something special. Rare museum-grade provenance with absolute Vedic authentication.
        </p>
      </div>

      {/* =================================================================== */}
      {/* EXACTLY TWO FEATURED VAULT OBJECTS                                  */}
      {/* =================================================================== */}
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
        {/* ================================================================= */}
        {/* OBJECT 01 CARD                                                    */}
        {/* ================================================================= */}
        <div
          onClick={() => onSelectProduct(objectOne)}
          className="group rounded-3xl bg-gradient-to-b from-[#1c1c1c] via-[#161616] to-[#121212] border border-[#252525] hover:border-[#D8B777]/60 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer relative overflow-hidden"
        >
          {/* Subtle champagne hover aura */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D8B777]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Bar: Number 01 & Authentication Seal */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#D8B777] tracking-wider">
              01
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#D8B777]/80 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8B777]" />
              <span>{objectOne.certification.split(' ')[0] || 'Certified'}</span>
            </div>
          </div>

          {/* Large Artwork Spotlight */}
          <div className="my-8 flex justify-center group-hover:scale-105 transition-transform duration-300">
            <ShoppingProductArtwork product={objectOne} size="xl" />
          </div>

          {/* Object Metadata */}
          <div className="space-y-3 pt-6 border-t border-[#252525]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8B777] block">
              {objectOne.planetOrDeity}
            </span>

            <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#F4EEE4] group-hover:text-[#D8B777] transition-colors">
              {objectOne.name}
            </h3>

            <p className="text-xs text-[#F4EEE4]/70 line-clamp-2 font-light leading-relaxed">
              {objectOne.description}
            </p>

            <div className="flex items-baseline justify-between pt-3">
              <div>
                <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#D8B777]">
                  ₹{objectOne.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#F4EEE4]/40 line-through ml-2 font-mono">
                  ₹{objectOne.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Verified Savings ₹{(objectOne.originalPrice - objectOne.price).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(objectOne);
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#D8B777] hover:bg-[#ebd09b] text-[#101010] font-serif-luxury font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Object 01</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* OBJECT 02 CARD                                                    */}
        {/* ================================================================= */}
        <div
          onClick={() => onSelectProduct(objectTwo)}
          className="group rounded-3xl bg-gradient-to-b from-[#1c1c1c] via-[#161616] to-[#121212] border border-[#252525] hover:border-[#D8B777]/60 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer relative overflow-hidden"
        >
          {/* Subtle champagne hover aura */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D8B777]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Bar: Number 02 & Authentication Seal */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#D8B777] tracking-wider">
              02
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#D8B777]/80 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8B777]" />
              <span>{objectTwo.certification.split(' ')[0] || 'Certified'}</span>
            </div>
          </div>

          {/* Large Artwork Spotlight */}
          <div className="my-8 flex justify-center group-hover:scale-105 transition-transform duration-300">
            <ShoppingProductArtwork product={objectTwo} size="xl" />
          </div>

          {/* Object Metadata */}
          <div className="space-y-3 pt-6 border-t border-[#252525]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8B777] block">
              {objectTwo.planetOrDeity}
            </span>

            <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#F4EEE4] group-hover:text-[#D8B777] transition-colors">
              {objectTwo.name}
            </h3>

            <p className="text-xs text-[#F4EEE4]/70 line-clamp-2 font-light leading-relaxed">
              {objectTwo.description}
            </p>

            <div className="flex items-baseline justify-between pt-3">
              <div>
                <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#D8B777]">
                  ₹{objectTwo.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#F4EEE4]/40 line-through ml-2 font-mono">
                  ₹{objectTwo.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Verified Savings ₹{(objectTwo.originalPrice - objectTwo.price).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(objectTwo);
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#D8B777] hover:bg-[#ebd09b] text-[#101010] font-serif-luxury font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Object 02</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
