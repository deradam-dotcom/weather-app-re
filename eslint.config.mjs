import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import rootConfig from "../../eslint.config.mjs";

export default [
  ...rootConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/react-compiler": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/prefer-literal-enum-member": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "no-useless-constructor": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { args: "none", ignoreRestSiblings: true },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
