import Qs from 'qs'

export default function({ store, $axios, redirect }) {
    // $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.onRequest((config) => {
        let assmbly
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            assmbly = AssemblyData(1, config)
        } else {
            assmbly = AssemblyData(2, config)
        }
        config = assmbly
    })

    function AssemblyData(type, config) {
        const userInfo = store.state.user.userInfo
        if (userInfo) {
            if (type === 1) {
                config.data.append('username', userInfo.openid)
                config.data.append('sessionKey', userInfo.sessionKey)
            }
            if (type === 2) {
                config.data = config.data ? config.data : {}
                Object.assign(config.data, {
                    sessionKey: userInfo.sessionKey,
                    username: userInfo.openid
                })
                config.data = Qs.stringify(config.data)
            }
        } else {
            config.data = Qs.stringify(config.data)
        }
        return config
    }

    $axios.onRequestError((error) => {
        console.log('这是onRequestError函数返回的error')
        console.log(error)
    })

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })

    $axios.onResponseError((error) => {
        console.log('这是onResponseError函数返回的error')
        console.log(error)
    })

    // $axios.setHeader(
    //     'x-powered-by',
    //     'hi girl/boy, please contact me If you encounter problems :crazywork@foxmail.com'
    // )

    // Adds header: `Authorization: 123` to all requests
    // $axios.setHeader('Authorization', '123')

    // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
    // $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    //     'post'
    // ])

    // Removes default Content-Type header from `post` scope
    // $axios.setHeader('Content-Type', false, ['post'])

    // Adds header: `Authorization: 123` to all requests
    $axios.setToken('123')

    // Adds header: `Authorization: Bearer 123` to all requests
    $axios.setToken('123asdf', 'Bearer')

    // Adds header: `Authorization: Bearer 123` to only post and delete requests
    // $axios.setToken('123abcdef', 'Bearer', ['post', 'delete'])

    // Removes default Authorization header from `common` scope (all requests)
    $axios.setToken(false)
}
