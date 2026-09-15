import { Fragment } from "react";
import { parseMarkdown, type Block, type Inline } from "@/lib/blog/markdown";

/**
 * Renders a post body from its Markdown AST as plain React elements — no
 * `dangerouslySetInnerHTML`, so nothing an editor types can become markup.
 * External links open in a new tab with `rel="noopener"`.
 */
function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.type) {
          case "text":
            return <Fragment key={i}>{n.value}</Fragment>;
          case "br":
            return <br key={i} />;
          case "strong":
            return (
              <strong key={i}>
                <InlineNodes nodes={n.children} />
              </strong>
            );
          case "em":
            return (
              <em key={i}>
                <InlineNodes nodes={n.children} />
              </em>
            );
          case "code":
            return <code key={i}>{n.value}</code>;
          case "link": {
            const external = /^https?:\/\//i.test(n.href);
            return (
              <a
                key={i}
                href={n.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <InlineNodes nodes={n.children} />
              </a>
            );
          }
          case "image":
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={i} src={n.src} alt={n.alt} loading="lazy" />;
        }
      })}
    </>
  );
}

function BlockNode({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as "h2" | "h3" | "h4";
      return (
        <Tag id={block.id}>
          <InlineNodes nodes={block.children} />
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p>
          <InlineNodes nodes={block.children} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag>
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineNodes nodes={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote>
          <p>
            <InlineNodes nodes={block.children} />
          </p>
        </blockquote>
      );
    case "code":
      return (
        <pre>
          <code>{block.value}</code>
        </pre>
      );
    case "hr":
      return <hr />;
    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.alt && <figcaption>{block.alt}</figcaption>}
        </figure>
      );
  }
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className={className}>
      {blocks.map((b, i) => (
        <BlockNode key={i} block={b} />
      ))}
    </div>
  );
}
