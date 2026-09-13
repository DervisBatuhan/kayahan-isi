import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/pages/ported/KnowledgePage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getKnowledgeContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/sikca-sorulan-sorular";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/sikca-sorulan-sorular">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/sikca-sorulan-sorular">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getKnowledgeContent("faq", locale);
  return (
    <PortedFrame site={site} family="knowledge" kind="faq">
      <KnowledgePage kind="faq" content={content} contactHref={`/${locale}/iletisim`} />
    </PortedFrame>
  );
}
