<style rel="stylesheet/scss" lang="scss"  scoped>
    .newscontent{
        display: flex;
        min-height:calc(100vh - 50px);
        .contanternews{
            background: #f9f9f9;
            flex:1;
            padding: 15px 36px;
            min-height: 80vh;
            .hometitle{
                color: #0d0d0d;
                font-size: 24px;
            }
            .bannerTable{
                background: #fff;
                width: 100%;
                margin-top: 15px;
                min-height: 80vh;
                .noData{
                    text-align: center;
                    padding-top: 30px;
                }
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
                    <div v-if="noData" class="tableBox">
                        <table class="table">
                            <tr>
                                <th>封面图</th>
                                <th>标题</th>
                                <th>动态时间</th>
                                <th v-if="(hasDelete<permissions.length) || (hasEditor<permissions.length)">操作</th>
                            </tr>
                            <tr v-for="(item,index) in tableData">
                                <td>
                                    <div class='back' :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                </td>
                                <td>{{item.title}}</td>
                                <td>{{timetrans(item.time)}}</td>
                                <td v-if="(hasDelete<permissions.length) || (hasEditor<permissions.length)">
                                    <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                    <img @click="editorNews('editor',item.id)" v-if="hasEditor<permissions.length" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                    <span class="deleteText warmtext" v-if="item.isDelete" style="margin-left: -6px;">删除</span>
                                    <img class="deletimg imgicon cursor" v-if="hasDelete<permissions.length" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteNews(item.id,item.imageUrl)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                                </td>

                            </tr>
                        </table>
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="page"
                                    :page-size="size"
                                    :page-sizes="[5,10,20]"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-if="!noData && noPermissions" class="noData">暂无数据</div>
                    <div v-if="!noPermissions && !noData" class="noData">您暂无此权限</div>
                    <div class="homebutton" v-if="hasAdd<permissions.length">
                        <span class="sureButton cursor" @click="editorNews('new','')">新建动态</span>
                    </div>
                </div>
            </div>
            <Deletebanner v-if='showDeletebanner' :id="id" :source='source' :imageUrl='imageUrl' @clickbanner="getNews"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import  Deletebanner from '../components/deletebanner'
    import Service from '../common/service'
    export default {
        name: "home",
        data() {
            return {
                hasEditor: '',//编辑权限
                hasDelete: '',//删除权限
                hasAdd: '',//添加权限
                noData: false,
                noPermissions: false,
                imageUrl:'',
                id: '',
                source: 'news',
                showDeletebanner: false,
                showEditornews: false,
                tableData: [],
                page: 1,
                size: 5,
                total: 1,
                userInfo:'',
                permissions: [],
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(this.userInfo){
                this.permissions = this.userInfo.permissions;
            }
            this.hasEditor = this.judgeArr(this.permissions,'news:edit');
            this.hasDelete = this.judgeArr(this.permissions,'news:delete');
            this.hasAdd = this.judgeArr(this.permissions,'news:add');
            this.getNewData();
        },
        methods:{
            timetrans(timestamp) {
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() +'日';
                return newTime
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
                this.getNewData();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getNewData();
            },

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
            editorNews(type,id){
                localStorage.setItem('type', type)
                this.$router.push({'name':'editornews',query:{id: id}})
            },
            deleteNews(id,imageUrl){
                this.id = id;
                this.imageUrl = imageUrl;
                this.showDeletebanner = true;
            },
            getNewData(){
                var num = this.judgeArr(this.permissions,'news:view')
                if(num<this.permissions.length){
                    this.noPermissions = true;
                    Service.news().getNews({page:this.page,size: this.size}).then(response => {
                        console.log(response.data)
                        if(response.errorCode == 0){
                            if(response.data.records.length!=0){
                                this.noData = true;
                                for(let i in response.data.records){
                                    response.data.records[i].ispublish = false;
                                    response.data.records[i].isEditor = false;
                                    response.data.records[i].isDelete = false;
                                    response.data.records[i].upicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyi.png';
                                    response.data.records[i].downicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayi.png';
                                }
                                this.total = response.data.total;
                                this.$nextTick(()=>{
                                    this.tableData =  response.data.records;
                                })
                                console.log(this.tableData)
                            }else{
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
            getNews(str){
                if(str == 'sure'){
                    this.showEditornews = false;
                    this.showDeletebanner = false;
                    this.getNewData()
                }
                if(str == 'cancle'){
                    this.showEditornews = false;
                    this.showDeletebanner = false;
                }
            }
        },
        components:{
            Aside,
            Headercontent,
            Deletebanner
        },
    }
</script>

