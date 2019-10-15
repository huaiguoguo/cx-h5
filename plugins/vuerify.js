import Vue from 'vue'
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next' // Vue2.0

Vue.use(Vuerify)
Vue.use(VuerifyDirective)

// , {
//     phone: ['required', { test: /^\d{11}$/, message: '11位手机号' }],
//     email: [
//         'required',
//         {
//             test: /[@gmail|@163|@126|@qq|@foxmail|@hotmail|@sina|@yahoo|@189|@tom|@aliyun|@dingtalk|@sohu|@sogou|@263|@139|@yeah|@eyou|@21cn|]/,
//             message: '此邮箱不支持'
//         }
//     ],
//     password: ['required']
// }
