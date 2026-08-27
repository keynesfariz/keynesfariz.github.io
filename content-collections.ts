import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import rehypeHighlight from 'rehype-highlight';
import { z } from 'zod';

const writings = defineCollection({
  name: 'writings',
  directory: 'contents',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    created_at: z.iso.datetime(),
    description: z.string().optional(),
    url: z.string().optional(),
    medium_url: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      rehypePlugins: [rehypeHighlight],
    });
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  content: [writings],
});
