import React, { useState } from 'react';
import {
  CircleDot,
  User,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X,
  ArrowRight,
  Flame,
  Search,
} from 'lucide-react';
import { Astrologer } from '../../types/astrology';
import { CURATED_ASTROLOGERS } from '../../data/astrologyData';

interface ToolsScreenProps {
  onStartChatWithAstrologer: (astro: Astrologer) => void;
  onOpenProfile: () => void;
}

export const ToolsScreen: React.FC<ToolsScreenProps> = ({
  onStartChatWithAstrologer,
  onOpenProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalTool, setActiveModalTool] = useState<any | null>(null);

  const categories = ['All', 'Divination', 'Charts', 'Biometric', 'Remedies'];

  const toolsList = [
    {
      id: 'tool-horoscope',
      title: 'Daily Horoscope',
      subtitle: '12 Rashis & Planetary Transits',
      category: 'Divination',
      icon: '🌙',
      badge: 'DAILY',
      description: 'Accurate sidereal Vedic horoscope aligned with today’s Nakshatras and planetary transits.',
      features: [
        'Career, wealth, health & love daily ratings',
        'Auspicious Rahu Kaal & Abhijit timings',
        'Daily lucky color, number & sacred Beej mantra',
      ],
    },
    {
      id: 'tool-kundli',
      title: 'Birth Chart (Kundli)',
      subtitle: 'Complete D1 & D9 Navamsha',
      category: 'Charts',
      icon: '✦',
      badge: 'ACCURATE',
      description: 'Authentic Lahiri (Chitra Paksha) Vedic birth chart casting with precise planetary degrees.',
      features: [
        'Lagna, Navamsha (D9) and Dasamsha (D10) charts',
        'Mahadasha, Antardasha & Pratyantardasha breakdown',
        'Shadbala planetary strength calculations',
      ],
    },
    {
      id: 'tool-palm',
      title: 'Palm Scan (Hastha)',
      subtitle: 'Life & Fate Line Scan',
      category: 'Biometric',
      icon: '✋',
      badge: 'BIOMETRIC',
      description: 'Ancient Hastha Rekha Samudrika analysis mapping mount of Jupiter, Sun line, and fate breakthroughs.',
      features: [
        'AI biometric mapping of primary palm lines',
        'Career elevation & financial windfall timing',
        'Mount of Saturn & Jupiter prominence score',
      ],
    },
    {
      id: 'tool-face',
      title: 'Face Scan (Mukha)',
      subtitle: 'Mukha Samudrika & Aura',
      category: 'Biometric',
      icon: '👁',
      badge: 'VEDIC AI',
      description: 'Vedic facial physiognomy reading brow symmetry, forehead planetary planes, and vitality aura.',
      features: [
        'Forehead planetary zone classification',
        'Facial aura color resonance & Graha ruler',
        'Inborn leadership and spiritual inclinations',
      ],
    },
    {
      id: 'tool-tarot',
      title: 'Tarot of the Rishi',
      subtitle: 'Ancient Vedic Archetypes',
      category: 'Divination',
      icon: '🔮',
      badge: 'SACRED',
      description: 'Consult the 78 Agamic cards channeling ancient Rishi wisdom, planetary archetypes, and Karmic guidance.',
      features: [
        '3-Card Past, Present & Destiny spread',
        'Direct remedies for ambiguous decisions',
        'Connected to Vedic Nakshatra symbolism',
      ],
    },
    {
      id: 'tool-gemstone',
      title: 'Gemstone Finder',
      subtitle: 'Ratna Shastra Prescription',
      category: 'Remedies',
      icon: '💎',
      badge: 'REMEDIES',
      description: 'Find out which untreated natural gemstone aligns with your Lagna lord, current Mahadasha, and Bhagya house.',
      features: [
        'Identifies life stone, lucky stone, and benefic gems',
        'Detects dangerous conflicting stones to avoid',
        'Kashi consecration Muhurat guidelines',
      ],
    },
    {
      id: 'tool-numerology',
      title: 'Numerology (Anka)',
      subtitle: 'Mulank & Bhagyank',
      category: 'Divination',
      icon: '🔢',
      badge: 'ANALYTICS',
      description: 'Vedic Anka Vidya reveals your psychic number, destiny number, and business name vibrations.',
      features: [
        'Mulank (birth day) and Bhagyank (life path)',
        'Name correction for financial resonance',
        'Harmonious calendar dates and enterprise timing',
      ],
    },
    {
      id: 'tool-vivah',
      title: 'Vivah Match (Milan)',
      subtitle: '36 Ashta Koota Compatibility',
      category: 'Charts',
      icon: '🕊',
      badge: 'RELATIONSHIP',
      description: 'Complete 36-point marital compatibility matching including Nadi Dosha, Bhakoot, and Mangal Dosha analysis.',
      features: [
        'Nadi, Bhakoot, Gana, Maitri, Yoni, Tara, Vashya, Varna',
        'Manglik cancellation verification',
        'Emotional, intellectual and progeny harmony',
      ],
    },
    {
      id: 'tool-sadesati',
      title: 'Shani Sade-Sati',
      subtitle: '7.5 Yr Saturn Transit Status',
      category: 'Remedies',
      icon: '⏳',
      badge: 'CRITICAL',
      description: 'Find out your exact Sade-Sati phase (Rising, Peak, Setting) or Ashtama Shani transit timing.',
      features: [
        'Exact dates of transit entry and exit through 2035',
        'Hanuman Kavach & Dasharatha Stotram remedies',
        'Blue Sapphire vs Amethyst compatibility check',
      ],
    },
    {
      id: 'tool-rudraksha',
      title: 'Rudraksha Match',
      subtitle: 'Sacred Mukhi Calculator',
      category: 'Remedies',
      icon: '📿',
      badge: 'SPIRITUAL',
      description: 'Determine which sacred Nepal or Indonesian Rudraksha bead balances your active planetary Dasha.',
      features: [
        '1-Mukhi to 14-Mukhi suitability analysis',
        'Planetary pacification for Rahu, Ketu, Shani',
        'Consecration muhurat and wearing protocols',
      ],
    },
  ];

  const filteredTools = toolsList.filter((tool) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tool.title.toLowerCase().includes(q) ||
      tool.subtitle.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    return tool.category === activeCategory;
  });

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
      {/* =================================================================== */}
      {/* 1. TOOLS HEADER                                                     */}
      {/* =================================================================== */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full bg-[#121422] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
              ◉
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Astrology Tools
            </h1>
            <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
              Vedic Divination & Computational Shastra
            </p>
          </div>
        </div>

        {/* Profile access in header (Section 4 & 6) */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          title="Open Profile"
        >
          <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center text-xs font-bold text-[#dfb76c]">
            D
          </div>
        </button>
      </header>

      {/* =================================================================== */}
      {/* 2. SEARCH & CATEGORIES (Section 9)                                  */}
      {/* =================================================================== */}
      <div className="shrink-0 px-3.5 sm:px-6 pt-3 pb-2 space-y-2 border-b border-[#1b2034] bg-[#0c0e18]">
        {/* Search tool */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-[#8e8779] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Vedic calculators, biometric scans, charts..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141724] border border-[#2b3046] focus:border-[#dfb76c]/60 text-xs text-[#ede8dc] placeholder-[#7d776b] outline-none"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#dfb76c] text-[#0e1017] font-semibold shadow-xs'
                    : 'bg-[#141726] border border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. 2-COLUMN COMPACT MOBILE TOOLS GRID (Section 9)                   */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 scrollbar-none">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveModalTool(tool)}
              className="p-3 sm:p-3.5 rounded-2xl bg-[#121524]/95 border border-[#dfb76c]/15 hover:border-[#dfb76c]/40 transition-all duration-200 active:scale-95 shadow-lg shadow-black/25 flex flex-col justify-between min-h-[125px] cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded-full bg-[#181d2e] border border-[#dfb76c]/25 text-[#dfb76c]">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-semibold text-xs sm:text-[13.5px] text-[#fcedc5] leading-snug group-hover:text-amber-200 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[10px] text-[#8e8779] line-clamp-1 mt-0.5">
                  {tool.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#1c2136] text-[10px] text-[#dfb76c] font-medium">
                <span>Launch tool</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* TOOL INTERACTIVE MODAL                                              */}
      {/* =================================================================== */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-[#121524] border border-[#dfb76c]/30 p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeModalTool.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-base text-[#fcedc5]">
                    {activeModalTool.title}
                  </h3>
                  <p className="text-xs text-[#dfb76c] font-serif-luxury italic">
                    {activeModalTool.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalTool(null)}
                className="p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-[#b5ad9e] leading-relaxed">
              {activeModalTool.description}
            </p>

            <div className="space-y-2 p-3 rounded-xl bg-[#161a2c] border border-[#2b3350]">
              <span className="text-[11px] font-mono text-[#dfb76c] uppercase block">
                Calculations & Shastra Algorithms:
              </span>
              <ul className="space-y-1.5 text-xs text-[#ede8dc]">
                {activeModalTool.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveModalTool(null);
                  onStartChatWithAstrologer(CURATED_ASTROLOGERS[0]);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-semibold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                ✦ Consult Acharya With Tool
              </button>
              <button
                onClick={() => setActiveModalTool(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1a1e30] text-[#cdc7ba] text-xs hover:text-[#ede8dc] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
