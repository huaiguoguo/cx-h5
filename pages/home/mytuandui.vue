<template>
    <div class="container">
        <!-- <Nav v-if="isShow==1" /> -->
        <div class="header" :style="marginTopObject">
            <div class="goback" @click="$router.go(-1)">
                <img src="~static/img/back2.png" />
                <!-- ">>" -->
            </div>
            <div class="pageName">我的团队</div>
            <div class="avatar" @click="ShowLeftNav">
                <img src="~static/img/left_nav_switch_white.png" alt />
            </div>
            <!-- <a href="/user/login">登录页</a>· -->
        </div>
        <div class="float_card" :style="float_cardStyle">
            <div class="card_left">
                <span>￥{{list.yongJin}}</span>
                <span>团队总业绩</span>
            </div>
            <div class="middle_line"></div>
            <div class="card_right">
                <span>{{list.teamMemberNumber}}</span>
                <span>团队总人数</span>
            </div>
        </div>
        <div class="content">
            <div class="item-list" :style="itemListMarginTop">
                <div v-if="list.child == 0" class="item">
                            <div class="nodata">
                                <img src="~static/img/nodata.png" alt />
                            </div>
                </div>
                <block v-if="list.length != 0">
                    <div v-for="(item, index) in list.child" :key="index">
                        <div class="item">
                            <!-- <div v-if="list.child != 0" class="item" style="display:none"> -->
                                <div class="name">
                                    <span>{{item.name}}</span>
                                    <span>{{item.phone}}</span>
                                </div>
                                <div class="person">团队：{{item.teamMemberNumber}}人</div>
                                <div>
                                    <span>总业绩：</span>
                                    <span>￥{{item.yongJin}}</span>
                                </div>
                            <!-- </div> -->
                        </div>
                    </div>
                </block>
                <!-- <div class="item">
                    <div>
                        <span>刘宁</span>
                        <span>158****1212</span>
                    </div>
                    <div>团队：2人</div>
                    <div>
                        <span>总业绩：</span>
                        <span>￥500.00</span>
                    </div>
                </div>

                <div class="item">
                    <div>
                        <span>刘宁</span>
                        <span>158****1212</span>
                    </div>
                    <div>团队：2人</div>
                    <div>
                        <span>总业绩：</span>
                        <span>￥500.00</span>
                    </div>
                </div>-->
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
            list: {},
            marginTopObject: '',
            itemListMarginTop: '',
            float_cardStyle: ''
        }
    },
    created() {},
    mounted() {
        this.isIPhoneX()
        this.getTeamPerson()
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
                // this.marginTopObject = 'margin-top: 0.83rem;'
                this.marginTopObject = 'padding-top:1.08rem; height:4.1rem;'
                this.itemListMarginTop = 'margin-top: 1.6rem;'
                this.float_cardStyle = 'top: 2.66rem;'
            }
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        getTeamPerson() {
            this.$axios
                .post('user/getTeamPerson', {})
                .then((res) => {
                    console.log('asdfasdf==============')
                    console.log(res.data)
                    console.log('asdfasdf==============')
                    if (res.data.status === 1) {
                        this.list = res.data.data
                    }
                    console.log(this.list)
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
        justify-content: space-between;
        height: 233px;
        line-height: 88px;
        text-align: center;
        padding: 20px 20px 0px 20px;
        font-size: 36px;
        color: #fff;
        background-image: url('~static/img/home/myteam_bg.png');
        div:nth-child(1) {
            width: 16px;
            height: 32px;
        }
        .avatar {
            img {
                width: 55px;
            }
        }
        .pageName {
            margin-left: 16px;
        }
    }
    .float_card {
        position: absolute;
        top: 136px;
        left: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 689px;
        height: 194px;
        background-color: #ffffff;
        box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.13);
        border-radius: 10px;
        .middle_line {
            width: 3px;
            height: 124px;
            background: #e5e5e5;
        }
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .card_left {
            width: 49%;
            span:nth-child(1) {
                font-size: 48px;
                color: #333;
            }
            span:nth-child(2) {
                font-size: 24px;
                color: #666;
            }
        }
        .card_right {
            width: 49%;
            span:nth-child(1) {
                font-size: 48px;
                color: #333;
            }
            span:nth-child(2) {
                font-size: 24px;
                color: #666;
            }
        }
    }
    .content {
        width: 100%;
        padding: 0 20px;
        .nodata {
            margin-top: 180px;
        }
        .item-list {
            width: 100%;
            padding: 0 20px;
            margin-top: 120px;
            .item:first-child {
                border-top: 1px solid #f3f3f3;
            }
            .item {
                display: flex;
                height: 80px;
                line-height: 80px;
                justify-content: space-between;
                border-bottom: 1px solid #f3f3f3;
                div:nth-child(1) {
                    flex: 3;
                    font-size: 24px;
                    color: #000;
                }
                div:nth-child(2) {
                    flex: 2;
                    font-size: 24px;
                    color: #555;
                }
                div:nth-child(3) {
                    flex: 3;
                    // background: pink;
                    display: flex;
                    justify-content: space-between;
                    span:nth-child(1) {
                        // background-color: #000;
                        font-size: 20px;
                        color: #555;
                    }
                    span:nth-child(2) {
                        font-size: 26px;
                        color: #333;
                    }
                }
                .name{
                    span{
                        font-size: 24px;
                    }
                }
                .person{
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
