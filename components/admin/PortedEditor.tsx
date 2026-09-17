"use client";

import { useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { ArrowDown, ArrowUp, ExternalLink, Loader2, Upload, X } from "lucide-react";
import { savePortedContent, resetPortedContent } from "@/lib/content/ported/actions";
import { deleteCertificateFile } from "@/lib/content/ported/certificate-actions";
import {
  MEDIA_ACCEPT,
  isImageType,
  isVideoType,
  normalizeCertItems,
  type CertItem,
} from "@/lib/content/ported/certificates-shared";
import {
  getEditorSpec,
  type FieldSpec,
  type SectionSpec,
} from "@/lib/content/ported/editor-spec";
import {
  AddButton,
  Field,
  RemoveButton,
  SaveBar,
  SectionCard,
  TextArea,
  TextInput,
} from "./fields";

type Data = Record<string, unknown>;

let keySeq = 0;
/** Opaque, collision-free row key (used only for React reconciliation). */
function newKey() {
  keySeq += 1;
  return `k${keySeq}`;
}

export function PortedEditor({
  family,
  kind,
  locale,
  initial,
}: {
  family: string;
  kind: string;
  locale: string;
  initial: Data;
}) {
  const spec = getEditorSpec(family, kind);
  const [data, setData] = useState<Data>(initial);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function setKey(key: string, value: unknown) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      const res = await savePortedContent(family, kind, locale, data);
      setStatus(res.ok ? { ok: true, message: "Kaydedildi." } : { ok: false, message: res.error });
    });
  }

  function handleReset() {
    if (!confirm("Bu sayfayı varsayılan içeriğe döndürmek istiyor musun?")) return;
    startTransition(async () => {
      const res = await resetPortedContent(family, kind, locale);
      if (res.ok) {
        setStatus({ ok: true, message: "Varsayılana döndürüldü. Sayfayı yenile." });
      } else {
        setStatus({ ok: false, message: res.error });
      }
    });
  }

  return (
    <div className="space-y-5 pb-24">
      {spec.map((section: SectionSpec) => (
        <SectionCard key={section.title} title={section.title} description={section.description}>
          {section.fields.map((f) => (
            <FieldRenderer key={f.key} spec={f} value={data[f.key]} onChange={(v) => setKey(f.key, v)} />
          ))}
        </SectionCard>
      ))}

      <button
        type="button"
        onClick={handleReset}
        className="rounded-[4px] px-3 py-2 text-[12.5px] font-semibold text-danger-600 transition-colors hover:bg-danger-500/10"
      >
        Varsayılana döndür
      </button>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function FieldRenderer({
  spec,
  value,
  onChange,
}: {
  spec: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (spec.type === "text") {
    return (
      <Field label={spec.label} hint={spec.hint}>
        <TextInput value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      </Field>
    );
  }
  if (spec.type === "textarea") {
    return (
      <Field label={spec.label} hint={spec.hint}>
        <TextArea rows={3} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      </Field>
    );
  }
  if (spec.type === "stringList") {
    return (
      <ReorderableList<string>
        label={spec.label}
        hint={spec.hint}
        itemLabel={spec.itemLabel}
        items={Array.isArray(value) ? (value as string[]) : []}
        onChange={onChange as (v: string[]) => void}
        newItem={() => ""}
        render={(item, update) =>
          spec.multiline ? (
            <TextArea rows={2} value={item} onChange={(e) => update(e.target.value)} />
          ) : (
            <TextInput value={item} onChange={(e) => update(e.target.value)} />
          )
        }
      />
    );
  }
  if (spec.type === "namedTextList") {
    type NT = { title: string; text: string };
    return (
      <ReorderableList<NT>
        label={spec.label}
        hint={spec.hint}
        itemLabel={spec.itemLabel}
        items={Array.isArray(value) ? (value as NT[]) : []}
        onChange={onChange as (v: NT[]) => void}
        newItem={() => ({ title: "", text: "" })}
        render={(item, update) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Başlık">
              <TextInput value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} />
            </Field>
            <Field label="Açıklama">
              <TextInput value={item.text} onChange={(e) => update({ ...item, text: e.target.value })} />
            </Field>
          </div>
        )}
      />
    );
  }
  if (spec.type === "linkCardList") {
    type LC = { title: string; href: string; text: string; icon: string };
    return (
      <ReorderableList<LC>
        label={spec.label}
        hint={spec.hint}
        itemLabel={spec.itemLabel}
        items={Array.isArray(value) ? (value as LC[]) : []}
        onChange={onChange as (v: LC[]) => void}
        newItem={() => ({ title: "", href: "", text: "", icon: "" })}
        render={(item, update) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Başlık">
              <TextInput value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} />
            </Field>
            <Field label="Adres">
              <TextInput value={item.href} onChange={(e) => update({ ...item, href: e.target.value })} />
            </Field>
            <Field label="Açıklama" className="sm:col-span-2">
              <TextInput value={item.text} onChange={(e) => update({ ...item, text: e.target.value })} />
            </Field>
            <Field label="İkon anahtarı" hint="boş = varsayılan">
              <TextInput value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} />
            </Field>
          </div>
        )}
      />
    );
  }
  if (spec.type === "fileCardList") {
    const items = normalizeCertItems(value);
    return (
      <ReorderableList<CertItem>
        label={spec.label}
        hint={spec.hint}
        itemLabel={spec.itemLabel}
        items={items}
        onChange={onChange as (v: CertItem[]) => void}
        newItem={() => ({ title: "", fileUrl: "", fileName: "", contentType: "" })}
        beforeRemove={(item) => {
          if (item.fileUrl) void deleteCertificateFile(item.fileUrl);
        }}
        render={(item, update) => (
          <CertFileRow
            item={item}
            accept={spec.accept}
            hideTitle={spec.hideTitle}
            onChange={update}
          />
        )}
      />
    );
  }

  // objectList
  type Row = Record<string, string>;
  const columns = spec.columns;
  return (
    <ReorderableList<Row>
      label={spec.label}
      hint={spec.hint}
      itemLabel={spec.itemLabel}
      items={Array.isArray(value) ? (value as Row[]) : []}
      onChange={onChange as (v: Row[]) => void}
      newItem={() => Object.fromEntries(columns.map((c) => [c.key, ""]))}
      render={(item, update) => (
        <div className="grid gap-2 sm:grid-cols-2">
          {columns.map((col) => (
            <Field
              key={col.key}
              label={col.label}
              hint={col.hint}
              className={col.kind === "textarea" || col.kind === "media" ? "sm:col-span-2" : ""}
            >
              {col.kind === "media" ? (
                <MediaFileRow prefix={col.key} item={item} onChange={update} />
              ) : col.kind === "textarea" ? (
                <TextArea
                  rows={2}
                  value={item[col.key] ?? ""}
                  onChange={(e) => update({ ...item, [col.key]: e.target.value })}
                />
              ) : (
                <TextInput
                  value={item[col.key] ?? ""}
                  onChange={(e) => update({ ...item, [col.key]: e.target.value })}
                />
              )}
            </Field>
          ))}
        </div>
      )}
    />
  );
}

