<style rel="stylesheet/scss" lang="scss"  scoped>
    .personInfo{
        position: fixed;
        top:0;
        height: 100vh;
        width: calc(100% - 236px);
        left: 236px;
        /*background: rgba(0,0,0,0.2);*/
        z-index: 200;
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
                        margin: 30px 85px;
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
    <div class="personInfo">
        <div class="dialogcontent">
            <div class="bannercontent">
                <h3 class="addtitle"><span class="addimg">个人信息</span></h3>
                <div class="imgContent">
                    <div class="lianjie">
                        <span class='labletext' >账号 : </span>
                        {{userInfo.phone}}
                    </div>
                    <div class="lianjie" >
                        <span class='labletext'>员工姓名 : </span>
                        <input type="text" v-model="userInfo.name" placeholder="请输入员工登陆账号">
                    </div>
                    <div class="lianjie">
                        <span class='labletext'>邮箱 : </span>
                        <input type="text" v-model="userInfo.email" placeholder="请输入员工邮箱">
                    </div>
                    <div class="lianjie juese">
                        <span class='labletext'>角色 :
                        </span>
                        <span v-for="item in roles">{{item.name}}&nbsp;&nbsp;</span>
                    </div>
                    <div class="lianjie juese">
                        <span class='labletext'>权限 :
                        </span>
                        <div class="treeData">
                            <el-tree ref="roles"
                                     :data="data"
                                     show-checkbox
                                     node-key="id"
                                     :default-checked-keys="permissions"
                                     :props="defaultProps"></el-tree>
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
    import PatternRules from '../common/patternRules'
    import Service from '../common/service'
    export default {
        name: "addstaf",
        data() {
            return {
                name: '',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checked: [],
                textarea: '',
                roles:  [],
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',
                radio: '1',
                publish: '1',
                userInfo:'',
                permissions: []
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            this.name = this.userInfo.name;
            this.roles = this.userInfo.roles;
            this.getInfo();
            this.getTree()
        },
        watch:{

        },
        mounted(){
            var width = $(".personInfo").width();
            var left = 0.5*(width-236 - 600);
            var height = document.body.offsetHeight,
                scrollTop = document.body.scrollTop,
                top = 0.5*(height-scrollTop-550);
            $('.dialogcontent').css({"left":left,'top': top})
        },
        methods: {
            getPermissions(){
                Service.staf().chabgePermissions({roleIds:this.checked.join(',')}).then(response => {
                    if(response.errorCode == 0){
                        this.permissions = response.data;
                        this.$refs.roles.setCheckedKeys(this.permissions)
                    }
                }, err => {
                });
            },
            getTree(){
                Service.role().resourceTree().then(response => {
                    if(response.errorCode == 0){
                        for(var i=0;i<response.data.length;i++){
                            response.data[i].disabled = true;
                            for(var j=0;j<response.data[i].children.length;j++){
                                response.data[i].children[j].disabled = true;
                            }
                        }
                        this.data = response.data;
                        this.getPermissions();
                    }
                }, err => {
                });
            },
            getInfo(){
                Service.login().accountInfo().then(response => {
                   if(response.errorCode == 0){
                        this.userInfo.phone = response.data.phone;
                       this.userInfo.name = response.data.name;
                       this.userInfo.email = response.data.email;
                       this.roles = response.data.roles;
                       for(var i=0;i<response.data.roles.length;i++){
                           this.checked.push(response.data.roles[i].id)
                       }
                   }
                }, err => {
                });
            },
            sureImg(){
                if(this.userInfo.name == ''|| this.userInfo.name.length<2 || this.userInfo.name == null){
                    this.$message.warning('请输入不少于2位的中文员工姓名');
                    return;
                }
                if(!((PatternRules.name).test(this.userInfo.name))){
                    this.$message.warning('请输入中文姓名');
                    return
                }
                if(!this.userInfo.email){
                    this.$message.warning('请输入正确邮箱');
                    return;
                }
                if(!(PatternRules.mail.test(this.userInfo.email))){
                    this.$message.warning('请输入正确邮箱');
                    return;
                }
                Service.login().editorInfo({'name': this.userInfo.name,email: this.userInfo.email}).then(response => {
                    if(response.errorCode == 0){
                        this.$emit('clickperson', 'closeDialog')
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });

            },
            cancleImg(){
                this.$emit('clickperson', 'closeDialog')
            },
        },
    }
</script>

