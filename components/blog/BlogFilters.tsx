import Link from "next/link";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import {
  FILTER_UI,
  SORT_OPTIONS,
  isDefault,
  toQuery,
  type BlogFilterState,
  type DurationKey,
  type Facet,
} from "@/lib/blog/filter";

type Facets = { tags: Facet<string>[]; durations: Facet<DurationKey>[]; years: Facet<number>[] };

function Group({ title, children, open = true }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="bf-group" open={open}>
      <summary>
        {title} <ChevronDown />
      </summary>
      <ul>{children}</ul>
    </details>
  );
}

function Option({ active, href, label, count }: { active: boolean; href: string; label: string; count: number }) {
  return (
    <li>
      <Link href={href} className={active ? "is-active" : ""} rel="nofollow" aria-pressed={active} scroll={false}>
        <i aria-hidden="true">{active && <Check />}</i>
        <span>{label}</span>
        <small>{count}</small>
      </Link>
    </li>
  );
}

/**
 * E-commerce style listing controls, rendered server-side with plain links:
 * every checkbox/sort option is a URL, so the state is crawlable and works
 * without JavaScript. The mobile drawer and the sort menu are native
 * <details>, no client component needed.
 */
export function BlogFilters({
  filter,
  facets,
  total,
  locale,
  basePath,
}: {
  filter: BlogFilterState;
  facets: Facets;
  total: number;
  locale: Locale;
  basePath: string;
}) {
  const ui = FILTER_UI[locale];
  const href = (next: BlogFilterState) => `${basePath}${toQuery(next)}`;
  const toggleTag = (t: string) =>
    href({ ...filter, tags: filter.tags.includes(t) ? filter.tags.filter((x) => x !== t) : [...filter.tags, t] });
  const setDuration = (d: DurationKey) => href({ ...filter, duration: filter.duration === d ? null : d });
  const setYear = (y: number) => href({ ...filter, year: filter.year === y ? null : y });
  const setSort = (s: BlogFilterState["sort"]) => href({ ...filter, sort: s });
  const clearAll = href({ ...filter, tags: [], duration: null, year: null });
  const sortLabel = SORT_OPTIONS[locale].find((o) => o.key === filter.sort)?.label ?? "";

  const chips: { label: string; href: string }[] = [
    ...filter.tags.map((t) => ({ label: facets.tags.find((f) => f.key === t)?.label ?? t, href: toggleTag(t) })),
    ...(filter.duration ? [{ label: facets.durations.find((f) => f.key === filter.duration)!.label, href: setDuration(filter.duration) }] : []),
    ...(filter.year ? [{ label: String(filter.year), href: setYear(filter.year) }] : []),
  ];

  const panel = (
    <>
      {chips.length > 0 && (
        <div className="bf-selected">
          <span>{ui.selected}</span>
          <ul>
            {chips.map((c) => (
              <li key={c.label}>
                <Link href={c.href} rel="nofollow" aria-label={`${c.label} — ${ui.clear}`} scroll={false}>
                  {c.label} <X />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={clearAll} className="bf-clear" rel="nofollow" scroll={false}>
            {ui.clear}
          </Link>
        </div>
      )}
      {facets.tags.length > 0 && (
        <Group title={ui.topic}>
          {facets.tags.map((t) => (
            <Option key={t.key} active={filter.tags.includes(t.key)} href={toggleTag(t.key)} label={t.label} count={t.count} />
          ))}
        </Group>
      )}
      <Group title={ui.duration}>
        {facets.durations.filter((d) => d.count > 0).map((d) => (
          <Option key={d.key} active={filter.duration === d.key} href={setDuration(d.key)} label={d.label} count={d.count} />
        ))}
      </Group>
      {facets.years.length > 1 && (
        <Group title={ui.year} open={false}>
          {facets.years.map((y) => (
            <Option key={y.key} active={filter.year === y.key} href={setYear(y.key)} label={y.label} count={y.count} />
          ))}
        </Group>
      )}
    </>
  );

  return (
    <>
      <div className="bf-toolbar">
        <p className="bf-count">{ui.results(total)}</p>
        <div className="bf-toolbar-actions">
          {/* Mobile: opens the drawer below */}
          <details className="bf-drawer">
            <summary>
              <span className="bf-drawer-open">
                <SlidersHorizontal /> {ui.filter}
                {chips.length > 0 && <b>{chips.length}</b>}
              </span>
              <span className="bf-drawer-close">{ui.apply} · {ui.results(total)}</span>
            </summary>
            <div className="bf-drawer-panel">
              <div className="bf-drawer-head">
                <span>{ui.filter}</span>
              </div>
              {panel}
            </div>
          </details>
          <details className="bf-sort">
            <summary>
              {ui.sort}: <b>{sortLabel}</b> <ChevronDown />
            </summary>
            <ul>
              {SORT_OPTIONS[locale].map((o) => (
                <li key={o.key}>
                  <Link href={setSort(o.key)} className={o.key === filter.sort ? "is-active" : ""} rel="nofollow" scroll={false}>
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
      <aside className="bf-sidebar" aria-label={ui.filter}>
        {panel}
        {!isDefault({ ...filter, sort: "yeni" }) && (
          <Link href={clearAll} className="bf-clear bf-clear--wide" rel="nofollow" scroll={false}>
            {ui.clear}
          </Link>
        )}
      </aside>
    </>
  );
}
