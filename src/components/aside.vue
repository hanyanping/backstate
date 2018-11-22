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
                position: relative;
                .warmText{
                    position: absolute;
                    background: #000;
                    color: #ffff;
                    display: inline-block;
                    height: 30px;
                    width: 40px;
                    font-size: 12px;
                    line-height: 30px;
                    text-align: center;
                    top: 12px;
                    right: -13px;
                }
                img{
                    height: 22px;
                    width: 22px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .active{
                    background: #0abf9b;
                    display: inline-block;
                    height: 50px;
                    width: 5px;
                    position: absolute;
                    left: 0;
                    /*box-sizing: content-box;*/
                }
            }
            .liactive{
                background: #f9f9f9;
            }
            .firstLi:hover{
                color: #0abf9b;
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
            <li  class='cursor firstLi' @mouseenter="enterStyle(item)" @mouseleave='leaveStyle(item)' @click="showToggle(item,index)" :class="{liactive:item.isSubShow}" v-for="(item,index) in items">
                <span :class="{active:item.isSubShow}"></span>
                <img :src='item.greyIcon' v-if="!item.showIcon" >
                <img :src='item.greenIcon' v-if="item.showIcon">
                <span v-if="item.isShow" class="warmText">{{item.name}}</span>
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
                        greyIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/barguanwangone.png',
                        greenIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/barguanwangon.png',
                        isSubShow: true,
                        showIcon: true,
                        isShow: false,
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
                        greyIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/wenzhanggrey.png',
                        greenIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/wenzhang.png',
                        isSubShow: false,
                        showIcon: false,
                        isShow: false,
                        subItems: [
                            {
                                title: '资讯管理',
                                name: '健康资讯',
                                isSubShow: true,
                                router:'healthinquiry'
                            },
                            {
                                title: '资讯管理',
                                name: '健康新闻',
                                isSubShow: false,
                                router:'healthnews'
                            },
                            {
                                title: '资讯管理',
                                name: '健康之声',
                                isSubShow: false,
                                router:'healthvoice'
                            }
                        ]
                    },
                    {
                        name: '设置',
                        imgurl:require('../assets/images/guanli.png'),
                        greyIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shezhigray.png',
                        greenIcon: 'https://ifxj-upload.oss-cn-shenzhen.aliyuncs.com/ifxj_web_pc/shezhi.png',
                        isSubShow: false,
                        showIcon: false,
                        isShow: false,
                        subItems: [
                            {
                                title: '设置中心',
                                name: '员工管理',
                                isSubShow: true,
                                router:'stafmanage'
                            },
                            {
                                title: '设置中心',
                                name: '角色管理',
                                isSubShow: false,
                                router:'rolemanage'
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            var params = JSON.parse(localStorage.getItem('param'));
            var childparam = JSON.parse(localStorage.getItem('childparam'));
            if(params){
                if(params.from == 'parent'){
                    for(let i in this.items){
                        if(params.index != i){
                            this.items[i].isSubShow = false;
                            this.items[i].showIcon = false;
                        }else{
                            this.items[i].isSubShow = true;
                            this.items[i].showIcon = true;
                            this.secondContent =  this.items[i].subItems;
                            this.secondContent[0].isSubShow = true;
                            this.title =  this.items[i].subItems[0].title;
                        }
                    }
                }
            }
              if(childparam){
                  if(childparam){
                      if(childparam.from == 'child'){
                          for(let i in this.secondContent){
                              if(childparam.index != i){
                                  this.secondContent[i].isSubShow = false;
                              }else{
                                  this.secondContent[i].isSubShow = true;
                              }
                          }
                      }
                  }
              }
        },
        methods: {
            enterStyle(item){
                if(!item.showIcon){
                    item.showIcon = true;
                }
                item.isShow = true;
            },
            leaveStyle(item){
                if(!item.isSubShow){
                    item.showIcon = false;
                }
                item.isShow = false;
            },
            showToggle (item,index) {//第一个侧边栏
                var obj = {
                    index: index,
                    from: 'parent'
                }
                localStorage.setItem('param',JSON.stringify(obj))
                localStorage.removeItem("childparam");
               this.$router.push({ name: item.subItems[0].router})
            },
            jumpRouter(item,index){
                var obj = {
                    index: index,
                    from: 'child'
                }
                localStorage.setItem('childparam',JSON.stringify(obj))
                this.$router.push({'name':item.router})
            }
        }
    }</script>
