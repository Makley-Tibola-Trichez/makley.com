/**
 * Generates the abstract cover art used by the project cards and detail pages.
 *
 * Why generated instead of screenshots:
 *  - Three of the products are closed-source/NDA work owned by an employer, so
 *    republishing their UI is not ours to do.
 *  - A single generated system keeps all seven covers visually coherent, which
 *    reads far more deliberate than a mix of screenshots at different crops.
 *  - Deterministic output: re-running the script reproduces byte-identical art.
 *
 * Replace any of these with a real screenshot or mockup at the same 1200×750
 * ratio and the layout will not shift (see CONTEUDO-PENDENTE.md).
 *
 * Usage: npm run covers
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src/assets/projects');

const W = 1200;
const H = 750;

const PALETTE = {
  base: '#0a0b0d',
  surface: '#141719',
  ember: '#ff6a3d',
  emberSoft: '#ff8a63',
  violet: '#8b5cf6',
  rose: '#f43f5e',
  amber: '#fbbf24',
  mint: '#3ddc97',
  line: 'rgba(255,255,255,0.07)',
  faint: 'rgba(255,255,255,0.14)',
};

/** Shared scaffolding: base fill, aurora glows, blueprint grid, vignette. */
function frame(motif, { glowA = PALETTE.ember, glowB = PALETTE.violet } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glowA" cx="22%" cy="18%" r="62%">
      <stop offset="0%" stop-color="${glowA}" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="${glowA}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${glowA}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="84%" cy="86%" r="58%">
      <stop offset="0%" stop-color="${glowB}" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="${glowB}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${glowB}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="45%" r="78%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="${PALETTE.line}" stroke-width="1"/>
    </pattern>
    <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${PALETTE.base}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>

  ${motif}

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;
}

/* -------------------------------------------------------------------------- */
/* Motifs — one visual idea per project, no text (titles live in the UI).      */
/* -------------------------------------------------------------------------- */

/** AgroNota — stacked documents flowing into an automated ledger. */
const agronota = () => {
  const rows = Array.from({ length: 7 }, (_, i) => {
    const y = 250 + i * 46;
    const w = [420, 360, 300, 390, 280, 340, 240][i];
    const done = i < 6; // six of seven auto-classified: the "95%" idea
    return `<rect x="640" y="${y}" width="${w}" height="14" rx="7" fill="${
      done ? PALETTE.ember : PALETTE.faint
    }" opacity="${done ? 0.16 + i * 0.06 : 0.12}"/>
    <circle cx="614" cy="${y + 7}" r="7" fill="none" stroke="${
      done ? PALETTE.ember : PALETTE.faint
    }" stroke-width="2" opacity="0.75"/>
    ${done ? `<path d="M610 ${y + 7} l3 4 6 -8" fill="none" stroke="${PALETTE.ember}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
  }).join('\n    ');

  const sheets = Array.from({ length: 4 }, (_, i) => {
    const x = 120 + i * 22;
    const y = 232 + i * 18;
    return `<rect x="${x}" y="${y}" width="300" height="330" rx="18" fill="${PALETTE.surface}" stroke="${PALETTE.faint}" stroke-width="1.5" opacity="${0.35 + i * 0.2}"/>`;
  }).join('\n    ');

  return `<g>
    ${sheets}
    <g opacity="0.9">
      <rect x="212" y="300" width="150" height="10" rx="5" fill="${PALETTE.ember}" opacity="0.85"/>
      <rect x="212" y="330" width="196" height="8" rx="4" fill="#ffffff" opacity="0.14"/>
      <rect x="212" y="352" width="164" height="8" rx="4" fill="#ffffff" opacity="0.10"/>
      <rect x="212" y="374" width="180" height="8" rx="4" fill="#ffffff" opacity="0.10"/>
      <rect x="212" y="424" width="96" height="28" rx="8" fill="${PALETTE.ember}" opacity="0.22"/>
    </g>
    <path d="M470 400 C 530 400, 540 400, 596 400" stroke="${PALETTE.ember}" stroke-width="2" fill="none" opacity="0.55" stroke-dasharray="6 8"/>
    <path d="M590 394 l10 6 -10 6" fill="none" stroke="${PALETTE.ember}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
    ${rows}
  </g>`;
};

