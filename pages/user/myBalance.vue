<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back2.png" />
        <!-- ">>" -->
      </div>
      <div class="pageName">我的余额</div>
      <!-- <a href="/user/login">登录页</a>· -->
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch_white.png" alt />
      </div>
    </div>

    <div class="datas">
      <div class="top">
        <div class="allmoney">总账户资产</div>

        <div ref="transfrom" class="list">
          <div class="money">
            <span>CNY:</span>
            <span>￥{{list.money}}</span>
          </div>
          <div class="rotate rotate1" @click="transfrom()">
            <img src="~static/img/rorate.png" alt />
          </div>
          <div class="money">
            <span>USDT:</span>
            <span>{{list.usdt}}</span>
          </div>
        </div>

        <div ref="transfrom2" class="list list2" style="display:none;">
          <div class="money">
            <span>USDT:</span>
            <span>{{list.usdt}}</span>
          </div>
          <div class="rotate rotate2" @click="transfrom2()">
            <img src="~static/img/rorate.png" alt />
          </div>
          <div class="money">
            <span>CNY:</span>
            <span>￥{{list.money}}</span>
          </div>

        </div>

      </div>
      <div class="btn-submit">
        <nuxt-link to="/user/tixian">
          <span>提现</span>
        </nuxt-link>
      </div>
    </div>

    <!-- <div class="log_btn">
            <span>
                <nuxt-link to="/user/cash_log">查看提现记录</nuxt-link>
            </span>
        </div>-->
    <div class="order-list">
      <h4>提现记录</h4>
      <div v-if="list2">
        <div v-for="(item,index) in list2" :key="index" class="order-item">
          <div class="order-left">
            <div class="img-box">
              <img src="~static/img/yuer.png" alt />
            </div>
            <div class="order-time">
              <p>
                <span>{{item.addTime}}</span>
                <!-- <span style="margin-left:20px;">15:20</span> -->
              </p>
              <p>申请提现时间</p>
            </div>
            <div class="order-status">
              <p v-if="item.status == 0">提现中</p>
              <p v-if="item.status == 1">已审核</p>
              <p v-if="item.status == 2">已拒绝</p>
              <p>状态</p>
            </div>
          </div>

          <div class="order-money">
            <p>￥{{item.money}}</p>
            <p>提现金额</p>
          </div>
        </div>
      </div>
      <div v-if="list2 == 0">
        <div class="order-list2">
          <div class="nodata">
            <img src="~static/img/nodata.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list: '',
            list2: '',
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
        this.getBalance()
        this.tixianLists()
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
                // margin-top: 0.83rem; background-color: red;
                this.marginTopObject = 'padding-top:1.48rem;padding-bottom:0.6rem;'
                this.float_cardStyle = 'top: 100px;'
            }
        },
        transfrom() {
            this.$refs.transfrom.style.display = 'none'
            this.$refs.transfrom2.style.display = 'flex'
        },
        transfrom2() {
            this.$refs.transfrom2.style.display = 'none'
            this.$refs.transfrom.style.display = 'flex'
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        test() {
            console.log('asdf')
        },
        getBalance() {
            this.$axios
                .post('user/getBalance', {
                    username: this.$store.state.user.userInfo.openid
                })
                .then((res) => {
                    res = res.data.data
                    if (res.data.status === 1) {
                        this.list = res
                    }
                    console.log(res)
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        tixianLists() {
            this.$axios
                .post('user/tixianLists', {
                    username: this.$store.state.user.userInfo.openid
                })
                .then((res) => {
                    res = res.data.data
                    console.log(res)
                    this.list2 = res
                    console.log('---list2---')
                    console.log(this.list2)
                    console.log('---list2---')
                })
                .catch(function(err) {
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
body {
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // text-align: center;
    font-size: 20px;
    // background: red;
    // a {
    //     font-size: 25px;
    //     color: red;
    // }
    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 88px;
        line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        box-shadow: 0px 1px 10px 0px rgba(51, 51, 51, 0.1);
        background-color: #2352c6;
        padding: 45px 20px 0px 20px;
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
            margin: 0 auto;
        }
    }

    .datas {
        width: 100%;
        height: 310px;
        padding: 20px;
        background: #2352c6;
        color: #fff;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .top {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .allmoney {
                align-self: flex-start;
                font-size: 30px;
            }
            .list {
                width: 100%;
                display: flex;
                // flex-direction: spa;
                justify-content: space-around;
                align-items: center;
                padding: 30px 0px;
                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 33%;
                }
                .money {
                    margin: 0px 0 0px 0;
                    span:nth-child(1) {
                        font-size: 25px;
                    }
                    span:nth-child(2) {
                        font-size: 40px;
                    }
                }
                .rotate {
                    width: 49px;
                    height: 49px;
                    // margin: 0 50px 0 0;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }

        .btn-submit {
            margin: 10px auto 0 auto;
            width: 140px;
            height: 41px;
            background-color: #909aff;
            line-height: 41px;
            color: #fff;
            text-align: center;
            span {
                width: 118px;
                height: 29px;
                line-height: 41px;
                font-family: PingFang-SC-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }
    }

    .log_btn {
        width: 314px;
        height: 59px;
        line-height: 59px;
        border-radius: 30px;
        border: solid 2px #2352c6;
        // background: #000;
        margin-top: 205px;
        span {
            display: block;
            text-align: center;
            a {
                font-family: PingFang-SC-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #2352c6;
            }
        }
    }

    // 提现记录
    .order-list {
        h4 {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            line-height: 80px;
            font-size: 30px;
            color: #333;
        }
        width: 100%;
        padding: 0 20px;
        .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 110px;
            .img-box {
                width: 60px;
                height: 32px;
            }
            .order-left {
                display: flex;
                align-items: center;
                div:nth-child(2) {
                    margin: 0 30px 0 15px;
                }
            }
            .order-time {
                p:nth-child(1) {
                    span {
                        font-size: 24px;
                        color: #333;
                    }
                }
                p:nth-child(2) {
                    font-size: 20px;
                    color: #666666;
                }
            }
            .order-status {
                font-size: 24px;
                p:nth-child(1) {
                    font-size: 24px;
                    color: #333;
                }
                p:nth-child(2) {
                    font-size: 20px;
                    color: #666;
                }
            }
            .order-money {
                p:nth-child(1) {
                    font-size: 24px;
                    color: #ff4444;
                }
                p:nth-child(2) {
                    font-size: 20px;
                    color: #666;
                }
            }
        }
    }
    .order-list2 {
        width: 100%;
        margin-top: 30px;
        padding: 0 20px;
    }
}
</style>
