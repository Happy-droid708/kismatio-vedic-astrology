import React, { useState } from 'react';
import {
  Search,
  Bell,
  Star,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  ChevronRight,
  Eye,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Astrologer, GemstoneProduct } from '../../types/astrology';
import { CURATED_ASTROLOGERS, FEATURED_GEMSTONES } from '../../data/astrologyData';

interface ExploreScreenProps {
  onStartChatWithAstrologer: (astro: Astrologer) => void;
  onInspectGemstone: (gem: GemstoneProduct) => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onStartChatWithAstrologer,
  onInspectGemstone,
  onOpenNotifications,
  onOpenProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState<{
    id: string;
    title: string;
    subtitle?: string;
    icon: string;
    description: string;
    details: string[];
  } | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{
    id: string;
    title: string;
    category: string;
    author: string;
    readTime: string;
    summary: string;
    content: string;
    gemstoneRecommendation?: string;
  } | null>(null);

  const categories = [
    { id: 'All', label: '✦ All' },
    { id: 'Astrology', label: '✦ Astrology' },
    { id: 'Gemstones', label: '💎 Gemstones' },
    { id: 'Tarot', label: '🔮 Tarot' },
    { id: 'Horoscope', label: '🌙 Horoscope' },
    { id: 'Career', label: '💼 Career' },
    { id: 'Love', label: '❤️ Love & Vivah' },
    { id: 'Shani', label: '🪐 Shani-Rahu' },
  ];

  // Extended Gemstones Catalog
  const allGemstones: GemstoneProduct[] = [
    FEATURED_GEMSTONES['yellow-sapphire'],
    FEATURED_GEMSTONES['blue-sapphire'],
    {
      id: 'emerald-zambia-410',
      name: 'Natural Untreated Zambian Emerald',
      sanskritName: 'Marakata / Budha Ratna (Panna)',
      weightRatti: 4.10,
      weightCarat: 3.75,
      origin: 'Kagem Mines, Zambia',
      treatment: '100% Natural, Unoiled & Untreated',
      shape: 'Emerald Octagon Cut',
      colorGrade: 'Deep Vivid Forest Green',
      rulingPlanet: 'Budha (Mercury)',
      deity: 'Lord Budha Dev',
      beejMantra: 'ॐ बुं बुधाय नमः (Om Bum Budhaya Namah)',
      basePrice: 36000,
      consecrationFee: 4000,
      certificationBody: 'GIA / IGI Govt Recognized Lab',
      reportNumber: 'GIA-2026-EM-4910',
      benefits: [
        'Ignites sharp intellect, analytical clarity & communication',
        'Blesses traders, software engineers & business strategists',
        'Pacifies Mercury combust or afflicted in 6th/8th house',
      ],
      idealMetal: '18K Hallmarked Gold or Silver',
      wearingDay: 'Wednesday Morning (Budhwar) during Shukla Paksha',
      wearingFinger: 'Little Finger (Kanishtha)',
      description: 'Luminous vivid green emerald exhibiting exceptional crystalline transparency and pure astrological resonance with Mercury.',
    },
    {
      id: 'ruby-burma-360',
      name: 'Burmese Pigeon Blood Natural Ruby',
      sanskritName: 'Manikya / Surya Ratna',
      weightRatti: 3.60,
      weightCarat: 3.32,
      origin: 'Mogok Valley, Burma (Myanmar)',
      treatment: 'Unheated, Untreated',
      shape: 'Oval Brilliant Cut',
      colorGrade: 'Pigeon Blood Crimson Red',
      rulingPlanet: 'Surya (Sun)',
      deity: 'Lord Surya Narayana',
      beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
      basePrice: 64000,
      consecrationFee: 5000,
      certificationBody: 'SSEF / GIA Certified Lab',
      reportNumber: 'SSEF-2026-RB-7102',
      benefits: [
        'Commands royal authority, executive power & political recognition',
        'Bestows fatherly blessings and revitalizes solar vitality',
        'Clears obstacles in government and institutional ventures',
      ],
      idealMetal: '18K Yellow Gold or Copper',
      wearingDay: 'Sunday (Ravivar) at Sunrise during Shukla Paksha',
      wearingFinger: 'Ring Finger (Anamika)',
      description: 'The King of Gems. An ultra-rare unheated Burmese ruby of intense crimson saturation, carrying the blazing tejas of the Sun.',
    },
    {
      id: 'pearl-south-sea-620',
      name: 'Natural Basra-Grade South Sea Pearl',
      sanskritName: 'Mukta / Chandra Ratna (Moti)',
      weightRatti: 6.20,
      weightCarat: 5.70,
      origin: 'South Sea / Persian Gulf Region',
      treatment: '100% Natural, Untreated Pearl',
      shape: 'Flawless Spherical Drop',
      colorGrade: 'Silvery Moonbeam White with Rose Overtone',
      rulingPlanet: 'Chandra (Moon)',
      deity: 'Lord Chandra Bhagavan',
      beejMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
      basePrice: 18500,
      consecrationFee: 3000,
      certificationBody: 'IGI Recognized Gem Lab',
      reportNumber: 'IGI-2026-PL-1904',
      benefits: [
        'Calms hyper-active nervous system, anxiety & emotional turbulence',
        'Restores deep sleep and peace of mind during Vish Yoga',
        'Enhances intuition and maternal harmony',
      ],
      idealMetal: 'Pure 925 Sterling Silver',
      wearingDay: 'Monday (Somwar) during Evening Twilight',
      wearingFinger: 'Little Finger (Kanishtha) of working hand',
      description: 'Lustrous natural pearl reflecting the serene cooling rays of Soma, ideal for calming emotional stress and pacifying Moon afflictions.',
    },
  ];

