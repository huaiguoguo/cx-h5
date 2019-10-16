export const state = () => ({
    leftNavStatus: 0,
    changeCipherEndTimestamp: 0,
    editCipherEndTimestamp: 0,
    twoLevelCipherEndTimestamp: 0,
    regEndTimestamp: 0,
    userInfo: null,
    addressSelectStatus: 0,
    tabStatus: 1
})

export const getters = () => ({
    getLeftNavStatus(state) {
        return state.leftNavStatus
    },
    userInfo(state) {
        return state.userInfo
    }
})

export const mutations = {
    setChangeCipherEndTimestamp(state, payload) {
        state.changeCipherEndTimestamp = payload
    },
    setEditCipherEndTimestamp(state, payload) {
        state.editCipherEndTimestamp = payload
    },
    setTwoLevelCipherEndTimestamp(state, payload) {
        // 设置二级密码 忘记密码时 验证码 倒计时 时间戳
        state.twoLevelCipherEndTimestamp = payload
    },
    setRegEndTimestamp(state, payload) {
        // 设置二级密码 忘记密码时 验证码 倒计时 时间戳
        state.regEndTimestamp = payload
    },
    reduceSecond(state) {
        state.endTimestamp--
    },
    login(state, payload) {
        state.userInfo = payload
    },
    logout(state) {
        state.userInfo = null
    },
    setLeftNavStatus(state, payload) {
        state.leftNavStatus = payload
    },
    setAddressSelectStatus(state, payload) {
        console.log('====================tmd')
        console.log(payload)
        console.log('====================tmdd')
        state.addressSelectStatus = payload
    },
    setTabStatus(state, payload) {
        state.tabStatus = payload
    }
}

export const actions = {
    login({ commit }, userInfo) {
        commit('login', userInfo)
    },
    logout({ commit }) {
        commit('logout')
    },
    setLeftNavStatus({ commit }, payload) {
        commit('setLeftNavStatus', payload)
    }
}

// const store = () => {
//     return new Vuex.Store({
//         state: {
//             counter: 0
//         },
//         mutations: {
//             increment(state) {
//                 state.counter++
//             }
//         },
//         plugins: [vuexLocal.plugin]
//     })
// }
// export default store
