"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { deleteBlogPost, saveBlogPost } from "@/lib/blog/actions";
import { slugFromTitle, type BlogPostInput } from "@/lib/blog/shared";
import { readingMinutes, wordCount } from "@/lib/blog/markdown";
import { deleteCertificateFile } from "@/lib/content/ported/certificate-actions";
import { locales } from "@/lib/i18n/config";
import { Markdown } from "@/components/blog/Markdown";
import "@/components/blog/blog.scss";
import { Field, SaveBar, SectionCard, Select, TextArea, TextInput } from "./fields";
import { StringListEditor } from "./ListEditor";

const COVER_ACCEPT = "image/png,image/jpeg,image/webp";

const MARKDOWN_HINT =
  "# Başlık · **kalın** · *italik* · - liste · 1. sıralı liste · > alıntı · [metin](https://…) · ![açıklama](görsel-url) · --- ayırıcı";

export function BlogPostEditor({ initial }: { initial: BlogPostInput }) {
  const [data, setData] = useState<BlogPostInput>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [preview, setPreview] = useState(false);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const router = useRouter();

  function patch(p: Partial<BlogPostInput>) {
    setData((d) => ({ ...d, ...p }));
  }

  function handleTitle(title: string) {
    patch(slugTouched ? { title } : { title, slug: slugFromTitle(title) });
  }

  function handleSave() {
    startTransition(async () => {
      const res = await saveBlogPost(data);
      if (res.ok) {
        setStatus({ ok: true, message: "Kaydedildi." });
        if (!data.id) router.push(`/admin/blog/${res.id}`);
        else router.refresh();
      } else {
        setStatus({ ok: false, message: res.error });
      }
    });
  }

  function handleDelete() {
    if (!data.id) return;
    if (!confirm("Bu yazıyı kalıcı olarak silmek istediğine emin misin?")) return;
    startTransition(async () => {
      await deleteBlogPost(data.id!);
    });
  }

  const words = wordCount(data.content);
  const publicPath = `/${data.locale}/blog/${data.slug || "…"}`;

  return (
    <div className="space-y-5 pb-20">
      <SectionCard title="Yazı">
        <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
          <Field label="Dil">
            <Select value={data.locale} onChange={(e) => patch({ locale: e.target.value as BlogPostInput["locale"] })}>
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Başlık" hint="Sayfa başlığı ve arama sonucundaki başlık (≤ 60 karakter idealdir).">
            <TextInput value={data.title} onChange={(e) => handleTitle(e.target.value)} maxLength={160} />
          </Field>
        </div>
        <Field label="Slug (URL)" hint={`Yazının adresi: ${publicPath}`}>
          <TextInput
            value={data.slug}
            onChange={(e) => {
              setSlugTouched(true);
              patch({ slug: e.target.value.toLowerCase() });
            }}
            onBlur={(e) => patch({ slug: slugFromTitle(e.target.value) })}
            maxLength={120}
            className="font-mono"
          />
        </Field>
        <Field
          label="Özet"
          hint={`Liste kartında ve Google açıklamasında görünür. ${data.excerpt.length}/320 — 120–160 karakter idealdir.`}
        >
          <TextArea rows={3} value={data.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} maxLength={320} />
        </Field>
      </SectionCard>

      <SectionCard title="Kapak görseli">
        <CoverField
          url={data.coverUrl}
          alt={data.coverAlt}
          onChange={(coverUrl, coverAlt) => patch({ coverUrl, coverAlt })}
        />
      </SectionCard>

      <SectionCard title="İçerik (Markdown)">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] text-ink-500">
            {words} kelime · ~{readingMinutes(data.content)} dk okuma
          </p>
          <div className="flex gap-1 rounded-[6px] border border-line bg-white p-1">
            {(["write", "preview"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPreview(mode === "preview")}
                className={`rounded-[4px] px-3 py-1 text-[12px] font-semibold transition-colors ${
                  preview === (mode === "preview") ? "bg-brand-500 text-white" : "text-ink-600 hover:bg-surface-blue"
                }`}
              >
                {mode === "write" ? "Yaz" : "Önizle"}
              </button>
            ))}
          </div>
        </div>
        {preview ? (
          <div className="rounded-[4px] border border-line bg-white px-6 py-5">
            {data.content.trim() ? (
              <Markdown source={data.content} className="blog-prose" />
            ) : (
              <p className="text-[13px] text-ink-400">Henüz içerik yok.</p>
            )}
          </div>
        ) : (
          <Field label="" hint={MARKDOWN_HINT}>
            <TextArea
              rows={22}
              value={data.content}
              onChange={(e) => patch({ content: e.target.value })}
              className="font-mono text-[13px] leading-relaxed"
              spellCheck={false}
            />
          </Field>
        )}
      </SectionCard>

      <SectionCard title="Yayın">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Yayın tarihi">
            <TextInput type="date" value={data.publishedAt} onChange={(e) => patch({ publishedAt: e.target.value })} />
          </Field>
          <Field
            label="Çeviri anahtarı"
            hint="TR ve EN sürümlerine aynı anahtarı verin; sayfalar birbirine bağlanır."
            className="sm:col-span-2"
          >
            <TextInput
              value={data.pairKey}
              onChange={(e) => patch({ pairKey: e.target.value })}
              placeholder="ör. isi-pompasi-2026"
              className="font-mono"
            />
          </Field>
        </div>
        <StringListEditor
          label="Etiketler"
          items={data.tags}
          onChange={(v) => patch({ tags: v })}
          placeholder="ör. ısı pompası"
        />
        <label className="flex items-center gap-2 text-[13px] font-medium text-ink-700">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => patch({ published: e.target.checked })}
            className="h-4 w-4 rounded border-line-strong"
          />
          Yayında
          <span className="text-[12px] font-normal text-ink-400">
            — işaretli değilse taslaktır; sitede ve sitemap&apos;te görünmez.
          </span>
        </label>
      </SectionCard>

      {data.id && (
        <div className="flex items-center justify-between">
          <a
            href={publicPath}
            target="_blank"
            rel="noreferrer"
            className="text-[12.5px] font-semibold text-brand-600 hover:underline"
          >
            Sitede aç ↗
          </a>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-[4px] px-3 py-2 text-[12.5px] font-semibold text-danger-600 transition-colors hover:bg-danger-500/10"
          >
            Yazıyı sil
          </button>
        </div>
      )}

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function CoverField({
  url,
  alt,
  onChange,
}: {
  url: string;
  alt: string;
  onChange: (url: string, alt: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    const previous = url;
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/certificate-upload",
        contentType: file.type || undefined,
      });
      onChange(blob.url, alt);
      if (previous && previous !== blob.url) void deleteCertificateFile(previous);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız.");
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    const previous = url;
    onChange("", "");
    if (previous) void deleteCertificateFile(previous);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
      <div className="aspect-[16/9] overflow-hidden rounded-[4px] border border-line bg-surface-muted">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-[12px] text-ink-400">Görsel yok</div>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-[4px] border border-line-strong bg-white px-3 py-1.5 text-[12.5px] font-semibold text-ink-700 hover:bg-surface-blue">
            {busy ? "Yükleniyor…" : url ? "Değiştir" : "Görsel yükle"}
            <input
              type="file"
              accept={COVER_ACCEPT}
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = "";
              }}
            />
          </label>
          {url && (
            <button
              type="button"
              onClick={clear}
              className="rounded-[4px] px-3 py-1.5 text-[12.5px] font-semibold text-danger-600 hover:bg-danger-500/10"
            >
              Kaldır
            </button>
          )}
          <span className="text-[12px] text-ink-400">PNG, JPG veya WebP · 1200×675 önerilir</span>
        </div>
        {error && <p className="text-[12.5px] font-semibold text-danger-600">{error}</p>}
        <Field label="Görsel açıklaması (alt)" hint="Erişilebilirlik ve görsel arama için kısa açıklama.">
          <TextInput value={alt} onChange={(e) => onChange(url, e.target.value)} maxLength={200} />
        </Field>
      </div>
    </div>
  );
}
