/**
 * Fetches the GitHub profile avatar once and commits it to the repo as a
 * static asset, instead of hotlinking `github.com/<user>.png` from the page.
 *
 * Why fetch-and-commit instead of pointing an <img> straight at GitHub:
 *  - Avoids an external network dependency for every visitor (one more DNS
 *    lookup + TLS handshake to a third-party host on the critical path).
 *  - The image goes through Astro's normal `<Image>` pipeline (AVIF/WebP,
 *    explicit dimensions, responsive `srcset`) exactly like every other image
 *    on the site, instead of being an unoptimised hotlinked PNG.
 *  - "Cached" the same way the résumé PDF is: fetched once, the result lives
 *    in the repo until someone reruns this script (e.g. after updating the
 *    GitHub avatar) — no runtime fetch, no staleness surprise.
 *
 * Usage: pnpm avatar
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PATH = join(ROOT, 'src/assets/avatar.png');

const GITHUB_USERNAME = 'Makley-Tibola-Trichez';

// Use the REST API to get the avatar_url — more reliable than the redirect URL
// and supports a GITHUB_TOKEN env var for higher rate limits (5000 req/h vs 60).
const headers = { 'User-Agent': 'makley-portfolio/fetch-avatar' };
if (process.env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;

const apiResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });

if (!apiResponse.ok) {
  throw new Error(`Falha ao buscar usuário na API do GitHub: HTTP ${apiResponse.status}`);
}

const { avatar_url: AVATAR_URL } = await apiResponse.json();

const response = await fetch(AVATAR_URL, { headers: { 'User-Agent': headers['User-Agent'] } });

if (!response.ok) {
  throw new Error(`Falha ao baixar o avatar do GitHub: HTTP ${response.status}`);
}

const buffer = Buffer.from(await response.arrayBuffer());

await mkdir(dirname(OUT_PATH), { recursive: true });

// Re-encode through sharp so the committed file is a deterministic, optimised
// PNG regardless of whatever GitHub happened to serve.
const optimized = await sharp(buffer).resize(800, 800, { fit: 'cover' }).png({ compressionLevel: 9 }).toBuffer();

await writeFile(OUT_PATH, optimized);

console.log(`✓ avatar.png  ${(optimized.length / 1024).toFixed(0)} kB  (de ${AVATAR_URL})`);
