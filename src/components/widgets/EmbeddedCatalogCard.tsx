import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  ChevronLeft,
  ChevronRight,
  Award,
  Flame,
  ShoppingBag,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

export interface CatalogProduct {
  id: string;
  name: string;
  sanskritName: string;
  planet: string;
  intention: string;
  astrologyTag: string; // e.g. "Saturn • Career"
  price: number;
  originalPrice: number;
  ratti: string;
  carat: string;
  origin: string;
  colorHex: string;
  auraColor: string;
  gemType: 'blue-sapphire' | 'yellow-sapphire' | 'emerald' | 'ruby' | 'pearl' | 'coral';
  shortDesc: string;
  benefits: string[];
  certificateId: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    sanskritName: 'Indranilam / Neelam',
    planet: 'Shani (Saturn)',
    intention: 'Career & Focus',
    astrologyTag: 'Saturn • Career',
    price: 8999,
    originalPrice: 12500,
    ratti: '4.50 Ratti',
    carat: '4.12 ct',
    origin: 'Padder Mines, Kashmir',
    colorHex: '#2563eb',
    auraColor: 'rgba(37,99,235,0.3)',
    gemType: 'blue-sapphire',
    shortDesc: 'Associated with Saturn and traditionally recommended for discipline, focus, and career-related breakthrough.',
    benefits: [
      'Dissolves 8th house career friction & institutional delays',
      'Sharpened executive focus and mental discipline',
      'IGI Certified natural unheated gemstone with Kashi seal',
    ],
    certificateId: 'IGI-2026-IND-3910',
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire',
    sanskritName: 'Pushparagam / Pukhraj',
    planet: 'Brihaspati (Jupiter)',
    intention: 'Wisdom & Wealth',
    astrologyTag: 'Jupiter • Wealth',
    price: 14499,
    originalPrice: 18000,
    ratti: '5.25 Ratti',
    carat: '4.82 ct',
    origin: 'Ratnapura, Sri Lanka',
    colorHex: '#eab308',
    auraColor: 'rgba(234,179,8,0.3)',
    gemType: 'yellow-sapphire',
    shortDesc: 'Associated with Brihaspati (Guru) to activate executive promotions, financial wisdom, and dissolve Rahu obstacles.',
    benefits: [
      'Empowers Jupiter to unlock stalled business deals',
      'Opens auspicious Rajayoga in 9th & 10th houses',
      'Consecrated with 108 Vedic Guru Mantras in Kashi',
    ],
    certificateId: 'IGI-2026-SL-89412',
  },
  {
    id: 'emerald',
    name: 'Zambian Emerald',
    sanskritName: 'Marakata / Panna',
    planet: 'Budh (Mercury)',
    intention: 'Intellect & Speech',
    astrologyTag: 'Mercury • Speech',
    price: 7499,
    originalPrice: 9999,
    ratti: '5.50 Ratti',
    carat: '5.02 ct',
    origin: 'Kagem, Zambia',
    colorHex: '#10b981',
    auraColor: 'rgba(16,185,129,0.3)',
    gemType: 'emerald',
    shortDesc: 'Governed by Mercury (Budh) to elevate analytical brilliance, commercial negotiation, and magnetic speech.',
    benefits: [
      'Amplifies commercial intelligence & deal closing',
      'Pacifies overthinking and sharpens mental clarity',
      'Govt. Recognized Lab Certification with QR code',
    ],
    certificateId: 'GTL-2026-ZM-5519',
  },
  {
    id: 'ruby',
    name: 'Burmese Ruby',
    sanskritName: 'Manikya / Manik',
    planet: 'Surya (Sun)',
    intention: 'Leadership & Power',
    astrologyTag: 'Sun • Leadership',
    price: 9999,
    originalPrice: 13999,
    ratti: '4.80 Ratti',
    carat: '4.35 ct',
    origin: 'Mogok, Burma',
    colorHex: '#e11d48',
    auraColor: 'rgba(225,29,72,0.3)',
    gemType: 'ruby',
    shortDesc: 'The King of Gemstones radiating pure solar life-force for authority, self-worth, and executive recognition.',
    benefits: [
      'Awakens leadership authority and self-command',
      'Dispels inner diffidence and paternal karmic debt',
      'Energized with Aditya Hridaya Stotram at sunrise',
    ],
    certificateId: 'IGI-2026-BUR-7731',
  },
  {
    id: 'pearl',
    name: 'Basra Pearl',
    sanskritName: 'Mukta / Moti',
    planet: 'Chandra (Moon)',
    intention: 'Peace & Harmony',
    astrologyTag: 'Moon • Peace',
    price: 5499,
    originalPrice: 7500,
    ratti: '6.20 Ratti',
    carat: '5.65 ct',
    origin: 'Persian Gulf (Basra)',
    colorHex: '#f1f5f9',
    auraColor: 'rgba(241,245,249,0.3)',
    gemType: 'pearl',
    shortDesc: 'Infused with cooling lunar rays to soothe anxiety, dissolve Vish Yoga, and restore inner emotional tranquility.',
    benefits: [
      'Calms hyperactive nervous mind and insomnia',
      'Pacifies Saturn-Moon (Vish Yoga) afflicting 6th house',
      'Consecrated with Shiva Somwar Abhishekam',
    ],
    certificateId: 'SL-2026-GULF-1092',
  },
  {
    id: 'coral',
    name: 'Red Coral',
    sanskritName: 'Praval / Moonga',
    planet: 'Mangal (Mars)',
    intention: 'Courage & Stamina',
    astrologyTag: 'Mars • Courage',
    price: 4899,
    originalPrice: 6800,
    ratti: '6.50 Ratti',
    carat: '5.90 ct',
    origin: 'Mediterranean Sea, Italy',
    colorHex: '#f97316',
    auraColor: 'rgba(249,115,22,0.3)',
    gemType: 'coral',
    shortDesc: 'Prescribed for Mars to eradicate procrastination, nullify Manglik friction, and stimulate decisive bold action.',
    benefits: [
      'Conquers fear, hesitation, and physical lethargy',
      'Fortifies vitality and energetic perseverance',
      'Consecrated with Hanuman Chalisa Sankalp',
    ],
    certificateId: 'IGI-2026-MED-4482',
  },
];

