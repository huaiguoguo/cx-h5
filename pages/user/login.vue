<template>
  <div class="container">
    <!-- <BackNav :title="`登录`"/> -->
    <div class="header" :style="marginTopObject">
      <div class="header_content">
        <!-- <div class="title">{{loginTypeText}}登录</div> -->
        <div class="select">
          <div>Hello,</div>
          <div>欢迎回来CHAMPION</div>
        </div>
        <div class="content">
          <div class="input_item">
            <div class="input_inline">
              <div class="item_input">
                <input ref="email_mobile" v-model="formData.username" type="text" class="email_mobile" placeholder="邮箱/手机号" />
              </div>
              <div class="item_icon" @click="clearUsername()">
                <img src="~static/img/error.png" alt />
              </div>
            </div>
            <div class="notice">{{errors['formData.username']}}</div>
          </div>
          <div class="input_item">
            <div class="input_inline">
              <div class="item_input">
                <input ref="password" v-model="formData.password" type="password" class="password" placeholder="密码(8-20位数字和字母)" />
              </div>
              <div class="item_icon no_see" @click="canSee()">
                <img src="~static/img/eye.png" alt />
              </div>
            </div>
            <div class="notice">{{errors['formData.password']}}</div>
          </div>
          <div class="notice_b">{{responseErrorMsg}}</div>
          <div class="btn">
            <button @click="login">登录</button>
          </div>
        </div>
        <div class="footer">
          <p>
            <nuxt-link to="/user/changepwd">忘记密码?</nuxt-link>
          </p>
        </div>
        <div class="register">
          没有账号?
          <a href="/user/register">免费注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BackNav from '~/components/BackNav.vue'
export default {
    components: {
        // BackNav
    },
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            loginType: 0,
            loginTypeText: '',
            loginUrl: 'login/loginApp',
            responseErrorMsg: '',
            marginTopObject: ''
        }
    },
    vuerify: {
        'formData.username': {
            test(val) {
                const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
                const email_patter = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/
                this.loginTypeText = ''

                if (mobile_patter.test(val)) {
                    this.registerType = 1
                    this.loginTypeText = '手机'
                    return true
                }
                if (email_patter.test(val)) {
                    this.registerType = 2
                    this.loginTypeText = '邮箱'
                    return true
                }
                return false
            },
            message: '请输入正确的手机号或邮箱'
        },
        'formData.password': {
            test: /\S+/,
            message: '请输入密码'
        }
    },
    computed: {
        errors() {
            return this.$vuerify.$errors
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
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
        ...mapActions({
            loginState: 'user/login'
        }),
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
        clearUsername() {
            this.formData.username = ''
        },
        canSee() {
            this.$refs.password.type = 'text'
            // this.no_ee.style.display = 'none'
            // this.see.style.display = 'block'
        },
        noSee() {
            this.$refs.password.type = 'password'
            // this.no_ee.style.display = 'blcok'
            // this.see.style.display = 'none'
        },
        verify() {
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check()) {
                console.log(this.errors)
                return false
            }
            return true
        },
        login() {
            // eslint-disable-next-line eqeqeq
            if (!this.verify()) {
                return false
            }
            this.$axios
                .post(this.loginUrl, this.formData)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.loginState(res.data.data)
                        this.$router.push({ path: '/home' })
                    } else if (res.data.status === -1) {
                        this.responseErrorMsg = res.data.msg
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    width: 750px;
    height: 100%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    margin-top: 160px;
    .header {
        width: 100%;
        height: 100%;
        // background-color: red;
        font-size: 30px;
        .header_content {
            width: 100%;
            height: 100%;
            // background-color: yellow;
            padding-left: 20px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .title {
                margin-left: 26px;
                margin-top: 39px;
                // background-color: aquamarine;
                font-family: PingFang-SC-Medium;
                font-size: 48px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
            .select {
                display: flex;
                flex-direction: column;
                color: #000;
                font-size: 40px;
                div {
                    text-align: start;
                }
            }
        }
    }

    .content {
        width: 100%;
        height: 100%;
        margin-top: 78px;
        // background-color: aquamarine;\

        .input_item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            .input_inline {
                width: 100%;
                height: 109px;
                // background-color: yellowgreen;
                // margin-top: 30px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border: 0px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 3px;
                .item_input {
                    width: 100%;
                    height: 100%;
                    border: 0px;
                    // text-indent: 10px;
                    input {
                        width: 100%;
                        height: 100%;
                        border: 0px;
                        font-family: PingFang-SC-Medium;
                        font-size: 30px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #888888;
                        padding-left: 27px;
                    }
                }

                .item_icon {
                    height: 90px;
                    line-height: 90px;
                    padding-right: 25px;
                    // background-color: red;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }

            .input_inline:first-child .item_icon {
                max-width: 100%;
                max-height: 100%;
                padding-right: 30px;
                // background-color: yellow;
                img {
                    width: 30px;
                    // height: 17px;
                }
            }

            .input_inline:nth-child(2) {
                .item_icon {
                    max-width: 100%;
                    max-height: 100%;
                    // background-color: #1296db;
                    img {
                        width: 28px;
                        height: 15px;
                    }
                }
            }

            .notice {
                color: red;
                font-size: 23px;
                align-self: flex-start;
            }
        }

        .notice_b {
            width: 100%;
            // background-color: pink;
            color: red;
            font-size: 25px;
            margin-top: 20px;
        }

        .btn {
            width: 100%;
            height: 100%;
            margin-top: 121px;

            button {
                width: 490px;
                height: 67px;
                background-color: #1296db;
                border-radius: 10px;
                border: 0px;

                font-family: PingFang-SC-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }
    }

    .footer {
        width: 100%;
        // width: 133px;
        height: 29px;
        // background: #0070ab;
        p {
            a {
                font-size: 30px;
                color: #0070ab;
            }
            margin-top: 34px;
            margin-right: 126px;
            text-align: right;
            font-family: PingFang-SC-Medium;

            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
        }
    }
    .register {
        margin-top: 300px;
        width: 100%;
        a {
            font-size: 30px;
            color: #0070ab;
        }
    }
}
</style>
