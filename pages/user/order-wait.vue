<template>
    <div class="container">
        <BackNav :title="`订单记录`" />
        <div class="content" :style="marginTopObject">
            <div v-if="list" class="list">
                <div v-for="(item ,index) in list" :key="index">
                    <div v-if="item.goods && item.status == 0" class="item">
                        <div class="left">
                            <img :src="item.goods.cover" alt />
                        </div>
                        <div class="right">
                            <div class="top">
                                <div class="title">
                                    <span>{{item.goods.name1}}</span>
                                </div>
                                <div class="price">
                                    <span>￥{{item.goods.priceActivity}}</span>
                                </div>
                            </div>
                            <div class="middle">
                                <div class="order_num">
                                    <span>订单编号:</span>
                                    <span>{{item.orderSn}}</span>
                                </div>
                                <div class="total">
                                    <span>x{{item.number}}</span>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="pay_type">
                                    <span v-if="item.payType == 1">支付方式: 支付宝</span>
                                    <span v-if="item.payType == 2">支付方式: 微信</span>
                                    <span v-if="item.payType == 3">支付方式: 银行卡</span>
                                    <span v-if="item.payType == 4">支付方式: USDT</span>
                                </div>
                                <div class="pay_date">
                                    <span>支付日期: {{item.addTime}}</span>
                                </div>
                            </div>
                            <div class="bottom operate">
                                <span class="span_active" @click="cancel(item.orderSn)">取消订单</span>
                                <span @click="finish(item.orderSn)">已完成</span>
                                <span @click="goPay(item,item.orderSn)">去支付</span>
                            </div>
                        </div>
                    </div>

                    <!-- <div v-if="item.status != 0" class="nodata">
                      <img src="~static/img/nodata.png" alt="">
                    </div> -->

                </div>
            </div>

            <!-- 支付弹窗 -->

            <div v-if="isShowCode==1" ref="code" class="code">
                <div class="code-box">
                    <div class="code-box-top">
                        <div @click="isShowCode=2">
                            <img src="~static/img/payClose.png" alt />
                        </div>
                        <!-- 支付宝logo -->
                        <div v-if="payTypeData.payType == 1" class="code-top-middle">
                            <div class="patTypeLogo">
                                <img src="~static/img/Alipay.png" alt />
                            </div>
                            <div>支付宝支付</div>
                        </div>

                        <!-- 微信logo -->
                        <div v-if="payTypeData.payType == 2" class="code-top-middle">
                            <div class="patTypeLogo">
                                <img src="~static/img/weChatPay.png" alt />
                            </div>
                            <div>微信支付</div>
                        </div>
                        <!-- 银行卡logo -->
                        <div v-if="payTypeData.payType == 3" class="code-top-middle">
                            <div class="patTypeLogo">
                                <img src="~static/img/yinlian.png" alt />
                            </div>
                            <div>银行卡支付</div>
                        </div>

                        <!-- USDTlogo -->
                        <div v-if="payTypeData.payType == 4" class="code-top-middle">
                            <div class="patTypeLogo">
                                <img src="~static/img/USDTpay.png" alt />
                            </div>
                            <div>USDT支付</div>
                        </div>
                    </div>
                    <div class="code-msg">
                        <p v-if="payTypeData.payType == 1">扫码付款</p>
                        <p v-if="payTypeData.payType == 2">扫码付款</p>
                        <p v-if="payTypeData.payType == 4">扫码付款</p>

                        <div v-if="payTypeData.payType == 1" class="img-box">
                            <img :src="payTypeData.payTypeData.cover" alt />
                        </div>
                        <div v-if="payTypeData.payType == 2" class="img-box">
                            <img :src="payTypeData.payTypeData.cover" alt />
                        </div>
                        <div v-if="payTypeData.payType == 4" class="img-box">
                            <img :src="payTypeData.payTypeData.cover" alt />
                        </div>

                        <!-- 支付宝start -->
                        <div v-if="payTypeData.payType == 1" class="alpay">
                            <div>
                                支付宝账户：
                                <span ref="text1" class="font_size">{{payTypeData.payTypeData.name}}</span>
                                <span v-clipboard:copy="payTypeData.name" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size" >复制</span>
                                <textarea ref="input1" class="textarea" name></textarea>
                            </div>
                            <div>
                                支付宝账号：
                                <span ref="text2" class="font_size">{{payTypeData.payTypeData.account}}</span>
                                <span v-clipboard:copy="payTypeData.account" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size" >复制</span>
                                <textarea ref="input2" class="textarea" name readonly></textarea>
                            </div>
                        </div>
                        <!-- 支付宝end -->

                        <!-- 微信start  微信默认-->
                        <div v-if="payTypeData.payType == 2" class="alpay">
                            <div>
                                微信账户：
                                <span ref="text1" class="font_size">{{payTypeData.payTypeData.name}}</span>
                                <span v-clipboard:copy="payTypeData.name" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size">复制</span>
                                <textarea ref="input1" class="textarea" name readonly></textarea>
                            </div>
                        </div>
                        <!-- 微信end -->

                        <!-- 银行卡支付 start -->
                        <div v-if="payTypeData.payType == 3" class="bankcard">
                            <div>
                                开户银行：
                                <span ref="text1"  class="font_size">{{payTypeData.payTypeData.bank}}</span>
                                <span v-clipboard:copy="payTypeData.bank" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size">复制</span>
                                <textarea ref="input1" class="textarea" name readonly></textarea>
                            </div>
                            <div>
                                开户账号：
                                <span ref="text2" class="font_size">{{payTypeData.payTypeData.account}}</span>
                                <span v-clipboard:copy="payTypeData.account" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size" >复制</span>
                                <textarea ref="input2" class="textarea" name readonly></textarea>
                            </div>
                            <div>
                                开户名称：
                                <span ref="text4" class="font_size">{{payTypeData.payTypeData.name}}</span>
                                <span v-clipboard:copy="payTypeData.name" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size"  >复制</span>
                                <textarea ref="input4" class="textarea" name readonly></textarea>
                            </div>
                        </div>
                        <!-- 银行卡支付 start -->

                        <!-- USDT start -->
                        <div v-if="payTypeData.payType == 4" class="USDTpay">
                            <span>USDT收款地址：</span>
                            <span ref="text1" class="font_size">{{payTypeData.payTypeData.account}}</span>
                            <span v-clipboard:copy="payTypeData.account" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size" >复制地址</span>
                            <textarea ref="input1" class="textarea" name readonly></textarea>
                        </div>
                        <!-- USDT end -->

                        <div class="msut_tag">
                            <div>
                                <span>订单号：</span>
                                <span ref="text3" class="font_size">{{payTypeData.payTypeData.orderSn}}</span>
                                <span v-clipboard:copy="payTypeData.orderSn" v-clipboard:success="onCopy" style="color: #007eff;" class="font_size" >复制</span>
                                <textarea ref="input3" class="textarea" name readonly></textarea>
                            </div>
                            <div>（付款时必须备注订单号）</div>
                        </div>
                    </div>
                    <div class="buyNow" @click="finish(payTypeData.orderSn)">完成</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BackNav from '~/components/BackNav.vue'
