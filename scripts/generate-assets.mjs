/**
 * Generates raster brand assets from SVG sources using sharp:
 *   - apple-touch-icon.png (180), icon-192.png, icon-512.png  (from favicon.svg)
 *   - og/default.png (1200x630 social card)
 *
 * Run with: node scripts/generate-assets.mjs
 * Re-runnable and deterministic.
 */
import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = resolve(root, "public");

const NAME = "Mohammed Mishhub";
const ROLE = "Senior Full Stack Software Engineer";
const DOMAINS = "Distributed Systems · FinTech · Authentication";

async function makeIcons() {
  const svg = await readFile(resolve(pub, "favicon.svg"));
  const sizes = [
    [180, "apple-touch-icon.png"],
    [192, "icon-192.png"],
    [512, "icon-512.png"],
  ];
  for (const [size, name] of sizes) {
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: "contain", background: { r: 11, g: 11, b: 13, alpha: 1 } })
      .png()
      .toFile(resolve(pub, name));
    console.log("✓ " + name);
  }
}

function ogSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mono" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b5bdb"/>
      <stop offset="1" stop-color="#5c7cfa"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.2" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#3b5bdb" stop-opacity="0.22"/>
      <stop offset="0.6" stop-color="#3b5bdb" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#0b0b0d"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#mono)"/>

  <g transform="translate(80, 96)">
    <rect width="84" height="84" rx="18" fill="#101013" stroke="url(#mono)" stroke-opacity="0.7" stroke-width="2"/>
    <text x="42" y="42" dominant-baseline="central" text-anchor="middle"
      font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="700"
      letter-spacing="-1" fill="#fafafa">MM</text>
  </g>

  <text x="80" y="320" font-family="Helvetica, Arial, sans-serif" font-size="78" font-weight="700"
    letter-spacing="-2" fill="#fafafa">${NAME}</text>
  <text x="80" y="384" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="500"
    fill="#a1a1aa">${ROLE}</text>

  <rect x="80" y="470" width="64" height="4" rx="2" fill="url(#mono)"/>
  <text x="80" y="524" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="500"
    fill="#71717a">${DOMAINS}</text>
</svg>`;
}

async function makeOg() {
  await mkdir(resolve(pub, "og"), { recursive: true });
  const svg = Buffer.from(ogSvg());
  // Render then normalise to exactly 1200x630 so the og:image:width/height meta
  // declared in BaseHead is accurate.
  await sharp(svg, { density: 144 }).resize(1200, 630).png().toFile(resolve(pub, "og/default.png"));
  console.log("✓ og/default.png (1200x630)");
}

await makeIcons();
await makeOg();
console.log("Done.");
