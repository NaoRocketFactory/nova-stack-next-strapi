"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Catches errors thrown by the root layout itself — app/error.tsx can't,
// since it renders *inside* that layout. Must define its own <html>/<body>
// and can't rely on global.scss or the theme system having loaded, so
// styling here is inline and dependency-free on purpose.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1.5rem",
          textAlign: "center",
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#0f0f0f",
          color: "#f4f4f5",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem", color: "#f59e0b" }}>⚠</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#a1a1aa",
            maxWidth: 480,
            margin: "0 0 1.5rem",
            lineHeight: 1.6,
          }}
        >
          {error.message || "A critical error occurred and the app failed to render."}
        </p>
        {error.digest && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#a1a1aa",
              fontFamily: "monospace",
              margin: "0 0 1.5rem",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            padding: "0.625rem 1.5rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
