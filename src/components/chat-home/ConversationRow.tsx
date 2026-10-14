import React, { useState } from 'react';
import { ConversationThread } from '../../types/astrology';
import { Check, Pin, Archive, Box, CheckCheck, Clock } from 'lucide-react';

interface ConversationRowProps {
  conversation: ConversationThread;
  isSelected?: boolean;
  onSelect: (conv: ConversationThread) => void;
  onTogglePin: (convId: string, e: React.MouseEvent) => void;
  onToggleArchive: (convId: string, e: React.MouseEvent) => void;
  onToggleRead: (convId: string, e: React.MouseEvent) => void;
  liveRemainingSeconds?: number;
}

export const ConversationRow: React.FC<ConversationRowProps> = ({
  conversation,
  isSelected = false,
  onSelect,
  onTogglePin,
  onToggleArchive,
  onToggleRead,
  liveRemainingSeconds,
}) => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const seconds = liveRemainingSeconds !== undefined && conversation.status === 'active'
    ? liveRemainingSeconds
    : (conversation.remainingSeconds || 522);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Status badge styling per section 4
  const renderStatusBadge = () => {
    switch (conversation.status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active · {timeFormatted}</span>
          </span>
        );
      case 'order':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300">
            <Box className="w-3 h-3 text-[#dfb76c]" />
            <span>Order #{conversation.orderId || 'KS48291'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-[11px] text-[#8e8779]">
            <Check className="w-3 h-3 text-[#787163]" />
            <span>Consultation ended</span>
          </span>
        );
      case 'offline':
        return (
          <span className="flex items-center gap-1 text-[11px] text-[#7d776a]">
            <span>Offline · Reply when available</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(conversation)}
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
      className={`group relative w-full px-4 py-3 flex items-center gap-3 border-b border-[#1b1e2c] transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-[#1a1e2d] border-l-4 border-l-[#dfb76c]'
          : 'bg-[#0f111a] hover:bg-[#141724]'
      }`}
    >
      {/* Left: Avatar with Online indicator */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-0.5 shadow-sm">
          <div className="w-full h-full rounded-full bg-[#181a24] flex items-center justify-center overflow-hidden">
            {conversation.avatarUrl ? (
              <img
                src={conversation.avatarUrl}
                alt={conversation.astrologerName}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#151722] font-display text-base font-bold text-[#dfb76c]">
                {conversation.astrologerName.charAt(0)}
              </div>
            )}
          </div>
        </div>
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f111a] ring-1 ring-emerald-500/50" />
        )}
      </div>

      {/* Center: Astrologer Details & Message Preview */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-sm font-serif-luxury font-bold text-[#f5eedf] truncate">
              {conversation.astrologerName}
            </span>
            {conversation.isVerified && (
              <span className="w-3.5 h-3.5 rounded-full bg-[#dfb76c]/20 text-[#dfb76c] flex items-center justify-center text-[9px] shrink-0 font-bold" title="Verified Vedic Acharya">
                ✓
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#8a8374] shrink-0">
            {conversation.lastMessageTimestamp}
          </span>
        </div>

        {/* Status Line: 🟢 Active · 08:42 */}
        <div className="mt-0.5 flex items-center gap-2">
          {renderStatusBadge()}
        </div>

        {/* Message preview snippet */}
        <p className="text-xs text-[#a49d8f] truncate mt-0.5 leading-snug">
          {conversation.lastMessage}
        </p>
      </div>

      {/* Right: Unread Badge, Pin & Micro Actions */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
        <div className="flex items-center gap-1.5">
          {conversation.isPinned && (
            <Pin className="w-3.5 h-3.5 text-[#dfb76c] fill-current -rotate-45" />
          )}

          {conversation.unreadCount > 0 ? (
            <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#dfb76c] text-[#0e1017] text-[10px] font-mono font-bold flex items-center justify-center shadow-sm">
              {conversation.unreadCount}
            </span>
          ) : (
            <CheckCheck className="w-3.5 h-3.5 text-[#6c7287]" />
          )}
        </div>

        {/* Hover / Swipe Action triggers on Desktop/Mobile */}
        <div className={`flex items-center gap-1 transition-opacity ${showQuickActions ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => onTogglePin(conversation.id, e)}
            className="p-1 rounded text-[#8e8779] hover:text-[#dfb76c] hover:bg-[#202538] transition-colors cursor-pointer"
            title={conversation.isPinned ? 'Unpin chat' : 'Pin chat'}
          >
            <Pin className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => onToggleRead(conversation.id, e)}
            className="p-1 rounded text-[#8e8779] hover:text-[#ede8dc] hover:bg-[#202538] transition-colors cursor-pointer"
            title={conversation.unreadCount > 0 ? 'Mark as read' : 'Mark as unread'}
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => onToggleArchive(conversation.id, e)}
            className="p-1 rounded text-[#8e8779] hover:text-[#ede8dc] hover:bg-[#202538] transition-colors cursor-pointer"
            title="Archive conversation"
          >
            <Archive className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
