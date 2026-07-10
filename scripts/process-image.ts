import path from 'node:path';
import sharp from 'sharp';
import fs from 'node:fs';

async function processImage(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const parsedPath = path.parse(filePath);
  const basePath = path.join(parsedPath.dir, parsedPath.name);

  try {
    // Read the image into a buffer so we can process and potentially overwrite the original
    const buffer = fs.readFileSync(filePath);
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width) {
      console.error('Could not determine image width');
      return;
    }

    const width = metadata.width;

    // 1600w version
    if (width > 1600) {
      await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp()
        .toFile(`${basePath}-1600w.webp`);
      console.log(`Generated ${basePath}-1600w.webp`);
    } else if (width > 800) {
      // If it's not 1600w but larger than 800w, we can still generate a -1600w version
      // which is actually just the original size to serve as the 2x if needed
      await sharp(buffer).webp().toFile(`${basePath}-1600w.webp`);
      console.log(
        `Generated ${basePath}-1600w.webp (Original size: ${width}w)`,
      );
    }

    // 400w version
    if (width > 400) {
      await sharp(buffer)
        .resize({ width: 400, withoutEnlargement: true })
        .webp()
        .toFile(`${basePath}-400w.webp`);
      console.log(`Generated ${basePath}-400w.webp`);
    }

    // Overwrite the original with 800w version
    const info = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp()
      .toFile(filePath); // Overwrite original

    console.log(
      `Generated 800w version (Overwrote original). Final dimensions: w=${info.width}&h=${info.height}`,
    );
  } catch (error) {
    console.error('Error processing image:', error);
    process.exit(1);
  }
}

async function run() {
  const fileArg = process.argv[2];
  if (fileArg) {
    // Process a single file
    await processImage(fileArg);
  } else {
    // If no argument, process all in public/assets
    console.log(
      'No file argument provided. Processing all .webp in public/assets...',
    );
    const publicDir = path.join(process.cwd(), 'public', 'assets');
    const files = fs.readdirSync(publicDir);

    for (const file of files) {
      // Only process .webp files that are not already our generated breakpoints
      if (
        file.endsWith('.webp') &&
        !file.endsWith('-400w.webp') &&
        !file.endsWith('-1600w.webp')
      ) {
        console.log(`\nProcessing ${file}...`);
        await processImage(path.join(publicDir, file));
      }
    }
  }
}

run();
