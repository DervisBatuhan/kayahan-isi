/**
 * Minimal Markdown → block/inline AST for blog posts.
 *
 * Deliberately small and dependency-free: it produces a typed tree that
 * `components/blog/Markdown.tsx` renders as React elements, so post content
 * never goes through `dangerouslySetInnerHTML` and raw HTML in the source is
 * shown as literal text. Supports what an editorial post needs:
 *
 *   # / ## / ### headings      - / * bullet lists      1. ordered lists
 *   > blockquotes               ---  rule               ``` code fences
 *   ![alt](src) images          [text](href) links      **bold** *em* `code`
 *   blank-line separated paragraphs (single newlines inside a paragraph = <br>)
 *
 * Pure module — safe to import from server and client code, and from tests.
 */

export type Inline =
  | { type: "text"; value: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; children: Inline[] }
  | { type: "image"; src: string; alt: string }
  | { type: "br" };

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; id: string; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "quote"; children: Inline[] }
  | { type: "code"; value: string }
  | { type: "hr" }
  | { type: "image"; src: string; alt: string };

/** Only http(s), mailto, tel, root-relative and fragment URLs survive. */
export function safeUrl(raw: string): string {
  const url = raw.trim();
  if (!url) return "";
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  // Root-relative only — "//host" is protocol-relative and would leave the site.
  if ((url.startsWith("/") && !url.startsWith("//")) || url.startsWith("#")) return url;
  return "";
}

