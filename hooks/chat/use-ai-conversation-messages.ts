import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/lib/env';

export const useAiConversationMessages = (
  conversationId?: string | null,
  isAwake: boolean = true,
) =>
  useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return { messages: [], expiresAt: null };

      const res = await fetch(`${API_URL}/conversations/${conversationId}`);

      if (!res.ok) throw new Error('Failed to load conversation');
      const data = await res.json();

      return {
        messages: data.messages || [],
        expiresAt: data.expires_at || null,
      };
    },
    enabled: !!conversationId && isAwake,
  });
