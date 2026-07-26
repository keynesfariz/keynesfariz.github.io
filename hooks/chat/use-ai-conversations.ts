import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/lib/env';

export function useAiConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/conversations`);
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      return data.conversations || [];
    },
  });
}
