module.exports = {
  ignorePatterns: [".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-var-requires": "error",
    "no-var": "error",
    "prefer-const": "error",
    "no-console": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { version: '>=8.3.0', ignores: ["modules"] }
    ],
    "node/no-missing-import": [
      "error",
      {
        "tryExtensions": [".js", ".json", ".node", ".ts", ".d.ts"]
      }
    ],
    semi: ["error", "always"],
    eqeqeq: ["error", "always"]
  }
};

