import React from 'react';
import { ConversationThread } from '../../types/astrology';
import { ConversationRow } from './ConversationRow';
import { Pin, Archive, MessageSquareOff } from 'lucide-react';

interface ChatListViewProps {
  conversations: ConversationThread[];
  selectedConversationId?: string;
  onSelectConversation: (conv: ConversationThread) => void;
  onTogglePin: (convId: string, e: React.MouseEvent) => void;
  onToggleArchive: (convId: string, e: React.MouseEvent) => void;
  onToggleRead: (convId: string, e: React.MouseEvent) => void;
  onOpenArchived?: () => void;
  archivedCount: number;
  liveRemainingSeconds?: number;
}

export const ChatListView: React.FC<ChatListViewProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onTogglePin,
  onToggleArchive,
  onToggleRead,
  onOpenArchived,
  archivedCount,
  liveRemainingSeconds,
}) => {
  const pinnedList = conversations.filter((c) => c.isPinned && !c.isArchived);
  const regularList = conversations.filter((c) => !c.isPinned && !c.isArchived);

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#8e8779]">
        <div className="w-12 h-12 rounded-full bg-[#181c2b] border border-[#2b3147] flex items-center justify-center text-[#dfb76c] mb-3">
          <MessageSquareOff className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-[#ede8dc]">No conversations found</h4>
        <p className="text-xs text-[#8e8779] mt-1 max-w-xs">
          Try adjusting your search query or filter to find your astrology readings.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Archived Consultations Banner */}
      {archivedCount > 0 && (
        <button
          onClick={onOpenArchived}
          className="w-full px-4 py-2.5 bg-[#12141e] hover:bg-[#181a28] border-b border-[#1f2334] flex items-center justify-between text-xs text-[#b8b1a3] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-[#dfb76c]" />
            <span className="font-semibold">Archived Consultations</span>
          </div>
          <span className="font-mono text-[11px] text-[#8e8779]">{archivedCount}</span>
        </button>
      )}

      {/* Pinned Astrologers Section */}
      {pinnedList.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-[#0c0d14] border-b border-[#191c28] flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a8a192]">
            <Pin className="w-3 h-3 text-[#dfb76c] -rotate-45" />
            <span>Pinned Astrologers</span>
          </div>
          {pinnedList.map((conv) => (
            <ConversationRow
              key={conv.id}
              conversation={conv}
              isSelected={conv.id === selectedConversationId}
              onSelect={onSelectConversation}
              onTogglePin={onTogglePin}
              onToggleArchive={onToggleArchive}
              onToggleRead={onToggleRead}
              liveRemainingSeconds={liveRemainingSeconds}
            />
          ))}
        </div>
      )}

      {/* All Consultations Section */}
      <div>
        {pinnedList.length > 0 && regularList.length > 0 && (
          <div className="px-4 py-2 bg-[#0c0d14] border-b border-[#191c28] text-[10px] font-bold uppercase tracking-wider text-[#a8a192]">
            <span>All Consultations</span>
          </div>
        )}
        {regularList.map((conv) => (
          <ConversationRow
            key={conv.id}
            conversation={conv}
            isSelected={conv.id === selectedConversationId}
            onSelect={onSelectConversation}
            onTogglePin={onTogglePin}
            onToggleArchive={onToggleArchive}
            onToggleRead={onToggleRead}
            liveRemainingSeconds={liveRemainingSeconds}
          />
        ))}
      </div>
    </div>
  );
};
