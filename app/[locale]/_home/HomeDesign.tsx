"use client";

import { useEffect, useId, useState, type ComponentType } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { LangMenu } from "@/components/layout/LangMenu";
import {
  ArrowRight,
  Award,
  BarChart3,
  Box,
  Building2,
  Check,
  ChevronDown,
  CircleGauge,
  FileBadge,
  Flag,
  Globe,
  Globe2,
  Images,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  RefreshCw,
  ShieldCheck,
  Target,
  Users,
  Wind,
  Wrench,
  X,
} from "lucide-react";
import type { SiteContent } from "@/lib/content/types";
import "./home.scss";

const upper = (s: string, locale: string) =>
  s.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");
const SERVICE_COLORS = ["cyan", "red", "blue", "orange", "yellow"] as const;
const STEP_ICONS = [CircleGauge, Building2, Check, Wrench];
const CALLOUT_ICONS = [Wind, Leaf, CircleGauge];
const MILE_ICONS = [Flag, BarChart3, Box, Globe, RefreshCw, Target];
const STRENGTH_ICONS = [ShieldCheck, Users, Award, Leaf, Globe];

function Sprite({ name }: { name: string }) {
  return <span className={`sprite ${name}`} aria-hidden="true" />;
}

// Logo asset intrinsic size (public/brand/kayahan-logo*.png).
const LOGO_AR = 837 / 330;

function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  // A plain fixed-size <Image>, on its own `.brandLogo` class — NOT the old
  // `.brand` box + `<Image fill>` combo. That box was fought over by ~6 stacked
  // rules from successive design-port passes (plus a dead `.logoSprite`
  // background rule); when its computed height collapsed, the `fill` image
  // collapsed with it and the logo vanished. An intrinsically-sized image
  // can't be stretched or clipped by an ambient rule.
  const src =
    variant === "footer" ? "/brand/kayahan-logo-footer.png" : "/brand/kayahan-logo.png";
  const height = variant === "footer" ? 46 : 54;
  return (
    <a className={`brandLogo brandLogo--${variant}`} href="#top" aria-label="Kayahan Isı">
      <Image
        src={src}
        alt="Kayahan Isı"
        width={Math.round(height * LOGO_AR)}
        height={height}
        priority={variant === "header"}
      />
    </a>
  );
}

function EnergyLines() {
  // Layered "energy ribbon" strands — broad low-opacity glows with a few bright
  // cores on top — matching the flowing artwork on the closing band in the
  // approved reference. No SVG <filter>/<mask> (fragile under
  // preserveAspectRatio:none); the glow is just wide translucent strokes.
  // `uid` keeps the gradient id unique per instance so a hidden copy elsewhere
  // on the page can't shadow this one via a duplicate id.
  const uid = useId().replace(/[:]/g, "");
  const gid = `flow-${uid}`;
  const strands: { d: string; w: number; o: number }[] = [
    { d: "M-40 118C230 34 380 210 640 120S1010 26 1240 96", w: 66, o: 0.14 },
    { d: "M-40 150C240 66 380 224 660 150S980 56 1240 150", w: 40, o: 0.2 },
    { d: "M-40 104C210 26 420 196 640 104S1010 14 1240 92", w: 22, o: 0.38 },
    { d: "M-40 138C200 52 400 214 630 132S1000 30 1240 128", w: 12, o: 0.6 },
    { d: "M-40 168C250 92 380 226 660 172S990 92 1240 176", w: 6, o: 0.9 },
    { d: "M-40 120C220 22 380 210 640 120S980 20 1240 110", w: 3.2, o: 1 },
    { d: "M-40 96C230 18 380 176 640 92S1000 8 1240 82", w: 2, o: 1 },
    { d: "M-40 182C220 120 420 232 650 190S1000 120 1240 196", w: 4.5, o: 1 },
  ];
  return (
    <svg
      className="energyLines"
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00b6e0" />
          <stop offset=".22" stopColor="#2f7fd1" />
          <stop offset=".46" stopColor="#e0341f" />
          <stop offset=".7" stopColor="#f7941d" />
          <stop offset=".88" stopColor="#ffc23c" />
          <stop offset="1" stopColor="#ffe07a" />
        </linearGradient>
      </defs>
      <g className="ribbons">
        {strands.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={`url(#${gid})`}
            strokeLinecap="round"
            strokeWidth={s.w}
            opacity={s.o}
          />
        ))}
      </g>
    </svg>
  );
}

