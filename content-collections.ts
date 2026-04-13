import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const writings = defineCollection({
  name: 'writings',
  directory: 'app/contents',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    created_at: z.iso.datetime(),
    description: z.string().optional(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
    is_featured: z.boolean().optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  content: [writings],
});
