// @ts-check
import eslintConfigPrettier from "eslint-config-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import ImportX from "eslint-plugin-import-x";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import globals from "globals";
import neostandard from "neostandard";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat();

export default tseslint.config(
  {
    files: ["**/*.{jsx,mjsx,tsx,mtsx}"],
    // @ts-ignore
    extends: [react.configs.flat.recommended],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // @ts-ignore
  // ...compat.config(ImportX.configs.recommended),
  // ImportX.configs.typescript,
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...neostandard({ ts: true, semi: true }),
      eslintConfigPrettier,
      eslintPluginPrettierRecommended,
    ],
    ignores: ["index.html", "node_modules/", "dist/", "backend/**/target"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
);
