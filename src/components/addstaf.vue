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
                    .lianjie{
                        margin: 30px 110px;
                        font-size: 14px;
                        .labletext{
                            display: inline-block;
                            min-width: 120px;
                            text-align: right;
                            padding-right: 5px;
                        }
                        input{
                            height: 30px;
                            border: 1px solid #dcdcdc;
                            text-indent: 5px;
                        }
                    }
                    .juese{
                        display: flex;
                        .labletext{
                            padding-right: 7px;
                        }
                        .checkbox{
                            margin-bottom: 8px;
                        }
                        .treeData{
                            padding: 20px;
                            border: 1px solid #eee;
                            width:140px;

                        }
                    }
                }
            }
            .button{
                text-align: center;
                margin-top: 50px;
                height: 60px;
                bottom: 60px;
                width: 560px;
                font-size: 14px;
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
    <div class="editorbanner">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">{{title}}</span></h3>
                <div class="imgContent">
                    <div class="lianjie">
                        <span class='labletext' >账号 : </span>
                        <input type="text" placeholder="请输入员工登陆账号">
                    </div>
                    <div class="lianjie" >
                        <span class='labletext'>员工姓名 : </span>
                        <input type="text" placeholder="请输入员工登陆账号">
                    </div>
                    <div class="lianjie">
                        <span class='labletext'>邮箱 : </span>
                        <input type="text" placeholder="请输入员工邮箱">

                    </div>
                    <div class="lianjie juese">
                        <span class='labletext'>角色 :
                        </span>
                        <el-checkbox-group v-model="checked">
                            <el-checkbox class='checkbox' v-for="item in selectdata" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="lianjie juese">
                        <span class='labletext'>权限 :
                        </span>
                        <div class="treeData">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

                        </div>

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
        name: "addstaf",
        props: {id: {
                type: String
            }} ,
        data() {
            return {
                title: '',
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checked: [],
                textarea: '',
                selectdata:  ['管理员', '运营', '市场', '超级管理员'],
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',
                radio: '1',
                publish: '1',
            };
        },
        created(){
            this.getStaf()
        },
        watch:{

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
            getStaf(){
                console.log(this.id)
                if(this.id){
                   this.title = '编辑员工'
                }else{
                    this.title = '添加员工'
                }
            },
            handleNodeClick(data) {
                console.log(data);
            },
            open8(message) {
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'error'
                });
            },
            sureImg(){
                this.$emit('clickstaf', 'sure')
            },
            cancleImg(){
                this.$emit('clickstaf', 'cancle')
            },
        },
    }
</script>

