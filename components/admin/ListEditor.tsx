"use client";

import { AddButton, Field, RemoveButton, TextInput } from "./fields";

/** Editable list of plain strings (topBar highlights, founder roles/paragraphs…). */
export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((value, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                value={value}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                rows={2}
                className="w-full resize-y rounded-[4px] border border-line bg-white px-3 py-2 text-[13px] text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            ) : (
              <TextInput
                value={value}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
              />
            )}
            <RemoveButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
        <AddButton label="Ekle" onClick={() => onChange([...items, ""])} />
      </div>
    </Field>
  );
}

/**
 * Editable list of objects, e.g. stats / milestones / nav links / features.
 * `renderRow` renders the fields for one item; `update` patches that item.
 */
export function ObjectListEditor<T>({
  label,
  hint,
  items,
  onChange,
  newItem,
  renderRow,
  addLabel = "Ekle",
}: {
  label: string;
  hint?: string;
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderRow: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  addLabel?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-[4px] border border-line-strong bg-surface-muted/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                {renderRow(
                  item,
                  (patch) => {
                    const next = [...items];
                    next[i] = { ...next[i], ...patch };
                    onChange(next);
                  },
                  i,
                )}
              </div>
              <RemoveButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
            </div>
          </div>
        ))}
        <AddButton label={addLabel} onClick={() => onChange([...items, newItem()])} />
      </div>
    </Field>
  );
}