export default {
    components: {
        BackNav
    },
    data() {
        return {
            isShowCode: 2,
            list: '',
            payTypeData: '',
            marginTopObject: ''
        }
    },
    mounted() {
        // this.isIPhoneX()
        if (!this.$store.state.user.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            _this.$router.push('/user/login')
            return false
        }
        this.waitorder()
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
                this.marginTopObject = 'margin-top: 3.5rem'
            }
        },
        async waitorder() {
            await this.$axios
                .post('payment/myOrder', {
                    status: 0
                })
                .then((res) => {
                    console.log(res)
                    this.list = res.data.data
                    console.log('======listdfdsf======')
                    console.log(this.list)
                    console.log('======listdfdsf======')
                    // if (res.data.status === 1) {
                    //     const _this = this
                    //     this.$message.success(res.data.msg)
                    //     _this.$router.push({ path: '/user/order-wait' })
                    // }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        cancel(id) {
            // do some thing
            console.log(id)
            this.$axios
                .post('payment/setCanceled', {
                    orderSn: id
                })
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        const _this = this
                        this.$toast.center(res.data.msg)
                        _this.$router.go(0)
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        finish(id) {
            // do some thing
            console.log(id)
            this.$axios
                .post('payment/setPayed', {
                    orderSn: id
                })
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        const _this = this
                        this.$toast.center(res.data.msg)
                        _this.$router.go(0)
                        this.isShowCode = 2
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        goPay(item, item_id) {
            // do some thing
            console.log(item)
            console.log('-----')
            if (item.orderSn === item_id) {
                this.payTypeData = item
                console.log('======================start')
                console.log(this.payTypeData)
                console.log('======================end1')
            }

            this.isShowCode = 1
        }, onCopy(e) {
            this.$toast.center('复制成功')
            // alert('You just copied: ' + e.text)
        }
    }
}
</script>

<style lang="less" scoped>
.font_size{
    font-size: 24px;
}
.container {
    // background-color: yellowgreen;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nodata{
      margin-top: 150px;
      padding: 0 20px;
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
    .content {
        width: 100%;
        height: 100%;
        // background: #000;
        margin-top: 190px;
        .list {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .item {
                width: 95%;
                // height: 180px;
                background-color: #ffffff;
                box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.13);
                border-radius: 10px;
                border: solid 1px #e2e2e2;

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                margin-top: 20px;
                // padding-right: 15px;
                padding: 15px;
                .left {
                    width: 150px;
                    height: 150px;
                    line-height: 150px;
                    text-align: center;
                    // border-radius: 7px;
                    // border: solid 2px #d3d3d3;
                    margin-left: 10px;

                    margin-top: 15px;
                    margin-bottom: 15px;

                    img {
                        // margin: 10% 76% 7% 2%;
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .right {
                    width: 530px;
                    // height: 150px;
                    // background: pink;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: space-between;

                    color: #333333;

                    padding-right: 15px;
                    padding-left: 15px;

                    .top {
                        // margin-top: 25px;
                        // background-color: orange;
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .title {
                            span {
                                display: block;
                                // width: 209px;
                                // height: 19px;
                                font-family: PingFang-SC-Medium;
                                font-size: 24px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #333333;
                            }
                        }
                        .price {
                            span {
                                display: block;
                                font-family: PingFang-SC-Medium;
                                font-size: 30px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #333333;
                            }
                        }
                    }
                    .middle {
                        flex: 1;
                        margin-top: 15px;
                        margin-bottom: 20px;
                        // background-color: rgb(255, 60, 0);
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .order_num {
                            span:first-child {
                                width: 86px;
                                height: 19px;
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                            span:last-child {
                                font-family: PingFang-SC-Medium;
                                font-size: 24px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #007eff;
                            }
                        }
                        .total {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                    }
                    .bottom {
                        flex: 1;
                        // background-color: rgb(25, 60, 0);
                        width: 100%;
                        // margin-top: 25px;
                        // margin-bottom: 5px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .pay_type {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                        .pay_date {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                    }
                    .operate {
                        display: flex;
                        justify-content: flex-end;
                        span {
                            display: inline-block;
                            margin: 0 10px;
                            padding: 0.1rem 0.2rem;
                            color: #666;
                            border: 2px solid #666;
                            border-radius: 5px;
                        }
                        .span_active {
                            border: 2px solid #666;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
    // 扫码弹窗
    .code {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 88;
        .input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .code-box {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 670px;
            padding: 0 20px;
            background: #fff;
            .code-box-top {
                display: flex;
                justify-content: flex-start;
                margin-top: 20px;
                width: 100%;
                img {
                    width: 42px;
                    height: 42px;
                    margin: 0 10px 0 0;
                }
            }
            .code-top-middle {
                display: flex;
                margin: 0 auto 0 210px;

                color: #666;
                font-size: 30px;
            }
            .textarea {
                width: 0;
                height: 0;
                opacity: 0;
            }
            .code-msg {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                margin-top: 30px;
                text-align: center;
                // div {
                //     margin: 5px 0;
                // }
                p {
                    color: #000;
                    font-size: 30px;
                    margin: 10px 0;
                }
                .img-box {
                    width: 227px;
                    height: 227px;
                }
                .alpay {
                    font-size: 24px;
                    color: #333333;
                }
                .USDTpay {
                    font-size: 18px;
                    color: #666666;
                }
                .bankcard {
                    margin-top: 50px;
                    div {
                        span:nth-child(1) {
                            font-size: 24px;
                            color: #666666;
                        }
                        span:nth-child(2) {
                            font-size: 24px;
                            color: #333333;
                        }
                    }
                }
            }
            .msut_tag {
                margin-top: 20px;
                text-align: center;
                div:nth-child(1) {
                    span:nth-child(1) {
                        color: #666;
                        font-size: 24px;
                    }
                    span:nth-child(2) {
                        color: #007eff;
                        font-size: 30px;
                    }
                    span:nth-child(3) {
                        color: #007eff;
                        font-size: 20px;
                    }
                }
                div:nth-child(2) {
                    color: #ff0101;
                    font-size: 20px;
                }
            }
            .buyNow {
                width: 200px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 30px;
                color: #fff;
                margin-top: 20px;
                background-color: #269877;
            }
        }
    }
}
</style>
