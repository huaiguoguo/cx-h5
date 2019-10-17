<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back.png" />
      </div>
      <div class="pageName">提现</div>
      <div>
        <nuxt-link to="/user/cash_log">查看记录</nuxt-link>
      </div>
    </div>
    <div class="card">
      <div>
        <img src="~static/img/tixianchenggong.png" alt />
      </div>
      <div>提现成功</div>
      <div>(预计24小时之内到账)</div>

    </div>
    <div class="finish">完成</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            marginTopObject: ''
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        if (!this.$store.state.user.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            _this.$router.push('/user/login')
            return false
        }
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
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
        },
        tixan() {
            const shade = document.querySelector('.shade')
            shade.style.display = 'block'
        },
        close() {
            const shade = document.querySelector('.shade')
            shade.style.display = 'none'
        }
    }
}
</script>

<style lang='less' scoped>
input {
    outline: none;
    border: none;
}
textarea {
    outline: none;
    border: none;
}
.container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    background-color: #f4f4f4;

    .header {
        display: flex;
        justify-content: space-between;
        flex: auto;
        align-items: center;
        // height: 88px;
        // line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        padding: 45px 0px 20px 0px;
        background: #fff;
        a {
            font-size: 30px;
            color: #0084ff;
        }
        .goback {
            width: 16px;
            // height: 32px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .pageName {
            margin: 0 0 0 60px;
        }
    }
    .card {
        width: 500px;
        text-align: center;
        margin: 200px auto 100px auto;
        div:nth-child(1) {
            width: 80px;
            margin: 0 auto;
            text-align: center;
        }
        div:nth-child(2) {
            font-size: 30px;
            color: #333;
            margin: 30px 0 25px 0;
        }
        div:nth-child(3) {
            font-size: 24px;
            color: #666666;
        }
    }
    .finish {
        width: 570px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        margin: 0 auto;
        background-color: #00aeff;
        color: #fff;
        font-size: 36px;
    }
}
</style>
