import type { MyWritingItem } from '@/types/MyWriting';

export const featuredRepos = ['flight-aggregator-go', 'workspace-designer'];

export const sortWritingsByDate = (writings: MyWritingItem[]) =>
  writings.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
