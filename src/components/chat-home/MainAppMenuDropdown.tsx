import React from 'react';
import {
  MessageSquare,
  Users,
  Compass,
  Sun,
  Moon,
  Gem,
  Package,
  Bell,
  User,
  Settings,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { MainAppMenuItem } from '../../types/astrology';
import { useTheme } from '../../context/ThemeContext';

interface MainAppMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: MainAppMenuItem) => void;
  isMobile?: boolean;
}

export const MainAppMenuDropdown: React.FC<MainAppMenuDropdownProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  isMobile = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  if (!isOpen) return null;

  const menuItems: { id: MainAppMenuItem; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'chats', label: 'Chats', icon: <MessageSquare className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'astrologers', label: 'Astrologers', icon: <Users className="w-4 h-4 text-[#E7B743]" />, badge: '6 Peeths' },
    { id: 'tools', label: 'Free Tools', icon: <Compass className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'horoscope', label: 'Horoscope', icon: <Sun className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'gemstones', label: 'Gemstones', icon: <Gem className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4 text-[#E7B743]" /> },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#12091F]/80 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {isMobile ? (
        /* Mobile Bottom Sheet */
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#24133B] border-t border-transparent clay-float rounded-t-3xl max-h-[85dvh] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-200">
          <div className="w-full pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#453052]/50" />
          </div>

          <div className="px-5 py-3 border-b border-[#453052]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#E7B743] font-bold text-sm">✦</span>
              <span className="text-sm font-display font-bold text-[#F7F0FF]">Kismatio Menu</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-2 py-2 divide-y divide-[#453052]/20">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.id);
                  onClose();
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs text-[#C5B8D9] active:bg-[#352044] active:text-[#F7F0FF] transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-[#2B173C] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2B173C] text-[#E7B743] font-bold border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#9685AE]" />
                </div>
              </button>
            ))}
          </div>

          {/* Quick Theme Switcher */}
          <div className="px-4 py-3 border-t border-[#453052]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#C5B8D9]">
              <span className="p-1.5 rounded-lg bg-[#2B173C] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] text-[#E7B743]">
                {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </span>
              <span className="font-semibold text-sm">Theme Appearance</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="clay-button-secondary px-3 py-1.5 rounded-xl text-xs font-semibold text-[#E7B743] hover:text-[#FFD76A] cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Dropdown */
        <div className="fixed top-14 left-4 sm:left-4 z-50 w-64 bg-[#24133B] border border-transparent clay-float rounded-2xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 border-b border-[#453052]/20 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E7B743]" />
              <span className="text-xs font-semibold text-[#F7F0FF]">Kismatio Menu</span>
            </div>
            <button onClick={onClose} className="p-1 rounded text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.id);
                  onClose();
                }}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs text-[#C5B8D9] hover:bg-[#352044] hover:text-[#F7F0FF] transition-colors cursor-pointer min-h-[38px]"
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#2B173C] text-[#E7B743] font-bold border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Theme Switcher */}
          <div className="px-3.5 py-2 border-t border-[#453052]/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#C5B8D9]">
              {theme === 'light' ? <Sun className="w-3.5 h-3.5 text-[#E7B743]" /> : <Moon className="w-3.5 h-3.5 text-[#E7B743]" />}
              <span className="font-medium">Theme</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="clay-button-secondary px-2.5 py-1 rounded-lg text-xs font-semibold text-[#E7B743] hover:text-[#FFD76A] cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'light' ? '☀ Light' : '◐ Dark'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
