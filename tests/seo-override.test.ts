import { describe, it, expect } from "vitest";
import { PORTED_ENTRIES } from "@/lib/content/ported/registry";

describe("registry — SEO override fields", () => {
  it("every design page schema accepts optional seoTitle/seoDescription and keeps its own fields", () => {
    for (const e of PORTED_ENTRIES) {
      const r = e.schema.safeParse({ ...e.defaults.tr, seoTitle: "Özel başlık", seoDescription: "Özel açıklama" });
      expect(r.success, `${e.family}/${e.kind}: ${r.success ? "" : JSON.stringify(r.error.issues[0])}`).toBe(true);
      expect((r.data as Record<string, unknown>).seoTitle).toBe("Özel başlık");
      const plain = e.schema.safeParse(e.defaults.tr);
      expect(plain.success, `${e.family}/${e.kind} defaults`).toBe(true);
      expect((plain.data as Record<string, unknown>).seoTitle).toBe("");
    }
  });
  it("rejects an over-long SEO title", () => {
    const e = PORTED_ENTRIES[0];
    expect(e.schema.safeParse({ ...e.defaults.tr, seoTitle: "x".repeat(71) }).success).toBe(false);
  });
});
