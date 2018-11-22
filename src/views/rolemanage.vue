<style rel="stylesheet/scss" lang="scss"  scoped>
    .rolemanage{
        display: flex;
        min-height:calc(100vh - 70px);
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
                        border-bottom: 1px solid #eee;
                        td{
                            padding: 16px 20px;
                            text-align: center;
                        }

                        td:nth-of-type(2){
                            min-width: 120px;
                        }
                        td:nth-of-type(3){
                            min-width: 120px;
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
                                top: -10px;
                                background: #000;
                                padding: 4px;
                            }
                        }
                    }
                    tr:last-child{
                        border: none;
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
        <div class="rolemanage">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">角色管理</div>
                <div class="bannerTable">
                    <div class="tableBox">
                        <table class="table">
                            <tr>
                                <th>员工角色</th>
                                <th>描述</th>
                                <th>数量</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in tableData">
                                <td>
                                   管理员
                                </td>
                                <td>具备所有管理权限</td>
                                <td>34</td>
                                <td>
                                    <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                    <img @click="editorRole('3')" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
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
                        <span class="sureButton cursor" @click="addRole">添加角色</span>
                    </div>
                </div>
            </div>
            <Addrole v-if='showAddrole' :id="id" @clickbanner="getBanner"></Addrole>
            <Deletebanner v-if='showDeletebanner' @clickbanner="getBanner"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addrole from '../components/addRole'
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "home",
        data() {
            return {
                id: '',
                currentPage: 1,
                showDeletebanner: false,
                showAddrole: false,
                showEditornews: false,
                tableData: [
                ]
            };
        },
        created(){
            this.getBanner();
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
            addRole(){
                this.showAddrole = true;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            editorBanner(id){
                this.id = id;
                this.showAddrole = true;
            },
            deleteBanner(){
                this.showDeletebanner = true;
            },
            getBanner(str){
                if(str == 'sure'){
                    this.showAddrole = false;
                    this.showDeletebanner = false;
                }
                if(str == 'cancel'){
                    this.showAddrole = false;
                    this.showDeletebanner = false;
                }
                var data = [{
                    phone: '134556666666',
                    name: '自己安康快乐',
                    email:'485849595959@qq.com',
                    addName: '长大就按',
                    authority:'管理员，运营',
                    state: '2018年10月20日'
                },
                    {
                        phone: '134556666666',
                        name: '自己安康快乐',
                        email:'485849595959@qq.com',
                        addName: '长大就按',
                        authority:'管理员，运营',
                        state: '2018年10月20日'
                    },
                    {
                        phone: '134556666666',
                        name: '自己安康快乐',
                        email:'485849595959@qq.com',
                        addName: '长大就按',
                        authority:'管理员，运营',
                        state: '2018年10月20日'
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
            Addrole,
            Deletebanner
        },
    }
</script>

