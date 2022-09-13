// import router from '@/router'
import Cookie from 'js-cookie'
export default {
    // 定义状态
    state:{
        // 判断是否闭合侧边栏
        isCollapse:false,
        // 面包屑数据
        tabsList:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        // 设置当前面包屑
        currentMenu:null,
        // 设置登录获取回来的menu[管理员能看到的路由页面]
        menu:[]
    },
    mutations:{
        // 是否折叠侧边栏
        collapseMenu(state){
            // 状态反转
            state.isCollapse = !state.isCollapse
        },
        // 点击菜单改变当前面包屑
        selectMenu(state,val){
            if(val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }else{
                    state.currentMenu = null
                }
            }
        },
        // 删除tag
        closeTag(state,val){
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,val){
            state.menu = val
            // 将数据缓存到cookie中并进行序列化
            Cookie.set('menu',JSON.stringify(val))
        } ,
        clearMenu(state){
            // 数据重置
            state.menu = []
            Cookie.remove('menu')
        } ,
        // 路由的动态添加
        addMenu(state,router){
            // 如果cookie中没有找到menu直接return
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item =>{
                // 判断是否存在二级菜单
                if(item.children){
                    item.children = item.children.map(item =>{
                        // 实现路由的动态切换该路由的身上必须要有动态属性
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加(使用到addRoute)
            menuArray.forEach(item=> {
                router.addRoute('Main',item)
            })
        } 
    }
}