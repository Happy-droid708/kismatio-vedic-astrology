import React, { useState } from 'react';
import { MaharajGuru } from '../../data/maharajGurusData';
import { ConversationThread, DEFAULT_AUTHENTICATED_USER_ID } from '../../types/astrology';
import { getChatHistory } from '../../services/chatHistoryService';
import {
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  Compass,
  ArrowRight,
  HelpCircle,
  Award,
  Globe,
  MapPin,
  CheckCircle2,
  ChevronRight,
  User,
  History,
} from 'lucide-react';

interface GuruProfilePageProps {
  guru: MaharajGuru;
  conversations: ConversationThread[];
  onStartChat: (guru: MaharajGuru) => void;
  onSelectSampleQuestion: (guru: MaharajGuru, question: string) => void;
  onSelectConversation: (conv: ConversationThread) => void;
  onBack: () => void;
  liveRemainingSeconds?: number;
}

export const GuruProfilePage: React.FC<GuruProfilePageProps> = ({
  guru,
  conversations,
  onStartChat,
  onSelectSampleQuestion,
  onSelectConversation,
  onBack,
  liveRemainingSeconds = 522,
}) => {
  const [imageError, setImageError] = useState(false);
  const isFlagship = guru.badge === 'flagship';
  const isPreferred = guru.badge === 'preferred';

  // Find existing conversations strictly for this specific Guru
  const guruConversations = getChatHistory({
    conversations,
    userId: DEFAULT_AUTHENTICATED_USER_ID,
    guruId: guru.id,
  });
  const hasExistingChat = guruConversations.length > 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#180D2B] text-[#F7F0FF] relative overflow-y-auto scrollbar-thin select-none animate-page-enter">
      {/* Background Sacred Geometric & Guru Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-25 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: guru.accentColor }}
        />
        <div
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full blur-[100px] opacity-15 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: guru.secondaryColor }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E7B743_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* =================================================================== */}
      {/* 1. TOP STICKY APP BAR                                              */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-30 bg-[#24133B]/95 backdrop-blur-md border-b border-[#453052]/30 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[58px]">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBack}
            className="p-1.5 sm:p-2 rounded-xl text-[#C5B8D9] hover:text-[#FFD76A] hover:bg-[#352044] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 group"
            title="Back to Chats"
            aria-label="Back to Chats"
          >
            <ArrowLeft className="w-5 h-5 text-[#E7B743] group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-semibold hidden xs:inline">Back to Chats</span>
          </button>

          <div className="h-4 w-px bg-[#453052]/50 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9685AE]">
            <span className="text-[#E7B743] font-bold">GURU {guru.num}</span>
            <span>·</span>
            <span className="truncate max-w-[140px] sm:max-w-[200px] text-[#C5B8D9]">
              {guru.name}
            </span>
          </div>
        </div>

        {/* Live consultation balance */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-[#2B173C] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.05)] flex items-center gap-1.5 text-xs text-[#E7B743]">
            <Clock className="w-3.5 h-3.5 text-[#E7B743]" />
            <span className="font-mono text-[11px] font-semibold">
              {formatTime(liveRemainingSeconds)} balance
            </span>
          </div>

          <button
            onClick={() => onStartChat(guru)}
            className="clay-button-primary px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasExistingChat ? 'Continue Chat' : 'Start Chat'}
            </span>
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MAIN PROFILE CONTAINER                                          */}
      {/* =================================================================== */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 relative z-10">
        {/* ================================================================= */}
        {/* A. HERO SECTION                                                   */}
        {/* ================================================================= */}
        <section className="clay-card rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-[#24133B]/90 shadow-[0_12px_40px_rgba(18,9,31,0.6)]">
          {/* Subtle Ambient Top Rim Gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${guru.accentColor}, #E7B743, transparent)`,
            }}
          />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
            {/* Large Guru Portrait */}
            <div className="relative shrink-0">
              <div
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, #FFD76A 0%, ${guru.accentColor} 50%, #A87B2A 100%)`,
                }}
              >
                <div className="w-full h-full rounded-[22px] bg-[#180D2B] flex items-center justify-center overflow-hidden relative">
                  {!imageError && guru.avatarUrl ? (
                    <img
                      src={guru.avatarUrl}
                      alt={guru.name}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#24133B] to-[#180D2B]">
                      <span className="text-5xl select-none text-[#E7B743]">{guru.symbol}</span>
                      <span className="text-[10px] font-mono text-[#9685AE] mt-1">{guru.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Online Consultation Pulse Indicator */}
              <div
                className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-[#180D2B] border-2 border-[#24133B] flex items-center gap-1.5 shadow-md"
                title="Active now for consultation"
              >
                <span className="w-2 h-2 rounded-full bg-[#00D6A0] animate-pulse" />
                <span className="text-[10px] font-bold text-[#00D6A0] uppercase font-mono tracking-wider">
                  Active
                </span>
              </div>
            </div>

            {/* Identity & Core Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap mb-1.5">
                <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#2B173C] text-[#E7B743]">
                  GURU {guru.num}
                </span>

                {isFlagship && (
                  <span className="text-[11px] font-bold text-[#180D2B] bg-gradient-to-r from-[#FFD76A] to-[#E7B743] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3 fill-current" />
                    FLAGSHIP GURU
                  </span>
                )}

                {isPreferred && (
                  <span className="text-[11px] font-bold text-[#FFD76A] bg-[#2B173C] border border-[#FFD76A]/30 px-2.5 py-0.5 rounded-full">
                    PREFERRED
                  </span>
                )}

                <span className="text-[11px] text-[#9685AE] font-serif-luxury italic flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#E7B743]" />
                  <span>{guru.location}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-[#F7F0FF] tracking-tight">
                {guru.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-[#E7B743] mt-1">
                {guru.title}
              </p>

              <p className="text-xs sm:text-sm text-[#C5B8D9] mt-3 leading-relaxed max-w-2xl">
                {guru.shortDescription}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-5 pt-4 border-t border-[#453052]/30 max-w-lg">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-[#180D2B]/80 text-center">
                  <span className="text-[10px] text-[#9685AE] block uppercase font-mono">Rating</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5 text-xs sm:text-sm font-bold text-[#FFD76A]">
                    <Star className="w-3.5 h-3.5 fill-[#E7B743] text-[#E7B743]" />
                    <span>{guru.rating}</span>
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-2xl bg-[#180D2B]/80 text-center">
                  <span className="text-[10px] text-[#9685AE] block uppercase font-mono">Consultations</span>
                  <span className="text-xs sm:text-sm font-bold text-[#F7F0FF] mt-0.5 block font-mono">
                    {guru.totalConsultations.toLocaleString('en-IN')}+
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-2xl bg-[#180D2B]/80 text-center">
                  <span className="text-[10px] text-[#9685AE] block uppercase font-mono">Rate</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E7B743] mt-0.5 block font-mono">
                    ₹{guru.ratePerMinute}/min
                  </span>
                </div>
              </div>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
                <button
                  onClick={() => onStartChat(guru)}
                  className="w-full sm:w-auto clay-button-primary px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {hasExistingChat
                      ? `Continue Consultation with ${guru.name}`
                      : `Start Chat with ${guru.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onBack}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl clay-button-secondary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#E7B743]" />
                  <span>Explore All Gurus</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* B. ABOUT THE GURU                                                 */}
        {/* ================================================================= */}
        <section className="clay-card rounded-2xl p-5 sm:p-7 bg-[#24133B]/70 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E7B743]" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E7B743] font-bold">
              About {guru.name}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#F7F0FF] font-serif-luxury leading-relaxed">
            "{guru.aboutCopy}"
          </p>

          <p className="text-xs sm:text-sm text-[#C5B8D9] leading-relaxed pt-1">
            {guru.bio}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-[#9685AE]">
            <Globe className="w-3.5 h-3.5 text-[#E7B743]" />
            <span>Consultation Languages:</span>
            <span className="text-[#F7F0FF] font-medium">{guru.languages.join(' · ')}</span>
          </div>
        </section>

        {/* ================================================================= */}
        {/* C. AREAS OF EXPERTISE                                             */}
        {/* ================================================================= */}
        <section className="clay-card rounded-2xl p-5 sm:p-7 bg-[#24133B]/70 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E7B743]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E7B743] font-bold">
                Areas of Expertise
              </h2>
            </div>
            <span className="text-[11px] text-[#9685AE] font-mono">
              {guru.expertise?.length || guru.quickActions.length} specializations
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(guru.expertise || guru.quickActions).map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-[#2B173C] text-xs sm:text-sm text-[#F7F0FF] font-medium flex items-center gap-1.5 shadow-[0_2px_8px_rgba(18,9,31,0.4)] hover:bg-[#352044] hover:text-[#FFD76A] transition-all"
              >
                <span className="text-[#E7B743] text-xs">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* D. WHAT THIS GURU CAN HELP WITH (Interactive Sample Questions)     */}
        {/* ================================================================= */}
        <section className="clay-card rounded-2xl p-5 sm:p-7 bg-[#24133B]/70 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#E7B743]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E7B743] font-bold">
                What {guru.name} Can Help With
              </h2>
            </div>
            <span className="text-[11px] text-[#9685AE]">
              Tap any question below to immediately ask {guru.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guru.sampleQuestions?.map((question, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSampleQuestion(guru, question)}
                className="group p-4 rounded-2xl bg-[#2B173C] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 text-left cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(18,9,31,0.4)] active:scale-[0.99] flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#180D2B] text-[#E7B743] flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#F7F0FF] group-hover:text-[#FFD76A] font-medium leading-snug transition-colors">
                    "{question}"
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9685AE] group-hover:text-[#E7B743] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* E. PERSONALITY & APPROACH                                          */}
        {/* ================================================================= */}
        <section className="clay-card rounded-2xl p-5 sm:p-7 bg-[#24133B]/70 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E7B743]" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E7B743] font-bold">
              Personality & Consultation Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#2B173C] space-y-1.5 shadow-[inset_0_1px_1px_rgba(247,240,255,0.05)]">
              <span className="text-[10px] font-mono uppercase text-[#E7B743] font-bold tracking-wider block">
                Profile Personality
              </span>
              <p className="text-[#F7F0FF] leading-relaxed">
                {guru.personality}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#2B173C] space-y-1.5 shadow-[inset_0_1px_1px_rgba(247,240,255,0.05)]">
              <span className="text-[10px] font-mono uppercase text-[#E7B743] font-bold tracking-wider block">
                Guidance Approach
              </span>
              <p className="text-[#C5B8D9] leading-relaxed">
                {guru.approach}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* F. PREVIOUS CONVERSATIONS WITH THIS GURU                           */}
        {/* ================================================================= */}
        <section className="clay-card rounded-2xl p-5 sm:p-7 bg-[#24133B]/70 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#E7B743]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E7B743] font-bold">
                Previous Consultations with {guru.name}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#9685AE]">
              {guruConversations.length} conversation{guruConversations.length === 1 ? '' : 's'}
            </span>
          </div>

          {hasExistingChat ? (
            <div className="space-y-2.5">
              {guruConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectConversation(conv);
                    }
                  }}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#2B173C] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/30 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif-luxury font-bold text-[#F7F0FF] group-hover:text-[#FFD76A]">
                        {conv.astrologerTitle || conv.astrologerName}
                      </span>
                      <span className="text-[10px] text-[#9685AE] font-mono">
                        · {conv.lastMessageTimestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#C5B8D9] truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectConversation(conv);
                    }}
                    className="clay-button-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Resume</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center rounded-2xl bg-[#2B173C]/60 p-6 space-y-2">
              <MessageSquare className="w-8 h-8 text-[#9685AE] mx-auto opacity-70" />
              <h4 className="text-sm font-semibold text-[#F7F0FF]">
                No previous conversations with {guru.name} yet
              </h4>
              <p className="text-xs text-[#C5B8D9] max-w-sm mx-auto">
                Begin your first dialogue to explore {guru.specialization.toLowerCase()}
              </p>
              <button
                onClick={() => onStartChat(guru)}
                className="mt-2 clay-button-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Begin First Consultation</span>
              </button>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* G. RESPONSIBLE GUIDANCE & DISCLAIMER                               */}
        {/* ================================================================= */}
        <section className="p-4 sm:p-5 rounded-2xl bg-[#12091F]/80 border border-[#453052]/30 flex items-start gap-3 text-xs text-[#C5B8D9]">
          <ShieldCheck className="w-5 h-5 text-[#E7B743] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#E7B743] block">
              Ethical & Responsible Guidance Pledge
            </span>
            <p className="leading-relaxed text-[11px] sm:text-xs">
              {guru.disclaimer}
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* H. BOTTOM ACTION STRIP                                            */}
        {/* ================================================================= */}
        <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#453052]/30">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#2B173C] transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Chats</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onStartChat(guru)}
              className="flex-1 sm:flex-initial clay-button-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {hasExistingChat
                  ? `Resume Chat with ${guru.name}`
                  : `Start Chat with ${guru.name}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
