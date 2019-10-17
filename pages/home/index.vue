<template>
  <div class="container">
    <div class="header" style="">
      <div class="avatar" :style="marginTopObject" @click="ShowLeftNav">
        <img src="~static/img/home/pcenter@2x.png" alt />
      </div>
      <div class="champion" :style="championTop">
        <img src="~static/img/home/champion@2x.png" alt />
      </div>
      <div class="huandeng">
        <swiper v-if="list.length > 1" :options="swiperOption" class="swiper-container">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in list" :key="index" class="swiper-item">
            <img class='swiper-img' :src='item.thumb' alt />
          </swiper-slide>
        </swiper>
      </div>

      <!-- <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <span v-for="(item, index) in list" :key="index" class="swiper-slide">
            <img :src="item.thumb" />
          </span>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div> -->
    </div>
    <div class="exchange" :style="exchangeDom">
      <div v-if="hangeQingList.length > 0" class="carousel">
        <!-- :fade="false" :autoplay-speed="600" autoplay :initial-slide="5" -->
        <a-carousel>
            <div v-for="(child, index) in hangeQingList" :key="index" class="screen_list">
                <div v-for="(item, child_index) in child" :key="child_index" class="item zhangfu">
                    <span style="width:auto;" :style="zhangfuDom1">{{item.name1}}</span>
                    <span v-if="item.limit == 1" style="color:#0fae78;" :style="zhangfuDom2">{{item.priceNormal}}</span>
                    <span v-if="item.limit == -1" style="color:#d3404c;" :style="zhangfuDom2">{{item.priceNormal}}</span>
                    <span v-if="item.limit == 1" style="color:#0fae78;" :style="zhangfuDom3">+{{item.limitFee}}</span>
                    <span v-if="item.limit == -1" style="color:#d3404c;" :style="zhangfuDom3">{{item.limitFee}}</span>
                    <span :style="zhangfuDom4">≈{{item.cny}} CNY</span>
                </div>
            </div>
        </a-carousel>
      </div>
      <!-- <div v-swiper:mySwiper="swiperOption" class="index-swiper-box">
        <div class="swiper-wrapper">
          <div v-for="(item2, index) in list2" :key="index" class="item swiper-slide">
            <span>{{item2.name1}}</span>
            <span>{{item2.priceNormal}}</span>
            <span>{{item2.priceNormal}}</span>
            <span v-if="item2.limit == 1" style="color:#e4004b;">+0.33%</span>
            <span v-if="item2.limit == -1" style="color:#47b884;">-0.33%</span>
            <span>≈{{item2.cny}} CNY</span>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>-->

      <!-- <div class="item">
                <span>RBG/USDT</span>
                <span>0.001888</span>
                <span>-26.79%</span>
                <span>≈0.01 CNY</span>
            </div>
            <div class="item deliver"></div>
            <div class="item">
                <span>FF/USDT</span>
                <span>0.1111</span>
                <span>-0.08%</span>
                <span>≈0.78 CNY</span>
            </div>
            <div class="item deliver"></div>
            <div class="item">
                <span>RBG/USDT</span>
                <span>0.001888</span>
                <span>-26.79%</span>
                <span>≈0.01 CNY</span>
            </div>-->
    </div>
    <div v-if="restrictionGoods.status == 1" class="shop" :style="shopDom" @click="redirect">
      <div class="left">
        <!-- <div class="title-top">通过champion可直接投资各类优质项目</div> -->
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
          <button @click="addTodo">立即认购</button>
        </div>
      </div>
      <div class="right">
        <div class="dataCover">
          <img v-if="restrictionGoods.data.cover" :src="restrictionGoods.data.cover" alt />
          <img v-else src="~static/img/shose.png" alt />
        </div>
        <div class="demoName">{{restrictionGoods.data.name1}}</div>
      </div>
    </div>
    <div v-if="restrictionGoods.status == -1" class="shops">
      <img src="~static/img/xiangou_new.png" alt />
    </div>
    <div class="document" :style="documentDom">
      <div class="left" @click="weikaiqi()">
        <img src="~static/img/home/fabi.png" alt :style="imgDom" />
        <!-- <span>法币交易</span> -->
        <!-- <span>1USDT=7.11CNY</span> -->
      </div>
      <div class="right">
        <div class="notice">
          <a href="/home/notice">
            <img src="~static/img/home/notice.png" alt />
          </a>
          <!-- <span>公告中心</span> -->
        </div>
        <div class="help" @click="weikaiqi()">
          <img src="~static/img/home/help.png" alt />
          <!-- <span>帮助中心</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PropTypes from '../../_util/vue-types';
