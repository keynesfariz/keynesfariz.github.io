'use client';

import { useAiHealth } from '@/hooks/chat';

export function AiHealthPreloader() {
  useAiHealth();
  return null;
}
