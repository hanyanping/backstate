<style rel="stylesheet/scss" lang="scss"  scoped>
    .newscontent{
        display: flex;
        min-height:calc(100vh - 70px);
        .contanternews{
            background: #f9f9f9;
            flex:1;
            padding: 15px 36px;
            .hometitle{
                color: #0d0d0d;
                font-size: 24px;
            }
            .bannerTable{
                background: #fff;
                width: 100%;
                margin-top: 15px;
                .tableBox{
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                    .block{
                        text-align: right;
                        margin-top: 20px;
                    }
                 }

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
                            padding: 26px 20px 0;
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
                            min-width: 180px;
                        }
                        td:nth-of-type(4){
                            position: relative;
                            min-width: 120px;
                            .imgicon{
                                display: inline-block;
                                vertical-align: middle;
                                height: 20px;
                                width: 20px;
                                padding-right: 10px;
                            }
                            .warmtext{
                                position: absolute;
                                color: #fff;
                                font-size: 12px;
                                top: 74px;
                                background: #000;
                                padding: 4px;
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
    <div class="news">
        <Headercontent></Headercontent>
        <div class="newscontent">
            <Aside></Aside>
            <div class="contanternews">
                <div class="hometitle">公司动态</div>
                <div class="bannerTable">
                    <div class="tableBox">
                        <table class="table">
                            <tr>
                                <th>封面图</th>
                                <th>标题</th>
                                <th>动态时间</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in tableData">
                                <td>
                                    <div class='back' :style="{backgroundImage: 'url(' + item.bannerurl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                </td>
                                <td>{{item.url}}</td>
                                <td>{{item.state}}</td>
                                <td>
                                    <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                    <img @click="editorBanner('editor')" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                    <span class="deleteText warmtext" v-if="item.isDelete" >删除</span>
                                    <img class="deletimg imgicon cursor" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteBanner" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                                </td>

                            </tr>
                        </table>
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="100"
                                    :page-sizes="[4]"
                                    layout="total,sizes, prev, pager, next"
                                    :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="homebutton">
                        <span class="sureButton cursor" @click="editorBanner('new')">新建动态</span>
                    </div>
                </div>
            </div>
            <Editornews v-if='showEditornews' @clickbanner="getNews"></Editornews>
            <Deletebanner v-if='showDeletebanner' @clickbanner="getNews"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import  Editornews from '../components/editornews'
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "home",
        data() {
            return {
                currentPage: 1,
                showDeletebanner: false,
                showAddbanner: false,
                showEditornews: false,
                tableData: []
            };
        },
        created(){
            this.getNews();
        },
        methods:{
            enterStyletwo(item){
                item.isEditor = true;
                this.$forceUpdate();
            },
            leaveStyletwo(item){
                item.isEditor = false;
                this.$forceUpdate();

            },
            enterStylethree(item){
                item.isDelete = true;
                this.$forceUpdate()
            },
            leaveStylethree(item){
                item.isDelete = false;
                this.$forceUpdate()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            addBanner(){
                this.showEditornews = true;
            },
            editorBanner(type){
                // this.showEditornews = true;
                localStorage.setItem('type', type)
                this.$router.push({'name':'editornews'})
            },
            deleteBanner(){
                this.showDeletebanner = true;
            },
            getNews(str){
                if(str == 'sureNews'){
                    this.showAddbanner = false;
                    this.showEditornews = false;
                    this.showDeletebanner = false;
                }
                if(str == 'cancleNews'){
                    this.showAddbanner = false;
                    this.showEditornews = false;
                    this.showDeletebanner = false;
                }
                var data = [{
                    bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                    url: '',
                    state: '2018年10月20日15点30分'
                },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: '',
                        state: '已发布'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: '',
                        state: '2018年10月20日15点30分'
                    }];

                for(let i in data){
                    data[i].ispublish = false;
                    data[i].isEditor = false;
                    data[i].isDelete = false;
                    data[i].upicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyi.png';
                    data[i].downicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayi.png';
                }
                this.$nextTick(()=>{
                    this.tableData = data;
                })
            }
        },
        components:{
            Aside,
            Headercontent,
            Addbanner,
            Editornews,
            Deletebanner
        },
    }
</script>

