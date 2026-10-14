import { ConversationThread, ChatMessageItem, DEFAULT_AUTHENTICATED_USER_ID } from '../types/astrology';
import { MAHARAJ_GURUS } from '../data/maharajGurusData';

export const APPROVED_GURU_IDS = [
  'adit',
  'nupur',
  'dr-aditi',
  'kavya',
  'acharya-vasudev',
  'acharya-guru',
  'khoji-baba',
  'nyaya-guru',
] as const;

export type ApprovedGuruId = typeof APPROVED_GURU_IDS[number];

export interface GetChatHistoryParams {
  conversations: ConversationThread[];
  userId: string;
  guruId: string;
  searchQuery?: string;
}

/**
 * Filter chat history strictly by authenticated user and Guru ID.
 * Rule: ONE GURU = ONE PRIVATE CHAT-HISTORY VIEW.
 * Never display another Guru's conversations in the selected Guru's view.
 */
export function getChatHistory({
  conversations,
  userId,
  guruId,
  searchQuery = '',
}: GetChatHistoryParams): ConversationThread[] {
  if (!guruId) return [];

  // Enforce approved Guru ID validation
  const isApproved = APPROVED_GURU_IDS.includes(guruId as ApprovedGuruId);
  if (!isApproved) return [];

  return conversations.filter((c) => {
    // 1. Exclude archived chats from the active history sidebar
    if (c.isArchived) return false;

    // 2. Enforce authenticated user ownership (Security: prevents cross-user exposure)
    if (c.userId && c.userId !== userId) {
      return false;
    }

    // 3. Strict Guru ID association
    // Use stable guruId; fallback to astrologerId only if it strictly matches an approved Guru
    const matchedGuruId = c.guruId || (APPROVED_GURU_IDS.includes(c.astrologerId as ApprovedGuruId) ? c.astrologerId : null);
    
    // Legacy conversations that cannot be reliably matched are omitted (never arbitrarily assigned)
    if (!matchedGuruId || matchedGuruId !== guruId) {
      return false;
    }

    // 4. In-sidebar search: searches strictly within this Guru's private history
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = (c.astrologerTitle || '').toLowerCase().includes(q);
      const matchesMsg = (c.lastMessage || '').toLowerCase().includes(q);
      const matchesTopic = (c.topics || []).some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesMsg && !matchesTopic) {
        return false;
      }
    }

    return true;
  });
}

const STORAGE_KEY_PREFIX = 'kismatio_sanctum_chats_';
const MESSAGES_KEY_PREFIX = 'kismatio_sanctum_messages_';

/**
 * Safe client-side storage persistence for conversation threads
 */
export function loadConversationsFromStorage(userId: string = DEFAULT_AUTHENTICATED_USER_ID): ConversationThread[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to load conversations from storage', err);
  }
  return null;
}

export function saveConversationsToStorage(
  userId: string = DEFAULT_AUTHENTICATED_USER_ID,
  conversations: ConversationThread[]
): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(conversations));
  } catch (err) {
    console.warn('Failed to save conversations to storage', err);
  }
}

/**
 * Safe client-side storage persistence for chat messages per conversation
 */
export function loadMessagesFromStorage(userId: string = DEFAULT_AUTHENTICATED_USER_ID): Record<string, ChatMessageItem[]> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${MESSAGES_KEY_PREFIX}${userId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to load messages from storage', err);
  }
  return null;
}

export function saveMessagesToStorage(
  userId: string = DEFAULT_AUTHENTICATED_USER_ID,
  messages: Record<string, ChatMessageItem[]>
): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${MESSAGES_KEY_PREFIX}${userId}`, JSON.stringify(messages));
  } catch (err) {
    console.warn('Failed to save messages to storage', err);
  }
}
