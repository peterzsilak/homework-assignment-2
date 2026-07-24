import js from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import globals from "globals";

export default [
    {
        ignores: [
            "node_modules/**",
            "playwright-report/**",
            "test-results/**",
            ".github/**/*.ts",
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsEslintParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.node },
        },
        plugins: {
            "@typescript-eslint": tsEslintPlugin,
        },
        rules: {
            "no-undef": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },
    {
        files: ["src/tests/**/*.ts", "playwright.config.ts"],
        ...playwright.configs["flat/recommended"],
        languageOptions: {
            parser: tsEslintParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.node },
        },
        rules: {
            "playwright/expect-expect": "error",
            "playwright/missing-playwright-await": "error",
            "playwright/no-conditional-in-test": "error",
            "playwright/no-element-handle": "error",
            "playwright/no-focused-test": "error",
            "playwright/no-networkidle": "error",
            "playwright/no-skipped-test": ["error", { allowConditional: true }],
            "playwright/no-wait-for-timeout": "error",
            "playwright/prefer-locator": "error",
            "playwright/prefer-to-have-count": "error",
            "playwright/prefer-web-first-assertions": "error",
        },
    },
];
