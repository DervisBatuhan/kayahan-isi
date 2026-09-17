import type { Locale } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/content/types";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * Serialise a JSON-LD object for a <script type="application/ld+json"> tag,
 * escaping "<" so the payload can't break out of the script element
 * (per the Next.js JSON-LD guide).
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#ilhan-kaya`;

/** Registered company name (from the trade registry / award plaques). */
export const LEGAL_NAME = "Kayahan Isıtma Sistemleri Teknik Bakım Onarım İnş. San. Tic. Ltd. Şti.";

/** Alternate trade names the business has operated under (helps entity matching). */
export const ALTERNATE_NAMES = ["Kayahan Isı", "Kayahan VİP Kurumsal Servis"];

/**
 * European-side Istanbul districts the service teams cover. Keep in sync with
 * the "Hizmet Noktalarımız" list on the district pages.
 */
export const SERVICE_DISTRICTS = [
  "Bahçelievler",
  "Bağcılar",
  "Bakırköy",
  "Güngören",
  "Zeytinburnu",
  "Esenler",
  "Bayrampaşa",
  "Küçükçekmece",
] as const;

/** Founder / lead engineer entity — referenced from the Organization node. */
export function founderNode(locale: Locale) {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "İlhan Kaya",
    jobTitle: locale === "tr" ? "Kurucu, Teknik Eğitmen ve Bilirkişi" : "Founder, Technical Trainer and Expert Witness",
    worksFor: { "@id": ORG_ID },
    knowsAbout:
      locale === "tr"
        ? ["Kombi servisi", "Klima servisi", "Şofben servisi", "Doğal gaz ısıtma sistemleri", "Soğutma ve iklimlendirme"]
        : ["Boiler service", "Air-conditioner service", "Water-heater service", "Natural-gas heating systems", "Refrigeration and HVAC"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "MYK Mesleki Yeterlilik Belgesi — Doğal Gaz Isıtma ve Gaz Yakıcı Cihaz Servis Personeli (Seviye 4)",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "MEB Usta Öğreticilik Belgesi — Soğutma ve İklimlendirme",
        credentialCategory: "certificate",
      },
    ],
  };
}

/**
 * Site-wide entity graph: Organization + LocalBusiness (HVACBusiness) + WebSite.
 * Rendered once, in the localised root layout.
 */
export function siteGraph(locale: Locale, site: SiteContent) {
  const { contact } = site.footer;
  const sameAs = site.footer.social
    .map((s) => s.href)
    .filter((href) => /^https?:\/\//.test(href));

  // Address is free text, e.g.
  //   "Fevzi Çakmak Cd. No: 13/1\n34180 Bahçelievler / İstanbul / Türkiye"
  const [street = "", cityLine = ""] = contact.address.split("\n");
  const cityParts = cityLine.split("/").map((s) => s.trim());
  const postalMatch = cityParts[0]?.match(/^(\d{4,5})\s*(.*)$/);
  const postalCode = postalMatch?.[1];
  const locality = (postalMatch?.[2] || cityParts[0] || "").trim() || undefined;
  const region = cityParts[1] || undefined;
  const country = cityParts[2] || "Türkiye";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "HVACBusiness"],
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        alternateName: ALTERNATE_NAMES,
        url: `${SITE_URL}/${locale}`,
        logo: absoluteUrl("/brand/kayahan-logo.png"),
        image: absoluteUrl("/brand/kayahan-logo.png"),
        description: site.footer.description,
        foundingDate: "1976",
        founder: { "@id": FOUNDER_ID },
        // Emergency service line answers around the clock.
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        priceRange: "₺₺",
        ...(sameAs.length ? { sameAs } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: street.trim() || undefined,
          ...(postalCode ? { postalCode } : {}),
          ...(locality ? { addressLocality: locality } : {}),
          ...(region ? { addressRegion: region } : {}),
          addressCountry: country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: contact.phone.replace(/\s/g, ""),
            email: contact.email,
            contactType: "customer service",
            areaServed: "TR",
            availableLanguage: ["tr", "en"],
          },
          ...(contact.whatsapp
            ? [
                {
                  "@type": "ContactPoint",
                  telephone: `+${contact.whatsapp}`,
                  contactType: "customer support",
                  areaServed: "TR",
                  availableLanguage: ["tr", "en"],
                },
              ]
            : []),
        ],
        areaServed: SERVICE_DISTRICTS.map((name) => ({
          "@type": "AdministrativeArea",
          name,
          containedInPlace: { "@type": "City", name: "İstanbul" },
        })),
      },
      founderNode(locale),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

type PostLike = {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string;
  tags: string[];
  /** ISO 8601 */
  publishedAt: string;
  updatedAt: string;
};

/** `Blog` node listing the published posts — rendered on /<locale>/blog. */
export function blogGraph(locale: Locale, posts: PostLike[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/${locale}/blog#blog`,
    url: `${SITE_URL}/${locale}/blog`,
    name: `${SITE_NAME} Blog`,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/${locale}/blog/${p.slug}#post`,
      headline: p.title,
      url: `${SITE_URL}/${locale}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      ...(p.coverUrl ? { image: p.coverUrl } : {}),
    })),
  };
}

/**
 * `BlogPosting` for one article. `wordCount`/`articleBody` are passed in as
 * plain text (from the Markdown) so the graph never carries markup.
 */
export function blogPostingGraph(
  locale: Locale,
  post: PostLike,
  extra: { wordCount: number; bodyText: string },
) {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.excerpt || undefined,
    inLanguage: locale,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
    ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    wordCount: extra.wordCount,
    articleBody: extra.bodyText,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE_URL}/${locale}/blog#blog` },
  };
}

/**
 * `Service` node for a local-service landing page (kombi/klima/şofben or a
 * district page). `districts` narrows areaServed for district pages.
 */
export function serviceGraph(
  locale: Locale,
  input: { path: string; name: string; description: string; serviceType: string; districts?: readonly string[] },
) {
  const url = `${SITE_URL}/${locale}${input.path}`;
  const areas = input.districts ?? SERVICE_DISTRICTS;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: areas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
      containedInPlace: { "@type": "City", name: "İstanbul" },
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/${locale}/teklif-al`,
      availableLanguage: ["tr", "en"],
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

/** `FAQPage` rich-result markup from the FAQ page's question/answer cards. */
export function faqGraph(items: { title: string; text: string }[]) {
  const qa = items.filter((i) => i.title.trim() && i.text.trim());
  if (!qa.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((i) => ({
      "@type": "Question",
      name: i.title.trim(),
      acceptedAnswer: { "@type": "Answer", text: i.text.trim() },
    })),
  };
}

/** BreadcrumbList from the crumb trail already built for the page UI. */
export function breadcrumbGraph(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}
