import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)

Vue.directive('isIphoneX', {
    bind(el, binding) {
        const _local = 'ios'
        let isIphoneX = false
        if (_local === 'ios' && window.screen.height) {
            isIphoneX = window.screen.height > 750
        }
        if (isIphoneX) {
            if (binding.value === 'margin') {
                console.log('use margin')
                el.setAttribute('style', 'margin-bottom: 8vw !important;')
            } else if (binding.value === 'height') {
                console.log('use height')
                el.setAttribute(
                    'style',
                    ` padding-bottom: 15vh !important;min-height: 85vh !important;`
                )
            } else {
                console.log('use padding')
                el.setAttribute('style', 'padding-bottom: 8vw !important;')
            }
        } else if (binding.value === 'height') {
            el.setAttribute(
                'style',
                ` padding-bottom: 11vh !important;min-height: 89vh !important;`
            )
        }
    },
    update(el, binding) {}
})
