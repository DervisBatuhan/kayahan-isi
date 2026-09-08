"use client";

import { useEffect } from "react";
import { ArrowRight, Check, Network, ScanLine, SlidersHorizontal } from "lucide-react";
import { solutionLinks } from "@/lib/content/ported/nav";
import { solutionChrome } from "@/lib/content/ported/solution";
import type { SolutionContent } from "@/lib/content/ported/types";
import "./ported.scss";

export type SolutionKind = "systems" | "automation" | "efficiency" | "service";

const STAGE_ICONS = [ScanLine, Network, SlidersHorizontal];

export default function SolutionPage({
  kind,
  content,
  locale = "tr",
}: {
  kind: SolutionKind;
  content: SolutionContent;
  locale?: string;
}) {
  const s = content;
  const CH = solutionChrome(locale);

  useEffect(() => {
    const ns = [...document.querySelectorAll<HTMLElement>(".sp-reveal")];
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
    ns.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [kind]);

  const [band0, band1, band2, band3] = CH.indexBand;

  return (
    <div className={`cp-page sp-page sp-${kind}`}>
      <section className="sp-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.asset} alt={s.assetAlt} />
        <div className="sp-veil" />
        <div className="sp-copy sp-reveal">
          <span>{s.index}</span>
          <h1>
            <b>{s.titleTop}</b>
            <br />
            <em>{s.titleAccent}</em>
          </h1>
          <p>{s.lead}</p>
          <a href="#mimari">
            {s.ctaLabel} <ArrowRight />
          </a>
        </div>
        <div className="sp-index">
          <b>{band0}</b>
          <span>{band1}</span>
          <i />
          <span>{band2}</span>
          <i />
          <span>{band3}</span>
        </div>
      </section>

      <nav className="sp-switch">
        {solutionLinks(locale).map(([n, u], i) => (
          <a className={u === s.slug ? "active" : ""} href={u} key={u}>
            <small>0{i + 1}</small>
            <span>{n}</span>
          </a>
        ))}
      </nav>

      <section className="sp-thesis" id="mimari">
        <div className="sp-reveal">
          <span className="cp-label">{CH.thesisLabel}</span>
          <h2>{s.thesis}</h2>
        </div>
        <p className="sp-reveal">{s.text}</p>
      </section>

      <section className="sp-architecture">
        <div className="sp-arch-head">
          <span className="cp-label">{CH.archLabel}</span>
          <h2>
            {CH.archTitleTop}
            <br />
            {CH.archTitleAccent}
          </h2>
        </div>
        <div className="sp-stage-grid">
          {s.stages.map((x, i) => {
            const Icon = STAGE_ICONS[i] ?? Check;
            return (
              <article className="sp-reveal" key={`${x.title}-${i}`}>
                <div>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <Icon />
                </div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sp-output">
        <div>
          <span className="cp-label">{CH.outputLabel}</span>
          <h2>
            {CH.outputTitleTop}
            <br />
            {CH.outputTitleAccent}
          </h2>
        </div>
        <div>
          {s.outputs.map((o, i) => (
            <article key={`${o}-${i}`}>
              <span>0{i + 1}</span>
              <h3>{o}</h3>
              <ArrowRight />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
