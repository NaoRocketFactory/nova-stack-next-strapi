import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // --- Import presets ESLint classics via compat ---
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ),

  // --- Global ignores ---
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts"],
  },

  // --- TypeScript files: disable no-undef (TypeScript handles this) ---
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },

  // --- Custom rules ---
  {
    rules: {
      // ✅ Next.js
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "warn",

      // ✅ JS / TS
      "no-unused-vars": "warn",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",

      // ✅ Style / Prettier
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          singleQuote: false,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
          endOfLine: "auto",
        },
      ],
    },
  },
];
