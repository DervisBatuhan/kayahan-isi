import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { LeadNotesEditor } from "@/components/admin/LeadNotesEditor";
import { deleteLead } from "../actions";

export const metadata: Metadata = { title: "Talep Detayı" };

const TYPE_LABEL: Record<string, string> = { contact: "İletişim formu", quote: "Teklif formu" };

function parseFields(s: string): string[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (children == null || children === "" || children === "—") return null;
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 border-b border-line py-2.5 text-[13px] last:border-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="text-ink-800">{children}</dd>
    </div>
  );
}

export default async function LeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const fields = parseFields(lead.fields);
  const deleteWithId = deleteLead.bind(null, lead.id);

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/leads" className="text-[12.5px] font-semibold text-brand-600 hover:underline">
        ← Talepler
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">{lead.name}</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {TYPE_LABEL[lead.type] ?? lead.type} ·{" "}
            {lead.createdAt.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <LeadStatusSelect id={lead.id} status={lead.status} />
      </div>

      <div className="mt-6 rounded-[6px] border border-line bg-white p-5">
        <dl>
          <Row label="Ad Soyad">{lead.name}</Row>
          <Row label="Firma">{lead.company ?? "—"}</Row>
          {lead.phone.trim() ? (
            <Row label="Telefon">
              <a
                href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                className="text-brand-600 hover:underline"
              >
                {lead.phone}
              </a>
            </Row>
          ) : null}
          {lead.email ? (
            <Row label="E-posta">
              <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                {lead.email}
              </a>
            </Row>
          ) : null}
          <Row label="Konu">{lead.subject || "—"}</Row>
          <Row label="Proje türü">{lead.projectType || "—"}</Row>
          <Row label="Konum">{lead.location || "—"}</Row>
          <Row label="İlgi alanları">
            {fields.length ? (
              <span className="flex flex-wrap gap-1.5">
                {fields.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-surface-blue px-2 py-0.5 text-[11px] font-semibold text-brand-600"
                  >
                    {f}
                  </span>
                ))}
              </span>
            ) : (
              "—"
            )}
          </Row>
          <Row label="Kaynak">{lead.source || "—"}</Row>
        </dl>

        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
            {lead.type === "quote" ? "Proje detayı" : "Mesaj"}
          </p>
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-800">
            {lead.message || "—"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[6px] border border-line bg-white p-5">
        <h2 className="text-[13px] font-bold text-ink-900">İç notlar</h2>
        <p className="mt-0.5 mb-3 text-[12px] text-ink-500">Yalnızca panelde görünür.</p>
        <LeadNotesEditor id={lead.id} initial={lead.notes} />
      </div>

      <form action={deleteWithId} className="mt-5">
        <button
          type="submit"
          className="rounded-[4px] px-3 py-2 text-[12.5px] font-semibold text-danger-600 transition-colors hover:bg-danger-500/10"
        >
          Talebi sil
        </button>
      </form>
    </div>
  );
}
