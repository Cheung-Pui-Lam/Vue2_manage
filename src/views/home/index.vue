<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <!-- 用户信息展示区域 -->
            <el-card shadow="hover">
                <div class="user">
                    <!-- 用户头像 -->
                    <img :src="userImg"/>
                    <!-- 用户信息 -->
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <!-- 登陆时间 -->
                <div class="login-info">
                    <p>上次登录的时间:<span>2021-7-19</span></p>
                    <p>上次登录的地点:<span>江门</span></p>
                </div>
            </el-card>
            <!-- 总数据(今日,本月,总)区域 -->
            <el-card style="margin-top:20px;height:460px">
                <!-- 数据绑定 -->
                <el-table :data="tableData">
                    <!-- 数据标题 -->
                    <el-table-column
                        prop="name"
                        label="课程"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="todayBuy"
                        label="本日购买"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="monthBuy"
                        label="本月购买"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="totalBuy"
                        label="总购买"
                        >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 今日订单数据区域 -->
        <el-col :span="16" style="margin-top:20px">
            <!-- 订单数据 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- echar图表展示区域 -->
            <!-- 折线图 -->
            <el-card style="height:280px">
                <div style="height:280px" ref="echarts"></div>
                <!-- <Echart :chartData=""/> -->
            </el-card>
            <div class="graph">
                <!-- 柱状图 -->
                <el-card style="height:260px">
                    <div style="height:240px" ref="userEcharts"></div>
                </el-card>
                <!-- 饼状图 -->
                <el-card style="height:260px">
                    <div style="height:240px" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    // 引入data[axios]
    import { getData } from '../../../api/data.js'
    // 引入echarts
    import * as echarts from 'echarts'
    export default {
        name:'home',
        data() {
            return {
                // 引入图片
                userImg:require('../../assets/images/user.png'),
                // 图表中的数据
                tableData:[],
                // 今日订单数据
                countData: [
                    {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                    },
                    {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                    },
                ],
            }
        },
        mounted() {
            // 页面一挂载就向后台请求图表中的数据
            getData().then(res=>{
                const {code,data} = res.data
                // console.log('mock模拟数据',res);
                // 判断返回的code值是否为20000(发送成功的code)
                if(code === 20000){
                    // 获取图表数据(今日,本月,总)
                    this.tableData = data.tableData
                    // 获取echarts中的数据
                    const order = data.orderData
                    const xData = order.date
                    // 获取键名
                    const keyArray = Object.keys(order.data[0])
                    // 创建series
                    const series = []
                    // 将每一个键名中的数据压入series最后用于折线图的展示
                    keyArray.forEach(key => {
                        series.push({
                            name:key,
                            data:order.data.map(item => item[key]),
                            // 折线图
                            type:'line'
                        })
                    })

                    // 创建折线图
                    const option = {
                        xAxis:{
                            data:xData
                        },
                        yAxis:{

                        },
                        legend:{
                            data:keyArray
                        },
                        series
                    }
                    // 初始化echarts
                    const E = echarts.init(this.$refs.echarts)
                    // 绘图
                    E.setOption(option)

                    // 用户图(柱状图)
                    const userOption = {
                        legend: {
                            // 图例文字颜色
                            textStyle: {
                            color: "#333",
                            },
                        },
                        grid: {
                            left: "20%",
                        },
                        // 提示框
                        tooltip: {
                            trigger: "axis",
                        },
                        xAxis: {
                            type: "category", // 类目轴
                            // es6箭头函数简写形式直接return
                            data: data.userData.map(item => item.date),
                            axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                            },
                            axisLabel: {
                            interval: 0,
                            color: "#333",
                            },
                        },
                        yAxis: [
                            {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                color: "#17b3a3",
                                },
                            },
                            },
                        ],
                        color: ["#2ec7c9", "#b6a2de"],
                        series: [
                            {
                                name:'新增用户',
                                data:data.userData.map(item => item.new),
                                type:'bar'
                            },
                            {
                                name:'活跃用户',
                                data:data.userData.map(item => item.active),
                                type:'bar'
                            }
                        ],
                    }
                    const U = echarts.init(this.$refs.userEcharts)
                    U.setOption(userOption)

                    // 饼图
                    const videoOption =  {
                        tooltip: {
                            trigger: "item",
                        },
                        color: [
                            "#0f78f4",
                            "#dd536b",
                            "#9462e5",
                            "#a6a6a6",
                            "#e1bb22",
                            "#39c362",
                            "#3ed1cf",
                        ],
                        series: [
                            {
                                data:data.videoData,
                                // 饼图
                                type:'pie'
                            }
                        ],
                    }
                    const V = echarts.init(this.$refs.videoEcharts)
                    V.setOption(videoOption)

                }
                // console.log('mock模拟数据',res);
            })
        },
    }
</script>

<style>

</style>