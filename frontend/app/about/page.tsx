import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import styles from "../about/scss/about.module.scss";

export default async function AboutPage() {
  // Load ABOUT.md
  const filePath = path.join(process.cwd(), "ABOUT.md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Parse Markdown
  const { content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return (
    <section className={styles.container}>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </section>
  );
}
