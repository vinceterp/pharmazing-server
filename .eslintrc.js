export default {
  extends: "eslint:recommended",
  globals: {
    process: true,
  },
  env: {
    node: true,
    commonjs: true,
    browser: false,
    es6: false,
  },
};
