import React, { useState } from 'react';
import { ConversationThread } from '../../types/astrology';
import { MAHARAJ_GURUS, MaharajGuru } from '../../data/maharajGurusData';
import { Pin, Trash2, Edit3, Check, X } from 'lucide-react';

interface ChatHistoryItemProps {
  conversation: ConversationThread;
  isActive: boolean;
  onSelect: (conv: ConversationThread) => void;
  onOpenProfile?: (guru: MaharajGuru) => void;
  onTogglePin?: (convId: string, e: React.MouseEvent) => void;
  onDelete?: (convId: string, e: React.MouseEvent) => void;
  onRename?: (convId: string, newTitle: string) => void;
  isCollapsed?: boolean;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  conversation,
  isActive,
  onSelect,
  onOpenProfile,
  onTogglePin,
  onDelete,
  onRename,
  isCollapsed = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(
    conversation.astrologerTitle || conversation.astrologerName
  );

  const handleSaveRename = (e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    if (titleDraft.trim() && onRename) {
      onRename(conversation.id, titleDraft.trim());
    }
    setIsEditing(false);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitleDraft(conversation.astrologerTitle || conversation.astrologerName);
    setIsEditing(false);
  };

  const matchedGuru = MAHARAJ_GURUS.find(
    (g) =>
      g.id === conversation.astrologerId ||
      g.id === conversation.guruId ||
      conversation.id === `conv-${g.id}` ||
      conversation.id.includes(g.id)
  );

  const handleAvatarClick = (e: React.MouseEvent) => {
    if (matchedGuru && onOpenProfile) {
      e.stopPropagation();
      onOpenProfile(matchedGuru);
    }
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => onSelect(conversation)}
        className={`w-10 h-10 rounded-full flex items-center justify-center relative group p-0.5 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
          isActive
            ? 'ring-2 ring-[#E7B743] bg-[#2B173C]'
            : 'hover:bg-[#352044] opacity-80 hover:opacity-100'
        }`}
        title={`${conversation.astrologerName} — ${conversation.lastMessage.slice(0, 50)}...`}
      >
        <div
          onClick={handleAvatarClick}
          className="w-full h-full rounded-full overflow-hidden bg-[#24133B] flex items-center justify-center"
        >
          {conversation.avatarUrl ? (
            <img
              src={conversation.avatarUrl}
              alt={conversation.astrologerName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-[10px] font-bold text-[#E7B743]">
              {conversation.astrologerName.charAt(0)}
            </span>
          )}
        </div>
        {conversation.isPinned && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#E7B743] flex items-center justify-center text-[7px] text-[#180D2B] font-bold">
            ★
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      onClick={() => onSelect(conversation)}
      className={`group relative flex items-start gap-2.5 px-3 py-2.5 rounded-xl border border-transparent transition-all duration-150 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
        isActive
          ? 'bg-[#2B173C] border-transparent shadow-[0_4px_16px_rgba(18,9,31,0.5),inset_0_1px_1px_rgba(255,215,106,0.2)] ring-1 ring-[#E7B743]/60'
          : 'hover:bg-[#24133B] hover:border-[#A87B2A]/30 active:scale-[0.99]'
      }`}
    >
      {/* Guru Avatar */}
      <div className="relative shrink-0 mt-0.5">
        <button
          type="button"
          onClick={handleAvatarClick}
          className={`w-8 h-8 rounded-full overflow-hidden bg-[#24133B] p-0.5 border border-transparent shadow-xs block text-left ${
            matchedGuru && onOpenProfile ? 'cursor-pointer hover:scale-105 transition-transform' : ''
          }`}
          title={matchedGuru ? `View ${matchedGuru.name}'s Profile` : conversation.astrologerName}
          aria-label={matchedGuru ? `View ${matchedGuru.name}'s Profile` : conversation.astrologerName}
        >
          {conversation.avatarUrl ? (
            <img
              src={conversation.avatarUrl}
              alt={conversation.astrologerName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#2B173C] flex items-center justify-center text-xs font-bold text-[#E7B743]">
              {conversation.astrologerName.charAt(0)}
            </div>
          )}
        </button>
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00D6A0] border border-[#180D2B] pointer-events-none" />
        )}
      </div>

      {/* Content Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          {isEditing ? (
            <div
              className="flex items-center gap-1 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename(e);
                  if (e.key === 'Escape') handleCancelRename(e as any);
                }}
                className="w-full text-xs font-semibold text-[#F7F0FF] bg-[#12091F] px-1.5 py-0.5 rounded border border-[#E7B743] outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveRename}
                className="p-1 text-[#00D6A0] hover:bg-[#352044] rounded cursor-pointer"
                title="Save title"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCancelRename}
                className="p-1 text-[#9685AE] hover:bg-[#352044] rounded cursor-pointer"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`text-xs font-serif-luxury font-bold truncate ${
                    isActive ? 'text-[#FFD76A]' : 'text-[#F7F0FF] group-hover:text-[#FFD76A]'
                  }`}
                  title={conversation.astrologerTitle || conversation.astrologerName}
                >
                  {conversation.astrologerTitle || conversation.astrologerName}
                </span>
                {conversation.isPinned && (
                  <Pin className="w-2.5 h-2.5 text-[#E7B743] fill-[#E7B743] shrink-0" />
                )}
              </div>
              <span className="text-[10px] font-mono text-[#9685AE] shrink-0">
                {conversation.lastMessageTimestamp}
              </span>
            </>
          )}
        </div>

        {/* Message preview or title subtitle */}
        {!isEditing && (
          <p className="text-[11px] text-[#C5B8D9] truncate mt-0.5 leading-snug">
            {conversation.lastMessage || 'Consultation thread'}
          </p>
        )}

        {/* Topic or status tag metadata */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-[#12091F] text-[#9685AE]">
            {conversation.topics?.[0] || 'Vedic Guidance'}
          </span>
          {conversation.isSaved && (
            <span className="text-[9px] font-mono text-[#E7B743]">★ Saved</span>
          )}
        </div>
      </div>

      {/* Row Hover Quick Actions (Pin, Rename, Delete) */}
      {!isEditing && (
        <div className="hidden group-hover:flex items-center gap-1 absolute right-2 top-2 bg-[#24133B] px-1.5 py-0.5 rounded-lg shadow-md border border-[#453052]/40 z-10">
          {onTogglePin && (
            <button
              onClick={(e) => onTogglePin(conversation.id, e)}
              className="p-1 text-[#9685AE] hover:text-[#E7B743] transition-colors cursor-pointer"
              title={conversation.isPinned ? 'Unpin chat' : 'Pin chat to top'}
            >
              <Pin className={`w-3 h-3 ${conversation.isPinned ? 'fill-[#E7B743] text-[#E7B743]' : ''}`} />
            </button>
          )}
          {onRename && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1 text-[#9685AE] hover:text-[#F7F0FF] transition-colors cursor-pointer"
              title="Rename consultation"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => onDelete(conversation.id, e)}
              className="p-1 text-[#9685AE] hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete consultation"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
