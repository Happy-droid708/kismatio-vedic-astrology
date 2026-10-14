import React from 'react';
import { Search, Sparkles, MoreVertical, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="w-full bg-[#24133B] border-b border-[#453052]/20 px-4 py-3 flex items-center justify-between select-none">
      {/* Brand Title with Celestial Symbol */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A87B2A] via-[#E7B743] to-[#FFD76A] p-0.5 flex items-center justify-center shadow-sm">
          <div className="w-full h-full rounded-[10px] bg-[#180D2B] flex items-center justify-center">
            <span className="text-[#E7B743] font-display font-bold text-sm">✦</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-display font-bold tracking-wider text-[#F7F0FF]">
              Kismatio
            </h1>
            {unreadCountTotal > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#E7B743] animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-wider text-[#9685AE] uppercase block -mt-0.5">
            Astrology Sanctum
          </span>
        </div>
      </div>

      {/* Right Actions: Search, New Conversation, More Menu, Profile */}
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-xl text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#352044] active:bg-[#352044] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title="Search conversations"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenNewChat}
          className="p-2 rounded-xl text-[#E7B743] hover:text-[#FFD76A] hover:bg-[#352044] active:bg-[#352044] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title="Start new consultation"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#C5B8D9] hover:text-[#E7B743] hover:bg-[#352044] active:bg-[#352044] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon className="w-4 h-4 text-[#24133B]" /> : <Sun className="w-4 h-4 text-[#E7B743]" />}
        </button>

        <button
          onClick={onToggleMenu}
          className="p-2 rounded-xl text-[#C5B8D9] hover:text-[#F7F0FF] hover:bg-[#352044] active:bg-[#352044] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title="Main app menu"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {onOpenProfile && (
          <button
            onClick={onOpenProfile}
            className="p-1 rounded-xl bg-[#2B173C] border border-transparent shadow-[0_2px_8px_rgba(18,9,31,0.35),inset_0_1px_1px_rgba(247,240,255,0.04)] hover:border-[#A87B2A]/40 hover:bg-[#352044] active:scale-95 transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ml-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
            title="My Profile & Kundli"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#A87B2A] to-[#E7B743] p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-[6px] bg-[#180D2B] flex items-center justify-center text-[12px] font-bold text-[#F7F0FF]">
                👤
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
