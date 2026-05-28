/**
 * scripts/convert-images.mjs
 * 指定ディレクトリ（再帰）内の画像を AVIF / WebP に一括変換するスクリプト。
 *
 * 使い方:
 *   node scripts/convert-images.mjs                   # デフォルト: WordPress uploads/
 *   node scripts/convert-images.mjs /path/to/dir      # 任意ディレクトリ（再帰）
 *   node scripts/convert-images.mjs ./public/images   # フロントエンド静的アセット
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, resolve } from 'path';

const DEFAULT_DIR = '/Applications/MAMP/htdocs/wp/wp-content/uploads';
const INPUT_DIR   = process.argv[2] ? resolve(process.argv[2]) : DEFAULT_DIR;
const EXTENSIONS  = new Set(['.jpg', '.jpeg', '.png', '.gif']);

const AVIF_OPTIONS = { quality: 60, effort: 6 };
const WEBP_OPTIONS = { quality: 75 };

let converted = 0;
let skipped   = 0;
let errors    = 0;

async function convert(filePath) {
  const ext  = extname(filePath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return;

  const base = filePath.slice(0, -ext.length);
  const name = filePath.replace(INPUT_DIR + '/', '');

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
    converted++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    errors++;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile()) {
      await convert(fullPath);
    }
  }
}

console.log(`対象ディレクトリ: ${INPUT_DIR}\n`);
await walk(INPUT_DIR);
console.log(`\n完了: 変換 ${converted} 枚 / スキップ ${skipped} 枚 / エラー ${errors} 件`);
