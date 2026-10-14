import React from 'react';
import { MaharajGuru } from '../../data/maharajGurusData';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface GuruCardProps {
  guru: MaharajGuru;
  onOpenChat: (guru: MaharajGuru) => void;
  isFlagshipFeatured?: boolean;
}

export const GuruCard: React.FC<GuruCardProps> = ({
  guru,
  onOpenChat,
  isFlagshipFeatured = false,
}) => {
  const isFlagship = guru.badge === 'flagship';
  const isPreferred = guru.badge === 'preferred';

  return (
    <div
      onClick={() => onOpenChat(guru)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenChat(guru);
        }
      }}
      className="group relative rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between border border-transparent hover:border-[#A87B2A]/40 bg-[#2B173C] hover:bg-[#352044] shadow-[0_6px_20px_-2px_rgba(18,9,31,0.55),inset_0_1px_1px_0_rgba(247,240,255,0.05),inset_0_-1px_2px_0_rgba(18,9,31,0.4)] hover:shadow-[0_10px_26px_-3px_rgba(18,9,31,0.65),inset_0_1px_1px_0_rgba(247,240,255,0.08),inset_0_-1px_2px_0_rgba(18,9,31,0.5)] hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
    >
      {/* Background Accent Atmospheric Glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-15 group-hover:opacity-30"
        style={{ backgroundColor: guru.accentColor }}
      />

      {/* Top Row: Guru Identity Mark, Badges & Online Status */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Guru Avatar / Portrait Glyph */}
          <div className="relative shrink-0">
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl p-0.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md bg-gradient-to-tr from-[#A87B2A] to-[#E7B743]"
            >
              <div className="w-full h-full rounded-[14px] bg-[#24133B] flex items-center justify-center relative overflow-hidden">
                {guru.avatarUrl ? (
                  <img
                    src={guru.avatarUrl}
                    alt={guru.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl select-none group-hover:scale-110 transition-transform text-[#E7B743]">
                    {guru.symbol}
                  </span>
                )}
              </div>
            </div>
            {/* Online Pulse Indicator */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00D6A0] border-2 border-[#2B173C] ring-1 ring-[#00D6A0]/50"
              title="Online for consultation"
            />
          </div>

          {/* Name & Guru Number */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[#9685AE] uppercase tracking-wider">
                GURU {guru.num}
              </span>
              {isFlagship && (
                <span className="text-[10px] font-bold text-[#E7B743] bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.05)] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  FLAGSHIP
                </span>
              )}
              {isPreferred && (
                <span className="text-[10px] font-bold text-[#FFD76A] bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.05)] px-2 py-0.5 rounded-full">
                  PREFERRED
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[#F7F0FF] group-hover:text-[#E7B743] transition-colors truncate">
              {guru.name}
            </h3>

            <p className="text-xs font-medium text-[#E7B743] truncate mt-0.5">
              {guru.title}
            </p>
          </div>
        </div>

        {/* Rating and rate per minute */}
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 justify-end text-xs text-[#E7B743] font-semibold">
            <Star className="w-3 h-3 fill-[#E7B743] text-[#E7B743]" />
            <span>{guru.rating}</span>
          </div>
          <span className="text-[10px] text-[#9685AE] font-mono block mt-0.5">
            ₹{guru.ratePerMinute}/min
          </span>
        </div>
      </div>

      {/* Description Snippet */}
      <div className="my-3.5 relative z-10">
        <p className="text-xs text-[#C5B8D9] leading-relaxed line-clamp-2">
          {guru.shortDescription}
        </p>
      </div>

      {/* Quick Actions / Topics Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
        {guru.quickActions.slice(0, 3).map((action, i) => (
          <span
            key={i}
            className="text-[10px] px-2.5 py-1 rounded-lg bg-[#24133B] text-[#C5B8D9] border border-transparent hover:border-[#A87B2A]/35 shadow-[0_1px_4px_rgba(18,9,31,0.3)] transition-colors"
          >
            {action}
          </span>
        ))}
      </div>

      {/* Bottom Action Strip: Consultation entry button */}
      <div className="pt-3 border-t border-[#453052]/30 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] text-[#9685AE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
          <span>Active now</span>
          <span>·</span>
          <span>{guru.location.split('/')[0].trim()}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenChat(guru);
          }}
          className="clay-button-primary px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <span>Open Chat</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
