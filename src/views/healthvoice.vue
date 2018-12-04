<style rel="stylesheet/scss" lang="scss"  scoped>
    .healthvoice{
        .newscontent{
            display: flex;
            min-height:calc(100vh - 50px);
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
                    min-height: 70vh;
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
                    .noData{
                        text-align: center;
                        padding: 30px;
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
    <div class="healthvoice">
        <Headercontent></Headercontent>
        <div class="newscontent">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">新闻资讯</div>
                <div class="bannerTable">
                    <el-tabs v-if="noPermissions" :tab-position="tabPosition" v-model="status" @tab-click="handleClick">
                        <el-tab-pane label="已发布文章">
                            <div class="searchbox">
                                <div class="inputBox">文章编号 : <input type="text" v-model='articleId' placeholder="请输入文章编号"/></div>
                                <div class="inputBox">文章标题 : <input type="text" v-model='title' placeholder="请输入文章标题"/></div>
                                <div class="inputBox">文章分类 : <el-select v-model="fenlei" placeholder="请选择文章分类">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select></div>
                                <div class="inputBox">发布时间 :
                                    <el-date-picker
                                            @change="startdateChange"
                                            v-model="startTime"
                                            type="date"
                                            placeholder="选择开始时间"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                    <el-date-picker
                                            @change="enddateChange"
                                            v-model="endTime"
                                            type="date"
                                            placeholder="选择结束时间"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </div>

                                <div class="inputBox">文章摘要 : <input type="text"  v-model="summary" placeholder="请输入文章摘要"/></div>
                                <div class="searchButton cursor" @click="searchAlready">查询</div>
                                <div class="searchButton cursor" v-if="(hasAdd<permissions.length)" @click="editorBanner('new','healthvoice','')">新添文章</div>
                            </div>
                            <div v-if="noData" class="tableBox">
                                <table class="table">
                                    <tr>
                                        <th>编号</th>
                                        <th>封面</th>
                                        <th>文章标题</th>
                                        <th>文章分类</th>
                                        <th>文章摘要</th>
                                        <th>发表时间</th>
                                        <th v-if="(hasEditor<permissions.length) || (hasRemove<permissions.length)">操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in tableData">
                                        <td>{{item.id}}</td>
                                        <td>
                                            <div class='back' :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                        </td>
                                        <td>{{item.title}}</td>
                                        <td>{{getArticleTitle(item.tagId)}}</td>
                                        <td>{{item.summary}}</td>
                                        <td v-if="item.publishDate">{{timetrans(item.publishDate)}}</td>
                                        <td v-if="!item.publishDate">暂无</td>
                                        <td v-if="(hasEditor<permissions.length) || (hasRemove<permissions.length)">
                                            <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                            <img v-if="(hasEditor<permissions.length)" @click="editorBanner('editor','healthvoice',item.id)" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                            <span class="deleteText warmtext" v-if="item.isDelete" >移除</span>
                                            <img v-if="(hasRemove<permissions.length)"  class="deletimg imgicon cursor" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="removeArticle(item.id)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                                        </td>
                                    </tr>
                                </table>
                                <div class="block">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="page"
                                            :page-size="size"
                                            :page-sizes="[10,20]"
                                            layout="total,sizes, prev, pager, next,jumper"
                                            :total="total">
                                    </el-pagination>
                                </div>
                            </div>
                            <div v-if="!noData" class="noData">暂无数据</div>
                        </el-tab-pane>
                        <el-tab-pane label="已移除">
                            <div  class="searchbox">
                                <div class="inputBox">文章编号 : <input type="text" v-model='articleId' placeholder="请输入文章编号"/></div>
                                <div class="inputBox">文章标题 : <input type="text" v-model='title' placeholder="请输入文章标题"/></div>
                                <div class="inputBox">文章分类 :
                                    <el-select v-model="fenlei" placeholder="请选择文章分类">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inputBox">发布时间 :
                                    <el-date-picker
                                            @change="startdateChange"
                                            v-model="startTime"
                                            type="date"
                                            placeholder="选择开始时间"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                    <el-date-picker
                                            @change="enddateChange"
                                            v-model="endTime"
                                            type="date"
                                            placeholder="选择结束时间"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </div>

                                <div class="inputBox">文章摘要 : <input type="text"  v-model="summary" placeholder="请输入文章摘要"/></div>
                                <div class="searchButton cursor" @click="searchAlready">查询</div>
                            </div>
                            <div v-if="noData" class="tableBox">
                                <table class="table">
                                    <tr>
                                        <th>编号</th>
                                        <th>封面</th>
                                        <th>文章标题</th>
                                        <th>文章分类</th>
                                        <th>文章摘要</th>
                                        <th>发表时间</th>
                                        <th v-if="(hasPublish<permissions.length) || (hasDelete<permissions.length)">操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in tableData">
                                        <td>{{item.id}}</td>
                                        <td>
                                            <div class='back' :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                        </td>
                                        <td>{{item.title}}</td>
                                        <td>{{getArticleTitle(item.tagId)}}</td>
                                        <td>{{item.summary}}</td>
                                        <td v-if="item.publishDate">{{timetrans(item.publishDate)}}</td>
                                        <td v-if="!item.publishDate">暂无</td>
                                        <td v-if="(hasPublish<permissions.length) || (hasDelete<permissions.length)">
                                            <span class=" warmtext" v-if="item.ispublish">发布</span>
                                            <img class="publishimg imgicon cursor" v-if="(hasPublish<permissions.length)" @click="publishArticle(item.id)" @mouseenter="enterStyleone(item)" @mouseleave='leaveStyleone(item)' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/jinlingyingcaiwangtubiao97.png">
                                            <span class="deleteText warmtext" v-if="item.isDelete" >删除</span>
                                            <img class="deletimg imgicon cursor" v-if="(hasDelete<permissions.length)"  @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteArticle(item.id)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                                        </td>
                                    </tr>
                                </table>
                                <div class="block">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="page"
                                            :page-size="size"
                                            :page-sizes="[10,20]"
                                            layout="total,sizes, prev, pager, next,jumper"
                                            :total="total">
                                    </el-pagination>
                                </div>
                            </div>
                            <div v-if="!noData" class="noData">暂无数据</div>
                        </el-tab-pane>
                    </el-tabs>
                    <div v-if="!noPermissions" class="noData">您暂无此权限</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Service from '../common/service'
    import Filter from '../common/filter'
    export default {
        name: "healthvoice",
        data() {
            return {
                hasEditor: '',//编辑权限
                hasDelete: '',//删除权限
                hasAdd: '',//添加权限
                hasRemove: '',//移除权限
                hasPublish: '',//发布权限
                status: 0,
                articleId: '',
                summary: '',
                title: '',
                options: [
                    {
                        value: '',
                        label: '请选择分类'
                    },{
                        value: '1',
                        label: '中医'
                    }, {
                        value: '2',
                        label: '养生'
                    }, {
                        value: '3',
                        label: '心理'
                    }, {
                        value: '4',
                        label: '运动'
                    }, {
                        value: '5',
                        label: '美丽'
                    },
                    {
                        value: '6',
                        label: '家庭'
                    },
                    {
                        value: '7',
                        label: '育儿'
                    },
                    {
                        value: '8',
                        label: '健康'
                    }],
                page: 1,
                size: 10,
                total: 1,
                fenlei: '',
                selectTime: '',
                endTime: '',
                startTime: '',
                tabPosition: 'top',
                showDeletebanner: false,
                showAddbanner: false,
                showEditornews: false,
                tableData: [],
                noPermissions: false,
                noData:false,
                permissions: [],
                userInfo: '',
            };
        },
        created(){

            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(this.userInfo){
                this.permissions = this.userInfo.permissions;
            }
            this.hasEditor = this.judgeArr(this.permissions,'article:edit');
            this.hasDelete = this.judgeArr(this.permissions,'article:delete');
            this.hasRemove = this.judgeArr(this.permissions,'article:remove');
            this.hasAdd = this.judgeArr(this.permissions,'article:add');
            this.hasPublish = this.judgeArr(this.permissions,'article:publish');
            this.searchAlready();
        },
        methods:{
            judgeArr(arr,value){
                var num = 0;
                for(var i=0;i<arr.length;i++){
                    if(arr[i] == value){
                    }else{
                        num++;
                    }
                }
                return num
            },
            publishArticle(id){//发布
                Service.article().publishArticle({},id).then(response => {
                    if(response.errorCode==0){
                        this.$message.success('发布成功');
                        this.searchAlready();
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
            },
            removeArticle(id){//移除
                Service.article().removeArticle({},id).then(response => {
                    if(response.errorCode==0){
                        this.$message.success('移除成功');
                        this.searchAlready();
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
            },
            deleteArticle(id){
                Service.article().deleteArticle({},id).then(response => {
                    if(response.errorCode==0){
                        this.$message.success('删除成功');
                        this.searchAlready();
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
            },
            getArticleTitle(status){
                return Filter.getArticleStatus(status)
            },
            handleClick(tab, event) {
                this.page = 1;
                this.size = 10;
                this.articleId = '';
                this.title = '';
                this.summary = '';
                this.startTime = '';
                this.endTime = '';
                this.fenlei = '';
                this.searchAlready();
            },
            timetrans(timestamp) {//初始化时间
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
                return newTime
            },
            searchAlready(){
                var num = this.judgeArr(this.permissions,'article:view');
                if(num<this.permissions.length){
                    this.noPermissions = true;
                    if(this.startTime && this.endTime ){
                        if(this.startTime>this.endTime){
                            this.$message({
                                message: '结束时间不可小于开始时间',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    Service.article().getinquiry({page:this.page,size: this.size,categoryId:3,id:this.articleId,title: this.title,summary: this.summary,
                        startTime: this.startTime,endTime:this.endTime,tagId:this.fenlei,status: this.status}).then(response => {
                        if(response.errorCode == 0){
                            if(response.data.records.length!=0){
                                this.noData = true;
                                for(let i in response.data.records){
                                    response.data.records[i].isEditor = false;
                                    response.data.records[i].isDelete = false;
                                }
                                this.total = response.data.total;
                                this.$nextTick(()=>{
                                    this.tableData =  response.data.records;
                                })
                            }else{
                                this.tableData = [];
                                this.noData = false;
                            }
                        }else{
                            this.$message.error(response.message)
                        }
                    }, err => {
                    });
                }else{
                    this.noPermissions = false;
                }

            },
            startdateChange(val){
                this.compare()
            },
            enddateChange(val){
                this.compare()
            },
            compare(){
                if(this.startTime && this.endTime ){
                    if(this.startTime>this.endTime){
                        this.$message({
                            message: '结束时间不可小于开始时间',
                            type: 'warning'
                        });
                        return;
                    }
                }
            },
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
                this.size = val;
                this.searchAlready();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.searchAlready();
            },
            editorBanner(type,source,id){
                // this.showEditornews = true;
                if(type == 'editor'){
                    var num = this.judgeArr(this.permissions,'article:edit')
                }else{
                    var num = this.judgeArr(this.permissions,'article:add')
                }
                if(num<this.permissions.length){
                    localStorage.setItem('type',type)
                    this.$router.push({'path':'/editorarticle',query:{id: id,source:source}})
                }else{
                    this.$message.error('您暂无此权限')
                }
            },
        },
        components:{
            Aside,
            Headercontent,
        },
    }
</script>

