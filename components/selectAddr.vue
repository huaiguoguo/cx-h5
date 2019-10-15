<template>
  <div class="addr">
    <!--居住地址三级联动选项-->
    <section v-if="addressSelectStatus" class="showChose">
      <section class="address">
        <section class="title">
          <h4>收货地址</h4>
          <span @click="closeAdd">×</span>
        </section>
        <section class="title">
          <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
          <div class="area" :class="City?'':'active'" @click="citySelected()">{{City?City:'请选择'}}</div>
          <div v-show="City" class="area" :class="District?'':'active'" @click="districtSelected()">{{District?District:'请选择'}}</div>
        </section>
        <ul>
          <li v-for="(provinceItem,proviceIndex) in info" v-show="showProvince" Number:key="proviceIndex" class="addList" :class="provinceItem.selected ? 'active' : ''" @click="getProvinceId(provinceItem.id, provinceItem.name, proviceIndex)">{{provinceItem.name}}</li>

          <li v-for="(cityItem, cityIndex) in showCityList" v-show="showCity" Number:key="cityIndex" class="addList" :class="cityItem.selected ? 'active' : ''" @click="getCityId(cityItem.id, cityItem.name, cityIndex)">{{cityItem.name}}</li>

          <li v-for="(districtItem,districtIndex) in showDistrictList" v-show="showDistrict" Number:key="districtIndex" class="addList" :class="districtItem.selected ? 'active' : ''" @click="getDistrictId(districtItem.id, districtItem.name, districtIndex)">{{districtItem.name}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import addrData from '../assets/common/addr.js'
export default {
    name: 'MyAddress',
    data() {
        return {
            showChose: 0,
            showProvince: true,
            showCity: false,
            showDistrict: false,
            showCityList: false,
            showDistrictList: false,
            province: 5,
            city: 3,
            district: 57,
            GetProvinceId: 2,
            District: false,
            Province: false,
            City: false,
            // v-for循环判断是否为当前
            selected: false,
            info: addrData,
            provinceName: '',
            cityIdName: '',
            disName: ''
        }
    },
    computed: {
        ...mapState('user', {
            userInfo: 'userInfo',
            addressSelectStatus: 'addressSelectStatus'
        })
    },
    methods: {
        closeAdd() {
            this.$emit('ParentChange', 0)
        },
        sendParent() {
            const data = {
                provinceName: this.provinceName,
                cityName: this.cityName,
                disName: this.disName
            }
            this.$emit('GetData', data)
        },
        _filter(province, name, id) {
            let result = []
            for (let i = 0; i < province.length; i++) {
                if (id === province[i].id) {
                    result = province[i][name]
                    break
                }
            }
            return result
        },
        getProvinceId(code, input, index) {
            this.provinceName = input
            this.province = code
            this.Province = input
            this.showProvince = false
            this.showCity = true
            this.showDistrict = false
            this.showCityList = this._filter(this.info, 'city', this.province)
            // 点击选择当前
            this.info.map((a) => (a.selected = false))
            this.info[index].selected = true
        },
        provinceSelected() {
            // 清除市级和区级列表
            this.showCityList = false
            this.showDistrictList = false
            // 清除市级和区级选项
            this.City = false
            this.District = false
            // 选项页面的切换
            this.showProvince = true
            this.showCity = false
            this.showDistrict = false
        },
        getCityId(code, input, index) {
            this.cityName = input
            this.city = code
            this.City = input
            this.showProvince = false
            this.showCity = false
            this.showDistrict = true
            this.showDistrictList = this._filter(
                this.showCityList,
                'district',
                this.city
            )
            // 选择当前添加active
            this.showCityList.map((a) => (a.selected = false))
            this.showCityList[index].selected = true
        },
        citySelected() {
            this.showProvince = false
            this.showCity = true
            this.showDistrict = false
        },
        getDistrictId(code, input, index) {
            this.disName = input
            this.district = code
            this.District = input
            // 选择当前添加active
            this.showDistrictList.map((a) => (a.selected = false))
            this.showDistrictList[index].selected = true
            // 选取市区选项之后关闭弹层
            this.showChose = false
            this.sendParent()
            this.$emit('ParentChange', 0)
        },
        districtSelected() {
            this.showProvince = false
            this.showCity = false
            this.showDistrict = true
        }
    }
}
</script>
<style lang="less" scoped>
.myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
}
.myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
}
.myAddress .cont span {
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
}
.myAddress .cont section {
    float: left;
}
.myAddress .cont p {
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
}
.myAddress .cont .pic2 {
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
}
.myAddress .cont p.text {
    margin-left: 0.72rem;
}
.showChose {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    background: rgba(77, 82, 113, 0.8);
}
.address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
}
.title h4 {
    display: inline-block;
    margin-left: 3.2rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    font-weight: normal;
    color: #999;
}
.title span {
    margin: 0.42rem 0 0 2.2rem;
    font-size: 0.45rem;
    line-height: 0.34rem;
    color: #d8d8d8;
}
.area {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.88rem;
    margin-left: 0.42rem;
    color: #333;
}
.addList {
    width: 100%;
    padding-left: 0.32rem;
    font-size: 0.34rem;
    line-height: 0.88rem;
    color: #333;
}
/* 修改的格式 */
.address ul {
    width: 95%;
    height: 100%;
    max-height: 4.4rem;
    overflow: auto;
}
.address ul li {
    margin-left: 5%;
}
.address .title .active {
    color: #0071b8;
    border-bottom: 0.02rem solid #0071b8;
}
.address ul .active {
    color: #0071b8;
}
</style>
