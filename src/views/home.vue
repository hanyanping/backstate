<style rel="stylesheet/scss" lang="scss"  scoped>
.content{
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
                                <img class="upimg imgicon " v-if="index==0" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyigray.png">
                                <img class='downimg imgicon cursor' v-if="index!=(tableData.length-1)" :src="item.downicon">
                                <img class='downimg imgicon ' v-if="index==(tableData.length-1)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayigray.png">
                            </td>
                            <td>{{item.state}}</td>
                            <td>
                                <img class="publishimg imgicon"  v-if="item.state=='已发布'" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/fabugrey.png"/>
                                <span class=" warmtext" v-if="item.ispublish">发布</span>
                                <img class="publishimg imgicon cursor" @mouseenter="enterStyleone(item)" @mouseleave='leaveStyleone(item)' v-if="item.state!=='已发布'" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/jinlingyingcaiwangtubiao97.png">

                                <span class="editorText warmtext" v-if="item.isEditor" >编辑</span>
                                <img @click='editorBanner' @mouseenter="enterStyletwo(item)" @mouseleave='leaveStyletwo(item)' class='editorimg imgicon cursor' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bianji.png"/>
                                <span class="deleteText warmtext" v-if="item.isDelete" >删除</span>
                                <img class="deletimg imgicon cursor" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteBanner" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                            </td>

                        </tr>
                    </table>
                    <div class="homebutton">
                        <span class="sureButton cursor" @click="addBanner">添加横幅</span>
                        <span class="cancleButton cursor">批量发布</span>
                    </div>
                </div>
            </div>
            <Addbanner v-if='showAddbanner' @clickbanner="getBanner"></Addbanner>
            <Editorbanner v-if='showEditorbanner' @clickbanner="getBanner"></Editorbanner>
            <Deletebanner v-if='showDeletebanner' @clickbanner="getBanner"></Deletebanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import  Editorbanner from '../components/editorbanner'
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "home",
        data() {
            return {
                showDeletebanner: false,
                showAddbanner: false,
                showEditorbanner: false,
                tableData: []
            };
        },
        created(){
            this.getBanner();
            console.log(this.tableData)
            // var obj = {
            //     'ispublish':false,
            //     'isEditor':false,
            //     'isDelete':false,
            // }
            // this.tableData.push(obj)
        },
        mounted(){

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
            addBanner(){
                this.showAddbanner = true;
            },
            editorBanner(){
                this.showEditorbanner = true;
            },
            deleteBanner(){
                this.showDeletebanner = true;
            },
            getBanner(str){
                if(str == 'addphotos'){
                    this.showAddbanner = false;
                }
                if(str == 'editorphotos'){
                    this.showEditorbanner = false;
                }
                if(str == 'deletephotos'){
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
            Editorbanner,
            Deletebanner
        },
    }
</script>

