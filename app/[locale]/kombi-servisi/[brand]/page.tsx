import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/pages/ported/ServiceLandingPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { getBrandContent } from "@/lib/content/ported/index.server";
import { getPortedMeta } from "@/lib/content/ported/meta";
import { BRAND_KINDS, BRAND_NAME, type BrandKind } from "@/lib/content/ported/service";
import { buildPortedMetadata } from "@/lib/seo.server";
import { isLocale, locales } from "@/lib/i18n/config";
import { faqGraph, jsonLdScript, serviceGraph } from "@/lib/structured-data";

type Props = PageProps<"/[locale]/kombi-servisi/[brand]">;

const isBrand = (v: string): v is BrandKind => (BRAND_KINDS as string[]).includes(v);

export function generateStaticParams() {
  return locales.flatMap((locale) => BRAND_KINDS.map((brand) => ({ locale, brand })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, brand } = await params;
  if (!isBrand(brand)) return {};
  return buildPortedMetadata(locale, `/kombi-servisi/${brand}`);
}

export default async function Page({ params }: Props) {
  const { locale, brand } = await params;
  if (!isLocale(locale) || !isBrand(brand)) notFound();
  const path = `/kombi-servisi/${brand}`;
  const [site, content] = await Promise.all([getSiteContent(locale), getBrandContent(brand, locale)]);
  const meta = getPortedMeta(path, locale);
  const faq = faqGraph(content.faq);
  const name = BRAND_NAME[brand];
  return (
    <PortedFrame site={site} family="brand" kind={brand}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceGraph(locale, {
              path,
              name: locale === "tr" ? `${name} Kombi Servisi` : `${name} Boiler Service`,
              description: meta.description,
              serviceType: `${name} boiler repair and maintenance`,
            }),
          ),
        }}
      />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }} />}
      <ServiceLandingPage
        content={content}
        locale={locale}
        phone={site.footer.contact.phone}
        whatsapp={site.footer.contact.whatsapp}
        current={{ service: "kombi", brand }}
      />
    </PortedFrame>
  );
}
