import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, MapPin, Wrench } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceLanding } from "@/lib/content/ported/service";
import {
  BRAND_KINDS,
  BRAND_NAME,
  DISTRICT_KINDS,
  DISTRICT_NAME,
  SERVICE_LABEL,
  SERVICE_ROUTE,
  type BrandKind,
  type DistrictKind,
  type ServiceKind,
} from "@/lib/content/ported/service";
import { Markdown } from "@/components/blog/Markdown";
import "./ported.scss";

const UI: Record<Locale, { call: string; whatsapp: string; otherServices: string; districtsAria: string; brands: string; allBrands: string }> = {
  tr: { call: "Hemen ara", whatsapp: "WhatsApp", otherServices: "DİĞER SERVİSLERİMİZ", districtsAria: "Hizmet verdiğimiz ilçeler", brands: "MARKAYA GÖRE KOMBİ SERVİSİ", allBrands: "Tüm markalar" },
  en: { call: "Call now", whatsapp: "WhatsApp", otherServices: "OTHER SERVICES", districtsAria: "Districts we serve", brands: "BOILER SERVICE BY BRAND", allBrands: "All brands" },
};

/**
 * Local-service landing page: hero → intro + Markdown body → service cards →
 * FAQ (native <details>) → districts → CTA. `current` marks the page's own
 * link so the districts/services strips never link to themselves.
 */
export default function ServiceLandingPage({
  content,
  locale,
  phone,
  whatsapp,
  current,
}: {
  content: ServiceLanding;
  locale: Locale;
  phone: string;
  whatsapp?: string;
  current: { service?: ServiceKind; district?: DistrictKind; brand?: BrandKind };
}) {
  const c = content;
  const ui = UI[locale];
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const waHref = whatsapp ? `https://wa.me/${whatsapp}` : "";
  const quoteHref = `/${locale}/teklif-al`;
  const href = (route: string) => route.replace(/^\/tr/, `/${locale}`);

  return (
    <div className="cp-page sv-page">
      <section className="sv-hero">
        <div>
          <span className="cp-label">{c.heroEyebrow}</span>
          <h1>
            {c.heroTitle}
            <em>{c.heroAccent}</em>
          </h1>
          <p>{c.heroLead}</p>
          <div className="sv-hero-actions">
            <a href={telHref} className="sv-btn sv-btn--primary">
              <Phone /> {phone}
            </a>
            {waHref && (
              <a href={waHref} className="sv-btn sv-btn--ghost" target="_blank" rel="noopener noreferrer">
                <MessageCircle /> {ui.whatsapp}
              </a>
            )}
            <Link href={quoteHref} className="sv-btn sv-btn--ghost">
              {c.ctaLabel} <ArrowRight />
            </Link>
          </div>
        </div>
        {c.heroImage ? (
          <figure className="sv-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.heroImage} alt={c.heroImageAlt} fetchPriority="high" />
          </figure>
        ) : (
          <div className="sv-hero-art" aria-hidden="true">
            <Wrench />
          </div>
        )}
      </section>

      <section className="sv-body ep-section">
        <div className="sv-body-head">
          <span className="cp-label">{c.introLabel}</span>
          <h2>{c.introHeading}</h2>
        </div>
        <Markdown source={c.body} className="sv-prose" />
      </section>

      {c.services.length > 0 && (
        <section className="sv-services ep-section">
          <div className="sv-section-head">
            <span className="cp-label">{c.servicesLabel}</span>
            <h2>{c.servicesHeading}</h2>
          </div>
          <div className="sv-service-grid">
            {c.services.map((x, i) => (
              <article key={`${x.title}-${i}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {c.faq.length > 0 && (
        <section className="sv-faq ep-section">
          <div className="sv-section-head">
            <span className="cp-label">{c.faqLabel}</span>
            <h2>{c.faqHeading}</h2>
          </div>
          <div className="sv-faq-list">
            {c.faq.map((q, i) => (
              <details key={`${q.title}-${i}`} {...(i === 0 ? { open: true } : {})}>
                <summary>
                  <span>{q.title}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{q.text}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="sv-areas ep-section" id="bolgeler">
        <div className="sv-section-head">
          <span className="cp-label">{c.areasLabel}</span>
          <h2>{c.areasHeading}</h2>
          <p>{c.areasText}</p>
        </div>
        <ul className="sv-chips" aria-label={ui.districtsAria}>
          {DISTRICT_KINDS.map((d) =>
            current.district === d ? (
              <li key={d} className="is-current" aria-current="page">
                <MapPin /> {DISTRICT_NAME[d]}
              </li>
            ) : (
              <li key={d}>
                <Link href={`/${locale}/servis/${d}`}>
                  <MapPin /> {DISTRICT_NAME[d]}
                </Link>
              </li>
            ),
          )}
        </ul>
        {(current.service === "kombi" || current.brand) && (
          <div className="sv-other">
            <span className="cp-label">{ui.brands}</span>
            <ul>
              {current.brand && (
                <li>
                  <Link href={`/${locale}/kombi-servisi`}>
                    {ui.allBrands} <ArrowRight />
                  </Link>
                </li>
              )}
              {BRAND_KINDS.filter((b) => b !== current.brand).map((b) => (
                <li key={b}>
                  <Link href={`/${locale}/kombi-servisi/${b}`}>
                    {BRAND_NAME[b]} <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="sv-other">
          <span className="cp-label">{ui.otherServices}</span>
          <ul>
            {(Object.keys(SERVICE_ROUTE) as ServiceKind[])
              .filter((k) => k !== current.service)
              .map((k) => (
                <li key={k}>
                  <Link href={href(SERVICE_ROUTE[k])}>
                    {SERVICE_LABEL[k][locale]} <ArrowRight />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="sv-cta">
        <div>
          <h2>{c.ctaHeading}</h2>
          <p>{c.ctaText}</p>
        </div>
        <div className="sv-hero-actions">
          <a href={telHref} className="sv-btn sv-btn--light">
            <Phone /> {ui.call}
          </a>
          <Link href={quoteHref} className="sv-btn sv-btn--outline">
            {c.ctaLabel} <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
