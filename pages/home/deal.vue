<template>
  <div class="container">
    <!-- <Nav v-if="isShow==1" /> -->
    <div class="header" :style="marginTopObject">
      <span>交易</span>
      <div class="seach">
        <div class="top-left">
          <div>
            <img src="~static/img/seach.png" alt />
          </div>
          <input type="text" class="inputObj" placeholder="yeezy boost 350 v2 cloud white" />
        </div>
        <div class="top-right">
          <img src="~static/img/ALL-seach.png" alt />
          <p>分类</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="item-list">
        <div v-for="(item,index) in list" :key="index" class="item" @click="$router.push({path: '/home/shop-xq',query:{id: item.id}})">
          <div class="img-box">
            <img :src="item.cover" />
          </div>
          <div class="productName">
            <span style="color:#666;">{{item.name1[0]}}</span>
            <span v-if="item.name1[1]">/</span>
            <span style="color:#333;">{{item.name1[1]}}</span>
            <p>￥{{item.cny}}</p>
          </div>
          <div>
            <span style="margin:0 10px;">佣金{{item.getDay}}</span>
            <span>认购</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { async } from 'q'
export default {
    components: {},
    data() {
        return {
            isShow: 2,
            list: null,
            marginTopObject: ''
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
                .post('home/getTradeHangQing', {})
                .then((res) => {
                    console.log('succ==============')
                    const data = res.data
                    console.log(data)
                    this.list = data.data
                    console.log('--test---')
                    console.log(this.list)
                    for (let i = 0; i < this.list.length; i++) {
                        console.log(i)
                        // console.log('aaa')
                        const names = this.list[i].name1
                        const name1 = names.split('/')
                        this.list[i].name1 = name1
                        console.log(this.list.name1)
                        // console.log(this.list[i].name1)
                    }
                    console.log('--test---')
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="less" scoped>
input {
    outline: none;
    border: none;
}

.inputObj{
    font-size: 0.4rem;
}

.container {
    .header {
        width: 100%;
        span {
            display: block;
            width: 100%;
            height: 70px;
            line-height: 88px;
            text-align: center;
            font-size: 36px;
            color: #333;
        }
        .seach {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 80px;
            padding: 5px 50px;
            .top-left {
                display: flex;
                justify-content: space-between;
                height: 50px;
                margin: 10px 0;
                padding: 5px 0;
                background-color: #efefef;
                div {
                    width: 38px;
                    margin: 2px 15px;
                }
                input {
                    width: 450px;
                    background-color: #efefef;
                }
            }
            .top-right {
                width: 55px;
                height: 55px;
                p {
                    font-size: 24px;
                }
            }
        }
    }
    .item-list {
        padding-bottom: 120px;
        .item:first-child {
            border-top: 1px solid #eaeaea;
        }
        .item {
            width: 100%;
            height: 110px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eaeaea;
            padding: 10px 20px;
            .img-box {
                // width: 60px;
                // height: 32px;
                // line-height: 110px;
                .img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .productName {
                margin-left: -10px;
            }
            div:nth-child(1) {
                width: 80px;
                margin: 0 10px;
            }
            div:nth-child(2) {
                width: 350px;
                font-family: PingFang-SC-Medium;
                font-size: 24px;
                color: #333;
                text-align: start;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                p {
                    font-family: PingFang-SC-Bold;
                    color: #000;
                    font-size: 30px;
                    text-align: start;
                }
                span {
                    font-size: 28px;
                    color: #333;
                }
            }
            div:nth-child(3) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                // width: 300px;
                span {
                    font-size: 24px;
                }
                span:nth-child(1) {
                    color: #fe6161;
                }
                span:nth-child(2) {
                    display: inline-block;
                    width: 121px;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    color: #fff;
                    background-color: #0fae78;
                    border-radius: 10px;
                }
            }
        }
        .rate {
            // background-color: red;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p {
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
            }
            p:first-child {
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #e4004b;
            }
        }
        .btn {
            // width: 100%;
            height: 112px;
            line-height: 112px;
            // background: #ccc;
            button {
                border: 0px;
                width: 121px;
                height: 50px;
                background-color: #47b884;
                border-radius: 10px;

                font-family: PingFang-SC-Bold;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }
    }
}
</style>
