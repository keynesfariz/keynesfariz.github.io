import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useAiSystemInfo = () =>
  useQuery({
    queryKey: ['system-info'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/system/info`);
      return res.json();
    },
    staleTime: Infinity,
  });
