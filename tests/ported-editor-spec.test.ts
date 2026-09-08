import { describe, it, expect } from "vitest";
import { PORTED_ENTRIES } from "@/lib/content/ported/registry";
import { getEditorSpec, type SectionSpec } from "@/lib/content/ported/editor-spec";

describe("lib/content/ported/editor-spec", () => {
  it.each(PORTED_ENTRIES.map((e) => [`${e.family}/${e.kind}`, e] as const))(
    "returns a non-empty spec for %s",
    (_label, entry) => {
      const spec = getEditorSpec(entry.family, entry.kind);
      expect(Array.isArray(spec)).toBe(true);
      expect(spec.length).toBeGreaterThan(0);
      for (const section of spec) {
        expect(section.title).toBeTruthy();
        expect(Array.isArray(section.fields)).toBe(true);
        expect(section.fields.length).toBeGreaterThan(0);
      }
    },
  );

  it("every objectList field across all specs has a populated columns array", () => {
    const seen: string[] = [];
    for (const entry of PORTED_ENTRIES) {
      const spec: SectionSpec[] = getEditorSpec(entry.family, entry.kind);
      for (const section of spec) {
        for (const field of section.fields) {
          if (field.type === "objectList") {
            seen.push(`${entry.family}/${entry.kind}:${field.key}`);
            expect(Array.isArray(field.columns)).toBe(true);
            expect(field.columns.length).toBeGreaterThan(0);
            for (const col of field.columns) {
              expect(col.key).toBeTruthy();
              expect(col.label).toBeTruthy();
            }
          }
        }
      }
    }
    // Guard: the corporate/expansion specs really do contain objectList fields.
    expect(seen.length).toBeGreaterThan(0);
  });

  it("falls back to the family-level spec when there is no family:kind entry", () => {
    // activity/solution/hub are keyed by family only.
    expect(getEditorSpec("activity", "climate")).toBe(getEditorSpec("activity", "heating"));
    expect(getEditorSpec("hub", "corporate").length).toBeGreaterThan(0);
  });

  it("returns an empty array for a completely unknown family", () => {
    expect(getEditorSpec("totally", "unknown")).toEqual([]);
  });
});
