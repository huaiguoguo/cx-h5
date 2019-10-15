<template>
  <div class="container">
    <BackNav :title="`提现记录`" />

    <div class="content" style="margin-top:50px;">
      <div class="list">
        <div v-for="(item,index) in list2" :key="index" class="item">

          <div class="top_party">
            <div class="left">
              <span>提现</span>
            </div>
            <div class="right">
              <span>￥{{item.money}}</span>
            </div>
          </div>

          <div class="bottom_party">
            <div class="top">
              <div class="apply_cash_date_title">
                <span>申请提现时间</span>
              </div>
              <div class="apply_cash_date">
                <span>{{item.addTime}}</span>
              </div>
            </div>

            <div class="middle">
              <div class="cash_status_title">
                <span>状态</span>
              </div>
              <div class="cash_status">
                <span v-if="item.status == 0">待审核</span>
                <span v-if="item.status == 1">已审核</span>
                <span v-if="item.status == 2">已拒绝</span>
              </div>
            </div>

            <!-- <div class="bottom">
              <div class="order_num_title">
                <span>订单编号:</span>
              </div>
              <div class="order_num">
                <span>ZZ135071</span>
              </div>
            </div> -->

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BackNav from '~/components/BackNav.vue'
export default {
    components: {
        BackNav
    },
    data() {
        return {
            list: [],
            tixianLists: 'user/tixianLists'
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.user.userInfo
        }
    },
    mounted() {
        this.getCashLog()
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
    },
    methods: {
        getCashLog() {
            this.$axios
                .post(this.tixianLists, {
                    page: 1,
                    username: this.userInfo.openid
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        this.list = res.data.data
                        // this.$router.push({ path: '/home' })
                    } else if (res.data.status === -1) {
                        this.responseErrorMsg = res.data.msg
                    }
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
    background: #f4f4f4;
    .content {
        width: 100%;
        height: 100%;

        .list {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .item {
                width: 95%;
                // height: 180px;
                background-color: #fff;
                box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.13);
                border-radius: 10px;
                border: solid 1px #e2e2e2;

                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                margin-top: 20px;
                padding: 15px 5px;
                .top_party {
                    width: 80%;
                    height: 60px;
                    // background-color: #000;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-family: PingFang-SC-Medium;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    .left {
                        span {
                            width: 47px;
                            height: 22px;
                            color: #333333;
                        }
                    }
                    .right {
                        span {
                            // display: block;
                            width: 96px;
                            height: 19px;
                            color: #ff4444;
                        }
                    }
                }
                .bottom_party {
                    width: 80%;
                    // height: 150px;
                    // background: pink;
                    margin-top: 20px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: space-between;

                    color: #333333;

                    // padding-right: 15px;
                    // padding-left: 15px;

                    .top {
                        // margin-top: 25px;
                        // background-color: orange;
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .apply_cash_date_title {
                            span {
                                display: block;
                                // width: 209px;
                                // height: 19px;
                                font-family: PingFang-SC-Medium;
                                font-size: 24px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #333333;
                            }
                        }
                        .apply_cash_date {
                            span {
                                display: block;
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                    }
                    .middle {
                        flex: 1;
                        margin-top: 15px;
                        margin-bottom: 20px;
                        // background-color: rgb(255, 60, 0);
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .cash_status_title {
                            span {
                                // width: 86px;
                                // height: 19px;
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                        .cash_status {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                    }
                    .bottom {
                        flex: 1;
                        // background-color: rgb(25, 60, 0);
                        width: 100%;
                        // margin-top: 25px;
                        // margin-bottom: 5px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .order_num_title {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                        .order_num {
                            span {
                                font-family: PingFang-SC-Medium;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #009cff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
