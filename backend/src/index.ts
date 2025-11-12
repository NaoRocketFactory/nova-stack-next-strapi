// src/index.ts

/**
 * 🚀 Strapi Application Entry Point
 * ---------------------------------
 * This file defines lifecycle hooks for the Strapi application:
 * - register(): runs before initialization (extend core or register plugins)
 * - bootstrap(): runs before the app starts (ideal for setup tasks)
 *
 * In this project, we use `bootstrap()` to seed demo data from
 * a separate utility located at `src/utils/seed.ts`.
 */

import type { Core } from "@strapi/strapi";
import seed from "./api/utils/seed";
 // 👈 import your existing seeding logic

export default {
  /**
   * 🧩 Register lifecycle hook
   * ------------------------------------------------------------
   * Runs before Strapi initializes. You can use this to:
   *  - Register custom fields
   *  - Extend core services
   *  - Customize plugin behavior
   */
  async register({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info("🧠 Register phase started...");
    // Example: strapi.customFields.register();
  },

  /**
   * 🌱 Bootstrap lifecycle hook
   * ------------------------------------------------------------
   * Runs just before the Strapi application starts.
   *
   * Typical use cases:
   *  - Seeding demo data
   *  - Scheduling cron jobs
   *  - Preloading configuration
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info("🚀 Strapi bootstrap starting...");

    try {
      // Call your seeding script (only runs if needed)
      await seed({ strapi });
      strapi.log.info("✅ Demo data seeding complete.");
    } catch (error) {
      strapi.log.error("❌ Error during seeding:", error);
    }

    strapi.log.info("🟢 Bootstrap process completed.");
  },
};
