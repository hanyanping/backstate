<style rel="stylesheet/scss" lang="scss"  scoped>
    .cooperative{
        .content{
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
                    .noData{
                        text-align: center;
                        padding-top: 30px;
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
                                padding: 26px 8px 0;
                                text-align: center;
                            }
                            td:first-child{
                                .back{
                                    height: 100px;
                                    min-width: 160px;
                                    max-width: 160px;
                                    background-size: 100% 100%;
                                    margin: 0 auto;
                                }
                            }
                            td:nth-of-type(2){
                                min-width: 180px;
                            }
                            td:nth-of-type(3){
                                min-width: 70px;
                                position: relative;
                                .warmtext{
                                    position: absolute;
                                    color: #fff;
                                    font-size: 12px;
                                    top: 20px;
                                    background: #000;
                                    padding: 4px;
                                    margin-left: -6px;
                                }
                                .imgicon{
                                    display: inline-block;
                                    vertical-align: middle;
                                    height: 20px;
                                    width: 20px;
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
    <div class="cooperative">
        <Headercontent></Headercontent>
        <div class="content">
            <Aside></Aside>
            <div class="contanter">
                <div class="hometitle">合作伙伴</div>
                <div class="bannerTable">
                    <table v-if="noData" class="table">
                        <tr>
                            <th>合作伙伴logo</th>
                            <th>排序</th>
                            <th v-if="(hasEditor<permissions.length) || (hasDelete<permissions.length)">操作</th>
                        </tr>
                        <tr v-for="(item,index) in tableData">
                            <td>
                                <div class='back' :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                            </td>
                            <td v-if="(hasSort<permissions.length)">
                                <img class="upimg imgicon cursor" v-if="index!=0" @click='upSort(index)' :src="item.upicon">
                                <img class="upimg imgicon " v-if="index==0" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyigray.png">
                                <img class='downimg imgicon cursor' @click='downSort(index)' v-if="index!=(tableData.length-1)" :src="item.downicon">
                                <img class='downimg imgicon ' v-if="index==(tableData.length-1)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayigray.png">
                            </td>
                            <td v-if="(hasEditor<permissions.length) || (hasDelete<permissions.length)">
                                <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                <img @click="editorLogofun(item.id)" v-if="(hasEditor<permissions.length)" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                <span class="deleteText warmtext" v-if="item.isDelete">删除</span>
                                <img class="deletimg imgicon cursor" v-if="(hasDelete<permissions.length)" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deletePartner(item.id,item.imageUrl)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                            </td>

                        </tr>
                    </table>
                    <div v-if="!noData && noPermissions" class="noData">暂无数据</div>
                    <div v-if="!noPermissions && !noData" class="noData">您暂无此权限</div>
                    <div class="homebutton" v-if="hasAdd<permissions.length">
                        <span class="sureButton cursor" @click="addLogo">添加logo</span>
                    </div>
                </div>
            </div>
            <Addbanner :source="source" v-if='showAddbanner' @clickbanner="getCoopera"></Addbanner>
            <Deletebanner v-if='showDeletebanner' :id='id' :source='source' :imageUrl='imageUrl' @clickbanner="getCoopera"></Deletebanner>
            <Editorlogo v-if='showEditorlogo' :id="id" @clickbanner="getCoopera"></Editorlogo>
        </div>
    </div>
</template>
1
<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import  Deletebanner from '../components/deletebanner'
    import Editorlogo from '../components/editorlogo'
    import Service from '../common/service'
    export default {
        name: "cooperative",
        data() {
            return {
                hasEditor: '',//编辑权限
                hasDelete: '',//删除权限
                hasAdd: '',//添加权限
                hasSort: '',//排序权限
                noPermissions: false,
                imageUrl: '',
                source: 'cooperative',
                showDeletebanner: false,
                showAddbanner: false,
                showEditorlogo: false,
                tableData: [],
                id: '',
                permissions:[],
                userInfo: '',
                changeData: [],
                noData: false
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(this.userInfo){
                this.permissions = this.userInfo.permissions;
            }
            this.hasEditor = this.judgeArr(this.permissions,'partner:edit');
            this.hasDelete = this.judgeArr(this.permissions,'partner:delete');
            this.hasAdd = this.judgeArr(this.permissions,'partner:add');
            this.hasSort = this.judgeArr(this.permissions,'partner:sort');
            this.getCooperaData()
        },
        methods:{
            upSort(index){
                var temp = this.tableData[index-1];
                var data = this.tableData;
                data[index-1] = this.tableData[index];
                data[index] = temp;
                for(var i = 0;i<data.length;i++){
                    var obj = {
                        id: data[i].id,
                        sort: i
                    }
                    this.changeData.push(obj)
                }
                this.itemSort()
            },
            downSort(index){
                var temp = this.tableData[index+1];
                var data = this.tableData;
                data[index+1] = this.tableData[index];
                data[index] = temp;
                for(var i = 0;i<data.length;i++){
                    var obj = {
                        id: data[i].id,
                        sort: i
                    }
                    this.changeData.push(obj)
                }
                this.itemSort()
            },
            itemSort(){
                Service.partner().partnerSort(this.changeData).then(response => {
                    if(response.errorCode == 0){
                        this.changeData = [];
                        this.getCooperaData()
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
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
            addLogo(){
                this.showAddbanner = true;
            },
            editorLogofun(id){
                this.id = id;
                this.showEditorlogo = true;
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
            deletePartner(id,imageUrl){
                this.showDeletebanner = true;
                this.id = id;
                this.imageUrl = imageUrl;
            },
            getCooperaData(){
                var num = this.judgeArr(this.permissions,'partner:view');
                if(num<this.permissions.length){
                    this.noPermissions = true;
                    Service.partner().getPartners().then(response => {
                        if(response.errorCode == 0){
                            if(response.data.length !=0){
                                this.noData = true;
                                for(let i in response.data){
                                    response.data[i].isEditor = false;
                                    response.data[i].isDelete = false;
                                    response.data[i].upicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyi.png';
                                    response.data[i].downicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayi.png';
                                }
                                this.$nextTick(()=>{
                                    this.tableData = response.data;
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
            getCoopera(str){
                if(str == 'sure'){
                    this.showAddbanner = false;
                    this.showDeletebanner = false;
                    this.showEditorlogo = false;
                    this.getCooperaData();
                }
                if(str == 'cancle'){
                    this.showAddbanner = false;
                    this.showDeletebanner = false;
                    this.showEditorlogo = false;
                }
            },

        },
        components:{
            Aside,
            Headercontent,
            Addbanner,
            Deletebanner,
            Editorlogo
        },
    }
</script>

