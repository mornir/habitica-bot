module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  globals: {
    DISCORD_WEBHOOK_URL: 'readonly',
    DISCORD_QUESTS: 'readonly',
  },
}
