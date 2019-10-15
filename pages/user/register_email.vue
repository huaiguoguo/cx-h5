<template>
  <div class="container">
    <div class="header">
      <div class="header_content">
        <div class="title">邮箱注册</div>
        <div class="select">
          <div class="item_pic">
            <img class="img" src="~static/img/china.png" />
          </div>
          <div class="item_selected">
            <select>
              <option value>中国</option>
              <option value>中国</option>
              <option value>中国</option>
              <option value>中国</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="input_item">
        <div class="item_input">
          <input type="text" class="email_mobile" placeholder="用户名(用于champion平台,不可修改)" />
        </div>
        <div class="item_icon">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="input_item">
        <div class="item_input">
          <input type="text" class="email_mobile" placeholder="邮箱地址" />
        </div>
        <div class="item_code">
          <p>获取验证码</p>
        </div>
      </div>
      <div class="input_item">
        <div class="item_input">
          <input type="password" class="password" placeholder="密码(8-20位数字和字母)" />
        </div>
        <div class="item_icon">
          <img src="~static/img/eye.png" alt />
        </div>
      </div>
      <div class="input_item">
        <div class="item_input">
          <input type="password" class="password" placeholder="请输入邀请码" />
        </div>
        <div class="item_icon"></div>
      </div>

      <div class="argeement">
        <input id="agree" type="radio" />
        <div class="description">我同意champion使用条款，隐私条款</div>
      </div>

      <div class="btn">
        <button @click="reg()">登录</button>
      </div>
    </div>
    <div class="footer">
      <p>忘记密码?</p>
    </div>
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
    data() {
        return {}
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        // this.reg()
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
        },
        reg() {
            this.$axios
                .post('login/registerByEmail', {
                    username: 'test',
                    email: '2466267555@qq.com',
                    password: '123456',
                    code: '1234',
                    yqCode: '123456'
                })
                .then(function(data) {
                    console.log(data)
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    width: 750px;
    height: 100%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .header {
        width: 100%;
        height: 100%;
        // background-color: red;
        font-size: 30px;
        .header_content {
            width: 100%;
            height: 100%;
            // background-color: yellow;
            padding-left: 20px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .title {
                margin-left: 26px;
                margin-top: 39px;
                // background-color: aquamarine;
                font-family: PingFang-SC-Medium;
                font-size: 48px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
            .select {
                width: 190px;
                height: 55px;
                line-height: 55px;
                margin-top: 67px;
                margin-left: 25px;
                // background-color: pink;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border: 0px;
                .item_pic {
                    width: 30%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 34px;
                    }
                }
                .item_selected {
                    width: 60%;
                    height: 100%;
                    // line-height: 27px;
                    font-family: PingFang-SC-Bold;
                    color: #333333;
                    margin: 0;
                    // margin-left: 17px;
                    select {
                        width: 100%;
                        border: 0px;
                        margin: 0;
                    }
                }
            }
        }
    }

    .content {
        width: 100%;
        height: 100%;
        margin-top: 78px;
        // background-color: aquamarine;\
        .input_item {
            width: 100%;
            height: 109px;
            // background-color: yellowgreen;
            // margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border: 0px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
            .item_input {
                width: 100%;
                height: 100%;
                border: 0px;
                // text-indent: 10px;
                input {
                    width: 100%;
                    height: 100%;
                    border: 0px;
                    font-family: PingFang-SC-Medium;
                    font-size: 30px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #888888;
                    padding-left: 27px;
                }
            }

            .item_icon {
                height: 90px;
                line-height: 90px;
                padding-right: 25px;
                // background-color: red;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .item_code {
                // background-color: pink;
                // width: 100%;
                width: 200px;
                height: 90px;
                line-height: 90px;
                margin-right: 24px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p {
                    // background-color: yellow;
                    width: 100%;
                    height: 29px;
                    line-height: 29px;
                    font-family: PingFang-SC-Medium;
                    font-size: 29px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #1296db;
                }
            }
        }

        .input_item:first-child .item_icon {
            max-width: 100%;
            max-height: 100%;
            padding-right: 30px;
            // background-color: yellow;
            img {
                width: 17px;
                height: 17px;
            }
        }

        .input_item:nth-child(3) {
            .item_icon {
                max-width: 100%;
                max-height: 100%;
                // background-color: #1296db;
                img {
                    width: 28px;
                    height: 15px;
                }
            }
        }

        .btn {
            width: 100%;
            height: 100%;
            margin-top: 121px;

            button {
                width: 490px;
                height: 67px;
                background-color: #1296db;
                border-radius: 10px;
                border: 0px;

                font-family: PingFang-SC-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }

        .argeement {
            width: 100%;
            height: 100%;
            // background-color: red;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            margin-top: 50px;
            input {
                width: 30px;
                height: 30px;
                border: solid 0px #888888;
            }

            .description {
                width: 90%;
                height: 100%;
                font-family: PingFang-SC-Regular;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #888888;
                text-align: left;
                text-indent: 15px;
            }
        }
    }

    .footer {
        width: 100%;
        // width: 133px;
        height: 29px;
        // background: #0070ab;
        p {
            margin-top: 34px;
            margin-right: 126px;
            text-align: right;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #0070ab;
        }
    }
}
</style>
