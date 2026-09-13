import type { Metadata } from "next";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { getExpansionContent } from "@/lib/content/ported/index.server";
import {
  normalizePartnerItems,
  type PartnerItem,
} from "@/lib/content/ported/certificates-shared";

export const metadata: Metadata = { title: "Çözüm Ortakları" };

const LOCALES: { code: string; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
];

export default async function PartnersOverview() {
  const sets = await Promise.all(
    LOCALES.map(async (l) => ({
      ...l,
      items: normalizePartnerItems(
        (await getExpansionContent<Record<string, unknown>>("partners", l.code)).items,
      ),
    })),
  );

  const withLogo = sets[0]?.items.filter((i) => i.fileUrl).length ?? 0;
  const total = sets[0]?.items.length ?? 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Çözüm Ortakları</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Ana sayfadaki kayan bant ve "Çözüm Ortaklarımız" sayfasındaki markalar.{" "}
            {withLogo}/{total} markada logo yüklü. Marka eklemek, kaldırmak veya
            logo yüklemek için düzenleyiciyi açın.
          </p>
        </div>
        <Link
          href="/admin/design-pages/expansion/partners"
          className="shrink-0 rounded-[4px] bg-brand-600 px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-brand-700"
        >
          Düzenle
        </Link>
      </div>

      {sets.map((set) => (
        <div key={set.code} className="mt-6">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-label text-ink-400">
            {set.label}
          </h2>
          {set.items.length === 0 ? (
            <p className="rounded-[6px] border border-line bg-white px-4 py-6 text-center text-[13px] text-ink-400">
              Henüz marka eklenmedi.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {set.items.map((item, i) => (
                <PartnerCard key={`${item.title}-${i}`} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PartnerCard({ item, index }: { item: PartnerItem; index: number }) {
  return (
    <div className="flex gap-3 rounded-[6px] border border-line bg-white p-3">
      {item.fileUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.fileUrl}
          alt=""
          className="h-16 w-16 shrink-0 rounded-[4px] border border-line object-contain p-1.5"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[4px] border border-line bg-surface-muted text-ink-300">
          <Handshake className="h-6 w-6" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-ink-300">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="truncate text-[13.5px] font-semibold text-ink-800">{item.title}</p>
        {item.fileUrl ? (
          <p className="truncate text-[11.5px] text-ink-400">{item.fileName}</p>
        ) : (
          <span className="mt-1 inline-block rounded-full bg-ink-400/10 px-2 py-0.5 text-[11px] font-semibold text-ink-500">
            Logo yok
          </span>
        )}
      </div>
    </div>
  );
}
