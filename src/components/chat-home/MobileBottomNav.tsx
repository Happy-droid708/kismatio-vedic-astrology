import React from 'react';
import { MessageSquare, Compass, Package, CircleDot } from 'lucide-react';

export type MobileTab = 'chats' | 'explore' | 'orders' | 'tools';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  unreadCount: number;
  activeOrderCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  activeOrderCount,
}) => {
  const tabs: { id: MobileTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'chats', label: 'Chats', icon: <MessageSquare className="w-5 h-5" />, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'explore', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" />, badge: activeOrderCount > 0 ? activeOrderCount : undefined },
    { id: 'tools', label: 'Tools', icon: <CircleDot className="w-5 h-5" /> },
  ];

  return (
    <nav className="w-full bg-[#0b0d15]/95 border-t border-[#dfb76c]/20 px-2 sm:px-4 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-around select-none backdrop-blur-xl z-40 shadow-2xl shadow-black/80">
      <div className="flex w-full max-w-md items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer relative min-h-[48px] flex-1 max-w-[80px] group ${
                isActive ? 'text-[#dfb76c]' : 'text-[#857e72] hover:text-[#c4bcac] active:scale-95'
              }`}
            >
              {/* Active Celestial Indicator ✦ with smooth subtle glow (Section 2) */}
              <div className="h-3 flex items-center justify-center -mb-0.5">
                {isActive ? (
                  <span className="text-[10px] text-[#dfb76c] font-bold animate-in fade-in zoom-in-75 duration-200 drop-shadow-[0_0_6px_rgba(223,183,108,0.8)]">
                    ✦
                  </span>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-transparent" />
                )}
              </div>

              {/* Icon Container with subtle spring scale & optional badge */}
              <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 px-1 min-w-[15px] h-[15px] rounded-full bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] text-[8.5px] font-mono font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span
                className={`text-[10.5px] tracking-tight mt-1 transition-colors duration-200 ${
                  isActive ? 'font-bold text-[#fcedc5]' : 'font-medium text-[#857e72]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
