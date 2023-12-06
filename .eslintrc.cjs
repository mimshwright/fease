module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  plugins: ["@typescript-eslint", "react", "functional", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:functional/external-typescript-recommended",
    "plugin:functional/recommended",
    "plugin:functional/stylistic",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: true,
  },
  rules: {
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/semi": 0,
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "functional/prefer-immutable-types": 1,
    "functional/no-throw-statements": 1,
  },
  overrides: [
    {
      files: "*.{t,j}sx",
      rules: {
        "functional/no-return-void": 0,
        "functional/functional-parameters": 0,
        "functional/no-expression-statements": 0,
      },
    },
    {
      files: "*.test.{j,t}s{,x}",
      rules: {
        "functional/no-expression-statements": 0,
        "functional/no-return-void": 0,
        "unctional/no-expression-statements": 0,
      },
    },
  ],
};
