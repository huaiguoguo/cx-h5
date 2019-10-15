<template>
  <div class="container">
    <div class="header">资产</div>
    <div class="content">
      <div class="item" @click="$router.push('/zichan/selfEarnings')">
        <a>
          <div>
            <img src="~static/img/shouyi.png" />
          </div>
          <div class="jin">静态收益</div>
          <div class="goInfo">查看详情</div>
        </a>
      </div>
      <div class="middleLine"></div>
      <div class="item" @click="$router.push('/zichan/teamEarnings')">
        <a>
          <div>
            <img src="~static/img/dongtai.png" />
          </div>
          <div class="dong">动态收益</div>
          <div class="goInfo2">查看详情</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-irregular-whitespace
export default {
    components: {},
    data() {
        return {
            username: 'hello world',
            messagelist: [
                { name: 'guofeng', gender: 'abc' }
                // { name: 'guofeng', gender: 'abc' },
                // { name: 'guofeng', gender: 'abc' },
                // { name: 'guofeng', gender: 'abc' }
            ]
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
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
    width: 100%;
    height: 100%;
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
        box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.13);
    }
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 700px;
        margin: 40px auto;
        box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        border: solid 1px #dadada;
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
            height: 350px;
            font-size: 30px;
            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                // justify-content: center;
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
                    color: #3e4de4;
                }
                .dong {
                    // width: 120px;
                    color: #3eb7e4;
                }
            }
            img {
                width: 70px;
                height: 70px;
            }
            div:nth-child(1) {
                width: 68px;
            }
            div:nth-child(2) {
                margin-top: 20px;
                font-size: 30px;
            }
        }
    }
}
</style>
