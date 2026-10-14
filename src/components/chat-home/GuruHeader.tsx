import React from 'react';
import { MaharajGuru } from '../../data/maharajGurusData';
import {
  ArrowLeft,
  Clock,
  MoreVertical,
  Search,
  Sparkles,
  Compass,
  FileText,
  Scale,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { CelestialPill } from '../ui/CelestialPill';

interface GuruHeaderProps {
  guru: MaharajGuru;
  remainingSeconds: number;
  isMobile: boolean;
  isTablet?: boolean;
  isTabletSidebarCollapsed?: boolean;
  onToggleTabletSidebar?: () => void;
  onBackToDiscovery: () => void;
  onOpenRecharge: () => void;
  onOpenChatMenu: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
  onToggleStructuredWorkspace: () => void;
  isStructuredWorkspaceOpen: boolean;
  onOpenProfile?: () => void;
}

export const GuruHeader: React.FC<GuruHeaderProps> = ({
  guru,
  remainingSeconds,
  isMobile,
  isTablet = false,
  isTabletSidebarCollapsed = false,
  onToggleTabletSidebar,
  onBackToDiscovery,
  onOpenRecharge,
  onOpenChatMenu,
  onToggleSearch,
  isSearchOpen,
  onToggleStructuredWorkspace,
  isStructuredWorkspaceOpen,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 60;
  const isFlagship = guru.badge === 'flagship';

  const getWorkspaceButtonLabel = () => {
    switch (guru.structuredData.type) {
      case 'timeline':
        return 'Timeline';
      case 'vastu':
        return 'Vastu Space';
      case 'chart':
        return 'Charts';
      case 'kundali':
        return 'Kundali';
      case 'search_clues':
        return 'Search Clues';
      case 'legal_case':
        return 'Case File';
      default:
        return 'Insights';
    }
  };

  return (
    <header className="shrink-0 sticky top-0 z-30 bg-[#24133B] border-b border-[#453052]/20 px-2.5 sm:px-4 py-2 sm:py-2.5 flex flex-col gap-1.5 sm:gap-0 justify-center min-h-[58px] select-none shadow-md">
      {/* Top Main Controls Bar */}
      <div className="flex items-center justify-between w-full gap-2">
        {/* Left: Back to Discovery + Guru Avatar & Credentials */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Back to Chats Discovery button (Works on both mobile & desktop) */}
          <button
            onClick={onBackToDiscovery}
            className="flex items-center gap-1 p-1.5 -ml-1 rounded-xl text-[#E7B743] hover:text-[#FFD76A] hover:bg-[#352044] active:bg-[#352044] cursor-pointer shrink-0 transition-all font-medium text-xs group"
            title="Return to all 8 Maharajs"
            aria-label="Back to all Gurus"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-sans font-semibold text-xs text-[#C5B8D9] group-hover:text-[#E7B743]">
              All Gurus
            </span>
          </button>

          {/* Tablet sidebar toggle button */}
          {isTablet && onToggleTabletSidebar && (
            <button
              onClick={onToggleTabletSidebar}
              className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer mr-0.5 shrink-0"
              title={isTabletSidebarCollapsed ? 'Show conversations list' : 'Hide conversations list'}
            >
              {isTabletSidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-[#E7B743]" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Guru Avatar and Credentials */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 shadow-sm flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#A87B2A] to-[#E7B743]"
              >
                <div className="w-full h-full rounded-full bg-[#24133B] flex items-center justify-center text-base sm:text-lg select-none overflow-hidden text-[#E7B743]">
                  {guru.avatarUrl ? (
                    <img
                      src={guru.avatarUrl}
                      alt={guru.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    guru.symbol
                  )}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00D6A0] border-2 border-[#24133B]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#F7F0FF] truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[220px]">
                  {guru.name}
                </h3>
                <span className="w-3.5 h-3.5 rounded-full bg-[#E7B743]/20 text-[#E7B743] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                {isFlagship && (
                  <span className="text-[9px] font-bold text-[#E7B743] bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] px-1.5 py-0.2 rounded-full hidden xs:inline shrink-0">
                    FLAGSHIP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] text-[#9685AE]">
                <span className="text-[#00D6A0] font-semibold shrink-0">● Active</span>
                <span>·</span>
                <span className="truncate max-w-[130px] sm:max-w-[200px] text-[#C5B8D9]">
                  {guru.title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls & Countdown Timer */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Structured Workspace Toggle */}
          <CelestialPill
            variant="default"
            isSelected={isStructuredWorkspaceOpen}
            onClick={onToggleStructuredWorkspace}
            className="text-[11px] min-h-[32px] sm:min-h-[34px] py-1 px-2.5 hidden sm:flex"
            icon={<Sparkles className="w-3.5 h-3.5 text-[#E7B743]" />}
            title={`Toggle ${guru.name} workspace & tools`}
          >
            <span>{getWorkspaceButtonLabel()}</span>
          </CelestialPill>

          {/* Search Toggle */}
          <CelestialPill
            variant="default"
            isSelected={isSearchOpen}
            onClick={onToggleSearch}
            className="p-1.5 min-h-[32px] min-w-[32px] sm:min-h-[34px] sm:min-w-[34px] hidden sm:flex"
            title="Search conversation"
          >
            <Search className="w-3.5 h-3.5" />
          </CelestialPill>

          {/* Consultation Countdown Timer */}
          <CelestialPill
            variant="recharge"
            rechargeAmount={isMobile ? formatTime(remainingSeconds) : `${formatTime(remainingSeconds)} · Top-Up`}
            rechargeAddedText="✓ Top-Up"
            onSelectAction={onOpenRecharge}
            className={`text-[11px] sm:text-xs font-mono min-h-[32px] sm:min-h-[34px] py-1 px-2 sm:px-3 ${
              isLowTime ? 'border-[#E7B743] bg-[#2B173C] text-[#FFD76A]' : ''
            }`}
            icon={
              <Clock
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                  isLowTime ? 'text-[#FFD76A]' : 'text-[#E7B743]'
                }`}
              />
            }
            title="Consultation Timer · Click to Recharge"
          >
            <span className="tabular-nums">{formatTime(remainingSeconds)}</span>
            {!isMobile && <span className="text-[#9685AE] font-normal"> · Top-Up</span>}
          </CelestialPill>

          {/* 3-dots Menu */}
          <button
            onClick={onOpenChatMenu}
            className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] active:bg-[#352044] transition-colors cursor-pointer min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center shrink-0"
            title="Options and consultation details"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Secondary Action Strip */}
      {isMobile && (
        <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#453052]/20 w-full overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {/* Structured Tools / Workspace Toggle */}
            <CelestialPill
              variant="default"
              isSelected={isStructuredWorkspaceOpen}
              onClick={onToggleStructuredWorkspace}
              className="text-[11px] py-1 px-2.5 min-h-[28px]"
              icon={<Sparkles className="w-3.5 h-3.5 text-[#E7B743]" />}
              title={`View ${getWorkspaceButtonLabel()}`}
            >
              {getWorkspaceButtonLabel()}
            </CelestialPill>

            {/* In-chat search toggle */}
            <CelestialPill
              variant="default"
              isSelected={isSearchOpen}
              onClick={onToggleSearch}
              className="text-[11px] py-1 px-2.5 min-h-[28px]"
              icon={<Search className="w-3.5 h-3.5 text-[#E7B743]" />}
              title="Search within conversation"
            >
              Search
            </CelestialPill>

            {/* Specialization badge */}
            <span className="text-[10px] text-[#C5B8D9] bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] px-2.5 py-1 rounded-full">
              {guru.badgeLabel || guru.title}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
