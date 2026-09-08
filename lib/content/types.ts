/**
 * Shape of the content that feeds the public site.
 *
 * This mirrors what the admin panel (Prisma / SQLite) will later return, so
 * swapping the static provider in `lib/content/*` for a database query is a
 * localized change. Keep fields flat and serializable.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

/** Maps to the five official brand colours. */
export type AccentKey = "lacivert" | "turkuaz" | "kirmizi" | "turuncu" | "sari";

export type ActivityArea = {
  slug: string;
  title: string;
  description: string;
  accent: AccentKey;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
  accent: AccentKey;
};

export type FeatureIconKey =
  | "shield"
  | "team"
  | "badge"
  | "leaf"
  | "globe"
  | "gauge"
  | "ruler"
  | "search"
  | "wrench"
  | "airflow"
  | "efficiency"
  | "control"
  | "cap"
  | "scale"
  | "broadcast"
  | "institution"
  | "partners";

export type Feature = {
  icon: FeatureIconKey;
  title: string;
  description: string;
};

export type FounderContent = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  roles: string[];
  signature: string;
  signatureRole: string;
  watermark: string;
};

export type AuthorityContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: Feature[];
};

export type HomeBands = {
  about: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
    imageAlt: string;
  };
  projects: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
    imageAlt: string;
    overlayLabel: string;
    overlayTitle: string;
    facts: { value: string; label: string }[];
  };
  certificates: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    ctaLabel: string;
    ctaHref: string;
    itemNote: string;
    items: string[];
  };
  media: {
    image: string;
    imageAlt: string;
    links: { eyebrow: string; title: string; href: string; icon: "images" | "news" }[];
  };
};

export type SiteContent = {
  locale: string;
  topBar: {
    highlights: string[];
    links: NavLink[];
  };
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    items: NavItem[];
    cta: NavLink;
  };
  hero: {
    titleLines: string[];
    accentLineIndex: number;
    subtitlePre: string;
    subtitleAccent: string;
    subtitlePost: string;
    paragraph: string;
    link: NavLink;
  };
  stats: Stat[];
  activityAreas: {
    eyebrow: string;
    items: ActivityArea[];
  };
  journey: {
    eyebrow: string;
    paragraph: string;
    cta: NavLink;
    milestones: Milestone[];
  };
  corporateStrength: {
    eyebrow: string;
    items: Feature[];
  };
  engineering: {
    eyebrow: string;
    paragraph: string;
    cta: NavLink;
    steps: Feature[];
    callouts: Feature[];
  };
  homeBands: HomeBands;
  founder: FounderContent;
  authority: AuthorityContent;
  ctaBand: {
    title: string;
    subtitle: string;
    cta: NavLink;
  };
  footer: {
    description: string;
    columns: { title: string; links: NavLink[] }[];
    contact: {
      title: string;
      address: string;
      phone: string;
      /** digits only, e.g. "905322153304"; empty to hide the WhatsApp link */
      whatsapp?: string;
      email: string;
      cta: NavLink;
    };
    social: { label: string; href: string; icon: "linkedin" | "instagram" | "youtube" | "x" }[];
    copyright: string;
  };
};
