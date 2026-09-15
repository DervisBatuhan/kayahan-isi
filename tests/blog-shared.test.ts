import { describe, it, expect } from "vitest";
import { blogPostInputSchema, emptyPostInput, parseTags, slugFromTitle } from "@/lib/blog/shared";
import { blogGraph, blogPostingGraph, faqGraph } from "@/lib/structured-data";
import { isPlaceholderCard, realCards, knowledgeDefaults } from "@/lib/content/ported/knowledge";

const valid = {
  ...emptyPostInput("tr"),
  slug: "isi-pompasi-nedir",
  title: "Isı Pompası Nedir?",
  publishedAt: "2026-09-15",
};

describe("lib/blog/shared — blogPostInputSchema", () => {
  it("accepts a minimal valid post", () => {
    expect(blogPostInputSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a bad slug, an empty title and a malformed date", () => {
    expect(blogPostInputSchema.safeParse({ ...valid, slug: "Isı Pompası" }).success).toBe(false);
    expect(blogPostInputSchema.safeParse({ ...valid, slug: "-a-" }).success).toBe(false);
    expect(blogPostInputSchema.safeParse({ ...valid, title: "  " }).success).toBe(false);
    expect(blogPostInputSchema.safeParse({ ...valid, publishedAt: "15.09.2026" }).success).toBe(false);
  });
  it("rejects an unknown locale and caps tags at 10", () => {
    expect(blogPostInputSchema.safeParse({ ...valid, locale: "de" }).success).toBe(false);
    expect(blogPostInputSchema.safeParse({ ...valid, tags: Array(11).fill("t") }).success).toBe(false);
  });
  it("trims strings", () => {
    const r = blogPostInputSchema.parse({ ...valid, title: "  X  ", excerpt: " y " });
    expect(r.title).toBe("X");
    expect(r.excerpt).toBe("y");
  });
});

describe("lib/blog/shared — helpers", () => {
  it("parseTags tolerates bad JSON and non-string entries", () => {
    expect(parseTags("[]")).toEqual([]);
    expect(parseTags("nope")).toEqual([]);
    expect(parseTags('["a", 1, "b"]')).toEqual(["a", "b"]);
  });
  it("slugFromTitle is TR-aware", () => {
    expect(slugFromTitle("Yalıtım ve Enerji Verimliliği")).toBe("yalitim-ve-enerji-verimliligi");
  });
});

const post = {
  slug: "isi-pompasi",
  title: "Isı Pompası",
  excerpt: "Özet",
  coverUrl: "https://x.public.blob.vercel-storage.com/c.png",
  tags: ["ısı", "pompa"],
  publishedAt: "2026-09-15T12:00:00.000Z",
  updatedAt: "2026-09-16T12:00:00.000Z",
};

describe("lib/structured-data — blog", () => {
  it("blogGraph lists posts with absolute urls", () => {
    const g = blogGraph("tr", [post]);
    expect(g["@type"]).toBe("Blog");
    expect(g.blogPost[0].url).toBe("https://www.kayahanisi.com/tr/blog/isi-pompasi");
    expect(g.blogPost[0].image).toBe(post.coverUrl);
  });
  it("blogPostingGraph carries dates, keywords, wordCount and plain-text body", () => {
    const g = blogPostingGraph("tr", post, { wordCount: 3, bodyText: "a b c" });
    expect(g["@type"]).toBe("BlogPosting");
    expect(g.datePublished).toBe("2026-09-15T12:00:00.000Z");
    expect(g.dateModified).toBe("2026-09-16T12:00:00.000Z");
    expect(g.keywords).toBe("ısı, pompa");
    expect(g.wordCount).toBe(3);
    expect(g.articleBody).toBe("a b c");
    expect(g.author["@id"]).toBe("https://www.kayahanisi.com/#organization");
  });
  it("omits image when there is no cover", () => {
    const g = blogPostingGraph("en", { ...post, coverUrl: "" }, { wordCount: 0, bodyText: "" });
    expect("image" in g).toBe(false);
  });
});

describe("lib/structured-data — faqGraph", () => {
  it("returns null with no usable items", () => {
    expect(faqGraph([])).toBeNull();
    expect(faqGraph([{ title: "", text: "x" }])).toBeNull();
  });
  it("builds Question/Answer pairs", () => {
    const g = faqGraph([{ title: "Soru?", text: "Cevap." }]);
    expect(g?.["@type"]).toBe("FAQPage");
    expect(g?.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Soru?",
      acceptedAnswer: { "@type": "Answer", text: "Cevap." },
    });
  });
});

describe("lib/content/ported/knowledge — placeholder guard", () => {
  it("treats the seeded dummy cards as placeholders so they never reach FAQ schema", () => {
    const seeded = knowledgeDefaults.faq.items as { title: string; text: string }[];
    expect(seeded.every(isPlaceholderCard)).toBe(true);
    expect(realCards(seeded)).toEqual([]);
  });
  it("keeps real cards", () => {
    expect(realCards([{ title: "Q", text: "A" }, "junk", { title: "x", text: "" }])).toEqual([
      { title: "Q", text: "A" },
    ]);
  });
});
