import { useQuery } from '@tanstack/react-query';

export function useAiConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/conversations`);
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      return data.conversations || [];
    },
  });
}
