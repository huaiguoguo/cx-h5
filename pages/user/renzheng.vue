<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back.png" />
        <!-- ">>" -->
      </div>
      <div class="pageName">实名认证</div>
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt />
      </div>
      <!-- <a href="/user/login">登录页</a>· -->
    </div>
    <div class="space-div"></div>
    <div class="info-list">
      <div class="info-item">
        <div class="item-left-input">
          <span>真实姓名</span>
          <input v-model="formData.name" type="text" name="name" placeholder="(请填写本人真实姓名)" />
        </div>
        <div class="item-right-img" @click="formData.name = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>身份证号</span>
          <input v-model="formData.idCardNo" type="text" name="idCardNo" placeholder="(请填写本人身份证号)" />
        </div>
        <div class="item-right-img" @click="formData.idCardNo = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>银行卡号</span>
          <input v-model="formData.bankNo" type="text" name="bankNo" placeholder="(请选填写本人真实姓名办理的银行卡号)" />
        </div>
        <div class="item-right-img" @click="formData.bankNo = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>开户银行</span>
          <input v-model="formData.bankName" type="text" name="bankName" placeholder="(请选填写银行卡开户银行,比如交通银行)" />
        </div>
        <div class="item-right-img" @click="formData.bankName = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>开户支行</span>
          <input v-model="formData.bankName2" type="text" name="bankName2" placeholder="(请选填写开户支行,比如北环路支行)" />
        </div>
        <div class="item-right-img" @click="formData.bankName2 = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>支付宝账号</span>
          <input v-model="formData.alipayNo" type="text" name="alipayNo" placeholder="(请选填写本人支付宝账号并上传收款码)" />
        </div>
        <div class="item-right-img" @click="formData.alipayNo = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>微信号</span>
          <input v-model="formData.wechatNo" type="text" name="wechatNo" placeholder="(请选选填写本人微信收款码)" />
        </div>
        <div class="item-right-img" @click="formData.wechatNo = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
      <div class="info-item">
        <div class="item-left-input">
          <span>USDT</span>
          <input v-model="formData.usdtAddress" type="text" name="usdtAddress" placeholder="(请选填写本人usdt链接并上传二维码)" />
        </div>
        <div class="item-right-img" @click="formData.usdtAddress = ''">
          <img src="~static/img/error.png" alt />
        </div>
      </div>
    </div>
    <div class="upload">
      <div class="upload1">
        <img :src="thumbnailAlipay" />
        <input type="file" accept="image/*" mutiple="mutiple" name="alipay" class="alipaycode" @change="uploadChange($event, 1)" />
        <p>上传支付宝收款码</p>
      </div>
      <div class="upload1">
        <img :src="thumbnailWechat" />
        <input type="file" accept="image/*" mutiple="mutiple" name="wechat" class="alipaycode" @change="uploadChange($event, 2)" />
        <p>上传微信的收款码</p>
      </div>
      <div class="upload1">
        <img :src="thumbnailUstd" />
        <input type="file" accept="image/*" mutiple="mutiple" name="file" class="alipaycode" @change="uploadChange($event, 3)" />
        <p>上传usdt的二维码</p>
      </div>
    </div>
    <div class="btn-submit" @click="submit">
      <span>提交审核</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            marginTopObject: '',
            formData: {
                name: '',
                idCardNo: '',
                bankNo: '',
                bankName: '',
                bankName2: '',
                alipayNo: '',
                wechatNo: '',
                usdtAddress: '',
                alipayErWerMa: '',
                wechatErWeiMa: '',
                usdtErWeiMa: ''
            },
            thumbnailAlipay: require('../../static/img/upload.png'),
            thumbnailWechat: require('../../static/img/upload.png'),
            thumbnailUstd: require('../../static/img/upload.png'),
            imgData: { accept: 'image/jpeg, image/png, image/jpg' },
            uploadAlbumApi: 'user/uploadAlbumApi',
            progress: 0
        }
    },
    computed: {
        ...mapState('user', {
            userInfo: 'userInfo'
        })
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.isIPhoneX()
        if (!this.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            _this.$router.push('/user/login')
            return false
        }
        console.log(this.userInfo)
        this.huixian()
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
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
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
        uploadChange(event, type) {
            console.log(type)
            const _this = this
            const file = event.target.files[0]
            const fileType = file.type
            const fileSize = file.size

            if (this.imgData.accept.includes(fileType) === -1) {
                this.$toast.center('支持上传的格式不对')
                return false
            }
            if (fileSize > 5 * 1024 * 1024) {
                this.$toast.center('最大5M')
                return false
            }

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function(res) {
                // console.log(this)
                _this.thumbnail = this.result
            }

            let formData = new FormData()
            formData.append('file', file)
            const options = {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: false,
                onUploadProgress: (progressEvent) => {
                    const complete = progressEvent.loaded / progressEvent.total
                    console.log(complete) // complete是一个变化的值，最大100上传完成
                    this.progress = (complete * 100) | 0 // 赋值，进度条变化，通过值或者其他事件还可以用showp使得进度条是否隐藏
                }
            }
            this.$toast.center('正在上传...')
            this.$axios
                .post(this.uploadAlbumApi, formData, options)
                .then((res) => {
                    console.log(res)
                    this.$toast.center(res.data.msg)
                    if (res.data.status === 1) {
                        this.$toast.center('上传成功')
                        this.setFormdataImg(type, res.data.data.src)
                    } else {
                        this.$toast.center('上传失败')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        setFormdataImg(type, url) {
            if (type === 1) {
                this.formData.alipayErWerMa = url
                this.thumbnailAlipay = url
            } else if (type === 2) {
                this.formData.wechatErWeiMa = url
                this.thumbnailWechat = url
            } else if (type === 3) {
                this.formData.usdtErWeiMa = url
                this.thumbnailUstd = url
            }
        },
        checkFormData() {
            const formData = this.formData
            if (!formData.name) {
                this.$toast.center('真实姓名必填!')
                return false
            }

            if (!formData.idCardNo) {
                this.$toast.center('身份证号必填!')
                return false
            }

            if (!(formData.bankNo || formData.alipayNo || formData.wechatNo || formData.usdtAddress)) {
                this.$toast.center('银行卡号/支付宝/微信/ustd至少填写一项!')
                return false
            }
            if (formData.bankNo && !formData.bankName) {
                this.$toast.center('开户行必须填写!')
                return false
            }
            return true
        },
        async submit() {
            // 提交审核
            if (!this.checkFormData()) {
                console.log(this.formData)
                return false
            }
            this.$toast.center('正在提交...')
            await this.$axios
                .post('user/submitShiMing', this.formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.$toast.center('提交成功')
                    } else {
                        this.$toast.center(res.data.msg)
                    }
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
                })
        },
        // 获取之前填写的内容
        async huixian() {
            const _this = this
            await this.$axios
                .post('user/getShiMing', {
                    username: _this.userInfo.openid
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        this.formData = res.data.data
                        if (this.formData.alipayErWerMa) {
                            this.thumbnailAlipay = this.formData.alipayErWerMa
                        }
                        if (this.formData.wechatErWeiMa) {
                            this.thumbnailWechat = this.formData.wechatErWeiMa
                        }
                        if (this.formData.usdtErWeiMa) {
                            this.thumbnailUstd = this.formData.usdtErWeiMa
                        }
                    } else {
                        this.formData.name = ''
                        this.formData.idCardNo = ''
                    }
                })
                .catch(function(error) {
                    console.log('error================')
                    console.log(error)
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
.container {
    .upload {
        display: flex;
        p {
            color: #999;
        }
        .upload1 {
            width: 130px;
            height: 130px;
            position: relative;
            margin: 30px;
            img {
                width: 130px;
                height: 130px;
                position: absolute;
            }
            .alipaycode {
                display: block;
                width: 130px;
                height: 130px;
                opacity: 0;
            }
        }
    }
    body {
        box-sizing: border-box;
    }
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    // text-align: center;
    font-size: 20px;
    // background: red;
    a {
        font-size: 25px;
        color: red;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // height: 88px;
        // line-height: 88px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        box-shadow: 0px 20px 30px -10px rgba(51, 51, 51, 0.1);
        padding: 45px 20px 20px 20px;
        .goback {
            width: 16px;
            // height: 32px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .avatar {
            width: 55px;
        }
        .pageName {
            margin-left: 16px;
        }
    }
    .space-div {
        width: 100%;
        height: 16px;
    }
    .info-list {
        padding: 0px 20px;
        .info-item {
            display: flex;
            justify-content: space-between;
            height: 95px;
            line-height: 95px;
            font-size: 24px;
            color: #999;
            border-bottom: 1px solid #e8e8e8;
            color: #666;
            .item-left-input{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                // background: blue;
                span{
                    flex: 1.3;
                    // background: #000;
                    text-align: left;
                    font-size: 24px;
                }
                input {
                    flex: 4;
                    // background: pink;
                    width: 500px;
                    margin-left: 10px;
                    font-size: 24px;
                    caret-color: #1296db;
                }
            }
            .item-right-img {
                width: 17px;
                height: 17px;
                img {
                    max-width: 100%;
                    max-width: 100%;
                }
            }
        }
    }

    .btn-submit {
        margin: 140px auto 0 auto;
        width: 440px;
        height: 60px;
        line-height: 60px;
        background-color: #1296db;
        color: #fff;
        text-align: center;
        span {
            width: 118px;
            height: 29px;
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }
    }
}
</style>
