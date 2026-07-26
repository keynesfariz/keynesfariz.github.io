import path from 'node:path';
import fs from 'node:fs';

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
