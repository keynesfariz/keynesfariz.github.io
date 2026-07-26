import { cache } from 'react';

import { allWritings } from 'content-collections';

export const getWritings = cache((slug?: string) => {
  if (slug) {
    return allWritings.find((wr) => wr._meta.path === slug);
  }

  const sortedWritings = allWritings.sort((a, b) =>
    a.created_at > b.created_at ? -1 : 1,
  );

  return sortedWritings;
});
