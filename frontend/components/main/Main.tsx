"use client";

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
        href="https://github.com/NaoRocketFactory/nova-stack-next-strapi/blob/main/README.md" // Remplace par ton repo
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        📖 View README
      </a>
    </section>
  );
}
