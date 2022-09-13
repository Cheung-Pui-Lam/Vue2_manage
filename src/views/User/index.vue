<template>
    <div class="manage">
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="isShow"
        >
            <common-form
                :formLabel="opertateFormLabel"
                :form="opertateForm"
                :inline="true"
                ref="form"
            ></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form
                :formLabel="formLabel"
                :form="searchForm"
                :inline="true"
                ref="form"
            >
                <!-- 搜索获取关键字(searchForm表单中的keyword) -->
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table 
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editUser"
            @del="delUser"
        ></common-table>
    </div>
</template>

<script>
    // 引入Form组件 Table组件 api->getUser(获取mock中的用户数据)
    import commonForm from '../../components/commonForm.vue'
    import commonTable from '@/components/commonTable.vue'
    import {getUser} from '../../../api/data'

    export default {
        name:'User',
        components:{commonForm,commonTable},
        data() {
            return {
                operateType:'add',
                isShow:false,
                opertateFormLabel: [
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],
                opertateForm:{
                    name:'',
                    addr:'',
                    age:'',
                    birth:'',
                    sex:''
                },
                formLabel:[
                    {
                        model:"keyword",
                        label:'',
                        type:'input'
                    }
                ],
                searchForm:{
                    keyword:''
                },
                tableData:[],
                tableLabel:[
                    {
                        prop:"name",
                        label:"姓名",
                    },
                    {
                        prop:"age",
                        label:"年龄",
                    },
                    {
                        prop:"sexLabel",
                        label:"性别",
                    },
                    {
                        prop:"birth",
                        label:"出生日期",
                        width:200,
                    },
                    {
                        prop:"addr",
                        label:"地址",
                        width:320,
                    },
                ],
                config:{
                    page:1,
                    total:30
                }
            }
        },
        methods: {
            confirm(){
                // 点击更新用户
                if(this.operateType === 'edit'){
                    this.$http.post('/user/edit',this.opertateForm).then(res=>{
                        // console.log(res);
                        this.isShow = false
                        this.getList()
                    })
                }else{
                    // 点击添加用户
                    this.$http.post('/user/add',this.opertateForm).then(res=>{
                        // console.log(res);
                        this.isShow = false
                        this.getList()
                    })
                }
            },
            addUser(){
                this.isShow = true
                this.operateType = 'add'
                this.opertateForm = {
                    name:'',
                    addr:'',
                    age:'',
                    birth:'',
                    sex:''
                }
            },
            // 编辑用户
            editUser(row){
                this.operateType = 'edit'
                this.isShow = true
                this.opertateForm = row
            },
            // 删除用户
            delUser(row){
                this.$confirm("此操作将永久删除该组件,是否继续?","提示" , {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(()=>{
                    const id = row.id
                    this.$http.post("/user/del",{
                        params:{id}
                    }).then(()=>{
                        this.$message({
                            type:'success',
                            message:'删除成功!',
                        })
                        this.getList()
                    })
                })
            },
            // 获取用户列表
            getList(name = ''){
                this.config.loading = true
                name ? (this.config.page = 1) : ''
                getUser({
                    page: this.config.page,
                    name
                }).then(({data:res})=>{
                    // console.log('获取到的用户数据',res);
                    this.tableData = res.list.map(item => {
                        item.sexLabel = item.sexLabel === 0 ? "女" : "男"
                        return item
                    })
                    this.config.total = res.count
                    this.config.loading = false
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>

<style lang="less" scoped>
    .manage-header{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
</style>