  // Astrology Tools list (Section 8)
  const astrologyTools = [
    {
      id: 'tool-kundli',
      title: 'Janma Kundli',
      subtitle: 'Complete D1 & D9 Charts',
      icon: '🌙',
      tag: 'POPULAR',
      description: 'Calculate your exact Vedic birth horoscope with planetary degrees, Nakshatras, Lagna chart, and Navamsha.',
      details: [
        'Chitra Paksha (Lahiri) Ayanamsha precision',
        'Detailed Mahadasha & Antardasha timeline through 2038',
        'House-by-house Bhava Chalit and planet strengths',
      ],
    },
    {
      id: 'tool-palm',
      title: 'Hastha Rekha (Palm)',
      subtitle: 'Life & Fate Line Scan',
      icon: '✋',
      tag: 'NEW',
      description: 'Traditional Vedic Samudrika Shastra palm line scan analyzing destiny line, sun line, and Mount of Jupiter.',
      details: [
        'Life line vitality & career shift indications',
        'Fate line timing for financial windfalls',
        'Mount of Saturn & Jupiter prominence scoring',
      ],
    },
    {
      id: 'tool-face',
      title: 'Mukha Samudrika',
      subtitle: 'Face Reading & Aura',
      icon: '👁',
      tag: 'VEDIC',
      description: 'Ancient Indian physiognomy analyzing forehead shape, eye symmetry, and brow lines reflecting your planetary ruler.',
      details: [
        'Forehead planetary zone classification (Jupiter / Mars / Mercury)',
        'Facial aura radiance & Graha influence breakdown',
        'Karmic tendencies and auspicious periods',
      ],
    },
    {
      id: 'tool-rudraksha',
      title: 'Rudraksha Match',
      subtitle: 'Sacred Mukhi Calculator',
      icon: '📿',
      tag: 'RECOMMENDED',
      description: 'Determine which authentic Nepal or Indonesian Rudraksha bead resonates with your birth chart and active Dasha.',
      details: [
        'Panchamukhi (5-Mukhi) for general Jupiter balancing',
        'Saat-Mukhi (7-Mukhi) for Goddess Mahalakshmi & Saturn grace',
        'Wearing muhurat and Kashi consecration protocol',
      ],
    },
    {
      id: 'tool-sadesati',
      title: 'Shani Sade-Sati',
      subtitle: '7.5 Yr Saturn Transit',
      icon: '⏳',
      tag: 'CRUCIAL',
      description: 'Find out whether you are currently undergoing Rising, Peak, or Setting Sade-Sati or Kantaka/Ashtama Shani.',
      details: [
        'Exact phase dates, peak intensity duration',
        'Remedial Kavach, Hanuman Chalisa timings',
        'Custom Blue Sapphire vs Amethyst suitability',
      ],
    },
    {
      id: 'tool-vivah',
      title: 'Gun Milan (Vivah)',
      subtitle: '36 Koota Match',
      icon: '🕊',
      tag: 'CLASSIC',
      description: 'Authentic 36-point Ashta Koota compatibility matching including Nadi Dosha, Bhakoot, and Mangal Dosha analysis.',
      details: [
        'Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi',
        'Detailed Manglik dosha cancellation rules',
        'Long-term emotional and progeny harmony index',
      ],
    },
  ];