/** SimplesCTe — a route resolving into an authorised document, fast. */
const simplescte = () => {
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const x = 150 + i * 90;
    return `<line x1="${x}" y1="596" x2="${x}" y2="${i % 5 === 0 ? 574 : 586}" stroke="${PALETTE.faint}" stroke-width="2"/>`;
  }).join('\n    ');

  return `<g>
    <path d="M120 470 C 300 300, 420 560, 610 380 S 940 220, 1080 300"
      fill="none" stroke="${PALETTE.ember}" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    <path d="M120 470 C 300 300, 420 560, 610 380 S 940 220, 1080 300"
      fill="none" stroke="${PALETTE.emberSoft}" stroke-width="10" opacity="0.10" filter="url(#soften)"/>

    <circle cx="120" cy="470" r="12" fill="${PALETTE.base}" stroke="${PALETTE.ember}" stroke-width="3"/>
    <circle cx="1080" cy="300" r="16" fill="${PALETTE.ember}" opacity="0.9"/>
    <circle cx="1080" cy="300" r="30" fill="none" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.35"/>
    <circle cx="1080" cy="300" r="46" fill="none" stroke="${PALETTE.ember}" stroke-width="1.5" opacity="0.16"/>

    <g transform="translate(430,150)">
      <rect width="270" height="150" rx="16" fill="${PALETTE.surface}" stroke="${PALETTE.faint}" stroke-width="1.5"/>
      <rect width="270" height="150" rx="16" fill="url(#sheen)"/>
      <rect x="24" y="30" width="118" height="10" rx="5" fill="${PALETTE.ember}" opacity="0.8"/>
      <rect x="24" y="58" width="200" height="8" rx="4" fill="#ffffff" opacity="0.13"/>
      <rect x="24" y="80" width="168" height="8" rx="4" fill="#ffffff" opacity="0.10"/>
      <rect x="24" y="108" width="72" height="22" rx="7" fill="${PALETTE.mint}" opacity="0.20"/>
      <circle cx="36" cy="119" r="4" fill="${PALETTE.mint}" opacity="0.9"/>
    </g>

    <line x1="120" y1="596" x2="1080" y2="596" stroke="${PALETTE.faint}" stroke-width="2"/>
    ${ticks}
    <rect x="120" y="588" width="176" height="16" rx="8" fill="${PALETTE.ember}" opacity="0.55"/>
  </g>`;
};

/** Design systems — one primitive, many composed instances. */
const designSystems = () => {
  const cells = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const x = 470 + col * 108;
      const y = 190 + row * 108;
      const kind = (row * 6 + col) % 4;
      const accent = row === 1 && col === 2;
      const stroke = accent ? PALETTE.ember : PALETTE.faint;
      const op = accent ? 0.95 : 0.34 + ((row + col) % 3) * 0.12;

      let inner = '';
      if (kind === 0) inner = `<rect x="${x + 22}" y="${y + 32}" width="44" height="20" rx="10" fill="${stroke}" opacity="${op}"/>`;
      else if (kind === 1) inner = `<circle cx="${x + 44}" cy="${y + 42}" r="16" fill="none" stroke="${stroke}" stroke-width="3" opacity="${op}"/>`;
      else if (kind === 2)
        inner = `<rect x="${x + 20}" y="${y + 30}" width="48" height="7" rx="3.5" fill="${stroke}" opacity="${op}"/>
        <rect x="${x + 20}" y="${y + 45}" width="32" height="7" rx="3.5" fill="${stroke}" opacity="${op * 0.7}"/>`;
      else inner = `<rect x="${x + 26}" y="${y + 24}" width="36" height="36" rx="8" fill="none" stroke="${stroke}" stroke-width="3" opacity="${op}"/>`;

      cells.push(
        `<rect x="${x}" y="${y}" width="88" height="88" rx="16" fill="${PALETTE.surface}" stroke="${
          accent ? PALETTE.ember : PALETTE.line
        }" stroke-width="${accent ? 2 : 1}" opacity="${accent ? 1 : 0.55}"/>${inner}`,
      );
    }
  }

  return `<g>
    <g transform="translate(140,262)">
      <rect width="210" height="210" rx="28" fill="${PALETTE.surface}" stroke="${PALETTE.ember}" stroke-width="2"/>
      <rect width="210" height="210" rx="28" fill="url(#sheen)"/>
      <rect x="52" y="86" width="106" height="38" rx="19" fill="${PALETTE.ember}" opacity="0.85"/>
      <circle cx="105" cy="105" r="86" fill="none" stroke="${PALETTE.ember}" stroke-width="1.5" opacity="0.18"/>
    </g>
    <path d="M370 367 H 450" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.5" stroke-dasharray="6 8"/>
    ${cells.join('\n    ')}
  </g>`;
};

