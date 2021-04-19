module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest', '@typescript-eslint'],
  rules: {},
  globals: {
    DISCORD_WEBHOOK_URL: 'readonly',
    DISCORD_QUESTS: 'readonly',
    ENVIRONMENT: 'readonly',
    X_API_USER: 'readonly',
    X_API_KEY: 'readonly',
    DISCORD_QUEST_NON_PARTICIPANTS: 'readonly',
  },
}
