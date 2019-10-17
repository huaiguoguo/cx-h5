<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back.png" />
      </div>
      <div class="pageName">找回密码</div>
      <!-- <a href="/user/login">登录页</a>· -->
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt />
      </div>
    </div>
    <div class="space-div"></div>
    <div class="info-list">
      <div class="info-item">
        <div>
          <input v-model="formData.username" type="text" placeholder="请输入邮箱/手机号" name="moblie" />
        </div>
        <div class="item-right-img"></div>
      </div>
      <div class="notice">{{(errors['formData.username']&&errors['formData.username']['0'])?errors['formData.username']['0']:''}}{{(errors['formData.username']&&errors['formData.username']['1'])?errors['formData.username']['1']:''}}</div>
      <div class="info-item">
        <div>
          <input v-model="formData.password" type="password" placeholder="新密码" name="moblie" />
        </div>
        <div class="item-right-img"></div>
      </div>
      <div class="notice">{{errors['formData.password']}}</div>
      <div class="info-item">
        <div>
          <input v-model="formData.password2" type="password" placeholder="重复新密码" name="moblie" />
        </div>
        <div class="item-right-img"></div>
      </div>
      <div class="notice">{{errors['formData.password2']}}</div>
      <div class="info-item">
        <div>
          <input v-model="formData.code" type="text" :placeholder="`输入${changeTypeText}验证码`" name="code" />
        </div>
        <div class="item-right-img">
          <span class="getCode" @click="getCode">{{secondText}}</span>
        </div>
      </div>
      <div class="notice">{{errors['formData.code']}}</div>
      <!-- <div class="notice_b">{{responseErrorMsg}}</div> -->
      <div class="btn-submit">
        <span @click="changeSubmit">修改</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            marginTopObject: '',
            first: 1,
            secondText: '获取验证码',
            second: 0,
            timer: null,
            formData: {
                username: '',
                password: '',
                password2: '',
                code: ''
            },
            changeType: 0,
            changeTypeText: '手机或者邮箱',
            sendCodeUrl: '',
            changePwdUrl: 'login/changePwd',
            sendCodeParam: null,
            responseErrorMsg: ''
        }
    },
    vuerify: {
        'formData.username': [
            {
                test(val) {
                    const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
                    const email_patter = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/
                    if (mobile_patter.test(val)) {
                        this.setChangeParam(1, val)
                        return true
                    }
                    if (email_patter.test(val)) {
                        this.setChangeParam(2, val)
                        return true
                    }
                    return false
                },
                message: '请输入正确的手机号或邮箱'
            }
        ],
        'formData.password': {
            test: /\S+/,
            message: '请输入新密码'
        },
        'formData.password2': {
            test(val) {
                // console.log(val)
                // console.log(this.formData.password)
                return val === this.formData.password
            },
            message: '两次密码输入不一致'
        },
        'formData.code': {
            test: /\S+/,
            message: '请输入验证码'
        }
    },
    computed: {
        regSecond() {
            return this.$store.state.user.regSecond
        },
        errors() {
            return this.$vuerify.$errors
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        // if (!this.$store.state.user.userInfo) {
        //     const _this = this
        //     this.$toast.center('请登录')
        //     this.$router.push('/user/login')
        //     return false
        // }
        // this.start()
        // this.registerByPhone()
        // this.getCode()
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
                this.marginTopObject = 'margin-top: 0.83rem;'
                this.float_cardStyle = 'top: 100px;'
            }
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        judge(val) {
            const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
            const email_patter = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/

            if (mobile_patter.test(val)) {
                this.setChangeParam(1, val)
                return true
            }
            if (email_patter.test(val)) {
                this.setChangeParam(2, val)
                return true
            }
            return false
        },
        setChangeParam(type, val) {
            this.changeTypeText = '手机或者邮箱'
            this.changeType = type
            if (type === 1) {
                this.changeTypeText = '手机'
                this.sendCodeUrl = 'login/sendPhoneCode'
                this.sendCodeParam = { phone: val }
            }
            if (type === 2) {
                this.changeTypeText = '邮箱'
                this.sendCodeUrl = 'login/sendEmailCode'
                this.sendCodeParam = { email: val }
            }
        },
        getCode() {
            const verifyRule = ['formData.username']
            if (!this.verify(verifyRule)) {
                return false
            }
            if (this.timer) {
                return false
            }

            this.judge(this.formData.username)
            if (!this.sendCodeUrl || !this.sendCodeParam) {
                return false
            }

            // 发送成功之后 进行倒计时
            this.$axios
                .post(this.sendCodeUrl, this.sendCodeParam)
                .then((res) => {
                    console.log('succ==============')
                    console.log(res)
                    if (res.data.status === -1) {
                        this.responseErrorMsg = res.data.msg
                        this.$toast.center(res.data.msg)
                    }
                    if (res.data.status === 1) {
                        this.$toast.center(res.data.msg)
                        // 开始倒计时
                    }
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        countDown() {
            if (!this.timer) {
                this.first = 0
                const currentTimeStamp = Date.parse(new Date()) / 1000
                if (this.$store.state.user.changeCipherEndTimestamp - 60 < currentTimeStamp) {
                    this.$store.commit('user/setChangeCipherEndTimestamp', currentTimeStamp + 60)
                }
                this.timer = setInterval(() => {
                    const currentTimeStampBa = Date.parse(new Date()) / 1000
                    const text = this.$store.state.user.changeCipherEndTimestamp - currentTimeStampBa + '秒后重发'
                    if (this.$store.state.user.changeCipherEndTimestamp > currentTimeStampBa && this.$store.state.user.changeCipherEndTimestamp > 0) {
                        this.secondText = text
                    } else {
                        clearInterval(this.timer)
                        this.timer = null
                        this.secondText = '重新获取'
                        this.$store.commit('user/setChangeCipherEndTimestamp', 0)
                    }
                }, 1000)
            }
        },
        verify(verifyRule = null) {
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check(verifyRule)) {
                console.log(this.errors)
                return false
            }
            return true
        },
        changeSubmit() {
            if (!this.verify()) {
                return false
            }
            this.$axios
                .post(this.changePwdUrl, this.formData)
                .then((res) => {
                    console.log('succ==============')
                    console.log(res)
                    if (res.data.status === 1) {
                        this.$toast.center('修改成功')
                        this.$store.commit('user/logout')
                        this.$router.push('/user/login')
                    } else {
                        this.responseErrorMsg = res.data.msg
                        this.$toast.center(res.data.msg)
                    }
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        }
    }
}
</script>

<style lang='less' scoped>
input {
    outline: none;
    border: none;
}
.container {
    body {
        box-sizing: border-box;
    }
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    // text-align: center;
    font-size: 20px;
    // background: red;
    a {
        font-size: 25px;
        color: red;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 88px;
        line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        box-shadow: 0px 50px 100px -30px rgba(0, 0, 0, 0.13);
        padding: 35px 20px 20px 20px;
        .goback {
            width: 16px;
            // height: 32px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .avatar {
            width: 55px;
        }
        .pageName {
            margin-left: 16px;
        }
    }
    .space-div {
        width: 100%;
        height: 16px;
    }
    .info-list {
        padding: 20px;
        margin-top: 20px;
        .info-item {
            display: flex;
            justify-content: space-between;
            height: 80px;
            line-height: 95px;
            font-size: 24px;
            color: #999;
            border-bottom: 1px solid #e8e8e8;
            color: #666;
            input {
                width: 500px;
                margin-left: 10px;
                font-size: 24px;
                caret-color: #1296db;
            }
            .item-right-img {
                width: 100%;
                // background: #000;
                .getCode {
                    display: block;
                    width: 100%;
                    height: 100%;
                    // background: #000;
                    font-size: 25px;
                    text-align: center;
                    color: #00a8ff;
                }
            }
        }

        .notice {
            width: 100%;
            color: red;
            font-size: 23px;
            // background-color: #000;
            margin-top: 5px;
            margin-bottom: 20px;
        }

        .notice_b {
            width: 100%;
            color: red;
            font-size: 25px;
            // background-color: #000;
            margin-top: 20px;
            margin-bottom: 10px;
        }
    }

    .btn-submit {
        margin: 140px auto 0 auto;
        width: 393px;
        height: 67px;
        line-height: 67px;
        background-color: #00a8ff;
        border-radius: 30px;
        color: #fff;
        text-align: center;
        span {
            width: 118px;
            height: 29px;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }
    }
}
</style>
