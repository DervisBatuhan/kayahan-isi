/**
 * Blog list filtering + sorting. Pure module (no DB, no server-only) so the
 * page, the tag route and the tests all share one definition.
 *
 * State lives in the URL so every view is a plain GET, crawlable and
 * shareable:  /tr/blog?konu=kombi,klima&sure=kisa&yil=2026&sirala=eski
 */
import type { Locale } from "@/lib/i18n/config";
import { slugify } from "./markdown";
import { readingMinutes } from "./markdown";
import type { BlogPostView } from "./shared";

export type SortKey = "yeni" | "eski" | "kisa" | "uzun" | "az";
export type DurationKey = "kisa" | "orta" | "uzun";

export type BlogFilterState = {
  tags: string[]; // tag slugs
  duration: DurationKey | null;
  year: number | null;
  sort: SortKey;
};

export const DEFAULT_FILTER: BlogFilterState = { tags: [], duration: null, year: null, sort: "yeni" };

/** Query-string keys — Turkish on purpose, they are visible in the URL. */
export const QS = { tags: "konu", duration: "sure", year: "yil", sort: "sirala" } as const;

const SORT_KEYS: SortKey[] = ["yeni", "eski", "kisa", "uzun", "az"];
const DURATION_KEYS: DurationKey[] = ["kisa", "orta", "uzun"];

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export function durationOf(post: Pick<BlogPostView, "content">): DurationKey {
  const m = readingMinutes(post.content);
  return m <= 3 ? "kisa" : m <= 7 ? "orta" : "uzun";
}

export function yearOf(post: Pick<BlogPostView, "publishedAt">): number {
  return new Date(post.publishedAt).getUTCFullYear();
}

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function parseFilter(sp: SP): BlogFilterState {
  const tags = first(sp[QS.tags])
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map(tagSlug);
  const d = first(sp[QS.duration]) as DurationKey;
  const y = Number.parseInt(first(sp[QS.year]), 10);
  const s = first(sp[QS.sort]) as SortKey;
  return {
    tags: [...new Set(tags)],
    duration: DURATION_KEYS.includes(d) ? d : null,
    year: Number.isFinite(y) && y > 2000 && y < 2100 ? y : null,
    sort: SORT_KEYS.includes(s) ? s : "yeni",
  };
}

/** Serialise a state back to a query string ("" when it's all defaults). */
export function toQuery(f: BlogFilterState): string {
  const p = new URLSearchParams();
  if (f.tags.length) p.set(QS.tags, f.tags.join(","));
  if (f.duration) p.set(QS.duration, f.duration);
  if (f.year) p.set(QS.year, String(f.year));
  if (f.sort !== "yeni") p.set(QS.sort, f.sort);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function isDefault(f: BlogFilterState): boolean {
  return !f.tags.length && !f.duration && !f.year && f.sort === "yeni";
}

export function applyFilter(posts: BlogPostView[], f: BlogFilterState): BlogPostView[] {
  let out = posts.filter((p) => {
    if (f.tags.length) {
      const slugs = p.tags.map(tagSlug);
      if (!f.tags.every((t) => slugs.includes(t))) return false;
    }
    if (f.duration && durationOf(p) !== f.duration) return false;
    if (f.year && yearOf(p) !== f.year) return false;
    return true;
  });
  const byDate = (a: BlogPostView, b: BlogPostView) => b.publishedAt.localeCompare(a.publishedAt);
  switch (f.sort) {
    case "eski":
      out = [...out].sort((a, b) => -byDate(a, b));
      break;
    case "kisa":
      out = [...out].sort((a, b) => readingMinutes(a.content) - readingMinutes(b.content) || byDate(a, b));
      break;
    case "uzun":
      out = [...out].sort((a, b) => readingMinutes(b.content) - readingMinutes(a.content) || byDate(a, b));
      break;
    case "az":
      out = [...out].sort((a, b) => a.title.localeCompare(b.title, "tr"));
      break;
    default:
      out = [...out].sort(byDate);
  }
  return out;
}

export type Facet<K extends string | number> = { key: K; label: string; count: number };

/** Facet counts are computed on the *unfiltered* set so options never vanish. */
export function facets(posts: BlogPostView[], locale: Locale) {
  const tagMap = new Map<string, { label: string; count: number }>();
  for (const p of posts) {
    for (const t of p.tags) {
      const k = tagSlug(t);
      const cur = tagMap.get(k);
      tagMap.set(k, { label: cur?.label ?? t, count: (cur?.count ?? 0) + 1 });
    }
  }
  const tags: Facet<string>[] = [...tagMap.entries()]
    .map(([key, v]) => ({ key, label: v.label, count: v.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "tr"));

  const durCount = { kisa: 0, orta: 0, uzun: 0 };
  for (const p of posts) durCount[durationOf(p)]++;
  const durations: Facet<DurationKey>[] = [
    { key: "kisa", label: locale === "tr" ? "Kısa (≤ 3 dk)" : "Short (≤ 3 min)", count: durCount.kisa },
    { key: "orta", label: locale === "tr" ? "Orta (4–7 dk)" : "Medium (4–7 min)", count: durCount.orta },
    { key: "uzun", label: locale === "tr" ? "Uzun (8+ dk)" : "Long (8+ min)", count: durCount.uzun },
  ];

  const yearMap = new Map<number, number>();
  for (const p of posts) yearMap.set(yearOf(p), (yearMap.get(yearOf(p)) ?? 0) + 1);
  const years: Facet<number>[] = [...yearMap.entries()]
    .map(([key, count]) => ({ key, label: String(key), count }))
    .sort((a, b) => b.key - a.key);

  return { tags, durations, years };
}

export const SORT_OPTIONS: Record<Locale, { key: SortKey; label: string }[]> = {
  tr: [
    { key: "yeni", label: "En yeni" },
    { key: "eski", label: "En eski" },
    { key: "kisa", label: "Okuma süresi: kısadan uzuna" },
    { key: "uzun", label: "Okuma süresi: uzundan kısaya" },
    { key: "az", label: "Başlık: A → Z" },
  ],
  en: [
    { key: "yeni", label: "Newest" },
    { key: "eski", label: "Oldest" },
    { key: "kisa", label: "Reading time: short to long" },
    { key: "uzun", label: "Reading time: long to short" },
    { key: "az", label: "Title: A → Z" },
  ],
};

export const FILTER_UI: Record<
  Locale,
  {
    filter: string; sort: string; clear: string; results: (n: number) => string; topic: string; duration: string; year: string;
    selected: string; empty: string; emptyHint: string; close: string; apply: string;
  }
> = {
  tr: {
    filter: "Filtrele", sort: "Sırala", clear: "Temizle", results: (n) => `${n} yazı`, topic: "Konu", duration: "Okuma süresi", year: "Yıl",
    selected: "Seçili filtreler", empty: "Bu filtrelerle eşleşen yazı yok.", emptyHint: "Filtreleri temizleyip tekrar deneyin.", close: "Kapat", apply: "Sonuçları gör",
  },
  en: {
    filter: "Filter", sort: "Sort", clear: "Clear", results: (n) => `${n} article${n === 1 ? "" : "s"}`, topic: "Topic", duration: "Reading time", year: "Year",
    selected: "Selected filters", empty: "No articles match these filters.", emptyHint: "Clear the filters and try again.", close: "Close", apply: "Show results",
  },
};
