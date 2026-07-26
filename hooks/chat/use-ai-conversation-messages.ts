import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useAiConversationMessages = (conversationId?: string | null) =>
  useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await fetch(`${BASE_URL}/conversations/${conversationId}`);
      if (!res.ok) throw new Error('Failed to load conversation');
      const data = await res.json();
      return data.messages || [];
    },
    enabled: !!conversationId,
  });
