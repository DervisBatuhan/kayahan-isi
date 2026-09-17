"use client";

import { useState, useTransition } from "react";
import { saveSiteContent } from "@/lib/content/actions";
import { ACCENT_OPTIONS, ICON_OPTIONS } from "@/lib/content/constants";
import type { Locale } from "@/lib/i18n/config";
import type {
  ActivityArea,
  AuthorityContent,
  Feature,
  Milestone,
  SiteContent,
  Stat,
} from "@/lib/content/types";
import { Field, Panel, SaveBar, SectionCard, Select, TextArea, TextInput, useActiveSection } from "./fields";
import { ObjectListEditor, StringListEditor } from "./ListEditor";

// Section ids — must match the sidebar sub-links (Sidebar.tsx) and the
// `<Panel id="…">` values below. The sidebar is the only section menu; this
// editor just shows whichever one the URL hash selects.
const SECTION_IDS = [
  "hero",
  "stats",
  "activity-areas",
  "journey",
  "corporate-strength",
  "engineering",
  "home-bands",
  "founder",
  "authority",
  "cta-band",
  "service-focus",
] as const;

type HomeContent = Pick<
  SiteContent,
  | "hero"
  | "stats"
  | "activityAreas"
  | "journey"
  | "corporateStrength"
  | "engineering"
  | "homeBands"
  | "founder"
  | "authority"
  | "ctaBand"
  | "serviceFocus"
>;

