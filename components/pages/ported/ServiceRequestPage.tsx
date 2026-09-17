"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { Check, Clock, MessageCircle, Phone, Send, ShieldCheck, Wrench } from "lucide-react";
import { createLead } from "@/lib/leads/actions";
import type { LeadFieldErrors } from "@/lib/leads/schema";
import type { SiteContent } from "@/lib/content/types";
import { useTurnstile } from "./FormTurnstile";
import "./ported.scss";

/**
 * /servis-talebi — the short repair/maintenance request form. Four taps
 * (appliance, district, timing, phone) is enough to dispatch; everything else
 * is optional. Copy comes from `site.serviceFocus.form` (panel: Ana Sayfa
 * İçeriği → Servis). Reuses the utility form styles (`.up-form`, `.up-checks`).
 */
const PHONE_RE = /^[0-9+()\s.-]{7,}$/;

const UI = {
  tr: {
    required: "Bu alan gerekli.",
    name: "Adınızı ve soyadınızı girin.",
    phone: "Geçerli bir telefon numarası girin.",
    kvkkPre: "",
    kvkkLink: "KVKK Aydınlatma Metni",
    kvkkPost: "'ni okudum, kişisel verilerimin servis talebimin karşılanması amacıyla işlenmesini kabul ediyorum.",
    kvkkErr: "KVKK Aydınlatma Metni'ni onaylamanız gerekir.",
    server: "Talebiniz kaydedilemedi. Lütfen telefonla ulaşın.",
    again: "Yeni talep",
    call: "Hemen ara",
  },
  en: {
    required: "This field is required.",
    name: "Enter your full name.",
    phone: "Enter a valid phone number.",
    kvkkPre: "I have read the ",
    kvkkLink: "Privacy Notice (KVKK)",
    kvkkPost: " and agree to the processing of my data to handle this service request.",
    kvkkErr: "You need to accept the privacy notice.",
    server: "We could not save your request. Please call us.",
    again: "New request",
    call: "Call now",
  },
} as const;

