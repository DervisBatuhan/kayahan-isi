import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPostView } from "@/lib/blog/shared";
import { BLOG_UI, formatPostDate } from "@/lib/blog/format";
import { readingMinutes } from "@/lib/blog/markdown";

/**
 * Published-post grid for /<locale>/blog. The first post gets a wide
 * "featured" card; the rest flow in a 3-up grid. Cards without a cover fall
 * back to a brand-tinted panel so the grid never has holes.
 */
export function BlogList({ posts, locale }: { posts: BlogPostView[]; locale: Locale }) {
  const ui = BLOG_UI[locale];
  const [first, ...rest] = posts;

  const card = (p: BlogPostView, featured = false) => {
    const href = `/${locale}/blog/${p.slug}`;
    return (
      <article className={`blog-card${featured ? " blog-card--featured" : ""}`} key={p.id}>
        <Link href={href} className="blog-card-media" aria-hidden="true" tabIndex={-1}>
          {p.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.coverUrl} alt="" loading={featured ? "eager" : "lazy"} />
          ) : (
            <span className="blog-card-media--empty" />
          )}
        </Link>
        <div className="blog-card-body">
          <div className="blog-card-meta">
            <time dateTime={p.publishedAt}>{formatPostDate(p.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{ui.readTime(readingMinutes(p.content))}</span>
          </div>
          <h2>
            <Link href={href}>{p.title}</Link>
          </h2>
          {p.excerpt && <p>{p.excerpt}</p>}
          <Link href={href} className="blog-card-cta">
            {ui.readMore} <ArrowRight />
          </Link>
        </div>
      </article>
    );
  };

  return (
    <div className="blog-list">
      {first && card(first, true)}
      {rest.length > 0 && <div className="blog-grid">{rest.map((p) => card(p))}</div>}
    </div>
  );
}
