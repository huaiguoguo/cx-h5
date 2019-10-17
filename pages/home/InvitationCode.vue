<template>
  <div class="container">
    <!-- <Nav v-if="isShow==1" /> -->
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back2.png" />
        <!-- ">>" -->
      </div>
      <div class="pageName">邀请码</div>
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch_white.png" alt />
      </div>
      <!-- <a href="/user/login">登录页</a>· -->
    </div>
    <div class="content">
      <div class="middle_card">
        <h4>您的邀请码</h4>
        <div ref="text1" class="InvitationCode">{{userinfo.tuiGuangCode}}</div>
        <div v-clipboard:copy="userinfo.tuiGuangCode" v-clipboard:success="onCopy" v-clipboard:error="onError" class="copy_code">复制</div>
        <textarea ref="input1" class="textarea" name readonly></textarea>
        <div>专属邀请链接</div>
        <div class="selfCode">
          <input ref="text2" type="text" :value="`http://api.championapp.vip/download/index.html#${userinfo.tuiGuangCode}`" name readonly />
          <textarea ref="input2" class="textarea" name></textarea>
          <div v-clipboard:copy="`http://api.championapp.vip/download/index.html#${userinfo.tuiGuangCode}`" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
        </div>
        <div class="InvitationType">
          <div>
            <img src="~static/img/home/wechatlogo.png" alt />
          </div>
          <div>
            <img src="~static/img/home/qqlogo.png" alt />
          </div>
        </div>
        <!-- <button v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError" type="button">Copy!开外挂开外挂</button> -->
        <!-- <button v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError" type="button">哈哈哈!</button> -->
        <div style="color:#000;">邀请规则</div>
        <div>
          <p style="color:#666;">1.从这个页面您可以复制您的推荐链接或发送给朋友</p>
          <p style="color:#666;">2.您的好友可以点击该推荐链接来注册一个champion账号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '~/components/Tab.vue'
// import Nav from '~/components/Nav.vue'
export default {
    components: {
        // Tab
        // Nav
    },
    data() {
        return {
            invitationCode: '',
            invitationUrl: '',
            isShow: 2,
            userinfo: '',
            message: '这是message',
            marginTopObject: ''
        }
    },
    mounted() {
        this.isIPhoneX()
        if (!this.$store.state.user.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            this.$router.push('/user/login')
            return false
        }
        this.userMsg()
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
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        userMsg() {
            const user = this.$store.state.user.userInfo
            this.userinfo = user
            console.log(user)
        },
        copy1() {
            this.$refs.input1.readOnly = 'readOnly'
            this.$refs.input1.value = this.$refs.text1.innerHTML
            this.$refs.input1.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        copy2() {
            this.$refs.input2.readOnly = 'readOnly'
            this.$refs.input2.value = this.$refs.text2.value
            this.$refs.input2.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        onCopy(e) {
            this.$toast.center('复制成功')
            // alert('You just copied: ' + e.text)
        },
        onError(e) {
            console.log(e)
            // alert('Failed to copy texts')
        }
    }
}
</script>

<style lang="less" scoped>
input {
    outline-style: none;
    border: none;
}
.container {
    // padding-top: 44px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: url('~static/img/home/code_bg.png');
    background-repeat: repeat-y;
    background-size: 100%;
    font-size: 24px;
    .header {
        width: 100%;

        display: flex;
        justify-content: space-between;
        height: 88px;
        line-height: 88px;
        padding: 45px 20px 0px 20px;
        text-align: center;
        font-size: 36px;
        color: #fff;
        .goback {
            width: 16px;
            // height: 32px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        div:nth-child(1) {
            width: 16px;
            height: 32px;
            // background-color: #000;
        }
        .avatar {
            img {
                width: 55px;
            }
        }
        .pageName {
            margin-left: 16px;
        }
    }
    .textarea {
        width: 0;
        height: 0;
        opacity: 0;
    }

    .content {
        width: 100%;
        padding: 0 20px;
        .middle_card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 710px;
            height: 600px;
            margin-top: 90px;
            background-color: #ffffff;
            border-radius: 10px;
            div {
                margin: 10px 0;
            }
            .copy_code {
                width: 162px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background-image: linear-gradient(
                    82deg,
                    #403fe2 0%,
                    #3a1dcd 100%
                );
                border-radius: 10px;
                font-size: 30px;
                color: #fff;
            }
            .InvitationCode {
                font-size: 48px;
                color: #3921b5;
            }
            .InvitationType {
                display: flex;
                justify-content: center;
                width: 100%;
                div {
                    margin: 0 60px;
                }
            }
            .selfCode {
                display: flex;
                width: 431px;
                height: 54px;
                border-radius: 10px;
                background-color: #f0f0f0;
                overflow: hidden;
                div {
                    width: 120px;
                    height: 100%;
                    line-height: 54px;
                    text-align: center;
                    color: #fff;
                    background-image: linear-gradient(
                        90deg,
                        #4438e2 0%,
                        #351bd2 100%
                    );
                    margin-top: -1px;
                }
                input {
                    width: 340px;
                    padding: 0px 5px;
                    background-color: #f0f0f0;
                }
            }
        }
    }
}
</style>
