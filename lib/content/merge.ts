/**
 * Pure merge helpers for DB-saved SiteContent vs. code defaults. No
 * `server-only` here so they can be unit-tested.
 */
import type { NavItem } from "./types";

/**
 * `nav.items` is a nested array, so the top-level `{...fallback, ...fromDb}`
 * spread below can't "fill in" a new item the way it does for a flat key —
 * a saved row's `nav` object wins wholesale, permanently hiding any item
 * added to the code default after that row was last saved (e.g. a brand new
 * top-level menu). Reconcile by href instead: walk the current code default
 * for order and to introduce new items/children, but keep whatever an admin
 * has customized on an item that already existed, and keep any item the
 * admin added that isn't in the code defaults at all.
 */
export function mergeNavItems(dbItems: NavItem[], fallbackItems: NavItem[]): NavItem[] {
  const dbByHref = new Map(dbItems.map((i) => [i.href, i]));
  const fallbackHrefs = new Set(fallbackItems.map((i) => i.href));

  const ordered = fallbackItems.map((def) => {
    const existing = dbByHref.get(def.href);
    if (!existing) return def;
    if (!def.children) return existing;
    const existingChildHrefs = new Set((existing.children ?? []).map((c) => c.href));
    const newChildren = def.children.filter((c) => !existingChildHrefs.has(c.href));
    return newChildren.length
      ? { ...existing, children: [...(existing.children ?? []), ...newChildren] }
      : existing;
  });

  const adminOnly = dbItems.filter((i) => !fallbackHrefs.has(i.href));
  return [...ordered, ...adminOnly];
}

/**
 * Same idea for footer link columns: a saved row's `footer` object wins
 * wholesale, so a column added to the code default later (e.g. "Servis")
 * would never appear. Keep the admin's columns as they are and append any
 * default column whose title they don't have yet.
 */
export function mergeFooterColumns<T extends { title: string }>(dbCols: T[], fallbackCols: T[]): T[] {
  const have = new Set(dbCols.map((c) => c.title.trim().toLocaleLowerCase("tr")));
  const missing = fallbackCols.filter((c) => !have.has(c.title.trim().toLocaleLowerCase("tr")));
  return [...dbCols, ...missing];
}

