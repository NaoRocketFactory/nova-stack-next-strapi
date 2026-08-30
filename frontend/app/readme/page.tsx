import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type { Metadata } from "next";
import styles from "../about/scss/about.module.scss";

export const metadata: Metadata = {
  title: "Nova Stack — Documentation Overview",
  description: "Overview of Nova Stack starter kit",
};

export default async function ReadmePage() {
  // Load the repo's root README.md (one level up from the frontend/ app).
  const filePath = path.join(process.cwd(), "..", "README.md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Parse Markdown
  const { content } = matter(fileContent);
  const processedContent = await remark().use(remarkGfm).use(html).process(content);
  const htmlContent = processedContent.toString();

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Nova Stack — README</h1>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </section>
  );
}
