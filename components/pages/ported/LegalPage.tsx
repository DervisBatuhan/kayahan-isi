import { Markdown } from "@/components/blog/Markdown";
import type { LegalPage as LegalContent } from "@/lib/content/ported/legal";
import "@/components/blog/blog.scss";
import "./ported.scss";

/** Plain, readable legal page: title block + Markdown body in the blog prose style. */
export function LegalPage({ content: c }: { content: LegalContent }) {
  return (
    <div className="cp-page legal-page">
      <header className="legal-head">
        <span className="cp-label">{c.updated}</span>
        <h1>{c.title}</h1>
        {c.intro && <p>{c.intro}</p>}
      </header>
      <div className="legal-body">
        <Markdown source={c.body} className="blog-prose" />
      </div>
    </div>
  );
}
