import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".cache/**",
      ".tmp/**",
      "public/uploads/**",
      // Strapi-generated build/type artifacts — not hand-written source.
      ".strapi/**",
      "types/generated/**",
      // Strapi generates a plain-JS admin customization entry from
      // app.example.tsx only once it's renamed — not linted until then.
      "src/admin/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
    },
  },
);
