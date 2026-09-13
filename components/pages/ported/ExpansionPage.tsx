"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Download,
  FileBadge2,
  Mail,
  Newspaper,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";
import { normalizeCertItems, normalizePartnerItems } from "@/lib/content/ported/certificates-shared";
import "./ported.scss";

type Icon = ComponentType<{ className?: string }>;

const EP_CHROME = {
  tr: {
    viewCert: "BELGEYİ GÖRÜNTÜLE",
    viewCertAria: (x: string) => `${x} belgesini görüntüle`,
    partnerFallback: "Çözüm Ortağı",
    logoAreaLabel: "LOGO ALANI",
  },
  en: {
    viewCert: "VIEW CERTIFICATE",
    viewCertAria: (x: string) => `View the ${x} certificate`,
    partnerFallback: "Solution Partner",
    logoAreaLabel: "LOGO SPACE",
  },
};

export type ExpansionKind =
  | "board"
  | "message"
  | "certificates"
  | "gallery"
  | "press"
  | "career"
  | "projects"
  | "partners";

const VALUE_ICONS: Record<string, Icon> = {
  users: Users,
  briefcase: BriefcaseBusiness,
  shield: ShieldCheck,
  award: Award,
};

const PROJECT_ICONS: Record<string, Icon> = {
  building: Building2,
  check: CheckCircle2,
  shield: ShieldCheck,
};

type NumTitleText = { num: string; title: string; text: string };
type IconTitleText = { icon: string; title: string; text: string };
type ProjectStackItem = { icon: string; num: string; title: string };

type HeroVariant =
  | "orbit"
  | "certificates"
  | "gallery"
  | "press"
  | "career"
  | "projects"
  | "partners";