function ReorderableList<T>({
  label,
  hint,
  itemLabel,
  items,
  onChange,
  newItem,
  render,
  beforeRemove,
}: {
  label: string;
  hint?: string;
  itemLabel: string;
  items: T[];
  onChange: (v: T[]) => void;
  newItem: () => T;
  render: (item: T, update: (patch: T) => void) => React.ReactNode;
  /** Side effect to run for a row that is about to be removed (e.g. delete an
   *  uploaded file). Fire-and-forget; removal proceeds regardless. */
  beforeRemove?: (item: T) => void;
}) {
  // Stable per-row keys so reordering/removing a row keeps focus, IME state and
  // the cursor on the right field instead of index-matching a stale DOM node.
  // Every mutation goes through the handlers below, which keep `keys` in step;
  // if the parent ever swaps the array out of band, `keys[i] ?? i` still renders.
  const [keys, setKeys] = useState<string[]>(() => items.map(() => newKey()));

  function move(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x);
    setKeys((k) => {
      const nk = [...k];
      const [moved] = nk.splice(from, 1);
      nk.splice(to, 0, moved ?? newKey());
      return nk;
    });
    onChange(next);
  }

  function removeAt(i: number) {
    const removed = items[i];
    if (removed !== undefined) beforeRemove?.(removed);
    setKeys((k) => k.filter((_, idx) => idx !== i));
    onChange(items.filter((_, idx) => idx !== i));
  }

  function addOne() {
    setKeys((k) => [...k, newKey()]);
    onChange([...items, newItem()]);
  }

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={keys[i] ?? `row-${i}`}
            className="rounded-[4px] border border-line-strong bg-surface-muted/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                {itemLabel} {i + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label="Yukarı taşı"
                  className="rounded-[3px] p-1 text-ink-500 hover:bg-surface-blue hover:text-brand-600 disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === items.length - 1}
                  aria-label="Aşağı taşı"
                  className="rounded-[3px] p-1 text-ink-500 hover:bg-surface-blue hover:text-brand-600 disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <RemoveButton onClick={() => removeAt(i)} />
              </div>
            </div>
            {render(item, (patch) => {
              const next = [...items];
              next[i] = patch;
              onChange(next);
            })}
          </div>
        ))}
        <AddButton label={`${itemLabel} ekle`} onClick={addOne} />
      </div>
    </Field>
  );
}

