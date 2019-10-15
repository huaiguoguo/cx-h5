<template>
  <div class="nav_container">
    <div class="shadow" @click="Close"></div>
    <div class="_Nav">
      <div v-if="!userInfo" class="nav_item header">
        <div class="header_item title" @click="login">请登录</div>
        <div class="header_item subTitle">欢迎来到CHAMPION</div>
      </div>

      <div v-if="userInfo" class="nav_item userinfo">
        <div class="avatar">
          <span>
            <!-- <img :src="userInfo&&userInfo.head?userInfo.head:require('../static/img/user/avatar.png')"  alt /> -->
            <img src="~static/img/user/default.png" alt />
          </span>
        </div>

        <div class="nickname">
          <span>{{userInfo.name}}</span>
        </div>
        <!-- <div class="mobile">
          <span></span>
        </div> -->
        <div class="perfect">
          <span class="perfect_icon">
            <img src="~static/img/left_nav/perfect.png" alt />
          </span>
          <span class="perfect_title" @click="redirect('/user/renzheng')">实名认证</span>
        </div>
      </div>

      <div v-if="userInfo" class="nav_item notice">
        <span>不要向任何人透漏密码和短信</span>
      </div>

      <div class="nav_item account">
        <div class="account_menu level" >
          <span>
            <img src="~static/img/left_nav/recharge.png" alt />
          </span>
          <span>充值</span>
        </div>
        <div class="account_menu points" @click="redirect('/user/myBalance')">
          <span>
            <img src="~static/img/left_nav/cash.png" alt />
          </span>
          <span>提现</span>
        </div>
        <div class="account_menu brokerage">
          <span>
            <img src="~static/img/left_nav/transferByfunds.png" alt />
          </span>
          <span>划账</span>
        </div>
      </div>

      <!-- <div class="nav_item account">
        <div class="account_menu level">
          <span>Lv.13</span>
          <span>当前级别</span>
        </div>
        <div class="account_menu points">
          <span>500</span>
          <span>积分</span>
        </div>
        <div class="account_menu brokerage">
          <span>￥10000</span>
          <span>总佣金</span>
        </div>
            </div>-->
      <div class="nav_item menu">
        <div class="menu_item" @click="redirect('/home/mytuandui')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/team.png" alt />
          </div>
          <div class="sub_item name">我的团队</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/user/address')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/address.png" alt />
          </div>
          <div class="sub_item name">收货地址</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/user/editpwd')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/ellipse.png" alt />
          </div>
          <div class="sub_item name">修改密码</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/user/change-erji-pwd')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/erjimima.png" alt />
          </div>
          <div class="sub_item name">修改二级密码</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/user/order-ing')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/order.png" alt />
          </div>
          <div class="sub_item name">我的订单</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/user/myBalance')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/balance.png" alt />
          </div>
          <div class="sub_item name">我的余额</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
        <div class="menu_item" @click="redirect('/home/InvitationCode')">
          <div class="sub_item icon">
            <img src="~static/img/left_nav/invitation.png" alt />
          </div>
          <div class="sub_item name">邀请码</div>
          <div class="sub_item right_arrow">
            <img src="~static/img/left_nav/right_arrow.png" alt />
          </div>
        </div>
      </div>
      <div class="logout">
        <button v-if="userInfo" @click="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            isShow: 0
        }
    },
    computed: {
        ...mapState('user', {
            userInfo: 'userInfo',
            leftNavStatus: 'leftNavStatus'
        })
    },
    methods: {
        login() {
            this.$store.commit('user/setLeftNavStatus', 0)
            this.$router.push('/user/login')
        },
        logout() {
            this.$store.commit('user/logout')
        },
        redirect(url) {
            this.$router.push(url)
            this.$store.commit('user/setLeftNavStatus', 0)
        },
        Close() {
            this.$store.commit('user/setLeftNavStatus', 0)
        }
    }
}
</script>

<style lang="less" scoped>
.nav_container {
    width: 100%;
    height: 100%;
}

.shadow {
    width: 100%;
    height: 100%;
    background-color: #6d6d6d;
    position: fixed;
    left: 0;
    z-index: 999;
    opacity: 0.5;
}

