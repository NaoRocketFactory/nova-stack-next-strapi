import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ThemeToggle } from "../components/theme-toggle/ThemeToggle";
import styles from "./scss/Layout.module.scss";
import "../styles/globals.scss";
// Side-effect import: validates process.env at server startup (see lib/env.ts).
import "../lib/env";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Starter Kit",
  description: "A modern starter kit powered by Next.js, Strapi, Sass Modules, and TypeScript.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/pictures/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
  keywords: ["Next.js", "Strapi", "Sass", "Starter Kit", "TypeScript"],
  authors: [{ name: "Nao Rocket Factory", url: "https://github.com/NaoRocketFactory" }],
  creator: "Nao Rocket Factory",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Nova Starter Kit",
    description: "Clean, scalable, and Strapi-ready Next.js starter kit built for modern devs.",
    siteName: "Nova Starter Kit",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ThemeProvider>
          <div className={styles.layout}>
            <header className={styles.header}>
              <div className={styles.headerInner}>
                <Link href="/" className={styles.brand}>
                  Nova Starter Kit
                </Link>
                <nav className={styles.nav} aria-label="Main navigation">
                  <Link href="/" className={styles.navLink}>
                    Home
                  </Link>
                  <Link href="/articles" className={styles.navLink}>
                    Articles
                  </Link>
                </nav>
                <ThemeToggle />
              </div>
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/NaoRocketFactory"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nao Rocket Factory
              </a>{" "}
              — Built with Next.js &amp; Strapi.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
