<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!-- 面包屑 -->
            <!-- <h3 style="color:#fff">首页</h3> -->
            <el-breadcrumb separator="/" class="myColor">
                <el-breadcrumb-item 
                    v-for="item in tags"
                    :key="item.path"
                    :to="{ path: item.path }"
                    >{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" szie="mini">
                <span>
                    <img :src="userImg" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toBlog('https://cheung-pui-lam.github.io/')">跳转博客</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    // 引入vuex中的辅助方法
    import { mapState } from 'vuex'
    export default {
        name:'CommonHeader',
        data() {
            return {
                // 引入图片
                userImg:require('../assets/images/user.png')
            }
        },
        methods:{
            // 改变侧边栏的折叠信息
            handleMenu(){
                this.$store.commit('collapseMenu')
            },
            // 登出功能的实现
            logOut(){
                // 清除token,清除菜单,回退登陆页面
                this.$store.commit('clearToken')
                this.$store.commit('clearMenu')
                this.$router.push("/login")
            },
            // 跳转博主的博客
            toBlog(url) {
                // console.log(url);
                window.open(url,"_blank")
            }
        },
        computed:{
            ...mapState({
                tags: state => state.tab.tabsList
            })
        }
    }
</script>

<style lang="less" scoped>
    // 只用flex布局来配置header两边分开
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;

        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    // 面包屑颜色问题
    .myColor /deep/ .el-breadcrumb__inner {
        color:#fdd;
    }
</style>