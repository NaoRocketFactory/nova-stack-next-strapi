import Image from "next/image";
import { API_URL } from "../../lib/api";
import type { StrapiBlock, StrapiBlockChild } from "../../types/strapi";
import styles from "./scss/BlockRenderer.module.scss";

// ---------------------------------------------------------------------------
// Inline text node renderer (bold, italic, code, link, etc.)
// ---------------------------------------------------------------------------
function InlineChild({ child }: { child: StrapiBlockChild }) {
  let node: React.ReactNode = child.text ?? "";

  if (child.bold)          node = <strong>{node}</strong>;
  if (child.italic)        node = <em>{node}</em>;
  if (child.underline)     node = <u>{node}</u>;
  if (child.strikethrough) node = <s>{node}</s>;
  if (child.code)          node = <code className={styles.inlineCode}>{node}</code>;

  if (child.type === "link" && child.url) {
    return (
      <a href={child.url} target="_blank" rel="noopener noreferrer">
        {child.children?.map((c, i) => <InlineChild key={i} child={c} />) ?? node}
      </a>
    );
  }

  return <>{node}</>;
}

function renderChildren(children: StrapiBlockChild[]) {
  return children.map((child, i) => <InlineChild key={i} child={child} />);
}

// ---------------------------------------------------------------------------
// Block-level renderer
// ---------------------------------------------------------------------------
function Block({ block }: { block: StrapiBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{renderChildren(block.children)}</p>;

    case "heading": {
      const Tag = `h${block.level ?? 2}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return <Tag className={styles.heading}>{renderChildren(block.children)}</Tag>;
    }

    case "list":
      if (block.format === "ordered") {
        return (
          <ol className={styles.list}>
            {block.children.map((item, i) => (
              <li key={i}>{renderChildren(item.children ?? [])}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={styles.list}>
          {block.children.map((item, i) => (
            <li key={i}>{renderChildren(item.children ?? [])}</li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className={styles.quote}>
          {renderChildren(block.children)}
        </blockquote>
      );

    case "code":
      return (
        <pre className={styles.codeBlock}>
          <code>{renderChildren(block.children)}</code>
        </pre>
      );

    case "image":
      if (!block.image) return null;
      return (
        <figure className={styles.figure}>
          <Image
            src={`${API_URL}${block.image.url}`}
            alt={block.image.alternativeText ?? ""}
            width={block.image.width ?? 800}
            height={block.image.height ?? 450}
            className={styles.image}
          />
          {block.image.caption && (
            <figcaption className={styles.figcaption}>
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );

    case "divider":
      return <hr className={styles.divider} />;

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
interface BlockRendererProps {
  blocks: StrapiBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className={styles.root}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
