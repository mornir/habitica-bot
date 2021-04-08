module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {},
  globals: {
    DISCORD_WEBHOOK_URL: 'readonly',
    DISCORD_QUESTS: 'readonly',
    ENVIRONMENT: 'readonly',
  },
}
