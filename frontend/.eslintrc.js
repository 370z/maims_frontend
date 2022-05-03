// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/base'
  ],
  plugins: [
    'vuetify'
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
'vuetify/no-legacy-grid': 'error',
  }
}
