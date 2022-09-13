<template>
    <div class="tabs">
        <el-tag size="small"
                v-for="(tag,index) in tags"
                :key="tag.name"
                :closable="tag.name !== 'home'"
                :effect="$route.name === tag.name ? 'dark' : 'plain'"
                @click="changeMenu(tag)"
                @close="handleClose(tag,index)"
                >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name:'commonTag',
        data() {
            return {
                
            }
        },
        computed:{
            ...mapState({
                // 箭头函数的简写形式
                tags:state => state.tab.tabsList
            })
        },
        methods: {
            // 引入辅助方法
            ...mapMutations({
                close:'closeTag'
            }),
            // 点击相关的tag进行跳转(路由的跳转)
            changeMenu(tag){
                this.$router.push({name:tag.name})
            },
            // 删除tag(分两部分:1.点击删除vuex重点数据,2.删除tag后焦点自动往左移)
            handleClose(tag,index){
                const length = this.tags.length - 1
                // this.$store.commit('closeTag',tag)//常规的调用mutations方法
                this.close(tag)
                // 判断当前删除的tag是否为当前聚焦的tag,如果不是,删除就行
                if(tag.name !== this.$route.name){
                    // 删除即可(不需要做过多的逻辑)
                    return;
                }
                if(index === length){//判断该当前删除的tag与当前聚焦的tag为同一个
                    this.$router.push({
                        // 路由的聚焦向左移动一位
                        name:this.tags[index - 1].name
                    })
                }else{
                    this.$router.push({
                        // 路由的聚焦向右移动一位
                        name:this.tags[index].name
                    })
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .tabs{
        padding:20px;
        .el-tag{
            margin-right:15px;
            cursor: pointer;
        }
    }
</style>