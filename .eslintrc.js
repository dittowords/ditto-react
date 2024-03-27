module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "no-debugger": "error",
    "jest/no-focused-tests": "error",
  },
  ignorePatterns: ["dist*", "node_modules"],
};