function Building({ cut = false }: { cut?: boolean }) {
  // No inline styles here — the hero vs. solutions artwork is positioned
  // entirely from home.css so the two don't fight over `background-size` /
  // `background-position` (that mismatch was cropping the hero building in half).
  return (
    <div className={`building ${cut ? "cut" : "heroMaster"}`} aria-hidden="true">
      <div className="masterArt" />
      {!cut && <EnergyLines />}
    </div>
  );
}

function Title({ text }: { text: string }) {
  return (
    <div className="title">
      <span>{text}</span>
      <i />
    </div>
  );
}

function Note({
  I,
  b,
  t,
}: {
  I: ComponentType<{ className?: string }>;
  b: string;
  t: string;
}) {
  return (
    <p>
      <I />
      <span>
        <b>{b}</b>
        {t}
      </span>
    </p>
  );
}

function Links({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <b>{title}</b>
      {items.map((x) => (
        <a key={x.label} href={x.href}>
          {x.label}
        </a>
      ))}
    </div>
  );
}

/* ── v12 editorial bands — content comes from site.homeBands (panel-managed) ── */

function HomeAbout({ band }: { band: SiteContent["homeBands"]["about"] }) {
  return (
    <section className="homeAbout homeWide reveal">
      <div className="homeAboutCopy">
        <span>{band.eyebrow}</span>
        <h2>
          {band.titleTop}
          <br />
          <em>{band.titleAccent}</em>
        </h2>
        <p>{band.paragraph}</p>
        <a href={band.ctaHref}>
          {band.ctaLabel} <ArrowRight />
        </a>
      </div>
      <div className="homeFlowVisual">
        <img loading="lazy" decoding="async" src={band.image} alt={band.imageAlt} />
      </div>
    </section>
  );
}

