<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div @click="$router.go(-1)">
        <img src="~static/img/back.png" />
      </div>
      <div class="pageName">动态收益</div>
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt />
      </div>
    </div>

    <div class="total">
      <div class="total-item">
        <div class="name">团队收益</div>
        <div>
          <div>总收益：￥{{list.allMoney}}</div>
          <div>直推：{{list.directMemberNumber}}人</div>
        </div>
      </div>
    </div>
    <div v-if="innerList.length === 0" class="nodataimg">
      <img src="~static/img/nodata.png" alt />
    </div>
    <div v-else class="item-list">
      <div v-for="(item,index) in innerList" :key="index">
        <div class="item">
          <span>{{ item.addTime }}</span>
          <span>+￥{{ item.how }}</span>
          <span>{{ item.mark }}</span>
        </div>
      </div>
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
            list: {},
            innerList: [],
            marginTopObject: ''
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        this.dynamicMoney()
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
        async dynamicMoney() {
            await this.$axios
                .post('user/dynamicMoney', {
                    username: this.$store.state.user.userInfo.openid
                })
                .then((res) => {
                    console.log('succ==============')
                    console.log(res)
                    const data = res.data
                    this.innerList = data.data.list
                    this.list = data.data
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        test() {
            console.log('asdf')
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
    // position: absolute;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    // overflow-y: auto;
    // background-color: #efefef;
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
        margin: 30px 0;
        padding: 0 20px;
        .total-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 700px;
            height: 160px;
            padding: 0 20px;
            background-image: linear-gradient(90deg, #78cdf6 0%, #66aaeb 100%);
            border-radius: 10px;
            div {
                display: flex;
                align-items: center;
                margin: 0 10px 0 0;
                color: #fff;
                font-size: 24px;
            }
            .name {
                font-size: 36px;
            }
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
            align-items: center;
            margin-top: 18px;
            padding: 0 10px;
            height: 100px;
            background-color: #ffffff;
            border-radius: 10px;
            font-size: 30px;
            span:nth-child(2) {
                font-weight: 600;
            }
            span{
                font-size: 30px;
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
