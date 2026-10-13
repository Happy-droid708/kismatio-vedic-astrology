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
    { id: 'chats', label: 'Chats', icon: <MessageSquare className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'astrologers', label: 'Astrologers', icon: <Users className="w-4 h-4 text-[#dfb76c]" />, badge: '6 Peeths' },
    { id: 'tools', label: 'Free Tools', icon: <Compass className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'horoscope', label: 'Horoscope', icon: <Sun className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'gemstones', label: 'Gemstones', icon: <Gem className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4 text-[#dfb76c]" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4 text-[#dfb76c]" /> },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {isMobile ? (
        /* Mobile Bottom Sheet */
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#121420] border-t border-[#dfb76c]/30 rounded-t-3xl max-h-[85dvh] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-200 shadow-2xl">
          <div className="w-full pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#373e56]" />
          </div>

          <div className="px-5 py-3 border-b border-[#222739] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#dfb76c] font-bold text-sm">✦</span>
              <span className="text-sm font-display font-bold text-[#f5eedf]">Kismatio Menu</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-2 py-2 divide-y divide-[#1b1f2e]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.id);
                  onClose();
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs text-[#cdc7ba] active:bg-[#1d2235] active:text-[#ede8dc] transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-[#181a27] border border-[#2b3145]">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#dfb76c]/15 text-[#dfb76c] font-bold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#5e584c]" />
                </div>
              </button>
            ))}
          </div>

          {/* Quick Theme Switcher */}
          <div className="px-4 py-3 border-t border-[#222739] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#cdc7ba]">
              <span className="p-1.5 rounded-lg bg-[#181a27] border border-[#2b3145] text-[#dfb76c]">
                {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </span>
              <span className="font-semibold text-sm">Theme Appearance</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#181a27] border border-[#dfb76c]/30 text-[#dfb76c] hover:border-[#dfb76c] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Dropdown */
        <div className="fixed top-14 left-4 sm:left-4 z-50 w-64 bg-[#141624] border border-[#dfb76c]/30 rounded-2xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 border-b border-[#222739] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span className="text-xs font-semibold text-[#f5eedf]">Kismatio Menu</span>
            </div>
            <button onClick={onClose} className="p-1 rounded text-[#8e8779] hover:text-[#ede8dc] cursor-pointer">
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
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs text-[#cdc7ba] hover:bg-[#1d2235] hover:text-[#ede8dc] transition-colors cursor-pointer min-h-[38px]"
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#dfb76c]/15 text-[#dfb76c] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Theme Switcher */}
          <div className="px-3.5 py-2 border-t border-[#222739] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#cdc7ba]">
              {theme === 'light' ? <Sun className="w-3.5 h-3.5 text-[#dfb76c]" /> : <Moon className="w-3.5 h-3.5 text-[#dfb76c]" />}
              <span className="font-medium">Theme</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#181a27] border border-[#dfb76c]/30 text-[#dfb76c] hover:border-[#dfb76c] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'light' ? '☀ Light' : '◐ Dark'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
