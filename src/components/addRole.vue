<style rel="stylesheet/scss" lang="scss"  scoped>
    .addRole{
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
                            border: 1px solid #dcdfe6;
                            text-indent: 5px;
                            width: 207px;
                        }
                    }
                    .juese{
                        display: flex;
                        .labletext{
                            padding-right: 7px;
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
    <div class="addRole">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">{{title}}</span></h3>
                <div class="imgContent">
                    <div class="lianjie">
                        <span class='labletext' >角色名称 : </span>
                        <input type="text" @keyup="changeName" v-model='name' placeholder="请输入角色名称">
                    </div>
                    <div class="lianjie juese" >
                        <span class='labletext'>角色描述 : </span>
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="至多输入50个汉字"
                                @keyup.native='changeDescription'
                                v-model="description">
                        </el-input>
                    </div>
                    <div class="lianjie juese">
                        <span class='labletext'>权限 :
                        </span>
                        <div class="treeData">
                            <el-tree
                                    ref="roles"
                                    :data="treedata"
                                    show-checkbox
                                    node-key="id"
                                    :check-strictly="true"
                                    :default-checked-keys="permissions"
                                    :props="defaultProps">
                            </el-tree>
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
    import PatternRules from '../common/patternRules'
    import Service from '../common/service'
    export default {
        name: "addrole",
        data() {
            return {
                treedata: [],
                name: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checked: [],
                description: '',
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',
                radio: '1',
                publish: '1',
                title: '',
                permissions: []
            };
        },
        props:{
            "id":{
                type: Number
            }
        },
        created(){
            this.getRole()
        },
        watch:{
            'name'(){
                this.name = this.name.substring(0,8);
            },
            'description'(){
                this.description = this.description.substring(0,50)
            }
        },
        mounted(){
            var width = $(".addRole").width();
            var left = 0.5*(width - 600);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            $('.dialogcontent').css({"left":left,'top': top})
        },
        methods: {
            changeName(){

            },
            changeDescription(){
                this.description = this.description.substring(0,50)
            },
            getRole(){
                if(this.id){
                    this.title='编辑角色';
                }else{
                    this.title = '新建角色'
                }
                Service.role().resourceTree().then(response => {
                    console.log(response.data)
                    this.treedata = response.data;
                    if(this.id){
                        this.getDetail()
                    }
                }, err => {
                });
            },
            getDetail(){
                Service.role().getDetailrole({},this.id).then(response => {
                    if(response.errorCode == 0){
                        this.permissions = response.data.permissions;
                        this.name = response.data.name;
                        this.description = response.data.description;
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
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
                if(!((PatternRules.name).test(this.name))){
                    this.$message.warning('请输入中文');
                    return
                }
                if(this.name == ''|| this.name.length<2 || this.name == null){
                    this.$message.warning('请输入不少于2位的中文角色名称');
                    return;
                }
                console.log(this.description)
                if(this.description == '' || this.description.length>50 || this.description == null){
                    this.$message.warning('请输入不多于50位的描述');
                    return;
                }
                if(this.$refs.roles.getCheckedKeys().length == 0){
                    this.$message.warning('请勾选角色权限');
                    return;
                }
                console.log(this.$refs.roles.getCheckedKeys());
                if(this.id){
                    Service.role().editorRole({
                        "description": this.description,
                        "name": this.name,
                        "permissions": this.$refs.roles.getCheckedKeys(),
                        "sort": 0,
                        "status": 0
                    },this.id).then(response => {
                        if(response.errorCode == 0){
                            this.$emit('clickbanner', 'sure')
                        }else{
                            this.$message.error(response.message)
                        }
                    }, err => {
                    });
                }else{
                    Service.role().addRole({
                        "description": this.description,
                        "name": this.name,
                        "permissions": this.$refs.roles.getCheckedKeys(),
                        "sort": 0,
                        "status": 0
                    }).then(response => {
                        if(response.errorCode == 0){
                            this.$emit('clickbanner', 'sure')
                        }else{
                            this.$message.error(response.message)
                        }
                    }, err => {
                    });
                }

            },
            cancleImg(){
                this.$emit('clickbanner', 'cancel')
            },
        },
    }
</script>

