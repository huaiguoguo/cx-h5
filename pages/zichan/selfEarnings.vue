<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div @click="$router.go(-1)">
        <img src="~static/img/back.png" />
      </div>
      <div class="pageName">静态收益</div>
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt />
      </div>
    </div>
    <div class="total">
      <div>个人总资产</div>
      <div>￥{{list.allMoney}}</div>
    </div>
    <div v-if="innerList.length === 0" class="nodataimg">
      <img src="~static/img/nodata.png" alt />
    </div>
    <div v-else class="item-list">
      <div v-for="(item,index) in innerList" :key="index">
        <div class="item">
          <div class="item-left">
            <div class="item-left-img">
              <img src="~static/img/linghuotouzi.png" alt />
            </div>
            <div class="item-left-txt">
              <div>{{item.phone}}</div>
              <div>
                <span>{{item.addTime}}</span>
              </div>
            </div>
          </div>
          <div class="item-right">
            <p class="deal">+¥{{item.how}}</p>
            <p>
              订单编号：
              <span >{{item.mark}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="item">
                <div class="item-left">
                    <div class="item-left-img">
                        <img src="~static/img/linghuotouzi.png" alt />
                    </div>
                    <div class="item-left-txt">
                        <div>158****1212</div>
                        <div>
                            <span>09.18</span>
                            <span>12:12</span>
                        </div>
                    </div>
                </div>
                <div class="item-right">
                    <p class="deal">-¥500</p>
                    <p>
                        订单编号：
                        <span>ZZ135071</span>
                    </p>
                </div>
            </div>-->

      <!-- <div class="item">
                <div class="item-left">
                    <div class="item-left-img">
                        <img src="~static/img/linghuotouzi.png" alt />
                    </div>
                    <div class="item-left-txt">
                        <div>158****1212</div>
                        <div>
                            <span>09.18</span>
                            <span>12:12</span>
                        </div>
                    </div>
                </div>
                <div class="'item-right">
                    <p class="deal">-¥500</p>
                    <p>
                        订单编号：
                        <span>ZZ135071</span>
                    </p>
                </div>
            </div>-->
    </div>

    <div class="content"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-irregular-whitespace
export default {
    components: {},
    data() {
        return {
            marginTopObject: '',
            list: [],
            innerList: []
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        this.staticMoney()
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
                this.marginTopObject = 'margin-top: 0.83rem'
            }
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        test() {
            console.log('asdf')
        },
        staticMoney() {
            this.$axios
                .post('user/staticMoney', {
                    username: this.$store.state.user.userInfo.openid
                })
                .then((res) => {
                    const data = res.data
                    console.log(res)
                    this.innerList = data.data.list
                    this.list = data.data
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
textarea {
    outline: none;
    border: none;
}
.container {
    width: 100%;
    height: 100%;
    a {
        font-size: 25px;
        color: red;
    }
    .header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        line-height: 80px;
        padding: 0 20px;
        font-size: 36px;
        color: #333;
        text-align: center;
        img {
            width: 16px;
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

    .total {
        width: 100%;
        height: 200px;
        padding: 0 20px;
        background-color: #3e4de4;
        div {
            color: #fff;
            height: 100px;
            line-height: 100px;
        }
        div:nth-child(1) {
            font-size: 36px;
            line-height: 150px;
        }
        div:nth-child(2) {
            font-size: 48px;
        }
    }
    .nodataimg {
        padding: 20px 20px 20px 40px;
    }
    .item-list {
        width: 100%;
        padding: 0 20px;
        .item {
            display: flex;
            justify-content: space-between;
            // height: 90px;
            margin-top: 50px;
             align-items: center;
            border-bottom: 1px solid #e5e5e5;
            .item-left {
                display: flex;
                justify-content: space-around;
                .item-left-img {
                    display: flex;
                    align-items: center;
                    width: 55px;
                    margin: 0 20px 0 0;
                }
                .item-left-txt > div {
                    font-size: 30px;
                }
                .item-left-txt span {
                    font-size: 20px;
                }
                img {
                    line-height: 90px;
                }
            }

            .deal {
                font-size: 48px;
            }

            .item-right{
                 p:nth-child(2){
                     span{
                         font-size: 24px;
                     }

                 }
            }
        }
    }
    .content {
        display: flex;
        justify-content: center;
        width: 700px;
        margin: 10px auto;
    }
}
</style>
