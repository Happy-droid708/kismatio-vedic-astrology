import React, { useState } from 'react';
import { Astrologer } from '../../types/astrology';
import { CURATED_ASTROLOGERS } from '../../data/astrologyData';
import { Search, Star, X, Sparkles, MessageSquare } from 'lucide-react';
import { CelestialPill } from '../ui/CelestialPill';

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAstrologer: (astrologer: Astrologer) => void;
}

export const ASTROLOGY_CATEGORIES = [
  { id: 'all', label: '🔮 Vedic Jyotish' },
  { id: 'love', label: '❤️ Love & Vivah' },
  { id: 'career', label: '💼 Career & Karma' },
  { id: 'finance', label: '💰 Finance & Wealth' },
  { id: 'family', label: '👨‍👩‍👧 Family & Health' },
  { id: 'horoscope', label: '🌙 Horoscope & Transit' },
];

export const ASTROLOGY_LANGUAGES = [
  { id: 'all', label: 'All Languages' },
  { id: 'hindi', label: 'Hindi (हिंदी)' },
  { id: 'english', label: 'English' },
  { id: 'sanskrit', label: 'Sanskrit (संस्कृत)' },
  { id: 'gujarati', label: 'Gujarati (ગુજરાતી)' },
  { id: 'marathi', label: 'Marathi (मराठी)' },
];

export const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onSelectAstrologer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  // Filter astrologers based on search, category, and language
  const filteredAstrologers = CURATED_ASTROLOGERS.filter((astro) => {
    const matchesSearch =
      astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      astro.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      astro.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'love') {
      const match = astro.specializations.some(
        (s) => s.toLowerCase().includes('vivah') || s.toLowerCase().includes('relationship') || s.toLowerCase().includes('love')
      );
      if (!match) return false;
    }
    if (selectedCategory === 'career') {
      const match = astro.specializations.some(
        (s) => s.toLowerCase().includes('career') || s.toLowerCase().includes('karma') || s.toLowerCase().includes('shani')
      );
      if (!match) return false;
    }
    if (selectedCategory === 'finance') {
      const match = astro.specializations.some(
        (s) => s.toLowerCase().includes('finance') || s.toLowerCase().includes('wealth') || s.toLowerCase().includes('gemstone')
      );
      if (!match) return false;
    }

    if (selectedLanguage !== 'all') {
      const langMatch = astro.languages.some((l) =>
        l.toLowerCase().includes(selectedLanguage.toLowerCase())
      );
      if (!langMatch) return false;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#12091F]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#24133B] border border-[#453052] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#453052] bg-[#24133B] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#E7B743] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start a New Consultation</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[#F7F0FF] mt-0.5">
              Select a Vedic Astrologer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2.5 bg-[#180D2B] border-b border-[#453052] shrink-0">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#9685AE] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise (e.g. Career, Vivah, Kundli)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#12091F] border border-[#453052] text-xs text-[#F7F0FF] placeholder-[#9685AE] focus:outline-none focus:border-[#E7B743] min-h-[38px] transition-colors"
            />
          </div>
        </div>

        {/* Section 8: Astrology Category Pills with 1-turn Orbit Ring animation */}
        <div className="px-4 py-2 bg-[#180D2B] border-b border-[#453052] overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            {ASTROLOGY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <CelestialPill
                  key={cat.id}
                  variant="category"
                  isSelected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="text-xs"
                >
                  {cat.label}
                </CelestialPill>
              );
            })}
          </div>
        </div>

        {/* Section 13: Language Pills */}
        <div className="px-4 py-1.5 bg-[#180D2B] border-b border-[#453052] overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[10px] text-[#9685AE] uppercase tracking-wider font-semibold mr-1">
              Language:
            </span>
            {ASTROLOGY_LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <CelestialPill
                  key={lang.id}
                  variant="language"
                  isSelected={isSelected}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className="text-[11px] py-1 px-2.5 min-h-[28px]"
                >
                  {lang.label}
                </CelestialPill>
              );
            })}
          </div>
        </div>

        {/* Astrologers List */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-3 flex-1 min-h-0 scrollbar-thin bg-[#180D2B]">
          {filteredAstrologers.map((astro) => (
            <div
              key={astro.id}
              className="p-3 sm:p-3.5 rounded-2xl bg-[#2B173C] border border-[#453052] hover:border-[#A87B2A] hover:bg-[#352044] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                {/* Avatar with Online Badge */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#A87B2A] to-[#E7B743] p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#24133B] flex items-center justify-center overflow-hidden">
                      {astro.avatarUrl ? (
                        <img
                          src={astro.avatarUrl}
                          alt={astro.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="font-display text-base font-bold text-[#E7B743]">
                          {astro.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00D6A0] border-2 border-[#2B173C]" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-serif-luxury font-bold text-[#F7F0FF] truncate">
                      {astro.name}
                    </h4>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#E7B743]/20 text-[#E7B743] flex items-center justify-center text-[9px] font-bold shrink-0">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-[#E7B743] font-medium truncate">{astro.title}</p>
                  <p className="text-[11px] text-[#C5B8D9] truncate">{astro.lineage}</p>

                  <div className="flex items-center gap-2 sm:gap-3 text-[11px] mt-1.5 text-[#C5B8D9] flex-wrap">
                    <span className="flex items-center gap-0.5 text-[#E7B743] font-bold shrink-0">
                      <Star className="w-3 h-3 fill-[#E7B743] text-[#E7B743]" />
                      <span>{astro.rating}</span>
                      <span className="text-[#9685AE] font-normal">({astro.totalConsultations})</span>
                    </span>
                    <span>·</span>
                    <span className="shrink-0">{astro.experienceYears} Yrs</span>
                    <span>·</span>
                    <span className="truncate max-w-[120px]">{astro.languages.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#453052] shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#9685AE] block">Rate</span>
                  <span className="text-sm font-mono font-bold text-[#E7B743]">
                    ₹{astro.ratePerMinute}/min
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectAstrologer(astro);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#E7B743] hover:bg-[#FFD76A] text-[#180D2B] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 min-h-[40px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Start Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
