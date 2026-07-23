import { slugify } from '@/lib/utils';

export type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function generateTOC(markdown: string): TOCItem[] {
  const headings: TOCItem[] = [];
  // Match headings from h2 to h6
  const regex = /^(#{2,6})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    let text = match[2].trim();

    // Remove markdown links [text](url)
    text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    // Remove markdown formatting (bold, italic, code)
    text = text.replace(/[*_~`]/g, '');

    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}
