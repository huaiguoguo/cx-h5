<template>
    <div>
        <div class="container">
            <div class="header" :style="marginTopObject">
                <div class="goback" @click="$router.go(-1)">
                    <img src="~static/img/back.png" alt />
                </div>
                <div class="pageName">静态收益详情</div>
                <div class="avatar" @click="ShowLeftNav">
                    <img src="~static/img/left_nav_switch.png" alt />
                </div>
            </div>
            <div class="content">
                <div class="items">
                    <div class="shop_title">
                        <div class="pic">
                            <!-- <img src="~static/img/home/shoes.png" alt /> -->
                            <img :src="order_goods.cover" alt />
                        </div>
                        <div class="title">
                            <p>
                                <span>{{order_goods.name1}}</span>
                                <!-- <span>/USDT</span> -->
                            </p>
                            <p>
                                <span>购买日期</span>
                                <span>{{order.addTime}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="rate">
                        <p>{{order_goods.getDay}}%</p>
                        <p>每日释放</p>
                    </div>
                    <div class="rate">
                        <p>{{order.getMoney}}</p>
                        <p>预计产出佣金</p>
                    </div>
                </div>
            </div>
            <div class="list" :style="'height:'+height+'px'">

                <div v-for="(item,index) in list.list" :key="index" class="item">
                    <div>{{item.addTime}}</div>
                    <div>
                        <span>+{{item.how}}</span>
                        <span>元</span>
                    </div>
                </div>
                <!-- {{order}} -->

                <!-- <div class="item">
                    <div>2019年10月5日</div>
                    <div>
                        <span>+50</span>
                        <span>元</span>
                    </div>
                </div>
                <div class="item">
                    <div>2019年10月5日</div>
                    <div>
                        <span>+50</span>
                        <span>元</span>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            height: window.innerHeight - 250,
            list: {},
            order: {},
            order_goods: {},
            marginTopObject: ''
        }
    },
    mounted() {
        this.isIPhoneX()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
        this.orders()
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
                this.marginTopObject = 'margin-top: 0.83rem'
            }
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        orders() {
            let aa = window.location.hash
            aa = aa.substr(1)
            console.log(aa)
            this.$axios
                .post('user/getOrderStaticMoneyLists', {
                    orderSn: aa
                })
                .then((res) => {
                    console.log('-----')
                    // console.log(res)
                    res = res.data.data
                    this.list = res
                    this.order = this.list.order
                    this.order_goods = this.list.order.goods
                    console.log(this.list)
                    console.log('-----')
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
    .header {
        display: flex;
        width: 100%;
        height: 88px;
        padding: 0 20px;
        line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
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
    .content {
        height: 118px;
        padding: 0 20px;
        // height: 900px;
        overflow: auto;
        // background-color: pink;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        -ms-overflow-style: none;

        .items {
            width: 100%;
            height: 110px;
            // background-color: orange;
            box-shadow: 2px 2px 5px #ccc;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .shop_title {
                // width: 259px;
                // background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                .pic {
                    width: 120px;
                    // height: 64px;
                    // line-height: 112px;
                    // background: red;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .title {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    // align-items: center;
                    margin-left: 10px;
                    p {
                        height: 40px;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                    }

                    p:first-child {
                        span {
                            display: block;
                        }
                        span:first-child {
                            // width: 190px;
                            height: 40px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-family: PingFang-SC-Medium;
                            font-size: 24px;
                            color: #333333;
                        }
                    }
                    p:last-child {
                        // margin-top: 10px;
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        // margin-left: 20px;
                        // background-color: yellow;
                        span {
                            display: block;
                            line-height: 35px;
                        }
                        color: #555555;
                        font-family: PingFang-SC-Regular;
                        span:first-child {
                            // width: 103px;
                            height: 35px;
                            line-height: 35px;
                            font-size: 22px;
                        }
                        span:last-child {
                            // width: 140px;
                            height: 35px;
                            line-height: 35px;
                            font-size: 22px;
                        }
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
                    font-size: 28px;

                    color: #333333;
                }
                p:last-child {
                    font-family: PingFang-SC-Regular;
                    font-size: 20px;
                    color: #888888;
                }
            }
        }
    }
    .list {
        padding: 0 20px;
        .item {
            width: 100%;
            height: 80px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            box-shadow: 2px 2px 5px #ccc;
            div:nth-of-type(2) {
                span:nth-of-type(1) {
                    width: 83px;
                    height: 36px;
                    font-family: PingFang-SC-Bold;
                    font-size: 48px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ff2c2c;
                }
                span:nth-of-type(2) {
                    width: 28px;
                    height: 27px;
                    font-family: PingFang-SC-Bold;
                    font-size: 30px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #333333;
                }
            }
            div:nth-of-type(1) {
                // width: 230px;
                height: 29px;
                font-family: PingFang-SC-Bold;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
        }
    }
}
</style>
