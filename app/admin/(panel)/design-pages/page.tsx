import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PORTED_ENTRIES } from "@/lib/content/ported/registry";

export const metadata: Metadata = { title: "Tasarım Sayfaları" };

export default async function DesignPagesList() {
  const rows = await prisma.portedContent.findMany({
    select: { family: true, kind: true, updatedAt: true, updatedBy: true },
  });
  const edited = new Map(rows.map((r) => [`${r.family}/${r.kind}`, r]));

  const groups = PORTED_ENTRIES.reduce<Record<string, typeof PORTED_ENTRIES>>((acc, e) => {
    (acc[e.group] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-[20px] font-extrabold text-ink-900">Tasarım Sayfaları</h1>
      <p className="mt-1 text-[13px] text-ink-500">
        Faaliyet alanları, çözümler ve bölüm sayfalarının tüm metinleri, kartları
        ve sıralamaları. Görsel düzen sabittir; içerik buradan yönetilir.
      </p>

      {Object.entries(groups).map(([group, entries]) => (
        <div key={group} className="mt-6">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-label text-ink-400">
            {group}
          </h2>
          <div className="overflow-hidden rounded-[6px] border border-line bg-white">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-ink-400">
                <tr>
                  <th className="px-4 py-2 font-semibold">Sayfa</th>
                  <th className="px-4 py-2 font-semibold">Adres</th>
                  <th className="px-4 py-2 font-semibold">Durum</th>
                  <th className="px-4 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {entries.map((e) => {
                  const row = edited.get(`${e.family}/${e.kind}`);
                  return (
                    <tr key={`${e.family}/${e.kind}`} className="hover:bg-surface-blue/40">
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/admin/design-pages/${e.family}/${e.kind}`}
                          className="font-medium text-ink-800 hover:text-brand-600"
                        >
                          {e.label}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-ink-500">{e.route}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            row
                              ? "bg-brand-500/10 text-brand-600"
                              : "bg-ink-400/10 text-ink-500"
                          }`}
                        >
                          {row ? "Düzenlendi" : "Varsayılan"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <Link
                          href={`/admin/design-pages/${e.family}/${e.kind}`}
                          className="text-[12px] font-semibold text-brand-600 hover:underline"
                        >
                          Düzenle
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
