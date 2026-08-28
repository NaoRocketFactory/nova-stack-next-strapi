import Image from "next/image";
import styles from "../../components/main/scss/Main.module.scss";
import logoNova from "../../public/pictures/logo-nova-stack.png";

export default function Main() {
  return (
    <section className={styles.main}>
      <div className={styles.logoWrapper}>
        <Image src={logoNova} alt="Nova Starter Kit logo" className={styles.logo} priority />
      </div>
      <h2 className={styles.title}> Welcome and enjoy !</h2>
      <p className={styles.subtitle}>Next.js + Strapi + Sass Modules + TypeScript.</p>

      <div className={styles.docs}>
        <h3 className={styles.docsTitle}>Documentation</h3>
        <div className={styles.docsLinks}>
          <a
            href="https://github.com/NaoRocketFactory/nova-stack-next-strapi/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            📖 Getting Started
          </a>
          <a
            href="https://github.com/NaoRocketFactory/nova-stack-next-strapi/blob/main/frontend/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            🎨 Frontend Guide
          </a>
          <a
            href="https://github.com/NaoRocketFactory/nova-stack-next-strapi/blob/main/backend/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            ⚙️ Backend Guide
          </a>
        </div>
      </div>

      <a href="/about" className={styles.link}>
        📖 About Nao Rocket Factory
      </a>
    </section>
  );
}
