import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3000";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ["home", "/tr"],
  ["hub-kurumsal", "/tr/kurumsal"],
  ["hub-faaliyet", "/tr/faaliyet-alanlari"],
  ["hub-cozumler", "/tr/cozumler"],
  ["corp-hakkimizda", "/tr/kurumsal/hakkimizda"],
  ["corp-misyon", "/tr/kurumsal/misyon-vizyon"],
  ["corp-kalite", "/tr/kurumsal/kalite-politikasi"],
  ["exp-yonetim", "/tr/kurumsal/yonetim-kurulu"],
  ["exp-mesaj", "/tr/kurumsal/yonetim-kurulu-mesaji"],
  ["exp-sertifika", "/tr/kurumsal/sertifikalarimiz"],
  ["exp-galeri", "/tr/galeri"],
  ["exp-basin", "/tr/basinda-biz"],
  ["exp-ik", "/tr/insan-kaynaklari"],
  ["act-isitma", "/tr/faaliyet-alanlari/isitma"],
  ["sol-otomasyon", "/tr/cozumler/bina-otomasyonu"],
  ["util-teklif", "/tr/teklif-al"],
  ["util-iletisim", "/tr/iletisim"],
  ["util-referans", "/tr/referanslar"],
  ["slug-teknik", "/tr/cozumler/teknik-danismanlik"],
  ["en-home", "/en"],
  ["en-isitma", "/en/faaliyet-alanlari/isitma"],
  ["404", "/tr/yok-boyle-sayfa"],
];

const WIDTHS = [
  ["m", 375, 812],
  ["t", 768, 1024],
  ["d", 1280, 900],
];

const overflow = [];
const browser = await chromium.launch();

for (const [wtag, w, h] of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    try {
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(400);
      const bleed = await page.evaluate(() => {
        const de = document.documentElement;
        const over = de.scrollWidth - de.clientWidth;
        let worst = null;
        if (over > 1) {
          for (const el of document.querySelectorAll("body *")) {
            const r = el.getBoundingClientRect();
            if (r.right > de.clientWidth + 1 || r.left < -1) {
              worst = {
                tag: el.tagName.toLowerCase(),
                cls: (el.className || "").toString().slice(0, 80),
                right: Math.round(r.right),
                left: Math.round(r.left),
              };
              break;
            }
          }
        }
        return { over, worst };
      });
      if (bleed.over > 1) {
        overflow.push({ page: name, width: w, over: bleed.over, worst: bleed.worst });
      }
      await page.screenshot({ path: `${OUT}/${name}-${wtag}.png`, fullPage: true });
    } catch (e) {
      overflow.push({ page: name, width: w, error: e.message });
    }
  }
  await ctx.close();
}

await browser.close();

console.log("\n=== HORIZONTAL OVERFLOW / ERRORS ===");
if (!overflow.length) console.log("none — no page scrolls sideways at 375 / 768 / 1280");
for (const o of overflow) console.log(JSON.stringify(o));
console.log(`\n${PAGES.length * WIDTHS.length} screenshots in ./${OUT}/`);