function HomeProjects({ band }: { band: SiteContent["homeBands"]["projects"] }) {
  return (
    <section className="homeProjects homeWide reveal">
      <div className="homeSectionHead">
        <span>{band.eyebrow}</span>
        <h2>
          {band.titleTop}
          <br />
          {band.titleBottom}
        </h2>
        <a href={band.ctaHref}>
          {band.ctaLabel} <ArrowRight />
        </a>
      </div>
      <div className="homeProjectVisual">
        <img loading="lazy" decoding="async" src={band.image} alt={band.imageAlt} />
        <div>
          <span>{band.overlayLabel}</span>
          <b>{band.overlayTitle}</b>
        </div>
      </div>
      <div className="homeProjectFacts">
        {band.facts.map((f, i) => (
          <article key={`${f.label}-${i}`}>
            <b>{f.value}</b>
            <span>{f.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeEditorial({
  certificates,
  media,
}: {
  certificates: SiteContent["homeBands"]["certificates"];
  media: SiteContent["homeBands"]["media"];
}) {
  return (
    <>
      <section className="homeCertificates homeWide reveal">
        <div className="homeSectionHead">
          <span>{certificates.eyebrow}</span>
          <h2>
            {certificates.titleTop}
            <br />
            {certificates.titleBottom}
          </h2>
          <a href={certificates.ctaHref}>
            {certificates.ctaLabel} <ArrowRight />
          </a>
        </div>
        <div className="certificateRail">
          {certificates.items.map((x, i) => (
            <article key={`${x}-${i}`}>
              <FileBadge />
              <small>0{i + 1}</small>
              <b>{x}</b>
              <span>{certificates.itemNote}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="homeMedia homeWide reveal">
        <div className="homeMediaVisual">
          <img loading="lazy" decoding="async" src={media.image} alt={media.imageAlt} />
        </div>
        {media.links.map((l, i) => (
          <a href={l.href} key={`${l.href}-${i}`}>
            {l.icon === "news" ? <Newspaper /> : <Images />}
            <span>{l.eyebrow}</span>
            <b>{l.title}</b>
            <ArrowRight />
          </a>
        ))}
      </section>
    </>
  );
}

export function HomeDesign({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const c = content;
  const UP = (s: string) => upper(s, c.locale);
  const trustIcons = [ShieldCheck, CircleGauge, Globe2];

  // Hint the browser to fetch the hero artwork early — it's painted from a CSS
  // `background-image` (see home.scss), which the preload scanner can't see.
  preload("/assets/hero-building.png", { as: "image", fetchPriority: "high" });

  return (
    <main id="top">
      {/* Header */}
      <div className="trust">
        {c.topBar.highlights.map((h, i) => {
          const I = trustIcons[i % trustIcons.length];
          return (
            <span key={h}>
              <I />
              {h}
            </span>
          );
        })}
        <i />
        <a href={c.topBar.links[0]?.href}>✦ {c.topBar.links[0]?.label}</a>
        <a href={c.topBar.links[1]?.href}>
          <Mail /> {c.topBar.links[1]?.label}
        </a>
        <LangMenu current={c.locale as "tr" | "en"} />
      </div>

      <header>
        <Logo />
        <nav className={open ? "open" : ""}>
          {c.nav.items.map((item) => (
            <div
              key={item.label}
              className="navItem"
              onMouseEnter={open ? undefined : () => setOpenMenu(item.label)}
              onMouseLeave={open ? undefined : () => setOpenMenu(null)}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.children && open) {
                    e.preventDefault();
                    setOpenMenu((cur) => (cur === item.label ? null : item.label));
                  }
                }}
              >
                {UP(item.label)} {item.children && <ChevronDown />}
              </a>
              {item.children && openMenu === item.label && (
                <div
                  className={
                    open
                      ? "flex w-full flex-col border-l-2 border-line pl-3"
                      : "absolute left-0 top-full z-50 min-w-[220px] overflow-hidden rounded-[3px] border border-line bg-white py-2 shadow-card"
                  }
                >
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-[12px] font-semibold text-ink-600 hover:bg-surface-blue hover:text-brand-600"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a className="offer" href={c.nav.cta.href}>
            {UP(c.nav.cta.label)} <ArrowRight />
          </a>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </header>

      {/* Hero */}
      <section className="hero" id="kurumsal">
        <div className="heroCopy reveal">
          <h1>
            {c.hero.titleLines[0]}
            <br />
            <em>{c.hero.titleLines[1]}</em>
          </h1>
          <h2>
            {c.hero.subtitlePre}
            <span>{c.hero.subtitleAccent}</span>
            {c.hero.subtitlePost}
          </h2>
          <p>{c.hero.paragraph}</p>
          <a className="under" href="#yolculuk">
            {c.hero.link.label}
            <i />
          </a>
        </div>
        <Building />
      </section>

      {/* Stats */}
      <section className="stats">
        {c.stats.map((s) => (
          <div key={s.label}>
            <b>
              {s.value}
              {s.suffix &&
                (/[a-zçğıöşü]/i.test(s.suffix) ? (
                  <small>{s.suffix}</small>
                ) : (
                  s.suffix
                ))}
            </b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <HomeAbout band={c.homeBands.about} />
      <HomeProjects band={c.homeBands.projects} />

      {/* Services */}
      <section className="services section reveal" id="faaliyetler">
        <Title text={UP(c.activityAreas.eyebrow)} />
        <div className="serviceGrid">
          {c.activityAreas.items.map((a, i) => (
            <article className={SERVICE_COLORS[i % SERVICE_COLORS.length]} key={a.slug}>
              <a
                className="cardLink"
                href={`/${c.locale}/faaliyet-alanlari/${a.slug}`}
                aria-label={a.title}
              />
              <h3>{UP(a.title)}</h3>
              <div className="art">
                <Sprite name={`serviceSprite service${i + 1}`} />
              </div>
              <p>{a.description}</p>
              <ArrowRight />
            </article>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="journey section reveal" id="yolculuk">
        <div className="journeyIntro">
          <h2>{UP(c.journey.eyebrow)}</h2>
          <p>{c.journey.paragraph}</p>
          <a href={c.journey.cta.href}>
            {UP(c.journey.cta.label)} <ArrowRight />
          </a>
        </div>
        <div className="timeline">
          {c.journey.milestones.map((m, i) => {
            const MI = MILE_ICONS[i % MILE_ICONS.length];
            return (
              <article key={m.year}>
                <b>{m.year}</b>
                <i />
                <MI className="mileIco" />
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Strength */}
      <section className="strength section reveal">
        <Title text={UP(c.corporateStrength.eyebrow)} />
        <div className="strengthGrid">
          {c.corporateStrength.items.map((it, i) => {
            const SI = STRENGTH_ICONS[i % STRENGTH_ICONS.length];
            return (
              <article key={it.title}>
                <SI className="strengthIco" />
                <div>
                  <b>{it.title}</b>
                  <p>{it.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Solutions */}
      <section className="solutions section reveal" id="cozumler">
        <div className="solutionCopy">
          <h2>{UP(c.engineering.eyebrow)}</h2>
          <p>{c.engineering.paragraph}</p>
          <a href={c.engineering.cta.href}>
            {UP(c.engineering.cta.label)} <ArrowRight />
          </a>
        </div>
        <div className="solutionList">
          {c.engineering.steps.map((s, i) => {
            const I = STEP_ICONS[i % STEP_ICONS.length];
            return <Note key={s.title} I={I} b={s.title} t={s.description} />;
          })}
        </div>
        <Building cut />
        <div className="solutionList">
          {c.engineering.callouts.map((s, i) => {
            const I = CALLOUT_ICONS[i % CALLOUT_ICONS.length];
            return <Note key={s.title} I={I} b={s.title} t={s.description} />;
          })}
        </div>
      </section>

      <HomeEditorial certificates={c.homeBands.certificates} media={c.homeBands.media} />

      {/* Big CTA */}
      <section className="bigCta">
        <EnergyLines />
        <h2>
          {c.ctaBand.title}
          <small>{c.ctaBand.subtitle}</small>
        </h2>
        <a href={c.ctaBand.cta.href}>
          {UP(c.ctaBand.cta.label)} <ArrowRight />
        </a>
      </section>

      {/* Footer */}
      <footer id="iletisim">
        <div className="footerBrand">
          <Logo variant="footer" />
          <p>{c.footer.description}</p>
          <small>{c.footer.copyright}</small>
        </div>
        {c.footer.columns.map((col) => (
          <Links key={col.title} title={UP(col.title)} items={col.links} />
        ))}
        <div className="contact">
          <b>{UP(c.footer.contact.title)}</b>
          <p style={{ whiteSpace: "pre-line" }}>{c.footer.contact.address}</p>
          <a href={`tel:${c.footer.contact.phone.replace(/\s/g, "")}`}>
            <Phone /> {c.footer.contact.phone}
          </a>
          <a href={`mailto:${c.footer.contact.email}`}>
            <Mail /> {c.footer.contact.email}
          </a>
          {c.footer.contact.whatsapp && (
            <a
              href={`https://wa.me/${c.footer.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle /> WhatsApp
            </a>
          )}
          <button>
            {UP(c.footer.contact.cta.label)} <ArrowRight />
          </button>
        </div>
      </footer>
    </main>
  );
}
