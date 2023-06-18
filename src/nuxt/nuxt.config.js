import colors from 'vuetify/es5/util/colors'
import colorScheme from './config/colorScheme'
import endpoints from './config/endpoints'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Synoptic Project',
        title: 'Synoptic Project',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    publicRuntimeConfig: {
        endpoints
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/index.scss',
        '~/assets/v-card.css',
        '~/assets/v-input.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/firebase.js' },
        { src: '~/plugins/firestore.js' },
        { src: '~/plugins/init.server.js' },
        { src: '~/plugins/init.client.js' },
        { src: '~/plugins/persistBasketFirestore.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/pwa'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        timeout: 1000
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            dark: false,
            customProperties: true,
            themes: {
                light: {
                    primary: colorScheme.restaurant_turquoise,
                    secondary: colorScheme.restaurant_navy,
                    accent: colorScheme.restaurant_gold,
                    warning: colorScheme.restaurant_gold,
                    info: colorScheme.restaurant_turquoise,
                    error: colorScheme.restaurant_red
                },
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
        },
        defaultAssets: {
            font: {
                family: 'Palatino'
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCss: true,
        babel: {
            plugins: [
                ['@babel/plugin-proposal-optional-chaining', { proposal: 'minimal' }]
            ]
        }
    },

    pwa: {
        meta: false,
        icon: false,

        workbox: {
            importScripts: [
                '/dist/sw_firebase_auth.js'
            ],
            dev: process.env.NODE_ENV === 'development'
        }
    }
}
