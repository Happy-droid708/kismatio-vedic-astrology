import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Flame,
  Crown,
  ArrowRight,
} from 'lucide-react';

interface BannerSlide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  targetCategory?: string;
  bgGradient: string;
  accentColor: string;
  badgeColor: string;
  badgeText: string;
  icon: React.ReactNode;
}

interface FlipkartPromoBannerProps {
  onCtaClick: (category?: string) => void;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'navratri-festive',
    tag: 'FESTIVE MAHOTSAV',
    title: 'Navratri Divine Grace',
    highlight: 'Up to 35% Off',
    description: 'Consecrated Ceylon Sapphires, Burma Rubies & Zambian Emeralds with Free Kashi Peeth Sankalp.',
    ctaText: 'Explore Festive Deals',
    targetCategory: 'gemstones',
    bgGradient: 'from-[#42124F] via-[#350F3F] to-[#1E092B]',
    accentColor: '#FFD76A',
    badgeColor: 'bg-[#FF4668] text-white',
    badgeText: 'LIMITED FESTIVE WINDOW',
    icon: <Sparkles className="w-5 h-5 text-[#FFD76A]" />,
  },
  {
    id: 'rudraksha-sacred',
    tag: 'NEPAL HIMALAYAS',
    title: 'Sacred 1 to 14 Mukhi Rudraksha',
    highlight: 'Lab Certified & X-Ray Tested',
    description: 'Authentic round Nepali beads energized with 108 Beej Mantras. Silver capping options available.',
    ctaText: 'View Sacred Beads',
    targetCategory: 'rudraksha',
    bgGradient: 'from-[#401C12] via-[#2D130C] to-[#1A0B07]',
    accentColor: '#F97316',
    badgeColor: 'bg-[#F97316] text-[#180C2A]',
    badgeText: '100% BOTANICAL PURITY',
    icon: <Flame className="w-5 h-5 text-[#F97316]" />,
  },
  {
    id: 'jewellery-rings',
    tag: 'VEDIC CRAFTSMANSHIP',
    title: 'Astrological Panchdhatu Rings',
    highlight: 'Skin-Contact Open Backing',
    description: 'Handmade in sacred five-metal alloys and 18K gold. Activated during auspicious Shukla Paksha muhurta.',
    ctaText: 'Find Your Ring',
    targetCategory: 'jewellery',
    bgGradient: 'from-[#172554] via-[#1E1B4B] to-[#110D25]',
    accentColor: '#60A5FA',
    badgeColor: 'bg-[#00D6A0] text-[#12091F]',
    badgeText: 'MUHURTA ENERGIZED',
    icon: <Crown className="w-5 h-5 text-[#FBBF24]" />,
  },
];

export const FlipkartPromoBanner: React.FC<FlipkartPromoBannerProps> = ({
  onCtaClick,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = BANNER_SLIDES.length;

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % total);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const slide = BANNER_SLIDES[currentIdx];

  return (
    <div
      className="relative w-full overflow-hidden max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`relative w-full rounded-2xl bg-gradient-to-r ${slide.bgGradient} p-4 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-[#52297A]/30 overflow-hidden min-h-[170px] sm:min-h-[220px] flex items-center transition-all duration-500`}
      >
        {/* Subtle decorative glowing background circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#E7B743]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#EC4899]/10 blur-3xl pointer-events-none" />

        {/* Content Section */}
        <div className="relative z-10 w-full sm:max-w-2xl flex flex-col justify-between h-full space-y-2 sm:space-y-3">
          {/* Badge & Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider ${slide.badgeColor}`}
            >
              {slide.badgeText}
            </span>
            <span className="text-[11px] font-mono font-semibold text-[#C5B8D9] flex items-center gap-1">
              <span>✦</span>
              <span>{slide.tag}</span>
            </span>
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-display font-bold text-xl sm:text-3xl text-[#F7F0FF] tracking-tight leading-snug">
              {slide.title}{' '}
              <span className="text-[#FFD76A] block sm:inline">
                • {slide.highlight}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#C5B8D9] line-clamp-2 mt-1 font-serif-luxury max-w-xl">
              {slide.description}
            </p>
          </div>

          {/* Action CTA & Guarantees */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onCtaClick(slide.targetCategory)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E7B743] to-[#C99827] text-[#180C2A] font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(231,183,67,0.35)] hover:shadow-[0_6px_20px_rgba(231,183,67,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#A78BFA] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D6A0]" />
              <span>Kashi Peeth Consecrated</span>
            </span>
          </div>
        </div>

        {/* Right Graphic / Decorative Badge (hidden on very small screens) */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center justify-center p-4 rounded-2xl bg-[#1B0D2E]/60 backdrop-blur-md border border-[#532E7C]/40 text-center shadow-xl">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E7B743]/20 to-[#A87B2A]/40 flex items-center justify-center ring-1 ring-[#E7B743]/40 mb-2">
            {slide.icon}
          </div>
          <span className="text-xs font-mono font-bold text-[#FFD76A]">
            100% ORIGINAL
          </span>
          <span className="text-[10px] text-[#C5B8D9]">Govt Lab Certified</span>
        </div>
      </div>

      {/* Prev / Next Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous banner"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A0B2C]/70 hover:bg-[#1A0B2C] text-[#F7F0FF] flex items-center justify-center shadow-lg border border-[#482868]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next banner"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A0B2C]/70 hover:bg-[#1A0B2C] text-[#F7F0FF] flex items-center justify-center shadow-lg border border-[#482868]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Carousel Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIdx ? 'w-6 bg-[#E7B743]' : 'w-1.5 bg-[#452865] hover:bg-[#6A4197]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
