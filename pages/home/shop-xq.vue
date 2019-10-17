<template>
  <div class="container">
    <!-- <Nav v-if="isShow==1" /> -->
    <div class="top">
      <div class="header" :style="marginTopObject">
        <div class="goback" @click="$router.go(-1)">
          <img src="~static/img/back.png" alt />
        </div>
        <div class="pageName">商品详情</div>
        <div class="avatar" @click="ShowLeftNav">
          <img src="~static/img/left_nav_switch.png" alt />
        </div>
      </div>
      <div class="demo">
        <div class="shose_img">
          <img :src="detailData?detailData.cover:''" alt />
        </div>
        <div class="parameter">
          <div class="productName">{{detailData?detailData.name1:''}}</div>
          <div class="price">
            <span>￥{{detailData?detailData.priceActivity:''}}</span>
            <span>（USDT：{{detailData?detailData.usdtPrice:''}}）</span>
          </div>
          <!-- <div class="addprice">+9.90%[￥140]</div> -->
          <!-- <div class="middle_count">
            <img src="~static/img/countDown2.png" alt />
                    </div>-->
          <div v-if="qianggou.status == 1" class="shop" @click="redirect">
            <div class="left">
              <div class="item title">距离限购结束还剩</div>
              <div class="item count_down">
                <span class="number hour">{{hour}}</span>
                <span class="hour_text">小时</span>
                <span class="number minute">{{minute}}</span>
                <span class="minute_text">分</span>
                <span class="number second">{{second}}</span>
                <span class="second_text">秒</span>
              </div>
              <div class="item btn">
                <!-- <button @click="$router.push(`/home/shop-xq?id=${qianggou.data.id}`)">立即认购</button> -->
                <button @click="addTodo">立即认购</button>
                <!-- <button @click="$router.push(`/home/shop-xq?id=${qianggou.data.id}`)">立即认购</button> -->
              </div>
            </div>
            <div class="right">
              <div>
                <img :src="qianggou.data.cover" alt />
              </div>
              <div class="demoName">{{qianggou.data.name1}}</div>
            </div>
          </div>
          <div v-if="qianggou.status != 1" class="shops"></div>
        </div>
      </div>
    </div>
    <!-- <div class="dataInfo">
            <div>
                <span>总收益</span>
                <span>￥{{detailData?detailData.total:''}}</span>
            </div>
            <div class="right">
              <div>
                <img src="~static/img/AJ.png" alt />
              </div>
              <div class="demoName">AJ</div>
            </div>
        </div>-->
    <!-- </div>
      </div>
        </div>-->
    <div class="dataInfo">
      <div>
        <span>认购总收益</span>
        <span>￥{{detailData?detailData.total:''}}</span>
      </div>
      <div>
        <span>24h成交量</span>
        <span>{{detailData?detailData.deal:''}}</span>
      </div>
      <div>
        <span>佣金比例</span>
        <span>{{detailData?detailData.getDay:''}}/天</span>
      </div>
      <div>
        <span>佣金周期</span>
        <span>{{detailData?detailData.period:''}}天</span>
      </div>
    </div>

    <div class="payType">
      <p class="pay-txt">请选择支付方式</p>
      <div class="pays">
        <div>
          <div class="img-box">
            <img src="~static/img/Alipay.png" alt />
          </div>
          <div>支付宝支付</div>
          <div class="radio">
            <input id="radio-1" type="radio" name="payType" value="1" @click="chekPay(1)" />
            <label for="radio-1" class="radio-label"></label>
          </div>
        </div>
        <div>
          <div class="img-box">
            <img src="~static/img/weChatPay.png" alt />
          </div>
          <div>微信支付</div>
          <div class="radio">
            <input id="radio-2" type="radio" name="payType" value="2" @click="chekPay(2)" />
             <label for="radio-2" class="radio-label"></label>
          </div>
        </div>
        <div>
          <div class="img-box">
            <img src="~static/img/yinlian.png" alt />
          </div>
          <div>银行卡支付</div>
          <div class="radio">
            <input id="radio-3" type="radio" name="payType" value="3" @click="chekPay(3)" />
             <label for="radio-3" class="radio-label"></label>
          </div>
        </div>
        <div>
          <div class="img-box">
            <img src="~static/img/USDTpay.png" alt />
          </div>
          <div>USDT支付</div>
          <div class="radio">
            <input id="radio-4" type="radio" name="payType" value="4" @click="chekPay(4)" />
            <label for="radio-4" class="radio-label"></label>
          </div>
        </div>
      </div>
    </div>

    <div class="buy" @click="rengou()">立即认购</div>

    <!-- 扫码弹窗 -->
    <div v-if="isShowCode==1" ref="code" class="code">
      <div class="code-box">
        <div ref="comfimDiv" class="comfimDiv" style="display:none;">
          <div class="comfimTitles">确认关闭支付此订单吗?</div>
          <div ref="loading" style="opacity: 0;">
            <a-spin>
              <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            </a-spin>
          </div>
          <div class="footers">
            <div class="cancelBtn" @click="cancel">继续支付</div>
            <div class="confirmBtn" @click="onOk">确定关闭</div>
          </div>
        </div>
        <div class="code-box-top">
          <!-- <a-button style="border:none" class="antd-btn" width="600" @click="confirm"></a-button> -->
          <div @click="close">
            <img src="~static/img/payClose.png" alt />
          </div>
          <!-- 支付宝logo -->
          <div v-if="payType == 1" class="code-top-middle">
            <div class="patTypeLogo">
              <img src="~static/img/Alipay.png" alt />
            </div>
            <div>支付宝支付</div>
          </div>

          <!-- 微信logo -->
          <div v-if="payType == 2" class="code-top-middle">
            <div class="patTypeLogo">
              <img src="~static/img/weChatPay.png" alt />
            </div>
            <div>微信支付</div>
          </div>
          <!-- 银行卡logo -->
          <div v-if="payType == 3" class="code-top-middle">
            <div class="patTypeLogo">
              <img src="~static/img/yinlian.png" alt />
            </div>
            <div>银行卡支付</div>
          </div>

          <!-- USDTlogo -->
          <div v-if="payType == 4" class="code-top-middle">
            <div class="patTypeLogo">
              <img src="~static/img/USDTpay.png" alt />
            </div>
            <div>USDT支付</div>
          </div>
        </div>
        <div class="code-msg">
          <p v-if="payType == 1">扫码付款</p>
          <p v-if="payType == 2">扫码付款</p>
          <p v-if="payType == 4">扫码付款</p>

          <div v-if="payType == 1" class="img-box">
            <img :src="list?list.payTypeData.cover:''" alt />
          </div>
          <div v-if="payType == 2" class="img-box">
            <img :src="list?list.payTypeData.cover:''" alt />
          </div>
          <div v-if="payType == 4" class="img-box">
            <img :src="list?list.payTypeData.cover:''" alt />
          </div>

          <!-- 支付宝start -->
          <div v-if="payType == 1" class="alpay">
            <div>
              支付宝账户：
              <span ref="text1" class="midpx">{{list.payTypeData.name}}</span>
              <span  v-clipboard:copy="list.payTypeData.name" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input1" class="textarea" name readonly></textarea>
            </div>
            <div>
              支付宝账号：
              <span ref="text2" class="midpx">{{list.payTypeData.account}}</span>
              <span v-clipboard:copy="list.payTypeData.account" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input2" class="textarea" name readonly></textarea>
            </div>
          </div>
          <!-- 支付宝end -->

          <!-- 微信start  微信默认-->
          <div v-if="payType == 2" class="alpay">
            <div>
              微信账户：
              <span ref="text1" class="midpx">{{list.payTypeData.name}}</span>
              <span v-clipboard:copy="list.payTypeData.name" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input1" class="textarea" name readonly></textarea>
            </div>
          </div>
          <!-- 微信end -->

          <!-- 银行卡支付 start -->
          <div v-if="payType == 3" class="bankcard">
            <div>
              开户银行：
              <span ref="text1" class="midpx">{{list.payTypeData.bank}}</span>
              <span v-clipboard:copy="list.payTypeData.bank" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input1" class="textarea" name readonly></textarea>
            </div>
            <div>
              开户账号：
              <span ref="text2" class="midpx">{{list.payTypeData.account}}</span>
              <span v-clipboard:copy="list.payTypeData.account" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input2" class="textarea" name readonly></textarea>
            </div>
            <div>
              开户名称：
              <span ref="text4" class="midpx">{{list.payTypeData.name}}</span>
              <span v-clipboard:copy="list.payTypeData.name" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input4" class="textarea" name readonly></textarea>
            </div>
          </div>
          <!-- 银行卡支付 start -->

          <!-- USDT start -->
          <div v-if="payType == 4" class="USDTpay">
            <span class="midpx">USDT收款地址：</span>
            <span ref="text1" class="midpx">{{list.payTypeData.account}}</span>
            <span v-clipboard:copy="list.payTypeData.account" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制地址</span>
            <textarea ref="input1" class="textarea" name readonly></textarea>
          </div>
          <!-- USDT end -->

          <div class="msut_tag">
            <div>
              <span>订单号：</span>
              <span ref="text3">{{list.orderSn}}</span>
              <span v-clipboard:copy="list.orderSn" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: #007eff;" class="font_size">复制</span>
              <textarea ref="input3" class="textarea" name readonly></textarea>
            </div>
            <div>（付款时必须备注订单号）</div>
          </div>
        </div>
        <div class="buyNow" @click="finish()">完成付款</div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { Input } from 'ant-design-vue/lib'
