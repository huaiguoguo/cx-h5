import Vue from 'vue'
import VueTouch from 'vue-touch'

Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
    threshold: 100 // 手指左右滑动距离
}
