"use client";

import { useEffect, useId, useRef, useState, type ComponentType } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { LegalBar } from "@/components/layout/LegalBar";
import { LangMenu } from "@/components/layout/LangMenu";
import {
  ArrowRight,
  Award,
  BarChart3,
  Box,
  Building2,
  Check,
  Droplets,
  Flame,
  MessageCircle,
  Snowflake,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  FileBadge,
  Flag,
  Globe,
  Globe2,
  Images,
  Leaf,
  Mail,
  Menu,
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
import type { PartnerItem } from "@/lib/content/ported/certificates-shared";
import "./home.scss";

type PartnersBand = {
  eyebrow: string;
  headingTop: string;
  headingAccent: string;
  ctaLabel: string;
  ctaHref: string;
  items: PartnerItem[];
};

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

// Logo asset intrinsic size (public/brand/kayahan-logo*.svg).
const LOGO_AR = 1232 / 489;

function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  // A plain fixed-size <Image>, on its own `.brandLogo` class — NOT the old
  // `.brand` box + `<Image fill>` combo. That box was fought over by ~6 stacked
  // rules from successive design-port passes (plus a dead `.logoSprite`
  // background rule); when its computed height collapsed, the `fill` image
  // collapsed with it and the logo vanished. An intrinsically-sized image
  // can't be stretched or clipped by an ambient rule.
  const src =
    variant === "footer" ? "/brand/kayahan-logo-footer.svg" : "/brand/kayahan-logo.svg";
  const height = variant === "footer" ? 46 : 54;
  return (
    <a className={`brandLogo brandLogo--${variant}`} href="#top" aria-label="Kayahan Isı">
      <Image
        src={src}
        alt="Kayahan Isı"
        width={Math.round(height * LOGO_AR)}
        height={height}
        priority={variant === "header"}
        unoptimized
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

// The home rail is a teaser, not the full directory — cap it at 10 (admin
// controls which ones by reordering the list in the panel) and send everyone
// else to the dedicated, paginated page via the "Tümünü Gör" link.
const HOME_PARTNER_MAX = 13;
const HOME_PARTNER_GHOST_COUNT = 10;

function HomePartners({ band }: { band: PartnersBand }) {
  const shown = band.items.slice(0, HOME_PARTNER_MAX);
  const hasReal = shown.length > 0;
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // JS-driven marquee: the track scrolls on its own, but the visitor can grab
  // it and slide left/right (mouse or touch). The two identical groups make it
  // seamless — the offset wraps at one group's width. Auto-scroll pauses while
  // hovering or dragging and resumes afterwards without a jump.
  useEffect(() => {
    const el = track.current;
    const vp = viewport.current;
    if (!el || !vp || !hasReal) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 42; // px/s auto-scroll
    let offset = 0;
    let groupW = 0;
    let paused = false;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0; // px/ms from the last drag movement (for a short glide)
    let raf = 0;
    let prev = performance.now();

    const measure = () => {
      groupW = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 0;
    };
    const wrap = (x: number) => (groupW ? ((x % groupW) + groupW) % groupW : 0);
    const apply = () => {
      el.style.transform = `translate3d(${-wrap(offset)}px,0,0)`;
    };
    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      if (!dragging) {
        if (Math.abs(velocity) > 0.02) {
          offset -= velocity * dt;
          velocity *= Math.pow(0.94, dt / 16);
        } else if (!paused && !reduced) {
          offset += (SPEED * dt) / 1000;
        }
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      velocity = 0;
      startX = lastX = e.clientX;
      startOffset = offset;
      lastT = performance.now();
      vp.setPointerCapture(e.pointerId);
      vp.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - startX;
      offset = startOffset - dx;
      const dt = Math.max(1, now - lastT);
      velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
      apply();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      vp.classList.remove("is-dragging");
      try {
        vp.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    measure();
    apply();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);
    vp.addEventListener("mouseenter", onEnter);
    vp.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
      vp.removeEventListener("mouseenter", onEnter);
      vp.removeEventListener("mouseleave", onLeave);
    };
  }, [hasReal]);

  return (
    <section className="homePartnerMarquee reveal" aria-labelledby="home-partners-title">
      <div className="homePartnerMarqueeHead">
        <div>
          <span>{band.eyebrow}</span>
          <h2 id="home-partners-title">
            {band.headingTop} {band.headingAccent}
          </h2>
        </div>
        <a href={band.ctaHref}>
          {band.ctaLabel} <ArrowRight />
        </a>
      </div>
      <div className="homePartnerViewport homePartnerViewport--drag" aria-hidden={!hasReal} ref={viewport}>
        <div className="homePartnerTrack" ref={track}>
          {[0, 1].map((group) => (
            <div className="homePartnerGroup" key={group}>
              {hasReal
                ? shown.map((p, i) => (
                    <span className="homePartnerLogo" key={`${p.title}-${i}`}>
                      {/* Not lazy: the track is moved by a transform, so the browser's
                          lazy-load intersection check misses logos until a repaint. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.fileUrl} alt={p.title} loading="eager" fetchPriority="low" decoding="async" draggable={false} />
                    </span>
                  ))
                : Array.from({ length: HOME_PARTNER_GHOST_COUNT }, (_, i) => (
                    <span className="homePartnerGhost" key={i}>
                      <i />
                      <b />
                    </span>
                  ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Service first" strip right under the hero: three appliance cards + call / WhatsApp / form. */
function ServiceStrip({ c }: { c: SiteContent }) {
  const sf = c.serviceFocus;
  const phone = c.footer.contact.phone;
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const wa = c.footer.contact.whatsapp ? `https://wa.me/${c.footer.contact.whatsapp}` : "";
  const icons = [Flame, Snowflake, Droplets];
  return (
    <section className="serviceStrip reveal" aria-labelledby="home-service-title">
      <div className="serviceStripHead">
        <span className="serviceStripEyebrow">{sf.strip.eyebrow}</span>
        <h2 id="home-service-title">{sf.strip.title}</h2>
        <p>{sf.strip.text}</p>
        {sf.strip.proofs.length > 0 && (
          <ul className="serviceProofs">
            {sf.strip.proofs.map((p) => (
              <li key={p}>
                <Check /> {p}
              </li>
            ))}
          </ul>
        )}
        <div className="serviceStripActions">
          <a className="serviceBtn serviceBtn--call" href={tel}>
            <Phone /> {sf.strip.phoneLabel} · {phone}
          </a>
          {wa && (
            <a className="serviceBtn serviceBtn--wa" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> {sf.strip.whatsappLabel}
            </a>
          )}
          <a className="serviceBtn serviceBtn--form" href={sf.heroPrimary.href}>
            {sf.strip.formLabel} <ArrowRight />
          </a>
        </div>
      </div>
      <div className="serviceCardsWrap">
        {sf.strip.allLabel && sf.strip.allHref && (
          <a className="serviceAll" href={sf.strip.allHref}>
            {sf.strip.allLabel} <ArrowRight />
          </a>
        )}
      <div className="serviceCards">
        {sf.strip.items.map((it, i) => {
          const I = icons[i % icons.length];
          return (
            <a className="serviceCard" href={it.href} key={it.href}>
              <I />
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <span>
                <ArrowRight />
              </span>
            </a>
          );
        })}
      </div>
      </div>
    </section>
  );
}

export function HomeDesign({
  content,
  partners,
}: {
  content: SiteContent;
  partners: PartnersBand;
}) {
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
        <a className="trustPhone" href={`tel:${c.footer.contact.phone.replace(/[^\d+]/g, "")}`}>
          <Phone /> {c.footer.contact.phone}
        </a>
        {c.topBar.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
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
                {UP(item.label)}
                {c.serviceFocus.navBadge && /\/servis$/.test(item.href) && (
                  <b className="navBadge">{c.serviceFocus.navBadge}</b>
                )}
                {item.children && <ChevronDown />}
              </a>
              {item.children && openMenu === item.label && (
                <div className={open ? "navMenu navMenu--mobile" : "navMenu"}>
                  {item.children.map((child) => (
                    <a key={child.href} href={child.href}>
                      {child.label} <ChevronRight />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {c.serviceFocus.headerCta.label && (
            <a className="offer offer--service" href={c.serviceFocus.headerCta.href} aria-label={c.serviceFocus.headerCta.label} title={c.serviceFocus.headerCta.label}>
              <Phone /> <span>{UP(c.serviceFocus.headerCta.label)}</span>
            </a>
          )}
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
          <div className="heroActions">
            <a className="heroBtn heroBtn--service" href={c.serviceFocus.heroPrimary.href}>
              <Wrench /> {c.serviceFocus.heroPrimary.label}
            </a>
            <a className="heroBtn heroBtn--ghost" href={c.serviceFocus.heroSecondary.href}>
              {c.serviceFocus.heroSecondary.label} <ArrowRight />
            </a>
          </div>
          <a className="under" href="#yolculuk">
            {c.hero.link.label}
            <i />
          </a>
        </div>
        <Building />
      </section>

      <ServiceStrip c={c} />

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

      <HomeAbout band={c.homeBands.about} />
      <HomeProjects band={c.homeBands.projects} />

      {/* Journey */}
      <section className="journey section reveal" id="yolculuk">
        <div className="journeyIntro">
          <h2>{UP(c.journey.eyebrow)}</h2>
          <p>{c.journey.paragraph}</p>
          {/* Decorative, not a link (matches the approved reference). */}
          <a>
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

      <HomePartners band={partners} />

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
      <footer id="iletisim" style={{ "--footer-cols": c.footer.columns.length } as React.CSSProperties}>
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
          <a className="footerContactButton" href={c.footer.contact.cta.href}>
            {UP(c.footer.contact.cta.label)} <ArrowRight />
          </a>
        </div>
      </footer>
      <LegalBar locale={c.locale === "en" ? "en" : "tr"} />
    </main>
  );
}
