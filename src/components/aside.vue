<style rel="stylesheet/scss" lang="scss"  scoped>

    #aside{
        display: flex;
        .firstAside{
            width: 94px;
            background: #fff;
            text-align: center;
            padding-top: 24px;
            box-shadow: -19px 0px 65px 0px #dddddd;
            .firstLi{
                height: 50px;
                line-height: 50px;
            }
            img{
                height: 25px;
                width: 25px;
                display: inline-block;
                vertical-align: middle;
            }
            .active{
                background: #f9f9f9;
                border-left: 5px solid #0abf9b;
            }
        }
        .secondAside{
            width: 142px;
            text-align: center;
            padding-top: 30px;
            .title{
                font-size: 16px;
                color: #0abf9b;
                font-weight: 600;
                padding: 10px 0;
            }
            li{
                padding: 10px 0;
                font-size: 12px;
                color: #929292;
            }
            li:hover{
                padding: 10px 0;
                font-size: 12px;
                color:#0d0d0d;
            }
            .subactive{
                color: #0d0d0d;
                font-size: 12px;
            }
            .subactive:hover{
                color: #0d0d0d;
                font-size: 12px;
            }
        }
    }
</style>
<template>
    <div id="aside">
        <ul class="firstAside">
            <li  class='cursor firstLi' :class="{active:item.isSubShow}" v-for="(item,index) in items">
                <img :src='item.imgurl' @click="showToggle(item,index)">
            </li>
        </ul>
        <ul class="secondAside">
            <div class="title">{{title}}</div>
            <li class='cursor' :class="{subactive:subItem.isSubShow}" @click="jumpRouter(subItem,index)" v-for="(subItem,index) in secondContent">
                <h3>{{subItem.name}}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title:'内容管理',
                secondContent: [
                    {
                        title: '内容管理',
                        name: '首页横幅',
                        isSubShow: true,
                        router:'home'
                    },
                    {
                        title: '内容管理',
                        name: '公司动态',
                        isSubShow: false,
                        router:'backnews'
                    },
                    {
                        title: '内容管理',
                        name: '合作伙伴',
                        isSubShow: false,
                        router:'cooperative'
                    }
                ],
                items: [
                    {
                        name: '官网',
                        imgurl:require('../assets/images/gonglue.png'),
                        isSubShow: true,
                        subItems: [
                            {
                                title: '内容管理',
                                name: '首页横幅',
                                isSubShow: true,
                                router:'home'
                            },
                            {
                                title: '内容管理',
                                name: '公司动态',
                                isSubShow: false,
                                router:'backnews'
                            },
                            {
                                title: '内容管理',
                                name: '合作伙伴',
                                isSubShow: false,
                                router:'cooperative'
                            }
                        ]
                    },
                    {
                        name: '文章',
                        imgurl:require('../assets/images/guanli.png'),
                        isSubShow: false,
                        subItems: [
                            {
                                title: '咨询管理',
                                name: '健康资讯',
                                isSubShow: true,
                                router:'healthinquiry'
                            },
                            {
                                title: '咨询管理',
                                name: '健康新闻',
                                isSubShow: false,
                                router:'healthnews'
                            },
                            {
                                title: '咨询管理',
                                name: '健康之声',
                                isSubShow: false,
                                router:'healthvoice'
                            }
                        ]
                    },
                    {
                        name: '设置',
                        imgurl:require('../assets/images/guanli.png'),
                        isSubShow: false,
                        subItems: [
                            {
                                title: '设置中心',
                                name: '员工管理',
                                isSubShow: true,
                                router:'management'
                            }
                        ]
                    }

                ]
            }
        },
        created() {
           console.log(this.$route.params.index)
            if(this.$route.params.from == 'parent'){
                for(let i in this.items){
                    if(this.$route.params.index != i){
                        this.items[i].isSubShow = false;
                    }else{
                        this.items[i].isSubShow = true;
                        this.secondContent =  this.items[i].subItems;
                        this.title =  this.items[i].subItems[0].title;
                    }
                }
            }else if(this.$route.params.from == 'child'){
                for(let i in this.secondContent){
                    if(this.$route.params.index != i){
                        this.secondContent[i].isSubShow = false;
                    }else{
                        this.secondContent[i].isSubShow = true;
                    }
                }
            }
        },
        methods: {
            showToggle (item,index) {
               this.$router.push({ name: item.subItems[0].router, params: {index: index,from:'parent'}})
            },
            jumpRouter(item,index){
                this.$router.push({'name':item.router, params: {index: index,from:'child'}})
            }
        }
    }</script>
