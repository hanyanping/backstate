<style rel="stylesheet/scss" lang="scss"  scoped>
.content{
    display: flex;
    min-height: 100vh;
    .contanter{
        background: #f9f9f9;
        flex:1;
        padding: 36px;
        .hometitle{
            color: #0d0d0d;
            font-size: 24px;
        }
        .bannerTable{
            background: #fff;
            width: 100%;
            margin-top: 30px;
            .table{
                width: 100%;
                font-size: 12px;
                th{
                    border-bottom: 1px solid #eee;
                    color: #929292;
                    font-size: 12px;
                    height: 40px;
                   line-height: 40px;
                }
                tr{
                    td{
                        padding: 26px 8px 0;
                        text-align: center;
                    }
                    td:first-child{
                        .back{
                            height: 174px;
                            min-width: 300px;
                            max-width: 300px;
                            background-size: cover;
                            margin: 0 auto;
                        }
                    }
                    td:nth-of-type(2){
                      min-width: 180px;
                    }
                    td:nth-of-type(3){
                        min-width: 70px;
                        .imgicon{
                            display: inline-block;
                            vertical-align: middle;
                            height: 20px;
                            width: 20px;
                            padding-right: 10px;
                        }
                    }
                    td:nth-of-type(5){
                        min-width: 120px;
                        .imgicon{
                            display: inline-block;
                            vertical-align: middle;
                            height: 20px;
                            width: 20px;
                            padding-right: 10px;
                        }
                    }
                    .upimg{
                        display: inline-block;
                        vertical-align: middle;
                        height: 20px;
                        width: 20px;
                    }
                    .downimg{
                        display: inline-block;
                        vertical-align: middle;
                        height: 20px;
                        width: 20px;
                    }
                }
            }
            .homebutton{
                width: 100%;
                text-align: center;
                padding: 45px 0;

            }
        }
    }
}
</style>
<template>
    <div class="home">
        <Headercontent></Headercontent>
        <div class="content">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">首页横幅</div>
                <div class="bannerTable">
                    <table class="table">
                        <tr>
                            <th>banner</th>
                            <th>链接</th>
                            <th>排序</th>
                            <th>发布状态</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item,index) in tableData">
                            <td>
                                <div class='back' :style="{backgroundImage: 'url(' + item.bannerurl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                            </td>
                            <td>{{item.url}}</td>
                            <td>
                                <img class="upimg imgicon cursor" v-if="index!=0" :src="item.upicon">
                                <img class='downimg imgicon cursor' v-if="index!=(tableData.length-1)" :src="item.downicon">
                            </td>
                            <td>{{item.state}}</td>
                            <td>
                                <img class="deletimg imgicon cursor"  :src="item.upicon"/>
                                <img class='editorimg imgicon cursor' :src="item.downicon"/>
                                <img class="publishimg imgicon cursor"  :src="item.upicon"/>
                            </td>

                        </tr>
                    </table>
                    <div class="homebutton">
                        <span class="sureButton cursor" @click="addBanner">添加横幅</span>
                        <span class="cancleButton cursor">批量添加</span>
                    </div>
                </div>
            </div>
            <Addbanner v-if='showAddbanner'></Addbanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    export default {
        name: "home",
        data() {
            return {
                showAddbanner: false,
                tableData: [{
                    bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                    url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                    state: '2018年10月20日15点30分'
                },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: '已发布'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: '2018年10月20日15点30分'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: ''
                    }]
            };
        },
        created(){
            for(let i in this.tableData){
                    this.tableData[i].upicon= require('../assets/images/back.png')
                    this.tableData[i].downicon= require('../assets/images/down.png')
            }
        },
        methods:{
            addBanner(){
                this.showAddbanner = true;
            },
        },
        components:{
            Aside,
            Headercontent,
            Addbanner
        },
    }
</script>

