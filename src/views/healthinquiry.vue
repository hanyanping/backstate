<style rel="stylesheet/scss" lang="scss"  scoped>
    .healthinquiry{
        .newscontent{
            display: flex;
            min-height: 100vh;
            .contanter{
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
                    .searchbox{
                        display: flex;
                        padding: 10px 30px;
                        font-size: 12px;
                        color: #0d0d0d;
                        flex-wrap: wrap;
                        .inputBox{
                            margin-right: 30px;
                            margin-bottom: 15px;
                        }
                        .searchButton{
                            height: 28px;
                            line-height: 28px;
                            width: 100px;
                            text-align: center;
                            color: #fff;
                            background: #0abf9b;
                            margin-left: 20px;
                            margin-top: 3px;
                        }
                        input{
                            border: 1px solid #dcdfe6;
                            height: 35px;
                            border-radius: 5px;
                            text-indent: 5px;
                            color: #606266;
                        }
                        input:hover{
                            border: 1px solid #c0c4cc;
                        }
                    }
                    .tableBox{
                        margin: 20px;
                        border: 1px solid #eee;
                        .block{
                            text-align: right;
                            margin-top: 20px;
                            margin-bottom:20px;
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
                                padding: 16px 6px 0;
                                text-align: center;
                            }
                            td:nth-of-type(1){
                                width: 40px;
                            }
                            td:nth-of-type(2){
                                width: 180px;
                                .back{
                                    height: 94px;
                                    min-width: 170px;
                                    max-width: 170px;
                                    background-size: cover;
                                    margin: 0 auto;
                                }
                            }
                            td:nth-of-type(3){
                                max-width: 100px;
                            }
                            td:nth-of-type(4){
                                min-width: 40px;
                                .imgicon{
                                    display: inline-block;
                                    vertical-align: middle;
                                    height: 20px;
                                    width: 20px;
                                    padding-right: 10px;
                                }
                            }
                            td:nth-of-type(5){
                               max-width: 110px;
                            }
                            td:nth-of-type(6){
                                max-width: 90px;
                            }
                            td:nth-of-type(7){
                                max-width: 110px;
                                position: relative;
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
                                    top: 15px;
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
    }
</style>
<template>
    <div class="healthinquiry">
        <Headercontent></Headercontent>
        <div class="newscontent">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">新闻资讯</div>
                <div class="bannerTable">
                    <el-tabs :tab-position="tabPosition">
                        <el-tab-pane label="已发布文章">
                            <div class="searchbox">
                                <div class="inputBox">文章编号 : <input type="text" placeholder="请输入文章编号"/></div>
                                <div class="inputBox">文章标题 : <input type="text" placeholder="请输入文章标题"/></div>
                                <div class="inputBox">发布时间 :
                                    <el-date-picker
                                            v-model="selectTime"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                                <div class="inputBox">文章分类 : <el-select v-model="fenlei" placeholder="请选择文章分类">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select></div>
                                <div class="inputBox">文章摘要 : <input type="text" placeholder="请输入文章摘要"/></div>
                                <div class="searchButton cursor">查询</div>
                            </div>
                            <div class="tableBox">
                                <table class="table">
                                    <tr>
                                        <th>编号</th>
                                        <th>封面</th>
                                        <th>文章标题</th>
                                        <th>文章分类</th>
                                        <th>文章摘要</th>
                                        <th>发表时间</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in tableData">
                                        <td>{{index}}</td>
                                        <td>
                                            <div class='back' :style="{backgroundImage: 'url(' + item.bannerurl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                        </td>
                                        <td>诺如病毒高发季，家长老师需警惕！</td>
                                        <td>养生</td>
                                        <td>{{item.url}}</td>
                                        <td>{{item.state}}</td>
                                        <td>
                                            <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                            <img @click="editorBanner('editor','13966')" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
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
                        </el-tab-pane>
                        <el-tab-pane label="已移除">
                            <div class="searchbox">
                                <div class="inputBox">文章编号 : <input type="text" placeholder="请输入文章编号"/></div>
                                <div class="inputBox">文章标题 : <input type="text" placeholder="请输入文章标题"/></div>
                                <div class="inputBox">发布时间 :
                                    <el-date-picker
                                            v-model="selectTime"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                                <div class="inputBox">文章分类 : <el-select v-model="fenlei" placeholder="请选择文章分类">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select></div>
                                <div class="inputBox">文章摘要 : <input type="text" placeholder="请输入文章摘要"/></div>
                                <div class="searchButton cursor">查询</div>
                            </div>
                            <div class="tableBox">
                                <table class="table">
                                    <tr>
                                        <th>编号</th>
                                        <th>封面</th>
                                        <th>文章标题</th>
                                        <th>文章分类</th>
                                        <th>文章摘要</th>
                                        <th>发表时间</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in tableData">
                                        <td>{{index}}</td>
                                        <td>
                                            <div class='back' :style="{backgroundImage: 'url(' + item.bannerurl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                        </td>
                                        <td>诺如病毒高发季，家长老师需警惕！</td>
                                        <td>养生</td>
                                        <td>{{item.url}}</td>
                                        <td>{{item.state}}</td>
                                        <td>
                                            <span class=" warmtext" v-if="item.ispublish">发布</span>
                                            <img class="publishimg imgicon cursor" @mouseenter="enterStyleone(item)" @mouseleave='leaveStyleone(item)' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/jinlingyingcaiwangtubiao97.png">
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
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>
            <Addbanner v-if='showAddbanner' @clickbanner="getBanner"></Addbanner>
            <Deletebanner v-if='showDeletebanner' @clickbanner="getBanner"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "healthinquiry",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                fenlei: '',
                selectTime: '',
                tabPosition: 'top',
                currentPage: 1,
                showDeletebanner: false,
                showAddbanner: false,
                showEditornews: false,
                tableData: [{
                    bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                    url: '近年来，有关体育运动改变肠道微生物组的研究已成为热点研究。去年年底发表的两项研究表明，在不改变任何饮食条件的情况..',
                    state: '2018年10月20日'
                },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: '近年来，有关体育运动改变肠道微生物组的研究已成为热点研究。去年年底发表的两项研究表明，在不改变任何饮食条件的情况..',
                        state: '已发布'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: '有关体育运动改变肠道微生物组的研究已成为热点研究。去年年',
                        state: '2018年10月20日'
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
            enterStyleone(item){
                item.ispublish = true;
                this.$forceUpdate()
            },
            leaveStyleone(item){
                item.ispublish = false;
                this.$forceUpdate()
            },
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
            editorBanner(type,id){
                // this.showEditornews = true;
                localStorage.setItem('type', type)
                this.$router.push({'name':'editornews',query:{id: id}})
            },
            deleteBanner(){
                this.showDeletebanner = true;
            },
            getBanner(str){
                if(str == 'addphotos'){
                    this.showAddbanner = false;
                }
                if(str == 'editornews'){
                    this.showEditornews = false;
                }
                if(str == 'deletephotos'){
                    this.showDeletebanner = false;
                }
            }
        },
        components:{
            Aside,
            Headercontent,
            Addbanner,
            Deletebanner
        },
    }
</script>