// import Nav from '~/components/Nav.vue'
export default {
    components: {
        // Nav
    },
    data() {
        return {
            isShow: 2,
            isShowCode: 2,
            detailData: {},
            payType: '',
            orderSn: '',
            list: {},
            qianggou: '',
            restrictionTimer: null,
            hour: 0,
            minute: 0,
            second: 0,
            timers: '',
            marginTopObject: ''
        }
    },
    mounted() {
        this.isIPhoneX()
        console.log(this.$route.query.id)
        const id = this.$route.query.id
        this.getGoodsDetail(id)
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
        this.checklogin()
        this.getRestrictionGoods()
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
                this.marginTopObject = 'margin-top: 0.83rem'
            }
        },
        onCopy(e) {
            this.$toast.center('复制成功')
            // alert('You just copied: ' + e.text)
        },
        onError(e) {
            console.log(e)
            // alert('Failed to copy texts')
        },
        onOk() {
            this.$refs.loading.style.opacity = '1'
            this.$axios
                .post('payment/setCanceled', {
                    orderSn: this.orderSn
                })
                .then((res) => {
                    console.log('----')
                    console.log(res)
                    console.log('---')
                    if (res.data.status === 1) {
                        this.isShowCode = 2
                        this.$refs.comfimDiv.style.display = 'none'
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        cancel() {
            this.$refs.comfimDiv.style.display = 'none'
        },
        redirect() {
            this.$router.push({
                path: '/home/shop-xq',
                query: { id: this.qianggou.data.id }
            })
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        checklogin() {
            if (!this.$store.state.user.userInfo) {
                this.$toast.center('你还没有登录哦')
                this.$router.push('/user/login')
            }
        },
        async getGoodsDetail(goods_id) {
            const params = { id: goods_id }
            await this.$axios
                .post('home/getGoodsDetail', params)
                .then((res) => {
                    console.log(res.data.data)
                    // const data = res.data
                    if (res.data.status === -1) {
                        this.$toast.center(res.data.msg)
                        return false
                    }

                    this.detailData = res.data.data
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        addTodo() {
            const goodsId = this.qianggou.data.id
            console.log(goodsId)
            this.$router.push({
                path: '/home/shop-xq',
                query: { id: goodsId }
            })
            setTimeout(() => {
                this.$router.go(0)
            }, 10)
        },
        async rengou() {
            // eslint-disable-next-line eqeqeq
            if (this.payType == '') {
                // alert('未选择支付方式')
                this.$toast.center('未选择支付方式')
                return false
            }
            const goods_id = this.$route.query.id
            await this.$axios
                .post('Payment/createOrder', {
                    goodsId: goods_id,
                    goodsNumber: 1,
                    payType: this.payType
                })
                .then((res) => {
                    console.log(res)
                    console.log(res.data)
                    // 状态不为一的时候 显示订单创建失败
                    if (res.data.status !== 1) {
                        // alert(res.data.msg)
                        this.$toast.center(res.data.msg)
                        return false
                    }
                    this.list = res.data.data
                    console.log(this.list)
                    console.log('=================start')
                    this.orderSn = res.data.data.orderSn
                    // this.$refs.code.style.display = 'block'
                    this.isShowCode = 1
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        // 已完成
        async finish() {
            await this.$axios
                .post('payment/setPayed', {
                    orderSn: this.orderSn
                })
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.$toast.center(res.data.data)
                        this.$router.push('/user/order-waitEnter')
                        // this.timers = setInterval(() => {
                        //     this.$router.push('/user/order-waitEnter')
                        // }, 2000)
                    } else {
                        this.$toast.center('支付失败，请重试')
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        close() {
            this.$refs.comfimDiv.style.display = 'block'
        },
        copy1() {
            this.$refs.input1.value = this.$refs.text1.innerHTML
            this.$refs.input1.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        copy2() {
            this.$refs.input2.value = this.$refs.text2.innerHTML
            this.$refs.input2.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        copy3() {
            this.$refs.input3.value = this.$refs.text3.innerHTML
            this.$refs.input3.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        copy4() {
            this.$refs.input4.value = this.$refs.text4.innerHTML
            this.$refs.input4.select()
            document.execCommand('copy')
            this.$toast.center('复制成功')
        },
        chekPay(event) {
            this.payType = event
            console.log(this.payType)
        },
        getRestrictionGoods() {
            if (!this.restrictionTimer) {
                this.$axios('home/getRestrictionGoods', {})
                    .then((res) => {
                        console.log('------抢购-------')
                        console.log(res.data)
                        console.log('------抢购end-------')
                        this.qianggou = res.data
                        if (res.data.status === 1) {
                            this.countDown()
                        }
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            }
        },
        countDown() {
            if (!this.restrictionTimer) {
                console.log('首次运行')
                const _this = this
                this.restrictionTimer = setInterval(function() {
                    const endTime = _this.qianggou.data.endTime
                    const currentTimestap = Date.parse(new Date()) / 1000
                    const timestap = endTime - currentTimestap

                    let secondTime = parseInt(timestap) // 秒
                    if (secondTime <= 0) {
                        clearInterval(_this.restrictionTimer)
                        return false
                    }
                    let minuteTime = 0 // 分
                    let hourTime = 0 // 小时
                    if (secondTime > 60) {
                        minuteTime = parseInt(secondTime / 60)
                        // 获取秒数，秒数取佘，得到整数秒数
                        secondTime = parseInt(secondTime % 60)
                        // 如果分钟大于60，将分钟转换成小时
                        if (minuteTime > 60) {
                            // 获取小时，获取分钟除以60，得到整数小时
                            hourTime = parseInt(minuteTime / 60)
                            // 获取小时后取佘的分，获取分钟除以60取佘的分
                            minuteTime = parseInt(minuteTime % 60)
                        }
                    }
                    _this.hour = hourTime
                    _this.minute = minuteTime
                    _this.second = secondTime
                }, 1000)
            }
        },
        comfim() {
            const r = confirm('是否继续支付？')
            if (r === true) {
                this.isShowCode = 2
            } else {
                this.isShowCode = 2
            }
            // this.isShowCode = 2
        }
    }
}
</script>

<style lang="less" scoped>
.body :global(.ant-modal-content) {
    width: 6rem !important;
}
// .ant-modal-content{
//     width: 190px !important;
// }
.font_size{
    font-size: 34px;
}
.container {
    // background-color: red;
    .comfimDiv {
        position: absolute;
        left: 0;
        right: 0;
        top: 30%;
        width: 80%;
        height: 300px;
        margin-left: 10%;
        // margin: 0 auto;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0px 15px 15px #ccc;
        text-align: center;
        padding: 35px 0px;
        font-size: 40px;
    }

    .cancelBtn,
    .confirmBtn {
        width: 240px;
        height: 55px;
        display: inline-block;
        margin: 5px;
        background-color: #269877;
        border-radius: 5px;
        line-height: 39px;
        text-align: center;
        margin-top: 40px;
        padding: 3px 15px;
        font-size: 32px;
        color: snow;
    }
    // .comfimTitles{
    //     margin-top: 50px;
    // }

    .top {
        width: 100%;
        display: flex;
        font-size: 36px;
        flex-wrap: wrap;
        padding: 0 20px;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            // height: 88px;
            // line-height: 88px;
            font-size: 36px;
            font-weight: normal;
            font-stretch: normal;
            color: #333;
            box-shadow: 0px 20px 30px -10px rgba(51, 51, 51, 0.1);
            padding: 45px 20px 20px 20px;
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
        .demo {
            width: 100%;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20px;
            text-align: center;

            .shose_img {
                // width: 400px;
                height: 300px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }

            .productName {
                color: #000;
                font-size: 36px;
            }
            .price {
                display: flex;
                justify-content: center;
                align-items: center;
                span:nth-child(1) {
                    font-size: 46px;
                    font-weight: 600;
                }
                span:nth-child(2) {
                    font-size: 32px;
                    font-weight: 600;
                    color: #666666;
                }
            }
            .addprice {
                font-size: 24px;
                color: #ff0101;
            }
            // .middle_count {
            //     width: 696px;
            //     height: 118px;
            //     // background-color: #000000;
            //     border-radius: 10px;
            //     margin: 20px 0 0 0;
            //     img {
            //         max-width: 100%;
            //         max-height: 100%;
            //         width: 100%;
            //     }
            // }
            .shop {
                width: 710px;
                height: 220px;
                background-image: url('~static/img/countDown2.png');
                background-repeat: no-repeat;
                background-size: 100%;
                border-radius: 10px;
                display: flex;
                margin: 30px 10px;
                // flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    flex: 6;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .title {
                        font-family: PingFang-SC-Bold;
                        font-size: 20px;
                        font-weight: 500;
                        font-stretch: normal;
                        color: #ffffff;
                    }
                    .count_down {
                        margin: 16px 0;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        span {
                            display: inline-block;
                            color: #fff;
                            font-size: 24px;
                        }
                        .number:first-child {
                            margin-left: 0px;
                        }
                        .number {
                            width: 60px;
                            height: 30px;
                            line-height: 30px;
                            margin: 0px 5px;
                            color: #000;
                            font-weight: bold;
                            background-color: #fff;
                            text-align: center;
                        }
                    }
                    .btn {
                        width: 150px;
                        height: 35px;
                        line-height: 25px;
                        border-radius: 10px;
                        border: solid 2px #ffffff;
                        button {
                            background-color: transparent;
                            width: 100%;
                            height: 100%;
                            border: 0px;
                            font-family: PingFang-SC-Bold;
                            font-size: 20px;
                            font-weight: 300;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                    }
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 279px;
                    flex: 4;
                    height: 141px;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    div:nth-child(1) {
                        width: 176px;
                        margin: 10px 0;
                    }
                    .demoName {
                        width: 180px;
                        height: 30px;
                        line-height: 30px;
                        background-color: #000000;
                        font-size: 25px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .shops {
                width: 710px;
                height: 171px;
                background-image: url('~static/img/xiangou_new.png');
                background-repeat: no-repeat;
                background-size: 100%;
                border-radius: 10px;
                display: flex;
                margin: 30px 10px;
            }
        }
    }
    .dataInfo {
        width: 100%;
        padding: 20px 0;
        margin: 10px 0;
        div {
            display: flex;
            justify-content: space-between;
            height: 60px;
            line-height: 60px;
            padding: 0 20px;
            border-bottom: solid 1px #ebebeb;
            span {
                font-size: 30px;
            }
            span:nth-child(1) {
                color: #666666;
            }
            span:nth-child(2) {
                color: #222222;
            }
        }
    }
    .payType {
        width: 100%;
        padding: 0 20px;
        margin-bottom: 50px;
        padding-bottom: 150px;
        // -webkit-margin-bottom: 350px;
        .pay-txt {
            margin: 10px 0;
            font-size: 24px;
            color: #888;
        }
        .pays {
            display: flex;
            justify-content: space-around;
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 10px 0;
                .img-box {
                    width: 50px;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                input {
                    background-color: transparent;
                }
            }
            .radio {
  margin: 0.5rem;
}
.radio input[type="radio"] {
  position: absolute;
  opacity: 0;
}
.radio input[type="radio"] + .radio-label:before {
  content: '';
  background: #f4f4f4;
  border-radius: 100%;
  border: 1px solid #b4b4b4;
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  position: relative;
  top: -0.2em;
  margin-right: 1em;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.radio input[type="radio"]:checked + .radio-label:before {
  background-color: #3197EE;
  box-shadow: inset 0 0 0 4px #f4f4f4;
}
.radio input[type="radio"]:focus + .radio-label:before {
  outline: none;
  border-color: #3197EE;
}
.radio input[type="radio"]:disabled + .radio-label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}
.radio input[type="radio"] + .radio-label:empty:before {
  margin-right: 0;
}
        }
    }
    .buy {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #47b884;
        font-size: 30px;
        color: #fff;
    }
    .code {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        .input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .midpx {
            font-size: 34px;
        }
        .code-box {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 860px;
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
                .antd-btn {
                    position: absolute;
                    top: 25px;
                    left: 25px;
                    opacity: 0;
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
                margin-top: 10px;
                text-align: center;
                p {
                    color: #000;
                    font-size: 30px;
                    margin: 10px 0;
                }
                .img-box {
                    width: 350px;
                    height: 350px;
                }
                .alpay {
                    font-size: 34px;
                    color: #333333;
                }
                .USDTpay {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #666666;
                    .midpx{
                        font-size: 27px;
                    }
                }
                .bankcard {
                    margin-top: 50px;
                     font-size: 28px;
                    div {
                        span:nth-child(1) {
                            font-size: 28px;
                            color: #666666;
                        }
                        span:nth-child(2) {
                            font-size: 28px;
                            color: #333333;
                        }
                    }
                }
            }
            .msut_tag {
                margin-top: 10px;
                text-align: center;
                div:nth-child(1) {
                    span:nth-child(1) {
                        color: #666;
                        font-size: 34px;
                    }
                    span:nth-child(2) {
                        color: #007eff;
                        font-size: 34px;
                    }
                    span:nth-child(3) {
                        color: #007eff;
                        font-size: 34px;
                    }
                }
                div:nth-child(2) {
                    color: #ff0101;
                    font-size: 34px;
                }
            }
            .buyNow {
                width: 250px;
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: 35px;
                color: #fff;
                margin-top: 5px;
                background-color: #269877;
            }
        }
    }
}
</style>
