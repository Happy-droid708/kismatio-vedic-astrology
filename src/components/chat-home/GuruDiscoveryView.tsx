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
    <div className="w-full h-full min-h-0 flex flex-col overflow-y-auto bg-[#0b0c14] select-none text-[#ede8dc] relative scrollbar-thin">
      {/* Background Sacred Geometric Aura */}
      <div className="fixed inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#dfb76c_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col gap-6 relative z-10">
        {/* ================================================================= */}
        {/* 1. HERO HEADER: Kismatio Chats — The Eight Maharaj Experience   */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfb76c]/15 pb-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#dfb76c] font-semibold">
                KISMATIO CHATS · DIVINE COUNSEL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-[#fcedc5] tracking-tight">
              The Eight Maharaj Experience
            </h1>
            <p className="text-xs sm:text-sm text-[#a8a192] mt-1.5 leading-relaxed">
              Consult with eight specialized Vedic Gurus—each with a dedicated cosmic environment,
              authentic lineage, and purposeful AI consultation expertise.
            </p>
          </div>

          {/* Quick Active Consultation Timer Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#141829] border border-[#dfb76c]/30 flex items-center gap-2 text-xs text-[#dfb76c]">
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
            className="w-full rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#21090d]/95 via-[#180f1b]/90 to-[#0e101b]/95 border border-[#dfb76c]/40 hover:border-[#dfb76c] shadow-xl hover:shadow-2xl hover:shadow-[#dfb76c]/20 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            {/* Background radiant aura */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#dfb76c]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="flex items-start sm:items-center gap-4 relative z-10">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-1 bg-gradient-to-tr from-[#dfb76c] via-[#fef08a] to-[#996e28] shadow-lg shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#120a10] flex items-center justify-center text-3xl sm:text-4xl">
                  {flagshipGuru.symbol}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#dfb76c] text-[#0e1017] font-bold shadow-xs">
                    ✦ FLAGSHIP GURU
                  </span>
                  <span className="text-xs text-[#dfb76c] font-semibold flex items-center gap-1">
                    ★ {flagshipGuru.rating} · {flagshipGuru.experienceYears} Years Mastery
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-[#fff7df] group-hover:text-[#dfb76c] transition-colors mt-1">
                  {flagshipGuru.name} — {flagshipGuru.title}
                </h3>
                <p className="text-xs text-[#b8b0a1] max-w-xl mt-1 leading-relaxed">
                  {flagshipGuru.shortDescription}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectGuru(flagshipGuru);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#fef08a] text-[#0e1017] text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#dfb76c]/20 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
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
            <Search className="w-4 h-4 text-[#8a8374] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Guru by name, topic, or question (e.g. Love, Vastu, Lost, Legal)..."
              className="w-full bg-[#121524] text-xs text-[#ede8dc] placeholder-[#7d7768] rounded-xl pl-10 pr-4 py-2.5 border border-[#232940] focus:border-[#dfb76c]/60 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a8374] hover:text-[#ede8dc]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Count Badge */}
          <div className="text-xs text-[#8a8374] font-mono shrink-0">
            Showing <span className="text-[#dfb76c] font-bold">{filteredGurus.length}</span> of 8 Gurus
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#dfb76c] text-[#0e1017] font-semibold shadow-xs'
                    : 'bg-[#121524] text-[#a49d8f] hover:text-[#ede8dc] border border-[#232940]'
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
          <div className="w-full py-16 text-center rounded-2xl bg-[#121524]/60 border border-[#232940]">
            <Compass className="w-8 h-8 text-[#8a8374] mx-auto mb-2" />
            <h4 className="text-base font-serif-luxury font-bold text-[#ede8dc]">
              No Gurus found for "{searchQuery}"
            </h4>
            <p className="text-xs text-[#8a8374] mt-1">
              Try searching for "love", "timeline", "charts", "vastu", "lost", or "legal".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-[#1d2238] text-xs text-[#dfb76c] hover:bg-[#252c48] cursor-pointer"
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
          <div className="mt-4 pt-6 border-t border-[#dfb76c]/15">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9a9385] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>Recent Consultations ({recentConversations.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recentConversations.slice(0, 3).map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onSelectRecentConversation(conv)}
                  className="p-3.5 rounded-xl bg-[#121524]/80 hover:bg-[#181d33] border border-[#232940] hover:border-[#dfb76c]/30 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-serif-luxury font-bold text-[#ede8dc] truncate group-hover:text-[#dfb76c]">
                      {conv.astrologerName}
                    </h5>
                    <p className="text-[11px] text-[#8a8374] truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8a8374] group-hover:text-[#dfb76c] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
