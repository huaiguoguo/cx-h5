<template>
    <div class="container">
        <div class="header" :style="marginTopObject">资产</div>
        <div class="content">
            <div class="item" @click="$router.push('/zichan/jintai')">
                <!-- <a> -->
                <div class="jin">静态收益</div>
                <!-- </a> -->
            </div>
            <div class="item" @click="$router.push('/zichan/myteam')">
                <!-- <a> -->
                <div class="dong">动态收益</div>
                <!-- </a> -->
            </div>
        </div>

        <!-- 总和 -->
        <div class="cout">
            <div>
                <span class="co">
                    <span class="label" style="color:#666;font-weight:700;"> 当日佣金：</span>
                    <span>{{dynamicData.allMoneyStatic?dynamicData.allMoneyStatic:'0'}}</span>
                </span>
            </div>
            <div>
                <span class="co">
                    <span class="label" style="color:#666;;font-weight:700;"> 当日奖励：</span>
                    <span>{{dynamicData.allMoney?dynamicData.allMoney:'0'}}</span>
                </span>
            </div>
        </div>

        <div v-if="dynamicData.list" class="list">
            <div v-for="(item,index) in dynamicData.list" :key="index" class="list-item">
                <div class="item-left">
                    <div>推荐人：{{item.buyer}}</div>
                    <div>购买：{{item.goodsName}}</div>
                    <div>{{item.addTime}}</div>
                </div>
                <div class="item-right">+￥{{item.how}}</div>
            </div>
        </div>
        <div v-else class="list-item nodata">
            <img src="~static/img/nodata.png" alt />
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-irregular-whitespace
export default {
    components: {},
    data() {
        return {
            dynamicData: '',
            marginTopObject: ''
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
        this.dynamicMoney()
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
        dynamicMoney() {
            this.$axios
                .post('user/dynamicMoney', {})
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.dynamicData = res.data.data
                        this.dynamicData.allMoneyStatic = Math.round(this.dynamicData.allMoneyStatic)
                        this.dynamicData.allMoney = Math.round(this.dynamicData.allMoney)
                    }

                    console.log('-----=-///////////////')
                    console.log(this.list)
                    console.log('--/////-')
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang='less' scoped>
.co {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
}
input {
    outline: none;
    border: none;
}
textarea {
    outline: none;
    border: none;
}
.nodata {
    margin-top: 150px;
}
.container {
    width: 100%;
    height: 100%;

    .cout {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        line-height: 50px;
        // border: 1px solid #999;
        padding: 0 20px;
        margin-top: 10px;
        div {
            width: 50%;
            span {
                // margin-left: 40px;
                font-size: 28px;
                color: #555;
            }
            // text-align: center;
        }
    }

    a {
        font-size: 24px;
    }
    .header {
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 36px;
        color: #333;
        text-align: center;
        // box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.13);
    }
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 700px;
        margin: 40px auto 0 auto;
        // box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.16);
        .middleLine {
            width: 2px;
            height: 80px;
            background-color: #d9d9d9;
        }
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 80px;
            font-size: 30px;
            // a {
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            font-size: 30px;
            .goInfo {
                width: 155px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                font-size: 24px;
                color: #ffffff;
                background-color: #3e4de4;
                border-radius: 23px;
                margin-top: 40px;
            }
            .goInfo2 {
                width: 155px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                font-size: 24px;
                color: #ffffff;
                background-color: #3eb7e4;
                border-radius: 23px;
                margin-top: 40px;
            }

            .jin {
                // width: 120px;
                color: #fff;
                font-size: 30px;
            }
            .dong {
                color: #fff;
                font-size: 30px;
            }
            // }
            img {
                width: 70px;
                height: 70px;
            }
            div:nth-child(2) {
                margin-top: 20px;
                font-size: 30px;
            }
        }
        .item:nth-child(1) {
            background-color: #43cbff;
            border-radius: 10px 0 0 10px;
        }
        .item:nth-child(2) {
            background-color: #649bff;
            border-radius: 0 10px 10px 0;
        }
    }
    .list {
        width: 100%;
        padding: 0 20px 85px 20px;
        margin-top: 50px;
        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 104px;
            padding: 10px 0;
            margin: 50px 0;
            .item-left {
                div:nth-child(1) {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                }
                div:nth-child(2) {
                    font-size: 24px;
                    font-weight: 600;
                    color: #555;
                }
                div:nth-child(3) {
                    font-size: 20px;
                    color: #333;
                }
            }
            .item-right {
                color: #333;
                font-size: 48px;
            }
        }
    }
}
</style>
