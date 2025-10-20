import type { Metadata } from "next";
import styles from "./scss/Layout.module.scss";
import "../styles/globals.scss";

/**
 * 🧠 Metadata Configuration
 * -----------------------------------------------------
 * This section defines SEO and social meta tags for your app.
 * You can customize these values according to your project name,
 * description, and domain.
 *
 * Note:
 * - `metadataBase` should point to your deployed domain or repo.
 * - You can extend this object with OpenGraph or Twitter card data.
 */
export const metadata: Metadata = {
  title: "Nova Starter Kit",
  description:
    "A modern starter kit powered by Next.js, Strapi, Sass Modules, and TypeScript.",
    icons: {
    icon: "/pictures/favicon.ico", // Standard browsers
    apple: "/pictures/nova-starter-kit-logo.png", // For iOS / Safari
  },
  keywords: ["Next.js", "Strapi", "Sass", "Starter Kit", "TypeScript"],
  authors: [
    { name: "Nao Rocket Factory", url: "https://github.com/NaoRocketFactory" },
  ],
  creator: "Nao Rocket Factory",
  metadataBase: new URL("https://github.com/NaoRocketFactory"),

  // Example of optional SEO extensions (uncomment if needed)
  // openGraph: {
  //   title: "Nova Starter Kit",
  //   description:
  //     "Clean, scalable, and Strapi-ready Next.js starter kit built for modern devs.",
  //   url: "https://naorocketfactory.com",
  //   siteName: "Nova Starter Kit",
  //   images: [
  //     { url: "/pictures/nova-starter-kit-logo.png", width: 1200, height: 630 },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};

/**
 * 🧩 Root Layout Component
 * -----------------------------------------------------
 * This is the main layout of your application.
 * It wraps all pages (App Router structure) and defines
 * the global HTML, <body>, and footer structure.
 *
 * The <main> tag displays the routed page content.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.layout}>
          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/NaoRocketFactory"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nao Rocket Factory — Built with ❤️ for devs.
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
