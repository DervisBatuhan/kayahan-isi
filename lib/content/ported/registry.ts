import { activityDefaults, activityDefaultsEn } from "./activity";
import { solutionDefaults, solutionDefaultsEn } from "./solution";
import { hubDefaults, hubDefaultsEn } from "./hub";
import {
  corporateDefaults,
  corporateDefaultsEn,
  corporateSchemas,
  CORPORATE_KIND_LABEL,
  CORPORATE_ROUTE,
  type CorporateKind,
} from "./corporate";
import {
  expansionDefaults,
  expansionDefaultsEn,
  expansionSchemas,
  EXPANSION_KIND_LABEL,
  EXPANSION_ROUTE,
  type ExpansionKind,
} from "./expansion";
import { activityContentSchema, hubContentSchema, solutionContentSchema } from "./schema";
import type { Locale } from "@/lib/i18n/config";
import type { z } from "zod";

const HUB_LABEL: Record<string, string> = {
  corporate: "Kurumsal (hub)",
  activity: "Faaliyet Alanları (hub)",
  solutions: "Çözümler (hub)",
};
const HUB_ROUTE: Record<string, string> = {
  corporate: "/tr/kurumsal",
  activity: "/tr/faaliyet-alanlari",
  solutions: "/tr/cozumler",
};

/**
 * Central registry of every panel-managed "design page". Each entry ties a
 * `family/kind` to its Zod schema, its per-locale default content, the public
 * route it renders and a human label for the admin list.
 */
export type PortedEntry = {
  family: string;
  kind: string;
  label: string;
  group: string;
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaults: Record<Locale, Record<string, any>>;
};

const activityEntries: PortedEntry[] = (
  Object.keys(activityDefaults) as (keyof typeof activityDefaults)[]
).map((kind) => ({
  family: "activity",
  kind,
  label: activityDefaults[kind].name,
  group: "Faaliyet Alanları",
  route: activityDefaults[kind].slug,
  schema: activityContentSchema,
  defaults: { tr: activityDefaults[kind], en: activityDefaultsEn[kind] },
}));

const solutionEntries: PortedEntry[] = (
  Object.keys(solutionDefaults) as (keyof typeof solutionDefaults)[]
).map((kind) => ({
  family: "solution",
  kind,
  label: solutionDefaults[kind].name,
  group: "Çözümler",
  route: solutionDefaults[kind].slug,
  schema: solutionContentSchema,
  defaults: { tr: solutionDefaults[kind], en: solutionDefaultsEn[kind] },
}));

const hubEntries: PortedEntry[] = (
  Object.keys(hubDefaults) as (keyof typeof hubDefaults)[]
).map((kind) => ({
  family: "hub",
  kind,
  label: HUB_LABEL[kind] ?? kind,
  group: "Bölüm Sayfaları",
  route: HUB_ROUTE[kind] ?? "",
  schema: hubContentSchema,
  defaults: { tr: hubDefaults[kind], en: hubDefaultsEn[kind] },
}));

const corporateEntries: PortedEntry[] = (
  Object.keys(corporateDefaults) as CorporateKind[]
).map((kind) => ({
  family: "corporate",
  kind,
  label: CORPORATE_KIND_LABEL[kind],
  group: "Kurumsal",
  route: CORPORATE_ROUTE[kind],
  schema: corporateSchemas[kind],
  defaults: { tr: corporateDefaults[kind], en: corporateDefaultsEn[kind] },
}));

const expansionEntries: PortedEntry[] = (
  Object.keys(expansionDefaults) as ExpansionKind[]
).map((kind) => ({
  family: "expansion",
  kind,
  label: EXPANSION_KIND_LABEL[kind],
  group: "Kurumsal / Diğer",
  route: EXPANSION_ROUTE[kind],
  schema: expansionSchemas[kind],
  defaults: { tr: expansionDefaults[kind], en: expansionDefaultsEn[kind] },
}));

export const PORTED_ENTRIES: PortedEntry[] = [
  ...hubEntries,
  ...corporateEntries,
  ...expansionEntries,
  ...activityEntries,
  ...solutionEntries,
];

export function getPortedEntry(family: string, kind: string): PortedEntry | undefined {
  return PORTED_ENTRIES.find((e) => e.family === family && e.kind === kind);
}
