// Adds "Baymak · E.C.A. — VIP KURUMSAL SERVİS" badges to the van doors in the
// fleet photo (public/assets/servis-filo.webp). Run from the project root:
//   node scripts/assets/servis-door-badges.mjs
// Source stays untouched (Downloads JPEG); plates are re-blurred here too.
import sharp from "sharp";

const SRC = "/Users/dervisbatuhancorekci/Downloads/WhatsApp Image 2026-09-17 at 02.17.05.jpeg";
const OUT = "public/assets/servis-filo.webp";
const CROP = { left: 0, top: 178, width: 1983, height: 615 };

// Licence plates (crop coordinates) — blurred, see earlier pass.
const PLATES = [
  { left: 512, top: 426, width: 128, height: 40 },
  { left: 684, top: 257, width: 94, height: 30 },
  { left: 1062, top: 292, width: 96, height: 32 },
  { left: 1676, top: 386, width: 114, height: 42 },
];

// Door block: replaces the old "Yetkili Çözüm Ortağı / DemirDöküm" badge with
// the same idea extended — wording on top, three partner marks underneath.
// Built large, then scaled + sheared per door so it follows the panel's angle.
async function buildBadge() {
  const W = 900;
  const H = 175;
  const logoH = 64;
  const dd = await sharp("public/brands/demirdokum.png").resize({ height: logoH }).png().toBuffer();
  const baymak = await sharp("public/brands/baymak.svg").resize({ height: logoH }).png().toBuffer();
  // eca.svg is the combined "E.C.A. | SEREL — yıllarca beraber" lock-up; keep only the E.C.A. mark.
  const ecaFull = await sharp("public/brands/eca.svg").resize({ width: 1600 }).png().toBuffer();
  const em0 = await sharp(ecaFull).metadata();
  const eca = await sharp(ecaFull)
    .extract({ left: 0, top: 0, width: Math.round(em0.width * 0.49), height: Math.round(em0.height * 0.76) })
    .resize({ height: logoH })
    .png()
    .toBuffer();
  const ws = await Promise.all([dd, baymak, eca].map((b) => sharp(b).metadata().then((m) => m.width)));
  const gap = 40;
  const rowW = ws[0] + ws[1] + ws[2] + gap * 2;
  let x = Math.round((W - rowW) / 2);
  const text = Buffer.from(
    `<svg width="${W}" height="80" xmlns="http://www.w3.org/2000/svg">
       <text x="${W / 2}" y="60" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
             font-weight="800" font-size="58" letter-spacing="7" fill="#0a3c86">VIP KURUMSAL SERVİS</text>
     </svg>`,
  );
  const comps = [{ input: text, left: 0, top: 0 }];
  for (const [i, b] of [dd, baymak, eca].entries()) {
    comps.push({ input: b, left: x, top: 100 });
    x += ws[i] + gap;
  }
  return sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(comps)
    .png()
    .toBuffer();
}

/** Scale the badge to `width`, shear it by `shear` (x per y) and tilt by `rot` degrees. */
async function placed(badge, width, shear, rot) {
  const scaled = await sharp(badge).resize({ width }).png().toBuffer();
  const r = (rot * Math.PI) / 180;
  const a = Math.cos(r), b = -Math.sin(r) + shear, c = Math.sin(r), d = Math.cos(r);
  return sharp(scaled).affine([[a, b], [c, d]], { background: { r: 0, g: 0, b: 0, alpha: 0 }, interpolator: "bicubic" }).png().toBuffer();
}

const badge = await buildBadge();
// Per van (crop coords): the old badge area to wipe, and where/how the new block goes.
const DOORS = [
  { wipe: { left: 148, top: 312, width: 126, height: 62 }, sample: { left: 284, top: 330, width: 14, height: 20 }, left: 150, top: 318, width: 128, shear: 0.06, rot: -2 },   // far-left van (KPL 721)
  { wipe: { left: 596, top: 184, width: 74, height: 40 }, sample: { left: 674, top: 190, width: 8, height: 24 }, left: 597, top: 186, width: 78, shear: 0.10, rot: -3 },    // second van from left (behind KPL 721)
  { wipe: { left: 928, top: 206, width: 96, height: 46 }, sample: { left: 1028, top: 214, width: 8, height: 30 }, left: 930, top: 208, width: 100, shear: 0.10, rot: -3 },     // centre van (BRT 186)
  { wipe: { left: 1334, top: 226, width: 82, height: 40 }, sample: { left: 1346, top: 215, width: 44, height: 6 }, left: 1336, top: 228, width: 86, shear: 0.10, rot: -3 },   // right-centre van (BRT 402)
];

const patches = [];
for (const p of PLATES) {
  patches.push({ input: await sharp(SRC).extract({ ...p, top: p.top + CROP.top }).blur(9).modulate({ brightness: 1.05 }).png().toBuffer(), left: p.left, top: p.top });
}
for (const d of DOORS) {
  // Wipe the old lettering: paint the area in the door's own colour (sampled
  // from a clean strip right above it) with feathered edges so no patch shows.
  const strip = await sharp(SRC)
    .extract({ ...d.sample, top: d.sample.top + CROP.top })
    .removeAlpha()
    .raw()
    .toBuffer();
  const sum = [0, 0, 0];
  for (let i = 0; i < strip.length; i += 3) { sum[0] += strip[i]; sum[1] += strip[i + 1]; sum[2] += strip[i + 2]; }
  const n = strip.length / 3;
  const [r, g, b] = sum.map((v) => Math.round(v / n));
  console.log("door colour", d.wipe.left, [r, g, b]);
  const M = 14; // feather margin
  const fill = await sharp({ create: { width: d.wipe.width + M * 2, height: d.wipe.height + M * 2, channels: 3, background: { r, g, b } } }).png().toBuffer();
  const mask = await sharp({ create: { width: d.wipe.width + M * 2, height: d.wipe.height + M * 2, channels: 3, background: "#000" } })
    .composite([{ input: await sharp({ create: { width: d.wipe.width, height: d.wipe.height, channels: 3, background: "#fff" } }).png().toBuffer(), left: M, top: M }])
    .blur(6)
    .greyscale()
    .raw()
    .toBuffer();
  const wipe = await sharp(fill).joinChannel(mask, { raw: { width: d.wipe.width + M * 2, height: d.wipe.height + M * 2, channels: 1 } }).png().toBuffer();
  patches.push({ input: wipe, left: d.wipe.left - M, top: d.wipe.top - M });
  const img = await placed(badge, d.width, d.shear, d.rot);
  patches.push({ input: img, left: d.left, top: d.top });
}
const info = await sharp(SRC).extract(CROP).composite(patches).sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 }).webp({ quality: 92, smartSubsample: true }).toFile(OUT);
console.log(info.width, info.height, info.size);
