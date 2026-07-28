/**
 * Copies the latin subsets of the webfonts from node_modules into public/fonts.
 *
 * The fonts are committed to the repository (so the site builds without the
 * @fontsource packages), but the packages stay in devDependencies as the source
 * of truth. Run this after upgrading them.
 *
 * Only the `latin` subset is copied — Portuguese is fully covered by it, and
 * shipping cyrillic/greek/vietnamese would roughly triple the payload.
 *
 * Usage: pnpm fonts:sync
 */

import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public/fonts');

const FONTS = [
  {
    from: 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
    to: 'geist-latin-variable.woff2',
  },
  {
    from: 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
    to: 'geist-mono-latin-variable.woff2',
  },
  {
    from: 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
    to: 'instrument-serif-latin-italic.woff2',
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const font of FONTS) {
  await copyFile(join(ROOT, font.from), join(OUT_DIR, font.to));
  console.log(`✓ ${font.to}`);
}

console.log(`\n${FONTS.length} fontes sincronizadas em public/fonts/`);
