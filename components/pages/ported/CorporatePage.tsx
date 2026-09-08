"use client";

import { Fragment, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { corpChrome } from "@/lib/content/ported/corporate";
import type {
  CorporateAbout,
  CorporateMission,
  CorporateQuality,
  CorporateSustain,
} from "@/lib/content/ported/corporate";
import "./ported.scss";

export type CorporateKind = "about" | "mission" | "quality" | "sustainability";

export type CorporateContentByKind = {
  about: CorporateAbout;
  mission: CorporateMission;
  quality: CorporateQuality;
  sustainability: CorporateSustain;
};



type LineIconType =
  | "heritage"
  | "people"
  | "precision"
  | "future"
  | "shield"
  | "cycle"
  | "leaf"
  | "energy";

function LineIcon({ type }: { type: string }) {
  const paths: Record<LineIconType, React.ReactNode> = {
    heritage: (
      <>
        <path d="M7 25h34M11 25V12l13-7 13 7v13M18 25V15h12v10" />
        <path d="M24 5v20" />
      </>
    ),
    people: (
      <>
        <circle cx="18" cy="15" r="6" />
        <circle cx="33" cy="17" r="5" />
        <path d="M7 38c1-10 6-15 12-15s11 5 12 15M28 27c8-2 13 3 14 11" />
      </>
    ),
    precision: (
      <>
        <circle cx="24" cy="24" r="17" />
        <circle cx="24" cy="24" r="7" />
        <path d="M24 2v8M24 38v8M2 24h8M38 24h8" />
      </>
    ),
    future: (
      <>
        <path d="M8 38C11 18 22 8 41 6 40 25 31 38 8 38Z" />
        <path d="M8 38c9-12 18-19 31-28" />
      </>
    ),
    shield: (
      <>
        <path d="M24 4 41 10v13c0 11-7 18-17 22C14 41 7 34 7 23V10Z" />
        <path d="m16 24 5 5 11-12" />
      </>
    ),
    cycle: (
      <>
        <path d="M37 13A17 17 0 0 0 8 21M11 11 8 21l10-2M11 35a17 17 0 0 0 29-8M37 37l3-10-10 2" />
      </>
    ),
    leaf: (
      <>
        <path d="M7 39C8 18 20 6 42 6c-1 22-13 34-35 33Z" />
        <path d="M8 39C18 27 27 19 40 9" />
      </>
    ),
    energy: (
      <>
        <circle cx="24" cy="24" r="18" />
        <path d="m27 7-13 20h10l-3 14 14-23H25Z" />
      </>
    ),
  };
  return (
    <svg
      className="cp-line-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {paths[(type as LineIconType) in paths ? (type as LineIconType) : "precision"]}
    </svg>
  );
}

function HeroVisual({ kind, ch }: { kind: CorporateKind; ch: ReturnType<typeof corpChrome> }) {
  if (kind === "about")
    return (
      <div className="cp-memory-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/corporate-memory-cgi.png" alt={ch.memoryAlt} />
        <div className="cp-era">
          <b>1976</b>
          <i />
          <span>{ch.eraNow}</span>
        </div>
      </div>
    );
  if (kind === "mission")
    return (
      <div className="cp-horizon-art">
        <div className="cp-horizon-half cp-horizon-now">
          <span>{ch.missionLabel}</span>
          <b>
            {ch.missionArt[0]}
            <br />
            {ch.missionArt[1]}
          </b>
        </div>
        <div className="cp-horizon-axis">
          <i />
          <strong>→</strong>
        </div>
        <div className="cp-horizon-half cp-horizon-next">
          <span>{ch.visionLabel}</span>
          <b>
            {ch.visionArt[0]}
            <br />
            {ch.visionArt[1]}
          </b>
        </div>
      </div>
    );
  if (kind === "quality")
    return (
      <div className="cp-calibration-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/quality-calibration-cgi.png" alt={ch.calibrationAlt} />
        <div className="cp-calibration-mark">
          <small>
            {ch.calibration[0]}
            <br />
            {ch.calibration[1]}
          </small>
        </div>
      </div>
    );
  return (
    <div className="cp-living-art">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/sustainable-flow-cgi.png" alt={ch.flowAlt} />
      <div className="cp-living-note">
        <span>{ch.cycleLabel}</span>
        <b>{ch.cycleValue}</b>
      </div>
    </div>
  );
}

function Hero({
  kind,
  index,
  titleTop,
  titleAccent,
  lead,
  ch,
}: {
  kind: CorporateKind;
  index: string;
  titleTop: string;
  titleAccent: string;
  lead: string;
  ch: ReturnType<typeof corpChrome>;
}) {
  return (
    <section className={`cp-hero cp-${kind}`}>
      <div className="cp-hero-copy cp-reveal">
        <span>{index}</span>
        <h1>
          {titleTop}
          <br />
          <em>{titleAccent}</em>
        </h1>
        <p>{lead}</p>
        <div className="cp-accent" />
      </div>
      <div className="cp-hero-visual cp-reveal">
        <HeroVisual kind={kind} ch={ch} />
      </div>
    </section>
  );
}

function About({ c }: { c: CorporateAbout }) {
  return (
    <>
      <section className="cp-intro cp-section">
        <span className="cp-label">{c.introLabel}</span>
        <div>
          <h2>{c.introHeading}</h2>
          <p>{c.introBody}</p>
        </div>
        <strong>
          {c.statValue}
          <small>{c.statSuffix}</small>
          <em>{c.statLabel}</em>
        </strong>
      </section>
      <section className="cp-dark-story cp-section">
        <div>
          <span className="cp-label">{c.storyLabel}</span>
          <h2>
            {c.storyHeadingTop}
            <br />
            {c.storyHeadingAccent}
          </h2>
        </div>
        <div className="cp-story-track">
          {c.storyItems.map((x, i) => (
            <article key={`${x.num}-${i}`}>
              <b>{x.num}</b>
              <i />
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="cp-values cp-section">
        <div>
          <span className="cp-label">{c.valuesLabel}</span>
          <h2>{c.valuesHeading}</h2>
        </div>
        <div className="cp-value-grid">
          {c.valuesItems.map((v, i) => (
            <article key={`${v.title}-${i}`}>
              <LineIcon type={v.icon} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Mission({ c }: { c: CorporateMission }) {
  return (
    <>
      <section className="cp-dual cp-section">
        {c.dual.map((d, i) => (
          <article key={`${d.tag}-${i}`}>
            <span>{d.tag}</span>
            <h2>
              {d.headingTop}
              <br />
              {d.headingBottom}
            </h2>
            <p>{d.body}</p>
          </article>
        ))}
      </section>
      <section className="cp-principles cp-section">
        <div>
          <span className="cp-label">{c.principlesLabel}</span>
          <h2>
            {c.principlesHeadingTop}
            <br />
            {c.principlesHeadingAccent}
          </h2>
        </div>
        <div className="cp-principle-list">
          {c.principlesItems.map((x, i) => (
            <article key={`${x.num}-${i}`}>
              <b>{x.num}</b>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
              <ArrowRight />
            </article>
          ))}
        </div>
      </section>
      <section className="cp-statement">
        <div className="cp-horizon-beam" />
        <p>{c.statementLine1}</p>
        <h2>{c.statementLine2}</h2>
      </section>
    </>
  );
}

function Quality({ c }: { c: CorporateQuality }) {
  return (
    <>
      <section className="cp-quality-system cp-section">
        <div>
          <span className="cp-label">{c.systemLabel}</span>
          <h2>
            {c.systemHeadingTop}
            <br />
            {c.systemHeadingAccent}
          </h2>
          <p>{c.systemBody}</p>
        </div>
        <div className="cp-quality-ring">
          {c.ringLabels.map((l, i) => (
            <span key={`${l}-${i}`}>{l}</span>
          ))}
          <i>{c.ringCenter}</i>
        </div>
      </section>
      <section className="cp-commitments cp-section">
        <span className="cp-label">{c.commitLabel}</span>
        <div className="cp-commit-grid">
          {c.commitItems.map((x, i) => (
            <article key={`${x.num}-${i}`}>
              <b>{x.num}</b>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="cp-quality-banner">
        <LineIcon type="shield" />
        <div>
          <span>{c.bannerTag}</span>
          <h2>
            {c.bannerHeadingTop}
            <br />
            {c.bannerHeadingAccent}
          </h2>
        </div>
      </section>
    </>
  );
}

function Sustainability({ c }: { c: CorporateSustain }) {
  return (
    <>
      <section className="cp-sustain-intro cp-section">
        <div>
          <span className="cp-label">{c.introLabel}</span>
          <h2>
            {c.introHeadingTop}
            <br />
            {c.introHeadingAccent}
          </h2>
        </div>
        <p>{c.introBody}</p>
      </section>
      <section className="cp-sustain-grid cp-section">
        {c.gridItems.map((x, i) => (
          <article key={`${x.title}-${i}`}>
            <LineIcon type={x.icon} />
            <span>{x.num}</span>
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </article>
        ))}
      </section>
      <section className="cp-balance cp-section">
        <div className="cp-balance-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={c.balanceArt} alt={c.balanceArtAlt} />
          <div>
            {c.balanceEquation.map((part, i) => (
              <Fragment key={`${part}-${i}`}>
                {i > 0 && <i>×</i>}
                <b>{part}</b>
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <span className="cp-label">{c.balanceLabel}</span>
          <h2>
            {c.balanceHeadingTop}
            <br />
            {c.balanceHeadingAccent}
          </h2>
          <p>{c.balanceBody}</p>
        </div>
      </section>
    </>
  );
}

/**
 * Content-only: the hero + body sections for the four corporate pages.
 * Header and footer are the shared site chrome — compose them around this.
 */
export default function CorporatePage({
  kind,
  content,
  locale = "tr",
}: {
  kind: CorporateKind;
  content: Record<string, unknown>;
  locale?: string;
}) {
  const ch = corpChrome(locale);
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
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [kind]);

  const c = content as unknown as CorporateContentByKind[CorporateKind];

  return (
    <div className="cp-page">
      <Hero
        kind={kind}
        index={String(c.index ?? "")}
        titleTop={String(c.titleTop ?? "")}
        titleAccent={String(c.titleAccent ?? "")}
        lead={String(c.lead ?? "")}
        ch={ch}
      />
      <div className={`cp-body cp-body-${kind}`}>
        {kind === "about" ? (
          <About c={content as unknown as CorporateAbout} />
        ) : kind === "mission" ? (
          <Mission c={content as unknown as CorporateMission} />
        ) : kind === "quality" ? (
          <Quality c={content as unknown as CorporateQuality} />
        ) : (
          <Sustainability c={content as unknown as CorporateSustain} />
        )}
      </div>
    </div>
  );
}
