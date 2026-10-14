import React, { useState, useEffect } from 'react';
import { ConversationThread } from '../../types/astrology';
import { MaharajGuru } from '../../data/maharajGurusData';
import { GuruSelector } from './GuruSelector';
import { ChatHistoryList } from './ChatHistoryList';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  X,
  Sparkles,
  Compass,
  MessageSquare,
} from 'lucide-react';

interface ChatSidebarProps {
  conversations: ConversationThread[];
  activeConversationId: string | null;
  activeGuru: MaharajGuru | null;
  onSelectConversation: (conv: ConversationThread) => void;
  onSelectGuru: (guru: MaharajGuru) => void;
  onOpenProfile?: (guru: MaharajGuru) => void;
  onStartNewChat: () => void;
  onTogglePin?: (convId: string, e: React.MouseEvent) => void;
  onDeleteConversation?: (convId: string, e: React.MouseEvent) => void;
  onRenameConversation?: (convId: string, newTitle: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  activeGuru,
  onSelectConversation,
  onSelectGuru,
  onOpenProfile,
  onStartNewChat,
  onTogglePin,
  onDeleteConversation,
  onRenameConversation,
  isCollapsed,
  onToggleCollapse,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'guru'>('all');

  // Handle Escape key to close mobile drawer or clear search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileDrawer && onCloseMobileDrawer) {
          onCloseMobileDrawer();
        } else if (searchQuery) {
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawer, onCloseMobileDrawer, searchQuery]);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (c.isArchived) return false;

    // Filter by active guru if selected
    if (filterMode === 'guru' && activeGuru) {
      const matchesGuru =
        c.guruId === activeGuru.id ||
        c.astrologerId === activeGuru.id ||
        c.id.includes(activeGuru.id);
      if (!matchesGuru) return false;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = c.astrologerName.toLowerCase().includes(q);
      const matchesTitle = (c.astrologerTitle || '').toLowerCase().includes(q);
      const matchesMsg = (c.lastMessage || '').toLowerCase().includes(q);
      const matchesTopic = (c.topics || []).some((t) => t.toLowerCase().includes(q));
      if (!matchesName && !matchesTitle && !matchesMsg && !matchesTopic) {
        return false;
      }
    }

    return true;
  });

  // Handle conversation selection in mobile drawer (auto-close drawer)
  const handleItemSelect = (conv: ConversationThread) => {
    onSelectConversation(conv);
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Handle guru selection in mobile drawer (auto-close drawer)
  const handleGuruSelect = (guru: MaharajGuru) => {
    onSelectGuru(guru);
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Handle new chat click in mobile drawer
  const handleNewChatClick = () => {
    onStartNewChat();
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // ---------------------------------------------------------------------------
  // COLLAPSED RAIL VIEW (Desktop only)
  // ---------------------------------------------------------------------------
  if (isCollapsed && !isMobileDrawer) {
    return (
      <aside
        className="w-[68px] h-full flex flex-col items-center bg-[#180D2B] border-r border-[#453052]/20 py-3.5 select-none relative z-30 transition-all duration-200"
        aria-label="Navigation rail"
      >
        {/* Top: Expand Button */}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl text-[#9685AE] hover:text-[#FFD76A] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 transition-colors cursor-pointer mb-3 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>

        {/* Brand Mark */}
        <div className="w-8 h-8 rounded-full bg-[#24133B] flex items-center justify-center text-[#E7B743] font-bold text-xs shadow-xs mb-4">
          ✦
        </div>

        {/* New Chat Icon Button */}
        <button
          onClick={onStartNewChat}
          className="w-10 h-10 rounded-xl clay-button-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 mb-4 shadow-sm"
          title={`New chat with ${activeGuru?.name || 'Guru'}`}
          aria-label="New chat"
        >
          <Plus className="w-5 h-5 text-[#180D2B] stroke-[2.5]" />
        </button>

        {/* Search trigger icon button */}
        <button
          onClick={onToggleCollapse}
          className="p-2.5 rounded-xl text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] transition-colors cursor-pointer mb-4"
          title="Search previous chats"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-8 h-px bg-[#453052]/30 mb-3" />

        {/* Vertical Guru Switcher Rail */}
        <div className="flex-1 w-full overflow-y-auto scrollbar-none flex flex-col items-center gap-1.5">
          <GuruSelector
            activeGuru={activeGuru}
            onSelectGuru={onSelectGuru}
            onOpenProfile={onOpenProfile}
            isCollapsed
          />
        </div>

        {/* Bottom Expand Indicator */}
        <button
          onClick={onToggleCollapse}
          className="mt-2 text-[10px] font-mono text-[#9685AE] hover:text-[#E7B743] flex items-center justify-center p-1 cursor-pointer"
          title="Expand sidebar"
        >
          »
        </button>
      </aside>
    );
  }

  // ---------------------------------------------------------------------------
  // FULL EXPANDED SIDEBAR / MOBILE DRAWER VIEW
  // ---------------------------------------------------------------------------
  const content = (
    <div className="w-full h-full flex flex-col bg-[#180D2B] border-r border-[#453052]/20 select-none relative overflow-hidden">
      {/* 1. Header: Brand + Collapse / Close */}
      <div className="shrink-0 h-14 px-3.5 flex items-center justify-between border-b border-[#453052]/20 bg-[#24133B]/60 backdrop-blur-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#A87B2A] to-[#E7B743] p-0.5 flex items-center justify-center shadow-xs shrink-0">
            <div className="w-full h-full rounded-full bg-[#24133B] flex items-center justify-center font-display text-xs font-bold text-[#E7B743]">
              ✦
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-serif-luxury font-bold text-xs tracking-wider text-[#F7F0FF] truncate">
              KISMATIO SANCTUM
            </h2>
            <p className="text-[9px] font-mono text-[#9685AE] uppercase tracking-wider truncate">
              Vedic Astrology & Gurus
            </p>
          </div>
        </div>

        {/* Desktop Collapse / Mobile Close Button */}
        {isMobileDrawer ? (
          <button
            onClick={onCloseMobileDrawer}
            className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] transition-colors cursor-pointer"
            title="Close history drawer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#FFD76A] hover:bg-[#352044] transition-colors cursor-pointer"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. New Chat Button */}
      <div className="px-3 pt-3 pb-2 shrink-0">
        <button
          onClick={handleNewChatClick}
          className="w-full py-2.5 px-3.5 rounded-xl clay-button-primary flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.98] shadow-md group outline-none focus-visible:ring-2 focus-visible:ring-[#FFD76A]"
          title={`Start a new conversation with ${activeGuru?.name || 'Guru'}`}
        >
          <Plus className="w-4 h-4 text-[#180D2B] stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
          <span className="font-serif-luxury font-bold text-xs text-[#180D2B] tracking-wide">
            + New Chat {activeGuru ? `(${activeGuru.name})` : ''}
          </span>
        </button>
      </div>

      {/* 3. Search Bar */}
      <div className="px-3 pb-2 shrink-0">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#9685AE] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search previous chats..."
            className="w-full pl-8 pr-7 py-1.5 text-xs text-[#F7F0FF] placeholder:text-[#9685AE] bg-[#12091F] border border-transparent rounded-xl clay-input outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-0.5 text-[#9685AE] hover:text-[#F7F0FF] rounded-full cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Filter Toggle: All Chats vs Active Guru */}
      {activeGuru && (
        <div className="px-3 pb-2 shrink-0 flex items-center gap-1.5">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
              filterMode === 'all'
                ? 'bg-[#E7B743] text-[#180D2B] font-bold shadow-xs'
                : 'bg-[#24133B] text-[#C5B8D9] hover:bg-[#352044]'
            }`}
          >
            All Gurus ({conversations.filter((c) => !c.isArchived).length})
          </button>
          <button
            onClick={() => setFilterMode('guru')}
            className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] truncate ${
              filterMode === 'guru'
                ? 'bg-[#E7B743] text-[#180D2B] font-bold shadow-xs'
                : 'bg-[#24133B] text-[#C5B8D9] hover:bg-[#352044]'
            }`}
          >
            {activeGuru.name} Only
          </button>
        </div>
      )}

      {/* 5. Guru Switcher (All 8 Approved Gurus) */}
      <div className="shrink-0 border-b border-[#453052]/20 pb-2">
        <GuruSelector
          activeGuru={activeGuru}
          onSelectGuru={handleGuruSelect}
          onOpenProfile={onOpenProfile}
        />
      </div>

      {/* 6. Recent Chat History List (Grouped by Today, Yesterday, Previous 7 Days, Older) */}
      <ChatHistoryList
        conversations={filteredConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleItemSelect}
        onOpenProfile={onOpenProfile}
        onTogglePin={onTogglePin}
        onDelete={onDeleteConversation}
        onRename={onRenameConversation}
        searchQuery={searchQuery}
      />
    </div>
  );

  // If in mobile drawer mode, wrap in fixed overlay container
  if (isMobileDrawer) {
    return (
      <div
        className="fixed inset-0 z-50 flex animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Chat History Drawer"
      >
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-[#12091F]/70 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobileDrawer}
          aria-hidden="true"
        />

        {/* Slide-in Drawer */}
        <div className="relative w-[85%] max-w-[320px] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200 flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  // Desktop regular sidebar
  return (
    <aside
      className="w-full h-full min-h-0 flex flex-col relative"
      aria-label="Chat History and Gurus Sidebar"
    >
      {content}
    </aside>
  );
};
