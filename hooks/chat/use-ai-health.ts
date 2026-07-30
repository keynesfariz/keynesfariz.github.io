import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/lib/env';

export const useAiHealth = () => {
  const query = useQuery({
    queryKey: ['ai-health'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/`);
      if (!res.ok) throw new Error('Backend sleeping');
      return res.text();
    },
    retry: 6,
    retryDelay: 10000,
    staleTime: Infinity,
  });

  const isAwake = query.isSuccess;
  const isWakingUp = query.isLoading && !query.isError;
  const hasFailed = query.isError;

  return {
    ...query,
    isAwake,
    isWakingUp,
    hasFailed,
  };
};
