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
                        text-align: left;
                        position: relative;
                        padding-bottom: 20px;
                        cursor: pointer;
                        .backiconno{
                            width: 350px;
                            height: 214px;
                            background: #f4f4f4f4;
                        }
                        .backicon{
                            width: 350px;
                            height: 214px;
                            background-size: cover;
                        }
                        .lable{
                            position: absolute;
                            top: 0;
                            height: 32px;
                            padding: 0 8px 0 0;
                            background-color: #0abf9b;
                            line-height: 32px;
                            text-align: center;
                            .fl{
                                padding-left: 5px;
                            }
                            .lableIcon{
                                img{
                                    height: 18px;
                                    width: 18px;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }
                            .lableText{
                                color: #fff;
                                font-size: 12px;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }
                        .lead{
                            font-size: 14px;
                            padding: 20px 15px 0;
                            color: #3d3d3d;
                            font-weight: 600;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            margin-bottom: 0px;
                        }
                        .summary{
                            font-size: 14px;
                            color: #929292;
                            padding: 10px 15px 0;
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
                <div class="hometitle">文章<img src="../assets/images/goline.png"><span class="addimg">{{title}}</span></div>
                <div class="bannercontent">
                    <div class="imgContent">
                        <div class="contentLeft">
                            <div class="textbox" >
                                <div class="backiconno" v-if="!imageUrl"></div>
                                <!--<div class="backicon">-->
                                <div class="backicon" v-if="imageUrl" :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}"></div>
                                <div class="lable clear">
                                    <div  class='fl' >
                                         <span class="lableIcon">
                                             <img :src="getArticleImg(parseInt(classify))" >
                                        </span>
                                        <span class="lableText">{{getArticleTitle(parseInt(classify))}}</span>
                                    </div>
                                </div>
                                <p class="lead"  v-html="titlecontent"></p>
                                <p class="summary"  v-html="summary"></p>
                            </div>
                        </div>
                        <div class="contentRight">
                            <div class="inputText">
                                <span class="demonstration">标题 :</span><input class='newsTitle' @keyup="changetitlecontent" placeholder="请输入标题" v-model='titlecontent' type="text">
                            </div>
                            <div class="inputText">
                                <div class="block">
                                    <span class="demonstration" style="margin-right: 5px;">分类 :</span>
                                    <el-select v-model="classify" placeholder="请选择文章分类">
                                        <el-option
                                                v-for="item in classifyoptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="inputText">
                                <span class="demonstration" style="margin-right: 5px;margin-left: 30px">封面图 : <span class="fengmiantest">(图片尺寸490像素*320像素)</span></span>
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
                            <!--<div class="inputText" style="display: flex;">-->
                                <!--<span class="demonstration" style="margin-right: 10px;">跳转方式 :</span>-->
                                <!--<el-radio v-model="jumplink" label="1">无正文</el-radio>-->
                                <!--<el-radio v-model="jumplink" label="2">链接正文</el-radio>-->
                            <!--</div>-->
                            <div class="wangEditor">
                                <UEditor v-if="id !=''" :setid='id' :config=config :source=source ref="ueditor"></UEditor>
                                <UEditor v-if="id ==''"   :config=config :source=source ref="ueditor"></UEditor>
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
    import Service from '../common/Service'
    import Filter from '../common/filter'
    export default {
        name: "editorarticle",
        components: { UEditor,Aside ,Headercontent},
        data() {
            return {
                classify: '',
                classifyoptions:[{value: '',label: '请选择分类' },{value: '1',label: '中医' },{value: '2',label: '养生'},{value: '3',label: '心理'},
                {value: '4',label: '运动'},{value: '5',label: '美丽'},{value: '6',label: '家庭'},{value: '7',label: '育儿'}
                ,{value: '8',label: '健康'}],
                id: '',
                source:'',
                summary: '资讯摘要',
                newsTime: '文章发表时间',
                imageUrl: '',
                file: '',
                title: '',
                titlecontent: '资讯标题',
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
                    UEDITOR_HOME_URL: "static/ueditor/",
                },
                data:{
                    "author": "",
                    "best": null,
                    "categoryId": '',
                    "content": "",
                    "href": "",
                    "imageUrl": "",
                    "keywords": "",
                    "source": "",
                    "sourceUrl": "",
                    "status": '',
                    "summary": "",
                    "tagId": '',
                    "title": "",
                    "top": null
                }
            };
        },
        created(){
            var type = localStorage.getItem('type');
            this.source = this.$route.query.source;
            if(this.$route.query.id){
                this.id = parseInt(this.$route.query.id);
                this.getDetail()
            }
            if(type){
                if(type == 'new'){
                    this.title = '新建'
                }else if(type == 'editor'){
                    this.title = '编辑'
                }
            }
            this.newsTime = this.timetrans('1551936730');
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
            changeSummary(){
                this.summary = this.summary.substring(0,200)
            },
            changetitlecontent(){
                this.titlecontent = this.titlecontent.substring(0,50)
            },
            getDetail(){
                Service.article().getArticleDetail({},this.id).then(response => {
                    if(response.errorCode==0){
                        this.imageUrl = response.data.imageUrl;
                        console.log(this.imageUrl )
                        this.summary = response.data.summary;
                        this.titlecontent = response.data.title;
                        this.classify =  response.data.tagId.toString();
                        this.data = {
                                "author": response.data.author,
                                "best": response.data.best,
                                "categoryId": '',
                                "content": response.data.content,
                                "href": response.data.href,
                                "imageUrl": this.imageUrl,
                                "keywords": response.data.keywords,
                                "source": response.data.source,
                                "sourceUrl": response.data.sourceUrl,
                                "status": response.data.status,
                                "summary": this.summary,
                                "tagId": this.classify,
                                "title":  this.titlecontent,
                                "top": response.data.top
                        }
                    }
                }, err => {
                });
            },
            getArticleImg(status){
                return Filter.getArticleImg(status)
            },
            getArticleTitle(status){
                return Filter.getArticleStatus(status)
            },
            timetrans(timestamp) {//初始化时间
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp*1000);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
                return newTime
            },
            //获取文档内容
            getContent: function() {
                let content = this.$refs.ueditor.getUEContent();
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

            saveNews(){//保存公司动态
                if(this.titlecontent.length == 0){
                    this.$message.warning('请输入动态标题');
                    return;
                }
                if(this.classify == ''){
                    this.$message.warning('请选择文章分类');
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
                if(this.$refs.ueditor.getUEContent() == ''){
                    this.$message.warning('请输入正文内容');
                    return;
                }
                if(this.source == 'healthinquiry'){
                    this.data.categoryId = 1;
                }else if( this.source == 'healthnews'){
                    this.data.categoryId = 2;
                }else if( this.source == 'healthvoice'){
                    this.data.categoryId = 3;
                }
                this.data.imageUrl = this.imageUrl;
                this.data.summary = this.summary;
                this.data.content = this.$refs.ueditor.getUEContent();
                this.data.tagId = this.classify;
                this.data.title = this.titlecontent;
                this.data.status = 0;
                if(this.id){
                    Service.article().editorArticle(this.data,this.id).then(response => {
                        console.log(response)
                        if(response.errorCode == 0){
                            this.$router.push({name:this.source})
                            localStorage.removeItem('type')
                        }
                    }, err => {
                    });
                }else{
                    Service.article().addArticle(this.data).then(response => {
                        if(response.errorCode == 0){
                            this.$router.push({name:this.source})
                            localStorage.removeItem('type')
                        }
                    }, err => {
                    });
                }
            },
            cancleImg(){
                this.$router.push({'name':source})
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

