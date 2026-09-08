"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePage, savePage, type PageInput } from "@/app/admin/(panel)/pages/actions";
import { locales } from "@/lib/i18n/config";
import { AddButton, Field, RemoveButton, SaveBar, SectionCard, Select, TextArea, TextInput } from "./fields";
import { StringListEditor } from "./ListEditor";

export function PageEditor({ initial }: { initial: PageInput }) {
  const [data, setData] = useState<PageInput>(initial);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const router = useRouter();

  function patch(p: Partial<PageInput>) {
    setData((d) => ({ ...d, ...p }));
  }

  function handleSave() {
    startTransition(async () => {
      const res = await savePage(data);
      if (res.ok) {
        setStatus({ ok: true, message: "Kaydedildi." });
        if (!data.id) router.push(`/admin/pages/${res.id}`);
      } else {
        setStatus({ ok: false, message: res.error });
      }
    });
  }

  function handleDelete() {
    if (!data.id) return;
    if (!confirm("Bu sayfayı kalıcı olarak silmek istediğine emin misin?")) return;
    startTransition(async () => {
      await deletePage(data.id!);
    });
  }

  return (
    <div className="space-y-5 pb-20">
      <SectionCard title="Sayfa">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Dil">
            <Select value={data.locale} onChange={(e) => patch({ locale: e.target.value })}>
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Slug" hint="ör. kurumsal/hakkimizda" className="sm:col-span-2">
            <TextInput value={data.slug} onChange={(e) => patch({ slug: e.target.value })} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Üst başlık (eyebrow)">
            <TextInput value={data.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          </Field>
          <Field label="Başlık">
            <TextInput value={data.title} onChange={(e) => patch({ title: e.target.value })} />
          </Field>
        </div>
        <Field label="Giriş metni">
          <TextArea rows={3} value={data.intro} onChange={(e) => patch({ intro: e.target.value })} />
        </Field>
        <StringListEditor
          label="Madde işaretleri"
          items={data.bullets}
          onChange={(v) => patch({ bullets: v })}
        />
        <ChildLinksEditor items={data.children} onChange={(v) => patch({ children: v })} />
        <div className="flex items-center gap-3">
          <Field label="Sıra" className="w-28">
            <TextInput
              type="number"
              value={data.order}
              onChange={(e) => patch({ order: Number(e.target.value) || 0 })}
            />
          </Field>
          <label className="mt-6 flex items-center gap-2 text-[13px] font-medium text-ink-700">
            <input
              type="checkbox"
              checked={data.published}
              onChange={(e) => patch({ published: e.target.checked })}
              className="h-4 w-4 rounded border-line-strong"
            />
            Yayında
          </label>
        </div>
      </SectionCard>

      {data.id && (
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-[4px] px-3 py-2 text-[12.5px] font-semibold text-danger-600 transition-colors hover:bg-danger-500/10"
        >
          Sayfayı sil
        </button>
      )}

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function ChildLinksEditor({
  items,
  onChange,
}: {
  items: { title: string; slug: string; text: string }[];
  onChange: (v: { title: string; slug: string; text: string }[]) => void;
}) {
  function update(i: number, patch: Partial<{ title: string; slug: string; text: string }>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <Field label="Alt sayfalar" hint="Bu sayfada listelenen alt bağlantılar.">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-[4px] border border-line-strong bg-surface-muted/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <Field label="Başlık">
                  <TextInput value={item.title} onChange={(e) => update(i, { title: e.target.value })} />
                </Field>
                <Field label="Slug">
                  <TextInput value={item.slug} onChange={(e) => update(i, { slug: e.target.value })} />
                </Field>
                <Field label="Açıklama" className="sm:col-span-2">
                  <TextInput value={item.text} onChange={(e) => update(i, { text: e.target.value })} />
                </Field>
              </div>
              <RemoveButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
            </div>
          </div>
        ))}
        <AddButton
          label="Alt sayfa ekle"
          onClick={() => onChange([...items, { title: "", slug: "", text: "" }])}
        />
      </div>
    </Field>
  );
}
