import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/pages/ported/ServiceLandingPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { getDistrictContent } from "@/lib/content/ported/index.server";
import { getPortedMeta } from "@/lib/content/ported/meta";
import { DISTRICT_KINDS, DISTRICT_NAME, type DistrictKind } from "@/lib/content/ported/service";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { faqGraph, jsonLdScript, serviceGraph } from "@/lib/structured-data";

type Props = PageProps<"/[locale]/servis/[district]">;

const isDistrict = (v: string): v is DistrictKind => (DISTRICT_KINDS as string[]).includes(v);

export function generateStaticParams() {
  return locales.flatMap((locale) => DISTRICT_KINDS.map((district) => ({ locale, district })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, district } = await params;
  if (!isDistrict(district)) return {};
  return buildPortedMetadata(locale, `/servis/${district}`);
}

export default async function Page({ params }: Props) {
  const { locale, district } = await params;
  if (!isLocale(locale) || !isDistrict(district)) notFound();
  const path = `/servis/${district}`;
  const [site, content] = await Promise.all([getSiteContent(locale), getDistrictContent(district, locale)]);
  const meta = getPortedMeta(path, locale);
  const faq = faqGraph(content.faq);
  const name = DISTRICT_NAME[district];
  return (
    <PortedFrame site={site} family="district" kind={district}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceGraph(locale, {
              path,
              name: locale === "tr" ? `${name} Kombi, Klima ve Şofben Servisi` : `${name} Boiler, AC and Water-Heater Service`,
              description: meta.description,
              serviceType: "HVAC appliance repair and maintenance",
              districts: [name],
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
        current={{ district }}
      />
    </PortedFrame>
  );
}
