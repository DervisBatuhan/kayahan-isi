import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import "@/app/base.scss";
import { fontVariables } from "@/lib/fonts";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getSiteContent } from "@/lib/content/site.server";
import {
  SITE_NAME,
  SITE_URL,
  buildAlternates,
  ogLocale,
} from "@/lib/seo";
import { jsonLdScript, siteGraph } from "@/lib/structured-data";
import { Analytics } from "@/components/analytics/Analytics";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

/** Search-engine ownership tags (set the env vars to enable). */
const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
    : undefined,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const META: Record<
  Locale,
  { title: string; template: string; description: string }
> = {
  tr: {
    title: "Kayahan Isı — 45 Yıllık Tecrübe, Geleceğin Teknolojisi",
    template: "%s | Kayahan Isı",
    description:
      "İklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında mühendislik odaklı çözümler. 1976'dan bu yana Kayahan Isı.",
  },
  en: {
    title: "Kayahan Isı — 45 Years of Experience, Technology of the Future",
    template: "%s | Kayahan Isı",
    description:
      "Engineering-driven solutions in air conditioning, heating, cooling, insulation and energy. Kayahan Isı, since 1976.",
  },
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const meta = isLocale(locale) ? META[locale] : META.tr;
  const current: Locale = isLocale(locale) ? locale : "tr";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: meta.template },
    description: meta.description,
    applicationName: SITE_NAME,
    verification: VERIFICATION,
    alternates: buildAlternates(current, ""),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale(current),
      url: `${SITE_URL}/${current}`,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = await getSiteContent(locale);

  // Each page renders its own chrome: the homepage carries the ported design's
  // own header/footer; inner pages compose the shared Header/Footer themselves.
  return (
    <html lang={locale} className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-surface text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(siteGraph(locale, site)),
          }}
        />
        {children}
        <WhatsAppFloat phone={site.footer.contact.whatsapp} />
        <Analytics />
      </body>
    </html>
  );
}
