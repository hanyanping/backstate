<style rel="stylesheet/scss" lang="scss"  scoped>

    .content{
        display: flex;
        .contanter{
            flex:1;
            .imgContent{
                display: flex;
                flex-wrap: wrap;
                .imgBox{
                    width: 25%;
                    margin: 20px 20px 0 0;
                    .back{
                        height: 230px;
                        width: 100%;
                        background-size: cover;
                        position: relative;
                    }
                    .selectActive{
                        background: rgba(0,0,0,0.3);
                        position: absolute;
                        height: 230px;
                        width: 100%;
                        text-align: center;
                        line-height: 230px;
                        .selecticon{
                            height: 30px;
                            width:30px;
                        }
                    }
                    .disabledActive{
                        background: rgba(255,255,255,0.5);
                        position: absolute;
                        height: 230px;
                        width: 100%;
                    }
                    .deletBox{
                        background: rgba(0,0,0,0.3);
                        position: absolute;
                        height: 230px;
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
    <div class="addbanner">
        <div class="content">
            <Aside></Aside>
            <div class="contanter">
                <el-upload
                        class="upload-demo"
                        name="upfile"
                        action="/sys/ueditor/index?action=uploadimage"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-error="errphoto"
                        :show-file-list="false"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
                        >
                    <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                <div class="imgContent">
                    <div class="imgBox cursor" v-for="(item,index) in photos">
                        <div @click="select(item)" class="back" @mouseenter="enterStyle(item)" @mouseleave="outStyle(item)" :style="{backgroundImage: 'url(' + item.url + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                            <div :class={selectActive:item.select}>
                                <img v-if="item.select" class='selecticon' src="../assets/images/back.png">
                            </div>
                            <div :class={disabledActive:item.disabled}>
                            </div>
                            <div  :class={deletBox:item.isdelete}>
                                <img  v-if="item.isdelete"  @click="deleteimg(item.id,$event)" class='deleticon' src="../assets/images/back.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <el-pagination  @current-change="handleCurrentChange"
                                    :current-page="currentPageNo"
                                    :page-size = "pageSize"
                                    layout="prev,pager,next"
                                    :total="totalCount">
                    </el-pagination>
                </div>
                <div class="button">
                    <span class="surebutton">确定</span>
                    <span class="canclebutton">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Aside from '../components/aside'
    import Util from '../common/util'
    import Service from '../common/service'
    export default {
        name: "home",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                selectImg: [],
                pageSize: 2,
                pages: '',
                currentPageNo: 1,
                currentCount: "2",
                totalCount: 0,
                imgUrl: '',
                file:'',
                photos:[],
                photo:[{'isdelete':false,'disabled':false,select:false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bac2.png',id:'1'},{'isdelete':false,'disabled':false,'select':false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/guanyuwomen_banner.jpg',id:'2'},{'isdelete':false,'disabled':false,'select':false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xinwen_banner.jpg',id:'3'}]
            };
        },
        created(){
            // this.getphotoList()
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
                this.photos.push(res)
                for(var i = 0;i< this.photos.length;i++){
                    this.photos[i].isdelete = false;
                    this.photos[i].disabled = false;
                    this.photos[i].select = false;
                    this.photos[i].id = i;
                }
                console.log(this.photos)
                console.log(this.photo)
            },
            handleChange(file, fileList) {
                if(fileList){
                    // for(var i = 0;i< fileList.length;i++){
                    //     console.log(fileList[i].response.url)
                    //     if(fileList[i].status == "success"){
                    //         this.photos.imgurl = fileList[i].response.url;
                    //         this.photos.isdelete = false;
                    //         this.photos.disabled = false;
                    //         this.photos.select = false;
                    //         this.photos.id = i;
                    //     }
                    // }
                    // this.$nextTick(()=>{
                    //     this.photos = fileList
                    // })
                }

            },
            enterStyle(item){
                item.isdelete = true;

            },
            outStyle(item){
                item.isdelete = false;
            },
            deleteimg(id,event){//删除图片
                event.stopPropagation();
                console.log(id)
            },
            select(item){//选择图片
                if(this.selectImg.length>=2){
                    if(this.selectImg.indexOf(item.id)>-1){
                        item.select = !item.select;
                        var index = this.selectImg.indexOf(item.id);
                        this.selectImg.splice(index, 1);
                        for(var j = 0;j < this.photos.length;j++ ){
                            this.photos[j].disabled = false;
                        }
                    }else{
                        for(var j = 0;j < this.photos.length;j++ ){
                            var num = 0;
                            for(var i = 0;i < this.selectImg.length; i++){
                                if(this.selectImg[i] != this.photos[j].id){
                                    num++;
                                    if(num == this.selectImg.length){
                                        this.photos[j].disabled = true;
                                    }
                                }
                            }
                        }
                    }
                }else{
                    console.log(item)
                    item.select = !item.select;
                    if(item.select){
                        this.selectImg.push(item.id)
                    }else{
                        var index = this.selectImg.indexOf(item.id)
                        this.selectImg.splice(index, 1);
                    }
                    console.log(this.selectImg)
                }
            },
            handleCurrentChange(currentPage) {//跳转
                //当前页改变调用接口  pageNo  pageSize
                this.currentPageNo = currentPage;
                this.getphotoList()
            },
            getphotoList(){
                console.log(this.currentPageNo)
                this.photos = this.photo;
                this.totalCount = 3;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file);
                event.preventDefault();
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('method', "post");
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                Service.common().postphone({
                }).then(response => {
                    console.log(response)
                }, err => {

                })
            }

        },
        components:{
            Aside,
        },
    }
</script>

