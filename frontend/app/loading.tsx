import styles from "./scss/Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={`${styles.skeleton} ${styles.image}`} />
            <div className={styles.body}>
              <div className={`${styles.skeleton} ${styles.title}`} />
              <div className={`${styles.skeleton} ${styles.line}`} />
              <div className={`${styles.skeleton} ${styles.lineShort}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
