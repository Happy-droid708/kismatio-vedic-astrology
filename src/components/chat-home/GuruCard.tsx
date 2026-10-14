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
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between border text-left outline-none focus-visible:ring-2 focus-visible:ring-[#dfb76c] ${
        isFlagshipFeatured || isFlagship
          ? 'bg-gradient-to-b from-[#1c120c]/90 via-[#130b0f]/80 to-[#0e1017]/95 border-[#dfb76c]/40 hover:border-[#dfb76c] shadow-lg shadow-[#dfb76c]/10 hover:shadow-2xl hover:shadow-[#dfb76c]/25 hover:-translate-y-1'
          : isPreferred
          ? 'bg-gradient-to-b from-[#091724]/90 via-[#0a1420]/80 to-[#0d1017]/95 border-[#06b6d4]/35 hover:border-[#06b6d4] shadow-md shadow-[#06b6d4]/10 hover:shadow-xl hover:shadow-[#06b6d4]/20 hover:-translate-y-1'
          : 'bg-[#10121d]/90 hover:bg-[#141724] border-[#22273d] hover:border-[#dfb76c]/35 shadow-md hover:shadow-xl hover:-translate-y-1'
      }`}
      style={{
        boxShadow: isFlagship ? '0 10px 30px -10px rgba(223, 183, 108, 0.15)' : undefined,
      }}
    >
      {/* Background Accent Atmospheric Glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
        style={{ backgroundColor: guru.accentColor }}
      />

      {/* Top Row: Guru Identity Mark, Badges & Online Status */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Guru Avatar / Portrait Glyph */}
          <div className="relative shrink-0">
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl p-0.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md"
              style={{
                background: `linear-gradient(135deg, ${guru.accentColor}, #181b29)`,
              }}
            >
              <div className="w-full h-full rounded-[14px] bg-[#0c0d15] flex items-center justify-center relative overflow-hidden">
                {guru.avatarUrl ? (
                  <img
                    src={guru.avatarUrl}
                    alt={guru.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl select-none group-hover:scale-110 transition-transform">
                    {guru.symbol}
                  </span>
                )}
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Online Pulse Indicator */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0c0d15] ring-1 ring-emerald-500/50"
              title="Online for consultation"
            />
          </div>

          {/* Name & Guru Number */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[#8a8374] uppercase tracking-wider">
                GURU {guru.num}
              </span>
              {isFlagship && (
                <span className="text-[10px] font-bold text-[#dfb76c] bg-[#dfb76c]/15 border border-[#dfb76c]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  FLAGSHIP
                </span>
              )}
              {isPreferred && (
                <span className="text-[10px] font-bold text-[#06b6d4] bg-[#06b6d4]/15 border border-[#06b6d4]/30 px-2 py-0.5 rounded-full">
                  PREFERRED
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[#f5eedf] group-hover:text-[#dfb76c] transition-colors truncate">
              {guru.name}
            </h3>

            <p className="text-xs font-medium text-[#c4bcae] truncate mt-0.5">
              {guru.title}
            </p>
          </div>
        </div>

        {/* Rating and rate per minute */}
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 justify-end text-xs text-[#dfb76c] font-semibold">
            <Star className="w-3 h-3 fill-[#dfb76c] text-[#dfb76c]" />
            <span>{guru.rating}</span>
          </div>
          <span className="text-[10px] text-[#8a8374] font-mono block mt-0.5">
            ₹{guru.ratePerMinute}/min
          </span>
        </div>
      </div>

      {/* Description Snippet */}
      <div className="my-3.5 relative z-10">
        <p className="text-xs text-[#a8a192] leading-relaxed line-clamp-2">
          {guru.shortDescription}
        </p>
      </div>

      {/* Quick Actions / Topics Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
        {guru.quickActions.slice(0, 3).map((action, i) => (
          <span
            key={i}
            className="text-[10px] px-2.5 py-1 rounded-lg bg-[#151827] text-[#cdc7ba] border border-[#272d42] group-hover:border-[#dfb76c]/25 transition-colors"
          >
            {action}
          </span>
        ))}
      </div>

      {/* Bottom Action Strip: Consultation entry button */}
      <div className="pt-3 border-t border-[#1e2336] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] text-[#8e8779]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active now</span>
          <span>·</span>
          <span>{guru.location.split('/')[0].trim()}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenChat(guru);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
            isFlagship
              ? 'bg-gradient-to-r from-[#dfb76c] to-[#fef08a] text-[#0e1017] hover:brightness-110 shadow-[#dfb76c]/20'
              : isPreferred
              ? 'bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] text-[#0e1017] hover:brightness-110 shadow-[#06b6d4]/20'
              : 'bg-[#1c2135] text-[#ede8dc] hover:bg-[#dfb76c] hover:text-[#0e1017] border border-[#2e3650]'
          }`}
        >
          <span>Open Chat</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
