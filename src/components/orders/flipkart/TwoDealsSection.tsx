import React from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import {
  Crown,
  Sparkles,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Star,
  Flame,
} from 'lucide-react';

interface TwoDealsSectionProps {
  products: ShoppingProduct[];
  onSelectProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct, e: React.MouseEvent) => void;
  onBuyNow: (product: ShoppingProduct) => void;
}

export const TwoDealsSection: React.FC<TwoDealsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  // Deal 1: Natural Ceylon Yellow Sapphire (gem-yellow-sapphire)
  const dealOne =
    products.find((p) => p.id === 'gem-yellow-sapphire') ||
    products.find((p) => p.category === 'gemstones') ||
    products[0];

  // Deal 2: 14 Mukhi Deva Mani Rudraksha (rud-14-mukhi)
  const dealTwo =
    products.find((p) => p.id === 'rud-14-mukhi') ||
    products.find((p) => p.id === 'rud-1-mukhi') ||
    products.find((p) => p.category === 'rudraksha') ||
    products[1];

  const deals = [
    {
      product: dealOne,
      superBadge: 'VAULT EXCLUSIVE • 22% OFF',
      tagline: 'Supreme Brihaspati Blessings for Stalled Wealth & Career',
      ribbonBg: 'from-[#D97706] to-[#B45309]',
    },
    {
      product: dealTwo,
      superBadge: 'HIMALAYAN MASTERPIECE • 26% OFF',
      tagline: 'Lord Shiva Deva Mani for Third-Eye Awakening & Protection',
      ribbonBg: 'from-[#8B5CF6] to-[#6D28D9]',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E7B743] to-[#B8871B] flex items-center justify-center text-[#180C2A] shadow-[0_2px_12px_rgba(231,183,67,0.4)] shrink-0">
          <Crown className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display font-bold text-lg sm:text-2xl text-[#F7F0FF] tracking-tight">
              Two Deals, Never Before
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E7B743]/20 text-[#FFD76A] border border-[#E7B743]/40">
              EXCLUSIVE VAULT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#C5B8D9] font-serif-luxury mt-0.5">
            Two exceptional sacred artifacts with unprecedented festive consecration
          </p>
        </div>
      </div>

      {/* Exactly 2 Prominent Cards: Side-by-Side on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {deals.map(({ product, superBadge, tagline, ribbonBg }, idx) => {
          if (!product) return null;

          const discountAmount = product.originalPrice - product.price;
          const discountPercent = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );

          return (
            <div
              key={product.id || idx}
              onClick={() => onSelectProduct(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProduct(product);
                }
              }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#27133E] via-[#1D0C30] to-[#140722] border border-[#592E82]/50 hover:border-[#E7B743]/60 shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
            >
              {/* Top Banner Ribbon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold text-white bg-gradient-to-r ${ribbonBg} shadow-sm`}
                >
                  {superBadge}
                </span>

                <span className="flex items-center gap-1 text-[11px] text-[#00D6A0] font-mono bg-[#00D6A0]/10 px-2 py-0.5 rounded-full border border-[#00D6A0]/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Lab Certified</span>
                </span>
              </div>

              {/* Main Content Split: Artwork on Left/Top, Details on Right/Bottom */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-2">
                {/* Artwork Centerpiece */}
                <div className="relative shrink-0 flex items-center justify-center p-3 rounded-2xl bg-[#160824]/60 ring-1 ring-[#482868]/40 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                    <ShoppingProductArtwork product={product} size="lg" />
                  </div>
                </div>

                {/* Details & Copy */}
                <div className="flex-1 space-y-2 text-left w-full">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00D6A0]/20 text-[#00D6A0] font-mono font-bold text-[10px]">
                      <span>{product.rating}</span>
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-[11px] text-[#A78BFA] font-mono">
                      {product.reviewsCount} Vedic Reviews
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[#F7F0FF] group-hover:text-[#FFD76A] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#E7B743] font-serif-luxury italic">
                    {product.sanskritName} • {product.planetOrDeity}
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#C5B8D9] line-clamp-2 leading-relaxed">
                    {tagline}
                  </p>

                  {/* Top 2 Benefits with Checkmark */}
                  <ul className="space-y-1 pt-1">
                    {product.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-[10.5px] sm:text-[11px] text-[#E2D9F3] flex items-start gap-1.5 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6A0] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & Double Actions */}
              <div className="mt-4 pt-3 border-t border-[#462366]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-lg sm:text-2xl text-[#F7F0FF]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm text-[#7A6B8E] line-through font-mono">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00D6A0]">
                      Save ₹{discountAmount.toLocaleString('en-IN')} ({discountPercent}% off)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9685AE] block">
                    Includes 108 Vedic Beej Mantra Consecration at Kashi Peeth
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, e);
                    }}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#2D1644] hover:bg-[#3D1E5C] text-[#E7B743] border border-[#E7B743]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyNow(product);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-[#E7B743] to-[#C99827] hover:from-[#F0C356] hover:to-[#DBA833] text-[#180C2A] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(231,183,67,0.35)] transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
