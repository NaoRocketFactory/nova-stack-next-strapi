import Image from "next/image";
import styles from "../../components/main/scss/Main.module.scss";
import logoNova from "../../public/pictures/nova-starter-kit-logo.png";

export default function Main() {

  return (
    <section className={styles.main}>
      <div className={styles.logoWrapper}>
        <Image
          src={logoNova}
          alt="Nova Starter Kit logo"
          className={styles.logo}
          priority
        />
      </div>
      <h2 className={styles.title}> Welcome and enjoy !</h2>
      <p className={styles.subtitle}>
        Next.js + Strapi + Sass Modules + TypeScript.
      </p>
      <a
        href="/readme"
        className={styles.link}
      >
        📖 View README
      </a>
      <a
      href="/about"
      className={styles.link}
      >
      📖 About Nao Rocket Factory
      </a>
    </section>
  );
}
