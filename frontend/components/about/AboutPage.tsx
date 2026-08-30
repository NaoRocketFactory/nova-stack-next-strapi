import type { AboutContent } from "../../lib/content/about";
import styles from "./scss/AboutPage.module.scss";

interface AboutPageProps {
  content: AboutContent;
}

export default function AboutPage({ content }: AboutPageProps) {
  const { hero, mission, targets, features, kits, terms, follow, tagline } = content;

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{hero.title}</h1>
        <p className={styles.heroSubtitle}>{hero.subtitle}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{mission.heading}</h2>
        <p className={styles.prose}>{mission.body}</p>

        <div className={styles.targets}>
          {targets.items.map((item) => (
            <p key={item} className={styles.targetItem}>
              <span className={styles.arrow} aria-hidden>
                →
              </span>{" "}
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{features.heading}</h2>
        <div className={styles.features}>
          {features.items.map((item) => (
            <p key={item} className={styles.featureItem}>
              <span className={styles.check} aria-hidden>
                ✅
              </span>{" "}
              {item}
            </p>
          ))}
        </div>
        <p className={styles.note}>
          {features.note.split("\n").map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{kits.heading}</h2>
        <div className={styles.kitGrid}>
          {kits.items.map((kit) => (
            <div
              key={kit.name}
              className={`${styles.kitCard} ${kit.featured ? styles.kitCardFeatured : ""}`}
            >
              {kit.featured && <span className={styles.kitBadge}>This kit</span>}
              <h3 className={styles.kitName}>{kit.name}</h3>
              <p className={styles.kitTech}>{kit.tech}</p>
              <p className={styles.kitDescription}>{kit.description}</p>
              <a
                href={kit.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${
                  kit.available ? styles.btnPrimary : styles.btnDisabled
                }`}
              >
                {kit.price}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{terms.heading}</h2>
        <div className={styles.targets}>
          {terms.items.map((item) => (
            <p key={item} className={styles.targetItem}>
              <span className={styles.arrow} aria-hidden>
                →
              </span>{" "}
              {item}
            </p>
          ))}
        </div>
        <p className={styles.note}>
          {terms.note.split("\n").map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{follow.heading}</h2>
        <div className={styles.follow}>
          <a
            href={`https://${follow.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followLink}
          >
            🌐 {follow.website}
          </a>
          <a
            href={`https://${follow.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followLink}
          >
            🐙 {follow.github}
          </a>
          <a href={`mailto:${follow.email}`} className={styles.followLink}>
            📩 {follow.email}
          </a>
        </div>
      </section>

      <p className={styles.tagline}>{tagline}</p>
    </article>
  );
}
