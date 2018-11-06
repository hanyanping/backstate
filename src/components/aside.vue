<style rel="stylesheet/scss" lang="scss"  scoped>

    #aside{
        width: 300px;
        display: flex;
        height: 100vh;
        .firstAside{
            width: 100px;
            background: #fff;
            text-align: center;
            img{
                height: 50px;
                width: 50px;
                margin-top: 10px;
            }
            .active{
                background: #f4f4f4;
                border-left: 5px solid #0abf9b;
            }
        }
        .secondAside{
            width: 200px;
            background: #f4f4f4;
            text-align: center;
            .title{
                font-size: 20px;
                color: #0abf9b;
                font-weight: 600;
                padding: 10px 0;
            }
            li{
                padding: 10px 0;
                font-size: 15px;
                color:#bbb;
            }
            li:hover{
                padding: 10px 0;
                font-size: 15px;
                color:#232323;
            }
            .subactive{
                color: #232323;
                font-size: 15px;
            }
            .subactive:hover{
                color: #232323;
                font-size: 15px;
            }
        }
    }
</style>
<template>
    <div class="content">
        <div id="aside">
            <ul class="firstAside">
                <li  class='cursor' :class="{active:item.isSubShow}" v-for="(item,index) in items">
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
                        router:'addbanner'
                    },
                    {
                        title: '内容管理',
                        name: '合作伙伴',
                        isSubShow: false,
                        router:'addbanner'
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
                                router:'addbanner'
                            },
                            {
                                title: '内容管理',
                                name: '合作伙伴',
                                isSubShow: false,
                                router:'addbanner'
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
                                router:'addbanner'
                            },
                            {
                                title: '咨询管理',
                                name: '健康新闻',
                                isSubShow: false,
                                router:'home'
                            },
                            {
                                title: '咨询管理',
                                name: '健康之声',
                                isSubShow: false,
                                router:'addbanner'
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
                        this.title =  this.secondContent[i].title
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

