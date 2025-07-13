module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_" },
    ],
    "semi": ["error", "never"],
    "@typescript-eslint/semi": ["error", "never"],
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
}