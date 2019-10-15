<template>
  <div class="container">
    <div class="commonly_used national">
      <div class="title">常用</div>
      <div class="list">
        <div v-for="(item, index) in items" :key="index" class="item">
          <div class="national_pic">
            <img src="~static/img/china.png" alt />
          </div>
          <div class="national_name">中国</div>
          <div class="national_code">+86</div>
        </div>
      </div>
    </div>
    <div class="all national">
      <div class="title">全部</div>
      <div class="list">
        <div v-for="(item, index) in items" :key="index" class="item">
          <div class="national_pic">
            <img src="~static/img/china.png" alt />
          </div>
          <div class="national_name">中国</div>
          <div class="national_code">+86</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { name: 'xt' },
                { name: 'xt' },
                { name: 'xt' },
                { name: 'xt' },
                { name: 'xt' }
            ]
        }
    },
    mounted() {
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 34px;
    .commonly_used {
        margin-top: 31px;
    }
    .all {
        margin-top: 60px;
    }
    .national {
        width: 100%;
        height: 100%;
        // background-color: chocolate;
        .title {
            width: 100%;
            // background-color: pink;
            font-family: PingFang-SC-Regular;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
        }
        .list {
            width: 100%;
            // margin-top: 45px;
            .item {
                width: 100%;
                height: 119px;
                // line-height: 119px;
                border-bottom: 2px solid #ccc;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                // background-color: orange;
                .national_pic {
                    // background-color: #afaf;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    img {
                        width: 60px;
                        height: 39px;
                        // max-width: 100%;
                        // max-height: 100%;
                        vertical-align: middle;
                    }
                }
                .national_name {
                    // width: 60px;
                    // background-color: yellow;
                    text-align: left;
                    margin-left: 10px;
                    font-family: PingFang-SC-Bold;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #333333;
                    text-indent: 27px;
                }
                .national_code {
                    flex: 2;
                    // background-color: blue;
                    text-align: right;
                    padding-right: 20px;
                }
            }
        }
    }
}
</style>
