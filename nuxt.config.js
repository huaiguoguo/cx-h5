export default {
    mode: 'spa', // spa universal
    /*
     ** Headers of the page
     */
    head: {
        title: 'Champion', // process.env.npm_package_name ||
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content:
                    // 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, '
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [
            {
                src: '/js/flexible.js',
                type: 'text/javascript',
                charset: 'utf-8'
            }
        ]
    },
    render: {
        resourceHints: {
            prefetch: false,
            preload: false
        }
    },
    generate: {
        dir: 'dist'
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '' },
    /*
     ** Global CSS
     */
    css: [
        'ant-design-vue/dist/antd.css',
        '@/static/css/public.css',
        'swiper/dist/css/swiper.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {
            src: '@/plugins/antd-ui'
        },
        { src: '~/plugins/axios', ssr: false },
        { src: '~/plugins/vuex-persist', ssr: false },
        { src: '~/plugins/vuex-persistedstate.js', ssr: false },
        { src: '~/plugins/vue-swiper.js', ssr: false },
        { src: '~/plugins/vuerify.js', ssr: false },
        { src: '~/plugins/vue-clipboard.js', ssr: false },
        { src: '~/plugins/toast.js', ssr: false }
        // { src: '~/plugins/echarts.js', ssr: false },
        // { src: '~/plugins/clipboard.js', ssr: false }
        // { src: '~/plugins/touch.js', ssr: false }
        // { src: '~/plugins/count_down.js', ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    env: {
        baseUrl: ''
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: false, // 表示开启代理
        https: true, // 表示开启https
        // baseURL: 'https://api.championapp.vip',
        prefix: '/index.php/home/', // 表示给请求url加个前缀 /api
        host: 'api.championapp.vip', // chaoxieapi.heiwangke.net
        port: '443',
        retry: { retries: 3 },
        credentials: false // 表示跨域请求时是否需要使用凭证
    },
    proxy: {
        '/index.php/': {
            target: 'https://api.championapp.vip:443', // 目标接口域名
            changeOrigin: true, // 表示是否跨域
            pathRewrite: {
                '^/home': '/' // 把 /home 替换成 /
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        vendor: ['vue2-toast'],
        extend(config, ctx) {
            if (ctx.isClient) {
                config.resolve.alias.vue = 'vue/dist/vue.js'
            }
        },
        transpile: ['vue-echarts', 'resize-detector'],
        postcss: [
            require('postcss-px2rem')({
                remUnit: 75, // 转换基本单位
                exclude: '/(node_module)/i'
                // propList: ['*'],
                // rootValue: 37.5, // 默认根目录字体大小(px)
                // unitPrecision: 5, // 保留小数位
                // // selectorBlackList: [''], //过滤的类名
                // replace: true, // 默认直接替换属性
                // mediaQuery: false,
                // minPixelValue: 12 // 所有小于设置的样式都不被转换
            })
        ]
    }
}
