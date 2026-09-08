/**
 * Editable content trees for the richly-designed inner pages. The visual
 * layout, icons and artwork stay in the components; only the copy and the
 * ordered lists below are panel-managed (see /admin/pages → "Tasarım sayfaları").
 */

export type Locale = "tr";

export type LinkCard = {
  title: string;
  href: string;
  text: string;
  /** icon key resolved by the component's own icon map */
  icon: string;
};

/** Section-hub pages: /kurumsal, /faaliyet-alanlari, /cozumler */
export type HubContent = {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  lead: string;
  image: string;
  imageAlt: string;
  gridHeadLabel: string;
  gridHeadTitle: string;
  items: LinkCard[];
  band: string;
  ctaLabel: string;
  ctaHref: string;
};

export type NamedText = { title: string; text: string };

/** Faaliyet alanı pages: iklimlendirme, isitma, sogutma, yalitim, enerji */
export type ActivityContent = {
  index: string;
  name: string;
  slug: string;
  asset: string;
  assetAlt: string;
  titleTop: string;
  titleAccent: string;
  lead: string;
  ctaLabel: string;
  statement: string;
  detail: string;
  pillars: NamedText[];
  process: string[];
  usesHeading: string;
  uses: string[];
};

/** Çözüm pages: sistem-cozumleri, bina-otomasyonu, enerji-verimliligi, servis-bakim */
export type SolutionContent = {
  index: string;
  name: string;
  slug: string;
  asset: string;
  assetAlt: string;
  titleTop: string;
  titleAccent: string;
  lead: string;
  ctaLabel: string;
  thesis: string;
  text: string;
  stages: NamedText[];
  outputs: string[];
};

export type PortedFamily = "hub" | "activity" | "solution";

export type PortedContentMap = {
  hub: HubContent;
  activity: ActivityContent;
  solution: SolutionContent;
};