/** Migration — a server-bound stack collapsing into a static bundle. */
const migration = () => {
  const before = Array.from({ length: 4 }, (_, i) => {
    const y = 250 + i * 78;
    return `<rect x="130" y="${y}" width="300" height="60" rx="12" fill="${PALETTE.surface}" stroke="${PALETTE.faint}" stroke-width="1.5" opacity="0.7"/>
    <rect x="152" y="${y + 26}" width="${170 - i * 26}" height="9" rx="4.5" fill="#ffffff" opacity="0.16"/>
    <circle cx="${406}" cy="${y + 30}" r="6" fill="${PALETTE.rose}" opacity="${0.75 - i * 0.12}"/>`;
  }).join('\n    ');

  return `<g>
    ${before}
    <g opacity="0.9">
      <path d="M480 375 H 690" stroke="${PALETTE.ember}" stroke-width="3" opacity="0.6"/>
      <path d="M676 361 l18 14 -18 14" fill="none" stroke="${PALETTE.ember}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="585" cy="375" r="34" fill="${PALETTE.base}" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.9"/>
      <path d="M573 375 h24 M589 367 l8 8 -8 8" fill="none" stroke="${PALETTE.ember}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <g transform="translate(740,296)">
      <rect width="330" height="158" rx="20" fill="${PALETTE.surface}" stroke="${PALETTE.mint}" stroke-width="2" opacity="0.95"/>
      <rect width="330" height="158" rx="20" fill="url(#sheen)"/>
      <rect x="28" y="40" width="150" height="12" rx="6" fill="${PALETTE.mint}" opacity="0.75"/>
      <rect x="28" y="70" width="240" height="8" rx="4" fill="#ffffff" opacity="0.13"/>
      <rect x="28" y="92" width="196" height="8" rx="4" fill="#ffffff" opacity="0.10"/>
      <circle cx="292" cy="46" r="7" fill="${PALETTE.mint}" opacity="0.9"/>
    </g>
    <g opacity="0.55">
      <rect x="740" y="486" width="330" height="4" rx="2" fill="${PALETTE.faint}"/>
      <rect x="740" y="486" width="66" height="4" rx="2" fill="${PALETTE.mint}"/>
    </g>
  </g>`;
};

/** School platform — a cohort's trajectory, with one at-risk trend flagged. */
const school = () => {
  const bars = [0.42, 0.55, 0.5, 0.68, 0.74, 0.66, 0.82, 0.9];
  const barEls = bars
    .map((v, i) => {
      const h = Math.round(v * 300);
      const x = 690 + i * 52;
      const y = 560 - h;
      return `<rect x="${x}" y="${y}" width="30" height="${h}" rx="8" fill="${PALETTE.ember}" opacity="${0.22 + v * 0.5}"/>`;
    })
    .join('\n    ');

  return `<g>
    <g transform="translate(120,210)">
      <rect width="470" height="340" rx="22" fill="${PALETTE.surface}" stroke="${PALETTE.faint}" stroke-width="1.5"/>
      <rect width="470" height="340" rx="22" fill="url(#sheen)"/>
      <polyline points="46,250 116,214 186,232 256,166 326,182 396,104"
        fill="none" stroke="${PALETTE.mint}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <polyline points="46,268 116,262 186,278 256,286 326,302 396,286"
        fill="none" stroke="${PALETTE.rose}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 10" opacity="0.85"/>
      <circle cx="396" cy="104" r="7" fill="${PALETTE.mint}"/>
      <circle cx="396" cy="286" r="7" fill="${PALETTE.rose}"/>
      <rect x="46" y="46" width="132" height="11" rx="5.5" fill="${PALETTE.ember}" opacity="0.8"/>
      <rect x="46" y="72" width="88" height="8" rx="4" fill="#ffffff" opacity="0.12"/>
      <line x1="46" y1="318" x2="424" y2="318" stroke="${PALETTE.faint}" stroke-width="1.5"/>
    </g>
    ${barEls}
    <line x1="672" y1="562" x2="1090" y2="562" stroke="${PALETTE.faint}" stroke-width="2"/>
  </g>`;
};

