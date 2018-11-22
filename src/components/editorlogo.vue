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
                padding: 30px;
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
                        .avatar{
                            height: 174px;
                            width: 300px;
                        }
                        .isdelete{
                            margin: 10px 0;
                            font-size: 12px;
                            color: #0abf9b;
                        }
                        .upload-demo{
                            /*border: 1px  solid #dcdcdc;*/
                            /*line-height: 124px;*/
                            .el-button{
                                color: #929292;
                                font-size: 14px;
                                border: none;
                                background: #fff;

                            }
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
                <h3 class="addtitle"><span class="addimg">编辑logo</span></h3>
                <div class="imgContent">
                    <div class="block">
                        <div class="isdelete">点击可替换</div>
                        <el-upload
                                class="upload-demo imgBox"
                                name="upfile"
                                action="http://devapi.ifxj.com/sys/ueditor/index?action=uploadimage"
                                :on-change="handleChange"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :on-error="errphoto"
                                :show-file-list="false"
                                accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <el-button v-else size="small" type="primary"><img class='uploadIcon' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangchuan.png">上传logo</el-button>
                        </el-upload>
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
        name: "editorlogo",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bac2.png',
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
                this.$emit('clickbanner', 'sure')
            },
            cancleImg(){
                this.$emit('clickbanner', 'cancle')
            },
        },
    }
</script>

