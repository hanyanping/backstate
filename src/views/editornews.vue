<style rel="stylesheet/scss" lang="scss"  scoped>
    .editorNews{
        display: flex;
        min-height:calc(100vh - 70px);
        /*background: rgba(0,0,0,0.2);*/
        .contanter{
            background: #f9f9f9;
            flex:1;
            padding: 15px 36px;
            .hometitle{
                color: #0d0d0d;
                font-size: 24px;
                img{
                    height: 20px;
                    width: 20px;
                    padding: 0 5px;
                }
            }
            .bannercontent{
                background: #fff;
                width: 100%;
                margin-top: 15px;
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
                    width: 40%;
                    padding: 20px 45px;
                    .textbox{
                        .textBacborder{
                            background:  #f4f4f4;
                            width: 350px;
                            height: 214px;
                        }
                        .textBac{
                            width: 350px;
                            height: 214px;
                            background-size: cover;
                        }
                        .title{
                            font-size: 19px;
                            color: #3d3d3d;
                            margin: 15px auto;
                        }
                        .lead{
                            font-size: 14px;
                            padding: 5px 0px 15px;
                            color: #929292;
                        }
                        .newsTime{
                            font-size: 12px;
                            color: #3d3d3d;
                            padding: 10px 0 0;
                        }
                    }
                }

                .contentRight{
                    width: 50%;
                    padding: 20px 0;
                    .inputText{
                        font-size: 12px;
                        color: #0d0d0d;
                        padding: 10px 0;
                        .demonstration{
                            display: inline-block;
                            min-width: 70px;
                            text-align: right;
                        }
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
                            .uploadIcon{
                                height: 20px;
                                width: 22px;
                                display: inline-block;
                                vertical-align: middle;
                                margin-right: 6px;
                            }
                        }
                        .avatar{
                            width: 220px;
                            height: 120px;
                            background-size: cover;
                        }
                        .imgBox{
                            width: 220px;
                            margin: 15px 0 0 82px;
                            height: 120px;
                        }
                        .upload-demo{
                            border: 1px  solid #dcdfe6;
                            .el-button{
                                color: #929292;
                                font-size: 14px;
                                border: none;
                                background: #fff;

                            }
                        }
                        .el-textarea{
                            width: 386px;
                        }
                    }
                    .wangEditor{
                        padding: 10px 0;
                    }
                }
            }
            .button{
                text-align: center;
                margin-top: 50px;
                height: 60px;
                width: 100%;
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
                <div class="hometitle">公司动态<img src="../assets/images/goline.png"><span class="addimg">{{title}}</span></div>
                <div class="bannercontent">
                    <div class="imgContent">
                        <div class="contentLeft">
                            <div class="textbox">
                                <div class="textBacborder" v-if="imageUrl == ''"></div>
                                <div class="textBac" v-if='imageUrl' :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                 <div class="newsTime">{{newsTime}}</div>
                                <h3 class="title">{{titlecontent}}</h3>
                                <p class="lead">{{summary}}</p>
                            </div>
                        </div>
                        <div class="contentRight">
                            <div class="inputText">
                                <span class="demonstration">标题 :</span><input class='newsTitle' @keyup="changetitlecontent" placeholder="请输入标题" v-model='titlecontent' type="text">
                            </div>
                            <div class="inputText">
                                <div class="block">
                                    <span class="demonstration" style="margin-right: 5px;">动态时间 :</span>
                                    <el-date-picker
                                            @change="startdateChange"
                                            type="date"
                                            v-model="newsTime"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy年MM月dd日">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="inputText">
                                <span class="demonstration" style="margin-right: 5px;margin-left: 30px">封面图 : <span class="fengmiantest">(图片尺寸800像素*600像素)</span></span>
                                <el-upload
                                        class="upload-demo imgBox"
                                        name="upfile"
                                        action="http://devapi.ifxj.com/sys/ueditor/index?action=uploadimage"
                                        :on-change="handleChange"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        :on-error="errphoto"
                                        :show-file-list="false"
                                        accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP">
                                    <div  class="uploadtext">
                                        <img class='uploadIcon' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangchuan.png"/>上传文件
                                    </div>
                                </el-upload>

                            </div>
                            <div class="inputText" style="display: flex;">
                                <span class="demonstration" style="margin-right: 10px;">摘要 :</span>
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="summary" @keyup.native="changeSummary">
                                </el-input>
                            </div>
                            <div class="inputText" style="display: flex;">
                                <span class="demonstration" style="margin-right: 10px;">跳转方式 :</span>
                                <el-radio v-model="jumplink" label="1">无正文</el-radio>
                                <el-radio v-model="jumplink" label="2">链接正文</el-radio>
                            </div>
                            <div class="wangEditor" v-if="jumplink == '2'">
                                <UEditor v-if="jumplink == '2'" :setid=id :source='source' :config=config ref="ueditor"></UEditor>
                            </div>
                        </div>

                    </div>
                    <div class="button">
                        <span class="surebutton cursor" @click="saveNews">保存</span>
                        <span class="canclebutton cursor" @click="preview">预览</span>
                        <span class="canclebutton cursor" @click="cancleImg">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    import Headercontent from '../components/headercontent'
    import UEditor from "../components/ueditor.vue";
    import Service from '../common/service'
    export default {
        name: "addbanner",
        components: { UEditor,Aside ,Headercontent},
        data() {
            return {
                source: 'news',
                id: '',
                summary: '动态摘要',
                jumplink: "1",
                newsTime: '',
                dialogImageUrl: '',
                dialogVisible: false,
                selectImg: [],
                imageUrl: '',
                file: '',
                title: '',
                titlecontent: '动态标题',
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
           var type = localStorage.getItem('type');
           if(this.$route.query.id){
               this.id = this.$route.query.id;
               this.getDetail()
           }
           if(type){
               if(type == 'new'){
                   this.title = '新建动态'
               }else if(type == 'editor'){
                   this.title = '编辑动态'
               }
           }
            // this.newsTime = this.timetrans('1541376000000');
           console.log(this.newsTime)
        },
        mounted(){
            var width = $(".editorNews").width();
            var left = 0.5*(width - 1000);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            $('.dialogcontent').css({"left":left,'top': top})
        },
        methods: {
            getDetail(){
                Service.news().getNewsDetail({},this.id).then(response => {
                   console.log(response.data);
                   this.imageUrl = response.data.imageUrl;
                    this.summary = response.data.summary;
                    this.titlecontent = response.data.title;
                    this.imageUrl = response.data.imageUrl;
                    if(response.data.linked){
                        this.jumplink = "2";
                    }else{
                        this.jumplink = "1";
                    }
                    this.newsTime =this.timetrans(response.data.time)
                    console.log(this.newsTime)
                }, err => {
                });
            },
            changeSummary(){
                this.summary = this.summary.substring(0,200)
            },
            changetitlecontent(){
                this.titlecontent = this.titlecontent.substring(0,50)
            },
            timetrans(timestamp) {//初始化时间
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp);
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
            },
            errphoto(err, file, fileList){
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
            saveNews(){//保存公司动态

                if(this.titlecontent.length == 0){
                    this.$message.warning('请输入动态标题');
                    return;
                }
                if(this.newsTime == '' || this.newsTime == null){
                    this.$message.warning('请选择动态时间');
                    return;
                }
                if(this.imageUrl == '' || this.imageUrl == null){
                    this.$message.warning('请上传封面图片');
                    return;
                }
                if(this.summary == ''){
                    this.$message.warning('请输入摘要内容');
                    return;
                }
                var linked = false,content = '';
                if(this.jumplink == '2'){
                    linked = true;
                    if(this.$refs.ueditor.getUEContent() == ''){
                        this.$message.warning('请输入正文内容');
                        return;
                    }else{
                        content = this.$refs.ueditor.getUEContent();
                    }

                }
                var time = this.newsTime.replace(/年/g,'-').replace(/月/g,'-').replace(/日/g,'');
               time = new Date(time).getTime();
                var data = {
                    "content": content,
                    "imageUrl": this.imageUrl,
                    "linked": linked,
                    "summary": this.summary,
                    "time": time,
                    "title": this.titlecontent
                }
                if(this.id){
                    Service.news().editorNews(data,this.id).then(response => {
                        console.log(response)
                        if(response.errorCode == 0){
                            this.$router.push({name:'backnews'})
                            localStorage.removeItem('type')
                        }
                    }, err => {
                    });
                }else{
                    Service.news().addNews(data).then(response => {
                        this.$router.push({name:'backnews'})
                        localStorage.removeItem('type')
                    }, err => {
                    });
                }

            },
            cancleImg(){
                this.$router.push({name:'backnews'})
                localStorage.removeItem('type')
            },
            preview(){
                localStorage.setItem('contentnews',JSON.stringify(this.$refs.ueditor.getUEContent()))
                let routeData = this.$router.resolve({
                    name: "previewdetail"
                });
                window.open(routeData.href, '_blank');
            },
        },
    }
</script>

