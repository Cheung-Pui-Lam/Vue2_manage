<template>
    <div>
        <!-- 登录信息 -->
        <!-- 登陆页面的编写 -->
        <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            class="login-container"
        >
            <h3 class="login_title">系统登陆</h3>
            <el-form-item
                label="用户名"
                label-width="80px"
                prop="username"
                class="username"
            >
                <el-input
                    type="input"
                    v-model="form.username"
                    autocomplete="off"
                    placeholder="请输入账号!"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="密码"
                label-width="80px"
                prop="password"
            >
                <el-input
                    type="password"
                    v-model="form.password"
                    autocomplete="off"
                    placeholder="请输入密码!" 
                ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item class="login_submit">
                <el-button type="primary" @click="login" class="login_submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // 引入获取界面菜单的方法
    import {getMenu} from '../../../api/data'

    export default {
        name:'login',
        data() {
            return {
                form:{

                },
                rules:{
                    username:[
                        { required: true ,message:"请输入用户名!", trigger:"blur" },
                        {
                            min: 3,
                            message:"用户名长度不能小于3位",
                            trigger:"blur"
                        }
                    ],
                    password:[
                        { required: true ,message:"请输入密码!", trigger:"blur" }
                    ]
                }
            }
        },
        methods: {
            // 登陆事件
            login(){
                // 调用登录接口api (es6解构)
                getMenu(this.form).then(({data : res})=>{
                    // console.log(res , '111' ,this.$router);
                    // 获取状态码(自己设置的20000)并判断
                    if(res.code === 20000){
                        // 首先清除路由(登陆成功)
                        this.$store.commit('clearMenu')
                        this.$store.commit('setMenu',res.data.menu)
                        this.$store.commit('setToken',res.data.token)//设置token
                        this.$store.commit('addMenu',this.$router)//动态添加路由（菜单的设置,存在刷新页面白屏[main.js中解决]）
                        this.$router.push({name:'home'})//登陆成功跳转home页面
                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
                // 调用mock随机生成token[就是一个随机数]
                // const token = Mock.random.guid()
                // this.$store.commit('setToken',token)
                // this.$router.push({name:'home'})
            }
        },
    }
</script>

<style>
    .login-container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login_submit{
        margin: 10px auto 0 auto;
    }
    .login_message{
        background-color: aqua;
    }
</style>