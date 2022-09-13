import Vue from 'vue'
import App from './App.vue'
// 引入vuex
import store from './store/index'
// 引入路由
import router from './router/index'
// 引入全局样式
import './assets/less/index.less'
// 全局引入axios
import http from 'axios'
// 全局引入mock数据
import '../api/mock.js'
// 引入elementUi(按需引入)
import {
  Button, Radio , Container ,Main ,Header ,
  Aside,Menu,MenuItem,MenuItemGroup,Submenu,
  Dropdown,DropdownItem,DropdownMenu,Row,Col,
  Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
  Tag,Form,FormItem,Input,Select,Option,Switch,DatePicker,
  Dialog,Pagination,MessageBox,Message
} from 'element-ui';
// 使用引入的样式
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

// 全局引用axios
Vue.prototype.$http = http
// 绑定$confirm方法(使用的是elementUI组件当中的 MessageBox)
Vue.prototype.$confirm = MessageBox.confirm
// 绑定$message方法(使用的是elementUI组件当中的 Message)
Vue.prototype.$message = Message

// 设置路由守卫监听用户当前页面(没有登陆或者直接请求其他页面的直接返回登录页面)
router.beforeEach((to,from,next)=>{
  // 首先获取token
  store.commit('getToken')
  // 设置判断条件token
  const token = store.state.user.token
  // 如果当前的token不存在却去往的页面不是登录页就直接返回登录页
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }
  // 如果当前的token存在且去往的页面是登录页就直接返回首页[用户在登录的情况下通过修改url的方式去往登录页]
  else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    // token存在表示登陆成功跳转下一个页面
    next()
  }
})

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    // 因为我们获取的页面是通过addMenu添加的动态路由,所以在main.js[项目的入口]中的生命周期(created)中获取动态路由即可
    store.commit('addMenu',router)//页面创建时动态添加路由（解决刷新白屏）
  },
  // 页面一挂载提示登录信息
  mounted() {
    alert(`
        管理员1的账号为:admin1 , 密码为:123456
        管理员2的账号为:admin2 , 密码为:123456 
        
        可以查看控制台获取账号密码!    
    `)
    console.log(`
        管理员1的账号为:admin1 , 密码为:123456
        管理员2的账号为:admin2 , 密码为:123456 
    `);
},
}).$mount('#app')
