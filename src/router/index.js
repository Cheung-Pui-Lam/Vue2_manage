// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入路由组件
import Home from '../views/home/index.vue'

// 使用路由插件
Vue.use(VueRouter)

const routes = [
    {
        // 初始化根路径
        path:'/',
        name:'Main',
        component: ()=> import('../views/Main.vue'),
        redirect:'/home',//重定向,默认显示home页面
        children:[
            // {
            //     name:'home',
            //     path:'/home',
            //     component:()=>import('../views/home')
            // },
            // {
            //     name:'user',
            //     path:'/user',
            //     component:()=>import('../views/User') 
            // },
            // {
            //     name:'mall',
            //     path:'/mall',
            //     component:()=>import('../views/mall') 
            // },
            // {
            //     name:'page1',
            //     path:'/page1',
            //     component:()=>import('../views/other/pageOne.vue') 
            // },
            // {
            //     name:'page2',
            //     path:'/page2',
            //     component:()=>import('../views/other/pageTwo.vue') 
            // },
        ]
    },
    // 登录页面
    {
        path:'/login',
        name:'login',
        component:()=> import('../views/Login/login.vue')
    }
]

// 实例化路由器(管理路由)
const router = new VueRouter({
    // 设置路由模式
    mode:'history',
    // 传入routes
    routes
})

// 暴露路由器
export default router