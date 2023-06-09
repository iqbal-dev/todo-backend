module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": [
      "error",
      {
        allow: ["info", "warn", "error"],
      },
    ],
  },
};
