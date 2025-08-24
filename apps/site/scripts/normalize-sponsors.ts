// scripts/normalize-sponsors.ts
// Usage: pnpm tsx scripts/normalize-sponsors.ts
// Requires: Node 18+, sharp, fast-glob, and `pdftoppm` on PATH for PDFs.

import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fg from 'fast-glob';
import sharp from 'sharp';

const pexec = promisify(execFile);

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'public/img/sponsors');
const TMP_OUT = path.join(ROOT, '.tmp_sponsors_out'); // processed output goes here

const TARGET_HEIGHT = 300; // px (keeps aspect ratio)
const OUTPUT_EXT = '.png';

const ALLOWED_IN = new Set<string>([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.svg',
  '.pdf',
]);

function slugify(basename: string): string {
  return (
    basename
      .replace(/\.[^.]+$/, '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’"`]+/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'logo'
  );
}

async function hasPdftoppm(): Promise<boolean> {
  try {
    await pexec('pdftoppm', ['-v']);
    return true;
  } catch {
    return false;
  }
}

async function convertPdfToPng(
  pdfPath: string,
  outPathNoExt: string
): Promise<string> {
  // Render first page; increase scale for quality if needed
  const args = [
    '-singlefile',
    '-png',
    '-scale-to',
    '2000',
    pdfPath,
    outPathNoExt,
  ];
  await pexec('pdftoppm', args);
  return `${outPathNoExt}.png`;
}

async function rasterizeSvgToPng(svgPath: string, outPath: string) {
  await sharp(svgPath)
    .resize({ height: TARGET_HEIGHT, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

async function normalizeRasterToPng(inputPath: string, outPath: string) {
  // To force white background, add: .flatten({ background: "#ffffff" })
  await sharp(inputPath)
    .resize({ height: TARGET_HEIGHT, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function cleanDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function uniquePath(
  baseDir: string,
  baseName: string,
  ext: string
): Promise<string> {
  let name = `${baseName}${ext}`;
  let i = 2;
  while (fssync.existsSync(path.join(baseDir, name))) {
    name = `${baseName}-${i}${ext}`;
    i++;
  }
  return path.join(baseDir, name);
}

async function main() {
  const stat = await fs.stat(SRC_DIR).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    console.error(`Directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  const pdfOk = await hasPdftoppm();
  if (!pdfOk) {
    console.warn('[warn] `pdftoppm` not found. PDFs will be skipped.');
  }

  // 1) Collect current files from public/img/sponsors
  const entries = await fg(['*'], {
    cwd: SRC_DIR,
    onlyFiles: true,
    dot: false,
  });
  if (entries.length === 0) {
    console.warn('[warn] No files to process.');
    return;
  }

  // 2) Process into temp output dir
  await cleanDir(TMP_OUT);

  console.log('Processing…');
  for (const rel of entries) {
    const abs = path.join(SRC_DIR, rel);
    const ext = path.extname(rel).toLowerCase();
    if (!ALLOWED_IN.has(ext)) {
      console.log(`- skip (ext): ${rel}`);
      continue;
    }

    const slug = slugify(path.basename(rel));
    const outPath = await uniquePath(TMP_OUT, slug, OUTPUT_EXT);

    try {
      if (ext === '.pdf') {
        if (!pdfOk) {
          console.log(`- skip PDF (no pdftoppm): ${rel}`);
          continue;
        }
        const tmpBase = path.join(TMP_OUT, `${slug}__pdf_tmp`);
        const rendered = await convertPdfToPng(abs, tmpBase);
        await normalizeRasterToPng(rendered, outPath);
        // remove intermediate rendered file
        if (rendered && fssync.existsSync(rendered)) await fs.unlink(rendered);
      } else if (ext === '.svg') {
        await rasterizeSvgToPng(abs, outPath);
      } else {
        await normalizeRasterToPng(abs, outPath);
      }

      console.log(`✔ ${rel} → ${path.basename(outPath)}`);
    } catch (err: any) {
      console.error(`✖ error on ${rel}:`, err?.message || err);
    }
  }

  // 3) Clean the public sponsors folder
  console.log('Cleaning public/img/sponsors …');
  await cleanDir(SRC_DIR);

  // 4) Copy processed files back into public/img/sponsors
  console.log('Copying processed files back …');
  await fs.cp(TMP_OUT, SRC_DIR, { recursive: true });

  // 5) Delete temp folder
  await fs.rm(TMP_OUT, { recursive: true, force: true });

  console.log('Done. Normalized images are now in public/img/sponsors.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
