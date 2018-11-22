<style rel="stylesheet/scss" lang="scss">
    /*************************pc specail start*************************/
    .newsDetail{
        width: 100%;
        padding: 4px 10% 70px;
        display: flex;
        .newsContent{
            width: 75%;
            margin-right: 70px;
            .articleContent{
                img{
                    /*width: 100%!important;*/
                    margin: 10px 0;
                }
                h2{
                    font-size: 16px;
                }
                p{
                    /*line-height: 25px;*/
                    margin:0 0 0px;
                }
            }
            .detailTitle{
                font-size: 30px;
                color:#0d0d0d;

            }
            .authInfo{
                padding: 35px 0;
                color: #929292;
                font-size: 12px;
                display: flex;
                line-height: 32px;
                .weixinCode{
                    position: relative;
                    .weixin{
                        margin-left: 20px;
                        height: 32px;
                        width: 32px;
                    }
                    .wxCode{
                        position: absolute;
                        height: 120px;
                        width: 120px;
                        background: #0abf9b;
                        text-align: center;
                        top: -25px;
                        left: 70px;
                        .wximg{
                            height: 100px;
                            width: 100px;
                            margin: 10px auto;
                        }
                        .triangle-left {
                            position: absolute;
                            display: inline-block;
                            width: 0;
                            height: 0;
                            border-top: 8px solid transparent;
                            border-right: 10px solid #0abf9b;
                            border-bottom: 8px solid transparent;
                            left: -10px;
                            top: 30px;
                        }
                    }
                }
            }
        }
        .aboutContent{
            background: #0abf9b;
            color: #fff;
            width: 300px;
            height: 350px;
            padding: 20px 15px;
            margin-left: 20px;
            .aboutTitle{
                font-size: 26px;
            }
            .aboutContents{
                display: flex;
                padding-top:20px;
                cursor: pointer;
                .backicon{
                    height: 60px;
                    width: 104px;
                    background-size:cover;
                }
                .content{
                    display: inline-block;
                    padding-left: 10px;
                    width:130px;
                }
            }
        }

    }
    .footercontent{
        background: #0d0d0d;
        position: fixed;
        bottom: 0px;
        width:100%;
        padding: 0 10%;
        .logoText {
            height: 90px;
            line-height: 90px;
            img{
                height: 26px;
                width: 96px;
                margin-right: 15px;
            }
            .companey{
                color: #929292;
                font-size: 14px;
            }
        }
    }
    .headerbox{
        background: #000;
        color: #0abf9b;
        height: 80px;
        line-height: 80px;
        font-size: 12px;
        padding-left: 10%;
        display: inline-block;
        vertical-align: middle;
        width:100%;
        img{
            height: 25px;
            width: 93px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    /**************** mobile specail end *****************************/
</style>
<template>
    <div class="health">
        <div class="headerbox">
                <img src="../assets/images/logoWhite.png">
        </div>
        <div class="newsDetail">
            <div class="newsContent">
                <!--<div class="detailTitle" v-html="contentData.title"></div>-->
                <div class="authInfo">
                    <div>
                        <!--<span>{{contentData.author}}    {{contentData.createDate}}</span>-->
                    </div>
                </div>
                <div class='articleContent' v-html="contentData"></div>
                <div style="margin-top: 15px;font-size: 14px;color: #929292;">
                    免责声明：本文主要内容及图片来源于网络，版权归属原作者，如有侵权，请联系我们及时删除。
                </div>
            </div>
        </div>
        <div class="footercontent">
            <div class="logoText">
                <img src="../assets/images/logo.png"/>
                <span class="companey">深圳分享家科技信息有限公司</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Service from '../common/service'
    export default {
        name: 'home',
        data () {
            return {
                contentData: '',
            }
        },
        created(){
           this.contentData =  JSON.parse(localStorage.getItem('contentnews'));
        },
        mounted(){
        },
        methods:{
            timetrans(d) {
                var getSeconds = '', getMinutes = '', getHours = '';
                getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                var newTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ';
                // + getHours + ':' + getMinutes + ':' + getSeconds;
                return newTime;
            },
        },
        destroyed(){
            localStorage.removeItem('contentnews')
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

