import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { LegalPage } from "@/components/pages/ported/LegalPage";
import { getSiteContent } from "@/lib/content/site.server";
import { getLegalContent } from "@/lib/content/ported/index.server";
import { buildPortedMetadata } from "@/lib/seo.server";
import { isLocale, locales } from "@/lib/i18n/config";

const KIND = "kullanim-kosullari";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/kullanim-kosullari">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, "/kullanim-kosullari");
}

export default async function Page({ params }: PageProps<"/[locale]/kullanim-kosullari">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [site, content] = await Promise.all([getSiteContent(locale), getLegalContent(KIND, locale)]);
  return (
    <PortedFrame site={site} family="legal" kind={KIND}>
      <LegalPage content={content} />
    </PortedFrame>
  );
}