export default function ServiceRequestPage({ site }: { site: SiteContent }) {
  const locale = site.locale === "en" ? "en" : "tr";
  const f = site.serviceFocus.form;
  const u = UI[locale];
  const phone = site.footer.contact.phone;
  const tel = useMemo(() => `tel:${phone.replace(/[^\d+]/g, "")}`, [phone]);
  const wa = site.footer.contact.whatsapp ? `https://wa.me/${site.footer.contact.whatsapp}` : "";

  const [v, setV] = useState({ device: "", brand: "", district: "", timing: "", name: "", phone: "", message: "" });
  const [kvkk, setKvkk] = useState(false);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const [startedAt] = useState(() => Date.now());
  const ts = useTurnstile();

  function set<K extends keyof typeof v>(k: K, val: string) {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const next: LeadFieldErrors = {};
    if (!v.device) next.device = u.required;
    if (!v.district) next.district = u.required;
    if (v.name.trim().length < 2) next.name = u.name;
    if (!PHONE_RE.test(v.phone.trim())) next.phone = u.phone;
    if (!kvkk) next.kvkk = u.kvkkErr;
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrors({});
    const res = await createLead({
      type: "service",
      kvkk: true,
      name: v.name,
      phone: v.phone,
      device: v.device,
      brand: v.brand,
      district: v.district,
      timing: v.timing,
      message: v.message,
      source: `/${locale}/servis-talebi`,
      locale,
      company_url: honeypot.current?.value ?? "",
      startedAt,
      turnstileToken: ts.token,
    });
    ts.reset();
    if (res.ok) setStatus("ok");
    else {
      setFormError(res.error || u.server);
      setStatus("error");
    }
  }

  const waText = encodeURIComponent(
    locale === "en"
      ? `Hello, I need service. Appliance: ${v.device || "-"}, brand: ${v.brand || "-"}, district: ${v.district || "-"}.`
      : `Merhaba, servis talebim var. Cihaz: ${v.device || "-"}, marka: ${v.brand || "-"}, ilçe: ${v.district || "-"}.`,
  );

  const chips = (name: "device" | "district" | "timing", opts: readonly string[]) => (
    <div className="up-checks sr-chips" role="radiogroup" aria-invalid={!!errors[name]}>
      {opts.map((o) => (
        <label key={o}>
          <input type="radio" name={name} value={o} checked={v[name] === o} onChange={() => set(name, o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );

  return (
    <>
      <section className="up-contact-hero sr-hero">
        <div className="up-reveal">
          <span>{f.eyebrow}</span>
          <h1>
            {/* "üst satır | vurgulu satır" — the panel splits the title at the bar. */}
            {f.title.split("|")[0].trim()}
            {f.title.includes("|") && (
              <>
                <br />
                <em>{f.title.split("|").slice(1).join("|").trim()}</em>
              </>
            )}
          </h1>
        </div>
        <div className="up-contact-axis" aria-hidden="true">
          <i />
        </div>
      </section>

      <section className="up-contact-layout sr-layout">
        <aside className="up-reveal">
          <span className="cp-label">{f.sideTitle}</span>
          <p className="sr-lead">{f.lead}</p>
          <ul className="sr-points">
            {f.sidePoints.map((p) => (
              <li key={p}>
                <ShieldCheck /> {p}
              </li>
            ))}
          </ul>
          <div className="sr-quick">
            <a className="serviceBtn serviceBtn--call" href={tel}>
              <Phone /> {u.call} · {phone}
            </a>
            {wa && (
              <a className="serviceBtn serviceBtn--wa" href={`${wa}?text=${waText}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            )}
          </div>
        </aside>

        <form className="up-form up-reveal sr-form" onSubmit={submit} noValidate>
          {status === "ok" ? (
            <div className="up-success">
              <Check />
              <span>{f.eyebrow}</span>
              <h2>{f.okTitle}</h2>
              <p className="sr-ok-text">{f.okText}</p>
              <div className="sr-quick">
                {wa && (
                  <a className="serviceBtn serviceBtn--wa" href={`${wa}?text=${waText}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> {f.okWhatsapp}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setV({ device: "", brand: "", district: "", timing: "", name: "", phone: "", message: "" });
                    setKvkk(false);
                    setStatus("idle");
                  }}
                >
                  {u.again}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="up-form-head">
                <span>
                  <Wrench className="sr-head-ico" /> {f.eyebrow}
                </span>
                <p>
                  <Clock className="sr-head-ico" /> 7/24
                </p>
              </div>

              {formError && (
                <p className="up-form-alert" role="alert">
                  {formError}
                </p>
              )}

              <input ref={honeypot} type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

              <fieldset>
                <legend className={errors.device ? "is-invalid" : ""}>{f.deviceLabel}</legend>
                {chips("device", f.devices)}
              </fieldset>

              <div className="up-form-row">
                <label>
                  {f.brandLabel}
                  <input name="brand" value={v.brand} onChange={(e) => set("brand", e.target.value)} placeholder={f.brandPh} autoComplete="off" />
                </label>
                <label>
                  {f.districtLabel}
                  <select name="district" value={v.district} onChange={(e) => set("district", e.target.value)} aria-invalid={!!errors.district}>
                    <option value="">—</option>
                    {f.districts.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <span className="up-field-error" role="alert">{errors.district}</span>}
                </label>
              </div>

              <fieldset>
                <legend>{f.timingLabel}</legend>
                {chips("timing", f.timings)}
              </fieldset>

              <div className="up-form-row">
                <label>
                  {f.nameLabel}
                  <input name="name" value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} autoComplete="name" />
                  {errors.name && <span className="up-field-error" role="alert">{errors.name}</span>}
                </label>
                <label>
                  {f.phoneLabel}
                  <input name="phone" type="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05xx xxx xx xx" aria-invalid={!!errors.phone} autoComplete="tel" />
                  {errors.phone && <span className="up-field-error" role="alert">{errors.phone}</span>}
                </label>
              </div>

              <label>
                {f.noteLabel}
                <textarea name="message" rows={3} value={v.message} onChange={(e) => set("message", e.target.value)} placeholder={f.notePh} />
              </label>

              <label className={`up-consent${errors.kvkk ? " is-invalid" : ""}`}>
                <input
                  type="checkbox"
                  name="kvkk"
                  checked={kvkk}
                  onChange={(e) => {
                    setKvkk(e.target.checked);
                    if (errors.kvkk) setErrors((er) => ({ ...er, kvkk: undefined }));
                  }}
                  aria-invalid={!!errors.kvkk}
                />
                <span>
                  {u.kvkkPre}
                  <a href={`/${locale}/kvkk-aydinlatma-metni`} target="_blank" rel="noopener noreferrer">
                    {u.kvkkLink}
                  </a>
                  {u.kvkkPost}
                </span>
                {errors.kvkk && <span className="up-field-error" role="alert">{errors.kvkk}</span>}
              </label>

              {ts.widget}

              <button className="up-submit sr-submit" disabled={status === "submitting" || !ts.ready}>
                {status === "submitting" ? f.sending : f.submit} <Send />
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