export type CatalogState =
  | 'CATALOG'
  | 'PRODUCT_DETAILS'
  | 'CHECKOUT'
  | 'PAYMENT_PROCESSING'
  | 'ORDER_CONFIRMED';

interface EmbeddedCatalogCardProps {
  onOrderPlaced?: (orderInfo: {
    product: CatalogProduct;
    orderId: string;
    amount: number;
    paymentMethod: string;
  }) => void;
  onAddToCart?: (product: CatalogProduct) => void;
  onContinueChat?: () => void;
}

export const EmbeddedCatalogCard: React.FC<EmbeddedCatalogCardProps> = ({
  onOrderPlaced,
  onAddToCart,
  onContinueChat,
}) => {
  const [currentState, setCurrentState] = useState<CatalogState>('CATALOG');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(CATALOG_PRODUCTS[0]);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [carouselSlideIndex, setCarouselSlideIndex] = useState<number>(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [showCartToast, setShowCartToast] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('KS-48291');

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // 2 products per page
  const itemsPerPage = 2;
  const totalPages = Math.ceil(CATALOG_PRODUCTS.length / itemsPerPage);

  // Sync horizontal scroll position with active page dot
  const handleScroll = () => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, clientWidth } = scrollTrackRef.current;
    if (clientWidth === 0) return;
    const page = Math.round(scrollLeft / clientWidth);
    if (page !== activePageIndex && page >= 0 && page < totalPages) {
      setActivePageIndex(page);
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (!scrollTrackRef.current) return;
    const clientWidth = scrollTrackRef.current.clientWidth;
    scrollTrackRef.current.scrollTo({
      left: pageIndex * clientWidth,
      behavior: 'smooth',
    });
    setActivePageIndex(pageIndex);
  };

  // Interaction 1: Tapping product card itself -> Expands into PRODUCT_DETAILS
  const handleSelectProductCard = (prod: CatalogProduct) => {
    setSelectedProduct(prod);
    setCarouselSlideIndex(0);
    setCurrentState('PRODUCT_DETAILS');
  };

  // Interaction 2: Tapping BUY button directly -> Starts embedded CHECKOUT
  const handleQuickBuy = (e: React.MouseEvent, prod: CatalogProduct) => {
    e.stopPropagation();
    setSelectedProduct(prod);
    setCurrentState('CHECKOUT');
  };

  // Add to cart interaction
  const handleAddToCart = () => {
    setShowCartToast(true);
    if (onAddToCart) {
      onAddToCart(selectedProduct);
    }
    setTimeout(() => {
      setShowCartToast(false);
    }, 2400);
  };

  // Buy Now from expanded state
  const handleProceedToPayment = () => {
    setCurrentState('CHECKOUT');
  };

  // Pay button action -> transitions to PROCESSING then CONFIRMED
  const handleAuthorizePayment = () => {
    setCurrentState('PAYMENT_PROCESSING');
    const newOrderId = `KS-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderId(newOrderId);

    setTimeout(() => {
      setCurrentState('ORDER_CONFIRMED');
      if (onOrderPlaced) {
        onOrderPlaced({
          product: selectedProduct,
          orderId: newOrderId,
          amount: selectedProduct.price,
          paymentMethod: selectedPaymentMethod.toUpperCase(),
        });
      }
    }, 1400);
  };

  // Explore more action: returns to CATALOG with smooth slide
  const handleExploreMore = () => {
    setCurrentState('CATALOG');
    const nextPage = (activePageIndex + 1) % totalPages;
    setTimeout(() => {
      scrollToPage(nextPage);
    }, 150);
  };

  // =========================================================================
  // Gemstone Visual Renderer (SVG Faceted Gemstone & Realism)
  // =========================================================================
  const renderGemstoneVisual = (gem: CatalogProduct, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-10 h-10',
      md: 'w-16 h-16',
      lg: 'w-24 h-24 sm:w-28 sm:h-28',
    };

    return (
      <div className={`relative flex items-center justify-center ${sizeClasses[size]} shrink-0 select-none`}>
        {/* Ambient radial planetary glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none"
          style={{ backgroundColor: gem.colorHex }}
        />

        {gem.gemType === 'blue-sapphire' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="36" ry="42" fill="url(#blueGrad)" stroke="#60a5fa" strokeWidth="1" />
            <ellipse cx="50" cy="50" rx="22" ry="26" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="0.8" opacity="0.9" />
            <line x1="50" y1="8" x2="50" y2="24" stroke="#bfdbfe" strokeWidth="0.75" />
            <line x1="50" y1="76" x2="50" y2="92" stroke="#bfdbfe" strokeWidth="0.75" />
            <line x1="14" y1="50" x2="28" y2="50" stroke="#bfdbfe" strokeWidth="0.75" />
            <line x1="72" y1="50" x2="86" y2="50" stroke="#bfdbfe" strokeWidth="0.75" />
            <circle cx="42" cy="38" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="58" cy="60" r="1.2" fill="#ffffff" opacity="0.7" />
          </svg>
        )}

        {gem.gemType === 'yellow-sapphire' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(234,179,8,0.4)]">
            <defs>
              <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#facc15" />
                <stop offset="75%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
            </defs>
            <rect x="16" y="16" width="68" height="68" rx="16" fill="url(#yellowGrad)" stroke="#fef08a" strokeWidth="1" />
            <rect x="30" y="30" width="40" height="40" rx="8" fill="#a16207" stroke="#fef9c3" strokeWidth="0.8" opacity="0.9" />
            <line x1="16" y1="16" x2="30" y2="30" stroke="#fef08a" strokeWidth="0.75" />
            <line x1="84" y1="16" x2="70" y2="30" stroke="#fef08a" strokeWidth="0.75" />
            <line x1="16" y1="84" x2="30" y2="70" stroke="#fef08a" strokeWidth="0.75" />
            <line x1="84" y1="84" x2="70" y2="70" stroke="#fef08a" strokeWidth="0.75" />
            <circle cx="40" cy="38" r="2.2" fill="#ffffff" opacity="0.95" />
            <circle cx="62" cy="58" r="1.3" fill="#ffffff" opacity="0.7" />
          </svg>
        )}

        {gem.gemType === 'emerald' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)]">
            <defs>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="30%" stopColor="#34d399" />
                <stop offset="70%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>
            <polygon points="26,14 74,14 86,26 86,74 74,86 26,86 14,74 14,26" fill="url(#emeraldGrad)" stroke="#6ee7b7" strokeWidth="1" />
            <polygon points="34,26 66,26 74,34 74,66 66,74 34,74 26,66 26,34" fill="#047857" stroke="#a7f3d0" strokeWidth="0.8" opacity="0.9" />
            <circle cx="38" cy="34" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="60" cy="58" r="1.2" fill="#ffffff" opacity="0.7" />
          </svg>
        )}

        {gem.gemType === 'ruby' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)]">
            <defs>
              <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="30%" stopColor="#f43f5e" />
                <stop offset="70%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="36" ry="42" fill="url(#rubyGrad)" stroke="#fda4af" strokeWidth="1" />
            <ellipse cx="50" cy="50" rx="22" ry="26" fill="#881337" stroke="#fecdd3" strokeWidth="0.8" opacity="0.9" />
            <circle cx="42" cy="38" r="2.2" fill="#ffffff" opacity="0.9" />
            <circle cx="58" cy="62" r="1.3" fill="#ffffff" opacity="0.7" />
          </svg>
        )}

        {gem.gemType === 'pearl' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(241,245,249,0.4)]">
            <defs>
              <radialGradient id="pearlGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="80%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="38" fill="url(#pearlGrad)" stroke="#f8fafc" strokeWidth="1.2" />
            <circle cx="38" cy="38" r="6" fill="#ffffff" opacity="0.8" filter="blur(1px)" />
            <circle cx="34" cy="34" r="2.5" fill="#ffffff" opacity="0.95" />
          </svg>
        )}

        {gem.gemType === 'coral' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(249,115,22,0.4)]">
            <defs>
              <radialGradient id="coralGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="35%" stopColor="#fb923c" />
                <stop offset="75%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
            </defs>
            <rect x="22" y="16" width="56" height="68" rx="26" fill="url(#coralGrad)" stroke="#fdba74" strokeWidth="1" />
            <ellipse cx="42" cy="34" rx="8" ry="12" fill="#ffffff" opacity="0.4" filter="blur(1px)" />
            <circle cx="38" cy="30" r="2.5" fill="#ffffff" opacity="0.9" />
          </svg>
        )}
      </div>
    );
  };

  // Carousel slide views inside PRODUCT_DETAILS
  const renderCarouselSlide = () => {
    switch (carouselSlideIndex) {
      case 0:
        return (
          <div className="w-full h-32 sm:h-36 flex flex-col items-center justify-center relative bg-[#0b0c14]/80 rounded-xl border border-[#232940] overflow-hidden">
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[10px] text-[#dfb76c] font-medium">
              ✦ Macro Cut View
            </div>
            {renderGemstoneVisual(selectedProduct, 'lg')}
            <span className="text-[10px] text-[#a8a192] mt-1 font-serif-luxury italic">
              100% Natural, Unheated & Untreated
            </span>
          </div>
        );
      case 1:
        return (
          <div className="w-full h-32 sm:h-36 flex flex-col items-center justify-center relative bg-[#0b0c14]/80 rounded-xl border border-[#232940] p-3 text-center">
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[10px] text-[#dfb76c] font-medium">
              💍 Sacred Ring Setting
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#dfb76c]/40 flex items-center justify-center p-2 mb-1">
              <span className="text-xl">✨</span>
            </div>
            <h4 className="text-xs font-semibold text-[#fcedc5]">
              Vedic Ashtadhatu / 925 Sterling Silver
            </h4>
            <p className="text-[10px] text-[#8e8779] max-w-xs mt-0.5">
              Open-back bottom bezel allows planetary radiation to directly touch the skin.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-32 sm:h-36 flex flex-col items-center justify-center relative bg-[#0b0c14]/80 rounded-xl border border-[#232940] p-3 text-center">
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[10px] text-[#dfb76c] font-medium flex items-center gap-1">
              <Award className="w-3 h-3 text-[#dfb76c]" />
              <span>Lab Certified</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#14182b] border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c] font-bold text-sm mb-1">
              IGI
            </div>
            <p className="text-[11px] font-mono text-[#fcedc5] font-medium">
              #{selectedProduct.certificateId}
            </p>
            <p className="text-[10px] text-[#8e8779] mt-0.5">
              Govt-recognized spectrographic analysis verifying origin: {selectedProduct.origin}
            </p>
          </div>
        );
      case 3:
      default:
        return (
          <div className="w-full h-32 sm:h-36 flex flex-col items-center justify-center relative bg-[#0b0c14]/80 rounded-xl border border-[#232940] p-3 text-center">
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[10px] text-[#dfb76c] font-medium flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#f59e0b]" />
              <span>Kashi Consecration</span>
            </div>
            <span className="text-2xl mb-0.5">🪔</span>
            <h4 className="text-xs font-semibold text-[#fcedc5]">
              Prana Pratishtha by Kashi Peeth
            </h4>
            <p className="text-[10px] text-[#8e8779] max-w-xs mt-0.5">
              Individual Gotra Sankalp recitation during auspicious Shukla Paksha Muhurat.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      ref={cardContainerRef}
      className="w-full my-2.5 rounded-2xl bg-gradient-to-b from-[#111322] via-[#0e101a] to-[#0a0b12] border border-[#dfb76c]/30 shadow-2xl relative overflow-hidden transition-all duration-300 ease-out select-none"
    >
      {/* Top subtle golden celestial aura beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfb76c]/80 to-transparent" />

      {/* =================================================================== */}
      {/* STATE 1: INITIAL CATALOG (Two products side-by-side, swipeable)     */}
      {/* =================================================================== */}
      {currentState === 'CATALOG' && (
        <div className="p-3 sm:p-3.5 flex flex-col justify-between h-[30vh] min-h-[220px] max-h-[270px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1f2438]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span className="text-[11px] font-display font-semibold tracking-wide text-[#fcedc5]">
                Recommended for you
              </span>
            </div>
            <span className="text-[10px] text-[#8e8779] font-mono">
              Swipe to explore ({activePageIndex + 1}/{totalPages})
            </span>
          </div>

          {/* Swipeable Track with CSS Scroll Snap */}
          <div
            ref={scrollTrackRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-none py-1.5 gap-2 items-stretch"
          >
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const pair = CATALOG_PRODUCTS.slice(pageIdx * itemsPerPage, pageIdx * itemsPerPage + itemsPerPage);
              return (
                <div
                  key={`page-${pageIdx}`}
                  className="w-full shrink-0 snap-center grid grid-cols-2 gap-2 h-full"
                >
                  {pair.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProductCard(product)}
                      className="group flex flex-col justify-between p-2 rounded-xl bg-[#141724]/90 border border-[#2b3046] hover:border-[#dfb76c]/50 active:scale-[0.98] transition-all duration-200 cursor-pointer relative overflow-hidden"
                    >
                      {/* Product Visual */}
                      <div className="flex items-center justify-center py-1">
                        {renderGemstoneVisual(product, 'sm')}
                      </div>

                      {/* Info */}
                      <div className="space-y-0.5 text-center mt-1">
                        <h4 className="text-[11px] sm:text-xs font-display font-bold text-[#ede8dc] truncate group-hover:text-[#fcedc5]">
                          {product.name}
                        </h4>
                        <p className="text-[9px] text-[#dfb76c] font-medium truncate">
                          {product.astrologyTag}
                        </p>
                        <p className="text-[11px] font-mono font-bold text-[#fcedc5]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Buy Button (min 44px touch target) */}
                      <button
                        onClick={(e) => handleQuickBuy(e, product)}
                        className="mt-1.5 w-full py-1.5 rounded-lg bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-[10px] tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer min-h-[36px] flex items-center justify-center gap-1"
                        title={`Buy ${product.name} Now`}
                      >
                        <span>BUY</span>
                        <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {Array.from({ length: totalPages }).map((_, dotIdx) => (
              <button
                key={`dot-${dotIdx}`}
                onClick={() => scrollToPage(dotIdx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  activePageIndex === dotIdx
                    ? 'w-4 h-1.5 bg-[#dfb76c]'
                    : 'w-1.5 h-1.5 bg-[#373e56] hover:bg-[#525b7a]'
                }`}
                title={`Go to page ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 2: EXPANDED PRODUCT STATE (Details, Carousel, Add Cart/Buy)   */}
      {/* =================================================================== */}
      {currentState === 'PRODUCT_DETAILS' && (
        <div className="p-3.5 sm:p-4 flex flex-col justify-between h-[52vh] min-h-[380px] max-h-[500px] animate-in fade-in zoom-in-95 duration-200">
          {/* Header with Back button */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2438]">
            <button
              onClick={() => setCurrentState('CATALOG')}
              className="flex items-center gap-1.5 text-xs text-[#a8a192] hover:text-[#fcedc5] cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Recommendations</span>
            </button>
            <span className="text-[10px] text-[#dfb76c] font-mono px-2 py-0.5 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/20">
              {selectedProduct.planet}
            </span>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-2 space-y-2.5">
            {/* Image Carousel (Section 7) */}
            <div className="relative">
              {renderCarouselSlide()}

              {/* Prev / Next controls */}
              <button
                onClick={() => setCarouselSlideIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0c14]/70 border border-[#30364d] text-[#cdc7ba] hover:text-[#dfb76c] flex items-center justify-center cursor-pointer"
                title="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCarouselSlideIndex((prev) => (prev === 3 ? 0 : prev + 1))}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0c14]/70 border border-[#30364d] text-[#cdc7ba] hover:text-[#dfb76c] flex items-center justify-center cursor-pointer"
                title="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Carousel Dots */}
              <div className="flex items-center justify-center gap-1 mt-1.5">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={`carousel-dot-${idx}`}
                    onClick={() => setCarouselSlideIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      carouselSlideIndex === idx ? 'bg-[#dfb76c] w-3' : 'bg-[#373e56]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Title & Pricing */}
            <div className="flex items-start justify-between gap-2 pt-0.5">
              <div>
                <h3 className="text-sm sm:text-base font-display font-bold text-[#fcedc5] leading-snug">
                  {selectedProduct.name}
                </h3>
                <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
                  {selectedProduct.sanskritName} • {selectedProduct.ratti}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#6b7280] line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-mono font-bold text-[#dfb76c]">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[9px] text-[#10b981] font-semibold">
                  Includes Consecration
                </span>
              </div>
            </div>

            {/* Concise Description (Section 8) */}
            <p className="text-xs text-[#b8b0a0] leading-relaxed">
              {selectedProduct.shortDesc}
            </p>

            {/* Astrological Benefits */}
            <div className="space-y-1 bg-[#121524]/60 p-2 rounded-xl border border-[#232940]">
              <span className="text-[10px] text-[#dfb76c] font-semibold uppercase tracking-wider block">
                ✦ Astrological Resonance:
              </span>
              {selectedProduct.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#cfc8ba]">
                  <CheckCircle2 className="w-3 h-3 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Added Toast Notification */}
          {showCartToast && (
            <div className="mb-2 py-1 px-3 rounded-lg bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs font-medium flex items-center justify-center gap-1.5 animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>✓ Added to cart</span>
            </div>
          )}

          {/* Expanded CTAs (Section 9) */}
          <div className="pt-2 border-t border-[#1f2438] grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3 rounded-xl bg-[#161a29] border border-[#dfb76c]/40 hover:bg-[#1f2438] text-[#fcedc5] text-xs font-semibold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleProceedToPayment}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] text-xs font-bold transition-all active:scale-95 shadow-md shadow-[#dfb76c]/20 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 3: CHECKOUT (Embedded Payment Method Selector)                */}
      {/* =================================================================== */}
      {currentState === 'CHECKOUT' && (
        <div className="p-3.5 sm:p-4 flex flex-col justify-between h-[52vh] min-h-[380px] max-h-[500px] animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2438]">
            <button
              onClick={() => setCurrentState('PRODUCT_DETAILS')}
              className="flex items-center gap-1.5 text-xs text-[#a8a192] hover:text-[#fcedc5] cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-1 text-[11px] text-[#dfb76c] font-medium">
              <Lock className="w-3 h-3" />
              <span>Secure Vedic Checkout</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-2 space-y-3">
            {/* Product Summary Row */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141726] border border-[#2b3046]">
              <div className="flex items-center gap-2.5">
                {renderGemstoneVisual(selectedProduct, 'sm')}
                <div>
                  <h4 className="text-xs font-bold text-[#ede8dc]">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-[10px] text-[#8e8779]">
                    Kashi Consecration Included
                  </p>
                </div>
              </div>
              <span className="text-sm font-mono font-bold text-[#dfb76c]">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#8e8779] font-semibold uppercase tracking-wider block">
                Select Payment Method
              </span>

              {[
                {
                  id: 'upi',
                  label: 'UPI (Google Pay, PhonePe, Paytm)',
                  icon: <Smartphone className="w-4 h-4 text-[#dfb76c]" />,
                  badge: 'Instant & Zero Fee',
                },
                {
                  id: 'card',
                  label: 'Credit / Debit Card (Visa, RuPay)',
                  icon: <CreditCard className="w-4 h-4 text-[#dfb76c]" />,
                },
                {
                  id: 'netbanking',
                  label: 'Net Banking (All Indian Banks)',
                  icon: <Landmark className="w-4 h-4 text-[#dfb76c]" />,
                },
                {
                  id: 'wallet',
                  label: 'Sanctum Wallet (Bal: ₹12,000)',
                  icon: <Wallet className="w-4 h-4 text-[#dfb76c]" />,
                },
              ].map((method) => {
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[#181d2f] border-[#dfb76c] text-[#fcedc5] shadow-xs'
                        : 'bg-[#121422] border-[#252a3d] text-[#a8a192] hover:border-[#dfb76c]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {method.icon}
                      <span className="text-xs font-medium">{method.label}</span>
                    </div>
                    {method.badge && (
                      <span className="text-[9px] text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10 font-mono">
                        {method.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Guarantee Callout */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0e1017] border border-[#232940] text-[10px] text-[#8e8779]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfb76c] shrink-0" />
              <span>Insured BlueDart Express + 100% Authentic IGI Lab Certificate.</span>
            </div>
          </div>

          {/* Pay CTA Button (min 44px touch target) */}
          <div className="pt-2 border-t border-[#1f2438]">
            <button
              onClick={handleAuthorizePayment}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs tracking-wide uppercase transition-all active:scale-95 shadow-lg shadow-[#dfb76c]/25 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pay ₹{selectedProduct.price.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 4: PAYMENT PROCESSING (Celestial Spinner Animation)           */}
      {/* =================================================================== */}
      {currentState === 'PAYMENT_PROCESSING' && (
        <div className="p-6 flex flex-col items-center justify-center text-center h-[52vh] min-h-[380px] max-h-[500px] animate-in fade-in duration-200">
          {/* Rotating celestial geometric ring */}
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#dfb76c] animate-spin [animation-duration:3s]" />
            <div className="w-10 h-10 rounded-full bg-[#181d2f] border border-[#dfb76c]/60 flex items-center justify-center text-[#dfb76c] text-sm animate-pulse">
              ✦
            </div>
          </div>

          <h3 className="font-display font-bold text-sm text-[#fcedc5] tracking-wide">
            Authorizing Sankalp Payment...
          </h3>
          <p className="text-xs text-[#a8a192] max-w-xs mt-1">
            Connecting to 256-bit encrypted gateway & reserving consecrated gem.
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 5: ORDER CONFIRMED (Satisfying celestial celebration)         */}
      {/* =================================================================== */}
      {currentState === 'ORDER_CONFIRMED' && (
        <div className="p-4 sm:p-5 flex flex-col items-center justify-between text-center h-[52vh] min-h-[380px] max-h-[500px] animate-in fade-in zoom-in-95 duration-300">
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 w-full max-w-sm">
            {/* Animated Gold Checkmark & Sparkle */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-lg shadow-[#dfb76c]/20 animate-in zoom-in-50 duration-300">
                <div className="w-full h-full rounded-full bg-[#0d0f18] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#dfb76c] animate-in zoom-in duration-200" />
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[#dfb76c] absolute -top-1 -right-1 animate-pulse" />
            </div>

            {/* Title & Order info */}
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#fcedc5]">
                Order Confirmed
              </h3>
              <p className="text-xs text-[#dfb76c] font-medium mt-0.5">
                {selectedProduct.name}
              </p>
              <p className="text-[11px] font-mono text-[#8e8779] mt-0.5">
                ₹{selectedProduct.price.toLocaleString('en-IN')} Paid • Order #{confirmedOrderId}
              </p>
            </div>

            {/* Confirmation milestones */}
            <div className="w-full space-y-1.5 p-3 rounded-xl bg-[#121524] border border-[#232940] text-left text-xs">
              <div className="flex items-center gap-2 text-[#10b981]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-medium">Payment successful via {selectedPaymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 text-[#fcedc5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb76c] shrink-0" />
                <span className="text-[11px]">Vedic Consecration scheduled at Kashi Sanctum</span>
              </div>
              <div className="flex items-center gap-2 text-[#a8a192]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb76c] shrink-0" />
                <span className="text-[11px]">IGI Certified Laboratory Report sealed</span>
              </div>
            </div>
          </div>

          {/* Action: Explore More (Section 15) */}
          <div className="w-full pt-3 border-t border-[#1f2438]">
            <button
              onClick={handleExploreMore}
              className="w-full py-2.5 px-4 rounded-xl bg-[#161a29] border border-[#dfb76c]/40 hover:bg-[#1f2438] text-[#fcedc5] text-xs font-semibold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Explore More Gemstones</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
