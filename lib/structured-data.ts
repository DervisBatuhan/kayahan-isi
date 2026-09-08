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
  //   "Merkez Mah. Teknik Sok. No: 10\n34956 Tuzla / İstanbul / Türkiye"
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
        url: `${SITE_URL}/${locale}`,
        logo: absoluteUrl("/brand/kayahan-logo.png"),
        image: absoluteUrl("/brand/kayahan-logo.png"),
        description: site.footer.description,
        foundingDate: "1976",
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
        areaServed: [
          "Bahçelievler",
          "Bağcılar",
          "Bakırköy",
          "Güngören",
          "Zeytinburnu",
          "Esenler",
          "Bayrampaşa",
          "Küçükçekmece",
        ].map((name) => ({ "@type": "City", name })),
      },
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
