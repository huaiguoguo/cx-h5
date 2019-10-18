<template>
  <div class="container">
    <div class="header" :style="marginTopObject">
      <div class="goback" @click="$router.go(-1)">
        <img src="~static/img/back.png" />
        <!-- ">>" -->
      </div>
      <div class="pageName">收货地址</div>
      <!-- <a href="/user/login">登录页</a>· -->
      <div class="avatar" @click="ShowLeftNav">
        <img src="~static/img/left_nav_switch.png" alt="">
      </div>
    </div>
    <div class="space-div"></div>

    <div class="info-item">
      <div class="space-div"></div>
      <div class="info-list">
        <div class="info-item">
          <div>
            收货人
            <input ref="name" v-model="formData.name" type="text" name="recipients" />
          </div>
        </div>
        <div class="info-item">
          <div>
            手机号码
            <input ref="phone" v-model="formData.phone" type="text" name="mobile" />
          </div>
        </div>
        <div class="info-item">
          <div class="label">
            所在地区
            <!-- <input ref="address1" v-model="formData.address1" type="text" name="address" /> -->
          </div>
          <!-- <p style="width:100px; position: absolute; margin-left:40px;">{{formData.addressstr}}</p> -->
          <div class="selectCity" @click="changeAddressSelectStatus(1)">{{formData.address1}}</div>
          <select-addr ref="address" class="selectAddr" @ParentChange="changeAddressSelectStatus" @GetData="GetChildData"></select-addr>
        </div>
        <div class="info-item">
          <div>
            <textarea id="xsaddress" ref="address2" v-model="formData.address2" placeholder="详细地址： 如道路，门牌号，小区，楼栋号，单元室等" name="xsaddress" cols="45" rows="2"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="empty"></div>
    <div class="btn-submit" @click="submit()">
      <span>保存</span>
    </div>
  </div>
</template>

