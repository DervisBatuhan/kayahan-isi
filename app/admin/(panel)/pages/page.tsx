import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { locales } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Sayfalar" };

export default async function AdminPagesList() {
  const rows = await prisma.page.findMany({
    where: { locale: { in: [...locales] } },
    orderBy: [{ locale: "asc" }, { order: "asc" }],
  });

  const byLocale = rows.reduce<Record<string, typeof rows>>((acc, r) => {
    (acc[r.locale] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Sayfalar</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Kurumsal, faaliyet alanları ve çözümler alt sayfalarının içeriği.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="shrink-0 rounded-[4px] bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600"
        >
          + Yeni Sayfa
        </Link>
      </div>

      {Object.entries(byLocale).map(([locale, list]) => (
        <div key={locale} className="mt-6">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-label text-ink-400">
            {locale}
          </h2>
          <div className="overflow-hidden rounded-[6px] border border-line bg-white">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-ink-400">
                <tr>
                  <th className="px-4 py-2 font-semibold">Başlık</th>
                  <th className="px-4 py-2 font-semibold">Slug</th>
                  <th className="px-4 py-2 font-semibold">Durum</th>
                  <th className="px-4 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {list.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-blue/40">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/pages/${p.id}`} className="font-medium text-ink-800 hover:text-brand-600">
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-ink-500">
                      /{p.locale}/{p.slug}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          p.published
                            ? "bg-brand-500/10 text-brand-600"
                            : "bg-ink-400/10 text-ink-500"
                        }`}
                      >
                        {p.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Link
                        href={`/admin/pages/${p.id}`}
                        className="text-[12px] font-semibold text-brand-600 hover:underline"
                      >
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
