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
                    <div v-if="noData" class="tableBox">
                        <table class="table">
                            <tr>
                                <th>员工角色</th>
                                <th>描述</th>
                                <th>数量</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in tableData">
                                <td>
                                   {{item.name}}
                                </td>
                                <td>{{item.description}}</td>
                                <td>34</td>
                                <td>
                                    <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                    <img @click="addRole(item.id)" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                    <span class="deleteText warmtext" v-if="item.isDelete" >删除</span>
                                    <img class="deletimg imgicon cursor" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteBanner(item.id)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
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
                    <div v-if="!noData" class="noData">暂无数据</div>
                    <div class="homebutton">
                        <span class="sureButton cursor" @click="addRole('')">添加角色</span>
                    </div>
                </div>
            </div>
            <Addrole v-if='showAddrole' :id="id" @clickbanner="getRole"></Addrole>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addrole from '../components/addRole'
    import Service from '../common/service'
    export default {
        name: "home",
        data() {
            return {
                id: '',
                page: 1,
                size: 10,
                total: 1,
                showAddrole: false,
                showEditornews: false,
                tableData: [
                ],
                noData: false,
                userInfo:'',
                permissions: [],
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(this.userInfo){
                this.permissions = this.userInfo.permissions;
            }
            this.getRoleData();
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
            addRole(id){
                this.id = id;
                this.showAddrole = true;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val;
                this.getRoleData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.getRoleData();
            },
            editorBanner(id){
                if(id){
                    var num = this.judgeArr(this.permissions,'role:edit')
                }else{
                    var num = this.judgeArr(this.permissions,'role:add')
                }
                if(num<this.permissions.length){
                    this.id = id;
                    this.showAddrole = true;
                }else{
                    this.$message.error('您暂无此权限')
                }
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
            deleteBanner(id){
                var num = this.judgeArr(this.permissions,'role:delete')
                if(num<this.permissions.length){
                    this.$confirm('是否删除此权限?', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.role().deleteRole({},id).then(response => {
                            if(response.errorCode == 0){
                                this.getRoleData();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        }, err => {
                        });

                    }).catch(() => {
                    });
                }else{
                    this.$message.error('您暂无此权限')
                }

            },
            getRoleData(){
                Service.role().getRoles({page:this.page,size: this.size}).then(response => {
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
                                this.tableData = response.data.records;
                            })
                        }else{
                            this.noData = false;
                        }
                    }
                }, err => {
                });
            },
            getRole(str){
                if(str == 'sure'){
                    this.showAddrole = false;
                    this.getRoleData()
                }
                if(str == 'cancel'){
                    this.showAddrole = false;
                }


            }
        },
        components:{
            Aside,
            Headercontent,
            Addrole,
        },
    }
</script>

