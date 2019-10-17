<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="title">
        <span>行情</span>
      </div>
      <div class="navBar">
        <div class="item">
          <div class="icon">
            <img src="~static/img/home/detail/zixuantongxing.png" alt />
          </div>
          <div class="name">
            <span>自选通证</span>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img src="~static/img/home/detail/qkl.png" alt />
          </div>
          <div class="name">
            <span>区块链通证</span>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img src="~static/img/home/detail/wh.png" alt />
          </div>
          <div class="name">
            <span>外汇通证</span>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img src="~static/img/home/detail/cp.png" alt />
          </div>
          <div class="name">
            <span>潮牌通证</span>
          </div>
        </div>
      </div>
    </div>
    <div class="trade">
      <div class="title">
        <span>USDT</span>
      </div>
      <div class="sort">
        <div>
          名称
          <span class="sort_img">
            <img src="~static/img/home/detail/sort.png" alt />
          </span>
        </div>
        <div>
          <span>
            最新价
            <span class="sort_img">
              <img src="~static/img/home/detail/sort.png" alt />
            </span>
          </span>
          <span>
            涨跌幅
            <span class="sort_img">
              <img src="~static/img/home/detail/sort.png" alt />
            </span>
          </span>
        </div>
      </div>
      <!-- :style="'height:'+height+'px'" -->
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="items" @click="link()">
          <div class="shop_title">
            <div class="pic">
              <!-- <img src="~static/img/home/shoes.png" alt /> -->
              <img :src="item.cover" alt />
            </div>
            <div class="titles">
              <p class="product">
                <span>{{item.name1[0]}}</span>
                <span>/{{item.name1[1]}}</span>
                <!-- <span>/USDT</span> -->
              </p>
              <p>
                <span>24h成交量</span>
                <span>{{item.number}}</span>
              </p>
            </div>
          </div>
          <div class="rate">
            <p>{{item.priceNormal}}</p>
            <p>≈{{item.cny}}CNY</p>
          </div>
          <div class="btn">
            <button v-if="item.limit == 1" style="background-color:#0fae78;">+{{item.limitFee}}</button>
            <button v-if="item.limit == -1" style="background-color:#d3404c;">{{item.limitFee}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            list: null,
            height: window.innerHeight - 230,
            marginTopObject: ''
            // style: 'height:'+
        }
    },
    created() {
        // 设置3秒刷新行情数据
        if (this.timer) {
            clearInterval(this.timer)
        } else {
            this.timer = setInterval(() => {
                this.test()
            }, 5000)
        }
    },
    mounted() {
        this.isIPhoneX()
        this.test()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
    },
    destroyed() {
        // 清除定时器
        clearInterval(this.timer)
    },
    methods: {
        // async test() {
        //     await this.$axios.post('home/getHomeHangQing', {}
        //     ).then((res) => {
        //         console.log(res.data)
        //         this.list = res.data.data
        //     })
        // },
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
        async test() {
            await this.$axios
                .post('home/getHomeHangQing', {})
                .then((res) => {
                    console.log('succ==============')
                    const data = res.data
                    console.log(res.data.data)
                    this.list = data.data
                    console.log('-----')
                    console.log(this.list)
                    for (let i = 0; i < this.list.length; i++) {
                        console.log(i)
                        // console.log('aaa')
                        const names = this.list[i].name1
                        const name1 = names.split('/')
                        this.list[i].name1 = name1
                    }
                    console.log('------')
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        link() {
            // this.$router.push('/home/kline')
            // window.location.href = 'https://www.tradingview.com/chart/LTCUSD/bmp1PwJ3-40-Returns-in-5-days-The-Big-Drop-What-to-Do/'
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    // color: red;
    .header {
        width: 100%;
        // height: 200px;
        // margin-top: 30px;
        // background-color: pink;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 20px 0px;
        .title {
            width: 100%;
            height: 70px;
            line-height: 70px;
            margin-top: 20px;
            // background: yellowgreen;
            span {
                display: block;
                font-family: PingFang-SC-Bold;
                font-size: 36px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
        }
        .navBar {
            width: 100%;
            // height: 100%;
            margin-top: 22px;
            // background-color: red;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            .item {
                width: 120px;
                height: 170px;
                // background-color: #000;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .icon {
                    width: 70px;
                    height: 70px;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .name {
                    span {
                        display: block;
                        font-family: PingFang-SC-Bold;
                        font-size: 24px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #555555;
                    }
                }
            }
        }
    }
    .trade {
        width: 100%;
        height: 100%;
        margin-top: 30px;
        .sort {
            display: flex;
            justify-content: space-between;
            padding: 0 30px 0 20px;
            color: #888888;
            div {
                span {
                    font-size: 26px;
                }
            }
            div:nth-child(1) {
                flex: 4.5;
                font-size: 26px;
            }
            div:nth-child(2) {
                display: flex;
                flex: 3.5;
                justify-content: space-between;
                font-size: 26px;
            }
            .sort_img {
                display: inline-block;
                width: 10px;
                height: 14px;
                margin-left: 5px;
            }
        }

        > .title {
            width: 100%;
            height: 66px;
            // background: orange;
            span {
                width: 79px;
                // height: 23px;
                display: block;
                // background-color: ;
                margin-left: 20px;
                border-bottom: 5px solid blue;

                font-family: PingFang-SC-Bold;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #0062be;
                text-align: center;
            }
        }
        .list:-webkit-scrollbar {
            width: 0 !important;
        }
        .list {
            width: 100%;
            // height: 900px;
            // overflow: auto;
            // background-color: pink;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            // justify-items: center;
            align-items: center;
            // padding-bottom: 100px;
            padding: 0 20px 120px 20px;
            // -ms-overflow-style: none;
            .items {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 110px;
                padding: 10px 0;
                border-bottom: 1px solid #eaeaea;
                .shop_title {
                    flex:2;
                    display: flex;
                    align-items: center;
                    .pic {
                        width: 80px;
                        // height: 32px;
                    }
                    .titles {
                        .product {
                            span:first-child {
                                color: #333;
                                font-size: 28px;
                            }
                            span:last-child {
                                color: #666666;
                                font-size: 24px;
                            }
                        }
                        p:last-child {
                            span {
                                font-size: 24px;
                                color: #555555;
                            }
                        }
                    }
                }
                .rate {
                    flex:1;
                    width: 170px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    // background: pink;
                    p:nth-child(1) {
                      flex:1;
                        color: #333;
                        font-size: 28px;
                    }
                    p:nth-child(2) {
                        flex:1;
                        color: #555;
                        font-size: 24px;
                    }
                }
                .btn {
                  flex:0.8;
                    button {
                        width: 121px;
                        height: 60px;
                        border-radius: 10px;
                        outline: none;
                        border: 1px solid transparent;
                        color: #fff;
                        font-size: 28px;
                    }
                }
            }
        }
    }
}
</style>
