/**
 * Import blog posts from `content/blog/*.md` (frontmatter + Markdown body).
 *
 *   npx tsx scripts/blog-import.ts            # upsert into the DB from lib/db (local dev.db,
 *                                             #   or Turso when DATABASE_URL/DATABASE_AUTH_TOKEN are set)
 *   npx tsx scripts/blog-import.ts --sql      # print SQL instead — pipe to `turso db shell <db>`
 *   npx tsx scripts/blog-import.ts --publish  # mark imported posts published (default: draft)
 *
 * Idempotent: a post is keyed by (locale, slug); re-running updates content
 * and never flips a post the editors have already published back to draft.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { blogPostInputSchema } from "../lib/blog/shared";

const DIR = join(process.cwd(), "content", "blog");
const args = new Set(process.argv.slice(2));
const asSql = args.has("--sql");
const publish = args.has("--publish");

type Front = Record<string, string>;

function parseFrontmatter(raw: string): { front: Front; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error("missing frontmatter");
  const front: Front = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    front[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { front, body: m[2].trim() };
}

function load() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const { front, body } = parseFrontmatter(readFileSync(join(DIR, file), "utf8"));
      const parsed = blogPostInputSchema.safeParse({
        locale: front.locale ?? "tr",
        slug: front.slug,
        title: front.title,
        excerpt: front.excerpt ?? "",
        content: body,
        coverUrl: front.coverUrl ?? "",
        coverAlt: front.coverAlt ?? "",
        tags: (front.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
        pairKey: front.pairKey ?? "",
        published: publish,
        publishedAt: front.publishedAt,
      });
      if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues[0]?.message}`);
      return { file, ...parsed.data };
    });
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

async function main() {
  const posts = load();

  if (asSql) {
    // Deterministic ids so re-runs update in place; SQLite upsert keeps `published`
    // once an editor has switched it on.
    const now = new Date().toISOString();
    for (const p of posts) {
      const id = `seed-${p.locale}-${p.slug}`;
      const at = `${p.publishedAt}T12:00:00.000Z`;
      console.log(
        `INSERT INTO "BlogPost" (id, locale, slug, title, excerpt, content, coverUrl, coverAlt, tags, pairKey, published, publishedAt, createdAt, updatedAt, updatedBy)\n` +
          `VALUES (${q(id)}, ${q(p.locale)}, ${q(p.slug)}, ${q(p.title)}, ${q(p.excerpt)}, ${q(p.content)}, ${q(p.coverUrl)}, ${q(p.coverAlt)}, ${q(JSON.stringify(p.tags))}, ${p.pairKey ? q(p.pairKey) : "NULL"}, ${p.published ? 1 : 0}, ${q(at)}, ${q(now)}, ${q(now)}, 'blog-import')\n` +
          `ON CONFLICT(locale, slug) DO UPDATE SET title=excluded.title, excerpt=excluded.excerpt, content=excluded.content, tags=excluded.tags, pairKey=excluded.pairKey, publishedAt=excluded.publishedAt, updatedAt=excluded.updatedAt, updatedBy=excluded.updatedBy, published=MAX("BlogPost".published, excluded.published);`,
      );
    }
    console.error(`-- ${posts.length} posts`);
    return;
  }

  const { prisma } = await import("../lib/db");
  for (const p of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { locale_slug: { locale: p.locale, slug: p.slug } } });
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverUrl: p.coverUrl || existing?.coverUrl || "",
      coverAlt: p.coverAlt || existing?.coverAlt || "",
      tags: JSON.stringify(p.tags),
      pairKey: p.pairKey || null,
      published: existing?.published || p.published,
      publishedAt: new Date(`${p.publishedAt}T12:00:00.000Z`),
      updatedBy: "blog-import",
    };
    const row = existing
      ? await prisma.blogPost.update({ where: { id: existing.id }, data })
      : await prisma.blogPost.create({ data: { ...data, locale: p.locale, slug: p.slug } });
    console.log(`${existing ? "updated" : "created"} ${row.locale}/${row.slug}${row.published ? "" : " (draft)"}`);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
