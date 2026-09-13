import { describe, it, expect } from "vitest";
import {
  isPlaceholderPage,
  getDefaultPage,
  getDefaultPages,
  getPageDict,
  defaultPageParams,
  slugAcrossLocales,
} from "@/lib/content/pages";

describe("lib/content/pages — isPlaceholderPage", () => {
  it("returns false for every locale right now (no placeholder slugs registered)", () => {
    expect(isPlaceholderPage("tr", "kurumsal")).toBe(false);
    expect(isPlaceholderPage("en", "referanslar")).toBe(false);
  });
});

describe("lib/content/pages — getDefaultPage / getDefaultPages", () => {
  it("finds a known tr page by slug", () => {
    const page = getDefaultPage("tr", "kurumsal/hakkimizda");
    expect(page?.title).toBe("Hakkımızda");
  });

  it("finds the equivalent en page by the same slug key", () => {
    const page = getDefaultPage("en", "kurumsal/hakkimizda");
    expect(page?.title).toBe("About Us");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getDefaultPage("tr", "does-not-exist")).toBeUndefined();
  });

  it("getDefaultPages returns a non-empty array for both locales", () => {
    expect(getDefaultPages("tr").length).toBeGreaterThan(0);
    expect(getDefaultPages("en").length).toBeGreaterThan(0);
  });

  it("tr and en page lists are the same length and in the same order", () => {
    const tr = getDefaultPages("tr");
    const en = getDefaultPages("en");
    expect(en.length).toBe(tr.length);
    expect(en.map((p) => p.slug)).toEqual(tr.map((p) => p.slug));
  });
});

describe("lib/content/pages — getPageDict", () => {
  it("falls back to tr for an unrecognised locale value", () => {
    // @ts-expect-error deliberately passing a bad locale to exercise the fallback
    expect(getPageDict("fr").home).toBe(getPageDict("tr").home);
  });
});

describe("lib/content/pages — defaultPageParams", () => {
  it("produces one {locale, slug[]} entry per page, per locale", () => {
    const params = defaultPageParams();
    const trCount = getDefaultPages("tr").length;
    const enCount = getDefaultPages("en").length;
    expect(params.length).toBe(trCount + enCount);
    expect(params.every((p) => Array.isArray(p.slug) && p.slug.length > 0)).toBe(true);
  });

  it("splits multi-segment slugs into an array", () => {
    const params = defaultPageParams();
    const hit = params.find((p) => p.locale === "tr" && p.slug.join("/") === "kurumsal/hakkimizda");
    expect(hit?.slug).toEqual(["kurumsal", "hakkimizda"]);
  });
});

describe("lib/content/pages — slugAcrossLocales", () => {
  it("maps a tr slug to its en counterpart at the same index", () => {
    const map = slugAcrossLocales("tr", "kurumsal/hakkimizda");
    expect(map.tr).toBe("kurumsal/hakkimizda");
    expect(map.en).toBe("kurumsal/hakkimizda");
  });

  it("falls back to the given slug for every locale when it isn't found", () => {
    const map = slugAcrossLocales("tr", "not-a-real-slug");
    expect(map).toEqual({ tr: "not-a-real-slug", en: "not-a-real-slug" });
  });
});
