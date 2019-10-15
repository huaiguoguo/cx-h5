<template>
  <div>
    <Nav v-if="leftNavStatus" />
    <nuxt />
    <Tab v-if="pathArr.includes($route.path)" />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Nav from '~/components/Nav.vue'
import Tab from '~/components/Tab.vue'
export default {
    components: {
        Nav,
        Tab
    },
    data() {
        return {
            isShow: 0,
            showTab: 1,
            marginTopObject: '',
            pathArr: [
                '/',
                '/home',
                '/home/',
                '/home/deal',
                '/home/deal/',
                '/home/detail',
                '/home/detail/',
                '/home/bibi',
                '/home/bibi/',
                '/zichan/myteam',
                '/zichan/myteam/',
                '/zichan/jintai',
                '/zichan/jintai/'
            ]
        }
    },
    computed: {
        ...mapState('user', {
            leftNavStatus: 'leftNavStatus'
        })
    },
    created() {},
    mounted() {
        // :style="$route.path == '/home/kline'?'background:red':''"
        // this.isIPhoneX()
        const currentPath = this.$route.path
        console.log('current--------------------start')
        console.log(currentPath)
        console.log('current--------------------end')
        // console.log(currentPath)
    },
    methods: {
        ShowParent(payload) {
            this.isShow = payload
        },
        isIPhoneX() {
            const u = navigator.userAgent
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

            // iPhone X、iPhone XS
            const isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812
            // iPhone XS Max
            const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896
            // iPhone XR
            const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896

            if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
                this.marginTopObject = 'padding-top: 31px'
            }
        }
    }
}
</script>
<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
body{
      padding-right: constant(safe-area-inset-right);
        padding-left: constant(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

/* body 在横屏底下和竖屏底下一定要做好定位，不然*/
/* 竖屏底下的查询 */
        /* 防止页面被刘海遮住 */

/* 横屏底下的查询 */

</style>
