import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const writings = defineCollection({
  name: 'writings',
  directory: 'contents',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    created_at: z.iso.datetime(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    content: z.string(),
    is_featured: z.boolean().optional(),
  }),
});

export default defineConfig({
  content: [writings],
});