export function HomeEditor({ locale, initial }: { locale: Locale; initial: HomeContent }) {
  const [data, setData] = useState<HomeContent>(initial);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const active = useActiveSection("hero", SECTION_IDS);

  function patch<K extends keyof HomeContent>(key: K, value: HomeContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      const res = await saveSiteContent(locale, data);
      setStatus(
        res.ok
          ? { ok: true, message: "Kaydedildi." }
          : { ok: false, message: res.error },
      );
    });
  }

  return (
    <div className="space-y-5 pb-20">
      <Panel
        active={active}
        id="hero"
        title="Hero"
        description="Ana sayfanın en üstündeki başlık bölümü."
      >
        <StringListEditor
          label="Başlık satırları"
          items={data.hero.titleLines}
          onChange={(v) => patch("hero", { ...data.hero, titleLines: v })}
        />
        <Field label="Vurgulu satır" hint="0 = ilk satır, 1 = ikinci satır…">
          <TextInput
            type="number"
            min={0}
            value={data.hero.accentLineIndex}
            onChange={(e) =>
              patch("hero", { ...data.hero, accentLineIndex: Number(e.target.value) || 0 })
            }
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Alt başlık (önce)">
            <TextInput
              value={data.hero.subtitlePre}
              onChange={(e) => patch("hero", { ...data.hero, subtitlePre: e.target.value })}
            />
          </Field>
          <Field label="Alt başlık (vurgulu)">
            <TextInput
              value={data.hero.subtitleAccent}
              onChange={(e) => patch("hero", { ...data.hero, subtitleAccent: e.target.value })}
            />
          </Field>
          <Field label="Alt başlık (sonra)">
            <TextInput
              value={data.hero.subtitlePost}
              onChange={(e) => patch("hero", { ...data.hero, subtitlePost: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Paragraf">
          <TextArea
            rows={3}
            value={data.hero.paragraph}
            onChange={(e) => patch("hero", { ...data.hero, paragraph: e.target.value })}
          />
        </Field>
        <LinkFields
          label="Bağlantı"
          value={data.hero.link}
          onChange={(v) => patch("hero", { ...data.hero, link: v })}
        />
      </Panel>

      <Panel
        active={active}
        id="stats"
        title="İstatistikler"
        description="Hero altındaki sayaç kartları."
      >
        <ObjectListEditor<Stat>
          label="İstatistikler"
          items={data.stats}
          onChange={(v) => patch("stats", v)}
          newItem={() => ({ value: "", label: "" })}
          addLabel="İstatistik ekle"
          renderRow={(item, update) => (
            <>
              <Field label="Değer">
                <TextInput value={item.value} onChange={(e) => update({ value: e.target.value })} />
              </Field>
              <Field label="Sonek (opsiyonel)">
                <TextInput
                  value={item.suffix ?? ""}
                  onChange={(e) => update({ suffix: e.target.value })}
                />
              </Field>
              <Field label="Etiket" className="sm:col-span-2">
                <TextInput value={item.label} onChange={(e) => update({ label: e.target.value })} />
              </Field>
            </>
          )}
        />
      </Panel>

      <Panel active={active} id="activity-areas" title="Faaliyet Alanlarımız">
        <Field label="Üst başlık (eyebrow)">
          <TextInput
            value={data.activityAreas.eyebrow}
            onChange={(e) =>
              patch("activityAreas", { ...data.activityAreas, eyebrow: e.target.value })
            }
          />
        </Field>
        <ObjectListEditor<ActivityArea>
          label="Alanlar"
          items={data.activityAreas.items}
          onChange={(v) => patch("activityAreas", { ...data.activityAreas, items: v })}
          newItem={() => ({ slug: "", title: "", description: "", accent: "turkuaz" })}
          addLabel="Alan ekle"
          renderRow={(item, update) => (
            <>
              <Field label="Slug">
                <TextInput value={item.slug} onChange={(e) => update({ slug: e.target.value })} />
              </Field>
              <Field label="Başlık">
                <TextInput value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </Field>
              <Field label="Açıklama" className="sm:col-span-2">
                <TextInput
                  value={item.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </Field>
              <Field label="Renk">
                <Select
                  value={item.accent}
                  onChange={(e) => update({ accent: e.target.value as ActivityArea["accent"] })}
                >
                  {ACCENT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </>
          )}
        />
      </Panel>

      <Panel
        active={active}
        id="journey"
        title="Yolculuğumuz"
        description="Zaman çizelgesi / mil taşları."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Üst başlık (eyebrow)">
            <TextInput
              value={data.journey.eyebrow}
              onChange={(e) => patch("journey", { ...data.journey, eyebrow: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Paragraf">
          <TextArea
            rows={2}
            value={data.journey.paragraph}
            onChange={(e) => patch("journey", { ...data.journey, paragraph: e.target.value })}
          />
        </Field>
        <LinkFields
          label="Bağlantı"
          value={data.journey.cta}
          onChange={(v) => patch("journey", { ...data.journey, cta: v })}
        />
        <ObjectListEditor<Milestone>
          label="Mil taşları"
          items={data.journey.milestones}
          onChange={(v) => patch("journey", { ...data.journey, milestones: v })}
          newItem={() => ({ year: "", title: "", description: "", accent: "turkuaz" })}
          addLabel="Mil taşı ekle"
          renderRow={(item, update) => (
            <>
              <Field label="Yıl">
                <TextInput value={item.year} onChange={(e) => update({ year: e.target.value })} />
              </Field>
              <Field label="Başlık">
                <TextInput value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </Field>
              <Field label="Açıklama" className="sm:col-span-2">
                <TextInput
                  value={item.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </Field>
              <Field label="Renk">
                <Select
                  value={item.accent}
                  onChange={(e) => update({ accent: e.target.value as Milestone["accent"] })}
                >
                  {ACCENT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </>
          )}
        />
      </Panel>

      <FeatureSection
        active={active}
        id="corporate-strength"
        title="Kurumsal Gücümüz"
        eyebrow={data.corporateStrength.eyebrow}
        items={data.corporateStrength.items}
        onChange={(v) => patch("corporateStrength", { ...data.corporateStrength, ...v })}
      />

      <Panel active={active} id="engineering" title="Mühendislik Odaklı Çözümler">
        <Field label="Üst başlık (eyebrow)">
          <TextInput
            value={data.engineering.eyebrow}
            onChange={(e) => patch("engineering", { ...data.engineering, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="Paragraf">
          <TextArea
            rows={2}
            value={data.engineering.paragraph}
            onChange={(e) => patch("engineering", { ...data.engineering, paragraph: e.target.value })}
          />
        </Field>
        <LinkFields
          label="Bağlantı"
          value={data.engineering.cta}
          onChange={(v) => patch("engineering", { ...data.engineering, cta: v })}
        />
        <FeatureListEditor
          label="Adımlar"
          items={data.engineering.steps}
          onChange={(v) => patch("engineering", { ...data.engineering, steps: v })}
        />
        <FeatureListEditor
          label="Öne çıkanlar"
          items={data.engineering.callouts}
          onChange={(v) => patch("engineering", { ...data.engineering, callouts: v })}
        />
      </Panel>

      <Panel
        active={active}
        id="home-bands"
        title="Ana Sayfa Bantları"
        description="Hakkımızda, Projelerimiz, Sertifikalar ve Galeri/Basında bantları."
      >
        <div className="rounded-[6px] border border-line-strong p-4">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-label text-ink-400">Hakkımızda bandı</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Üst etiket">
              <TextInput value={data.homeBands.about.eyebrow} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Başlık — üst satır">
              <TextInput value={data.homeBands.about.titleTop} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, titleTop: e.target.value } })} />
            </Field>
            <Field label="Başlık — vurgulu satır">
              <TextInput value={data.homeBands.about.titleAccent} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, titleAccent: e.target.value } })} />
            </Field>
            <Field label="Buton metni">
              <TextInput value={data.homeBands.about.ctaLabel} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, ctaLabel: e.target.value } })} />
            </Field>
            <Field label="Buton adresi">
              <TextInput value={data.homeBands.about.ctaHref} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, ctaHref: e.target.value } })} />
            </Field>
            <Field label="Görsel yolu">
              <TextInput value={data.homeBands.about.image} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, image: e.target.value } })} />
            </Field>
            <Field label="Görsel alt metni">
              <TextInput value={data.homeBands.about.imageAlt} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, imageAlt: e.target.value } })} />
            </Field>
          </div>
          <Field label="Paragraf" className="mt-3">
            <TextArea rows={3} value={data.homeBands.about.paragraph} onChange={(e) => patch("homeBands", { ...data.homeBands, about: { ...data.homeBands.about, paragraph: e.target.value } })} />
          </Field>
        </div>

        <div className="rounded-[6px] border border-line-strong p-4">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-label text-ink-400">Projelerimiz bandı</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Üst etiket">
              <TextInput value={data.homeBands.projects.eyebrow} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Başlık — üst satır">
              <TextInput value={data.homeBands.projects.titleTop} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, titleTop: e.target.value } })} />
            </Field>
            <Field label="Başlık — alt satır">
              <TextInput value={data.homeBands.projects.titleBottom} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, titleBottom: e.target.value } })} />
            </Field>
            <Field label="Buton metni">
              <TextInput value={data.homeBands.projects.ctaLabel} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, ctaLabel: e.target.value } })} />
            </Field>
            <Field label="Buton adresi">
              <TextInput value={data.homeBands.projects.ctaHref} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, ctaHref: e.target.value } })} />
            </Field>
            <Field label="Görsel yolu">
              <TextInput value={data.homeBands.projects.image} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, image: e.target.value } })} />
            </Field>
            <Field label="Görsel alt metni">
              <TextInput value={data.homeBands.projects.imageAlt} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, imageAlt: e.target.value } })} />
            </Field>
            <Field label="Görsel üstü etiket">
              <TextInput value={data.homeBands.projects.overlayLabel} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, overlayLabel: e.target.value } })} />
            </Field>
            <Field label="Görsel üstü başlık">
              <TextInput value={data.homeBands.projects.overlayTitle} onChange={(e) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, overlayTitle: e.target.value } })} />
            </Field>
          </div>
          <ObjectListEditor
            label="Sayılar"
            items={data.homeBands.projects.facts}
            onChange={(v) => patch("homeBands", { ...data.homeBands, projects: { ...data.homeBands.projects, facts: v } })}
            newItem={() => ({ value: "", label: "" })}
            addLabel="Sayı ekle"
            renderRow={(item, update) => (
              <>
                <Field label="Değer">
                  <TextInput value={item.value} onChange={(e) => update({ value: e.target.value })} />
                </Field>
                <Field label="Etiket">
                  <TextInput value={item.label} onChange={(e) => update({ label: e.target.value })} />
                </Field>
              </>
            )}
          />
        </div>

        <div className="rounded-[6px] border border-line-strong p-4">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-label text-ink-400">Sertifikalar bandı</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Üst etiket">
              <TextInput value={data.homeBands.certificates.eyebrow} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Başlık — üst satır">
              <TextInput value={data.homeBands.certificates.titleTop} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, titleTop: e.target.value } })} />
            </Field>
            <Field label="Başlık — alt satır">
              <TextInput value={data.homeBands.certificates.titleBottom} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, titleBottom: e.target.value } })} />
            </Field>
            <Field label="Buton metni">
              <TextInput value={data.homeBands.certificates.ctaLabel} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, ctaLabel: e.target.value } })} />
            </Field>
            <Field label="Buton adresi">
              <TextInput value={data.homeBands.certificates.ctaHref} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, ctaHref: e.target.value } })} />
            </Field>
            <Field label="Kart alt notu">
              <TextInput value={data.homeBands.certificates.itemNote} onChange={(e) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, itemNote: e.target.value } })} />
            </Field>
          </div>
          <StringListEditor
            label="Kartlar"
            items={data.homeBands.certificates.items}
            onChange={(v) => patch("homeBands", { ...data.homeBands, certificates: { ...data.homeBands.certificates, items: v } })}
          />
        </div>

        <div className="rounded-[6px] border border-line-strong p-4">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-label text-ink-400">Galeri / Basında bandı</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Görsel yolu">
              <TextInput value={data.homeBands.media.image} onChange={(e) => patch("homeBands", { ...data.homeBands, media: { ...data.homeBands.media, image: e.target.value } })} />
            </Field>
            <Field label="Görsel alt metni">
              <TextInput value={data.homeBands.media.imageAlt} onChange={(e) => patch("homeBands", { ...data.homeBands, media: { ...data.homeBands.media, imageAlt: e.target.value } })} />
            </Field>
          </div>
          <ObjectListEditor
            label="Bağlantılar"
            items={data.homeBands.media.links}
            onChange={(v) => patch("homeBands", { ...data.homeBands, media: { ...data.homeBands.media, links: v } })}
            newItem={() => ({ eyebrow: "", title: "", href: "", icon: "images" as const })}
            addLabel="Bağlantı ekle"
            renderRow={(item, update) => (
              <>
                <Field label="Üst etiket">
                  <TextInput value={item.eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} />
                </Field>
                <Field label="Başlık">
                  <TextInput value={item.title} onChange={(e) => update({ title: e.target.value })} />
                </Field>
                <Field label="Adres">
                  <TextInput value={item.href} onChange={(e) => update({ href: e.target.value })} />
                </Field>
                <Field label="Simge">
                  <Select value={item.icon} onChange={(e) => update({ icon: e.target.value as "images" | "news" })}>
                    <option value="images">Galeri</option>
                    <option value="news">Haber</option>
                  </Select>
                </Field>
              </>
            )}
          />
        </div>
      </Panel>

      <Panel active={active} id="founder" title="Kurucu Hikâyesi">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Üst başlık (eyebrow)">
            <TextInput
              value={data.founder.eyebrow}
              onChange={(e) => patch("founder", { ...data.founder, eyebrow: e.target.value })}
            />
          </Field>
          <Field label="Başlık">
            <TextInput
              value={data.founder.title}
              onChange={(e) => patch("founder", { ...data.founder, title: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Giriş metni">
          <TextArea
            rows={2}
            value={data.founder.lead}
            onChange={(e) => patch("founder", { ...data.founder, lead: e.target.value })}
          />
        </Field>
        <StringListEditor
          label="Paragraflar"
          items={data.founder.paragraphs}
          onChange={(v) => patch("founder", { ...data.founder, paragraphs: v })}
          multiline
        />
        <StringListEditor
          label="Roller / unvanlar"
          items={data.founder.roles}
          onChange={(v) => patch("founder", { ...data.founder, roles: v })}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="İmza (isim)">
            <TextInput
              value={data.founder.signature}
              onChange={(e) => patch("founder", { ...data.founder, signature: e.target.value })}
            />
          </Field>
          <Field label="İmza (unvan)">
            <TextInput
              value={data.founder.signatureRole}
              onChange={(e) => patch("founder", { ...data.founder, signatureRole: e.target.value })}
            />
          </Field>
          <Field label="Filigran (yıl)">
            <TextInput
              value={data.founder.watermark}
              onChange={(e) => patch("founder", { ...data.founder, watermark: e.target.value })}
            />
          </Field>
        </div>
      </Panel>

      <Panel active={active} id="authority" title="Kurumsal Otorite">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Üst başlık (eyebrow)">
            <TextInput
              value={data.authority.eyebrow}
              onChange={(e) => patch("authority", { ...data.authority, eyebrow: e.target.value })}
            />
          </Field>
          <Field label="Başlık">
            <TextInput
              value={data.authority.title}
              onChange={(e) => patch("authority", { ...data.authority, title: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Giriş metni">
          <TextArea
            rows={2}
            value={data.authority.lead}
            onChange={(e) => patch("authority", { ...data.authority, lead: e.target.value })}
          />
        </Field>
        <FeatureListEditor
          label="Maddeler"
          items={data.authority.items}
          onChange={(v) => patch("authority", { ...data.authority, items: v } as AuthorityContent)}
        />
      </Panel>

      <Panel
        active={active}
        id="cta-band"
        title="Kapanış Bandı"
        description="Sayfa altındaki çağrı bandı."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Başlık">
            <TextInput
              value={data.ctaBand.title}
              onChange={(e) => patch("ctaBand", { ...data.ctaBand, title: e.target.value })}
            />
          </Field>
          <Field label="Alt başlık">
            <TextInput
              value={data.ctaBand.subtitle}
              onChange={(e) => patch("ctaBand", { ...data.ctaBand, subtitle: e.target.value })}
            />
          </Field>
        </div>
        <LinkFields
          label="Bağlantı"
          value={data.ctaBand.cta}
          onChange={(v) => patch("ctaBand", { ...data.ctaBand, cta: v })}
        />
      </Panel>

      <Panel
        active={active}
        id="service-focus"
        title="Servis"
        description="Servis odaklı katman: hero düğmeleri, hero altındaki servis şeridi, üst menü düğmesi ve rozeti, mobil alt çubuk ve /servis-talebi formu."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <LinkFields
            label="Hero — birincil düğme (turuncu)"
            value={data.serviceFocus.heroPrimary}
            onChange={(v) => patch("serviceFocus", { ...data.serviceFocus, heroPrimary: v })}
          />
          <LinkFields
            label="Hero — ikincil düğme"
            value={data.serviceFocus.heroSecondary}
            onChange={(v) => patch("serviceFocus", { ...data.serviceFocus, heroSecondary: v })}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Mobil menü düğmesi — yazı" hint="Yalnızca mobil menüde görünür; boş = gizli">
            <TextInput
              value={data.serviceFocus.headerCta.label}
              onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, headerCta: { ...data.serviceFocus.headerCta, label: e.target.value } })}
            />
          </Field>
          <Field label="Mobil menü düğmesi — bağlantı" hint="tel:+90… ya da /tr/servis-talebi">
            <TextInput
              value={data.serviceFocus.headerCta.href}
              onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, headerCta: { ...data.serviceFocus.headerCta, href: e.target.value } })}
            />
          </Field>
          <Field label="SERVİS menü rozeti" hint="Örn. 7/24 — boş = rozet yok">
            <TextInput
              value={data.serviceFocus.navBadge}
              onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, navBadge: e.target.value })}
            />
          </Field>
        </div>

        <SectionCard title="Hero altı servis şeridi">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Üst etiket">
              <TextInput value={data.serviceFocus.strip.eyebrow} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Başlık">
              <TextInput value={data.serviceFocus.strip.title} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, title: e.target.value } })} />
            </Field>
          </div>
          <Field label="Metin">
            <TextArea rows={3} value={data.serviceFocus.strip.text} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, text: e.target.value } })} />
          </Field>
          <StringListEditor
            label="Kanıt rozetleri (Aynı gün müdahale, Tüm markalar…)"
            items={data.serviceFocus.strip.proofs}
            onChange={(v) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, proofs: v } })}
          />
          <ObjectListEditor<{ title: string; text: string; href: string }>
            label="Servis kartları"
            items={data.serviceFocus.strip.items}
            onChange={(v) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, items: v } })}
            newItem={() => ({ title: "", text: "", href: "" })}
            addLabel="Kart ekle"
            renderRow={(item, update) => (
              <>
                <Field label="Başlık"><TextInput value={item.title} onChange={(e) => update({ title: e.target.value })} /></Field>
                <Field label="Bağlantı"><TextInput value={item.href} onChange={(e) => update({ href: e.target.value })} /></Field>
                <Field label="Metin" className="sm:col-span-2"><TextInput value={item.text} onChange={(e) => update({ text: e.target.value })} /></Field>
              </>
            )}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Ara düğmesi yazısı">
              <TextInput value={data.serviceFocus.strip.phoneLabel} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, phoneLabel: e.target.value } })} />
            </Field>
            <Field label="WhatsApp düğmesi yazısı">
              <TextInput value={data.serviceFocus.strip.whatsappLabel} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, whatsappLabel: e.target.value } })} />
            </Field>
            <Field label="Form düğmesi yazısı">
              <TextInput value={data.serviceFocus.strip.formLabel} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, strip: { ...data.serviceFocus.strip, formLabel: e.target.value } })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Mobil alt çubuk">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Ara"><TextInput value={data.serviceFocus.bar.call} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, bar: { ...data.serviceFocus.bar, call: e.target.value } })} /></Field>
            <Field label="WhatsApp"><TextInput value={data.serviceFocus.bar.whatsapp} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, bar: { ...data.serviceFocus.bar, whatsapp: e.target.value } })} /></Field>
            <Field label="Servis talebi"><TextInput value={data.serviceFocus.bar.form} onChange={(e) => patch("serviceFocus", { ...data.serviceFocus, bar: { ...data.serviceFocus.bar, form: e.target.value } })} /></Field>
          </div>
        </SectionCard>

        <SectionCard title="Servis talebi sayfası (/servis-talebi)">
          {(() => {
            const f = data.serviceFocus.form;
            const setF = (patchF: Partial<typeof f>) => patch("serviceFocus", { ...data.serviceFocus, form: { ...f, ...patchF } });
            const T = (key: keyof typeof f, label: string, hint?: string) => (
              <Field label={label} hint={hint}>
                <TextInput value={String(f[key])} onChange={(e) => setF({ [key]: e.target.value } as Partial<typeof f>)} />
              </Field>
            );
            return (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {T("eyebrow", "Üst etiket")}
                  {T("title", "Başlık", "Vurgulu satır için | kullanın: 20 saniyede | servis talebi.")}
                </div>
                <Field label="Giriş metni"><TextArea rows={2} value={f.lead} onChange={(e) => setF({ lead: e.target.value })} /></Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  {T("deviceLabel", "Cihaz — etiket")}
                  {T("brandLabel", "Marka — etiket")}
                  {T("brandPh", "Marka — yer tutucu")}
                  {T("districtLabel", "İlçe — etiket")}
                  {T("timingLabel", "Zaman — etiket")}
                  {T("nameLabel", "Ad Soyad — etiket")}
                  {T("phoneLabel", "Telefon — etiket")}
                  {T("noteLabel", "Açıklama — etiket")}
                  {T("notePh", "Açıklama — yer tutucu")}
                  {T("submit", "Gönder düğmesi")}
                  {T("sending", "Gönderiliyor yazısı")}
                  {T("okTitle", "Başarı başlığı")}
                  {T("okWhatsapp", "Başarı — WhatsApp düğmesi")}
                  {T("sideTitle", "Yan sütun başlığı")}
                </div>
                <Field label="Başarı metni"><TextArea rows={2} value={f.okText} onChange={(e) => setF({ okText: e.target.value })} /></Field>
                <StringListEditor label="Cihaz seçenekleri" items={f.devices} onChange={(v) => setF({ devices: v })} />
                <StringListEditor label="İlçe seçenekleri" items={f.districts} onChange={(v) => setF({ districts: v })} />
                <StringListEditor label="Zaman seçenekleri" items={f.timings} onChange={(v) => setF({ timings: v })} />
                <StringListEditor label="Yan sütun maddeleri" items={f.sidePoints} onChange={(v) => setF({ sidePoints: v })} />
              </>
            );
          })()}
        </SectionCard>
      </Panel>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function LinkFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { label: string; href: string };
  onChange: (v: { label: string; href: string }) => void;
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

function FeatureListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Feature[];
  onChange: (v: Feature[]) => void;
}) {
  return (
    <ObjectListEditor<Feature>
      label={label}
      items={items}
      onChange={onChange}
      newItem={() => ({ icon: "shield", title: "", description: "" })}
      addLabel="Madde ekle"
      renderRow={(item, update) => (
        <>
          <Field label="İkon">
            <Select value={item.icon} onChange={(e) => update({ icon: e.target.value as Feature["icon"] })}>
              {ICON_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Başlık">
            <TextInput value={item.title} onChange={(e) => update({ title: e.target.value })} />
          </Field>
          <Field label="Açıklama" className="sm:col-span-2">
            <TextInput value={item.description} onChange={(e) => update({ description: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
}

function FeatureSection({
  active,
  id,
  title,
  eyebrow,
  items,
  onChange,
}: {
  active: string;
  id: string;
  title: string;
  eyebrow: string;
  items: Feature[];
  onChange: (v: { eyebrow: string; items: Feature[] }) => void;
}) {
  return (
    <Panel active={active} id={id} title={title}>
      <Field label="Üst başlık (eyebrow)">
        <TextInput value={eyebrow} onChange={(e) => onChange({ eyebrow: e.target.value, items })} />
      </Field>
      <FeatureListEditor label="Maddeler" items={items} onChange={(v) => onChange({ eyebrow, items: v })} />
    </Panel>
  );
}
