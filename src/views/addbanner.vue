<style rel="stylesheet/scss" lang="scss"  scoped>
    .content{
        display: flex;
        .contanter{
            flex:1;
        }
    }
</style>
<template>
    <div class="addbanner">
        <div class="content">
            <Aside></Aside>
            <div class="contanter">
                <form style="margin-left:10%;" action="uploadimage" enctype="multipart/form-data">
                    <div class="file">
                        <span style="color:#2EAB3B;" v-if="imgUrl ==''"> 上传</span>
                        <span  style="color:#2EAB3B;" v-else> 重新上传</span>
                        <input class="fileInput" type="file" @change="getFile($event)">
                    </div>
                </form>
                <el-upload
                        :headers="{'Content-Type': 'multipart/form-data'}"
                        :action="ajaxUrl+'/ueditor/index?action=uploadimage'"
                        :data="{'action':'uploadimage'}"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

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
                imgUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                file:''
            };
        },
        created(){
            axios.get(this.ajaxUrl + "/bank/all")
                .then(response => {
                    console.log(45455)
                    console.log(this.imgUrl)
                }, err => {
                    console.log(err);
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        methods: {
            getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file);
                event.preventDefault();
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('method', "post");
                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }
                console.log(this.ajaxUrl + "ueditor/index?action=uploadimage")
                axios.get(this.ajaxUrl + "/usr/center/team/info")
                    .then(response => {
                        console.log(response)
                        console.log(this.imgUrl)
                    }, err => {
                        console.log(err);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        components:{
            Aside,
        },
    }
</script>

