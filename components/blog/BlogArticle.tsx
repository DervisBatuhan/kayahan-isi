import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPostView } from "@/lib/blog/shared";
import { BLOG_UI, formatPostDate } from "@/lib/blog/format";
import { headings, readingMinutes } from "@/lib/blog/markdown";
import { Markdown } from "./Markdown";
import "./blog.scss";

export function BlogArticle({
  post,
  locale,
  translationHref,
}: {
  post: BlogPostView;
  locale: Locale;
  translationHref?: string | null;
}) {
  const ui = BLOG_UI[locale];
  const toc = headings(post.content);

  return (
    <div className="cp-page blog-page">
      <div className="blog-hero">
        <div className="blog-hero-copy">
          <Link href={`/${locale}/blog`} className="blog-back">
            <ArrowLeft /> {ui.allPosts}
          </Link>
          <span className="blog-eyebrow">{ui.postLabel}</span>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-lead">{post.excerpt}</p>}
          <div className="blog-meta">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{ui.readTime(readingMinutes(post.content))}</span>
            {translationHref && (
              <>
                <span aria-hidden="true">·</span>
                <Link href={translationHref} hrefLang={locale === "tr" ? "en" : "tr"}>
                  {ui.translationLink}
                </Link>
              </>
            )}
          </div>
        </div>
        {post.coverUrl && (
          <figure className="blog-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverUrl} alt={post.coverAlt} fetchPriority="high" />
          </figure>
        )}
      </div>

      <div className="blog-body-wrap">
        {toc.length > 1 && (
          <nav className="blog-toc" aria-label={ui.toc}>
            <span>{ui.toc}</span>
            <ol>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Markdown source={post.content} className="blog-prose" />
        {post.tags.length > 0 && (
          <div className="blog-tags">
            <span>{ui.tags}</span>
            <ul>
              {post.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
