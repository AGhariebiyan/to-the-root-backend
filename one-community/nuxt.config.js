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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp',
        rel: 'stylesheet',
      },
    ],
  },

  publicRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
    axios: {
      baseURL: process.env.STRAPI_URL,
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios-accessor.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/global'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/strapi',
    '@nuxtjs/style-resources',
    'nuxt-material-design-icons',
    'vue-social-sharing/nuxt',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        user: {
          property: false,
        },
        token: {
          property: 'jwt',
        },
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
          },
          user: {
            url: 'users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },

  strapi: {
    entities: ['articles', 'authors', 'categories'],
    url: process.env.STRAPI_URL,
  },

  // Make these variables available through process.env in the components
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    // choose to suit your project
    interval: 200,
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss', '~/assets/scss/mixins.scss'],
  },
}
