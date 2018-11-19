<style rel="stylesheet/scss" lang="scss"  scoped>
    .cooperative{
        .content{
            display: flex;
            height:calc(100vh - 70px);
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
                                    height: 78px;
                                    min-width: 140px;
                                    max-width: 140px;
                                    background-size: cover;
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
                    <table class="table">
                        <tr>
                            <th>合作伙伴logo</th>
                            <th>排序</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item,index) in tableData">
                            <td>
                                <div class='back' :style="{backgroundImage: 'url(' + item.bannerurl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                            </td>
                            <td>
                                <img class="upimg imgicon cursor" v-if="index!=0" :src="item.upicon">
                                <img class="upimg imgicon " v-if="index==0" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyigray.png">
                                <img class='downimg imgicon cursor' v-if="index!=(tableData.length-1)" :src="item.downicon">
                                <img class='downimg imgicon ' v-if="index==(tableData.length-1)" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayigray.png">
                            </td>
                            <td>
                                <span class="deleteText warmtext"  >删除</span>
                                <img class="deletimg imgicon cursor" @mouseenter="enterStylethree(item)" @mouseleave='leaveStylethree(item)' @click="deleteBanner" src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/lajitong-2.png"/>
                            </td>

                        </tr>
                    </table>
                    <div class="homebutton">
                        <span class="sureButton cursor" @click="addBanner">添加logo</span>
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
            this.getCooperaData()
            for(let i in this.tableData){
                this.tableData[i].upicon= require('../assets/images/back.png')
                this.tableData[i].downicon= require('../assets/images/down.png')
            }
        },
        methods:{
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
            getCooperaData(str){
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
                    url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                    state: '2018年10月20日15点30分'
                },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: '已发布'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: '2018年10月20日15点30分'
                    },
                    {
                        bannerurl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        url: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/banben2.jpg',
                        state: ''
                    }];
                for(let i in data){
                    data[i].isDelete = false;
                    data[i].upicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangyi.png';
                    data[i].downicon= 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xiayi.png';
                }
                this.$nextTick(()=>{
                    this.tableData = data;
                })
            },

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

