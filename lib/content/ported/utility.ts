import { z } from "zod";
import { UT } from "./utility-dictionary";

/**
 * Panel-editable copy for the three utility pages (Referanslar, İletişim,
 * Teklif Al). Only the *content* strings are exposed — form field labels,
 * placeholders and validation messages stay in the component dictionary.
 * Defaults are read from that dictionary so the panel starts in sync.
 */
const s = z.string().trim();
const strList = z.array(s.max(80)).max(12);

export const utilityReferencesSchema = z.object({
  eyebrow: s.max(80),
  h1a: s.max(120),
  h1b: s.max(120),
  sectors: z.array(z.object({ num: s.max(6), title: s.max(60), text: s.max(200) })).min(1).max(12),
  proofSince: s.max(80),
  proofValue: s.max(10),
  proofSuffix: s.max(6),
  proofa: s.max(120),
  proofb: s.max(120),
});

export const utilityContactSchema = z.object({
  eyebrow: s.max(80),
  h1a: s.max(120),
  h1b: s.max(120),
  asideLabel: s.max(80),
  asideH2a: s.max(120),
  asideH2b: s.max(120),
  formHead: s.max(80),
  formSub: s.max(160),
  subjectOpts: strList,
  okLabel: s.max(80),
  okH2a: s.max(120),
  okH2b: s.max(120),
});

export const utilityQuoteSchema = z.object({
  eyebrow: s.max(80),
  h1a: s.max(120),
  h1b: s.max(120),
  steps: strList,
  briefLabel: s.max(80),
  briefH2a: s.max(120),
  briefH2b: s.max(120),
  briefP: s.max(400),
  briefTag1: s.max(80),
  briefTag2: s.max(80),
  head1: s.max(80),
  head1sub: s.max(120),
  head2: s.max(80),
  head2sub: s.max(120),
  projectTypeOpts: strList,
  fields: strList,
  detailPh: s.max(200),
  okLabel: s.max(80),
  okH2a: s.max(120),
  okH2b: s.max(120),
});

export type UtilityKind = "references" | "contact" | "quote";
export const UTILITY_KINDS: UtilityKind[] = ["references", "contact", "quote"];
export const utilitySchemas: Record<UtilityKind, z.ZodType> = {
  references: utilityReferencesSchema,
  contact: utilityContactSchema,
  quote: utilityQuoteSchema,
};
export const UTILITY_LABEL: Record<UtilityKind, string> = {
  references: "Referanslar",
  contact: "İletişim",
  quote: "Teklif Al",
};
export const UTILITY_ROUTE: Record<UtilityKind, string> = {
  references: "/tr/referanslar",
  contact: "/tr/iletisim",
  quote: "/tr/teklif-al",
};

function pick<T extends object, K extends keyof T>(o: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map((k) => [k, o[k]])) as Pick<T, K>;
}

function fromDictionary(loc: "tr" | "en"): Record<UtilityKind, Record<string, unknown>> {
  const d = UT[loc];
  return {
    references: {
      ...pick(d.ref, ["eyebrow", "h1a", "h1b", "proofSince", "proofValue", "proofSuffix", "proofa", "proofb"]),
      sectors: d.ref.sectors.map(([num, title, text]: string[]) => ({ num, title, text })),
    },
    contact: pick(d.contact, ["eyebrow", "h1a", "h1b", "asideLabel", "asideH2a", "asideH2b", "formHead", "formSub", "subjectOpts", "okLabel", "okH2a", "okH2b"]),
    quote: pick(d.quote, [
      "eyebrow", "h1a", "h1b", "steps", "briefLabel", "briefH2a", "briefH2b", "briefP", "briefTag1", "briefTag2",
      "head1", "head1sub", "head2", "head2sub", "projectTypeOpts", "fields", "detailPh", "okLabel", "okH2a", "okH2b",
    ]),
  };
}

export const utilityDefaults = fromDictionary("tr");
export const utilityDefaultsEn = fromDictionary("en");

/** Shape the page component expects: sectors back to the [num, title, text] tuples. */
export function toUtilityOverride(kind: UtilityKind, c: Record<string, unknown>) {
  if (kind === "references") {
    const sectors = Array.isArray(c.sectors)
      ? (c.sectors as { num: string; title: string; text: string }[]).map((x) => [x.num, x.title, x.text] as [string, string, string])
      : undefined;
    return { ref: { ...c, sectors } };
  }
  return kind === "contact" ? { contact: c } : { quote: c };
}
