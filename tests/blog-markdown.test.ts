import { describe, it, expect } from "vitest";
import {
  headings,
  markdownToText,
  parseInline,
  parseMarkdown,
  readingMinutes,
  safeUrl,
  slugify,
  wordCount,
} from "@/lib/blog/markdown";

describe("lib/blog/markdown — slugify", () => {
  it("maps Turkish letters and collapses separators", () => {
    expect(slugify("Isı Pompası Nedir?")).toBe("isi-pompasi-nedir");
    expect(slugify("Çatı & Şömine Ğ ü Ö İ")).toBe("cati-somine-g-u-o-i");
    expect(slugify("  --Hello   World--  ")).toBe("hello-world");
  });
  it("caps length at 80", () => {
    expect(slugify("a".repeat(200)).length).toBe(80);
  });
});

describe("lib/blog/markdown — safeUrl", () => {
  it("allows http(s), mailto, tel, root-relative and fragments", () => {
    expect(safeUrl("https://x.y/z")).toBe("https://x.y/z");
    expect(safeUrl("/tr/iletisim")).toBe("/tr/iletisim");
    expect(safeUrl("#bolum")).toBe("#bolum");
    expect(safeUrl("mailto:a@b.c")).toBe("mailto:a@b.c");
  });
  it("rejects javascript:, data: and protocol-relative urls", () => {
    expect(safeUrl("javascript:alert(1)")).toBe("");
    expect(safeUrl("data:text/html,x")).toBe("");
    expect(safeUrl("//evil.com")).toBe("");
  });
});

describe("lib/blog/markdown — inline", () => {
  it("parses bold, italic, code, links and images", () => {
    const nodes = parseInline("a **b** *c* `d` [e](https://f) ![g](/h.png)");
    expect(nodes.map((n) => n.type)).toEqual([
      "text", "strong", "text", "em", "text", "code", "text", "link", "text", "image",
    ]);
    const link = nodes[7];
    expect(link.type === "link" && link.href).toBe("https://f");
  });
  it("drops the link but keeps the text when the href is unsafe", () => {
    const nodes = parseInline("[click](javascript:alert(1))");
    expect(nodes).toEqual([{ type: "text", value: "click" }]);
  });
  it("turns single newlines into <br>", () => {
    expect(parseInline("a\nb").map((n) => n.type)).toEqual(["text", "br", "text"]);
  });
  it("never produces raw HTML nodes", () => {
    const nodes = parseInline("<script>alert(1)</script>");
    expect(nodes).toEqual([{ type: "text", value: "<script>alert(1)</script>" }]);
  });
});

describe("lib/blog/markdown — blocks", () => {
  const src = [
    "# Giriş",
    "",
    "İlk paragraf",
    "devam satırı",
    "",
    "## Isı Pompası",
    "- bir",
    "- iki",
    "",
    "1. a",
    "2) b",
    "",
    "> alıntı",
    "> ikinci",
    "",
    "---",
    "",
    "```",
    "const x = 1;",
    "```",
    "",
    "![kapak](https://img/x.png)",
    "",
    "## Isı Pompası",
  ].join("\n");

  it("parses every block type in order", () => {
    const blocks = parseMarkdown(src);
    expect(blocks.map((b) => b.type)).toEqual([
      "heading", "paragraph", "heading", "list", "list", "quote", "hr", "code", "image", "heading",
    ]);
  });

  it("maps # to h2 (the post title owns h1) and de-duplicates heading ids", () => {
    const hs = parseMarkdown(src).filter((b) => b.type === "heading");
    expect(hs[0]).toMatchObject({ level: 2, id: "giris" });
    expect(hs[1]).toMatchObject({ level: 3, id: "isi-pompasi" });
    expect(hs[2]).toMatchObject({ level: 3, id: "isi-pompasi-2" });
  });

  it("distinguishes ordered from bullet lists", () => {
    const lists = parseMarkdown(src).filter((b) => b.type === "list");
    expect(lists[0]).toMatchObject({ ordered: false });
    expect(lists[1]).toMatchObject({ ordered: true });
    expect(lists[0].type === "list" && lists[0].items.length).toBe(2);
  });

  it("keeps fenced code verbatim", () => {
    const code = parseMarkdown(src).find((b) => b.type === "code");
    expect(code).toEqual({ type: "code", value: "const x = 1;" });
  });

  it("handles CRLF input and an unclosed fence", () => {
    expect(parseMarkdown("a\r\n\r\nb").map((b) => b.type)).toEqual(["paragraph", "paragraph"]);
    expect(parseMarkdown("```\nx").map((b) => b.type)).toEqual(["code"]);
  });

  it("returns an empty tree for empty input", () => {
    expect(parseMarkdown("")).toEqual([]);
    expect(parseMarkdown("\n\n  \n")).toEqual([]);
  });
});

describe("lib/blog/markdown — text helpers", () => {
  it("flattens to plain text for meta/JSON-LD", () => {
    expect(markdownToText("# Başlık\n\nBir **kalın** [link](https://x).\n\n- a\n- b")).toBe(
      "Başlık Bir kalın link. a b",
    );
  });
  it("counts words and estimates reading time (min 1)", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("bir iki üç")).toBe(3);
    expect(readingMinutes("bir iki üç")).toBe(1);
    expect(readingMinutes(Array(450).fill("kelime").join(" "))).toBe(2);
  });
  it("lists only h2 headings for the table of contents", () => {
    expect(headings("# A\n\n## B\n\n# C")).toEqual([
      { id: "a", text: "A" },
      { id: "c", text: "C" },
    ]);
  });
});

describe("lib/blog/markdown — parenthesised urls", () => {
  it("keeps one level of balanced parens inside a link target", () => {
    const nodes = parseInline("[w](https://en.wikipedia.org/wiki/Heat_pump_(disambiguation)) sonra");
    expect(nodes[0]).toMatchObject({ type: "link", href: "https://en.wikipedia.org/wiki/Heat_pump_(disambiguation)" });
    expect(nodes[1]).toEqual({ type: "text", value: " sonra" });
  });
});
