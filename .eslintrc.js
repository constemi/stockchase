module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
