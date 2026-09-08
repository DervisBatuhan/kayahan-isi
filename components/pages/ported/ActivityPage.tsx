"use client";

import { Fragment, useEffect } from "react";
import { ArrowRight, Check, Gauge, Layers3, Settings2 } from "lucide-react";
import { activityLinks } from "@/lib/content/ported/nav";
import { activityChrome } from "@/lib/content/ported/activity";
import type { ActivityContent } from "@/lib/content/ported/types";
import "./ported.scss";

export type ActivityKind = "climate" | "heating" | "cooling" | "insulation" | "energy";

const PILLAR_ICONS = [Gauge, Layers3, Settings2];

export default function ActivityPage({
  kind,
  content,
  locale = "tr",
}: {
  kind: ActivityKind;
  content: ActivityContent;
  locale?: string;
}) {
  const a = content;

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".ap-reveal")];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [kind]);

  const CH = activityChrome(locale);
  const [t1, t2, t3, tResult] = CH.equation;

  return (
    <div className={`cp-page ap-page ap-${kind}`}>
      <section className="ap-hero">
        <div className="ap-copy ap-reveal">
          <span>{a.index}</span>
          <h1>
            <b>{a.titleTop}</b>
            <br />
            <em>{a.titleAccent}</em>
          </h1>
          <p>{a.lead}</p>
          <a href="#yaklasim">
            {a.ctaLabel} <ArrowRight />
          </a>
        </div>
        <div className="ap-art ap-reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.asset} alt={a.assetAlt} />
          <div className="ap-art-note">
            <span>{CH.artNoteLabel}</span>
            <b>{CH.artNoteValue}</b>
          </div>
        </div>
      </section>

      <nav className="ap-switch" aria-label={CH.switchAriaLabel}>
        {activityLinks(locale).map(([name, url], i) => (
          <a className={url === a.slug ? "active" : ""} href={url} key={url}>
            <small>0{i + 1}</small>
            <span>{name}</span>
          </a>
        ))}
      </nav>

      <section className="ap-intro" id="yaklasim">
        <div className="ap-reveal">
          <span className="cp-label">{CH.approachLabel}</span>
          <h2>{a.statement}</h2>
        </div>
        <div className="ap-reveal">
          <p>{a.detail}</p>
          <div className="ap-equation">
            <b>{t1}</b>
            <i>+</i>
            <b>{t2}</b>
            <i>+</i>
            <b>{t3}</b>
            <strong>=</strong>
            <em>{tResult}</em>
          </div>
        </div>
      </section>

      <section className="ap-pillars">
        <div className="ap-pillars-head">
          <span className="cp-label">{CH.pillarsLabel}</span>
          <h2>
            {CH.pillarsTitleTop}
            <br />
            {CH.pillarsTitleAccent}
          </h2>
        </div>
        <div className="ap-pillar-grid">
          {a.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? Settings2;
            return (
              <article className="ap-reveal" key={`${p.title}-${i}`}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <Icon />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ap-process">
        {a.process.map((label, i) => (
          <Fragment key={`${label}-${i}`}>
            <div>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{label}</b>
            </div>
            {i < a.process.length - 1 && <i />}
          </Fragment>
        ))}
      </section>

      <section className="ap-uses">
        <div>
          <span className="cp-label">{CH.usesLabel}</span>
          <h2>{a.usesHeading}</h2>
        </div>
        <div>
          {a.uses.map((u, i) => (
            <article key={`${u}-${i}`}>
              <span>0{i + 1}</span>
              <h3>{u}</h3>
              <Check />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
