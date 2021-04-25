import colors from 'vuetify/es5/util/colors'

const APPLICATION_NAME = 'Naval Nano ERP',
  APPLICATION_DESCRIPTION = 'Aplikasi ERP skala nano yang dibangun dengan memperhatikan kecepatan dan kemudahan dalam penggunaannya. ' + APPLICATION_NAME + ' merupakan satu kesatuan dari sistem Rekanpintar.',
  APPLICATION_YEAR = 2021,
  APPLICATION_API_URL = 'http://rekanpintar.local',
  TOKEN_MAX_AGE = 60 * 60 * 8

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  /**
   * Global Environment Values.
   */
  env: {
    APPLICATION_NAME: APPLICATION_NAME,
    APPLICATION_DESCRIPTION: APPLICATION_DESCRIPTION,
    APPLICATION_YEAR: APPLICATION_YEAR,
    APPLICATION_API_URL: APPLICATION_API_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + APPLICATION_NAME,
    title: process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true,
    /**
     * host & prefix sets the default host and prefix for every request using this.$axios!
     * So that the other components or pages only provide the URI to fetch the API resource.
     */
    host: 'localhost',
    prefix: '/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  proxy: {
    '/api': {
      target: APPLICATION_API_URL,
      pathRewrite: { '^/api': '/api/v1' },
    }
  },

  // Zero-boilerplate authentication support for Nuxt.js!
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        /**
         * @nuxtjs/auth-next automatically sets the default url to "./api".
         * In the name of Single Responsibility Principle of Axios API URL generation,
         * we will omit the api level with double dots notation: "..".
         */
        url: '..',
        token: {
          property: 'token',
          maxAge: TOKEN_MAX_AGE
        },
        refreshToken: {
          maxAge: TOKEN_MAX_AGE
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  /**
   * !!! Application Router !!!
   */
  router: {
    middleware: ['auth']
  }
}
