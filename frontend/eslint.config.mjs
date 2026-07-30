import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  // --- Global ignores ---
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts"],
  },

  // --- Native flat-config presets (no FlatCompat needed on ESLint 9 + Next 16) ---
  js.configs.recommended,
  ...nextCoreWebVitals,
  eslintPluginPrettierRecommended,

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

export default config;