function PageHero({
  eyebrow,
  title,
  accent,
  variant = "orbit",
}: {
  eyebrow: string;
  title: string;
  accent: string;
  variant?: HeroVariant;
}) {
  return (
    <section className={`ep-hero ep-hero-${variant}`}>
      <div>
        <span>{eyebrow}</span>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
      </div>
      {variant === "orbit" ? (
        <div className="ep-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : (
        <div className="ep-hero-signature" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
    </section>
  );
}

function Board({ c }: { c: Record<string, unknown> }) {
  const governance = (c.governance as NumTitleText[]) ?? [];
  return (
    <>
      <PageHero
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-board ep-section">
        <div>
          <span className="cp-label">{String(c.introLabel ?? "")}</span>
          <h2>
            {String(c.introHeadingTop ?? "")}
            <br />
            {String(c.introHeadingAccent ?? "")}
          </h2>
        </div>
        <article className="ep-chair">
          <div className="ep-monogram">{String(c.chairMonogram ?? "")}</div>
          <span>{String(c.chairRole ?? "")}</span>
          <h3>{String(c.chairName ?? "")}</h3>
          <p>{String(c.chairText ?? "")}</p>
        </article>
      </section>
      <section className="ep-governance ep-section">
        {governance.map((x, i) => (
          <article key={`${x.num}-${i}`}>
            <span>{x.num}</span>
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function Message({ c }: { c: Record<string, unknown> }) {
  const paragraphs = (c.paragraphs as string[]) ?? [];
  return (
    <>
      <PageHero
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-message ep-section">
        <Quote />
        <div>
          <p className="ep-lead">{String(c.lead ?? "")}</p>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="ep-signature">
            <b>{String(c.signatureName ?? "")}</b>
            <span>{String(c.signatureRole ?? "")}</span>
          </div>
        </div>
      </section>
    </>
  );
}

function Certificates({ c, ep }: { c: Record<string, unknown>; ep: { viewCert: string; viewCertAria: (x: string) => string } }) {
  const items = normalizeCertItems(c.items);
  return (
    <>
      <PageHero
        variant="certificates"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-certs ep-section">
        <div className="ep-intro">
          <span className="cp-label">{String(c.introLabel ?? "")}</span>
          <h2>
            {String(c.introHeadingTop ?? "")}
            <br />
            {String(c.introHeadingAccent ?? "")}
          </h2>
          <p>{String(c.introBody ?? "")}</p>
        </div>
        <div className="ep-cert-grid">
          {items.map((x, i) => (
            <article key={`${x.title}-${i}`}>
              <FileBadge2 />
              <span>0{i + 1}</span>
              <h3>{x.title}</h3>
              {x.fileUrl && (
                <a
                  href={x.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ep.viewCertAria(x.title)}
                >
                  {ep.viewCert} <Download />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

const PARTNERS_PAGE_SIZE = 12;

function Partners({
  c,
  ep,
}: {
  c: Record<string, unknown>;
  ep: { partnerFallback: string; logoAreaLabel: string };
}) {
  // Rows come straight from the panel now — including logo-less slots an
  // admin added and hasn't uploaded to yet — so no synthetic placeholders.
  const items = normalizePartnerItems(c.items);
  const pageCount = Math.ceil(items.length / PARTNERS_PAGE_SIZE);
  const [page, setPage] = useState(0);
  const start = page * PARTNERS_PAGE_SIZE;
  const pageItems = items.slice(start, start + PARTNERS_PAGE_SIZE);

  return (
    <>
      <PageHero
        variant="partners"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-partners ep-section">
        <div className="ep-partners-heading">
          <div>
            <span className="cp-label">{String(c.introLabel ?? "")}</span>
            <h2>
              {String(c.introHeadingTop ?? "")}
              <br />
              {String(c.introHeadingAccent ?? "")}
            </h2>
          </div>
          <p>{String(c.introBody ?? "")}</p>
        </div>
        <div>
          <div className="ep-partner-grid">
            {pageItems.map((x, i) => (
              <article className="ep-partner-card" key={`${x.title}-${start + i}`}>
                {x.fileUrl ? (
                  <div className="ep-partner-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.fileUrl} alt={x.title} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="ep-partner-logo ep-partner-logo--empty">
                    <span>{ep.logoAreaLabel}</span>
                  </div>
                )}
                <div className="ep-partner-meta">
                  <span>{String(start + i + 1).padStart(2, "0")}</span>
                  <p>{x.title || ep.partnerFallback}</p>
                </div>
              </article>
            ))}
          </div>
          {pageCount > 1 && (
            <nav className="ep-pagination" aria-label="Sayfalar">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Önceki sayfa"
              >
                <ArrowLeft />
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  type="button"
                  key={i}
                  className={i === page ? "active" : ""}
                  onClick={() => setPage(i)}
                  aria-current={i === page ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page === pageCount - 1}
                aria-label="Sonraki sayfa"
              >
                <ArrowRight />
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

function Gallery({ c }: { c: Record<string, unknown> }) {
  const items = (c.items as { src: string; title: string; caption: string }[]) ?? [];
  return (
    <>
      <PageHero
        variant="gallery"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-gallery ep-section">
        {items.map((x, i) => (
          <figure className={i === 0 || i === 3 ? "wide" : ""} key={`${x.src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={x.src} alt={x.title} />
            <figcaption>
              <span>
                0{i + 1} / {x.title}
              </span>
              <b>{x.caption}</b>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

function Press({ c }: { c: Record<string, unknown> }) {
  return (
    <>
      <PageHero
        variant="press"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-press ep-section">
        <div className="ep-press-feature ep-press-typographic">
          <div className="ep-news-index">
            <span>
              {String(c.newsIndexValue ?? "")}
              <sup>{String(c.newsIndexSuffix ?? "")}</sup>
            </span>
            <small>{String(c.newsIndexLabel ?? "")}</small>
          </div>
          <div>
            <span>{String(c.featureLabel ?? "")}</span>
            <h2>
              {String(c.featureHeadingTop ?? "")}
              <br />
              {String(c.featureHeadingAccent ?? "")}
            </h2>
            <p>{String(c.featureBody ?? "")}</p>
            <Link href={String(c.featureCtaHref ?? "/tr/iletisim")}>
              {String(c.featureCtaLabel ?? "")} <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="ep-press-empty">
          <Newspaper />
          <span>{String(c.emptyLabel ?? "")}</span>
          <p>{String(c.emptyBody ?? "")}</p>
        </div>
      </section>
    </>
  );
}

function Career({ c }: { c: Record<string, unknown> }) {
  const values = (c.values as IconTitleText[]) ?? [];
  return (
    <>
      <PageHero
        variant="career"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-career ep-section">
        <div>
          <span className="cp-label">{String(c.introLabel ?? "")}</span>
          <h2>
            {String(c.introHeadingTop ?? "")}
            <br />
            {String(c.introHeadingAccent ?? "")}
          </h2>
          <p>{String(c.introBody ?? "")}</p>
          <a href={String(c.applyHref ?? "mailto:info@kayahanisi.com.tr")}>
            {String(c.applyLabel ?? "")} <Mail />
          </a>
        </div>
        <div className="ep-career-values">
          {values.map((v, i) => {
            const I = VALUE_ICONS[v.icon] ?? Award;
            return (
              <article key={`${v.title}-${i}`}>
                <I />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="ep-open">
        <CheckCircle2 />
        <div>
          <span>{String(c.openLabel ?? "")}</span>
          <h2>{String(c.openHeading ?? "")}</h2>
          <p>{String(c.openBody ?? "")}</p>
        </div>
      </section>
    </>
  );
}

function Projects({ c }: { c: Record<string, unknown> }) {
  const stack = (c.stack as ProjectStackItem[]) ?? [];
  return (
    <>
      <PageHero
        variant="projects"
        eyebrow={String(c.heroEyebrow ?? "")}
        title={String(c.heroTitle ?? "")}
        accent={String(c.heroAccent ?? "")}
      />
      <section className="ep-projects ep-section">
        <div className="ep-project-lead">
          <span className="cp-label">{String(c.introLabel ?? "")}</span>
          <h2>
            {String(c.introHeadingTop ?? "")}
            <br />
            {String(c.introHeadingAccent ?? "")}
          </h2>
          <p>{String(c.introBody ?? "")}</p>
          <Link href={String(c.ctaHref ?? "/tr/referanslar")}>
            {String(c.ctaLabel ?? "")} <ArrowRight />
          </Link>
        </div>
        <div className="ep-project-stack">
          {stack.map((s, i) => {
            const I = PROJECT_ICONS[s.icon] ?? Building2;
            return (
              <article key={`${s.num}-${i}`}>
                <I />
                <span>{s.num}</span>
                <h3>{s.title}</h3>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default function ExpansionPage({
  kind,
  content,
  locale = "tr",
}: {
  kind: ExpansionKind;
  content: Record<string, unknown>;
  locale?: string;
}) {
  const ep = locale === "en" ? EP_CHROME.en : EP_CHROME.tr;
  return (
    <div className="cp-page ep-page">
      {kind === "board" ? (
        <Board c={content} />
      ) : kind === "message" ? (
        <Message c={content} />
      ) : kind === "certificates" ? (
        <Certificates c={content} ep={ep} />
      ) : kind === "gallery" ? (
        <Gallery c={content} />
      ) : kind === "press" ? (
        <Press c={content} />
      ) : kind === "projects" ? (
        <Projects c={content} />
      ) : kind === "partners" ? (
        <Partners c={content} ep={ep} />
      ) : (
        <Career c={content} />
      )}
    </div>
  );
}
