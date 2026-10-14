import React, { useState, useMemo } from 'react';
import {
  MAHARAJ_GURUS,
  MaharajGuru,
  GuruCategory,
} from '../../data/maharajGurusData';
import { GuruCard } from './GuruCard';
import { ConversationThread } from '../../types/astrology';
import {
  Search,
  Sparkles,
  MessageSquare,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

interface GuruDiscoveryViewProps {
  onSelectGuru: (guru: MaharajGuru) => void;
  recentConversations?: ConversationThread[];
  onSelectRecentConversation?: (conv: ConversationThread) => void;
  onOpenProfile?: () => void;
  liveRemainingSeconds?: number;
}

export const GuruDiscoveryView: React.FC<GuruDiscoveryViewProps> = ({
  onSelectGuru,
  recentConversations = [],
  onSelectRecentConversation,
  liveRemainingSeconds = 522,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GuruCategory>('all');

  // Filter Gurus based on category and search query
  const filteredGurus = useMemo(() => {
    return MAHARAJ_GURUS.filter((guru) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'flagship' && guru.badge !== 'flagship') return false;
        if (selectedCategory === 'astrology' && guru.category !== 'astrology' && guru.category !== 'flagship') return false;
        if (selectedCategory === 'love' && guru.category !== 'love') return false;
        if (selectedCategory === 'vastu' && guru.category !== 'vastu') return false;
        if (selectedCategory === 'specialized' && guru.category !== 'specialized') return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        guru.name.toLowerCase().includes(q) ||
        guru.title.toLowerCase().includes(q) ||
        guru.specialization.toLowerCase().includes(q) ||
        guru.shortDescription.toLowerCase().includes(q) ||
        guru.quickActions.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const flagshipGuru = MAHARAJ_GURUS.find((g) => g.badge === 'flagship') || MAHARAJ_GURUS[5];

  const categories: Array<{ id: GuruCategory; label: string; icon: string }> = [
    { id: 'all', label: 'All 8 Gurus', icon: '✦' },
    { id: 'flagship', label: 'Flagship Kundali', icon: '👑' },
    { id: 'astrology', label: 'Timelines & Charts', icon: '⏱️' },
    { id: 'love', label: 'Love & Heart', icon: '❤️' },
    { id: 'vastu', label: 'Vastu & Home', icon: '🏛️' },
    { id: 'specialized', label: 'Specialized (Lost & Legal)', icon: '🧭' },
  ];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col overflow-y-auto bg-[#180D2B] select-none text-[#F7F0FF] relative scrollbar-thin">
      {/* Background Sacred Geometric Aura */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#E7B743_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col gap-6 relative z-10">
        {/* ================================================================= */}
        {/* 1. HERO HEADER: Kismatio Chats — The Eight Maharaj Experience   */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#453052]/25 pb-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E7B743] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E7B743] font-semibold">
                KISMATIO CHATS · DIVINE COUNSEL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-[#F7F0FF] tracking-tight">
              The Eight Maharaj Experience
            </h1>
            <p className="text-xs sm:text-sm text-[#C5B8D9] mt-1.5 leading-relaxed">
              Consult with eight specialized Vedic Gurus—each with a dedicated cosmic environment,
              authentic lineage, and purposeful AI consultation expertise.
            </p>
          </div>

          {/* Quick Active Consultation Timer Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.05),0_2px_8px_rgba(18,9,31,0.3)] flex items-center gap-2 text-xs text-[#E7B743]">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono font-medium">{formatTime(liveRemainingSeconds)} remaining</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. FLAGSHIP SPOTLIGHT BANNER: Acharya Guru                       */}
        {/* ================================================================= */}
        {selectedCategory === 'all' && !searchQuery.trim() && (
          <div
            onClick={() => onSelectGuru(flagshipGuru)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectGuru(flagshipGuru);
              }
            }}
            className="w-full rounded-2xl p-5 sm:p-6 bg-[#24133B] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 shadow-[0_8px_28px_-4px_rgba(18,9,31,0.6),inset_0_1px_1.5px_0_rgba(247,240,255,0.06),inset_0_-1px_2px_0_rgba(18,9,31,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(18,9,31,0.7),inset_0_1px_1.5px_0_rgba(247,240,255,0.08)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          >
            {/* Background radiant aura */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#E7B743]/10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="flex items-start sm:items-center gap-4 relative z-10">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-1 bg-gradient-to-tr from-[#A87B2A] to-[#E7B743] shadow-lg shrink-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-[14px] bg-[#180D2B] flex items-center justify-center text-3xl sm:text-4xl overflow-hidden">
                  {flagshipGuru.avatarUrl ? (
                    <img
                      src={flagshipGuru.avatarUrl}
                      alt={flagshipGuru.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    flagshipGuru.symbol
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#E7B743] text-[#180D2B] font-bold shadow-xs">
                    ✦ FLAGSHIP GURU
                  </span>
                  <span className="text-xs text-[#E7B743] font-semibold flex items-center gap-1">
                    ★ {flagshipGuru.rating} · {flagshipGuru.experienceYears} Years Mastery
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-[#F7F0FF] group-hover:text-[#E7B743] transition-colors mt-1">
                  {flagshipGuru.name} — {flagshipGuru.title}
                </h3>
                <p className="text-xs text-[#C5B8D9] max-w-xl mt-1 leading-relaxed">
                  {flagshipGuru.shortDescription}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectGuru(flagshipGuru);
              }}
              className="clay-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Begin Flagship Reading</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. SEARCH & CATEGORY FILTER STRIP                                */}
        {/* ================================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Instant Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9685AE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Guru by name, topic, or question (e.g. Love, Vastu, Lost, Legal)..."
              className="w-full clay-input text-xs text-[#F7F0FF] placeholder-[#9685AE] rounded-xl pl-10 pr-4 py-2.5 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9685AE] hover:text-[#F7F0FF]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Count Badge */}
          <div className="text-xs text-[#9685AE] font-mono shrink-0">
            Showing <span className="text-[#E7B743] font-bold">{filteredGurus.length}</span> of 8 Gurus
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
                  isSelected
                    ? 'clay-pill-active'
                    : 'clay-pill'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 4. RESPONSIVE GRID: EIGHT GURU CARDS                             */}
        {/* ================================================================= */}
        {filteredGurus.length === 0 ? (
          <div className="w-full py-16 text-center rounded-2xl bg-[#2B173C] border border-transparent shadow-[0_4px_16px_rgba(18,9,31,0.5)]">
            <Compass className="w-8 h-8 text-[#9685AE] mx-auto mb-2" />
            <h4 className="text-base font-serif-luxury font-bold text-[#F7F0FF]">
              No Gurus found for "{searchQuery}"
            </h4>
            <p className="text-xs text-[#C5B8D9] mt-1">
              Try searching for "love", "timeline", "charts", "vastu", "lost", or "legal".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl clay-button-secondary text-xs cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredGurus.map((guru) => (
              <GuruCard
                key={guru.id}
                guru={guru}
                onOpenChat={onSelectGuru}
                isFlagshipFeatured={guru.badge === 'flagship'}
              />
            ))}
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. RECENT CONVERSATIONS SHORTCUT STRIP (If available)             */}
        {/* ================================================================= */}
        {recentConversations.length > 0 && onSelectRecentConversation && (
          <div className="mt-4 pt-6 border-t border-[#453052]/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9685AE] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#E7B743]" />
                <span>Recent Consultations ({recentConversations.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recentConversations.slice(0, 3).map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onSelectRecentConversation(conv)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectRecentConversation(conv);
                    }
                  }}
                  className="p-3.5 rounded-xl bg-[#2B173C] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/30 shadow-[0_2px_10px_rgba(18,9,31,0.4)] cursor-pointer transition-all flex items-center justify-between gap-3 group active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-serif-luxury font-bold text-[#F7F0FF] truncate group-hover:text-[#E7B743]">
                      {conv.astrologerName}
                    </h5>
                    <p className="text-[11px] text-[#9685AE] truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9685AE] group-hover:text-[#E7B743] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
