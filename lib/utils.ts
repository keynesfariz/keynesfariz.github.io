import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractImageDimensions(src: string | undefined): {
  width: number | undefined;
  height: number | undefined;
} {
  if (!src) return { width: undefined, height: undefined };

  try {
    // A dummy base URL is needed to parse relative URLs using the URL constructor
    const url = new URL(src, 'http://localhost');
    const widthParam = url.searchParams.get('w');
    const heightParam = url.searchParams.get('h');

    const width = widthParam ? parseInt(widthParam, 10) : undefined;
    const height = heightParam ? parseInt(heightParam, 10) : undefined;

    return {
      width: isNaN(width as number) ? undefined : width,
      height: isNaN(height as number) ? undefined : height,
    };
  } catch {
    return { width: undefined, height: undefined };
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word [a-z0-9_], non-space, non-hyphen characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}
