module.exports = {
  ignorePatterns: [".eslintrc.cjs"],
  parser: "@typescript-eslint/parser", // Utiliza el parser de TypeScript
  extends: [
    "eslint:recommended", // Reglas recomendadas por ESLint
    "plugin:@typescript-eslint/recommended", // Reglas recomendadas para TypeScript
    "plugin:node/recommended", // Reglas recomendadas para Node.js
  ],
  parserOptions: {
    ecmaVersion: 2021, // Utiliza las características más modernas de ECMAScript
    sourceType: "module", // Soporta ES Modules
    project: "./tsconfig.json", // Apunta al archivo de configuración de TypeScript
  },
  env: {
    es6: true, // Habilita las características de ES6
    node: true, // Entorno Node.js
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn", // No requiere declarar explícitamente el tipo de retorno
    "@typescript-eslint/no-explicit-any": "warn", // Desalienta el uso de 'any'
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Error para variables no utilizadas, pero permite parámetros que empiezan con _
    "@typescript-eslint/no-var-requires": "error", // Requiere usar `import` en lugar de `require` en TypeScript

    // JavaScript / Node.js specific rules
    "no-var": "error", // Prohíbe el uso de `var`, usa `let` o `const` en su lugar
    "prefer-const": "error", // Prefiere `const` cuando una variable no cambia
    "no-console": "off", // Permite el uso de `console` para la depuración en Node.js
    "no-empty": ["error", { allowEmptyCatch: true }], // Permite bloques `catch` vacíos, pero prohíbe otros bloques vacíos
    "node/no-unsupported-features/es-syntax": [
      "error",
      { version: '>=8.3.0', ignores: ["modules"] },
    ], // Permite el uso de ES modules
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".ts", ".js", ".json"], // Resuelve módulos con estas extensiones
      },
    ],

    // Estilo de código y buenas prácticas
    semi: ["error", "always"], // Requiere punto y coma al final de las declaraciones
    eqeqeq: ["error", "always"], // Requiere el uso de `===` y `!==` en lugar de `==` y `!=`
  },
};
