import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Astrologer } from '../../types/astrology';

interface EmptyConversationStateProps {
  astrologer: Astrologer;
  onSendSuggestedPrompt: (text: string) => void;
}

export const EmptyConversationState: React.FC<EmptyConversationStateProps> = ({
  astrologer,
  onSendSuggestedPrompt,
}) => {
  const starters = [
    { label: '🌟 Career & Promotion', text: `Acharya ji, what does my Janma Kundli reveal about my career growth?` },
    { label: '❤️ Love & Relationships', text: `Can you analyze the planetary compatibility and marriage timeline in my chart?` },
    { label: '💎 Prescribed Gemstones', text: `Which Jyotish gemstone is most favorable for strengthening my Lagna lord?` },
    { label: '⚡ Upcoming Transits', text: `What major Graha transits should I prepare for in the next 6 months?` },
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-8 px-3 sm:px-4 text-center select-none relative z-10 my-auto">
      {/* Central Celestial ✦ Glyph with Golden Aura */}
      <div className="relative mb-3 sm:mb-5">
        <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#A87B2A] via-[#E7B743] to-[#FFD76A] p-1 shadow-2xl animate-pulse">
          <div className="w-full h-full rounded-full bg-[#24133B]/95 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-2 rounded-full border border-[#453052]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-[#A87B2A]/40 animate-spin [animation-duration:35s]" />
            <span className="text-2xl sm:text-4xl text-[#E7B743] font-display font-bold">✦</span>
          </div>
        </div>
      </div>

      {/* Required Exact Headline & Subtitle */}
      <h2 className="text-lg sm:text-2xl font-serif-luxury font-bold text-[#F7F0FF] max-w-md leading-tight">
        Your astrology conversation begins here
      </h2>
      <p className="text-xs sm:text-sm text-[#C5B8D9] mt-1.5 sm:mt-2 max-w-md leading-relaxed">
        Ask your astrologer anything about your life, future, relationships or career.
      </p>

      {/* Suggested Quick Starters */}
      <div className="mt-3.5 sm:mt-5 w-full max-w-md flex flex-col gap-1.5 sm:gap-2">
        <span className="text-[11px] text-[#9685AE] font-medium uppercase tracking-wider">
          Suggested Consultation Queries:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {starters.map((s, i) => (
            <button
              key={i}
              onClick={() => onSendSuggestedPrompt(s.text)}
              className="px-3.5 py-2.5 rounded-xl bg-[#2B173C] hover:bg-[#352044] border border-[#453052] hover:border-[#A87B2A] text-left text-xs text-[#C5B8D9] hover:text-[#F7F0FF] transition-all cursor-pointer shadow-md flex items-center gap-2 group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E7B743] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