._Nav {
    width: 490px;
    height: 100%;

    background-color: #fff;
    position: fixed;
    left: 0;
    z-index: 99999;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // .nav_item {
    //     margin-left: 25px;
    // }
    .header {
        width: 100%;
        // height: 85px;
        // background-color: black;
        padding-left: 25px;
        margin-top: 100px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        // box-sizing: content-box;

        .header_item {
            width: 100%;
            text-align: left;
        }
        .title {
            // width: 105px;
            // height: 34px;
            font-family: PingFang-SC-Bold;
            font-size: 36px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
        }

        .subTitle {
            // width: 220px;
            // height: 23px;
            margin-top: 25px;
            font-family: PingFang-SC-Regular;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #888888;
        }
    }

    .userinfo {
        width: 100%;
        // height: 100%;
        margin-top: 80px;
        // background-color: #3a50da;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avatar {
            width: 100%;
            height: 100%;
            // background-color: yellow;
            text-align: center;
            span {
                // background-color: red;
                width: 120x;
                height: 120px;
                display: inline-block;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .nickname {
            width: 100%;
            height: 100%;
            // background-color: yellow;
            text-align: center;
            span {
                // background-color: pink;
                font-family: PingFang-SC-Bold;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #000000;
            }
        }
        .mobile {
            width: 100%;
            // background-color: orange;
            text-align: center;
            margin-top: 12px;
            font-family: PingFang-SC-Regular;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
        }
        .perfect {
            width: 100%;
            // height: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 25px;
            .perfect_icon {
                width: 40px;
                height: 40px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .perfect_title {
                display: block;
                margin-left: 5px;
                font-family: PingFang-SC-Bold;
                font-size: 26px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #1296db;
            }
        }
    }

    .notice {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-top: 40px;
        background-color: #f7f8fc;
        text-indent: 25px;
        span {
            display: block;
            // width: 311px;
            // height: 23px;
            font-family: 'microsoft yahei';
            font-size: 24px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 1.5px;
            color: #3a50da;
        }
    }
    .account {
        width: 90%;
        height: 120px;
        margin-top: 30px;
        // padding-bottom: 20px;
        // background-color: pink;
        box-sizing: content-box;
        border-bottom: 2px solid #ccc;

        align-self: center;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        padding-bottom: 19px;

        .account_menu {
            width: 135px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 0px;
            span:first-child {
                height: 70px;
                line-height: 70px;
                border-right: 2px solid #ccc;

                font-family: PingFang-SC-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
                img {
                    width: 45px;
                    height: 46px;
                }
            }
            span:last-child {
                font-family: PingFang-SC-Bold;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #888888;
            }
            span {
                width: 100%;
            }
        }
        // .level {
        //     width: 100%;
        //     background-color: antiquewhite;
        // }
        // .points {
        //     width: 100%;
        //     background-color: cornflowerblue;
        // }
        .brokerage {
            span:first-child {
                border-right: 0px solid #ccc;
            }
            // width: 100%;
            // background-color: peru;
        }
    }
    .menu {
        width: 100%;
        // background-color: pink;
        margin-top: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
        color: black;
        .menu_item:first-child {
            margin-top: 0px;
        }
        // .menu_item:last-child {
        // .name {
        //     width: 150px;
        // }
        // .right_arrow {
        //     width: 100px;
        //     margin-left: 130px;
        // }
        // }
        .menu_item {
            width: 100%;
            height: 100%;
            margin-top: 37px;
            // background-color: yellowgreen;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            // border-bottom: 1px solid #ccc;
            .sub_item {
                width: 150px;
                // background-color: white;
            }
            .icon:first-child {
                // width: 50px;
                // height: 50px;
                img {
                    max-width: 100%;
                    max-height: 105%;
                }
            }
            .icon {
                width: 40px;
                height: 40px;
                // background-color: aquamarine;
                text-align: center;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .name {
                width: 360px;
                text-align: left;
                margin-left: 30px;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #555555;
            }
            .right_arrow {
                width: 15px;
            }
        }
    }

    .logout {
        width: 100%;
        height: 100px;
        margin-top: 30px;
        line-height: 100px;
        // background-color: pink;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            width: 320px;
            height: 60px;
            border: 0px;
            background-color: #d3404c;
            font-family: PingFang-SC-Medium;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }
    }
}
</style>
