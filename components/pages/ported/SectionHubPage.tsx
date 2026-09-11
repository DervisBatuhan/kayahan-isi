"use client";

import { useEffect, type ComponentType } from "react";
import {
  Award,
  ArrowRight,
  Building2,
  Cpu,
  Gauge,
  Images,
  LayoutGrid,
  Layers3,
  Leaf,
  Network,
  Newspaper,
  Quote,
  ShieldCheck,
  Snowflake,
  Target,
  ThermometerSun,
  Users,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { hubChrome } from "@/lib/content/ported/hub";
import type { HubContent } from "@/lib/content/ported/types";
import "./ported.scss";

export type HubKind = "corporate" | "activity" | "solutions" | "explore";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  building: Building2,
  users: Users,
  quote: Quote,
  target: Target,
  shield: ShieldCheck,
  leaf: Leaf,
  wind: Wind,
  heat: ThermometerSun,
  snow: Snowflake,
  layers: Layers3,
  zap: Zap,
  network: Network,
  cpu: Cpu,
  gauge: Gauge,
  wrench: Wrench,
  projects: LayoutGrid,
  certificate: Award,
  gallery: Images,
  news: Newspaper,
};

export default function SectionHubPage({
  kind,
  content,
  locale = "tr",
}: {
  kind: HubKind;
  content: HubContent;
  locale?: string;
}) {
  const h = content;
  const CH = hubChrome(locale);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".cp-reveal")];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [kind]);

  return (
    <div className={`cp-page hub-page hub-${kind}`}>
      <section className="cp-hero hub-hero">
        <div className="cp-hero-copy cp-reveal">
          <span className="cp-label">{h.eyebrow}</span>
          <h1>
            {h.titleTop}
            <br />
            <em>{h.titleAccent}</em>
          </h1>
          <p>{h.lead}</p>
          <div className="cp-accent" />
        </div>
        <div className="cp-hero-visual cp-reveal">
          <div className="hub-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={h.image} alt={h.imageAlt} />
          </div>
        </div>
      </section>

      <section className="hub-grid-wrap cp-section">
        <div className="hub-grid-head cp-reveal">
          <span className="cp-label">{h.gridHeadLabel}</span>
          <h2>{h.gridHeadTitle}</h2>
        </div>
        <div className="hub-grid">
          {h.items.map((it, i) => {
            const Icon = ICONS[it.icon] ?? ArrowRight;
            return (
              <a className="hub-card cp-reveal" href={it.href} key={`${it.href}-${i}`}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <Icon />
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <span className="hub-more">
                  {CH.more} <ArrowRight />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="hub-band">
        <div className="hub-band-glow" />
        <div>
          <span className="cp-label">{h.eyebrow}</span>
          <h2>{h.band}</h2>
        </div>
        <a href={h.ctaHref}>
          {h.ctaLabel} <ArrowRight />
        </a>
      </section>
    </div>
  );
}
