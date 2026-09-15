import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/pages/ported/ServiceLandingPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { getServiceContent } from "@/lib/content/ported/index.server";
import { getPortedMeta } from "@/lib/content/ported/meta";
import { SERVICE_LABEL } from "@/lib/content/ported/service";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { faqGraph, jsonLdScript, serviceGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const KIND = "klima" as const;
const PATH = "/klima-servisi";

export async function generateMetadata({ params }: PageProps<"/[locale]/klima-servisi">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({ params }: PageProps<"/[locale]/klima-servisi">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [site, content] = await Promise.all([getSiteContent(locale), getServiceContent(KIND, locale)]);
  const meta = getPortedMeta(PATH, locale);
  const faq = faqGraph(content.faq);
  return (
    <PortedFrame site={site} family="service" kind={KIND}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceGraph(locale, { path: PATH, name: SERVICE_LABEL[KIND][locale], description: meta.description, serviceType: SERVICE_LABEL[KIND].en }),
          ),
        }}
      />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }} />}
      <ServiceLandingPage
        content={content}
        locale={locale}
        phone={site.footer.contact.phone}
        whatsapp={site.footer.contact.whatsapp}
        current={{ service: KIND }}
      />
    </PortedFrame>
  );
}
