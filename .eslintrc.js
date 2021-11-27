module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'space-before-function-paren': 0
  }
}