/** LLM research — a model graph folded into the device itself. */
const llm = () => {
  const layers = [4, 6, 6, 3];
  const nodes = [];
  const edges = [];
  const cols = layers.map((count, li) => {
    const x = 700 + li * 118;
    return Array.from({ length: count }, (_, ni) => ({
      x,
      y: 375 - ((count - 1) * 56) / 2 + ni * 56,
    }));
  });

  cols.forEach((col, li) => {
    col.forEach((node) => {
      nodes.push(
        `<circle cx="${node.x}" cy="${node.y}" r="7" fill="${
          li === cols.length - 1 ? PALETTE.ember : '#ffffff'
        }" opacity="${li === cols.length - 1 ? 0.9 : 0.35}"/>`,
      );
      const next = cols[li + 1];
      if (next) {
        next.forEach((target) => {
          edges.push(
            `<line x1="${node.x}" y1="${node.y}" x2="${target.x}" y2="${target.y}" stroke="${PALETTE.ember}" stroke-width="1" opacity="0.10"/>`,
          );
        });
      }
    });
  });

  return `<g>
    <g transform="translate(190,168)">
      <rect width="300" height="414" rx="40" fill="${PALETTE.surface}" stroke="${PALETTE.ember}" stroke-width="2"/>
      <rect width="300" height="414" rx="40" fill="url(#sheen)"/>
      <rect x="112" y="20" width="76" height="10" rx="5" fill="#000" opacity="0.5"/>
      <circle cx="150" cy="214" r="66" fill="none" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.5"/>
      <circle cx="150" cy="214" r="46" fill="none" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.32"/>
      <circle cx="150" cy="214" r="24" fill="${PALETTE.ember}" opacity="0.75"/>
      <rect x="56" y="322" width="188" height="9" rx="4.5" fill="#ffffff" opacity="0.14"/>
      <rect x="56" y="344" width="140" height="9" rx="4.5" fill="#ffffff" opacity="0.10"/>
    </g>
    <path d="M520 375 H 660" stroke="${PALETTE.ember}" stroke-width="2" opacity="0.45" stroke-dasharray="6 8"/>
    ${edges.join('\n    ')}
    ${nodes.join('\n    ')}
  </g>`;
};

/** Portfolio — dependencies pointing inward through four layers. */
const portfolio = () => {
  const layers = [
    { w: 720, label: PALETTE.faint, op: 0.28 },
    { w: 570, label: PALETTE.faint, op: 0.4 },
    { w: 420, label: PALETTE.emberSoft, op: 0.55 },
    { w: 270, label: PALETTE.ember, op: 0.95 },
  ];

  const rects = layers
    .map((l, i) => {
      const h = 300 - i * 62;
      const x = (W - l.w) / 2;
      const y = (H - h) / 2;
      return `<rect x="${x}" y="${y}" width="${l.w}" height="${h}" rx="${22 - i * 3}" fill="${
        i === 3 ? PALETTE.ember : PALETTE.surface
      }" fill-opacity="${i === 3 ? 0.16 : 0.55}" stroke="${l.label}" stroke-width="${
        i === 3 ? 2 : 1.5
      }" stroke-opacity="${l.op}"/>`;
    })
    .join('\n    ');

  const arrows = [
    'M180 375 h64', 'M1020 375 h-64', 'M600 178 v58', 'M600 572 v-58',
  ]
    .map(
      (d) =>
        `<path d="${d}" stroke="${PALETTE.ember}" stroke-width="2.5" opacity="0.6" stroke-linecap="round" marker-end="url(#tip)"/>`,
    )
    .join('\n    ');

  return `<g>
    <defs>
      <marker id="tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="${PALETTE.ember}" opacity="0.8"/>
      </marker>
    </defs>
    ${rects}
    ${arrows}
    <circle cx="600" cy="375" r="26" fill="${PALETTE.ember}" opacity="0.9"/>
    <circle cx="600" cy="375" r="26" fill="url(#sheen)"/>
  </g>`;
};

/* -------------------------------------------------------------------------- */

const COVERS = [
  { name: 'agronota', motif: agronota, glowB: PALETTE.amber },
  { name: 'simplescte', motif: simplescte, glowB: PALETTE.violet },
  { name: 'design-systems', motif: designSystems, glowB: PALETTE.rose },
  { name: 'migracao-next-vite', motif: migration, glowB: PALETTE.mint },
  { name: 'gestao-escolar', motif: school, glowB: PALETTE.violet },
  { name: 'llm-em-dispositivos-moveis', motif: llm, glowB: PALETTE.violet },
  { name: 'portfolio', motif: portfolio, glowB: PALETTE.rose },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { name, motif, glowB } of COVERS) {
  const svg = frame(motif(), { glowB });
  const png = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  await writeFile(join(OUT_DIR, `${name}.png`), png);
  console.log(`✓ ${name}.png  ${(png.length / 1024).toFixed(0)} kB`);
}

console.log(`\n${COVERS.length} capas geradas em src/assets/projects/`);
