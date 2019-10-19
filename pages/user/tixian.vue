<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback">
        <img src="~static/img/back.png" @click="$router.go(-1)" />
        <!-- ">>" -->
      </div>
      <div class="pageName">提现</div>
      <!-- <a href="/user/login">登录页</a>· -->
    </div>
    <div class="card">
      <div class="item1">
        <div></div>
        <div class="middle" @click="isShow=1">
          <div class="bank-img">
            <img :src="payTypeIconDefault" />
          </div>
          <div>{{payTypeTextDefault}}</div>
          <div>({{payNoDefault}})</div>
        </div>
        <div class="goright" @click="isShow=1">
          <img src="~static/img/goright.png" />
        </div>
      </div>
      <div class="item2">
        <p>提现金额</p>
        <div>
          <span class="currency">￥</span>
          <input v-model="cashMoney" type="number" name="sum" />
        </div>
      </div>
      <div class="item4">
        <span>提现金额:￥{{cashMoney}}</span>
        <span>扣除手续费:￥ {{cashFeeMoney}}</span>
        <span>实际到账:￥{{actualAmountMoney}}</span>
      </div>
      <div class="info-item">
        <div>
          <input v-model="password2" type="password" placeholder="请输入二级密码" />
        </div>
      </div>
      <div class="item3">
        <div class="next" @click="cashSubmit">下一步</div>
      </div>
      <div class="forget" @click="$router.push('/user/forget-erji-pwd')">
        忘记密码？
      </div>
    </div>
    <!-- 遮罩 -->
    <div v-if="isShow==1" class="shade">
      <div class="payTypeBox">
        <div class="payTop">
          <div class="close" @click="isShow=2">
            <img src="~static/img/error.png" alt="">
          </div>
          <div class="titxt">选择提现方式</div>
        </div>
        <div class="paySelect">
          <div v-if="paySelect.alipayNo" @click="selectPayType($event, 1)"><img src="~static/img/Alipay.png"><span>{{paySelect.alipayNo}}</span></div>
          <div v-if="paySelect.wechatNo" @click="selectPayType($event, 2)"><img src="~static/img/weChatPay.png"><span>{{paySelect.wechatNo}}</span></div>
          <div v-if="paySelect.bankNo" @click="selectPayType($event, 3)"><img src="~static/img/yinlian.png"><span>{{paySelect.bankNo}}</span></div>
          <div v-if="paySelect.usdtAddress" @click="selectPayType($event, 4)"><img src="~static/img/USDTpay.png"><span>{{paySelect.usdtAddress}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            cashMoney: 0,
            cashFeeMoney: 0.0,
            actualAmountMoney: 0.0,
            password2: '',
            cashConfig: '',
            paySelect: '',
            isShow: 2,
            payType: 1,
            payNoDefault: '',
            payTypeTextDefault: '支付宝',
            payTypeText: ['支付宝', '微信', '银行卡', 'USDT'],
            payTypeIconDefault: require('../../static/img/Alipay.png'),
            payTypeIcon: [
                { image: require('../../static/img/Alipay.png') },
                { image: require('../../static/img/weChatPay.png') },
                { image: require('../../static/img/yinlian.png') },
                { image: require('../../static/img/USDTpay.png') }
            ],
            shiMingUrl: 'user/getShiMing',
            tiXianConfigUrl: 'user/getTiXianConfig',
            tiXianUrl: 'user/tiXianApply',
            marginTopObject: ''
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.user.userInfo
        }
    },
    watch: {
        cashMoney: {
            handler(newValue, oldName) {
                if (newValue) {
                    const money = parseInt(newValue)
                    this.cashMoney = money
                    let tiXianFee = this.cashConfig.tiXianFee * money
                    this.cashFeeMoney = Math.floor(tiXianFee * 100) / 100
                    this.actualAmountMoney = money - this.cashFeeMoney
                } else {
                    this.cashMoney = 0
                    this.cashFeeMoney = 0
                    this.actualAmountMoney = 0
                }
            },
            immediate: true
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
        // console.log(this.$message.config)
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })

        this.getShiMing()
        this.getTiXianConfig()
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
        // tixan() {
        //     const shade = document.querySelector('.shade')
        //     shade.style.display = 'block'
        // },
        // close() {
        //     const shade = document.querySelector('.shade')
        //     shade.style.display = 'none'
        // },
        selectPayType(evnt, type) {
            this.payTypeIconDefault = this.payTypeIcon[type - 1].image
            this.payTypeTextDefault = this.payTypeText[type - 1]
            let payNoDefault
            if (type === 1) {
                payNoDefault = this.paySelect.alipayNo
            } else if (type === 2) {
                payNoDefault = this.paySelect.wechatNo
            } else if (type === 3) {
                payNoDefault = this.paySelect.bankNo
            } else if (type === 4) {
                payNoDefault = this.paySelect.usdtAddress
            }
            this.payNoDefault = payNoDefault
            this.isShow = 2
            this.payType = type
        },
        cashSubmit() {
            if (parseInt(this.cashMoney) <= 0) {
                this.$toast.center('请输入要提现的金额')
                return false
            }
            if (parseInt(this.cashMoney) < this.cashConfig.tiXianMoney) {
                this.$toast.center(
                    '最低提现金额为:' + this.cashConfig.tiXianMoney
                )
                return false
            }
            if ([1, 2, 3, 4].includes(this.payType) === -1) {
                this.$toast.center('请选择提现方式')
                return false
            }
            const _this = this
            if (this.password2 === '') {
                this.$toast.center('请输入二级密码')
                return false
            }
            if (parseInt(this.cashConfig.tiXianSwitch) !== 1) {
                this.$toast.center('系统提现通道暂停中')
                return false
            }
            const param = {
                tiXianType: this.payType,
                password2: this.password2,
                money: this.cashMoney
            }
            // this.$message.loading('正在提现,请稍等').then(() => {
            this.$toast.center('提现中...')
            this.$axios
                .post(this.tiXianUrl, param)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === -1) {
                        this.$toast.center(res.data.msg)
                        return false
                    }
                    this.$toast.center('提现申请提交成功,请等待审核', 1, function() {
                        _this.$router.push('/user/tixianSuccess')
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            // })
        },
        async getShiMing() {
            await this.$axios
                .post(this.shiMingUrl)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.paySelect = res.data.data
                        this.payTypeIconDefault = this.payTypeIcon[0].image
                        this.payTypeTextDefault = this.payTypeText[0]
                        if (this.paySelect.alipayNo) {
                            this.payNoDefault = this.paySelect.alipayNo
                            this.payTypeIconDefault = this.payTypeIcon[0].image
                            this.payTypeTextDefault = this.payTypeText[0]
                        } else if (this.paySelect.wechatNo) {
                            this.payNoDefault = this.paySelect.wechatNo
                            this.payTypeIconDefault = this.payTypeIcon[1].image
                            this.payTypeTextDefault = this.payTypeText[1]
                        } else if (this.paySelect.bankNo) {
                            this.payNoDefault = this.paySelect.bankNo
                            this.payTypeIconDefault = this.payTypeIcon[2].image
                            this.payTypeTextDefault = this.payTypeText[2]
                        } else if (this.paySelect.usdtAddress) {
                            this.payNoDefault = this.paySelect.usdtAddress
                            this.payTypeIconDefault = this.payTypeIcon[3].image
                            this.payTypeTextDefault = this.payTypeText[3]
                        }
                    } else {
                        const _this = this
                        this.$toast.center(
                            '您还没有实名认证, 请先进行实名认证!'
                        )
                        setTimeout(() => {
                            _this.$router.push('/user/renzheng')
                        }, 2000)
                        console.log('实名资料:' + res.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        async getTiXianConfig() {
            await this.$axios
                .post(this.tiXianConfigUrl)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.cashConfig = res.data.data
                    } else {
                        console.log(res.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err)
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
textarea {
    outline: none;
    border: none;
}
body {
    // box-sizing: border-box;
    background: #e2e2e2;
}
.container {
    // position: absolute;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    // overflow-y: auto;
    // background-color: #e2e2e2;
    a {
        font-size: 25px;
        color: red;
    }
    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        // height: 88px;
        // line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        // box-shadow: 0px 20px 30px -10px rgba(51, 51, 51, 0.1);
        padding: 45px 20px 20px 20px;
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
    }
    .card {
        width: 702px;
        height: 400px;
        margin: 65px auto;
        background-color: #ffffff;
        .info-item {
            margin-top: 30px;
            height: 80px;
            line-height: 95px;
            font-size: 24px;

            color: #666;
            padding: 0 50px;
            div {
                border-bottom: 1px solid #e8e8e8;
                input {
                    width: 400px;
                    margin-left: 10px;
                    font-size: 24px;
                    caret-color: #1296db;
                }
            }
        }
        .forget {
            text-align: center;
            margin-top: 20px;
            font-family: PingFang-SC-Medium;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00b4ff;
        }
        .item1 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 116px;
            padding: 0 50px;
            font-size: 24px;
            line-height: 116px;
            background-color: #fcfcfc;
            .middle {
                display: flex;
                justify-content: space-between;
                div {
                    margin: 0 5px;
                }
            }
            .bank-img {
                width: 42px;
                height: 42px;
            }
            .goright {
                width: 12px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .item2 {
            width: 100%;
            height: 145px;
            font-size: 24px;
            padding: 0 50px;
            div {
                border-bottom: 1px solid #eaeaea;
                input {
                    width: 400px;
                    border: 1px soldi #999;
                    font-size: 40px;
                    font-weight: 600;
                    margin-left: 10px;
                    caret-color: #1296db;
                    // background: #000;
                }
                .currency {
                    font-size: 48px;
                }
            }
            p {
                font-size: 24px;
            }
        }
        .item3 {
            width: 100%;
            margin: 50px auto;
            .next {
                margin: 0 auto;
                width: 299px;
                height: 56px;
                line-height: 56px;
                background-color: #2352c6;
                border-radius: 10px;
                text-align: center;
                font-size: 24px;
                color: #fff;
            }
        }
        .item4 {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            // padding: 0 20px;
            display: flex;
            justify-content: center;
            span {
                margin: 0 20px;
                font-size: 20px;
                color: #ff3131;
            }
        }
    }
    .btn-submit {
        margin: 140px auto 0 auto;
        width: 300px;
        height: 55px;
        line-height: 55px;
        background-color: #09c48d;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        span {
            width: 118px;
            height: 29px;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            color: #ffffff;
        }
    }
}

.shade {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-size: 24px;
    background: rgba(0, 0, 0, 0.5);
    .payTypeBox {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 49.5%;
        padding: 20px;
        background: #fff;
        .payTop {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            height: 95px;
            line-height: 95px;
            border-bottom: 1px solid #d9d9d9;
            .titxt {
                margin: 0 auto;
            }
            img {
                width: 17px;
            }
        }
        .paySelect {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 250px;
            margin: 80px auto;
            div {
                width: 350px;
                height: 50px;
                margin: 25px 0;
                // background: #000;
                text-align: left;
                img {
                    width: 46px;
                    margin: 0 20px 0 0;
                }
                span {
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
