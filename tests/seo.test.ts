import { describe, it, expect } from "vitest";
import { SITE_URL, absoluteUrl, buildAlternates, ogLocale, buildPortedMetadata } from "@/lib/seo";
import { locales } from "@/lib/i18n/config";

describe("lib/seo — absoluteUrl", () => {
  it("prefixes a root-relative path with SITE_URL", () => {
    expect(absoluteUrl("/tr/kurumsal")).toBe(`${SITE_URL}/tr/kurumsal`);
  });

  it("adds the leading slash when missing", () => {
    expect(absoluteUrl("tr/kurumsal")).toBe(`${SITE_URL}/tr/kurumsal`);
  });

  it("defaults to the site root", () => {
    expect(absoluteUrl()).toBe(`${SITE_URL}/`);
  });
});

describe("lib/seo — ogLocale", () => {
  it("maps tr to tr_TR and en to en_US", () => {
    expect(ogLocale("tr")).toBe("tr_TR");
    expect(ogLocale("en")).toBe("en_US");
  });
});

describe("lib/seo — buildAlternates", () => {
  it("emits a canonical plus one hreflang per configured locale and x-default", () => {
    const alt = buildAlternates("tr", "/kurumsal/hakkimizda");
    expect(alt?.canonical).toBe(`${SITE_URL}/tr/kurumsal/hakkimizda`);
    const languages = alt?.languages as Record<string, string>;
    for (const l of locales) {
      expect(languages[l]).toBe(`${SITE_URL}/${l}/kurumsal/hakkimizda`);
    }
    expect(languages["x-default"]).toBe(`${SITE_URL}/${locales[0]}/kurumsal/hakkimizda`);
  });

  it("honours a per-locale slug override via pathByLocale", () => {
    const alt = buildAlternates("en", "/kurumsal/hakkimizda", {
      en: "/corporate/about-us",
    });
    const languages = alt?.languages as Record<string, string>;
    expect(alt?.canonical).toBe(`${SITE_URL}/en/corporate/about-us`);
    expect(languages.en).toBe(`${SITE_URL}/en/corporate/about-us`);
    expect(languages.tr).toBe(`${SITE_URL}/tr/kurumsal/hakkimizda`);
  });

  it("handles the home page (empty subPath) without a double slash", () => {
    const alt = buildAlternates("tr", "");
    expect(alt?.canonical).toBe(`${SITE_URL}/tr`);
  });
});

describe("lib/seo — buildPortedMetadata", () => {
  it("returns an empty object for an unknown locale", () => {
    expect(buildPortedMetadata("fr", "/kurumsal/hakkimizda")).toEqual({});
  });

  it("returns title/description/openGraph/alternates for a known path", () => {
    const meta = buildPortedMetadata("tr", "/kurumsal/hakkimizda");
    expect(meta.title).toBeTruthy();
    expect(meta.description).toBeTruthy();
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/tr/kurumsal/hakkimizda`);
    expect(meta.openGraph).toMatchObject({
      locale: "tr_TR",
      url: `${SITE_URL}/tr/kurumsal/hakkimizda`,
    });
  });
});
