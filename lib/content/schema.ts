import { z } from "zod";

/** Zod mirror of `SiteContent` (types.ts) — used to validate panel writes. */

const navLink = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  description: z.string().optional(),
});

const navItem = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  children: z.array(navLink).optional(),
});

const accent = z.enum(["lacivert", "turkuaz", "kirmizi", "turuncu", "sari"]);

const iconKey = z.enum([
  "shield", "team", "badge", "leaf", "globe", "gauge", "ruler", "search",
  "wrench", "airflow", "efficiency", "control", "cap", "scale", "broadcast",
  "institution", "partners",
]);

const feature = z.object({
  icon: iconKey,
  title: z.string().min(1),
  description: z.string(),
});

const stat = z.object({
  value: z.string().min(1),
  suffix: z.string().optional(),
  label: z.string().min(1),
});

export const siteContentSchema = z.object({
  locale: z.string(),
  topBar: z.object({
    highlights: z.array(z.string()),
    links: z.array(navLink),
  }),
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    seoTitle: z.string().max(70).optional().default(""),
    seoDescription: z.string().max(200).optional().default(""),
  }),
  nav: z.object({ items: z.array(navItem), cta: navLink }),
  hero: z.object({
    titleLines: z.array(z.string()),
    accentLineIndex: z.number().int(),
    subtitlePre: z.string(),
    subtitleAccent: z.string(),
    subtitlePost: z.string(),
    paragraph: z.string(),
    link: navLink,
  }),
  stats: z.array(stat),
  activityAreas: z.object({
    eyebrow: z.string(),
    items: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        accent,
      }),
    ),
  }),
  journey: z.object({
    eyebrow: z.string(),
    paragraph: z.string(),
    cta: navLink,
    milestones: z.array(
      z.object({
        year: z.string(),
        title: z.string(),
        description: z.string(),
        accent,
      }),
    ),
  }),
  corporateStrength: z.object({
    eyebrow: z.string(),
    items: z.array(feature),
  }),
  engineering: z.object({
    eyebrow: z.string(),
    paragraph: z.string(),
    cta: navLink,
    steps: z.array(feature),
    callouts: z.array(feature),
  }),
  homeBands: z.object({
    about: z.object({
      eyebrow: z.string(),
      titleTop: z.string(),
      titleAccent: z.string(),
      paragraph: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),
    projects: z.object({
      eyebrow: z.string(),
      titleTop: z.string(),
      titleBottom: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      overlayLabel: z.string(),
      overlayTitle: z.string(),
      facts: z.array(z.object({ value: z.string(), label: z.string() })),
    }),
    certificates: z.object({
      eyebrow: z.string(),
      titleTop: z.string(),
      titleBottom: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      itemNote: z.string(),
      items: z.array(z.string()),
    }),
    media: z.object({
      image: z.string(),
      imageAlt: z.string(),
      links: z.array(
        z.object({
          eyebrow: z.string(),
          title: z.string(),
          href: z.string(),
          icon: z.enum(["images", "news"]),
        }),
      ),
    }),
  }),
  founder: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    paragraphs: z.array(z.string()),
    roles: z.array(z.string()),
    signature: z.string(),
    signatureRole: z.string(),
    watermark: z.string(),
  }),
  authority: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    items: z.array(feature),
  }),
  ctaBand: z.object({
    title: z.string(),
    subtitle: z.string(),
    cta: navLink,
  }),
  serviceFocus: z.object({
    heroPrimary: navLink,
    heroSecondary: navLink,
    headerCta: z.object({ label: z.string(), href: z.string() }),
    navBadge: z.string().max(12),
    strip: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      proofs: z.array(z.string().max(60)).max(6),
      items: z.array(z.object({ title: z.string().min(1), text: z.string(), href: z.string().min(1) })).max(6),
      phoneLabel: z.string(),
      whatsappLabel: z.string(),
      formLabel: z.string(),
    }),
    bar: z.object({ call: z.string(), whatsapp: z.string(), form: z.string() }),
    fab: z.object({ label: z.string(), sub: z.string(), title: z.string(), text: z.string(), call: z.string(), whatsapp: z.string(), form: z.string() }),
    form: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      deviceLabel: z.string(),
      devices: z.array(z.string().max(40)).min(1).max(8),
      brandLabel: z.string(),
      brandPh: z.string(),
      districtLabel: z.string(),
      districts: z.array(z.string().max(40)).min(1).max(20),
      timingLabel: z.string(),
      timings: z.array(z.string().max(40)).min(1).max(6),
      nameLabel: z.string(),
      phoneLabel: z.string(),
      noteLabel: z.string(),
      notePh: z.string(),
      submit: z.string(),
      sending: z.string(),
      okTitle: z.string(),
      okText: z.string(),
      okWhatsapp: z.string(),
      sideTitle: z.string(),
      sidePoints: z.array(z.string().max(120)).max(6),
    }),
  }),
  footer: z.object({
    description: z.string(),
    columns: z.array(
      z.object({ title: z.string(), links: z.array(navLink) }),
    ),
    contact: z.object({
      title: z.string(),
      address: z.string(),
      phone: z.string(),
      whatsapp: z.string().optional().default(""),
      email: z.string(),
      cta: navLink,
    }),
    social: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        icon: z.enum(["linkedin", "instagram", "youtube", "x"]),
      }),
    ),
    copyright: z.string(),
  }),
});

export type SiteContentInput = z.infer<typeof siteContentSchema>;
