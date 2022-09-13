// 存放用户凭证[token]
// 安装并引入依赖第三方库:js-cookie
import Cookie from 'js-cookie'

export default{
    state:{
        // 存放token
        token:''
    },
    mutations:{
        // 设置token
        setToken( state , val){
            state.token = val
            Cookie.set('token',val)
        },
        // 清除token
        clearToken( state ){
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
    }
}