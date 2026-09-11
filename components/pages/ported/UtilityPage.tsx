"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Wrench,
} from "lucide-react";
import { createLead } from "@/lib/leads/actions";
import type { LeadFieldErrors } from "@/lib/leads/schema";
import { useTurnstile } from "./FormTurnstile";
import "./ported.scss";

type UtilityKind = "references" | "contact" | "quote";
type Loc = "tr" | "en";

type ContactInfo = { phone: string; email: string; address: string; whatsapp?: string };

const DEFAULT_CONTACT: ContactInfo = {
  phone: "+90 212 441 88 88",
  email: "info@kayahanisi.com.tr",
  address: "Merkez Mah. Teknik Sok. No: 10\n34956 Tuzla / İstanbul",
  whatsapp: "905322153304",
};

/* ── translations ─────────────────────────────────────────────────────── */

const UT = {
  tr: {
    ref: {
      eyebrow: "REFERANSLAR",
      h1a: "İşimizi,",
      h1b: "işlerimiz anlatır.",
      sectors: [
        ["01", "KONUT", "Yaşam alanlarında dengeli iklim ve enerji performansı."],
        ["02", "TİCARİ YAPILAR", "Kesintisiz işletme için bütünleşik mekanik sistemler."],
        ["03", "ENDÜSTRİYEL", "Prosese özel, güvenilir ve ölçeklenebilir çözümler."],
        ["04", "KAMU & EĞİTİM", "Yoğun kullanıma uygun, uzun ömürlü sistem mimarisi."],
        ["05", "SAĞLIK", "Hassas hava kalitesi ve kontrollü iç ortam koşulları."],
        ["06", "TURİZM", "Konforu enerji verimliliğiyle buluşturan uygulamalar."],
      ],
      proofSince: "1976’DAN BUGÜNE",
      proofa: "Tamamlanan proje,",
      proofb: "sürdürülen güven.",
    },
    contact: {
      eyebrow: "İLETİŞİM",
      h1a: "Aynı masada,",
      h1b: "doğru çözümde.",
      city: "İSTANBUL",
      asideLabel: "BİZE ULAŞIN",
      asideH2a: "Projenizi",
      asideH2b: "konuşalım.",
      phone: "TELEFON",
      email: "E-POSTA",
      hq: "MERKEZ",
      formHead: "01 / İLETİŞİM FORMU",
      formSub: "Size nasıl yardımcı olabiliriz?",
      name: "AD SOYAD",
      namePh: "Adınız ve soyadınız",
      emailPh: "ornek@firma.com",
      phoneLbl: "TELEFON",
      subject: "KONU",
      subjectPh: "Bir konu seçin",
      subjectOpts: ["Genel Bilgi", "Teknik Destek", "İş Birliği", "Diğer"],
      msg: "MESAJ",
      msgPh: "Mesajınızı yazın",
      submit: "MESAJI GÖNDER",
      sending: "GÖNDERİLİYOR…",
      okLabel: "MESAJINIZ ALINDI",
      okH2a: "En kısa sürede",
      okH2b: "size dönüş yapacağız.",
      again: "YENİ MESAJ",
    },
    quote: {
      eyebrow: "TEKLİF AL",
      h1a: "İhtiyacı anlatın.",
      h1b: "Sistemi birlikte kuralım.",
      steps: ["ANALİZ", "TASARIM", "UYGULAMA"],
      briefLabel: "PROJE BRİEFİ",
      briefH2a: "Doğru teklif,",
      briefH2b: "doğru bilgiyle başlar.",
      briefP:
        "Temel proje bilgilerini paylaşın; teknik ekibimiz ihtiyacınıza uygun kapsamı oluştursun.",
      briefTag1: "Yapıya özel yaklaşım",
      briefTag2: "Teknik ekip değerlendirmesi",
      head1: "01 / İLETİŞİM",
      head1sub: "Yetkili bilgileri",
      head2: "02 / PROJE",
      head2sub: "Proje kapsamı",
      name: "AD SOYAD",
      namePh: "Adınız ve soyadınız",
      company: "FİRMA",
      companyPh: "Firma adı",
      email: "E-POSTA",
      emailPh: "ornek@firma.com",
      phone: "TELEFON",
      projectType: "PROJE TÜRÜ",
      projectTypePh: "Seçiniz",
      projectTypeOpts: ["Konut", "Ticari Yapı", "Endüstriyel Tesis", "Kamu / Eğitim", "Sağlık", "Turizm"],
      location: "PROJE KONUMU",
      locationPh: "İl / İlçe",
      fieldsLegend: "İLGİLENDİĞİNİZ ALANLAR",
      fields: ["İklimlendirme", "Isıtma", "Soğutma", "Yalıtım", "Enerji", "Bina Otomasyonu", "Servis & Bakım"],
      detail: "PROJE DETAYI",
      detailPh: "Yapı, ihtiyaç, mevcut sistem ve beklentilerinizi kısaca anlatın.",
      submit: "TEKLİF TALEBİNİ GÖNDER",
      sending: "GÖNDERİLİYOR…",
      okLabel: "TALEBİNİZ ALINDI",
      okH2a: "Projenizi inceleyip",
      okH2b: "sizinle iletişime geçeceğiz.",
      again: "YENİ TALEP",
    },
    err: {
      name: "Adınızı ve soyadınızı girin.",
      email: "Geçerli bir e-posta adresi girin.",
      phone: "Geçerli bir telefon numarası girin.",
      message: "Lütfen en az 10 karakterlik bir açıklama yazın.",
      projectType: "Proje türünü seçin.",
      form: "Lütfen işaretli alanları kontrol edin.",
      server: "Talebiniz kaydedilemedi. Lütfen daha sonra tekrar deneyin.",
    },
  },
  en: {
    ref: {
      eyebrow: "REFERENCES",
      h1a: "Our work",
      h1b: "speaks for itself.",
      sectors: [
        ["01", "HOUSING", "Balanced climate and energy performance in living spaces."],
        ["02", "COMMERCIAL BUILDINGS", "Integrated mechanical systems for uninterrupted operation."],
        ["03", "INDUSTRIAL", "Process-specific, reliable and scalable solutions."],
        ["04", "PUBLIC & EDUCATION", "Long-lasting system architecture for heavy use."],
        ["05", "HEALTHCARE", "Precise air quality and controlled indoor conditions."],
        ["06", "TOURISM", "Applications that pair comfort with energy efficiency."],
      ],
      proofSince: "SINCE 1976",
      proofa: "Completed projects,",
      proofb: "sustained trust.",
    },
    contact: {
      eyebrow: "CONTACT",
      h1a: "At the same table,",
      h1b: "at the right solution.",
      city: "ISTANBUL",
      asideLabel: "REACH US",
      asideH2a: "Let's talk",
      asideH2b: "about your project.",
      phone: "PHONE",
      email: "EMAIL",
      hq: "HEAD OFFICE",
      formHead: "01 / CONTACT FORM",
      formSub: "How can we help you?",
      name: "FULL NAME",
      namePh: "Your name and surname",
      emailPh: "example@company.com",
      phoneLbl: "PHONE",
      subject: "SUBJECT",
      subjectPh: "Choose a subject",
      subjectOpts: ["General Information", "Technical Support", "Partnership", "Other"],
      msg: "MESSAGE",
      msgPh: "Write your message",
      submit: "SEND MESSAGE",
      sending: "SENDING…",
      okLabel: "MESSAGE RECEIVED",
      okH2a: "We will get back to you",
      okH2b: "as soon as possible.",
      again: "NEW MESSAGE",
    },
    quote: {
      eyebrow: "GET A QUOTE",
      h1a: "Describe the need.",
      h1b: "Let's build the system together.",
      steps: ["ANALYSIS", "DESIGN", "DELIVERY"],
      briefLabel: "PROJECT BRIEF",
      briefH2a: "The right quote",
      briefH2b: "starts with the right information.",
      briefP:
        "Share the basic project details and our technical team will build a scope that fits your needs.",
      briefTag1: "A building-specific approach",
      briefTag2: "Technical team review",
      head1: "01 / CONTACT",
      head1sub: "Contact person",
      head2: "02 / PROJECT",
      head2sub: "Project scope",
      name: "FULL NAME",
      namePh: "Your name and surname",
      company: "COMPANY",
      companyPh: "Company name",
      email: "EMAIL",
      emailPh: "example@company.com",
      phone: "PHONE",
      projectType: "PROJECT TYPE",
      projectTypePh: "Select",
      projectTypeOpts: ["Housing", "Commercial Building", "Industrial Facility", "Public / Education", "Healthcare", "Tourism"],
      location: "PROJECT LOCATION",
      locationPh: "City / District",
      fieldsLegend: "AREAS YOU ARE INTERESTED IN",
      fields: ["Air Conditioning", "Heating", "Cooling", "Insulation", "Energy", "Building Automation", "Service & Maintenance"],
      detail: "PROJECT DETAILS",
      detailPh: "Briefly describe the building, the need, the existing system and your expectations.",
      submit: "SEND QUOTE REQUEST",
      sending: "SENDING…",
      okLabel: "REQUEST RECEIVED",
      okH2a: "We will review your project",
      okH2b: "and get in touch with you.",
      again: "NEW REQUEST",
    },
    err: {
      name: "Enter your name and surname.",
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
      message: "Please write a description of at least 10 characters.",
      projectType: "Select a project type.",
      form: "Please check the highlighted fields.",
      server: "Your request could not be saved. Please try again later.",
    },
  },
} satisfies Record<Loc, unknown>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s.-]{7,}$/;

function Reveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".up-reveal")];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="up-field-error" role="alert">
      {message}
    </span>
  );
}

/* ────────────────────────────── References ────────────────────────────── */

function ReferencePage({ t }: { t: (typeof UT)["tr"] }) {
  return (
    <>
      <section className="up-ref-hero">
        <div className="up-ref-title up-reveal">
          <span>{t.ref.eyebrow}</span>
          <h1>
            {t.ref.h1a}
            <br />
            <em>{t.ref.h1b}</em>
          </h1>
        </div>
        <div className="up-ref-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <b>45+</b>
        </div>
        <div className="up-ref-line" />
      </section>
      <section className="up-ref-grid">
        {t.ref.sectors.map((x, i) => (
          <article className="up-reveal" key={x[0]}>
            <div className="up-ref-top">
              <span>{x[0]}</span>
              <ArrowRight />
            </div>
            <div className={`up-ref-mark mark-${i + 1}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h2>{x[1]}</h2>
            <p>{x[2]}</p>
          </article>
        ))}
      </section>
      <section className="up-ref-proof">
        <span>{t.ref.proofSince}</span>
        <strong>
          1400<sup>+</sup>
        </strong>
        <p>
          {t.ref.proofa}
          <br />
          {t.ref.proofb}
        </p>
      </section>
    </>
  );
}

/* ─────────────────────────────── Contact ─────────────────────────────── */

function ContactPage({
  contact,
  t,
  locale,
}: {
  contact: ContactInfo;
  t: (typeof UT)["tr"];
  locale: Loc;
}) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const [startedAt] = useState(() => Date.now());
  const ts = useTurnstile();
  const telHref = useMemo(() => `tel:${contact.phone.replace(/[^\d+]/g, "")}`, [contact.phone]);

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const next: LeadFieldErrors = {};
    if (values.name.trim().length < 2) next.name = t.err.name;
    if (!EMAIL_RE.test(values.email.trim())) next.email = t.err.email;
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) next.phone = t.err.phone;
    if (values.message.trim().length < 10) next.message = t.err.message;
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    const res = await createLead({
      type: "contact",
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.subject,
      message: values.message,
      source: `/${locale}/iletisim`,
      locale,
      company_url: honeypot.current?.value ?? "",
      startedAt,
      turnstileToken: ts.token,
    });
    ts.reset();
    if (res.ok) {
      setStatus("ok");
    } else {
      setFormError(res.error || t.err.server);
      setStatus("error");
    }
  }

  return (
    <>
      <section className="up-contact-hero">
        <div className="up-reveal">
          <span>{t.contact.eyebrow}</span>
          <h1>
            {t.contact.h1a}
            <br />
            <em>{t.contact.h1b}</em>
          </h1>
        </div>
        <div className="up-contact-axis" aria-hidden="true">
          <i />
        </div>
      </section>
      <section className="up-contact-layout">
        <aside className="up-reveal">
          <span className="cp-label">{t.contact.asideLabel}</span>
          <h2>
            {t.contact.asideH2a}
            <br />
            {t.contact.asideH2b}
          </h2>
          <div className="up-contact-items">
            <a href={telHref}>
              <Phone />
              <div>
                <small>{t.contact.phone}</small>
                <b>{contact.phone}</b>
              </div>
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail />
              <div>
                <small>{t.contact.email}</small>
                <b>{contact.email}</b>
              </div>
            </a>
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                <div>
                  <small>WHATSAPP</small>
                  <b>+{contact.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5")}</b>
                </div>
              </a>
            )}
            <div>
              <MapPin />
              <div>
                <small>{t.contact.hq}</small>
                <b style={{ whiteSpace: "pre-line" }}>{contact.address}</b>
              </div>
            </div>
          </div>
        </aside>

        <form className="up-form up-reveal" onSubmit={submit} noValidate>
          {status === "ok" ? (
            <div className="up-success">
              <Check />
              <span>{t.contact.okLabel}</span>
              <h2>
                {t.contact.okH2a}
                <br />
                {t.contact.okH2b}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setValues({ name: "", email: "", phone: "", subject: "", message: "" });
                  setStatus("idle");
                }}
              >
                {t.contact.again}
              </button>
            </div>
          ) : (
            <>
              <div className="up-form-head">
                <span>{t.contact.formHead}</span>
                <p>{t.contact.formSub}</p>
              </div>

              {formError && (
                <p className="up-form-alert" role="alert">
                  {formError}
                </p>
              )}

              <input
                ref={honeypot}
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <label>
                {t.contact.name}
                <input
                  name="name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={t.contact.namePh}
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                />
                <FieldError message={errors.name} />
              </label>

              <div className="up-form-row">
                <label>
                  {t.contact.email}
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder={t.contact.emailPh}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  <FieldError message={errors.email} />
                </label>
                <label>
                  {t.contact.phoneLbl}
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+90"
                    aria-invalid={!!errors.phone}
                    autoComplete="tel"
                  />
                  <FieldError message={errors.phone} />
                </label>
              </div>

              <label>
                {t.contact.subject}
                <select
                  name="subject"
                  value={values.subject}
                  onChange={(e) => set("subject", e.target.value)}
                >
                  <option value="">{t.contact.subjectPh}</option>
                  {t.contact.subjectOpts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label>
                {t.contact.msg}
                <textarea
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={t.contact.msgPh}
                  aria-invalid={!!errors.message}
                />
                <FieldError message={errors.message} />
              </label>

              {ts.widget}

              <button
                className="up-submit"
                disabled={status === "submitting" || !ts.ready}
              >
                {status === "submitting" ? t.contact.sending : t.contact.submit} <Send />
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

/* ──────────────────────────────── Quote ─────────────────────────────── */

function QuotePage({ t, locale }: { t: (typeof UT)["tr"]; locale: Loc }) {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    message: "",
  });
  const [fields, setFields] = useState<string[]>([]);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const [startedAt] = useState(() => Date.now());
  const ts = useTurnstile();

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleField(name: string) {
    setFields((f) => (f.includes(name) ? f.filter((x) => x !== name) : [...f, name]));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const next: LeadFieldErrors = {};
    if (values.name.trim().length < 2) next.name = t.err.name;
    if (!EMAIL_RE.test(values.email.trim())) next.email = t.err.email;
    if (!PHONE_RE.test(values.phone.trim())) next.phone = t.err.phone;
    if (!values.projectType.trim()) next.projectType = t.err.projectType;
    if (values.message.trim().length < 10) next.message = t.err.message;
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    const res = await createLead({
      type: "quote",
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      projectType: values.projectType,
      location: values.location,
      fields,
      message: values.message,
      source: `/${locale}/teklif-al`,
      locale,
      company_url: honeypot.current?.value ?? "",
      startedAt,
      turnstileToken: ts.token,
    });
    ts.reset();
    if (res.ok) {
      setStatus("ok");
    } else {
      setFormError(res.error || t.err.server);
      setStatus("error");
    }
  }

  return (
    <>
      <section className="up-quote-hero">
        <div className="up-reveal">
          <span>{t.quote.eyebrow}</span>
          <h1>
            {t.quote.h1a}
            <br />
            <em>{t.quote.h1b}</em>
          </h1>
        </div>
        <div className="up-quote-diagram" aria-hidden="true">
          <i />
          <i />
          <i />
          {t.quote.steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
      <section className="up-quote-wrap">
        <div className="up-quote-intro up-reveal">
          <span className="cp-label">{t.quote.briefLabel}</span>
          <h2>
            {t.quote.briefH2a}
            <br />
            {t.quote.briefH2b}
          </h2>
          <p>{t.quote.briefP}</p>
          <div>
            <Building2 />
            <span>{t.quote.briefTag1}</span>
            <Wrench />
            <span>{t.quote.briefTag2}</span>
          </div>
        </div>

        <form className="up-form up-quote-form up-reveal" onSubmit={submit} noValidate>
          {status === "ok" ? (
            <div className="up-success">
              <Check />
              <span>{t.quote.okLabel}</span>
              <h2>
                {t.quote.okH2a}
                <br />
                {t.quote.okH2b}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setValues({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    projectType: "",
                    location: "",
                    message: "",
                  });
                  setFields([]);
                  setStatus("idle");
                }}
              >
                {t.quote.again}
              </button>
            </div>
          ) : (
            <>
              <div className="up-form-head">
                <span>{t.quote.head1}</span>
                <p>{t.quote.head1sub}</p>
              </div>

              {formError && (
                <p className="up-form-alert" role="alert">
                  {formError}
                </p>
              )}

              <input
                ref={honeypot}
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className="up-form-row">
                <label>
                  {t.quote.name}
                  <input
                    name="name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder={t.quote.namePh}
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                  />
                  <FieldError message={errors.name} />
                </label>
                <label>
                  {t.quote.company}
                  <input
                    name="company"
                    value={values.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder={t.quote.companyPh}
                    autoComplete="organization"
                  />
                </label>
              </div>

              <div className="up-form-row">
                <label>
                  {t.quote.email}
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder={t.quote.emailPh}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  <FieldError message={errors.email} />
                </label>
                <label>
                  {t.quote.phone}
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+90"
                    aria-invalid={!!errors.phone}
                    autoComplete="tel"
                  />
                  <FieldError message={errors.phone} />
                </label>
              </div>

              <div className="up-form-head up-form-step">
                <span>{t.quote.head2}</span>
                <p>{t.quote.head2sub}</p>
              </div>

              <div className="up-form-row">
                <label>
                  {t.quote.projectType}
                  <select
                    name="projectType"
                    value={values.projectType}
                    onChange={(e) => set("projectType", e.target.value)}
                    aria-invalid={!!errors.projectType}
                  >
                    <option value="">{t.quote.projectTypePh}</option>
                    {t.quote.projectTypeOpts.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <FieldError message={errors.projectType} />
                </label>
                <label>
                  {t.quote.location}
                  <input
                    name="location"
                    value={values.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder={t.quote.locationPh}
                  />
                </label>
              </div>

              <fieldset>
                <legend>{t.quote.fieldsLegend}</legend>
                <div className="up-checks">
                  {t.quote.fields.map((x) => (
                    <label key={x}>
                      <input
                        type="checkbox"
                        name="field"
                        value={x}
                        checked={fields.includes(x)}
                        onChange={() => toggleField(x)}
                      />
                      <span>{x}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                {t.quote.detail}
                <textarea
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={t.quote.detailPh}
                  aria-invalid={!!errors.message}
                />
                <FieldError message={errors.message} />
              </label>

              {ts.widget}

              <button
                className="up-submit"
                disabled={status === "submitting" || !ts.ready}
              >
                {status === "submitting" ? t.quote.sending : t.quote.submit} <ArrowRight />
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default function UtilityPage({
  kind,
  contact,
  locale = "tr",
}: {
  kind: UtilityKind;
  contact?: Partial<ContactInfo>;
  locale?: string;
}) {
  const loc: Loc = locale === "en" ? "en" : "tr";
  const t = UT[loc];
  const resolved: ContactInfo = { ...DEFAULT_CONTACT, ...contact };
  return (
    <div className={`cp-page up-page up-${kind}`}>
      <Reveal />
      {kind === "references" ? (
        <ReferencePage t={t} />
      ) : kind === "contact" ? (
        <ContactPage contact={resolved} t={t} locale={loc} />
      ) : (
        <QuotePage t={t} locale={loc} />
      )}
    </div>
  );
}
