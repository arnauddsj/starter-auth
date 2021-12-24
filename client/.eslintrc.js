module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'comma-dangle': ['warn', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'max-len': [2, { code: 102, tabWidth: 4, ignoreUrls: true }],
  },
}
