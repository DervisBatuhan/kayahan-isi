import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UtilityPage from "@/components/pages/ported/UtilityPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/iletisim";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/iletisim">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/iletisim">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const { contact } = site.footer;
  return (
    <PortedFrame site={site} crumbHref="/iletisim">
      <UtilityPage
        kind="contact"
        locale={locale}
        contact={{ phone: contact.phone, email: contact.email, address: contact.address, whatsapp: contact.whatsapp }}
      />
    </PortedFrame>
  );
}
