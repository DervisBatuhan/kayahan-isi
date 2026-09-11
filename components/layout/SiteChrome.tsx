"use client";

/**
 * Shared site chrome — the exact header (trust bar + nav) and footer (CTA band
 * + footer) from the homepage, pulled out so inner pages call the same thing
 * instead of defining their own. Markup and class names mirror
 * `app/[locale]/_home/HomeDesign.tsx`; styles come from the same `home.scss`.
 */

import { useId, useState, type ComponentType } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  Globe2,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/content/types";
import { LangMenu } from "./LangMenu";
import "@/app/[locale]/_home/home.scss";
import "./chrome-fixes.scss";

const upper = (s: string, locale: string) =>
  s.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

// Logo asset intrinsic size (public/brand/kayahan-logo*.png).
const LOGO_AR = 837 / 330;

function Logo({
  variant = "header",
  homeHref = "/tr",
}: {
  variant?: "header" | "footer";
  homeHref?: string;
}) {
  const src =
    variant === "footer"
      ? "/brand/kayahan-logo-footer.png"
      : "/brand/kayahan-logo.png";
  const height = variant === "footer" ? 46 : 54;
  return (
    <a
      className={`brandLogo brandLogo--${variant}`}
      href={homeHref}
      aria-label="Kayahan Isı"
    >
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

function Links({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
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

function EnergyLines() {
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


const TRUST_ICONS: ComponentType<{ className?: string }>[] = [
  ShieldCheck,
  CircleGauge,
  Globe2,
];

export function SiteHeader({ content }: { content: SiteContent }) {
  const c = content;
  const UP = (s: string) => upper(s, c.locale);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <div className="trust">
        {c.topBar.highlights.map((h, i) => {
          const I = TRUST_ICONS[i % TRUST_ICONS.length];
          return (
            <span key={h}>
              <I />
              {h}
            </span>
          );
        })}
        <i />
        {c.topBar.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <LangMenu current={c.locale as Locale} />
      </div>

      <header>
        <Logo homeHref={`/${c.locale}`} />
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
          <a className="offer" href={c.nav.cta.href}>
            {UP(c.nav.cta.label)} <ArrowRight />
          </a>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}

export function SiteFooter({ content }: { content: SiteContent }) {
  const c = content;
  const UP = (s: string) => upper(s, c.locale);

  return (
    <>
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

      <footer id="iletisim">
        <div className="footerBrand">
          <Logo variant="footer" homeHref={`/${c.locale}`} />
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
    </>
  );
}
