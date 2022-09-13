<template>
    <div class="common-table">
        <el-table :data="tableData" height="470px" stripe>
            <el-table-column
                show-overflow-tooltip
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width ? item.width : 125"
            >
                <!-- 通过slot-scope="scope"获取当前行的数据并显示 -->
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <!-- 通过slot-scope="scope"获取当前行的数据并通过handleEdit()发送给User中的index[父组件] -->
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            class="pager"
            layout="prev,pager,next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="changePage"
            :page-size="20"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name:'commonTable',
        // 使用props来接收父组件传过来的数据
        props:{
            tableData: Array,
            tableLabel: Array,
            config: Object
        },  
        data() {
            return {
                
            }
        },
        methods: {
            // 编辑
            handleEdit(row){
                // 向父组件抛出数据
                // 将当前行的数据发送给User中的index[父组件]
                this.$emit('edit', row)
            },
            // 删除
            handleDelete(row){
                this.$emit('del', row)
            },
            // 分页器跳转函数
            changePage(page){
                this.$emit('changePage', page)
            }
        },

    }
</script>

<style lang="less" scoped>
    .common-table{
        height: calc(100%-62px);
        background-color: #fff;
        position: relative;
        .pager{
            position: absolute;
            bottom:-25px;
            right: 20px;
        }
    }
</style>