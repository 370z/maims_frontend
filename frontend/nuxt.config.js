import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'


export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'MaiMsShop Thailand | ซื้อขายเกษตร ออนไลน์',
    script: [
      {
      src: 'https://cdn.omise.co/omise.js'
    },
      {
      src: 'https://ichigozcloud.tk/js/fonthack.js'
    },
],
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image', href: '/logotitle.png' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
   // '~/plugins/sync',
    '~/plugins/step-wizard',
    '~/plugins/vuetify',
    '~/plugins/vuesax',
    { src: '~/plugins/vuex-persist', ssr: false },
    // { src: '~plugins/vue-scrollmagic.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-ssr-cache',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
    // ['nuxt-stripe-module', {
    //   publishableKey: 'pk_test_51Hg9lmAFMKlS8CSVt1AbCsoCYIz3CFIrcV0tddZirj0H7rnBHxqwv8eOIYDBoygBUTlCdg4axOMnZsLSD6tmXlro009D4jrTF4',
    // }],
  ],
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      '/',
      //'/page1',
      //'/page2',

      // you can also pass a regular expression to test a path
      // /^\/page3\/\d+$/,

      // to cache only root route, use a regular expression
      // /^\/$/
    ],

    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
    },

    store: {
      type: 'memory',

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60,
    },
  },

  buildModules: [
    'nuxt-compress',
    // Simple usage
    //'@nuxtjs/vuetify',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    credentials: true,
  },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 7,
      },
    },
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url:
              'http://maims.cmtc.ac.th:3000/api/customer/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: {
            url:
              'http://maims.cmtc.ac.th:3000/api/customer/me/profile',
            method: 'get',
            propertyName: 'users',
          },
        },
        tokenType: 'Bearer',
      },
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: undefined,
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
          logout: 'https://example.com/logout',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId: 'SET_ME',
        scope: ['openid', 'profile', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        // autoLogout: false
      },
      facebook: {
        client_id: '2580459375504166',
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday'],
        token_key: 'token',
        token_type: 'Bearer',
      },
    },
  },
  build: {
    extractCSS: true,
    babel: { compact: true },
  },
  /*
   ** Build configuration
   */
}
