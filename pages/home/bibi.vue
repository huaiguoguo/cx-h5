<template>
  <div class="container">
    <!-- <Nav v-if="isShow==1" /> -->
    <div class="header" :style="marginTopObject">币币</div>
    <div class="content">
      <div class="null-img">
        <img src="~static/img/index_bg.png" />
        <div>此功能暂未开放</div>
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
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 36px;
        color: #333;
    }
    .content {
        width: 100%;
        padding: 0 20px;
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
