"use client";

import { useState, useTransition } from "react";
import { updateLeadNotes } from "@/app/admin/(panel)/leads/actions";

export function LeadNotesEditor({
  id,
  initial,
}: {
  id: string;
  initial: string;
}) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const dirty = value !== initial;

  function save() {
    startTransition(async () => {
      const res = await updateLeadNotes(id, value);
      setStatus(res.ok ? "Kaydedildi." : (res.error ?? "Hata."));
    });
  }

  return (
    <div>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setStatus(null);
        }}
        placeholder="Bu talep hakkında iç notlar…"
        className="w-full resize-y rounded-[4px] border border-line bg-white px-3 py-2 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending || !dirty}
          className="rounded-[4px] bg-brand-500 px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
        >
          {pending ? "Kaydediliyor…" : "Notu kaydet"}
        </button>
        {status && <span className="text-[12px] font-semibold text-brand-600">{status}</span>}
      </div>
    </div>
  );
}
