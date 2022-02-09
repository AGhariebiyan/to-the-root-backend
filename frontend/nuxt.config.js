export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ToTheRoot',
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
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    axios: {
      baseUrl: process.env.STRAPI_URL,
    },
  },

  env: {
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
    algoliaIndex: process.env.ALGOLIA_INDEX,
    emailJSServiceID: process.env.EMAILJS_SERVICE_ID,
    emailJSUserID: process.env.EMAILJS_USER_ID
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios-accessor.ts', { src: '~/plugins/prism' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/strapi',
    '@nuxtjs/style-resources',
    'nuxt-material-design-icons',
    'vue-social-sharing/nuxt',
    'nuxt-lazy-load',
    'cookie-universal-nuxt',
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },

  generate: {
    // choose to suit your project
    interval: 200,
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss', '~/assets/scss/mixins.scss'],
  },

  css: ['~/assets/css/algolia.scss'],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    disabled: true,
    debug: {
      sendHitTask: true,
    },
    autoTracking: {
      screenview: true,
    },
  },

  router: {
    middleware: ['loggedInGuard'],
  },
}