/** Image / video upload inside an objectList row. Stores `<prefix>Url|Type|Name`. */
function MediaFileRow({
  prefix,
  item,
  onChange,
}: {
  prefix: string;
  item: Record<string, string>;
  onChange: (patch: Record<string, string>) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = item[`${prefix}Url`] ?? "";
  const type = item[`${prefix}Type`] ?? "";
  const name = item[`${prefix}Name`] ?? "";

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    const previousUrl = url;
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/certificate-upload",
        contentType: file.type || undefined,
      });
      onChange({
        ...item,
        [`${prefix}Url`]: blob.url,
        [`${prefix}Type`]: blob.contentType || file.type || "",
        [`${prefix}Name`]: file.name,
      });
      if (previousUrl && previousUrl !== blob.url) void deleteCertificateFile(previousUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız.");
    } finally {
      setBusy(false);
    }
  }

  function clearFile() {
    onChange({ ...item, [`${prefix}Url`]: "", [`${prefix}Type`]: "", [`${prefix}Name`]: "" });
    if (url) void deleteCertificateFile(url);
  }

  return (
    <div className="space-y-2">
      {url ? (
        <div className="flex items-center gap-3 rounded-[4px] border border-line bg-white p-2">
          {isVideoType(type) ? (
            <video src={url} muted playsInline preload="metadata" className="h-12 w-20 shrink-0 rounded-[3px] border border-line bg-black object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-12 w-20 shrink-0 rounded-[3px] border border-line object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-ink-800">{name || url}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand-600 hover:underline">
              Görüntüle <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <button type="button" onClick={clearFile} className="inline-flex items-center gap-1 rounded-[3px] px-2 py-1 text-[11.5px] font-medium text-danger-600 transition-colors hover:bg-danger-500/10">
            <X className="h-3.5 w-3.5" /> Kaldır
          </button>
        </div>
      ) : (
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-[4px] border border-dashed border-line-strong bg-white px-3 py-2 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-600">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {busy ? "Yükleniyor…" : "Görsel / video yükle"}
          <input
            type="file"
            accept={MEDIA_ACCEPT}
            hidden
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void handleFile(file);
            }}
          />
        </label>
      )}
      {error && <p className="text-[11.5px] text-danger-600">{error}</p>}
    </div>
  );
}

/** One certificate row: a title plus an uploaded PDF / image (Vercel Blob). */
function CertFileRow({
  item,
  accept,
  hideTitle,
  onChange,
}: {
  item: CertItem;
  accept: string;
  hideTitle?: boolean;
  onChange: (patch: CertItem) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    const previousUrl = item.fileUrl;
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/certificate-upload",
        contentType: file.type || undefined,
      });
      onChange({
        ...item,
        fileUrl: blob.url,
        fileName: file.name,
        contentType: blob.contentType || file.type || "",
      });
      if (previousUrl && previousUrl !== blob.url) {
        void deleteCertificateFile(previousUrl);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız.");
    } finally {
      setBusy(false);
    }
  }

  function clearFile() {
    const url = item.fileUrl;
    onChange({ ...item, fileUrl: "", fileName: "", contentType: "" });
    if (url) void deleteCertificateFile(url);
  }

  return (
    <div className="space-y-2">
      {!hideTitle && (
        <Field label="Başlık">
          <TextInput
            value={item.title}
            onChange={(e) => onChange({ ...item, title: e.target.value })}
          />
        </Field>
      )}

      {item.fileUrl ? (
        <div className="flex items-center gap-3 rounded-[4px] border border-line bg-white p-2">
          {isImageType(item.contentType) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.fileUrl}
              alt=""
              className="h-12 w-12 shrink-0 rounded-[3px] border border-line object-cover"
            />
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] border border-line bg-surface-muted text-[10px] font-bold text-ink-400">
              PDF
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-ink-800">{item.fileName}</p>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand-600 hover:underline"
            >
              Görüntüle <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="inline-flex items-center gap-1 rounded-[3px] px-2 py-1 text-[11.5px] font-medium text-danger-600 transition-colors hover:bg-danger-500/10"
          >
            <X className="h-3.5 w-3.5" /> Kaldır
          </button>
        </div>
      ) : (
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-[4px] border border-dashed border-line-strong bg-white px-3 py-2 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-600">
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {busy ? "Yükleniyor…" : "Dosya yükle (PDF / görsel)"}
          <input
            type="file"
            accept={accept}
            hidden
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void handleFile(file);
            }}
          />
        </label>
      )}

      {error && <p className="text-[11.5px] font-medium text-danger-600">{error}</p>}
    </div>
  );
}
