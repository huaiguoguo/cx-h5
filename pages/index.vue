<template>
  <div class="container" style="display:none">
    <h2>这是导航页面</h2>
    <!-- <a href="/user/login">登录页</a>
    <a href="/user/register">注册页面</a>
    <a href="/user/register_email">邮箱注册页面</a>
    <a href="/user/country">国家选择页面</a>
    <a href="/user/changepwd">更改密码</a>
    <a href="/user/changepwd2">更改密码2</a>
    <a href="/user/renzheng">认证页面</a>
    <a href="/user/myBalance">我的余额</a>
    <a href="/user/address">收货地址</a>
    <a href="/user/tixian">提现</a>
    <a href="/user/tixianSuccess">提现成功</a>
    <a href="/user/cash_log">提现记录</a>
    <a href="/user/order-wait">订单记录</a>
    <br />
    <br />
    <br />
    <br />
    <h3>以下是首页相关页面</h3>
    <a href="/home">首页</a>
    <a href="/home/detail">行情页面</a>
    <a href="/home/bibi">币币</a>
    <a href="/home/deal">交易</a>
    <a href="/home/shop-xq">商品详情</a>
    <a href="/home/notice">公告</a>
    <a href="/home/InvitationCode">邀请码</a>
    <a href="/home/mytuandui">我的团队</a>
    <h3>以下是资产相关页面</h3>
    <a href="/zichan/myteam">资产</a>
    <a href="/zichan/selfEarnings">静态收益</a>
    <a href="/zichan/teamEarnings">动态收益</a> -->
  </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.$router.push('/home')
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
.container {
    width: 100%;
    height: 100%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    text-align: center;
    font-size: 25px;
    a {
        font-size: 25px;
        color: red;
    }
}
</style>
