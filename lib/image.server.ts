import fs from 'node:fs';
import path from 'node:path';

export function getResponsiveImageProps(
  src: string | undefined,
  width: number | undefined,
) {
  let srcSet: string | undefined = undefined;

  if (src) {
    const cleanSrc = src.split('?')[0];
    const publicDir = path.join(process.cwd(), 'public');
    const basePath = cleanSrc.replace('.webp', '');
    const srcSetArr: string[] = [];

    if (fs.existsSync(path.join(publicDir, `${basePath}-400w.webp`))) {
      srcSetArr.push(`${basePath}-400w.webp 400w`);
    }

    if (fs.existsSync(path.join(publicDir, `${basePath}.webp`))) {
      srcSetArr.push(`${basePath}.webp ${width || 800}w`);
    }

    if (fs.existsSync(path.join(publicDir, `${basePath}-1600w.webp`))) {
      srcSetArr.push(`${basePath}-1600w.webp 1600w`);
    }

    if (srcSetArr.length > 0) {
      srcSet = srcSetArr.join(', ');
    }
  }

  return srcSet;
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