/**
 * Blog post shape + validation. Pure module — imported by the admin editor
 * (client), the server actions and the tests. No DB, no server-only deps.
 */
import { z } from "zod";
import { locales } from "@/lib/i18n/config";
import { slugify } from "./markdown";

export const BLOG_TAG = "blog-posts";

/** Max lengths mirror what fits the list cards / meta tags without truncation. */
export const blogPostInputSchema = z.object({
  id: z.string().optional(),
  locale: z.enum(locales),
  slug: z
    .string()
    .trim()
    .min(1, "Slug gerekli.")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
  title: z.string().trim().min(1, "Başlık gerekli.").max(160),
  excerpt: z.string().trim().max(320),
  content: z.string().max(60_000),
  coverUrl: z.string().trim().max(600),
  coverAlt: z.string().trim().max(200),
  tags: z.array(z.string().trim().min(1).max(40)).max(10),
  pairKey: z.string().trim().max(80),
  published: z.boolean(),
  /** ISO date (yyyy-mm-dd) from the editor's date input. */
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih gerekli."),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

/**
 * What the public pages and the admin list consume. Dates are ISO strings,
 * not `Date`s: the read layer sits behind `unstable_cache`, which JSON-encodes
 * results, so a `Date` would silently come back as a string on cache hits.
 */
export type BlogPostView = {
  id: string;
  locale: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  coverAlt: string;
  tags: string[];
  pairKey: string | null;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
};

export function parseTags(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((t): t is string => typeof t === "string") : [];
  } catch {
    return [];
  }
}

/** Slug suggestion from a title, e.g. "Isı Pompası Nedir?" → "isi-pompasi-nedir". */
export function slugFromTitle(title: string): string {
  return slugify(title);
}

export function toDateInput(d: Date | string): string {
  return (typeof d === "string" ? d : d.toISOString()).slice(0, 10);
}

/** Empty draft for the "new post" editor. */
export function emptyPostInput(locale: BlogPostInput["locale"] = "tr"): BlogPostInput {
  return {
    locale,
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverUrl: "",
    coverAlt: "",
    tags: [],
    pairKey: "",
    published: false,
    publishedAt: toDateInput(new Date()),
  };
}
