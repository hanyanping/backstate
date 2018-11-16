<style rel="stylesheet/scss" lang="scss"  scoped>
    .editorbanner{
        position: fixed;
        top:0;
        height: 100vh;
        width: calc(100% - 236px);
        left: 236px;
        /*background: rgba(0,0,0,0.2);*/
        .dialogcontent{
            position: relative;
            height: 550px;
            background: #fff;
            width: 600px;
            overflow: hidden;
            overflow-y: scroll;
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
                        height: 174px;
                        width: 314px;
                        margin: 10px auto;
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
                bottom: 60px;
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
    <div class="editorbanner">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">编辑横幅</span></h3>
                <div class="imgContent">
                    <div class="block">
                        <el-carousel :autoplay='false'  @change='changeBanner' arrow="always" indicator-position="none" trigger="click" height="174px" ref="carousel">
                            <el-carousel-item  v-for="item in photos" >
                                <div  class="back"  :style="{backgroundImage: 'url(' + item.url + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="lianjie">
                        <span style="padding-right: 5px;">跳转方式 : </span><el-radio v-model="radio" label="1">不跳转</el-radio>
                            <el-radio v-model="radio" label="2">自定义链接</el-radio>

                    </div>
                    <div class="linkbox" v-if="radio==2">
                        <span style="padding-right: 5px;display: inline-block;width: 95px;">链接地址 : </span>
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>
                    <div class="lianjie">
                        <span style="padding-right: 5px;">发布时间 : </span><el-radio v-model="publish" label="1">立即发布</el-radio>
                        <el-radio v-model="publish" label="2">定时发布</el-radio>

                    </div>
                    <div class="dateTime lianjie" v-if="publish==1">
                        <span style="padding-right: 5px;">开始时间 : </span>
                        <el-date-picker
                                :picker-options="expireTimeOption"
                                @change="startdateChange"
                                v-model="startTime"
                                type="datetime"
                                placeholder="选择开始时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </div>
                    <div class="lianjie">
                        <span style="padding-right: 5px;">终止时间 : </span><el-radio v-model="stoppublish" label="1">永久有效</el-radio>
                        <el-radio v-model="stoppublish" label="2">结束时间</el-radio>

                    </div>
                    <div class="dateTime lianjie" v-if="stoppublish==2">
                        <span style="padding-right: 5px;">结束时间 : </span>
                        <el-date-picker
                                :picker-options="expireTimeOption"
                                @change="enddateChange"
                                v-model="endTime"
                                type="datetime"
                                placeholder="选择结束时间"
                                default-time="12:00:00">
                        </el-date-picker>
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
        name: "editorbanner",
        data() {
            return {
                stoppublish: '1',
                expireTimeOption: {
                    disabledDate(date) {
                        return date.getTime() < Date.now() - 8.64e7;
                    }
                },
                startDatePicker: this.beginDate(),
                startTime: '',
                endTime: '',
                textarea: '',
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',
                radio: '1',
                publish: '1',
                photos:[{'isdelete':false,'disabled':false,select:false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/bac2.png',id:'1'},{'isdelete':false,'disabled':false,'select':false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/guanyuwomen_banner.jpg',id:'2'},{'isdelete':false,'disabled':false,'select':false,'url':'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/xinwen_banner.jpg',id:'3'}]
            };
        },
        created(){
            // this.getphotoList()
            this.startTime = new Date(this.timetrans('1551936730'))
            console.log(Date.now())
        },
        watch:{
            'radio'(){
                console.log(this.radio)
            },
            'publish'(){
                console.log(this.publish)
            },
            'startTime'(){
                this.compare()
            },
            'endTime'(){
                this.compare()
            },
        },
        mounted(){
            var width = $(".editorbanner").width();
            console.log(width)
            var left = 0.5*(width - 600);
            console.log(left)

            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            console.log(height,scrollTop)
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
                console.log(newTime)
                return newTime
            },
            compare(){
                if(this.startTime !='' || this.startTime === null){
                    if(this.endTime !=''|| this.endTime === null){
                        if(this.startTime>this.endTime){
                            this.$message({
                                message: '结束时间不可小于开始时间',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                }
            },
            startdateChange(val){
                console.log(this.startTime)
                console.log(val)
                 this.compare()

            },
            enddateChange(val){
                console.log(val)
                this.compare()
            },
            beginDate(){
                return  Date.now()
                // const self = this;
                // return {
                //     disabledDate(time){
                //         if (self.form.endTime) {  //如果结束时间不为空，则小于结束时间
                //             return new Date(self.form.endTime).getTime() < time.getTime()
                //         } else {
                //             return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                //         }
                //     }
                // }
            },
            changeBanner(index){//切换图片，获取新的数据
                console.log(index)
            },
            open8(message) {
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'error'
                });
            },
            sureImg(){//确定选中照片
                this.$emit('clickbanner', 'editorphotos')
                console.log(this.$refs.carousel.activeIndex)
                if(this.radio == 2){
                    if(this.textarea == ''){
                        this.open8('请输入自定义链接');
                        return;
                    }
                }
                if(this.publish == 2){
                    if(this.startTime == '' || this.startTime === null){
                        this.open8('请选择开始时间');
                        return;
                    }
                }
                if(this.stoppublish == 2){
                    if(this.endTime == '' || this.endTime === null){
                        this.open8('请选择结束时间');
                        return;
                    }
                }
                if(this.stoppublish == 2 && this.publish == 2){
                    if(this.startTime !='' || this.startTime === null){
                        if(this.endTime !=''|| this.endTime === null){
                            if(this.startTime>this.endTime){
                                this.$message({
                                    message: '结束时间不可小于开始时间',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }
                }
            },
            cancleImg(){
                this.$emit('clickbanner', 'editorphotos')
            },
        },
    }
</script>

