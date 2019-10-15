<template>
    <div class="menu">
        <div class="item" @click="redirect('/home', 1)">
            <div class="icon">
                <img v-if="tabStatus===1" src="~static/img/menu/home_selected.png" />
                <img v-else src="~static/img/menu/home.png" />
            </div>
            <div :class="tabStatus===1 ? `name active` : `name`">首页</div>
        </div>

        <div class="item" @click="redirect('/home/deal',2)">
            <div class="icon">
                <img v-if="tabStatus===2" src="~static/img/menu/jy_selected.png" />
                <img v-else src="~static/img/menu/jy.png" />
            </div>
            <div :class="tabStatus===2 ? `name active` : `name`">交易</div>
        </div>

        <div class="item" @click="redirect('/home/detail',3)">
            <div class="icon">
                <img v-if="tabStatus===3" src="~static/img/menu/hq_selected.png" />
                <img v-else src="~static/img/menu/hq.png" />
            </div>
            <div :class="tabStatus===3 ? `name active` : `name`">行情</div>
        </div>

        <div class="item" @click="redirect('/home/bibi',4)">
            <div class="icon">
                <img v-if="tabStatus===4" src="~static/img/menu/bb_selected.png" />
                <img v-else src="~static/img/menu/bb.png" />
            </div>
            <div :class="tabStatus===4 ? `name active` : `name`">币币</div>
        </div>

        <div class="item" @click="redirect('/zichan/jintai',5)">
            <div class="icon">
                <img v-if="tabStatus===5" src="~static/img/menu/zichan_selected.png" />
                <img v-else src="~static/img/menu/zichan.png" />
            </div>
            <div :class="tabStatus===5 ? `name active` : `name`">资产</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            tabStatus: 1
        }
    },
    computed: {},
    created() {
        const currentPath = this.$route.path
        if (currentPath === '/home') {
            this.tabStatus = 1
        } else if (currentPath === '/home/deal') {
            this.tabStatus = 2
        } else if (currentPath === '/home/detail') {
            this.tabStatus = 3
        } else if (currentPath === '/home/bibi') {
            this.tabStatus = 4
        } else if (currentPath === '/zichan/jintai') {
            this.tabStatus = 5
        }
    },
    mounted() {},
    methods: {
        redirect(url, type) {
            this.tabStatus = type
            this.$router.push(url)
        }
    }
}
</script>

<style lang="less" scoped>
.menu {
    width: 100%;
    // height: 98px;
    background-color: white;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    font-family: PingFang-SC-Medium;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #9c9c9c;
    position: fixed;
    bottom: 0;
    // box-shadow: 0px -0.5px 10px pink;
    box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.35);
    padding-top: 10px;
    padding-bottom: 5px;
    .item {
        width: 75px;
        height: 98px;
        // background-color: blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon {
            width: 44px;
            height: 41px;
            // background-color: #9c9c9c;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .name {
            // width: 45px;
            // height: 23px;
            // background-color: orange;
            margin-top: 5px;
            font-family: PingFang-SC-Medium;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #9c9c9c;
        }
        .active {
            color: #3e4de4;
        }
    }
    a {
        text-align: center;
    }
    .item:last-child .icon {
        // width: 69px;
        height: 49px;
        text-align: center;
        // background-color: red;
    }
}
</style>
