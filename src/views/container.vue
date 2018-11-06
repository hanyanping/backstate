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
             color: #0abf9b;
             font-size: 18px;
         }
         .subactive:hover{
             color: #0abf9b;
             font-size: 18px;
         }
     }
 }
</style>
<template>
    <div id="aside">
        <ul class="firstAside">
            <li v-for="item in items" class='cursor' :class="{active:item.isSubShow}">
                <img :src='item.imgurl' @click="showToggle(item)">
            </li>
        </ul>
        <ul class="secondAside">
            <li class='cursor':class="{subactive:subItem.isSubShow}" @click="jumpRouter(subItem)" v-for="subItem in secondContent">
                <h3>{{subItem.name}}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                secondContent: [
                    {
                        name: '笔记本电脑',
                        isSubShow: true,
                    },
                    {
                        name: '台式电脑',
                        isSubShow: false,
                    },
                    {
                        name: '电视机',
                        isSubShow: false,
                    }
                ],
                items: [
                    {
                        name: '家用电器',
                        imgurl:require('../assets/images/gonglue.png'),
                        isSubShow: true,
                        subItems: [
                            {
                                name: '笔记本电脑',
                                isSubShow: true,
                            },
                            {
                                name: '台式电脑',
                                isSubShow: false,
                            },
                            {
                                name: '电视机',
                                isSubShow: false,
                            }
                        ]
                    },
                    {
                        name: '服装',
                        imgurl:require('../assets/images/guanli.png'),
                        isSubShow: false,
                        subItems: [
                            {
                                name: '男士服装',
                                isSubShow: true,
                            },
                            {
                                name: '女士服装',
                                isSubShow: false,
                            },
                            {
                                name: '青年服装',
                                isSubShow: false,
                            }
                        ]
                    }
                ]
            }
            },

        methods: {
            showToggle: function (item) {
                this.secondContent = item.subItems;
                for(let i in this.items){
                    this.items[i].isSubShow = false;
                }
                item.isSubShow = true;
            },
            jumpRouter(item){
                for(let i in this.secondContent){
                    this.secondContent[i].isSubShow = false;
                }
                item.isSubShow = true;
            }
        }
    }


</script>

