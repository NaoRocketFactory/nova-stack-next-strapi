import Link from "next/link";
import Image from "next/image";
import { fetchCollection } from "../../lib/api";
import type { Article } from "../../types/strapi";
import { API_URL } from "../../lib/api";
import styles from "./scss/articles.module.scss";

// Same ISR strategy as app/articles/[slug]/page.tsx.
export const revalidate = 3600;

export const metadata = {
  title: "Articles – Nova Starter Kit",
  description: "All articles published via Strapi CMS.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  const res = await fetchCollection<Article>("articles");
  const articles = res.data;

  if (articles.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No articles published yet.</p>
        <p>Create your first article in the Strapi admin panel.</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Articles</h1>
      <div className={styles.grid}>
        {articles.map((article) => {
          const cover = article.image?.[0];
          return (
            <Link
              key={article.documentId}
              href={`/articles/${article.slug}`}
              className={styles.card}
            >
              {cover ? (
                <div className={styles.imageWrapper}>
                  <Image
                    src={`${API_URL}${cover.url}`}
                    alt={cover.alternativeText ?? article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.coverImage}
                  />
                </div>
              ) : (
                <div className={`${styles.imageWrapper} ${styles.placeholder}`} />
              )}
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{article.title}</h2>
                {article.publishedAt && (
                  <time className={styles.date} dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
