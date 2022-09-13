import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        // 引入关闭侧边栏模块
        tab,
        // 引入用户登录token模块
        user,
    }
})