import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeDesign } from "./_home/HomeDesign";
import { getSiteContent } from "@/lib/content/site.server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL, buildAlternates, ogLocale } from "@/lib/seo";

const HOME_META: Record<Locale, { title: string; description: string }> = {
  tr: {
    title: "45 Yıllık Tecrübe, Geleceğin Teknolojisi",
    description:
      "Kayahan Isı; iklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında mühendislik odaklı çözümler üretir. 1976'dan bu yana 1400+ tamamlanan proje.",
  },
  en: {
    title: "45 Years of Experience, Technology of the Future",
    description:
      "Kayahan Isı delivers engineering-driven solutions across air conditioning, heating, cooling, insulation and energy. 1400+ completed projects since 1976.",
  },
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const meta = HOME_META[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url: `${SITE_URL}/${locale}`,
      title: meta.title,
      description: meta.description,
    },
    twitter: { title: meta.title, description: meta.description },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent(locale);
  return <HomeDesign content={content} />;
}
