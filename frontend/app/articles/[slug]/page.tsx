import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchCollection, fetchBySlug } from "../../../lib/api";
import { API_URL } from "../../../lib/api";
import type { Article } from "../../../types/strapi";
import BlockRenderer from "../../../components/blocks/BlockRenderer";
import styles from "./scss/article.module.scss";

// New articles published after the build are served on-demand and cached.
export const dynamicParams = true;
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetchCollection<Article>("articles");
    return res.data.map((article) => ({ slug: article.slug }));
  } catch {
    // Strapi not reachable at build time — pages will be rendered on demand.
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await fetchBySlug<Article>("articles", slug);
  if (!article) return {};
  return {
    title: `${article.title} – Nova Starter Kit`,
    description: article.title,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchBySlug<Article>("articles", slug);

  if (!article) notFound();

  const cover = article.image?.[0];

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <article className={styles.container}>
      <Link href="/articles" className={styles.back}>
        ← All articles
      </Link>

      {cover && (
        <div className={styles.coverWrapper}>
          <Image
            src={`${API_URL}${cover.url}`}
            alt={cover.alternativeText ?? article.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className={styles.cover}
            priority
          />
        </div>
      )}

      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        {article.publishedAt && (
          <time className={styles.date} dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        )}
      </header>

      {article.content && article.content.length > 0 ? (
        <BlockRenderer blocks={article.content} />
      ) : (
        <p className={styles.empty}>This article has no content yet.</p>
      )}
    </article>
  );
}