<script>
import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import SelectAddr from '../../components/selectAddr'
import Provinces from '~/static/js/Provinces.js'
// import 'antd/dist/antd.css'
export default {
    components: { SelectAddr },
    data() {
        return {
            marginTopObject: '',
            formData: {
                name: '',
                phone: '',
                address1: '',
                address2: '',
                username: this.$store.state.user.userInfo.openid,
                sessionKey: this.$store.state.user.userInfo.sessionKey,
                addressstr: ''
            },
            // options: Provinces.tmbTmbsContent[0]
            // options: null
            citys: {}
            //
            // value: ''
            // children: [
            //     {
            //         value: '',
            //         children: [
            //             {
            //                 value: ''
            //             }
            //         ]
            //     }
            // ]
            // }

            // options: [{
            //     value: 'zhejiang',
            //     label: 'Zhejiang',
            //     children: [{
            //         value: 'hangzhou',
            //         label: 'Hangzhou',
            //         children: [{
            //             value: 'xihu',
            //             label: 'West Lake'
            //         }]
            //     }]
            // }, {
            //     value: 'jiangsu',
            //     label: 'Jiangsu',
            //     children: [{
            //         value: 'nanjing',
            //         label: 'Nanjing',
            //         children: [{
            //             value: 'zhonghuamen',
            //             label: 'Zhong Hua Men'
            //         }]
            //     }]
            // }]
        }
    },
    vuerify: {
        'formData.name': {
            test: /\S+/,
            message: '请输入收货人'
        },
        'formData.phone': {
            test(val) {
                const mobile_patter = /^1(3|4|5|6|7|8|9)\d{9}$/
                this.loginTypeText = ''
                if (mobile_patter.test(val)) {
                    this.registerType = 1
                    this.loginTypeText = '手机'
                    return true
                }
                return false
            },
            message: '请输入正确的手机号码'
        },
        'formData.address1': {
            test: /\S+/,
            message: '请选择省市'
        },
        'formData.address2': {
            test: /\S+/,
            message: '请输入详细地址'
        }
    },
    computed: {
        errors() {
            return this.$vuerify.$errors
        }
    },
    mounted() {
        this.huixian()
        this.isIPhoneX()
        if (!this.$store.state.user.userInfo) {
            const _this = this
            this.$toast.center('请登录')
            _this.$router.push('/user/login')
            return false
        }
        this.$message.config({
            top: `300px`,
            duration: 2,
            maxCount: 1
        })
        this.test()
        // Provinces.map(element => {
        //     console.log(element)
        // })
        const data = Provinces.tmbTmbsContent

        const optionss = []
        data.forEach((element) => {
            element.forEach((ele) => {
                // console.log(ele)

                // console.log(provinces, cities, areas)
                console.log(provinces)
                this.options = provinces

                areas.forEach((area) => {
                    const matchCity = cities.filter(
                        (city) => city.code === area.cityCode
                    )[0]
                    if (matchCity) {
                        matchCity.children = matchCity.children || []
                        matchCity.children.push({
                            label: area.name,
                            value: area.code
                        })
                    }
                })

                cities.forEach((city) => {
                    const matchProvince = provinces.filter(
                        (province) => province.code === city.provinceCode
                    )[0]
                    if (matchProvince) {
                        matchProvince.children = matchProvince.children || []
                        matchProvince.children.push({
                            label: city.name,
                            value: city.code,
                            children: city.children
                        })
                    }
                })

                this.options = provinces.map((province) => ({
                    label: province.name,
                    value: province.code,
                    children: province.children
                }))
                // console.log(this.options)

                // for (const i in ele) {
                //     // console.log(ele[i].value) // 市
                //     const sheng = ele[i].children
                //     const sheng2 = ele[i]
                //     // console.log(ele[i].value) // 省名
                //     optionss.push(sheng2)
                //     let index = 0
                //     for (const i2 in sheng) {
                //         index++
                //         // console.log(sheng[i2]) // 市名
                //         // console.log(optionss[index])
                //         // console.log(optionss[index].children)
                //         // // console.log(this.options[0])
                //         // const shi = sheng[i2].children
                //         // // console.log(shi) // 区对象
                //         // for (const i3 in shi) {
                //         //     // console.log(shi[i3]) 最终区名
                //         //     // this.options.children.children.value = shi[i3]
                //         //     // console.log(this.options)
                //         // }
                //     }
                // }
                // ele.forEach(ele2 => {
                //     console.log(ele2)
                // })
            })
        })

        // data.forEach((element) => {
        //     element.forEach((ele) => {
        //         // console.log(ele)
        //         const index = 0
        //         for (const i in ele) {
        //             // index++
        //             // console.log(ele[i].value) // 市
        //             const sheng = ele[i].children
        //             // console.log(ele[i].value) // 省名
        //             optionss.push(ele[i])
        //             // console.log(sheng)
        //             for (const i2 in sheng) {
        //                 console.log(sheng[i2].value) // 市名

        //                 // // console.log(this.options[0])
        //                 // const shi = sheng[i2].children
        //                 // // console.log(shi) // 区对象
        //                 // for (const i3 in shi) {
        //                 //     // console.log(shi[i3]) 最终区名
        //                 //     // this.options.children.children.value = shi[i3]
        //                 //     // console.log(this.options)
        //                 // }
        //             }
        //         }
        //         // ele.forEach(ele2 => {
        //         //     console.log(ele2)
        //         // })
        //     })
        // })
        // console.log(optionss)
        // console.log(this.options)
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
                this.marginTopObject = 'margin-top: 0.83rem;'
                this.float_cardStyle = 'top: 100px;'
            }
        },
        changeAddressSelectStatus(payload) {
            console.log(payload)
            this.$store.commit('user/setAddressSelectStatus', payload)
        },
        GetChildData(payload) {
            console.log('==========子组件数据')
            console.log(payload)
            this.citys = payload
            this.formData.address1 = this.citys.provinceName + ' / ' + this.citys.cityName + ' / ' + this.citys.disName
            this.formData.addressstr = this.formData.address1
        },
        ShowLeftNav() {
            const leftNavStatus = this.leftNavStatus === 0 ? 1 : 0
            this.$store.commit('user/setLeftNavStatus', 1)
        },
        onChange(value) {
            console.log(value)
        },
        test() {
            const userifo = this.$store.state.user.userInfo
            console.log(userifo)
            // eslint-disable-next-line eqeqeq
            if (userifo == null) {
                this.$toast.center('暂未登录')
                return false
            }
        },
        verify() {
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check()) {
                console.log(this.errors)

                return false
            }
            return true
        },
        async submit() {
            if (!this.verify()) {
                const errors = this.errors.__ob__.value
                console.log(errors)
                for (const key in errors) {
                    this.$toast.center(errors[key])
                }
                return false
            }

            console.log(this.formData)
            await this.$axios
                .post('user/saveAddress', this.formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.$toast.center('保存成功')
                    } else {
                        this.$toast.center(res.data.msg)
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        // 获取之前填写的内容
        async huixian() {
            const _this = this
            await this.$axios
                .post('user/getAddress', {
                    // username: _this.userInfo.openid
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        this.formData.name = res.data.data.name
                        this.formData.phone = res.data.data.phone
                        this.formData.address1 = res.data.data.address1
                        this.formData.address2 = res.data.data.address2
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

<style lang="less" scoped>
.selectAddr {
    width: 200px;
    height: 100%;
}
// :global {

//     .ant-cascader-menus {
//         .ant-cascader-menus-content {
//             .ant-cascader-menu{
//                 display: flex !important;
//                 flex-direction: column !important;
//             }
//         }
//     }
// }
.ant-cascader-menus-content .ant-cascader-menu:only-child {
    display: flex;
    flex-direction: column;
}

.body ul {
    display: flex;
    flex-direction: column;
}
.ant-cascader-picker {
    display: block;
}
.selectCity {
    width: 500px;
    margin-left: 10px;
    // background-color: pink;
}
input {
    outline: none;
    border: none;
}
textarea {
    outline: none;
    border: none;
}
.container {
    body {
        box-sizing: border-box;
        font-size: 0.4rem;
    }
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    // text-align: center;
    font-size: 0.4rem;
    // background: red;
    a {
        font-size: 0.4rem;
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
        // box-shadow: 0px 50px 100px -30px rgba(0, 0, 0, 0.13);
        padding: 45px 20px 0px 20px;
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
        padding: 20px;
        .info-item {
            display: flex;

            justify-content: space-between;
            height: 95px;
            line-height: 95px;
            color: #999;
            border-bottom: 1px solid #e8e8e8;
            color: #666;
            .label {
                width: 200px;
                // background-color: #000;
            }
            input {
                width: 500px;
                text-indent: 35px;
                margin-left: 10px;
                font-size: 0.4rem;
                caret-color: #1296db;
            }
            .item-right-img {
                width: 17px;
                height: 17px;
                img {
                    max-width: 100%;
                    max-width: 100%;
                }
            }
            #xsaddress {
                height: 145px;
                line-height: 40px;
                padding: 35px 0;
                font-size: 0.4rem;
            }
        }
        .info-item:last-child {
            height: auto;
            border-bottom: none;
        }
    }
    .empty {
        width: 100%;
        height: 35px;
        background: #f4f4f4;
    }
    .btn-submit {
        margin: 100px auto 0 auto;
        width: 300px;
        height: 59px;
        line-height: 59px;
        background-color: #09c48d;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        span {
            width: 118px;
            height: 29px;
            font-family: PingFang-SC-Medium;
            font-size: 0.4rem;
            color: #ffffff;
        }
    }
}
</style>
