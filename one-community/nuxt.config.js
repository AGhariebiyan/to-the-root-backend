export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'one-community',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  publicRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['@/assets/scss/variables.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios-accessor.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/strapi', '@nuxtjs/style-resources'],
  strapi: {
    entities: ['articles', 'authors', 'categories'],
    url: 'http://localhost:1337',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    // choose to suit your project
    interval: 200,
  },
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },
}
