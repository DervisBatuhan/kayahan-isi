import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { LeadStatusSelect, LEAD_STATUS_LABEL } from "@/components/admin/LeadStatusSelect";

export const metadata: Metadata = { title: "Talepler" };

const TYPE_LABEL: Record<string, string> = {
  contact: "İletişim",
  quote: "Teklif",
};

const FILTERS = [
  { value: "all", label: "Tümü" },
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "İletişime geçildi" },
  { value: "closed", label: "Kapatıldı" },
];

export default async function LeadsList({
  searchParams,
}: PageProps<"/admin/leads">) {
  const sp = await searchParams;
  const filter = typeof sp.status === "string" ? sp.status : "all";
  const where = filter !== "all" ? { status: filter } : {};

  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
  ]);

  const countFor = (s: string) =>
    s === "all"
      ? counts.reduce((n, c) => n + c._count, 0)
      : (counts.find((c) => c.status === s)?._count ?? 0);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[20px] font-extrabold text-ink-900">Talepler</h1>
      <p className="mt-1 text-[13px] text-ink-500">
        Teklif Al ve İletişim formlarından gelen kayıtlar.
      </p>

      <div className="mt-5 flex flex-wrap gap-1 rounded-[6px] border border-line bg-white p-1">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <Link
              key={f.value}
              href={f.value === "all" ? "/admin/leads" : `/admin/leads?status=${f.value}`}
              className={`rounded-[4px] px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                active ? "bg-brand-500 text-white" : "text-ink-600 hover:bg-surface-blue"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-[11px] ${active ? "text-white/80" : "text-ink-400"}`}>
                {countFor(f.value)}
              </span>
            </Link>
          );
        })}
      </div>

      {leads.length === 0 ? (
        <div className="mt-6 rounded-[6px] border border-dashed border-line bg-white p-10 text-center text-[13px] text-ink-500">
          Bu filtrede talep yok.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-[6px] border border-line bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-ink-400">
              <tr>
                <th className="px-4 py-2 font-semibold">Tarih</th>
                <th className="px-4 py-2 font-semibold">Tür</th>
                <th className="px-4 py-2 font-semibold">Ad</th>
                <th className="px-4 py-2 font-semibold">İletişim</th>
                <th className="px-4 py-2 font-semibold">Konu / Proje</th>
                <th className="px-4 py-2 font-semibold">Durum</th>
                <th className="px-4 py-2 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.map((l) => (
                <tr key={l.id} className="align-top hover:bg-surface-blue/40">
                  <td className="whitespace-nowrap px-4 py-2.5 text-[12px] text-ink-500">
                    {l.createdAt.toLocaleDateString("tr-TR")}
                    <br />
                    <span className="text-ink-400">
                      {l.createdAt.toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        l.type === "quote"
                          ? "bg-navy-700/10 text-navy-700"
                          : "bg-surface-blue text-brand-600"
                      }`}
                    >
                      {TYPE_LABEL[l.type] ?? l.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-medium text-ink-800">
                    <Link href={`/admin/leads/${l.id}`} className="hover:text-brand-600">
                      {l.name}
                    </Link>
                    {l.company ? (
                      <span className="block text-[11px] text-ink-400">{l.company}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-2.5 text-[12px] text-ink-600">
                    {l.phone}
                    {l.email ? (
                      <>
                        <br />
                        {l.email}
                      </>
                    ) : null}
                  </td>
                  <td className="px-4 py-2.5 text-[12px] text-ink-600">
                    {l.type === "quote"
                      ? [l.projectType, l.location].filter(Boolean).join(" · ") || "—"
                      : l.subject || "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    <LeadStatusSelect id={l.id} status={l.status} />
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <Link
                      href={`/admin/leads/${l.id}`}
                      className="text-[12px] font-semibold text-brand-600 hover:underline"
                    >
                      Detay
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-[11px] text-ink-400">
        Durum etiketleri: {Object.values(LEAD_STATUS_LABEL).join(" · ")}
      </p>
    </div>
  );
}
