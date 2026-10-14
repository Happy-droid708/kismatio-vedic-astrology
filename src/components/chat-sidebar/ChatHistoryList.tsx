import React from 'react';
import { ConversationThread } from '../../types/astrology';
import { ChatHistoryItem } from './ChatHistoryItem';
import { MessageSquare, Sparkles } from 'lucide-react';

export const getHistoryGroup = (
  timestamp: string
): 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older' => {
  const lower = (timestamp || '').toLowerCase().trim();
  if (
    lower.includes('am') ||
    lower.includes('pm') ||
    lower.includes('today') ||
    lower.includes('just now') ||
    lower.includes('m ago') ||
    lower.includes('h ago')
  ) {
    return 'Today';
  }
  if (lower.includes('yesterday')) {
    return 'Yesterday';
  }
  if (
    lower.includes('2 days ago') ||
    lower.includes('3 days ago') ||
    lower.includes('4 days ago') ||
    lower.includes('5 days ago') ||
    lower.includes('6 days ago') ||
    lower.includes('7 days ago') ||
    lower.includes('this week')
  ) {
    return 'Previous 7 Days';
  }
  return 'Older';
};

import { MaharajGuru } from '../../data/maharajGurusData';

interface ChatHistoryListProps {
  conversations: ConversationThread[];
  activeConversationId: string | null;
  onSelectConversation: (conv: ConversationThread) => void;
  onOpenProfile?: (guru: MaharajGuru) => void;
  onTogglePin?: (convId: string, e: React.MouseEvent) => void;
  onDelete?: (convId: string, e: React.MouseEvent) => void;
  onRename?: (convId: string, newTitle: string) => void;
  searchQuery?: string;
  isCollapsed?: boolean;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenProfile,
  onTogglePin,
  onDelete,
  onRename,
  searchQuery = '',
  isCollapsed = false,
}) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-48 select-none">
        <div className="w-10 h-10 rounded-full bg-[#24133B] flex items-center justify-center mb-2.5 text-[#9685AE] shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]">
          <MessageSquare className="w-5 h-5 text-[#9685AE]" />
        </div>
        <p className="text-xs font-semibold text-[#F7F0FF]">
          {searchQuery ? 'No matching consultations' : 'No previous conversations'}
        </p>
        <p className="text-[11px] text-[#9685AE] mt-1 max-w-[200px]">
          {searchQuery
            ? `No chats found for "${searchQuery}". Try a different keyword.`
            : 'Start a consultation to record your Vedic guidance.'}
        </p>
      </div>
    );
  }

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-2 w-full overflow-y-auto scrollbar-none">
        {conversations.map((conv) => (
          <ChatHistoryItem
            key={conv.id}
            conversation={conv}
            isActive={activeConversationId === conv.id}
            onSelect={onSelectConversation}
            onTogglePin={onTogglePin}
            isCollapsed
          />
        ))}
      </div>
    );
  }

  // Group conversations into Today, Yesterday, Previous 7 Days, Older
  const groups: Record<
    'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older',
    ConversationThread[]
  > = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: [],
  };

  // Sort pinned to the top, then categorize
  const sorted = [...conversations].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  sorted.forEach((c) => {
    const group = getHistoryGroup(c.lastMessageTimestamp);
    groups[group].push(c);
  });

  const groupKeys: Array<'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older'> = [
    'Today',
    'Yesterday',
    'Previous 7 Days',
    'Older',
  ];

  return (
    <div className="w-full flex-1 overflow-y-auto px-2 space-y-4 py-2 scrollbar-thin">
      {groupKeys.map((groupKey) => {
        const items = groups[groupKey];
        if (items.length === 0) return null;

        return (
          <div key={groupKey} className="space-y-1">
            <div className="px-2 py-1 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9685AE] font-semibold">
                {groupKey}
              </span>
              <span className="text-[9px] font-mono text-[#9685AE]/70">
                {items.length} {items.length === 1 ? 'chat' : 'chats'}
              </span>
            </div>

            <div className="space-y-0.5">
              {items.map((conv) => (
                <ChatHistoryItem
                  key={conv.id}
                  conversation={conv}
                  isActive={activeConversationId === conv.id}
                  onSelect={onSelectConversation}
                  onOpenProfile={onOpenProfile}
                  onTogglePin={onTogglePin}
                  onDelete={onDelete}
                  onRename={onRename}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
