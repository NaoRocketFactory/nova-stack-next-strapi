import Link from "next/link";
import styles from "./scss/NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <h2 className={styles.title}>Page not found</h2>
      <p className={styles.message}>
        This page does not exist or has been moved.
      </p>
      <Link href="/" className={styles.link}>
        ← Back to home
      </Link>
    </div>
  );
}
