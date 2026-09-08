"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[12px] font-semibold text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-[4px] border border-line bg-white px-3 py-2 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputClass} resize-y leading-relaxed ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

/** Plain titled card. Used where sections are shown one-at-a-time (page editor). */
export function SectionCard({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  name?: string;
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-6 overflow-hidden rounded-[6px] border border-line bg-white">
      <div className="p-5">
        <h2 className="text-[14px] font-bold text-ink-900">{title}</h2>
        {description && <p className="mt-0.5 text-[12px] text-ink-500">{description}</p>}
      </div>
      <div className="space-y-4 border-t border-line p-5">{children}</div>
    </section>
  );
}

/** One section's editor. Renders only when it's the active section; its fields
 * stay unmounted otherwise (parent holds the form state, so nothing is lost). */
export function Panel({
  active,
  id,
  title,
  description,
  children,
}: {
  active: string;
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  if (active !== id) return null;
  return (
    <section className="overflow-hidden rounded-[6px] border border-line bg-white">
      <div className="p-5">
        <h2 className="text-[15px] font-bold text-ink-900">{title}</h2>
        {description && <p className="mt-0.5 text-[12px] text-ink-500">{description}</p>}
      </div>
      <div className="space-y-4 border-t border-line p-5">{children}</div>
    </section>
  );
}

/** Which section the sidebar selected, from `?section=<id>` in the URL.
 * `useSearchParams` re-renders on every client navigation, so clicking a
 * sidebar sub-link switches the visible section without a page reload. */
export function useActiveSection(fallback: string, valid: readonly string[]) {
  const section = useSearchParams().get("section");
  return section && valid.includes(section) ? section : fallback;
}

export function RemoveButton({ onClick, label = "Kaldır" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-[4px] px-2 py-1 text-[11px] font-semibold text-danger-600 transition-colors hover:bg-danger-500/10"
    >
      {label}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[4px] border border-dashed border-line-strong px-3 py-1.5 text-[12px] font-semibold text-brand-600 transition-colors hover:border-brand-400 hover:bg-surface-blue"
    >
      + {label}
    </button>
  );
}

export function SaveBar({
  pending,
  status,
  onSave,
}: {
  pending: boolean;
  status: { ok: boolean; message: string } | null;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-[6px] border border-line bg-white/95 px-4 py-3 shadow-card backdrop-blur">
      <p className="text-[12.5px]">
        {status ? (
          <span className={status.ok ? "font-semibold text-brand-600" : "font-semibold text-danger-600"}>
            {status.message}
          </span>
        ) : (
          <span className="text-ink-400">Değişiklikler kaydedilene kadar kalıcı değildir.</span>
        )}
      </p>
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="shrink-0 rounded-[4px] bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </div>
  );
}

export function LocaleTabs({ locale, basePath }: { locale: string; basePath: string }) {
  const tabs: { value: string; label: string }[] = [
    { value: "tr", label: "Türkçe" },
    { value: "en", label: "English" },
  ];
  return (
    <div className="flex gap-1 rounded-[6px] border border-line bg-white p-1">
      {tabs.map((t) => (
        <a
          key={t.value}
          href={`${basePath}?locale=${t.value}`}
          className={`rounded-[4px] px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
            locale === t.value ? "bg-brand-500 text-white" : "text-ink-600 hover:bg-surface-blue"
          }`}
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}

