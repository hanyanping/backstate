<style rel="stylesheet/scss" lang="scss"  scoped>
    .editorNews{
        display: flex;
        min-height: 100vh;
        /*background: rgba(0,0,0,0.2);*/
        .contanter{
            background: #f9f9f9;
            padding: 15px 36px;
            .bannercontent{
                position: absolute;
                width:940px;
                padding: 20px 30px;
                .addtitle{
                    color: #929292;
                    font-size: 16px;
                    .addimg{
                        color: #0abf9b;
                    }
                }
            }
            .imgContent{
                display: flex;
                .contentLeft{
                    width: 50%;
                    padding: 20px 0;
                    .inputText{
                        font-size: 12px;
                        color: #0d0d0d;
                        padding: 10px 0;
                        .newsTitle{
                            margin-left: 10px;
                            width: 376px;
                            height: 40px;
                            border: solid 1px #dcdfe6;
                            padding-left: 10px;
                            border-radius: 5px;
                        }
                        .fengmiantest{
                            color: #929292;
                        }
                        .uploadtext{
                            color:#929292;
                            font-size: 12px;
                            margin-top: 50px;
                        }
                        .avatar{
                            width: 220px;
                            height: 120px;
                            background-size: cover;
                        }
                        .imgBox{
                            width: 220px;
                            margin: 15px 0 0 46px;
                            height: 120px;
                        }
                        .upload-demo{
                            border: 1px  solid #dcdcdc;
                            .el-button{
                                color: #929292;
                                font-size: 14px;
                                border: none;
                                background: #fff;
                                .uploadIcon{
                                    height: 20px;
                                    width: 20px;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }
                        }
                        .el-textarea{
                            width: 386px;
                        }
                    }
                }
            }
            .button{
                text-align: center;
                margin-top: 50px;
                height: 60px;
                position: fixed;
                bottom: 40px;
                width: 940px;
                .surebutton{
                    color: #fff;
                    background: #0abf9b;
                    padding: 10px 34px;
                    margin-right: 10px;
                }
                .canclebutton{
                    margin-left: 10px;
                    color: #232323;
                    padding: 10px 34px;
                    border: 1px solid #f4f4f4;
                }
            }
        }
    }
</style>
<template>
    <div class="news">
        <Headercontent></Headercontent>
        <div class="editorNews">
            <Aside></Aside>
            <div class="contanter">
                <div class="dialogcontent">
                    <div class="bannercontent">
                        <h3 class="addtitle"><span class="addimg">新建动态</span></h3>
                        <div class="imgContent">
                            <div class="contentLeft">
                                <div class="inputText">
                                    <span>标题 :</span><input class='newsTitle' placeholder="请输入标题" v-model='title' type="text">
                                </div>
                                <div class="inputText">
                                    <div class="block">
                                        <span class="demonstration" style="margin-right: 5px;">动态时间 :</span>
                                        <el-date-picker
                                                @change="startdateChange"
                                                v-model="newsTime"
                                                type="date"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="inputText">
                                    <div>封面图 : <span class="fengmiantest">(图片尺寸xxx像素*xxx像素)</span></div>
                                    <el-upload
                                            class="upload-demo imgBox"
                                            name="upfile"
                                            action="/sys/ueditor/index?action=uploadimage"
                                            :on-change="handleChange"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload"
                                            :on-error="errphoto"
                                            :show-file-list="false"
                                            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP">
                                        <div v-if="imageUrl" class="avatar" :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                        <div  v-if="imageUrl == ''" class="uploadtext">
                                            <img  class='uploadIcon' src="../assets/images/down.png">上传文件
                                        </div>
                                        <!--<el-button v-if="imageUrl == ''" size="small" type="primary"></el-button>-->
                                    </el-upload>

                                </div>
                                <div class="inputText" style="display: flex;">
                                    <span class="demonstration" style="margin-right: 10px;">摘要 :</span>
                                    <el-input
                                            type="textarea"
                                            :rows="3"
                                            placeholder="请输入内容"
                                            v-model="textarea">
                                    </el-input>
                                </div>
                                <div class="inputText" style="display: flex;">
                                    <span class="demonstration" style="margin-right: 10px;">跳转方式 :</span>
                                    <el-radio v-model="jumplink" label="1">无正文</el-radio>
                                    <el-radio v-model="jumplink" label="2">链接正文</el-radio>
                                </div>
                            </div>
                            <div class="wangEditor">
                                <UEditor :config=config ref="ueditor"></UEditor>
                                <button size="primary" type="info" icon="plus" @click="getContent">获取内容</button>
                            </div>
                        </div>
                        <div class="button">
                            <span class="surebutton cursor" @click="sureImg">保存</span>
                            <span class="canclebutton cursor" @click="cancleImg">预览</span>
                            <span class="canclebutton cursor" @click="cancleImg">取消</span>
                        </div>
                    </div>
                </div>
            </div>
            <Addbanner v-if='showAddbanner' @clickbanner="getBanner"></Addbanner>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import Addbanner from '../components/addbanner'
    import UEditor from "../components/ueditor.vue";
    import  Deletebanner from '../components/deletebanner'
    export default {
        name: "addbanner",
        components: { UEditor,Aside ,Headercontent},
        data() {
            return {
                expireTimeOption: {
                    disabledDate(date) {
                        return date.getTime() < Date.now() - 8.64e7;
                    }
                },
                textarea: '',
                jumplink: "1",
                newsTime: '',
                dialogImageUrl: '',
                dialogVisible: false,
                selectImg: [],
                imageUrl: '',
                file: '',
                title: '',
                config: {
                    //可以在此处定义工具栏的内容
                    toolbars: [
                        [ 'undo', 'redo','|','bold', 'italic', 'underline',
                            '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
                            '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'insertcode', 'template', '|',
                            'horizontal', 'date', 'time', 'spechars', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown','preview'
                        ]
                    ],
                    wordCount:false,
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent: "请输入内容", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: 500,
                    initialFrameHeight: 300,
                    BaseUrl: "",
                    UEDITOR_HOME_URL: "static/ueditor/"
                },
            };
        },
        created(){
            // this.getphotoList()

        },
        mounted(){
            this.newsTime = new Date(this.timetrans('1541916730'))
            var width = $(".editorNews").width();
            var left = 0.5*(width - 1000);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            $('.dialogcontent').css({"left":left,'top': top})
        },
        methods: {
            timetrans(timestamp) {//初始化时间
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp*1000);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
                console.log(newTime)
                return newTime
            },
            //获取文档内容
            getContent: function() {
                let content = this.$refs.ueditor.getUEContent();
                console.log(content);
                alert(content);
            },
            errphoto(err, file, fileList){
                console.log(err)
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 0.5;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过500k!');
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.url;
            },
            handleChange(file, fileList) {
            },
            startdateChange(val){
            },
            sureImg(){
                this.$emit('clickbanner', 'editornews')
            },
            cancleImg(){

            },
        },
    }
</script>

