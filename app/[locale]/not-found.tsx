import Link from "next/link";
import { getSiteContent } from "@/lib/content/site.server";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";

export const metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "Kurumsal · Corporate", href: "/tr/kurumsal" },
  { label: "Faaliyet Alanlarımız · Our Fields", href: "/tr/faaliyet-alanlari" },
  { label: "Çözümlerimiz · Our Solutions", href: "/tr/cozumler" },
  { label: "Referanslar · References", href: "/tr/referanslar" },
  { label: "İletişim · Contact", href: "/tr/iletisim" },
];

export default async function NotFound() {
  const site = await getSiteContent("tr");

  return (
    <main id="top">
      <SiteHeader content={site} />
      <section className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 sm:py-32">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-600">
          404
        </p>
        <h1 className="mt-4 font-display text-[34px] font-extrabold leading-tight text-ink-900 sm:text-[46px]">
          Aradığınız sayfa bulunamadı.
          <br />
          <span className="text-ink-500">This page could not be found.</span>
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
          Bağlantı güncel olmayabilir; aşağıdaki bölümlerden devam edebilirsiniz.
          <br />
          The link may be out of date; continue from the sections below.
        </p>
        <Link
          href="/tr"
          className="mt-8 inline-flex items-center rounded-[4px] bg-brand-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Ana sayfa / Home
        </Link>
        <ul className="mt-10 grid w-full gap-2 sm:grid-cols-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-[4px] border border-line bg-white px-4 py-3 text-[13.5px] font-semibold text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                {l.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter content={site} />
    </main>
  );
}
