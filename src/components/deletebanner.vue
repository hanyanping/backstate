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
            height: 450px;
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
                            margin: 10px 0;
                            font-size: 12px;
                            color: #0abf9b;
                        }
                        .back{
                            height: 174px;
                            width: 314px;
                            background-size: cover;
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
                        <div  class="back"  @click="setActiveItem(index)" :style="{backgroundImage: 'url(' + imgUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                        </div>
                    </div>
                    <div class="lianjie">
                        <span style="padding-right: 5px;">跳转方式 : </span>
                    </div>
                    <div class="linkbox">
                        <span style="padding-right: 5px;display: inline-block;width: 95px;">链接地址 : </span>
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
            }
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bac2.png',
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
        },
        methods: {
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
                Service.advert().deleteadvert({
                },this.id).then(response => {
                    this.$emit('clickbanner', 'sure')
                }, err => {
                });
            },
            cancleImg(){
                this.$emit('clickbanner', 'cancle')
            },
        },
    }
</script>

