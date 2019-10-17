<template>
  <div class="backContainer" :style="marginTopObject">
    <div class="back_content">
      <div class="left_arrow" @click="$router.push('/home')">
        <img src="~static/img/back.png" alt />
      </div>
      <div class="title">{{title}}</div>
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt />
      </div>
    </div>
    <div v-if='isOrder' class="header">
      <div class="nav">
        <div class="item inprogress" @click="$router.push('/user/order-ing')">
          <span v-if="$route.path === '/user/order-ing'" class="active">进行中</span>
          <span v-else class>进行中</span>
        </div>
        <div class="item inprogress" @click="$router.push('/user/order-wait')">
          <span v-if="$route.path === '/user/order-wait'" class="active">待支付</span>
          <span v-else enter-to-class="">待支付</span>
        </div>
        <div class="item inprogress" @click="$router.push('/user/order-waitEnter')">
          <span v-if="$route.path === '/user/order-waitEnter'" class="active">待确认</span>
          <span v-else class>待确认</span>
        </div>
        <div class="item completed" @click="$router.push('/user/order-finish')">
          <span v-if="$route.path === '/user/order-finish'" class="active">已完成</span>
          <span v-else class>已完成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BackNav',
    props: {
        title: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            marginTopObject: '',
            isOrder: 0
        }
    },
    mounted() {
        this.isIPhoneX()
        let pathArr = [
            '/user/order-ing',
            '/user/order-ing/',
            '/user/order-wait',
            '/user/order-wait/',
            '/user/order-waitEnter',
            '/user/order-waitEnter/',
            '/user/order-finish',
            '/user/order-finish/'
        ]
        if (pathArr.includes(this.$route.path)) {
            this.isOrder = 1
        }
    },
    methods: {
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
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
                this.marginTopObject = 'top: 0.83rem'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.backContainer {
    width: 100%;
    height: 90px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0px 20px 30px -10px rgba(0, 0, 0, 0.13);
    position: fixed;
    top: 45px;
    z-index: 10;
    .back_content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: blue;
        padding: 0 20px;
        .left_arrow {
            width: 8%;
            height: 80px;
            line-height: 80px;
            // background-color: orange;
            text-align: center;
            img {
                max-width: 32%;
                // max-height: 20%;
            }
        }
        .title {
            // width: 55%;
            margin: 0 auto;
            // background: #000;
            font-family: PingFang-SC-Bold;
            font-size: 36px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
            text-align: left;
        }
        .avatar {
            width: 55px;
        }
    }
    .header {
        .nav {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            .item {
                width: 50%;
                height: 70px;
                line-height: 70px;
                margin-top: 20px;
                span {
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    font-weight: bold;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #0017fe;

                    &.active {
                        border-bottom: 5px solid #0017fe;
                    }
                }
            }
        }
    }
}
</style>
