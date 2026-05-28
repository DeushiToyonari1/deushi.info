/**
 * scripts/convert-images.mjs
 * public/images/ 内の画像を AVIF / WebP に一括変換するスクリプト。
 * 実行: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR  = new URL('../public/images/', import.meta.url).pathname;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif']);

const AVIF_OPTIONS = { quality: 60, effort: 6 };
const WEBP_OPTIONS = { quality: 75 };

async function convert(filePath) {
  const ext  = extname(filePath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return;

  const base = filePath.slice(0, -ext.length);
  const name = basename(filePath);

  try {
    const src = sharp(filePath);

    await src.clone().avif(AVIF_OPTIONS).toFile(`${base}.avif`);
    await src.clone().webp(WEBP_OPTIONS).toFile(`${base}.webp`);

    const { size: orig } = await stat(filePath);
    const { size: avif } = await stat(`${base}.avif`);
    const { size: webp } = await stat(`${base}.webp`);

    console.log(`✓ ${name}`);
    console.log(`    original: ${(orig / 1024).toFixed(1)} KB`);
    console.log(`    avif    : ${(avif / 1024).toFixed(1)} KB  (${Math.round(avif / orig * 100)}%)`);
    console.log(`    webp    : ${(webp / 1024).toFixed(1)} KB  (${Math.round(webp / orig * 100)}%)`);
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
  }
}

const files = await readdir(INPUT_DIR);
for (const file of files.sort()) {
  await convert(join(INPUT_DIR, file));
}
console.log('\n完了: public/images/ の AVIF/WebP 生成が完了しました。');
