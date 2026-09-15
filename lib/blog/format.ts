import type { Locale } from "@/lib/i18n/config";

/** "12 Eylül 2026" / "12 September 2026". */
export function formatPostDate(d: Date | string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(typeof d === "string" ? new Date(d) : d);
}

export const BLOG_UI: Record<
  Locale,
  {
    readTime: (min: number) => string;
    allPosts: string;
    toc: string;
    tags: string;
    postLabel: string;
    readMore: string;
    translationLink: string;
    shareLabel: string;
  }
> = {
  tr: {
    readTime: (m) => `${m} dk okuma`,
    allPosts: "Tüm yazılar",
    toc: "İçindekiler",
    tags: "Etiketler",
    postLabel: "YAZI",
    readMore: "Yazıyı oku",
    translationLink: "Read in English",
    shareLabel: "Paylaş",
  },
  en: {
    readTime: (m) => `${m} min read`,
    allPosts: "All articles",
    toc: "Contents",
    tags: "Tags",
    postLabel: "ARTICLE",
    readMore: "Read article",
    translationLink: "Türkçe oku",
    shareLabel: "Share",
  },
};
