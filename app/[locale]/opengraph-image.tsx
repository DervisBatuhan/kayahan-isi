import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n/config";

export const alt = "Kayahan Isı — 45 yıllık tecrübe, mühendislik odaklı çözümler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const COPY = {
  tr: {
    tagline: "İklimlendirme · Isıtma · Soğutma · Yalıtım · Enerji",
    strap: "45 yıllık tecrübe, geleceğin teknolojisi",
  },
  en: {
    tagline: "Air Conditioning · Heating · Cooling · Insulation · Energy",
    strap: "45 years of experience, technology of the future",
  },
} as const;

// Official Kayahan Isı palette (lacivert swapped for a lighter blue so every
// segment reads against the navy background): mavi, turkuaz, kırmızı, turuncu, sarı
const BAR = ["#55A0DD", "#00A9D6", "#D71920", "#F58220", "#FDB913"];

// White "KAYA" variant of the logo (public/brand/kayahan-logo.svg), matted
// onto a transparent background — the only readable version on this navy card.
const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/kayahan-logo-footer.png"),
).toString("base64")}`;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = isLocale(locale) ? COPY[locale] : COPY.tr;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0d2b64 0%, #16377D 55%, #1E4696 100%)",
          color: "#fff",
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUrl} width={205} height={81} alt="" />
          <span style={{ fontSize: 30, letterSpacing: 6, color: "#9AC6EC" }}>· 1976</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#EAF2FB" }}>
            {copy.strap}
          </div>
          <div style={{ fontSize: 26, color: "#9AC6EC" }}>{copy.tagline}</div>
        </div>

        <div style={{ display: "flex", height: 14, width: "100%" }}>
          {BAR.map((color) => (
            <div key={color} style={{ flex: 1, background: color }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
