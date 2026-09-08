import { z } from "zod";

const nonEmpty = z.string().trim().min(1, "Boş bırakılamaz.");
const text = z.string().trim();

const namedText = z.object({
  title: nonEmpty.max(120),
  text: text.max(400),
});

const linkCard = z.object({
  title: nonEmpty.max(120),
  href: nonEmpty.max(200),
  text: text.max(400),
  icon: text.max(40),
});

export const hubContentSchema = z.object({
  eyebrow: nonEmpty.max(80),
  titleTop: text.max(160),
  titleAccent: text.max(160),
  lead: text.max(600),
  image: text.max(200),
  imageAlt: text.max(200),
  gridHeadLabel: text.max(80),
  gridHeadTitle: text.max(160),
  items: z.array(linkCard).min(1).max(12),
  band: text.max(300),
  ctaLabel: nonEmpty.max(80),
  ctaHref: nonEmpty.max(200),
});

export const activityContentSchema = z.object({
  index: nonEmpty.max(80),
  name: nonEmpty.max(80),
  slug: nonEmpty.max(200),
  asset: text.max(200),
  assetAlt: text.max(200),
  titleTop: text.max(160),
  titleAccent: text.max(160),
  lead: text.max(600),
  ctaLabel: nonEmpty.max(80),
  statement: text.max(400),
  detail: text.max(800),
  pillars: z.array(namedText).min(1).max(8),
  process: z.array(nonEmpty.max(60)).min(1).max(10),
  usesHeading: text.max(200),
  uses: z.array(nonEmpty.max(80)).min(1).max(12),
});

export const solutionContentSchema = z.object({
  index: nonEmpty.max(80),
  name: nonEmpty.max(80),
  slug: nonEmpty.max(200),
  asset: text.max(200),
  assetAlt: text.max(200),
  titleTop: text.max(160),
  titleAccent: text.max(160),
  lead: text.max(600),
  ctaLabel: nonEmpty.max(80),
  thesis: text.max(400),
  text: text.max(800),
  stages: z.array(namedText).min(1).max(8),
  outputs: z.array(nonEmpty.max(80)).min(1).max(12),
});

export const portedSchemas = {
  hub: hubContentSchema,
  activity: activityContentSchema,
  solution: solutionContentSchema,
} as const;

export type PortedFamilyKey = keyof typeof portedSchemas;
