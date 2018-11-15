<style rel="stylesheet/scss" lang="scss"  scoped>
    .stafmanage{
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
                            min-width: 120px;
                        }
                        td:nth-of-type(5){
                            min-width: 150px;

                        }
                        td:nth-of-type(6){
                            min-width: 150px;
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
        <div class="stafmanage">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">员工管理</div>
                <div class="bannerTable">
                    <div class="tableBox">
                        <table class="table">
                            <tr>
                                <th>账号</th>
                                <th>员工姓名</th>
                                <th>联系方式</th>
                                <th>添加人</th>
                                <th>赋予权限</th>
                                <th>添加时间</th>
                            </tr>
                            <tr v-for="(item,index) in tableData">
                                <td>
                                    {{item.phone}}
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.addName}}</td>
                                <td>{{item.authority}}</td>
                                <td>{{item.state}}</td>
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
                        <span class="sureButton cursor" @click="addStaf">添加员工</span>
                    </div>
                </div>
            </div>
            <Addstaf v-if='showAddstaf' @clickbanner="getBanner"></Addstaf>
            <Editornews v-if='showEditornews' @clickbanner="getBanner"></Editornews>
            <Deletebanner v-if='showDeletebanner' @clickbanner="getBanner"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addstaf from '../components/addstaf'
    import  Editornews from '../components/editornews'
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "home",
        data() {
            return {
                currentPage: 1,
                showDeletebanner: false,
                showAddstaf: false,
                showEditornews: false,
                tableData: [{
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
                    }
                    ]
            };
        },
        created(){
        },
        methods:{
            addStaf(){
                this.showAddstaf = true;
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
            editorBanner(){
                // this.showEditornews = true;
                this.$router.push({'path':'/editornews'})
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
            Addstaf,
            Editornews,
            Deletebanner
        },
    }
</script>

