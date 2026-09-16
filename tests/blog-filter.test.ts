import { describe, it, expect } from "vitest";
import { applyFilter, facets, isDefault, parseFilter, tagSlug, toQuery, durationOf } from "@/lib/blog/filter";
import type { BlogPostView } from "@/lib/blog/shared";

const mk = (o: Partial<BlogPostView> & { slug: string }): BlogPostView => ({
  id: o.slug, locale: "tr", title: o.title ?? o.slug, excerpt: "", content: o.content ?? "kelime ".repeat(300), coverUrl: "", coverAlt: "",
  tags: o.tags ?? [], pairKey: null, published: true, publishedAt: o.publishedAt ?? "2026-09-10T12:00:00.000Z", updatedAt: "2026-09-10T12:00:00.000Z", ...o,
});
const posts = [
  mk({ slug: "a", title: "Zeta", tags: ["kombi bakımı", "kombi servisi"], content: "k ".repeat(400), publishedAt: "2026-09-16T12:00:00.000Z" }),
  mk({ slug: "b", title: "Alfa", tags: ["klima servisi"], content: "k ".repeat(1800), publishedAt: "2025-03-01T12:00:00.000Z" }),
  mk({ slug: "c", title: "Beta", tags: ["kombi servisi"], content: "k ".repeat(1000), publishedAt: "2026-01-05T12:00:00.000Z" }),
];

describe("lib/blog/filter", () => {
  it("parses and round-trips the query string", () => {
    const f = parseFilter({ konu: "kombi-servisi,Klima Servisi", sure: "orta", yil: "2026", sirala: "eski" });
    expect(f).toEqual({ tags: ["kombi-servisi", "klima-servisi"], duration: "orta", year: 2026, sort: "eski" });
    expect(toQuery(f)).toBe("?konu=kombi-servisi%2Cklima-servisi&sure=orta&yil=2026&sirala=eski");
    expect(parseFilter({ sure: "x", yil: "abc", sirala: "nope" })).toEqual({ tags: [], duration: null, year: null, sort: "yeni" });
    expect(isDefault(parseFilter({}))).toBe(true);
    expect(toQuery(parseFilter({}))).toBe("");
  });

  it("filters by tag (AND), duration and year; sorts newest by default", () => {
    expect(applyFilter(posts, parseFilter({})).map((p) => p.slug)).toEqual(["a", "c", "b"]);
    expect(applyFilter(posts, parseFilter({ konu: "kombi-servisi" })).map((p) => p.slug)).toEqual(["a", "c"]);
    expect(applyFilter(posts, parseFilter({ konu: "kombi-servisi,kombi-bakimi" })).map((p) => p.slug)).toEqual(["a"]);
    expect(applyFilter(posts, parseFilter({ yil: "2025" })).map((p) => p.slug)).toEqual(["b"]);
    expect(durationOf(posts[0])).toBe("kisa");
    expect(durationOf(posts[1])).toBe("uzun");
    expect(applyFilter(posts, parseFilter({ sure: "orta" })).map((p) => p.slug)).toEqual(["c"]);
  });

  it("sorts oldest, by reading time and A→Z (tr collation)", () => {
    expect(applyFilter(posts, parseFilter({ sirala: "eski" })).map((p) => p.slug)).toEqual(["b", "c", "a"]);
    expect(applyFilter(posts, parseFilter({ sirala: "kisa" })).map((p) => p.slug)).toEqual(["a", "c", "b"]);
    expect(applyFilter(posts, parseFilter({ sirala: "uzun" })).map((p) => p.slug)).toEqual(["b", "c", "a"]);
    expect(applyFilter(posts, parseFilter({ sirala: "az" })).map((p) => p.title)).toEqual(["Alfa", "Beta", "Zeta"]);
  });

  it("builds facets with counts from the unfiltered set", () => {
    const f = facets(posts, "tr");
    expect(f.tags[0]).toEqual({ key: "kombi-servisi", label: "kombi servisi", count: 2 });
    expect(f.durations.map((d) => d.count)).toEqual([1, 1, 1]);
    expect(f.years.map((y) => y.key)).toEqual([2026, 2025]);
    expect(tagSlug("Isı Pompası")).toBe("isi-pompasi");
  });
});
