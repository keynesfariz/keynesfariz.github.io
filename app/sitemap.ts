import { Writing } from '@/.content-collections/generated';
import { getWritings } from '@/lib/data';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${process.env.NEXT_BASE_URL}/writings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...(getWritings() as Writing[]).map((wr) => ({
      url: `${process.env.NEXT_BASE_URL}/writings/${wr._meta.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: 0.5,
    })),
  ];
}
