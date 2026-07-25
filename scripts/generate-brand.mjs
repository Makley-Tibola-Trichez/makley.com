/**
 * Generates the brand assets that cannot be authored as plain files:
 *  - `public/og/default.png`      1200×630 social preview card
 *  - `public/apple-touch-icon.png` 180×180 iOS home-screen icon
 *  - `public/icon-512.png`        512×512 PWA/manifest icon
 *
 * `public/favicon.svg` is hand-authored (vector, theme-aware) and is not
 * produced here.
 *
 * Usage: npm run brand
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'public');

const NAME = 'Makley Trichez';
const ROLE = 'Software Engineer';
const TAGLINE = 'React · TypeScript · Design Systems · Performance';
const DOMAIN = 'makley.com';

const EMBER = '#ff6a3d';
const VIOLET = '#8b5cf6';
const BASE = '#08090a';

/**
 * System font stack. The SVG is rasterised at build time by librsvg, which does
 * not see the site's self-hosted webfonts — so we ask for fonts that exist on
 * the build machine rather than shipping a broken render.
 */
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Cascadia Mono', 'Consolas', 'Courier New', monospace";

/* -------------------------------------------------------------- OG card -- */

const ogCard = () => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="16%" cy="8%" r="70%">
      <stop offset="0%" stop-color="${EMBER}" stop-opacity="0.40"/>
      <stop offset="52%" stop-color="${EMBER}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${EMBER}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="92%" cy="98%" r="60%">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${EMBER}"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${BASE}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- monogram -->
  <g transform="translate(80,72)">
    <rect width="60" height="60" rx="14" fill="#141719" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
    <text x="30" y="41" font-family="${MONO}" font-size="28" font-weight="600"
      fill="${EMBER}" text-anchor="middle">M</text>
  </g>

  <text x="160" y="100" font-family="${MONO}" font-size="17" letter-spacing="3.4"
    fill="rgba(255,255,255,0.52)">${DOMAIN.toUpperCase()}</text>
  <text x="160" y="126" font-family="${FONT}" font-size="17"
    fill="rgba(255,255,255,0.34)">${ROLE}</text>

  <rect x="80" y="196" width="420" height="2" fill="url(#rule)"/>

  <text x="80" y="300" font-family="${FONT}" font-size="82" font-weight="700"
    letter-spacing="-3" fill="#f2f3f5">${NAME}</text>

  <text x="80" y="374" font-family="${FONT}" font-size="35" font-weight="400"
    letter-spacing="-0.8" fill="rgba(255,255,255,0.62)">Construo produtos digitais que escalam</text>

  <text x="80" y="424" font-family="${FONT}" font-size="35" font-weight="400"
    letter-spacing="-0.8" fill="rgba(255,255,255,0.62)">para milhares de pessoas.</text>

  <text x="80" y="516" font-family="${MONO}" font-size="19" letter-spacing="0.6"
    fill="rgba(255,255,255,0.42)">${TAGLINE}</text>

  <!-- metrics strip -->
  <g transform="translate(80,556)">
    <rect width="1040" height="1" fill="rgba(255,255,255,0.09)"/>
    <text x="0" y="42" font-family="${FONT}" font-size="24" font-weight="600" fill="${EMBER}">5+ anos</text>
    <text x="150" y="42" font-family="${FONT}" font-size="24" font-weight="600" fill="${EMBER}">22 mil+ clientes</text>
    <text x="410" y="42" font-family="${FONT}" font-size="24" font-weight="600" fill="${EMBER}">2 design systems</text>
    <text x="700" y="42" font-family="${FONT}" font-size="24" font-weight="600" fill="${EMBER}">−84% deploy</text>
  </g>
</svg>`;

/* ------------------------------------------------------------ app icon -- */

const appIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#17191c"/>
      <stop offset="100%" stop-color="#08090a"/>
    </linearGradient>
    <radialGradient id="halo" cx="30%" cy="22%" r="70%">
      <stop offset="0%" stop-color="${EMBER}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${EMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect width="512" height="512" rx="112" fill="url(#halo)"/>
  <rect x="2" y="2" width="508" height="508" rx="110" fill="none"
    stroke="rgba(255,255,255,0.12)" stroke-width="4"/>

  <!-- Stylised M drawn as strokes so it renders identically without a webfont -->
  <path d="M150 350 V 172 L 256 288 L 362 172 V 350"
    fill="none" stroke="${EMBER}" stroke-width="34"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ------------------------------------------------------------------------ */

await mkdir(join(PUBLIC_DIR, 'og'), { recursive: true });

const og = await sharp(Buffer.from(ogCard())).png({ compressionLevel: 9 }).toBuffer();
await writeFile(join(PUBLIC_DIR, 'og/default.png'), og);
console.log(`✓ og/default.png            ${(og.length / 1024).toFixed(0)} kB`);

for (const [size, filename] of [
  [180, 'apple-touch-icon.png'],
  [512, 'icon-512.png'],
  [192, 'icon-192.png'],
]) {
  const buffer = await sharp(Buffer.from(appIcon(size)))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(join(PUBLIC_DIR, filename), buffer);
  console.log(`✓ ${filename.padEnd(26)} ${(buffer.length / 1024).toFixed(0)} kB`);
}

console.log('\nAtivos de marca gerados em public/');
