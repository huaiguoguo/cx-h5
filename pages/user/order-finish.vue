<template>
  <div class="container">
    <BackNav :title="`订单记录`" />
    <!-- <div class="header" :style="marginTopObject" style="margin-top:50px;">
      <div class="nav">
        <div class="item inprogress" @click="$router.push('/user/order-ing')">
          <span class>进行中</span>
        </div>
        <div class="item inprogress" @click="$router.push('/user/order-wait')">
          <span>待支付</span>
        </div>

        <div class="item inprogress" @click="$router.push('/user/order-waitEnter')">
          <span>待确认</span>
        </div>
        <div class="item inprogress">
          <span class="active">已完成</span>
        </div>
      </div>
    </div> -->

    <div class="content" :style="marginTopObject">
      <div class="list">
        <div v-for="(item,index) in list" :key="index">
          <div v-if="item.goods && item.status == 4" class="item">
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
                  <span v-if="list.payType == 1">支付方式: 支付宝</span>
                  <span v-if="list.payType == 2">支付方式: 微信</span>
                  <span v-if="list.payType == 3">支付方式: 银行卡</span>
                  <span v-if="list.payType == 4">支付方式: USDT</span>

                </div>
                <div class="pay_date">
                  <span>支付日期: {{item.addTime}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-if="!item.status == 4" class="item nodata">
            <img src="~static/img/nodata.png" alt="">
          </div> -->

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
            list: [],
            marginTopObject: ''
        }
    },
    mounted() {
        this.isIPhoneX()
        if (!this.$store.state.user.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            _this.$router.push('/user/login')
            return false
        }
        this.finish()
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
                this.marginTopObject = 'margin-top: 3.5rem'
            }
        },
        async finish() {
            await this.$axios
                .post('payment/myOrder', {
                    status: 4
                })
                .then((res) => {
                    console.log(res.data.data)
                    console.log('========================end')
                    this.list = res.data.data
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="less" scoped>
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
        margin-top: 190px;
        // background: #000;
        .list {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .item {
                // width: 95%;
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
                padding-right: 15px;
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
                }
            }
        }
    }
}
</style>
