import { describe, it, expect } from "vitest";
import { locales, defaultLocale, isLocale, otherLocale } from "@/lib/i18n/config";

describe("lib/i18n/config", () => {
  it("exposes the Turkish and English locales", () => {
    expect([...locales]).toEqual(["tr", "en"]);
  });

  it("defaults to 'tr'", () => {
    expect(defaultLocale).toBe("tr");
  });

  it("isLocale accepts 'tr' and 'en', rejects anything else", () => {
    expect(isLocale("tr")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("otherLocale flips between the two", () => {
    expect(otherLocale("tr")).toBe("en");
    expect(otherLocale("en")).toBe("tr");
  });
});
