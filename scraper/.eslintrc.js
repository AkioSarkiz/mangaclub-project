// eslint-disable-next-line @typescript-eslint/no-var-requires
const stylistic = require('@stylistic/eslint-plugin');

const customized = stylistic.configs.customize({
  'indent': 2,
  'quotes': 'single',
  'semi': true,
  'linebreak-style': 'unix',
});

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@stylistic'],
  rules: {
    ...customized.rules,
  },
};
