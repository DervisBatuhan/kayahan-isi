import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/pages/ported/KnowledgePage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { BlogList } from "@/components/blog/BlogList";
import "@/components/blog/blog.scss";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getKnowledgeContent } from "@/lib/content/ported/index.server";
import { getPublishedPosts } from "@/lib/blog/index.server";
import { jsonLdScript, blogGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/blog";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [site, content, posts] = await Promise.all([
    getSiteContent(locale),
    getKnowledgeContent("blog", locale),
    getPublishedPosts(locale),
  ]);

  return (
    <PortedFrame site={site} family="knowledge" kind="blog">
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(blogGraph(locale, posts)) }}
        />
      )}
      <KnowledgePage kind="blog" content={content} contactHref={`/${locale}/iletisim`}>
        {posts.length > 0 ? <BlogList posts={posts} locale={locale} /> : null}
      </KnowledgePage>
    </PortedFrame>
  );
}
