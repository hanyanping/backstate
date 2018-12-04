<style rel="stylesheet/scss" lang="scss"  scoped>
    .addbanner{
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
            width: 1000px;
            overflow: hidden;
            overflow-y: scroll;
            box-shadow: 0px 7px 59px 0px #cccccc;
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
                flex-wrap: wrap;
                .upload-demo{
                    border: 1px  solid #dcdcdc;
                    line-height: 124px;
                    .el-button{
                        color: #929292;
                        font-size: 14px;
                        border: none;
                        background: #fff;

                    }
                }
                .uploadIcon{
                    height: 20px;
                    width: 22px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                }
                .imgBox{
                    width: 25%;
                    margin: 20px 20px 0 0;
                    .back{
                        height: 124px;
                        width: 100%;
                        background-size: cover;
                        position: relative;
                    }
                    .selectActive{
                        background: rgba(0,0,0,0.7);
                        position: absolute;
                        height: 124px;
                        width: 100%;
                        text-align: center;
                        line-height: 138px;
                        .selecticon{
                            height: 15px;
                            width:21px;
                        }
                    }
                    .disabledActive{
                        background: rgba(255,255,255,0.5);
                        position: absolute;
                        height: 124px;
                        width: 100%;
                    }
                    .deletBox{
                        background: rgba(0,0,0,0.3);
                        position: absolute;
                        height: 124px;
                        width: 100%;
                        text-align: right;
                        .deleticon{
                            padding: 10px;
                        }
                    }
                }
            }
            .block{
                text-align: right;
                margin-top: 20px;
            }
            .button{
                text-align: center;
                margin-top: 50px;
                height: 60px;
                position: fixed;
                bottom: 80px;
                width: 940px;
                .surebutton{
                    color: #fff;
                    background: #0abf9b;
                    padding: 10px 30px;
                    margin-right: 10px;
                }
                .canclebutton{
                    margin-left: 10px;
                    color: #232323;
                    padding: 10px 30px;
                    border: 1px solid #f4f4f4;
                }
            }
        }
    }
</style>
<template>
    <div class="addbanner">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">添加图片</span>（只能添加jpg，bmp，png，gif，文件大小不超过500kb）</h3>
                <div class="imgContent">
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
                        <el-button size="small" type="primary"><img class='uploadIcon' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shangchuan.png">上传文件</el-button>
                    </el-upload>
                    <div class="imgBox cursor" v-for="(item,index) in photos">
                        <div @click="select(item)" class="back" @mouseenter="enterStyle(item)" @mouseleave="outStyle(item)" :style="{backgroundImage: 'url(' + item.url + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                            <div :class={selectActive:item.select}>
                                <img v-if="item.select" class='selecticon' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/selectimg.png">
                            </div>
                            <div :class={disabledActive:item.disabled}>
                            </div>
                            <div  :class={deletBox:item.isdelete}>
                                <img  v-if="item.isdelete"  @click="deleteimg(item.url,$event)" class='deleticon' src="https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shanchu.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button">
                    <span v-if="source == 'cooperative'" class="surebutton cursor" @click="sureLogo">确定</span>
                    <span v-else class="surebutton cursor" @click="sureImg">确定</span>
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
        name: "addbanner",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                selectImg: [],
                imgUrl: '',
                file:'',
                photos: []
            };
        },
        created(){
            // this.getphotoList()
        },
        mounted(){
        },
        props: {
            source:{
                type: String,
                required: true
            }
        },
        watch: {
            'source'(){
                console.log(this.source)
            }
        },
        mounted(){
            var width = $(".addbanner").width();
            var left = 0.5*(width - 1000);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-450);
            $('.dialogcontent').css({"left":left,'top': top})
        },
        methods: {
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
                var obj = {
                    'isdelete':false,
                    'disabled':false,
                    'select':false,
                }
                obj.url = res.url;
                this.photos.push(obj)
            },
            handleChange(file, fileList) {
            },
            enterStyle(item){
                item.isdelete = true;
            },
            outStyle(item){
                item.isdelete = false;
            },
            deleteimg(url,event){//删除图片
                event.stopPropagation();
                for(var i = 0;i < this.selectImg.length; i++){
                    if(this.selectImg[i] == url){
                        this.selectImg.splice(i, 1)
                    }
                }
                for(var i = 0;i < this.photos.length; i++){
                    if(this.photos[i].url == url){
                        this.photos.splice(i, 1)
                    }
                }
            },
            select(item){//选择图片
                item.select = !item.select;
                if(item.select){
                    this.selectImg.push(item.url)
                }else{
                    var index = this.selectImg.indexOf(item.url)
                    this.selectImg.splice(index, 1);
                }
                return;
                if(this.selectImg.length>=2){//超过选择的数量，不可选择
                    if(this.selectImg.indexOf(item.url)>-1){
                        item.select = !item.select;
                        var index = this.selectImg.indexOf(item.url);
                        this.selectImg.splice(index, 1);
                        for(var j = 0;j < this.photos.length;j++ ){
                            this.photos[j].disabled = false;
                        }
                    }else{
                        for(var j = 0;j < this.photos.length;j++ ){
                            var num = 0;
                            for(var i = 0;i < this.selectImg.length; i++){
                                if(this.selectImg[i] != this.photos[j].url){
                                    num++;
                                    if(num == this.selectImg.length){
                                        this.photos[j].disabled = true;
                                    }
                                }
                            }
                        }
                    }
                }else{
                    item.select = !item.select;
                    if(item.select){
                        this.selectImg.push(item.url)
                    }else{
                        var index = this.selectImg.indexOf(item.url)
                        this.selectImg.splice(index, 1);
                    }

                }
            },
            sureImg(){//确定选中照片
                console.log(this.selectImg)
                if(this.selectImg.length == 0){
                    this.$message.error('请选择图片!');
                    return;
                }
                var objArr = [];
                for(var i = 0;i<this.selectImg.length;i++){
                    var obj = {};
                    obj.advertId = 1;
                    obj.beginTime = '';
                    obj.content = '';
                    obj.endTime = '';
                    obj.imageUrl = this.selectImg[i];
                    obj.remark = '';
                    obj.sort = '';
                    obj.title = '';
                    objArr.push(obj)
                }
                if(objArr.length!=0){
                    if(this.source != 'cooperative'){
                        Service.advert().addadvertPhone(objArr).then(response => {
                            if(response.errorCode == 0){
                                this.selectImg = [];
                                objArr = [];
                                this.$emit('clickbanner', 'sure')
                            }else{
                                this.$message.error(response.message)
                            }
                        }, err => {
                        });
                    }
                }
            },
            sureLogo(){//合作伙伴
                console.log(this.selectImg)
                if(this.selectImg.length == 0){
                    this.$message.error('请选择图片!');
                    return;
                }
                var objArr = [];
                for(var i = 0;i<this.selectImg.length;i++){
                    var obj = {};
                    obj.description = 1;
                    obj.name = '';
                    obj.sort = '';
                    obj.imageUrl = this.selectImg[i];
                    objArr.push(obj)
                }
                console.log(objArr)
                if(objArr.length!=0){
                    if(this.source == 'cooperative'){
                        Service.partner().addPartner(objArr).then(response => {
                            if(response.errorCode == 0){
                                this.selectImg = [];
                                objArr = [];
                                this.$emit('clickbanner', 'sure')
                            }else{
                                this.$message.error(response.message)
                            }
                        }, err => {
                        });
                    }

                }
            },
            cancleImg(){
                this.$emit('clickbanner', 'cancle')
            },
        },
    }
</script>