/** URL-friendly id for headings; TR-aware so "Isı Yalıtımı" → "isi-yalitimi". */
export function slugify(input: string): string {
  return input
    .trim()
    .replace(/[İI]/g, "i")
    .replace(/ı/g, "i")
    .replace(/[Şş]/g, "s")
    .replace(/[Ğğ]/g, "g")
    .replace(/[Üü]/g, "u")
    .replace(/[Öö]/g, "o")
    .replace(/[Çç]/g, "c")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------- inline ----

// Link/image targets allow one level of balanced parentheses (Wikipedia-style
// URLs) so `alert(1)`-shaped targets are consumed whole and then rejected by
// safeUrl instead of leaking a stray ")" as text.
const URL_PART = String.raw`(?:[^()\s]|\([^()\s]*\))+`;
const INLINE_RE = new RegExp(
  String.raw`(!\[([^\]]*)\]\((${URL_PART})\))|(\[([^\]]+)\]\((${URL_PART})\))|(\*\*([^*]+)\*\*)|(\*([^*\n]+)\*)|(` +
    "`([^`]+)`)",
);

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;

  const pushText = (s: string) => {
    if (!s) return;
    // Single newlines inside a paragraph become line breaks.
    const parts = s.split("\n");
    parts.forEach((p, i) => {
      if (p) out.push({ type: "text", value: p });
      if (i < parts.length - 1) out.push({ type: "br" });
    });
  };

  while (rest.length) {
    const m = INLINE_RE.exec(rest);
    if (!m) {
      pushText(rest);
      break;
    }
    pushText(rest.slice(0, m.index));
    if (m[1]) {
      const src = safeUrl(m[3] ?? "");
      if (src) out.push({ type: "image", src, alt: m[2] ?? "" });
      else pushText(m[1]);
    } else if (m[4]) {
      const href = safeUrl(m[6] ?? "");
      const children = parseInline(m[5] ?? "");
      if (href) out.push({ type: "link", href, children });
      else out.push(...children);
    } else if (m[7]) {
      out.push({ type: "strong", children: parseInline(m[8] ?? "") });
    } else if (m[9]) {
      out.push({ type: "em", children: parseInline(m[10] ?? "") });
    } else if (m[11]) {
      out.push({ type: "code", value: m[12] ?? "" });
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

// ----------------------------------------------------------------- block ----

const HEADING_RE = /^(#{1,3})\s+(.+?)\s*#*\s*$/;
const BULLET_RE = /^\s*[-*]\s+(.*)$/;
const ORDERED_RE = /^\s*\d+[.)]\s+(.*)$/;
const QUOTE_RE = /^\s*>\s?(.*)$/;
const HR_RE = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;
const FENCE_RE = /^\s*```/;
const IMAGE_LINE_RE = new RegExp(String.raw`^\s*!\[([^\]]*)\]\((${URL_PART})\)\s*$`);

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  const usedIds = new Map<string, number>();
  let i = 0;

  const uniqueId = (base: string) => {
    const n = usedIds.get(base) ?? 0;
    usedIds.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (FENCE_RE.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !FENCE_RE.test(lines[i])) buf.push(lines[i++]);
      i++; // closing fence (or EOF)
      blocks.push({ type: "code", value: buf.join("\n") });
      continue;
    }

    if (HR_RE.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const h = HEADING_RE.exec(line);
    if (h) {
      // "#" in a post body maps to h2: the post title already owns the h1.
      const level = Math.min(h[1].length + 1, 4) as 2 | 3 | 4;
      const text = h[2];
      blocks.push({
        type: "heading",
        level,
        id: uniqueId(slugify(text) || "bolum"),
        children: parseInline(text),
      });
      i++;
      continue;
    }

    const img = IMAGE_LINE_RE.exec(line);
    if (img) {
      const src = safeUrl(img[2]);
      if (src) {
        blocks.push({ type: "image", src, alt: img[1] });
        i++;
        continue;
      }
    }

    if (BULLET_RE.test(line) || ORDERED_RE.test(line)) {
      const ordered = ORDERED_RE.test(line);
      const re = ordered ? ORDERED_RE : BULLET_RE;
      const items: Inline[][] = [];
      while (i < lines.length) {
        const m = re.exec(lines[i]);
        if (!m) break;
        items.push(parseInline(m[1]));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (QUOTE_RE.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && QUOTE_RE.test(lines[i])) {
        buf.push(QUOTE_RE.exec(lines[i])![1]);
        i++;
      }
      blocks.push({ type: "quote", children: parseInline(buf.join("\n")) });
      continue;
    }

    // Paragraph: consume until a blank line or the start of another block.
    const buf: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) break;
      if (
        buf.length &&
        (HEADING_RE.test(l) ||
          BULLET_RE.test(l) ||
          ORDERED_RE.test(l) ||
          QUOTE_RE.test(l) ||
          HR_RE.test(l) ||
          FENCE_RE.test(l))
      )
        break;
      buf.push(l);
      i++;
    }
    blocks.push({ type: "paragraph", children: parseInline(buf.join("\n").trim()) });
  }

  return blocks;
}

// --------------------------------------------------------------- helpers ----

export function inlineToText(nodes: Inline[]): string {
  return nodes
    .map((n) => {
      switch (n.type) {
        case "text":
        case "code":
          return n.value;
        case "image":
          return n.alt;
        case "br":
          return " ";
        default:
          return inlineToText(n.children);
      }
    })
    .join("");
}

/** Plain text of a post body — for word counts, meta fallbacks and JSON-LD. */
export function markdownToText(source: string): string {
  return parseMarkdown(source)
    .map((b) => {
      switch (b.type) {
        case "heading":
        case "paragraph":
        case "quote":
          return inlineToText(b.children);
        case "list":
          return b.items.map(inlineToText).join(" ");
        case "code":
          return b.value;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(source: string): number {
  const t = markdownToText(source);
  return t ? t.split(" ").length : 0;
}

/** ~200 words/min, minimum 1. */
export function readingMinutes(source: string): number {
  return Math.max(1, Math.round(wordCount(source) / 200));
}

/** h2 headings, for an on-page table of contents. */
export function headings(source: string): { id: string; text: string }[] {
  return parseMarkdown(source)
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((b) => ({ id: b.id, text: inlineToText(b.children) }));
}
