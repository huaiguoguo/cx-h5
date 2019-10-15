<template>
    <div class="container">
        <div class="header" :style="marginTopObject">
            <div class="header_content">
                <div class="title">{{registerTypeText}}注册</div>
                <div class="select">
                    <!-- <div class="item_pic">
            <img v-if="country == 0" class="img" src="~static/img/china.png" />
            <img v-if="country == 1" class="img" src="~static/img/Korea.png" />
            <img v-if="country == 2" class="img" src="~static/img/Angola.png" />
            <img v-if="country == 3" class="img" src="~static/img/Vietnam.png" />
            <img v-if="country == 4" class="img" src="~static/img/Indonesia.png" />
                    </div>-->
                    <div class="item_selected">
                        <select ref="country" class="select_county" @click="countrys()">
                            <option value="0">中国</option>
                            <option value="1">韩国</option>
                            <option value="2">安哥拉</option>
                            <option value="3">越南</option>
                            <option value="4">日本</option>
                            <option value="4">新加坡</option>
                            <option value="4">马来西亚</option>
                            <option value="4">菲律宾</option>
                            <option value="4">沙特阿拉伯</option>
                            <option value="4">朝鲜</option>
                            <option value="4">缅甸</option>
                            <option value="4">德国</option>
                            <option value="4">英国</option>
                            <option value="4">法国</option>
                            <option value="4">爱尔兰</option>
                            <option value="4">波兰</option>
                            <option value="4">西班牙</option>
                            <option value="4">意大利</option>
                            <option value="4">爱尔兰</option>
                            <option value="4">俄罗斯</option>
                            <option value="4">荷兰</option>
                            <option value="4">美国</option>
                            <option value="4">加拿大</option>
                            <option value="4">巴西</option>
                            <option value="4">阿根廷</option>
                            <option value="4">新西兰</option>
                            <option value="4">印度</option>
                            <option value="4">埃及</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="input_item">
                <div class="input_line">
                    <div class="item_input">
                        <input
                            v-model="formData.phone"
                            type="text"
                            class="email_mobile"
                            placeholder="邮箱/手机号"
                        />
                    </div>
                    <div class="item_icon">
                        <img src="~static/img/error.png" alt />
                    </div>
                </div>
                <div
                    class="notice"
                >{{(errors['formData.phone']&&errors['formData.phone']['0'])?errors['formData.phone']['0']:''}}{{(errors['formData.phone']&&errors['formData.phone']['1'])?errors['formData.phone']['1']:''}}</div>
            </div>

            <div class="input_item">
                <div class="input_line">
                    <div class="item_input">
                        <input
                            v-model="formData.code"
                            type="text"
                            class="email_mobile"
                            :placeholder="`请输入${registerTypeText}验证码`"
                        />
                    </div>
                    <div class="item_code">
                        <p @click="getCode">{{secondText}}</p>
                    </div>
                </div>
                <div class="notice">{{errors['formData.code']}}</div>
            </div>

            <div class="input_item">
                <div class="input_line">
                    <div class="item_input">
                        <input
                            v-model="formData.password"
                            type="password"
                            class="password"
                            placeholder="密码(8-20位数字和字母)"
                        />
                    </div>
                    <div class="item_icon">
                        <img src="~static/img/eye.png" alt />
                    </div>
                </div>
                <div class="notice">{{errors['formData.password']}}</div>
            </div>
            <div class="input_item">
                <div class="input_line">
                    <div class="item_input">
                        <input
                            v-model="formData.password2"
                            type="password"
                            class="password"
                            placeholder="请设置二级密码"
                        />
                    </div>
                    <div class="item_icon"></div>
                </div>
                <div class="notice">{{errors['formData.password2']}}</div>
            </div>
            <div class="input_item">
                <div class="input_line">
                    <div class="item_input">
                        <input
                            v-model="formData.yqCode"
                            type="text"
                            class="password"
                            placeholder="请输入邀请码"
                        />
                    </div>
                    <div class="item_icon"></div>
                </div>
                <div class="notice">{{errors['formData.yqCode']}}</div>
            </div>
            <div class="btn">
                <button @click="registerSubmit">免费注册</button>
            </div>
        </div>
        <div class="footer">
            <nuxt-link to="/user/login">
                <p style="color:#1296db;" class="logintext">登录</p>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import CountDown from '~/components/CountDown.vue'
