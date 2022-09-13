<template>
    <el-container style="height:100%">
        <!-- 侧边栏区域 -->
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <common-header/>
            </el-header>
            <common-tag></common-tag>
            <el-main>
                <!-- 主体路由区域 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // 引入侧边栏
    import commonAside from '@/components/commonAside.vue';
    // 引入头部区域
    import commonHeader from '@/components/commonHeader.vue';
    // 引入标签
    import commonTag from '@/components/commonTag.vue'

    export default {
        name:'Home',
        // 注册组件
        components:{
            commonAside,
            commonHeader,
            commonTag
        },  
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="less" scoped>
.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0;
}
</style>