import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { getExpansionContent } from "@/lib/content/ported/index.server";
import {
  isImageType,
  normalizeCertItems,
  type CertItem,
} from "@/lib/content/ported/certificates-shared";

export const metadata: Metadata = { title: "Sertifikalar" };

const LOCALES: { code: string; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
];

export default async function CertificatesOverview() {
  const sets = await Promise.all(
    LOCALES.map(async (l) => ({
      ...l,
      items: normalizeCertItems(
        (await getExpansionContent<Record<string, unknown>>("certificates", l.code)).items,
      ),
    })),
  );

  const withFile = sets[0]?.items.filter((i) => i.fileUrl).length ?? 0;
  const total = sets[0]?.items.length ?? 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Sertifikalar</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Sertifikalarımız sayfasındaki belgeler. {withFile}/{total} belgede dosya
            yüklü. Dosya eklemek, değiştirmek veya sırayı düzenlemek için düzenleyiciyi
            açın.
          </p>
        </div>
        <Link
          href="/admin/design-pages/expansion/certificates"
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
              Belge yok.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {set.items.map((item, i) => (
                <CertCard key={`${item.title}-${i}`} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CertCard({ item, index }: { item: CertItem; index: number }) {
  return (
    <div className="flex gap-3 rounded-[6px] border border-line bg-white p-3">
      {item.fileUrl && isImageType(item.contentType) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.fileUrl}
          alt=""
          className="h-16 w-16 shrink-0 rounded-[4px] border border-line object-cover"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[4px] border border-line bg-surface-muted text-ink-300">
          <FileText className="h-6 w-6" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-ink-300">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="truncate text-[13.5px] font-semibold text-ink-800">{item.title}</p>
        {item.fileUrl ? (
          <>
            <p className="truncate text-[11.5px] text-ink-400">{item.fileName}</p>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand-600 hover:underline"
            >
              Görüntüle <ExternalLink className="h-3 w-3" />
            </a>
          </>
        ) : (
          <span className="mt-1 inline-block rounded-full bg-ink-400/10 px-2 py-0.5 text-[11px] font-semibold text-ink-500">
            Dosya yok
          </span>
        )}
      </div>
    </div>
  );
}
