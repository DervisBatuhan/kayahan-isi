"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/(panel)/leads/actions";

export const LEAD_STATUS_LABEL: Record<string, string> = {
  new: "Yeni",
  contacted: "İletişime geçildi",
  closed: "Kapatıldı",
};

const STYLES: Record<string, string> = {
  new: "bg-brand-500/10 text-brand-600 border-brand-500/30",
  contacted: "bg-accent-500/10 text-accent-600 border-accent-500/30",
  closed: "bg-ink-400/10 text-ink-500 border-ink-400/30",
};

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(status);
  const [error, setError] = useState(false);

  return (
    <span className="inline-flex items-center gap-1.5">
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          const prev = value;
          setValue(next);
          setError(false);
          startTransition(async () => {
            const res = await updateLeadStatus(id, next);
            if (!res.ok) {
              setValue(prev);
              setError(true);
            }
          });
        }}
        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold outline-none transition-colors disabled:opacity-60 ${
          STYLES[value] ?? STYLES.new
        }`}
      >
        {Object.entries(LEAD_STATUS_LABEL).map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-[11px] font-semibold text-danger-600">kaydedilemedi</span>}
    </span>
  );
}
