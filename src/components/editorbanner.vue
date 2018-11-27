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
                        <el-carousel :autoplay='false'  :initial-index='indexnum' @change='changeBanner' arrow="always" indicator-position="none" trigger="click" height="174px" ref="carousel">
                            <el-carousel-item  v-for="item in photos" :key="item.id" >
                                <div  class="back"  :style="{backgroundImage: 'url(' + item.imageUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
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
                                v-model="href" @keyup.native="changeHref" >
                        </el-input>
                    </div>
                    <div class="lianjie">
                        <span style="padding-right: 5px;">发布时间 : </span><el-radio v-model="publish" label="1">立即发布</el-radio>
                        <el-radio v-model="publish" label="2">定时发布</el-radio>

                    </div>
                    <div class="dateTime lianjie" v-if="publish==2">
                        <span style="padding-right: 5px;">开始时间 : </span>
                        <el-date-picker
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
                        <!--<el-date-picker-->
                                <!--:picker-options="expireTimeOption"-->
                                <!--@change="enddateChange"-->
                                <!--v-model="endTime"-->
                                <!--type="datetime"-->
                                <!--placeholder="选择结束时间"-->
                                <!--default-time="12:00:00">-->
                        <!--</el-date-picker>-->
                        <el-date-picker
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
        props:{
            id:{
                type: Number
            }
        },
        data() {
            return {
                indexnum: 0,
                stoppublish: '1',
                expireTimeOption: {
                    disabledDate(date) {
                        return date.getTime() < Date.now() - 8.64e7;
                    }
                },
                startDatePicker: this.beginDate(),
                startTime: '',
                endTime: '',
                href: '',
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl: '',
                radio: '1',
                publish: '1',
                photos:[]
            };
        },
        created(){
            // this.getphotoList()
            // this.startTime = new Date(this.timetrans('1551936730'))
            // console.log( this.startTime)
            this.getBanner()
        },
        watch:{
            'href'(){

            },
            'radio'(){
            },
            'publish'(){
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
            var left = 0.5*(width - 600);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            $('.dialogcontent').css({"left":left,'top': top})
        },

        methods: {
            changeHref(item){
                this.href = this.href.substring(0,50)
            },
            setActiveItem(index){
                this.changeBanner(index)
                this.indexnum = Number(index);
            },
            getBanner(){
                var id = 1;
                Service.advert().getadverts({
                },id).then(response => {
                    if(response.data.length == 0){
                    }else{
                        this.photos = response.data;
                        this.getAdvers()
                    }
                }, err => {
                });
            },
            getAdvers(){
                if(this.id){
                    Service.advert().getadvert({
                    },this.id).then(response => {
                        this.imageUrl = response.data.imageUrl;
                        for(var i=0;i<this.photos.length;i++){
                            if(this.photos[i].imageUrl == this.imageUrl){
                                // this.indexnum = Number(i);
                                this.setActiveItem(i)
                            }
                        }
                        if(!response.data.href){
                            this.radio = "1";
                        }else{
                            this.radio = "2" ;
                            this.href = response.data.href;
                        }
                        if(response.data.beginTime){
                            this.publish = "2";
                            this.startTime = new Date(this.timetrans(response.data.beginTime))
                        }else{
                            this.publish = "1"
                        }
                        if(response.data.endTime){
                            this.stoppublish = "2";
                            this.endTime = new Date(this.timetrans(response.data.endTime))
                        }else{
                            this.stoppublish = "1"
                        }
                    }, err => {
                    });
                }
            },
            timetrans(timestamp) {
                var getSeconds = '', getMinutes = '', getHours = '';
                var d = new Date(timestamp);
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
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
                console.log(val)
                 this.compare()
            },
            enddateChange(val){
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
                // this.id = this.photos[index].id;
                // this.getAdvers()
            },
            open8(message) {
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'error'
                });
            },
            sureImg(){//确定
                console.log(this.$refs.carousel.activeIndex)
                if(this.radio == "2"){
                    if(this.href == ''){
                        this.open8('请输入自定义链接');
                        return;
                    }
                    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
                        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
                        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                        + '|' // 允许IP和DOMAIN（域名）
                        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                        + '[a-z]{2,6})' // first level domain- .com or .museum
                        + '(:[0-9]{1,4})?' // 端口- :80
                        + '((/?)|' // a slash isn't required if there is no file name
                        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
                    var re=new RegExp(strRegex);
                    if (re.test(this.href )) {
                    } else {
                        this.open8('请输入正确的链接地址');
                        return;
                    }
                }
                if(this.publish == "2"){
                    if(this.startTime == '' || this.startTime === null){
                        this.open8('请选择开始时间');
                        return;
                    }
                }
                if(this.stoppublish == "2"){
                    if(this.endTime == '' || this.endTime === null){
                        this.open8('请选择结束时间');
                        return;
                    }
                }
                if(this.stoppublish == "2" && this.publish == "2"){
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
                if(this.publish == "1"){
                    this.startTime = '';
                }
                if(this.stoppublish == "1"){
                    this.endTime = '';
                }
                if(this.radio == "1"){
                    this.href = '';
                }
                if(this.startTime){
                    this.startTime = this.startTime.getTime();
                }else{
                    this.startTime = '';
                }
                if(this.endTime){
                    this.endTime = this.endTime.getTime();
                }else{
                    this.endTime = ''
                }
                Service.advert().editoradvert({
                    "advertId": 1,
                    "beginTime": this.startTime,
                    "content": "string",
                    "endTime": this.endTime,
                    "href": this.href,
                    "imageUrl": this.imageUrl,
                    "remark": "",
                    "sort": "",
                    "title": ""
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

