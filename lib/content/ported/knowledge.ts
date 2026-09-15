import { z } from "zod";

export type KnowledgeKind = "blog" | "faq" | "reviews";

const s = z.string().trim();

const cardItem = z.object({ title: s.max(160), text: s.max(400) });

/** Blog / FAQ / Müşteri Yorumları share one shape: a hero, a sliding card
 *  row (post/question/review — title + short text, no image), and a
 *  fallback "coming soon" message shown only while `items` is empty. */
export const knowledgeSchema = z.object({
  heroIndex: s.max(80),
  heroTitleTop: s.max(160),
  heroTitleAccent: s.max(160),
  heroLead: s.max(600),
  contentEyebrow: s.max(80),
  emptyHeading: s.max(160),
  emptyBody: s.max(400),
  items: z.array(cardItem).min(0).max(24),
});

export const knowledgeSchemas: Record<KnowledgeKind, z.ZodType> = {
  blog: knowledgeSchema,
  faq: knowledgeSchema,
  reviews: knowledgeSchema,
};

export const KNOWLEDGE_KIND_LABEL: Record<KnowledgeKind, string> = {
  blog: "Blog",
  faq: "Sıkça Sorulan Sorular",
  reviews: "Müşteri Yorumları",
};

export const KNOWLEDGE_ROUTE: Record<KnowledgeKind, string> = {
  blog: "/tr/blog",
  faq: "/tr/sikca-sorulan-sorular",
  reviews: "/tr/musteri-yorumlari",
};

const PLACEHOLDER_TEXT_TR = "İçerik metni burada yer alacak.";
const PLACEHOLDER_TEXT_EN = "Content text will appear here.";

/** Six numbered placeholder cards — generic, not fabricated content — until
 *  real posts/questions/reviews are added from the panel. */
function sixDummyCards(labelTr: string): { title: string; text: string }[] {
  return Array.from({ length: 6 }, (_, i) => ({
    title: `${labelTr} ${String(i + 1).padStart(2, "0")}`,
    text: PLACEHOLDER_TEXT_TR,
  }));
}
function sixDummyCardsEn(labelEn: string): { title: string; text: string }[] {
  return Array.from({ length: 6 }, (_, i) => ({
    title: `${labelEn} ${String(i + 1).padStart(2, "0")}`,
    text: PLACEHOLDER_TEXT_EN,
  }));
}

/** True for the seeded placeholder cards — they must never reach structured data. */
export function isPlaceholderCard(card: { title?: unknown; text?: unknown }): boolean {
  const text = typeof card.text === "string" ? card.text.trim() : "";
  return !text || text === PLACEHOLDER_TEXT_TR || text === PLACEHOLDER_TEXT_EN;
}

/** Real (non-placeholder) cards from a knowledge page's `items`. */
export function realCards(items: unknown): { title: string; text: string }[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((x): x is { title: string; text: string } =>
      !!x && typeof x === "object" && typeof (x as { title?: unknown }).title === "string" && typeof (x as { text?: unknown }).text === "string",
    )
    .filter((x) => !isPlaceholderCard(x));
}

export const knowledgeDefaults: Record<KnowledgeKind, Record<string, unknown>> = {
  blog: {
    heroIndex: "01 / BİLGİ MERKEZİ",
    heroTitleTop: "Bilgiyi paylaşır.",
    heroTitleAccent: "Geleceği geliştiririz.",
    heroLead:
      "Sahadan gelen teknik deneyimi, güncel teknolojileri ve mühendislik bakış açısını bir araya getiriyoruz.",
    contentEyebrow: "YAYIN AKIŞI",
    emptyHeading: "Yeni içerikler hazırlanıyor.",
    emptyBody: "Uzmanlık yazılarımız ve teknik rehberlerimiz yakında burada yayınlanacak.",
    items: sixDummyCards("Yazı"),
  },
  faq: {
    heroIndex: "01 / SIKÇA SORULAN SORULAR",
    heroTitleTop: "Sorular netleşir.",
    heroTitleAccent: "Çözümler kolaylaşır.",
    heroLead:
      "Proje, uygulama ve hizmet süreçlerine ilişkin merak edilenleri tek yerde topluyoruz.",
    contentEyebrow: "SORU KÜTÜPHANESİ",
    emptyHeading: "Yanıtlar hazırlanıyor.",
    emptyBody:
      "Sık sorulan sorular, uzman ekibimizin onayladığı yanıtlarla bu alanda yayınlanacak.",
    items: sixDummyCards("Soru"),
  },
  reviews: {
    heroIndex: "01 / MÜŞTERİ YORUMLARI",
    heroTitleTop: "Deneyim konuşur.",
    heroTitleAccent: "Güven kalır.",
    heroLead:
      "Birlikte tamamladığımız projelerin gerçek deneyimlerini şeffaf ve yalın biçimde paylaşacağız.",
    contentEyebrow: "MÜŞTERİ DENEYİMLERİ",
    emptyHeading: "Gerçek hikâyeler yakında.",
    emptyBody: "Onaylı müşteri görüşleri, proje bilgileriyle birlikte bu alanda yer alacak.",
    items: sixDummyCards("Yorum"),
  },
};

export const knowledgeDefaultsEn: Record<KnowledgeKind, Record<string, unknown>> = {
  blog: {
    heroIndex: "01 / KNOWLEDGE HUB",
    heroTitleTop: "Sharing knowledge.",
    heroTitleAccent: "Advancing the future.",
    heroLead:
      "We bring together field expertise, current technologies and an engineering perspective.",
    contentEyebrow: "EDITORIAL",
    emptyHeading: "New content is being prepared.",
    emptyBody: "Our expert articles and technical guides will be published here soon.",
    items: sixDummyCardsEn("Article"),
  },
  faq: {
    heroIndex: "01 / FREQUENTLY ASKED QUESTIONS",
    heroTitleTop: "Questions clarified.",
    heroTitleAccent: "Solutions simplified.",
    heroLead:
      "We bring together common questions about projects, implementation and services in one place.",
    contentEyebrow: "QUESTION LIBRARY",
    emptyHeading: "Answers are being prepared.",
    emptyBody:
      "Frequently asked questions will be published here with answers approved by our expert team.",
    items: sixDummyCardsEn("Question"),
  },
  reviews: {
    heroIndex: "01 / CLIENT STORIES",
    heroTitleTop: "Experience speaks.",
    heroTitleAccent: "Trust remains.",
    heroLead:
      "We will share authentic experiences from completed projects with clarity and transparency.",
    contentEyebrow: "CLIENT EXPERIENCES",
    emptyHeading: "Authentic stories coming soon.",
    emptyBody: "Approved client feedback will appear here alongside project details.",
    items: sixDummyCardsEn("Review"),
  },
};
