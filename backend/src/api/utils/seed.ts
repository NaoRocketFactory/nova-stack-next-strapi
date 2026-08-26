import fs from "fs";
import path from "path";
import type { Core } from "@strapi/strapi";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/**
 * Registers a demo image already committed under backend/public/uploads/
 * into Strapi's media library (proper hash, thumbnails, admin-panel entry —
 * not just a static file). Safe to call on every boot: it reuses an existing
 * media entry with the same name instead of re-uploading a duplicate.
 */
async function uploadDemoImage(strapi: Core.Strapi, filename: string) {
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  if (!fs.existsSync(filepath)) {
    strapi.log.warn(`⚠️ Demo image not found, skipping: ${filepath}`);
    return null;
  }

  const existing = await strapi
    .plugin("upload")
    .service("upload")
    .findMany({ filters: { name: filename } });
  if (existing?.length > 0) {
    return existing[0];
  }

  const stats = fs.statSync(filepath);
  const mimetype = MIME_TYPES[path.extname(filename).toLowerCase()] ?? "image/jpeg";

  const [uploaded] = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: {},
      files: [
        {
          filepath,
          originalFilename: filename,
          newFilename: filename,
          mimetype,
          size: stats.size,
          hashAlgorithm: false,
        },
      ] as any,
    });

  return uploaded;
}

// Public-role permissions required for the frontend to read demo content.
// Without these, GET /api/articles and /api/pages return 403 on a fresh install
// (see "⚠️ Required step after installation" in the root README).
const PUBLIC_PERMISSIONS = [
  "api::article.article.find",
  "api::article.article.findOne",
  "api::page.page.find",
  "api::page.page.findOne",
];

/**
 * Grants the Public role read access (find/findOne) on Article and Page,
 * equivalent to ticking the boxes manually in Settings → Users & Permissions
 * Plugin → Roles → Public. Idempotent: only creates permissions that don't
 * already exist yet, so it's safe to call on every boot.
 */
async function grantPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) {
    strapi.log.warn("⚠️ Public role not found — skipping permission auto-grant.");
    return;
  }

  for (const action of PUBLIC_PERMISSIONS) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db.query("plugin::users-permissions.permission").create({
        data: { action, role: publicRole.id },
      });
      strapi.log.info(`🔓 Granted public permission: ${action}`);
    }
  }
}

export default async function seed({ strapi }: { strapi: Core.Strapi }) {
  strapi.log.info("🚀 Running seed...");

  // === SEED ARTICLES ===
  const articleCount = await strapi.documents("api::article.article").count({});
  strapi.log.info(`📊 Found ${articleCount} existing articles`);

  if (articleCount === 0) {
    // First boot on a fresh database — this is also the safe moment to grant
    // the public read permissions demo content needs. We don't do this
    // unconditionally on every boot so a deliberate permission change made
    // later (e.g. in production) is never silently overridden by a restart.
    await grantPublicPermissions(strapi);

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
        imageFile: "demo-article-1.jpg",
      },
      {
        title: "Next.js + Strapi + Sass = ❤️",
        slug: "nextjs-strapi-sass",
        content: makeBlock(
          "Your stack is now complete. You can edit or remove these demo entries."
        ) as any,
        imageFile: "demo-article-2.jpg",
      },
    ];

    for (const { imageFile, ...data } of articlesData) {
      const uploadedImage = await uploadDemoImage(strapi, imageFile);
      const created = await strapi.documents("api::article.article").create({
        data: { ...data, image: uploadedImage ? [uploadedImage.id] : [] },
      });
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
