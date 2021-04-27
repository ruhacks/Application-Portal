module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 11,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
    },
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {"code": 256}],
  },
};