  // Discoverable Content / Astrology Insights (Section 9)
  const astrologyInsights = [
    {
      id: 'art-saturn-career',
      title: 'Saturn & Your Career: Overcoming 8th House Resistance in 2026',
      category: 'Career & Karma',
      author: 'Acharya Rajiv Shastri',
      readTime: '4 min read',
      summary: 'Why executive decisions stall right at the finish line during Ashtama Shani, and the exact Vedic remedies to unlock movement.',
      content: `In Vedic Shastra, when Saturn transits the 8th house from your natal Moon or Lagna, it creates an energetic threshold known as Kantaka or Ashtama Shani. This period is not designed to destroy your career; rather, it is Saturn's ruthless audit of foundations.

During this transit, Rahu's smoke can amplify self-doubt and cause legal or administrative bottlenecks right before signature fruition. Shastra recommends pacifying Shani through disciplined daily routines, chanting the Dasharatha Shani Stotram on Saturdays, and fortifying your chart's natural benefic—Lord Jupiter (Brihaspati).`,
      gemstoneRecommendation: 'Natural Ceylon Yellow Sapphire or Blue Sapphire (after Kundli check)',
    },
    {
      id: 'art-yellow-sapphire',
      title: 'The Sacred Science of Pukhraj: Why Guru Rules Breakthroughs',
      category: 'Gemology',
      author: 'Astro Priya Sharma',
      readTime: '3 min read',
      summary: 'How genuine untreated Ceylon Yellow Sapphires transmit Jupiterian bio-frequency to dissolve Rahu-Saturn obstacles.',
      content: `Vedic mineralogy (Ratna Shastra) posits that gemstones are terrestrial capacitors for planetary electromagnetic radiation. Pushparagam (Yellow Sapphire) resonates on the wavelength of Brihaspati—the cosmic Guru who governs wisdom, expansion, and wealth.

To achieve maximum efficacy, the sapphire must be completely untreated and unheated, allowing light to traverse uninterrupted through its crystal lattice. Consecration with 108 Gayatri Japa activates the stone's Prana Pratishtha.`,
      gemstoneRecommendation: 'Natural Untreated Ceylon Yellow Sapphire (Pushparagam)',
    },
    {
      id: 'art-rahu-2026',
      title: 'The Rahu-Ketu Karmic Axis: Navigating Sudden Turning Points',
      category: 'Planetary Transits',
      author: 'Dr. Arundhati Maitreyi',
      readTime: '5 min read',
      summary: 'Understanding the nodal shifts of Rahu in Pisces and Ketu in Virgo, and what it implies for your personal chart.',
      content: `Rahu represents your forward-looking karmic obsession, while Ketu signifies the past-life skills you must surrender. As Rahu navigates watery, ethereal signs, seekers experience vivid dreams, sudden career pivots, and a heightened desire for spiritual liberation.

Grounding yourself with Rudraksha beads and propitiating Lord Shiva during Pradosham helps harmonize the intense nodal currents.`,
      gemstoneRecommendation: 'Hessonite Garnet (Gomedh) or Sacred Rudraksha Mala',
    },
    {
      id: 'art-navamsha-d9',
      title: 'Decoding Your Navamsha (D9): The Destiny Map of Your Second Half of Life',
      category: 'Vedic Secrets',
      author: 'Acharya Dev Sharma',
      readTime: '4 min read',
      summary: 'Why your D1 birth chart only tells half the story, and how D9 activates your true soul purpose after age 32.',
      content: `While the Rashi (D1) chart illustrates the physical circumstances you were born into, the Navamsha (D9) chart unveils the fruit of your karma. Planets that appear debilitated in D1 can gain exalted dignity (Neechabhanga) in D9, turning early hardship into later mastery.

Understanding which planets are Vargottama (occupying identical signs in D1 and D9) reveals your unshakable karmic strengths.`,
      gemstoneRecommendation: 'Consult an Acharya for complete D1/D9 cross-verification',
    },
  ];