import PropTypes from 'prop-types'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapMutations, mapState } from 'vuex'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            isShow: 0,
            list: [],
            swiperOption: {
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false
                },
                loop: true,
                speed: 1000
            },
            hangeQingList: [],
            marginTopObject: '',
            restrictionGoods: '',
            restrictionTimer: null,
            hour: 0,
            minute: 0,
            second: 0,
            initialSlide: 0,
            documentDom: '',
            shopDom: '',
            exchangeDom: '',
            imgDom: '',
            zhangfuDom1: '',
            zhangfuDom2: '',
            zhangfuDom3: '',
            zhangfuDom4: '',
            championTop: ''
        }
    },
    computed: {
        usersInfo() {
            return this.$store.state.user.userInfo
        },
        leftNavStatus() {
            return this.$store.state.user.leftNavStatus
        }
    },
    created() {
        // 设置3秒刷新行情数据
        if (this.timer) {
            clearInterval(this.timer)
        } else {
            this.timer = setInterval(() => {
                this.getHomeHangQing()
            }, 5000)
        }
    },
    mounted() {
        this.isIPhoneX()
        this.getTopBanner()
        this.getHomeHangQing()
        this.getUser()
        this.getRestrictionGoods()
        this.$message.config({
            top: `300px`,
            duration: 200,
            maxCount: 1
        })
    },
    updated() {},
    beforeDestroy() {
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
                this.marginTopObject = 'top: 17%'
                // sdf dsf df sddsfds
                this.documentDom = 'height: 160px; margin-top: 20px'
                this.shopDom = 'height: 150px;background-size: 100% 100%; margin-top: 15px'
                this.exchangeDom = 'margin-top: 10px'
                this.imgDom = 'max-height: auto; height: 100%;'
                this.championTop = 'top: 22%;'
            } else {
                console.log('xxxx')
            }

            const isIphone = /iphone/gi.test(window.navigator.userAgent)
            if (isIphone || window.screen.height >= 812) {
                this.zhangfuDom1 = 'font-weight: 600;font-size: 0.40rem;color:#444444;'
                this.zhangfuDom2 = 'font-weight: 700;font-size: 0.45rem;'
                this.zhangfuDom3 = 'font-weight: 700;font-size: 0.34rem;'
                this.zhangfuDom4 = 'font-weight: 600;font-size: 0.34rem;color: #999;'
                this.championTop = 'top: 18%;'
            }
        },
        onChange(a, b, c) {
            console.log(a, b, c)
        },
        redirect() {
            this.$router.push({
                path: '/home/shop-xq',
                query: { id: this.restrictionGoods.data.id }
            })
        },
        ShowLeftNav() {
            const leftNavStatus =
                this.$store.state.user.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        getUser() {
            const user = this.$store.state.user.userInfo
            console.log(user)
        },
        async getTopBanner() {
            await this.$axios
                .post('Home/topBanner', {})
                .then((res) => {
                    console.log('succ==============')
                    const data = res.data
                    console.log(data.data)
                    this.list = data.data
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        async getHomeHangQing() {
            await this.$axios
                .post('home/getHomeHangQing', {})
                .then((res) => {
                    const data = res.data.data
                    let index = 0
                    const result = []
                    while (index < data.length) {
                        result.push(data.slice(index, (index += 3)))
                    }

                    console.log('========================abc start')
                    console.log(res.data.data)
                    console.log(result)
                    console.log('========================abc end')
                    this.hangeQingList = result
                    console.log(this.hangeQingList)
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        getRestrictionGoods() {
            if (!this.restrictionTimer) {
                this.$axios('home/getRestrictionGoods', {})
                    .then((res) => {
                        this.restrictionGoods = res.data
                        console.log('======================tt=')
                        console.log(this.restrictionGoods)
                        console.log('======================ttt=')
                        // console.log(this.restrictionGoods);
                        if (res.data.status === 1) {
                            this.countDown()
                        } else {
                            console.log(res.data.msg)
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
                    const endTime = _this.restrictionGoods.data.endTime
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
        addTodo(e) {},
        weikaiqi() {
            this.$toast('此功能暂未开放')
        },
        isIPhoneXBak(fn) {
            const u = navigator.userAgent
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (isIOS) {
                if (screen.height === 812 && screen.width === 375) {
                    this.marginTopObject = 'top:85px'
                    console.log('是iphoneX')
                    // 是iphoneX
                } else {
                    console.log('不是iphoneX')
                    // 不是iphoneX
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.carousel {
    width: 100%;
    height: 250px;
    background: #f8f8f8;
}
// .zhangfu{
//     span{

//     }
// }

.huandeng {
    width: 100%;
    //height: 100%;
    min-height:445px;
    background-color:#eee;
    .swiper-item {
        height: 100%;
    }
    img {
        display: block;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
    }
    // .ant-carousel /deep/ .slick-slide {
    //     text-align: center;
    //     width: 100%;
    //     height: 250px;
    //     line-height: 250px;
    //     background: #000;
    //     overflow: hidden;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: center;
    //     align-items: center;
    // }
}

.ant-carousel /deep/ .slick-slide {
    text-align: center;
    width: 100%;
    height: 250px;
    line-height: 250px;
    background: #FAFAFA;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.ant-carousel /deep/ .screen_list {
    width: 100%;
    height: 200px !important;
    line-height: 200px !important;
    // background-color: red;
    display: flex !important;
    flex-direction: row;
    justify-content: flex-start;
    // align-items: center;
    // margin-top: -45px;
}

.ant-carousel /deep/ .screen_list .item {
    // background: #0076e4;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 250px;
    line-height: 200px;
    // background: #333333;
    // width: ceil(100% / 3);
    height: 200px;
    text-align: center;
    // border-right: 1px solid #ccc;

    // padding: 15px 0;

    span {
        display: block;
        height: 30px;
        line-height: 30px;
        // color: yellowgreen;
        // background-color: pink;
    }
    span:first-child {
        width: 141px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // height: 25px;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #555555;
        // background-color: pink;
    }
    span:nth-child(2) {
        // margin-top: 17px;
        font-family: PingFang-SC-Bold;
        font-size: 30px;
        font-weight: 550;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #0076e4;
    }
    span:nth-child(3) {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #0076e4;
    }
    span:last-child {
        // width: 154px;
        // height: 16px;
        // margin-top: 18px;
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #888888;
    }

    &:last-child {
        border-right: 0px;
    }
}

.ant-carousel /deep/ .slick-dots {
    li button {
        height: 4px;
        background: #888888 !important;
    }
    li.slick-active button {
        background: #000000 !important;
    }
}

.container {
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    // height: 100%;
    // padding: 0 20px;
    // overflow: scroll;
    /* For demo */
    box-sizing: border-box;

    .header {
        width: 750px;
        // height: 434px;
        height: 30%;
        overflow: hidden;
        background-color: #fff;
        position: relative;
        .avatar {
            width: 53px;
            height: 53px;
            // background-color: #000;
            position: absolute;
            z-index: 8888;
            top: 20%;
            left: 30px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .champion {
            // background-color: #000;
            width: 185px;
            height: 20px;
            position: absolute;
            z-index: 8888;
            top: 20%;
            left: 40%;
            right: 60%;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .exchange {
        display: flex;
        align-items: center;
        width: 100%;
        height: 20%;
        min-height:278px;
        margin-top: 10px;
        // background-color: #f5c8c8;
        border: solid 1px #e3e2e2;
        .swiper-wrapper {
            div:nth-of-type(3) {
                border-right: 0;
            }
        }

        .deliver {
            width: 2px;
            height: 90px;
            background-color: #ababab;
        }
    }
    .shop {
        width: 730px;
        // height: 220px;
        height: 20%;
        background-image: url('~static/img/countDown2.png');
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 10px;
        margin-top: 24px;
        display: flex;
        // flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 25px;
        div {
            width: 100%;
        }

        .left {
            display: flex;
            flex: 6;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .title {
                font-family: PingFang-SC-Bold;
                font-size: 20px;
                font-weight: 550;
                font-stretch: normal;
                color: #ffffff;
                margin-top: 27px;
            }
            .title-top {
                font-size: 20px;
                color: #ffffff;
                letter-spacing: -2px;
            }
            .count_down {
                margin: 8px 0px 8px 0;
                display: flex;
                // flex-direction: row;
                // justify-content: center;
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
                width: 190px;
                height: 59px;
                border-radius: 10px;
                border: solid 2px #ffffff;
                align-self: flex-start;
                margin-bottom: 13px;
                button {
                    background-color: transparent;
                    width: 100%;
                    height: 100%;
                    border: 0px;
                    font-family: PingFang-SC-Bold;
                    font-size: 36px;
                    font-weight: 550;
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
            height: 141px;
            flex: 4;
            // background-color: pink;

            img {
                width: 210px;
                height: 129px;
            }

            div:nth-child(1) {
                width: 176px;
                // margin: 20px 0;
            }
            .demoName {
                width: 180px;
                height: 40px;
                background-color: #000000;
                color: #fff;
                text-align: center;
            }
        }
    }
    .shops {
        width: 730px;
        height:20%;
        background-image: url('~static/img/xiangou.png');
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 10px;
        margin-top: 24px;
        margin-bottom: 24px;
    }
    .document {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 130px;
        .left {
            width: 48%;
            height: 100%;
            margin-right: 8px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 10px;
            }
            span {
                display: block;
            }
            span:first-child {
                background-color: #fff;
                font-family: PingFang-SC-Bold;
                font-size: 15px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
            span:last-child {
                background-color: yellowgreen;
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
            }
        }
        .right {
            width: 44%;
            height: 100%;
            // background-color: pink;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            border-radius: 10px;

            img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 10px;
            }
            .notice {
                width: 100%;
                height: 48%;
                // background-color: black;
                border-radius: 10px;
                img{
                    width:100%;
                    height: 100%;
                }
            }
            .help {
                // background-color: black;
                width: 100%;
                height: 48%;
                border-radius: 10px;
                margin-top: 2%;
                img{
                    width:100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
