<template>
  <div class="container">
    <!-- <Nav v-if="isShow==1" /> -->
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back.png" alt />
      </div>
      <div class="pageName">公告</div>
    </div>
    <div class="content">
      <div class="null-img">
        <img src="~static/img/notice_bg.png" />
        <div>暂无公告</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isShow: 2,
            marginTopObject: ''
        }
    },
    mounted() {
        this.isIPhoneX()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
    },
    methods: {
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
                this.marginTopObject = 'margin-top: 0.83rem'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    .header {
        display: flex;
        width: 100%;
        height: 88px;
        padding: 0 20px;
        line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        .goback {
            width: 16px;
            // height: 32px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .pageName {
            margin: 0 auto;
        }
        // height: 88px;
        // line-height: 88px;
        // text-align: center;
        // font-size: 36px;
        // color: #333;
    }
    .content {
        width: 100%;
        .null-img {
            width: 698px;
            height: 622px;
            margin: 110px auto;
        }
        div {
            margin-top: 85px;
            text-align: center;
            font-size: 36px;
            color: #586ead;
        }
    }
}
</style>
