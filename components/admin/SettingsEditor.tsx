"use client";

import { useState, useTransition } from "react";
import { saveSiteContent } from "@/lib/content/actions";
import { SOCIAL_ICON_OPTIONS } from "@/lib/content/constants";
import type { Locale } from "@/lib/i18n/config";
import type { NavItem, NavLink, SiteContent } from "@/lib/content/types";
import {
  AddButton,
  Field,
  Panel,
  RemoveButton,
  SaveBar,
  Select,
  TextInput,
  useActiveSection,
} from "./fields";
import { ObjectListEditor, StringListEditor } from "./ListEditor";

type SettingsContent = Pick<SiteContent, "brand" | "topBar" | "nav" | "footer">;

// Section ids — must match the sidebar sub-links (Sidebar.tsx). The sidebar is
// the only section menu; this editor shows whichever one the URL hash selects.
const SECTION_IDS = ["brand", "topbar", "nav", "footer"] as const;

export function SettingsEditor({ locale, initial }: { locale: Locale; initial: SettingsContent }) {
  const [data, setData] = useState<SettingsContent>(initial);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const active = useActiveSection("brand", SECTION_IDS);

  function patch<K extends keyof SettingsContent>(key: K, value: SettingsContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      const res = await saveSiteContent(locale, data);
      setStatus(res.ok ? { ok: true, message: "Kaydedildi." } : { ok: false, message: res.error });
    });
  }

  return (
    <div className="space-y-5 pb-20">
      <Panel active={active} id="brand" title="Marka">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Ad">
            <TextInput
              value={data.brand.name}
              onChange={(e) => patch("brand", { ...data.brand, name: e.target.value })}
            />
          </Field>
          <Field label="Etiket (tagline)">
            <TextInput
              value={data.brand.tagline}
              onChange={(e) => patch("brand", { ...data.brand, tagline: e.target.value })}
            />
          </Field>
        </div>
      </Panel>

      <Panel
        active={active}
        id="topbar"
        title="Üst Bar"
        description="Sayfanın en üstündeki ince bilgi çubuğu."
      >
        <StringListEditor
          label="Öne çıkanlar"
          items={data.topBar.highlights}
          onChange={(v) => patch("topBar", { ...data.topBar, highlights: v })}
        />
        <NavLinkListEditor
          label="Bağlantılar"
          items={data.topBar.links}
          onChange={(v) => patch("topBar", { ...data.topBar, links: v })}
        />
      </Panel>

      <Panel active={active} id="nav" title="Navigasyon" description="Üst menü ve alt menüler.">
        <NavItemsEditor items={data.nav.items} onChange={(v) => patch("nav", { ...data.nav, items: v })} />
        <div className="border-t border-line pt-4">
          <p className="mb-2 text-[12px] font-semibold text-ink-700">Menü butonu (CTA)</p>
          <LinkFields value={data.nav.cta} onChange={(v) => patch("nav", { ...data.nav, cta: v })} />
        </div>
      </Panel>

      <Panel active={active} id="footer" title="Footer">
        <Field label="Açıklama">
          <TextInput
            value={data.footer.description}
            onChange={(e) => patch("footer", { ...data.footer, description: e.target.value })}
          />
        </Field>
        <FooterColumnsEditor
          columns={data.footer.columns}
          onChange={(v) => patch("footer", { ...data.footer, columns: v })}
        />
        <div className="border-t border-line pt-4">
          <p className="mb-2 text-[12px] font-semibold text-ink-700">İletişim</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Başlık">
              <TextInput
                value={data.footer.contact.title}
                onChange={(e) =>
                  patch("footer", { ...data.footer, contact: { ...data.footer.contact, title: e.target.value } })
                }
              />
            </Field>
            <Field label="Telefon">
              <TextInput
                value={data.footer.contact.phone}
                onChange={(e) =>
                  patch("footer", { ...data.footer, contact: { ...data.footer.contact, phone: e.target.value } })
                }
              />
            </Field>
            <Field label="E-posta">
              <TextInput
                value={data.footer.contact.email}
                onChange={(e) =>
                  patch("footer", { ...data.footer, contact: { ...data.footer.contact, email: e.target.value } })
                }
              />
            </Field>
            <Field label="WhatsApp" hint="Sadece rakam, ör. 905322153304 — boş bırakılırsa link gizlenir">
              <TextInput
                value={data.footer.contact.whatsapp ?? ""}
                onChange={(e) =>
                  patch("footer", {
                    ...data.footer,
                    contact: { ...data.footer.contact, whatsapp: e.target.value.replace(/\D/g, "") },
                  })
                }
              />
            </Field>
            <Field label="Adres" hint="Satır sonları korunur.">
              <textarea
                rows={2}
                value={data.footer.contact.address}
                onChange={(e) =>
                  patch("footer", { ...data.footer, contact: { ...data.footer.contact, address: e.target.value } })
                }
                className="w-full resize-y rounded-[4px] border border-line bg-white px-3 py-2 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </Field>
          </div>
          <div className="mt-3">
            <LinkFields
              label="Bağlantı"
              value={data.footer.contact.cta}
              onChange={(v) => patch("footer", { ...data.footer, contact: { ...data.footer.contact, cta: v } })}
            />
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <ObjectListEditor
            label="Sosyal medya"
            items={data.footer.social}
            onChange={(v) => patch("footer", { ...data.footer, social: v })}
            newItem={() => ({ label: "", href: "", icon: "linkedin" as const })}
            addLabel="Sosyal bağlantı ekle"
            renderRow={(item, update) => (
              <>
                <Field label="Simge">
                  <Select value={item.icon} onChange={(e) => update({ icon: e.target.value as typeof item.icon })}>
                    {SOCIAL_ICON_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Etiket">
                  <TextInput value={item.label} onChange={(e) => update({ label: e.target.value })} />
                </Field>
                <Field label="Adres" className="sm:col-span-2">
                  <TextInput value={item.href} onChange={(e) => update({ href: e.target.value })} />
                </Field>
              </>
            )}
          />
        </div>

        <Field label="Telif hakkı metni">
          <TextInput
            value={data.footer.copyright}
            onChange={(e) => patch("footer", { ...data.footer, copyright: e.target.value })}
          />
        </Field>
      </Panel>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function LinkFields({
  label = "Bağlantı",
  value,
  onChange,
}: {
  label?: string;
  value: NavLink;
  onChange: (v: NavLink) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label={`${label} — metin`}>
        <TextInput value={value.label} onChange={(e) => onChange({ ...value, label: e.target.value })} />
      </Field>
      <Field label={`${label} — adres`}>
        <TextInput value={value.href} onChange={(e) => onChange({ ...value, href: e.target.value })} />
      </Field>
    </div>
  );
}

function NavLinkListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: NavLink[];
  onChange: (v: NavLink[]) => void;
}) {
  return (
    <ObjectListEditor<NavLink>
      label={label}
      items={items}
      onChange={onChange}
      newItem={() => ({ label: "", href: "" })}
      addLabel="Bağlantı ekle"
      renderRow={(item, update) => (
        <>
          <Field label="Metin">
            <TextInput value={item.label} onChange={(e) => update({ label: e.target.value })} />
          </Field>
          <Field label="Adres">
            <TextInput value={item.href} onChange={(e) => update({ href: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
}

function NavItemsEditor({
  items,
  onChange,
}: {
  items: NavItem[];
  onChange: (v: NavItem[]) => void;
}) {
  function update(i: number, patch: Partial<NavItem>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <Field label="Menü öğeleri">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-[4px] border border-line-strong bg-surface-muted/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <Field label="Etiket">
                  <TextInput value={item.label} onChange={(e) => update(i, { label: e.target.value })} />
                </Field>
                <Field label="Adres">
                  <TextInput value={item.href} onChange={(e) => update(i, { href: e.target.value })} />
                </Field>
              </div>
              <RemoveButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
            </div>
            <div className="mt-2 pl-3">
              <NavLinkListEditor
                label="Alt menü"
                items={item.children ?? []}
                onChange={(v) => update(i, { children: v })}
              />
            </div>
          </div>
        ))}
        <AddButton label="Menü öğesi ekle" onClick={() => onChange([...items, { label: "", href: "" }])} />
      </div>
    </Field>
  );
}

function FooterColumnsEditor({
  columns,
  onChange,
}: {
  columns: { title: string; links: NavLink[] }[];
  onChange: (v: { title: string; links: NavLink[] }[]) => void;
}) {
  function update(i: number, patch: Partial<{ title: string; links: NavLink[] }>) {
    const next = [...columns];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <Field label="Sütunlar">
      <div className="space-y-3">
        {columns.map((col, i) => (
          <div key={i} className="rounded-[4px] border border-line-strong bg-surface-muted/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <Field label="Başlık" className="flex-1">
                <TextInput value={col.title} onChange={(e) => update(i, { title: e.target.value })} />
              </Field>
              <RemoveButton onClick={() => onChange(columns.filter((_, idx) => idx !== i))} />
            </div>
            <div className="mt-2 pl-3">
              <NavLinkListEditor
                label="Bağlantılar"
                items={col.links}
                onChange={(v) => update(i, { links: v })}
              />
            </div>
          </div>
        ))}
        <AddButton label="Sütun ekle" onClick={() => onChange([...columns, { title: "", links: [] }])} />
      </div>
    </Field>
  );
}

