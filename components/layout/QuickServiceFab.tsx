"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Phone, Wrench, X } from "lucide-react";
import type { SiteContent } from "@/lib/content/types";
import "./quick-service-fab.scss";

/**
 * Desktop floating "Hızlı Servis" button (bottom-right). Opens a small card
 * with the three ways to reach the service desk: call, WhatsApp, request form.
 * Replaces the bare WhatsApp bubble on desktop; on mobile the sticky
 * `ServiceBar` does this job and the FAB is hidden by CSS.
 * Copy: `site.serviceFocus.fab` (panel: Ana Sayfa İçeriği → Servis).
 */
export function QuickServiceFab({ site }: { site: SiteContent }) {
  const sf = site.serviceFocus;
  const phone = site.footer.contact.phone;
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const wa = site.footer.contact.whatsapp ? `https://wa.me/${site.footer.contact.whatsapp}` : "";
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`qsf${open ? " is-open" : ""}`} ref={root}>
      <div className="qsf-card" id={id} role="dialog" aria-label={sf.fab.label} hidden={!open}>
        <div className="qsf-card-head">
          <span>{sf.fab.sub}</span>
          <b>{sf.fab.title}</b>
          <p>{sf.fab.text}</p>
        </div>
        <a className="qsf-action qsf-action--call" href={tel}>
          <Phone />
          <span>
            {sf.fab.call}
            <small>{phone}</small>
          </span>
        </a>
        {wa && (
          <a className="qsf-action qsf-action--wa" href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle />
            <span>{sf.fab.whatsapp}</span>
          </a>
        )}
        <a className="qsf-action qsf-action--form" href={sf.heroPrimary.href}>
          <Wrench />
          <span>{sf.fab.form}</span>
        </a>
      </div>
      <button
        type="button"
        className="qsf-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="qsf-pulse" aria-hidden="true" />
        {open ? <X /> : <Wrench />}
        <span>
          {sf.fab.label}
          {sf.fab.sub && <small>{sf.fab.sub}</small>}
        </span>
      </button>
    </div>
  );
}
