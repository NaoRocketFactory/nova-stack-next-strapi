"use client";

import { useEffect } from "react";
import styles from "./scss/Error.module.scss";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isStrapiDown = error.message.toLowerCase().includes("fetch") ||
    error.message.includes("ECONNREFUSED") ||
    error.message.includes("timed out");

  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠</div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>
        {isStrapiDown
          ? "Cannot reach the API. Make sure Strapi is running on port 1337."
          : error.message || "An unexpected error occurred."}
      </p>
      {error.digest && (
        <p className={styles.digest}>Error ID: {error.digest}</p>
      )}
      <button className={styles.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