export default {
    data() {
        return {
            first: 1,
            secondText: '获取验证码',
            second: 0,
            timer: null,
            formData: {
                phone: '',
                email: '',
                password: '',
                code: '',
                yqCode: '',
                password2: ''
            },
            registerType: 0,
            registerTypeText: '',
            sendCodeUrl: '',
            registerUrl: '',
            sendCodeParam: null,
            country: '',
            marginTopObject: ''
        }
    },
    vuerify: {
        'formData.phone': [
            {
                test(val) {
                    const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
                    const email_patter = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/
                    if (mobile_patter.test(val)) {
                        this.setRegisterParam(1, val)
                        return true
                    }
                    if (email_patter.test(val)) {
                        this.setRegisterParam(2, val)
                        return true
                    }
                    return false
                },
                message: '请输入正确的手机号或邮箱'
            }
        ],
        'formData.password': 'required',
        'formData.code': 'required',
        'formData.yqCode': 'required',
        'formData.password2': 'required'
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
        // this.start()
        // this.registerByPhone()
        // this.getCode()
        // this.countrys()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
        this.country = [
            '中国',
            '韩国',
            '日本',
            '新加坡',
            '马来西亚',
            '菲律宾',
            '沙特阿拉伯',
            '朝鲜',
            '越南',
            '缅甸',
            '德国',
            '英国',
            '法国',
            '爱尔兰',
            '波兰',
            '西班牙',
            '意大利',
            '俄罗斯',
            '荷兰',
            '美国',
            '加拿大',
            '巴西',
            '阿根廷',
            '新西兰',
            '澳大利亚',
            '印度',
            '埃及'
        ]
    },
    beforeUpdate() {},
    updated() {
        this.countrys()
    },
    beforeDestroy() {},
    destroyed() {},
    methods: {
        isIPhoneX() {
            const u = navigator.userAgent
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            // iPhone X、iPhone XS
            const isIPhoneX =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 3 &&
                window.screen.width === 375 &&
                window.screen.height === 812
            // iPhone XS Max
            const isIPhoneXSMax =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 3 &&
                window.screen.width === 414 &&
                window.screen.height === 896
            // iPhone XR
            const isIPhoneXR =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 2 &&
                window.screen.width === 414 &&
                window.screen.height === 896

            if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
                this.marginTopObject = 'margin-top: 0.83rem'
            }
        },
        judge(val) {
            const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
            const email_patter = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/

            if (mobile_patter.test(val)) {
                this.setRegisterParam(1, val)
                return true
            }
            if (email_patter.test(val)) {
                this.setRegisterParam(2, val)
                return true
            }
            return false
        },
        setRegisterParam(type, val) {
            this.registerTypeText = ''
            this.registerType = type
            if (type === 1) {
                this.registerTypeText = '手机'
                this.sendCodeUrl = 'login/sendPhoneCode'
                this.registerUrl = 'login/registerByPhone'
                this.sendCodeParam = { phone: val }
                this.formData.phone = val
            }
            if (type === 2) {
                this.registerTypeText = '邮箱'
                this.sendCodeUrl = 'login/sendEmailCode'
                this.registerUrl = 'login/registerByEmail'
                this.sendCodeParam = { email: val }
                this.formData.email = val
            }
        },
        getCode() {
            const verifyRule = ['formData.phone']
            if (!this.verify(verifyRule)) {
                return false
            }
            if (this.timer) {
                return false
            }

            this.judge(this.formData.phone)
            if (!this.sendCodeUrl || !this.sendCodeParam) {
                return false
            }

            // 发送成功之后 进行倒计时
            this.$axios
                .post(this.sendCodeUrl, this.sendCodeParam)
                .then((res) => {
                    console.log('succ==============')
                    console.log(res)
                    if (res.data.status === 1) {
                        // 开始倒计时
                        this.$toast.center(res.data.msg)
                        this.countDown()
                    } else {
                        this.$toast.center(res.data.msg)
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
                if (
                    this.$store.state.user.regEndTimestamp - 60 <
                    currentTimeStamp
                ) {
                    this.$store.commit(
                        'user/setRegEndTimestamp',
                        currentTimeStamp + 60
                    )
                }

                this.timer = setInterval(() => {
                    const currentTimeStamp = Date.parse(new Date()) / 1000
                    const text =
                        this.$store.state.user.regEndTimestamp -
                        currentTimeStamp +
                        '秒后重发'
                    if (
                        this.$store.state.user.regEndTimestamp >
                            currentTimeStamp &&
                        this.$store.state.user.regEndTimestamp > 0
                    ) {
                        this.secondText = text
                    } else {
                        clearInterval(this.timer)
                        this.timer = null
                        this.secondText = '重新获取'
                        this.$store.commit('user/setRegEndTimestamp', 0)
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
        registerSubmit() {
            if (!this.verify()) {
                return false
            }
            this.$axios
                .post(this.registerUrl, this.formData)
                .then((res) => {
                    console.log('succ==============')
                    console.log(res)
                    if (res.data.status === -1) {
                        this.$toast.center(res.data.msg)
                        return false
                    }
                    this.$toast.center('注册成功')
                    this.$router.push({ path: '/user/login' })
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        countrys() {
            switch (this.$refs.country.value) {
                case 0:
                    this.country = 0
                    break
                case 1:
                    this.country = 1
                    break
                case 2:
                    this.country = 2
                    break
                case 3:
                    this.country = 3
                    break
                case 4:
                    this.country = 4
                    break
                default:
                    this.country = 0
                    break
            }
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
    .login {
        font-size: 24px;
    }
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
                // width: 190px;
                height: 55px;
                line-height: 55px;
                margin-top: 67px;
                margin-left: 25px;
                // background-color: pink;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border: 0px;
                .item_pic {
                    width: 70px;
                    // height: 34px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .item_selected {
                    // width: 60%;
                    height: 100%;
                    line-height: 27px;
                    font-family: PingFang-SC-Bold;
                    color: #333333;
                    margin: 0;
                    // margin-left: 17px;
                    select {
                        width: 100%;
                        border: 0px;
                        margin: 0;
                    }
                }
            }
        }
    }

    .content {
        width: 100%;
        height: 100%;
        margin-top: 78px;
        padding: 0 20px;
        // background-color: aquamarine;\
        .input_item {
            // height: 100px;
            // margin-top: 50px;
            // background-color: red;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            .input_line {
                width: 100%;
                height: 90px;
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

                .item_code {
                    // background-color: pink;
                    // width: 100%;
                    width: 200px;
                    height: 90px;
                    line-height: 90px;
                    margin-right: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                        // background-color: yellow;
                        width: 100%;
                        height: 29px;
                        line-height: 29px;
                        font-family: PingFang-SC-Medium;
                        font-size: 29px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #1296db;
                    }
                }
            }
            .notice {
                // background-color: aqua;
                color: red;
                font-size: 23px;
                align-self: flex-start;
                margin-left: 10px;
                text-indent: 0px;
            }
        }

        .input_item:first-child .input_line .item_icon {
            max-width: 100%;
            max-height: 100%;
            padding-right: 30px;
            // background-color: yellow;
            img {
                width: 20px;
                height: 20px;
            }
        }

        .input_item:nth-child(3) .input_line .item_icon {
            max-width: 100%;
            max-height: 100%;
            // background-color: #1296db;
            img {
                width: 28px;
                height: 15px;
            }
        }

        .btn {
            width: 100%;
            height: 100%;
            margin-top: 100px;

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
        // background: #0070ab;
        p {
            // height: 29px;
            margin-top: 34px;
            // margin-right: 126px;
            text-align: center;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #0070ab;
        }
    }
}
</style>
