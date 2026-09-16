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
import {
  knowledgeDefaults,
  knowledgeDefaultsEn,
  knowledgeSchemas,
  KNOWLEDGE_KIND_LABEL,
  KNOWLEDGE_ROUTE,
  type KnowledgeKind,
} from "./knowledge";
import {
  BRAND_KINDS,
  BRAND_NAME,
  BRAND_ROUTE,
  brandDefaults,
  brandDefaultsEn,
  DISTRICT_KINDS,
  DISTRICT_NAME,
  DISTRICT_ROUTE,
  SERVICE_LABEL,
  SERVICE_ROUTE,
  districtDefaults,
  districtDefaultsEn,
  serviceDefaults,
  serviceDefaultsEn,
  serviceLandingSchema,
  type ServiceKind,
} from "./service";
import { UTILITY_KINDS, UTILITY_LABEL, UTILITY_ROUTE, utilityDefaults, utilityDefaultsEn, utilitySchemas } from "./utility";
import { LEGAL_KINDS, LEGAL_LABEL, LEGAL_ROUTE, legalDefaults, legalDefaultsEn, legalSchema } from "./legal";
import { activityContentSchema, hubContentSchema, solutionContentSchema } from "./schema";
import type { Locale } from "@/lib/i18n/config";
import { z } from "zod";

const HUB_LABEL: Record<string, string> = {
  corporate: "Kurumsal (hub)",
  activity: "Faaliyet Alanları (hub)",
  solutions: "Çözümler (hub)",
  explore: "Keşfet (hub)",
  service: "Servis (hub)",
  areas: "Hizmet Bölgelerimiz (hub)",
  knowledge: "Bilgi Merkezi (hub)",
};
const HUB_ROUTE: Record<string, string> = {
  corporate: "/tr/kurumsal",
  activity: "/tr/faaliyet-alanlari",
  solutions: "/tr/cozumler",
  explore: "/tr/kesfet",
  service: "/tr/servis",
  areas: "/tr/hizmet-bolgelerimiz",
  knowledge: "/tr/bilgi-merkezi",
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
  group: kind === "partners" ? "Çözüm Ortakları" : "Kurumsal / Diğer",
  route: EXPANSION_ROUTE[kind],
  schema: expansionSchemas[kind],
  defaults: { tr: expansionDefaults[kind], en: expansionDefaultsEn[kind] },
}));

const knowledgeEntries: PortedEntry[] = (
  Object.keys(knowledgeDefaults) as KnowledgeKind[]
).map((kind) => ({
  family: "knowledge",
  kind,
  label: KNOWLEDGE_KIND_LABEL[kind],
  group: "Bilgi Merkezi",
  route: KNOWLEDGE_ROUTE[kind],
  schema: knowledgeSchemas[kind],
  defaults: { tr: knowledgeDefaults[kind], en: knowledgeDefaultsEn[kind] },
}));

const serviceEntries: PortedEntry[] = (
  Object.keys(serviceDefaults) as ServiceKind[]
).map((kind) => ({
  family: "service",
  kind,
  label: SERVICE_LABEL[kind].tr,
  group: "Servis",
  route: SERVICE_ROUTE[kind],
  schema: serviceLandingSchema,
  defaults: { tr: serviceDefaults[kind], en: serviceDefaultsEn[kind] },
}));

const districtEntries: PortedEntry[] = DISTRICT_KINDS.map((kind) => ({
  family: "district",
  kind,
  label: `${DISTRICT_NAME[kind]} Servis`,
  group: "Servis / İlçeler",
  route: DISTRICT_ROUTE(kind),
  schema: serviceLandingSchema,
  defaults: { tr: districtDefaults[kind], en: districtDefaultsEn[kind] },
}));

const brandEntries: PortedEntry[] = BRAND_KINDS.map((kind) => ({
  family: "brand",
  kind,
  label: `${BRAND_NAME[kind]} Kombi Servisi`,
  group: "Servis / Markalar",
  route: BRAND_ROUTE(kind),
  schema: serviceLandingSchema,
  defaults: { tr: brandDefaults[kind], en: brandDefaultsEn[kind] },
}));

const legalEntries: PortedEntry[] = LEGAL_KINDS.map((kind) => ({
  family: "legal",
  kind,
  label: LEGAL_LABEL[kind].tr,
  group: "Yasal Metinler",
  route: LEGAL_ROUTE(kind),
  schema: legalSchema,
  defaults: { tr: legalDefaults[kind], en: legalDefaultsEn[kind] },
}));

const utilityEntries: PortedEntry[] = UTILITY_KINDS.map((kind) => ({
  family: "utility",
  kind,
  label: UTILITY_LABEL[kind],
  group: "Referans / İletişim / Teklif",
  route: UTILITY_ROUTE[kind],
  schema: utilitySchemas[kind],
  defaults: { tr: utilityDefaults[kind], en: utilityDefaultsEn[kind] },
}));

/**
 * Every design page gets two optional SEO overrides on top of its own shape.
 * Empty = fall back to the code default in `meta.ts` (see lib/seo.server.ts).
 */
const seoFields = {
  seoTitle: z.string().trim().max(70).optional().default(""),
  seoDescription: z.string().trim().max(200).optional().default(""),
};
function withSeo(entry: PortedEntry): PortedEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const base = entry.schema as z.ZodObject<any>;
  return { ...entry, schema: typeof base.extend === "function" ? base.extend(seoFields) : entry.schema };
}

const RAW_ENTRIES: PortedEntry[] = [
  ...hubEntries,
  ...corporateEntries,
  ...expansionEntries,
  ...activityEntries,
  ...solutionEntries,
  ...serviceEntries,
  ...districtEntries,
  ...brandEntries,
  ...knowledgeEntries,
  ...utilityEntries,
  ...legalEntries,
];

export const PORTED_ENTRIES: PortedEntry[] = RAW_ENTRIES.map(withSeo);

export function getPortedEntry(family: string, kind: string): PortedEntry | undefined {
  return PORTED_ENTRIES.find((e) => e.family === family && e.kind === kind);
}
