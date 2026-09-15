import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/blog/index.server";
import { formatPostDate } from "@/lib/blog/format";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Blog" };

const LOCALE_LABEL: Record<string, string> = { tr: "Türkçe", en: "English" };

export default async function AdminBlogList() {
  const rows = await getAllPostsForAdmin();
  const byLocale = rows.reduce<Record<string, typeof rows>>((acc, r) => {
    (acc[r.locale] ??= []).push(r);
    return acc;
  }, {});
  const published = rows.filter((r) => r.published).length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Blog</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {rows.length} yazı, {published} yayında. Her yazının kendi adresi vardır (
            <span className="font-mono">/tr/blog/yazi-adi</span>) ve yayınlananlar sitemap&apos;e otomatik eklenir.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/admin/design-pages/knowledge/blog"
            className="rounded-[4px] border border-line-strong bg-white px-3 py-2 text-[12.5px] font-semibold text-ink-700 hover:bg-surface-blue"
          >
            Sayfa başlığı & metinleri
          </Link>
          <Link
            href="/admin/blog/new"
            className="rounded-[4px] bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600"
          >
            + Yeni Yazı
          </Link>
        </div>
      </div>

      {rows.length === 0 && (
        <p className="mt-6 rounded-[6px] border border-line bg-white px-4 py-8 text-center text-[13px] text-ink-400">
          Henüz yazı yok. İlk yazıyı ekleyin — yayınlandığında{" "}
          <span className="font-mono">/tr/blog</span> sayfasında listelenir.
        </p>
      )}

      {Object.entries(byLocale).map(([locale, list]) => (
        <div key={locale} className="mt-6">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-label text-ink-400">
            {LOCALE_LABEL[locale] ?? locale}
          </h2>
          <div className="overflow-hidden rounded-[6px] border border-line bg-white">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-ink-400">
                <tr>
                  <th className="px-4 py-2 font-semibold">Başlık</th>
                  <th className="px-4 py-2 font-semibold">Tarih</th>
                  <th className="px-4 py-2 font-semibold">Durum</th>
                  <th className="px-4 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {list.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-blue/40">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/blog/${p.id}`} className="font-medium text-ink-800 hover:text-brand-600">
                        {p.title || "(başlıksız)"}
                      </Link>
                      <div className="font-mono text-[11.5px] text-ink-400">
                        /{p.locale}/blog/{p.slug}
                        {p.pairKey && <span className="ml-2 text-ink-300">⇄ {p.pairKey}</span>}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-ink-500">
                      {formatPostDate(p.publishedAt, p.locale as Locale)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          p.published ? "bg-brand-500/10 text-brand-600" : "bg-ink-400/10 text-ink-500"
                        }`}
                      >
                        {p.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Link href={`/admin/blog/${p.id}`} className="text-[12px] font-semibold text-brand-600 hover:underline">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
