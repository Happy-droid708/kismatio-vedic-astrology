import React from 'react';
import { Search, Sparkles, MoreVertical, Plus } from 'lucide-react';

interface ChatHomeHeaderProps {
  onOpenSearch: () => void;
  onOpenNewChat: () => void;
  onToggleMenu: () => void;
  unreadCountTotal: number;
  onOpenProfile?: () => void;
}

export const ChatHomeHeader: React.FC<ChatHomeHeaderProps> = ({
  onOpenSearch,
  onOpenNewChat,
  onToggleMenu,
  unreadCountTotal,
  onOpenProfile,
}) => {
  return (
    <div className="w-full bg-[#10121b] border-b border-[#dfb76c]/15 px-4 py-3 flex items-center justify-between select-none">
      {/* Brand Title with Celestial Symbol */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-0.5 flex items-center justify-center shadow-sm">
          <div className="w-full h-full rounded-[10px] bg-[#12141d] flex items-center justify-center">
            <span className="text-[#dfb76c] font-display font-bold text-sm">✦</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-display font-bold tracking-wider text-[#ede8dc]">
              Kismatio
            </h1>
            {unreadCountTotal > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-wider text-[#a8a192] uppercase block -mt-0.5">
            Astrology Sanctum
          </span>
        </div>
      </div>

      {/* Right Actions: Search, New Conversation, More Menu, Profile */}
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-xl text-[#a8a192] hover:text-[#ede8dc] active:bg-[#1a1d2b] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Search conversations"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenNewChat}
          className="p-2 rounded-xl text-[#dfb76c] hover:text-[#fef08a] active:bg-[#1a1d2b] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Start new consultation"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleMenu}
          className="p-2 rounded-xl text-[#a8a192] hover:text-[#ede8dc] active:bg-[#1a1d2b] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Main app menu"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {onOpenProfile && (
          <button
            onClick={onOpenProfile}
            className="p-1 rounded-xl bg-[#141724] border border-[#dfb76c]/30 hover:border-[#dfb76c]/60 active:scale-95 transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ml-0.5"
            title="My Profile & Kundli"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-[6px] bg-[#0b0c14] flex items-center justify-center text-[12px] font-bold text-[#fcedc5]">
                👤
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
