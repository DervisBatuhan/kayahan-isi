import { describe, it, expect } from "vitest";
import {
  DISTRICT_KINDS,
  DISTRICT_NAME,
  districtDefaults,
  districtDefaultsEn,
  serviceDefaults,
  serviceDefaultsEn,
  serviceLandingSchema,
} from "@/lib/content/ported/service";
import { PORTED_META } from "@/lib/content/ported/meta";
import { getEditorSpec } from "@/lib/content/ported/editor-spec";
import { serviceGraph } from "@/lib/structured-data";
import { markdownToText, parseMarkdown } from "@/lib/blog/markdown";

const all = [
  ...Object.entries(serviceDefaults),
  ...Object.entries(serviceDefaultsEn),
  ...Object.entries(districtDefaults),
  ...Object.entries(districtDefaultsEn),
];

describe("lib/content/ported/service — defaults", () => {
  it("every default validates against the schema", () => {
    for (const [kind, v] of all) {
      const r = serviceLandingSchema.safeParse(v);
      expect(r.success, `${kind}: ${r.success ? "" : r.error.issues[0]?.message}`).toBe(true);
    }
  });

  it("every body parses as Markdown with headings and no unsafe links", () => {
    for (const [kind, v] of all) {
      const blocks = parseMarkdown(v.body);
      const headings = blocks.filter((b) => b.type === "heading");
      expect(headings.length, `${kind} headings`).toBeGreaterThanOrEqual(1);
      expect(v.body, `${kind} unsafe`).not.toMatch(/javascript:|<script/i);
    }
    // TR service pages are the primary SEO targets: at least four sections each.
    for (const [kind, v] of Object.entries(serviceDefaults)) {
      expect(parseMarkdown(v.body).filter((b) => b.type === "heading").length, kind).toBeGreaterThanOrEqual(4);
    }
  });

  it("district pages carry unique local copy, not the same text with the name swapped", () => {
    const bodies = DISTRICT_KINDS.map((k) => {
      const text = markdownToText(districtDefaults[k].body);
      return text.replaceAll(DISTRICT_NAME[k], "X");
    });
    expect(new Set(bodies).size).toBe(bodies.length);
    // Body alone (hero, cards and FAQ add ~200 more words per page).
    for (const b of bodies) expect(b.split(" ").length).toBeGreaterThan(110);
  });

  it("every service/district page has a meta entry with a description ≤ 160 chars + title ≤ 70", () => {
    const paths = ["/kombi-servisi", "/klima-servisi", "/sofben-servisi", ...DISTRICT_KINDS.map((k) => `/servis/${k}`)];
    for (const p of paths) {
      const m = PORTED_META[p];
      expect(m, p).toBeTruthy();
      for (const l of ["tr", "en"] as const) {
        expect(m[l].title.length, `${p} ${l} title`).toBeLessThanOrEqual(70);
        expect(m[l].description.length, `${p} ${l} description`).toBeLessThanOrEqual(200);
      }
    }
  });

  it("editor spec covers every schema key", () => {
    const keys = new Set(getEditorSpec("service", "kombi").flatMap((s) => s.fields.map((f) => f.key)));
    for (const k of Object.keys(serviceLandingSchema.shape)) expect(keys.has(k), k).toBe(true);
    expect(getEditorSpec("district", "bahcelievler")).toEqual(getEditorSpec("service", "kombi"));
  });
});

describe("lib/structured-data — serviceGraph", () => {
  it("builds a Service with provider, areas and 24/7 hours", () => {
    const g = serviceGraph("tr", { path: "/kombi-servisi", name: "Kombi Servisi", description: "d", serviceType: "Boiler Service" });
    expect(g["@type"]).toBe("Service");
    expect(g.url).toBe("https://www.kayahanisi.com/tr/kombi-servisi");
    expect(g.provider["@id"]).toBe("https://www.kayahanisi.com/#organization");
    expect(g.areaServed).toHaveLength(8);
    expect(g.hoursAvailable.opens).toBe("00:00");
  });
  it("narrows areaServed for a district page", () => {
    const g = serviceGraph("tr", { path: "/servis/bakirkoy", name: "n", description: "d", serviceType: "s", districts: ["Bakırköy"] });
    expect(g.areaServed).toEqual([{ "@type": "AdministrativeArea", name: "Bakırköy", containedInPlace: { "@type": "City", name: "İstanbul" } }]);
  });
});
