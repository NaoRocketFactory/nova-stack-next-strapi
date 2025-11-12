import type { Core } from "@strapi/strapi";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function seed({ strapi }: { strapi: Core.Strapi }) {
  strapi.log.info("🚀 Running seed...");

  // === SEED ARTICLES ===
  const articleCount = await strapi.documents("api::article.article").count({});
  strapi.log.info(`📊 Found ${articleCount} existing articles`);

  if (articleCount === 0) {
    const makeBlock = (text: string) => [
      { type: "paragraph", children: [{ type: "text", text }] },
    ];

    const articlesData = [
      {
        title: "Welcome to Nova Starter Kit 🚀",
        slug: "welcome-nova-starter-kit",
        content: makeBlock(
          "This is a demo article created automatically on startup."
        ) as any,
        image: [],
      },
      {
        title: "Next.js + Strapi + Sass = ❤️",
        slug: "nextjs-strapi-sass",
        content: makeBlock(
          "Your stack is now complete. You can edit or remove these demo entries."
        ) as any,
        image: [],
      },
    ];

    for (const data of articlesData) {
      const created = await strapi
        .documents("api::article.article")
        .create({ data });
      await strapi
        .documents("api::article.article")
        .publish({ documentId: created.documentId });
      strapi.log.info(`✅ Published article: ${data.title}`);
    }

    strapi.log.info("🌱 Demo articles successfully created and published!");
  } else {
    strapi.log.info("ℹ️ Skipping article seed.");
  }

  // === WAIT BEFORE SEEDING PAGES ===
  await delay(2000); // 👈 laisse Strapi initialiser le modèle Page
  strapi.log.info("⏳ Waiting before seeding pages...");

  // === SEED PAGES ===
  const pageCount = await strapi.documents("api::page.page").count({});
  strapi.log.info(`📊 Found ${pageCount} existing pages`);

  if (pageCount === 0) {
    const makeBlock = (text: string) => [
      { type: "paragraph", children: [{ type: "text", text }] },
    ];

    const pagesData = [
      {
        title: "Home",
        slug: "home",
        content: makeBlock(
          "Welcome to your Strapi + Next.js Starter Kit homepage 🚀"
        ) as any,
      },
      {
        title: "About",
        slug: "about",
        content: makeBlock(
          "This is the About page. You can edit or delete it from the Strapi admin panel."
        ) as any,
      },
    ];

    for (const data of pagesData) {
      const created = await strapi
        .documents("api::page.page")
        .create({ data });
      await strapi
        .documents("api::page.page")
        .publish({ documentId: created.documentId });
      strapi.log.info(`✅ Published page: ${data.title}`);
    }

    strapi.log.info("🌱 Demo pages successfully created and published!");
  } else {
    strapi.log.info("ℹ️ Skipping page seed.");
  }

  strapi.log.info("✅ Seed process complete!");
}
