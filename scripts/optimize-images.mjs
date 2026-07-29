// Pre-build image pipeline (S5 — LCP/CLS). Converts every src/assets/*.png over
// SIZE_THRESHOLD to a same-name .webp (max dimension capped, quality 82 — visually
// lossless for product photography, dramatically smaller than the raw exported PNGs
// which run up to 8.8MB). Run before `vite build` (see package.json's `build` script).
// Idempotent: skips a source file if its .webp is already newer.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve(process.cwd(), 'src/assets');
const SIZE_THRESHOLD = 200 * 1024; // 200KB
const MAX_DIMENSION = 1600; // px, longest side — these are hero/product photos, never displayed larger

async function main() {
  const files = await readdir(ASSETS_DIR);
  const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));

  for (const file of pngs) {
    const srcPath = path.join(ASSETS_DIR, file);
    const srcStat = await stat(srcPath);
    if (srcStat.size < SIZE_THRESHOLD) continue;

    const outPath = srcPath.replace(/\.png$/i, '.webp');
    try {
      const outStat = await stat(outPath);
      if (outStat.mtimeMs >= srcStat.mtimeMs) continue; // already up to date
    } catch {
      // .webp doesn't exist yet — fall through and generate it
    }

    await sharp(srcPath)
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);

    const outStat = await stat(outPath);
    console.log(`optimized ${file} -> ${path.basename(outPath)} (${(srcStat.size / 1024 / 1024).toFixed(1)}MB -> ${(outStat.size / 1024).toFixed(0)}KB)`);
  }
}

main().catch((err) => {
  console.error('image optimization failed:', err);
  process.exit(1);
});
