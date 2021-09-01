module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'jquery'],
  rules: {
    'prettier/prettier': 'error',
    'no-alert': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
  },
};
