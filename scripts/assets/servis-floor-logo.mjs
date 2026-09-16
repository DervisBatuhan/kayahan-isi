// Bake a faded, ground-plane Kayahan logo onto the fleet photo crop.
import sharp from "sharp";

const SRC = "/Users/dervisbatuhancorekci/Downloads/WhatsApp Image 2026-09-17 at 02.02.52.jpeg";
const OUT = "public/assets/servis-filo.webp";
const CROP = { left: 0, top: 280, width: 1672, height: 661 };

// Tunables (image coords inside the crop)
const LOGO_W = Number(process.env.W ?? 520);
const LOGO_H = Number(process.env.H ?? 105);
const TOP_SCALE = Number(process.env.TS ?? 0.8); // top edge width / bottom edge width (perspective)
const CX = Number(process.env.CX ?? 880);
const CY = Number(process.env.CY ?? 488);
const ALPHA = Number(process.env.A ?? 0.42);
const BLUR = Number(process.env.B ?? 0.7);

// 1) flat logo, resized to the bottom-edge width
const flat = await sharp("public/assets/kayahan-logo-exact.png")
  .resize({ width: LOGO_W, height: LOGO_H, fit: "fill" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: sw, height: sh } = flat.info;
const src = flat.data;

// 2) scanline perspective: each output row samples the source row at a narrower width toward the top
const out = Buffer.alloc(sw * sh * 4, 0);
for (let y = 0; y < sh; y++) {
  const t = y / (sh - 1);                          // 0 top .. 1 bottom
  const rowScale = TOP_SCALE + (1 - TOP_SCALE) * t; // width factor for this row
  const rowW = sw * rowScale;
  const x0 = (sw - rowW) / 2;
  for (let x = 0; x < sw; x++) {
    const u = (x - x0) / rowScale;                  // source x
    if (u < 0 || u >= sw - 1) continue;
    const ux = Math.floor(u), fx = u - ux;
    const i0 = (y * sw + ux) * 4, i1 = i0 + 4, o = (y * sw + x) * 4;
    for (let c = 0; c < 4; c++) out[o + c] = src[i0 + c] * (1 - fx) + src[i1 + c] * fx;
    out[o + 3] = out[o + 3] * ALPHA;
  }
}
const logo = await sharp(out, { raw: { width: sw, height: sh, channels: 4 } })
  .blur(BLUR)
  .png()
  .toBuffer();

// 3) composite so concrete texture shows through the paint
const info = await sharp(SRC)
  .extract(CROP)
  .composite([{ input: logo, left: Math.round(CX - sw / 2), top: Math.round(CY - sh / 2), blend: process.env.BL ?? "over" }])
  .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })
  .webp({ quality: 92, smartSubsample: true })
  .toFile(OUT);
console.log(info.width, info.height, info.size);
