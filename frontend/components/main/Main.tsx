import Image from "next/image";
import Link from "next/link";
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

      <div className={styles.ctaRow}>
        <Link href="/readme" className={`${styles.btn} ${styles.btnGhost}`}>
          📖 README
        </Link>
        <a
          href="https://naorocketfactory.dev/kits/nova-stack"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          🛒 Buy Nova Stack — 59€
        </a>
      </div>

      <a href="/about" className={styles.link}>
        📖 About Nao Rocket Factory
      </a>
    </section>
  );
}
