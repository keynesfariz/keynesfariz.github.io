import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/lib/env';

export const useAiSystemInfo = () =>
  useQuery({
    queryKey: ['system-info'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/system/info`);
      return res.json();
    },
    staleTime: Infinity,
  });
