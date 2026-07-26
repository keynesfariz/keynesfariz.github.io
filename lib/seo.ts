import type { Metadata } from 'next';

export const getMetadata = (rawMeta?: Metadata): Metadata => {
  const NAME = 'Fariz Muhammad';
  const title =
    rawMeta && rawMeta.title
      ? `${rawMeta.title} | ${NAME}`
      : `${NAME}, A Senior Software Engineer`;
  return { ...rawMeta, title };
};
