import { defineCollection, defineConfig } from '@content-collections/core';
import matter from 'gray-matter';
import { z } from 'zod';

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true });
  return { data, body, excerpt: excerpt || '' };
}

const journals = defineCollection({
  name: 'journals',
  directory: './journals',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    published: z.iso.date(),
    description: z.string().optional(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content);

    console.log({ frontMatter: frontMatter.excerpt })

    // Extract header image (first image in the document)
    const headerImageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined;

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      description: frontMatter.data.description,
      headerImage,
      content: frontMatter.body,
    };
  },
});

export default defineConfig({
  content: [journals],
});
