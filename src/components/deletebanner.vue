<style rel="stylesheet/scss" lang="scss"  scoped>
    .deletebanner{
        position: fixed;
        top:0;
        height: 100vh;
        width: calc(100% - 236px);
        left: 236px;
        /*background: rgba(0,0,0,0.2);*/
        .dialogcontent{
            position: relative;
            height: 400px;
            background: #fff;
            width: 600px;
            overflow: hidden;
            /*overflow-y: scroll;*/
            box-shadow: 0px 7px 59px 0px #cccccc;
            .bannercontent{
                position: absolute;
                width: 560px;
                padding: 20px;
                .addtitle{
                    color: #929292;
                    font-size: 16px;
                    .addimg{
                        color: #0abf9b;
                    }
                }
                .imgContent{
                    .block{
                        width: 314px;
                        margin: 10px auto;
                        .isdelete{
                            margin: 15px 0;
                            font-size: 12px;
                            color: #0abf9b;
                        }
                        .back{
                            height: 174px;
                            width: 314px;
                            background-size: 100% 100%;
                        }
                    }
                    .lianjie{
                        margin: 30px 123px;
                        font-size: 14px;
                    }
                    .dateTime{
                        margin-left: 123px;
                    }
                    .linkbox{
                        margin: 15px 123px;
                        font-size: 14px;
                        display: flex;
                    }
                }
            }

            .button{
                text-align: center;
                margin-top: 50px;
                height: 60px;
                width: 560px;
                .surebutton{
                    color: #fff;
                    background: #0abf9b;
                    padding: 10px 20px;
                    margin-right: 10px;

                }
                .canclebutton{
                    margin-left: 10px;
                    color: #232323;
                    padding: 10px 20px;
                    border: 1px solid #f4f4f4;
                }
            }
        }
    }
</style>
<template>
    <div class="deletebanner">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">删除提示</span></h3>
                <div class="imgContent">
                    <div class="block">
                        <div class="isdelete">是否确定删除？</div>
                        <div  class="back"   :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                        </div>
                    </div>
                    <!--<div class="lianjie" v-if="source=='banner'">-->
                        <!--<span style="padding-right: 5px;">跳转方式 : </span>-->
                    <!--</div>-->
                    <div class="linkbox" v-if="source=='banner'">
                        <span style="padding-right: 5px;display: inline-block;width: 95px;">链接地址 : </span>{{href}}
                    </div>
                </div>
                <div class="button">
                    <span class="surebutton cursor" @click="sureImg">确定</span>
                    <span class="canclebutton cursor" @click="cancleImg">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Aside from './aside'
    import Util from '../common/util'
    import Service from '../common/service'
    export default {
        name: "deletebanner",
        props:{
            id:{
                type: Number,
                required: true
            },
            source:{
                type: String
            },
            imageUrl:{
                type: String
            }
        },
        data() {
            return {

                dialogImageUrl: '',
                dialogVisible: false,
                href:''
            };
        },
        created(){

        },
        mounted(){
            var width = $(".deletebanner").width();
            var left = 0.5*(width - 600);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-450);
            $('.dialogcontent').css({"left":left,'top': top})
            this.getDetail()
        },
        methods: {

            getDetail(){
                if(this.source == 'banner'){
                    Service.advert().getadvert({
                    },this.id).then(response => {
                        if(response.data.href){
                            this.href = response.data.href
                        }else{
                            this.href = '暂无'
                        }
                    }, err => {
                    });
                }
            },
            timetrans(timestamp) {
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp*1000);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
                return newTime
            },
            open8(message) {
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'error'
                });
            },
            sureImg(){//确定选中照片
                if(this.source == 'news'){
                    Service.news().deleteNews({
                    },this.id).then(response => {
                        this.$emit('clickbanner', 'sure')
                    }, err => {
                    });
                }
                if(this.source == 'banner'){
                    Service.advert().deleteadvert({
                    },this.id).then(response => {
                        this.$emit('clickbanner', 'sure')
                    }, err => {
                    });
                }
                if(this.source == 'cooperative'){
                    Service.partner().deletePartner({
                    },this.id).then(response => {
                        this.$emit('clickbanner', 'sure')
                    }, err => {
                    });
                }
            },
            cancleImg(){
                this.$emit('clickbanner', 'cancle')
            },
        },
    }
</script>

