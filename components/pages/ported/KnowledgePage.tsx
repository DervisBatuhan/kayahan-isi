"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, MessageCircle, Quote } from "lucide-react";
import "./ported.scss";

export type KnowledgeKind = "blog" | "faq" | "reviews";

const KIND_ICON: Record<KnowledgeKind, typeof BookOpen> = {
  blog: BookOpen,
  faq: MessageCircle,
  reviews: Quote,
};

const AUTO_SLIDE_MS = 5000;

type Card = { title: string; text: string };

function KnowledgeSlider({ items }: { items: Card[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  function updateEdges() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  // Auto-play loops (wraps at the end); the manual arrows below never wrap —
  // they simply hide once there's nothing left in that direction.
  function autoAdvance() {
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth, behavior: "smooth" });
  }

  function slide(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth, behavior: "smooth" });
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function start() {
    stop();
    if (items.length <= 1) return;
    timerRef.current = setInterval(autoAdvance, AUTO_SLIDE_MS);
  }

  useEffect(() => {
    updateEdges();
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className="knowledge-slider" onMouseEnter={stop} onMouseLeave={start}>
      {canPrev && (
        <button
          type="button"
          className="knowledge-slider-arrow knowledge-slider-arrow--prev"
          onClick={() => slide(-1)}
          aria-label="Önceki"
        >
          <ArrowLeft />
        </button>
      )}
      <div
        className="knowledge-slider-track"
        ref={trackRef}
        onScroll={updateEdges}
      >
        {items.map((c, i) => (
          <article className="knowledge-card" key={`${c.title}-${i}`}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </article>
        ))}
      </div>
      {canNext && (
        <button
          type="button"
          className="knowledge-slider-arrow knowledge-slider-arrow--next"
          onClick={() => slide(1)}
          aria-label="Sonraki"
        >
          <ArrowRight />
        </button>
      )}
    </div>
  );
}

export default function KnowledgePage({
  kind,
  content,
  contactHref,
  children,
}: {
  kind: KnowledgeKind;
  content: Record<string, unknown>;
  contactHref: string;
  /** Replaces the card slider (the blog passes its real post list here);
   *  pass `null` to force the empty-state message instead of the slider. */
  children?: React.ReactNode;
}) {
  const Icon = KIND_ICON[kind];
  const c = content;
  const items = Array.isArray(c.items) ? (c.items as Card[]) : [];

  return (
    <div className={`cp-page knowledge-page knowledge-${kind}`}>
      <section className="knowledge-hero">
        <div className="knowledge-copy">
          <span>{String(c.heroIndex ?? "")}</span>
          <h1>
            {String(c.heroTitleTop ?? "")}
            <em>{String(c.heroTitleAccent ?? "")}</em>
          </h1>
          <p>{String(c.heroLead ?? "")}</p>
        </div>
        <div className="knowledge-signature" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>
      <section className="knowledge-content">
        <div className="knowledge-content-head">
          <span className="cp-label">{String(c.contentEyebrow ?? "")}</span>
          <Icon strokeWidth={1.2} />
        </div>
        {children !== undefined && children !== null ? (
          children
        ) : children === undefined && items.length > 0 ? (
          <KnowledgeSlider items={items} />
        ) : (
          <div className="knowledge-empty">
            <span>01</span>
            <div>
              <h2>{String(c.emptyHeading ?? "")}</h2>
              <p>{String(c.emptyBody ?? "")}</p>
            </div>
            <a href={contactHref} aria-label="İletişim">
              <ArrowRight />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