  // Filter Astrologers & Gemstones based on search & category
  const filteredAstrologers = CURATED_ASTROLOGERS.filter((astro) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      astro.name.toLowerCase().includes(q) ||
      astro.specializations.some((s) => s.toLowerCase().includes(q)) ||
      astro.languages.some((l) => l.toLowerCase().includes(q)) ||
      astro.bio.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Astrology') return true;
    if (activeCategory === 'Career') return astro.specializations.some((s) => s.toLowerCase().includes('career'));
    if (activeCategory === 'Love') return astro.specializations.some((s) => s.toLowerCase().includes('relationship') || s.toLowerCase().includes('vivah'));
    if (activeCategory === 'Gemstones') return astro.specializations.some((s) => s.toLowerCase().includes('gemstone'));
    if (activeCategory === 'Shani') return astro.specializations.some((s) => s.toLowerCase().includes('shani') || s.toLowerCase().includes('rahu'));
    return true;
  });

  const filteredGemstones = allGemstones.filter((gem) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      gem.name.toLowerCase().includes(q) ||
      gem.sanskritName.toLowerCase().includes(q) ||
      gem.rulingPlanet.toLowerCase().includes(q) ||
      gem.benefits.some((b) => b.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (activeCategory === 'All' || activeCategory === 'Gemstones') return true;
    if (activeCategory === 'Career' && (gem.rulingPlanet.includes('Jupiter') || gem.rulingPlanet.includes('Sun'))) return true;
    if (activeCategory === 'Shani' && gem.rulingPlanet.includes('Saturn')) return true;
    return true;
  });

  const filteredArticles = astrologyInsights.filter((art) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.author.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Career' && art.category.toLowerCase().includes('career')) return true;
    if (activeCategory === 'Gemstones' && art.category.toLowerCase().includes('gemolog')) return true;
    if (activeCategory === 'Shani' && art.title.toLowerCase().includes('saturn')) return true;
    return true;
  });

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
      {/* =================================================================== */}
      {/* 1. STICKY EXPLORE HEADER (Section 2)                                */}
      {/* =================================================================== */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full bg-[#121422] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
              ✦
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
                Kismatio
              </span>
              <span className="text-[10px] text-[#dfb76c] font-mono uppercase px-1.5 py-0.5 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/25">
                Explore
              </span>
            </div>
            <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
              Vedic Sanctum Discovery
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-xl bg-[#141724] border border-[#2a2e45] text-[#cdc7ba] hover:text-[#dfb76c] hover:border-[#dfb76c]/30 active:scale-95 transition-all cursor-pointer relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
          </button>

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="p-1 rounded-xl bg-[#141724] border border-[#dfb76c]/30 hover:border-[#dfb76c]/60 active:scale-95 transition-all cursor-pointer flex items-center justify-center min-h-[36px] min-w-[36px]"
              title="My Profile & Kundli"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-[6px] bg-[#0b0c14] flex items-center justify-center text-[11px] font-bold text-[#fcedc5]">
                  👤
                </div>
              </div>
            </button>
          )}
        </div>
      </header>

      {/* =================================================================== */}
      {/* SCROLLABLE EXPLORE CONTENT (Section 11)                             */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-3.5 pb-24 space-y-5 scrollbar-none">
        {/* ================================================================= */}
        {/* 2. COMPACT CELESTIAL HERO (Section 3)                             */}
        {/* ================================================================= */}
        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#161a2c]/95 via-[#121422]/90 to-[#0c0e17] border border-[#dfb76c]/25 shadow-xl shadow-black/40 overflow-hidden group">
          {/* Subtle celestial stardust background */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-radial from-[#dfb76c]/15 via-transparent to-transparent blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-radial from-[#a855f7]/10 via-transparent to-transparent blur-lg pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 max-w-md">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dfb76c] font-medium tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>Discover your path</span>
              </div>
              <h2 className="font-display font-bold text-base sm:text-lg text-[#fcedc5] leading-snug">
                Explore astrology, guidance, gemstones & spiritual insights.
              </h2>
              <p className="text-xs text-[#a8a192] leading-relaxed line-clamp-2">
                Consult verified hereditary Acharyas from Kashi & Sringeri, or discover untreated energized gemstones tailored to your Janma Kundli.
              </p>
            </div>

            <button
              onClick={() => onStartChatWithAstrologer(CURATED_ASTROLOGERS[0])}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-semibold text-xs transition-all active:scale-95 shadow-md shadow-[#dfb76c]/25 shrink-0 cursor-pointer"
            >
              <span>✦ Consult Acharya Now</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. EXPLORE SEARCH COMPONENT (Section 4)                           */}
        {/* ================================================================= */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#8e8779] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search astrologers, gemstones, Vedic tools, insights..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#141724]/90 border border-[#2b3046] focus:border-[#dfb76c]/60 focus:bg-[#181c2d] text-xs sm:text-[13px] text-[#ede8dc] placeholder-[#7d776b] transition-all outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-0.5 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. EXPLORE CATEGORY PILLS (Section 5)                             */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 snap-start transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 border ${
                  isActive
                    ? 'bg-[#dfb76c]/15 border-[#dfb76c] text-[#fcedc5] shadow-xs shadow-[#dfb76c]/20'
                    : 'bg-[#141624] border-[#252a3f] text-[#8e8779] hover:text-[#c4bcac] hover:border-[#383f5e]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 5. FEATURED ASTROLOGERS (Section 6)                               */}
        {/* ================================================================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-sm sm:text-base text-[#fcedc5] tracking-wide flex items-center gap-1.5">
                <span className="text-[#dfb76c]">✦</span>
                <span>Featured Astrologers</span>
              </h3>
              <p className="text-[11px] text-[#8e8779] font-serif-luxury italic">
                Verified hereditary Acharyas with authentic lineage
              </p>
            </div>
            <span className="text-[11px] text-[#dfb76c] font-medium cursor-pointer hover:underline">
              {filteredAstrologers.length} Available
            </span>
          </div>

          {/* Horizontally scrollable astrologer cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {filteredAstrologers.map((astro) => (
              <div
                key={astro.id}
                className="w-[240px] sm:w-[260px] shrink-0 snap-start rounded-2xl bg-[#121522]/95 border border-[#dfb76c]/20 p-3.5 flex flex-col justify-between hover:border-[#dfb76c]/40 transition-all shadow-md shadow-black/30 group"
              >
                <div className="space-y-2">
                  {/* Top row: Avatar + Online State */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shadow-sm">
                        <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center font-display text-sm font-bold text-[#dfb76c]">
                          {astro.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-[13.5px] text-[#fcedc5] line-clamp-1">
                          {astro.name}
                        </h4>
                        <p className="text-[10px] text-[#8e8779] line-clamp-1">
                          {astro.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Online indicator & rating */}
                  <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-[#1f2438]">
                    <div className="flex items-center gap-1 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online now</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#dfb76c] font-semibold">
                      <Star className="w-3 h-3 fill-current text-[#dfb76c]" />
                      <span>{astro.rating}</span>
                      <span className="text-[#7d776b] font-normal">({astro.totalConsultations})</span>
                    </div>
                  </div>

                  {/* Lineage & Specializations */}
                  <div className="text-[11px] text-[#b5ad9e] space-y-1">
                    <p className="line-clamp-1 italic text-[#8e8779] text-[10px]">
                      Lineage: {astro.lineage}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {astro.specializations.slice(0, 2).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-[#181d2e] text-[#c4bcac] text-[9.5px] border border-[#2a314d]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price & Chat Action */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#1f2438]">
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Consultation</span>
                    <span className="text-xs font-bold text-[#fcedc5] font-mono">
                      ₹{astro.ratePerMinute}
                      <span className="text-[10px] text-[#8e8779] font-normal"> /min</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onStartChatWithAstrologer(astro)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#dfb76c] hover:bg-[#fcedc5] text-[#0e1017] font-semibold text-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. GEMSTONE / PRODUCT DISCOVERY (Section 7)                       */}
        {/* ================================================================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-sm sm:text-base text-[#fcedc5] tracking-wide flex items-center gap-1.5">
                <span className="text-[#dfb76c]">💎</span>
                <span>Recommended Gemstones</span>
              </h3>
              <p className="text-[11px] text-[#8e8779] font-serif-luxury italic">
                Untreated & Kashi-consecrated with Vedic Prana Pratishtha
              </p>
            </div>
            <span className="text-[11px] text-[#dfb76c] font-medium cursor-pointer hover:underline">
              View Certified Gems ›
            </span>
          </div>

          {/* Horizontally scrollable gemstone cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {filteredGemstones.map((gem) => (
              <div
                key={gem.id}
                className="w-[230px] sm:w-[250px] shrink-0 snap-start rounded-2xl bg-[#121522]/95 border border-[#dfb76c]/20 p-3.5 flex flex-col justify-between hover:border-[#dfb76c]/40 transition-all shadow-md shadow-black/30 group"
              >
                <div className="space-y-2">
                  {/* Gemstone Illustration & Origin Tag */}
                  <div className="w-full h-24 rounded-xl bg-radial from-[#dfb76c]/10 to-[#0e1017] border border-[#23293f] flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(223,183,108,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                      💎
                    </span>
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#161a29]/90 border border-[#dfb76c]/25 text-[9px] text-[#dfb76c] font-mono">
                      {gem.origin.split(',')[0]}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs sm:text-[13px] text-[#fcedc5] line-clamp-1">
                      {gem.name}
                    </h4>
                    <p className="text-[10px] text-[#dfb76c] font-serif-luxury italic line-clamp-1">
                      {gem.sanskritName.split('/')[0]}
                    </p>
                  </div>

                  {/* Association & Benefit */}
                  <div className="text-[10.5px] text-[#a8a192] space-y-1">
                    <p className="text-amber-300/90 font-medium">
                      ✦ For: {gem.rulingPlanet}
                    </p>
                    <p className="line-clamp-2 text-[10px] leading-relaxed text-[#9a9385]">
                      {gem.benefits[0]}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#1f2438]">
                  <div>
                    <span className="text-[9.5px] text-[#8e8779] block">Vedic Grade</span>
                    <span className="text-xs font-bold text-[#fcedc5] font-mono">
                      ₹{gem.basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onInspectGemstone(gem)}
                      className="p-1.5 rounded-lg bg-[#1a1f30] hover:bg-[#252c45] text-[#dfb76c] border border-[#dfb76c]/25 active:scale-95 transition-transform cursor-pointer"
                      title="Inspect details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onInspectGemstone(gem)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#dfb76c] hover:bg-[#fcedc5] text-[#0e1017] font-semibold text-[11px] active:scale-95 transition-transform cursor-pointer"
                    >
                      Prescribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. ASTROLOGY TOOLS (Section 8)                                    */}
        {/* ================================================================= */}
        <section className="space-y-2.5">
          <div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-[#fcedc5] tracking-wide flex items-center gap-1.5">
              <span className="text-[#dfb76c]">🔮</span>
              <span>Explore Tools</span>
            </h3>
            <p className="text-[11px] text-[#8e8779] font-serif-luxury italic">
              Vedic calculations & biometric divination systems
            </p>
          </div>

          {/* Compact 2-column mobile grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {astrologyTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="p-3 rounded-2xl bg-[#121522]/95 border border-[#dfb76c]/15 hover:border-[#dfb76c]/40 text-left transition-all duration-200 active:scale-95 shadow-md shadow-black/20 group cursor-pointer flex flex-col justify-between min-h-[105px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </span>
                    <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded-full bg-[#181d2e] border border-[#dfb76c]/25 text-[#dfb76c]">
                      {tool.tag}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-[13px] text-[#fcedc5] leading-tight">
                    {tool.title}
                  </h4>
                  <p className="text-[10px] text-[#8e8779] mt-0.5 line-clamp-1">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#dfb76c] font-medium pt-1 mt-1 border-t border-[#1c2134]">
                  <span>Launch tool</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. DISCOVERABLE CONTENT (Astrology Insights - Section 9)           */}
        {/* ================================================================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-sm sm:text-base text-[#fcedc5] tracking-wide flex items-center gap-1.5">
                <span className="text-[#dfb76c]">📜</span>
                <span>Astrology Insights</span>
              </h3>
              <p className="text-[11px] text-[#8e8779] font-serif-luxury italic">
                Shastra commentaries & remedial timing
              </p>
            </div>
            <span className="text-[11px] text-[#dfb76c] font-medium cursor-pointer hover:underline">
              All Articles ›
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="p-3.5 rounded-2xl bg-[#121522]/95 border border-[#dfb76c]/15 hover:border-[#dfb76c]/35 transition-all shadow-md shadow-black/20 cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center justify-between text-[10px] text-[#8e8779] mb-1">
                  <span className="text-[#dfb76c] font-mono uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>

                <h4 className="font-semibold text-xs sm:text-[13.5px] text-[#fcedc5] group-hover:text-[#fff6e3] transition-colors leading-snug">
                  {art.title}
                </h4>

                <p className="text-[11px] text-[#9a9385] mt-1 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1c2134] text-[10px]">
                  <span className="text-[#8e8779] italic font-serif-luxury">By {art.author}</span>
                  <span className="text-[#dfb76c] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read insight</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =================================================================== */}
      {/* TOOL DETAIL MODAL / DRAWER                                          */}
      {/* =================================================================== */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-[#121524] border border-[#dfb76c]/30 p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedTool.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-base text-[#fcedc5]">
                    {selectedTool.title}
                  </h3>
                  <p className="text-xs text-[#dfb76c] font-serif-luxury italic">
                    {selectedTool.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-[#b5ad9e] leading-relaxed">
              {selectedTool.description}
            </p>

            <div className="space-y-2 p-3 rounded-xl bg-[#161a2c] border border-[#2b3350]">
              <span className="text-[11px] font-mono text-[#dfb76c] uppercase block">
                Features & Calculations:
              </span>
              <ul className="space-y-1.5 text-xs text-[#ede8dc]">
                {selectedTool.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedTool(null);
                  onStartChatWithAstrologer(CURATED_ASTROLOGERS[0]);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-semibold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                ✦ Consult Acharya With Tool
              </button>
              <button
                onClick={() => setSelectedTool(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1a1e30] text-[#cdc7ba] text-xs hover:text-[#ede8dc] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* INSIGHT ARTICLE READER MODAL                                        */}
      {/* =================================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-[#121524] border border-[#dfb76c]/30 p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#22273e] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#dfb76c] tracking-wider block">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#fcedc5] mt-1 leading-snug">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs text-[#8e8779] font-serif-luxury italic mt-0.5">
                  By {selectedArticle.author}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-[13.5px] text-[#cdc7ba] leading-relaxed whitespace-pre-line space-y-3 font-sans">
              {selectedArticle.content}
            </div>

            {selectedArticle.gemstoneRecommendation && (
              <div className="p-3.5 rounded-xl bg-[#181d30] border border-[#dfb76c]/30 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#dfb76c] font-mono uppercase block">
                    Shastra Remedy Prescribed
                  </span>
                  <span className="text-xs font-semibold text-[#fcedc5]">
                    {selectedArticle.gemstoneRecommendation}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onInspectGemstone(FEATURED_GEMSTONES['yellow-sapphire']);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#dfb76c] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
                >
                  View
                </button>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-2.5 rounded-xl bg-[#1c2136] hover:bg-[#252c45] text-[#ede8dc] text-xs font-medium cursor-pointer"
              >
                Close Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
