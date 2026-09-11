import { describe, it, expect } from "vitest";
import { PORTED_ENTRIES, getPortedEntry } from "@/lib/content/ported/registry";

describe("lib/content/ported/registry", () => {
  it("registers exactly 24 design pages", () => {
    expect(PORTED_ENTRIES).toHaveLength(24);
  });

  it("covers the five families", () => {
    const families = new Set(PORTED_ENTRIES.map((e) => e.family));
    expect(families).toEqual(new Set(["hub", "corporate", "expansion", "activity", "solution"]));
  });

  it("gives every entry a non-empty label and route", () => {
    for (const entry of PORTED_ENTRIES) {
      expect(entry.label, `${entry.family}/${entry.kind} label`).toBeTruthy();
      expect(entry.route, `${entry.family}/${entry.kind} route`).toBeTruthy();
    }
  });

  it("has family/kind pairs that are unique", () => {
    const keys = PORTED_ENTRIES.map((e) => `${e.family}:${e.kind}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(
    PORTED_ENTRIES.flatMap((e) =>
      (["tr", "en"] as const).map(
        (loc) => [`${e.family}/${e.kind} [${loc}]`, e, loc] as const,
      ),
    ),
  )("default content for %s validates against its own schema", (_label, entry, loc) => {
    const res = entry.schema.safeParse(entry.defaults[loc]);
    if (!res.success) {
      // Surface the first issue for a readable failure.
      throw new Error(
        `${_label}: ${res.error.issues
          .map((i) => `${i.path.join(".")} — ${i.message}`)
          .join("; ")}`,
      );
    }
    expect(res.success).toBe(true);
  });

  it("resolves a known entry via getPortedEntry", () => {
    const first = PORTED_ENTRIES[0];
    expect(getPortedEntry(first.family, first.kind)).toBe(first);
  });

  it("returns undefined for an unknown family/kind", () => {
    expect(getPortedEntry("activity", "does-not-exist")).toBeUndefined();
    expect(getPortedEntry("nope", "nope")).toBeUndefined();
  });
});
