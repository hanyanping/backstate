<style rel="stylesheet/scss" lang="scss"  scoped>
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
            min-height: 80vh;
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
                        width: 370px;
                        .back{
                            height: 174px;
                            min-width: 300px;
                            max-width: 300px;
                            background-size: cover;
                            margin: 0 auto;
                            position: relative;
                            .selectIcon{
                                display: inline-block;
                                width: 25px;
                                height: 25px;
                                vertical-align: middle;
                                padding-top: 75px;
                                position: absolute;
                                left: -35px;
                            }
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
                        position: relative;
                        min-width: 120px;
                        .warmtext{
                            position: absolute;
                            color: #fff;
                            font-size: 12px;
                            top: 74px;
                            background: #000;
                            padding: 4px;
                        }
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
                    <table  v-if="noData" class="table">
                        <tr>
                            <th>banner</th>
                            <th>链接</th>
                            <th>排序</th>
                            <th>发布状态</th>
                            <th v-if="(haspublish < permissions.length) || (hasEditor < permissions.length)||(hasDelete < permissions.length)">操作</th>
                        </tr>
                        <tr v-for="(item,index) in tableData">
                            <td class="flex">
                                <div class='back' :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                                    <img class='selectIcon' v-if='item.isSelect == 0 &&(haspublish < permissions.length)' src="../assets/images/disabled.png">
                                    <img class='selectIcon' @click="selectAdver(item)" v-if='(item.isSelect == 1)&&(haspublish < permissions.length)' src="../assets/images/select.png">
                                    <img class='selectIcon' @click="selectAdver(item)" v-if='(item.isSelect == 2)&&(haspublish < permissions.length)' src="../assets/images/hasSelect.png">
                                </div>
                            </td>
                            <td v-if="item.href">{{item.href}}</td>
                            <td v-if="!item.href">暂无</td>
                            <td>
                                <img class="upimg imgicon cursor" v-if="index!=0" @click='upSort(index)' :src="item.upicon">
                                <img class="upimg imgicon "  v-if="index==0" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyigray.png">
                                <img class='downimg imgicon cursor' @click='downSort(index)' v-if="index!=(tableData.length-1)" :src="item.downicon">
                                <img class='downimg imgicon ' v-if="index==(tableData.length-1)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayigray.png">
                            </td>
                            <td v-if="item.status == 0 &&item.beginTime == null">已发布</td>
                            <td v-if="item.beginTime">{{timetrans(item.beginTime)}}</td>
                            <td v-if="item.status == 1 && (!item.beginTime)">未发布</td>
                            <td v-if="(haspublish < permissions.length) || (hasEditor < permissions.length)||(hasDelete < permissions.length)">
                                <img class="publishimg imgicon"  v-if="item.state=='已发布'" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/fabugrey.png"/>
                                <span class=" warmtext" v-if="item.ispublish">发布</span>
                                <img class="publishimg imgicon cursor" v-if="(haspublish < permissions.length)"  @mouseenter="enterStyleone(item)" @mouseleave='leaveStyleone(item)' @click='itemPublish(item)' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/jinlingyingcaiwangtubiao97.png">
                                <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                <img @click='editorBannerfun(item.id,index)' v-if="(hasEditor < permissions.length)" @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                <span class="deleteText warmtext" v-if="item.isDelete" style="margin-left: -6px;">删除</span>
                                <img class="deletimg imgicon cursor" v-if="(hasDelete < permissions.length)" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteBannerfun(item.id,item.imageUrl)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                            </td>
                        </tr>
                    </table>
                    <div v-if="!noData && noPermissions" class="noData">暂无数据</div>
                    <div v-if="!noPermissions && !noData" class="noData">您暂无此权限</div>

                    <div class="homebutton">
                        <span class="sureButton cursor"  v-if="(hasAdd < permissions.length)" @click="addBannerfun">添加横幅</span>
                        <span class="cancleButton cursor" v-if="(haspublish < permissions.length)" @click="allPublish">批量发布</span>
                    </div>
                </div>
            </div>
            <Addbanner v-if='showAddbanner' :source="source" @clickbanner="getBanner"></Addbanner>
            <Editorbanner v-if='showEditorbanner' :id="id" :indexnum="index" @clickbanner="getBanner"></Editorbanner>
            <Deletebanner v-if='showDeletebanner' :id="id" :source='deleteSource' :imageUrl="imageUrl" @clickbanner="getBanner"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import  Editorbanner from '../components/editorbanner'
    import  Deletebanner from '../components/deletebanner'
    import Service from '../common/service'
    export default {
        name: "home",
        data() {
            return {
                haspublish: '',//发布权限
                hasEditor: '',//编辑权限
                hasDelete: '',//删除权限
                hasAdd: '',//添加权限
                hassort:'',//排序权限
                index: '',
                imageUrl:'',
                source: '',
                deleteSource: 'banner',
                showDeletebanner: false,
                showAddbanner: false,
                showEditorbanner: false,
                tableData: [],
                permissions: [],
                userInfo: '',
                noData: false,
                noPermissions: false,
                id: '',
                publishObj: {
                    beginTime:'',
                    endTime:'',
                    ids: []
                },
                changeData:[],
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(this.userInfo){
                this.permissions = this.userInfo.permissions;
            }
            this.haspublish = this.judgeArr(this.permissions,'advert:item:publish');
            this.hassort = this.judgeArr(this.permissions,'advert:item:sort');
            this.hasEditor = this.judgeArr(this.permissions,'advert:item:edit');
            this.hasDelete = this.judgeArr(this.permissions,'advert:item:delete');
            this.hasAdd = this.judgeArr(this.permissions,'advert:item:add');
            this.getBannerData();//获取首页横幅表个数据
        },
        mounted(){

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
                Service.advert().itemSort(this.changeData).then(response => {
                        if(response.errorCode == 0){
                            this.changeData = [];
                            this.getBannerData()
                        }else{
                            this.$message.error(response.message)
                        }
                    }, err => {
                });
            },
            itemPublish(item){
                this.publishObj.ids.push(item.id);
                this.publishObj.beginTime = item.beginTime;
                this.publishObj.endTime = item.endTime;
                this.allPublish();
            },
            allPublish(){
                if(this.publishObj.ids.length==0){
                    this.$message.warning('请选择发布横幅');
                    return;
                }
                Service.advert().itemPublish(this.publishObj).then(response => {
                    if(response.errorCode == 0){
                        this.getBanner();
                        this.publishObj = {
                            beginTime:'',
                            endTime:'',
                            ids: []
                        }
                        this.$message.success('发布成功');
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
            },
            selectAdver(item){
                if(item.isSelect == "1"){
                    item.isSelect = "2"//选中
                    this.$forceUpdate()
                    this.publishObj.ids.push(item.id)
                }else{
                    item.isSelect = "1"//取消选中
                    this.$forceUpdate()
                    var index =  this.publishObj.ids.indexOf(item.id)
                    this.publishObj.ids.splice(index, 1);
                }
            },
            timetrans(timestamp) {
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
                return newTime
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
            addBannerfun(){
                this.showAddbanner = true;
            },
            editorBannerfun(id,index){
                this.index = index;
                this.id = id;
                this.showEditorbanner = true;
           },
            deleteBannerfun(id,imageUrl){
                this.id = id;
                this.imageUrl = imageUrl;
                this.showDeletebanner = true;
            },
            getBannerData(){
                var num = this.judgeArr(this.permissions,'advert:view');
                if(num<this.permissions.length){
                    this.noPermissions = true;
                    var id = 1;
                    Service.advert().getadverts({
                    },id).then(response => {
                        if(response.errorCode == 0){
                            if(response.data.length == 0){
                                this.noData = false;
                            }else{
                                this.noData = true;
                                for(let i in response.data){
                                    response.data[i].ispublish = false;
                                    if(response.data[i].beginTime){
                                        response.data[i].isSelect = '0';
                                    }else{
                                        response.data[i].isSelect = '1';
                                    }
                                    response.data[i].isEditor = false;
                                    response.data[i].isDelete = false;
                                    response.data[i].upicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyi.png';
                                    response.data[i].downicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayi.png';
                                }
                                this.$nextTick(()=>{
                                    this.tableData = response.data;
                                })
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
            getBanner(str){
                if(str == 'sure'){//添加banner,点击确定按钮刷新列表，关闭弹框
                    this.getBannerData();
                    this.showAddbanner = false;
                    this.showEditorbanner = false;
                    this.showDeletebanner = false;
                }
                if(str == 'cancle'){//点击取消按钮不需要刷新列表，关闭编辑banner弹框，
                    this.showAddbanner = false;
                    this.showEditorbanner = false;
                    this.showDeletebanner = false;
                }
            }
        },
        components:{
            Aside,
            Headercontent,
            Addbanner,
            Editorbanner,
            Deletebanner
        },
    }
</script>

