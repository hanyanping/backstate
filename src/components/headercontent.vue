<style  rel="stylesheet/scss" lang="scss" scoped>
.headerbox{
    display: flex;
    justify-content: space-between;
    background: #000;
    color: #0abf9b;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    .logoIcon{
        background: #0abf9b;
        width: 94px;
        text-align: center;
        img{
            width: 68px;
            height: 18px;
        }
    }
    .rightText{
        .name{
            margin-right: 30px;
        }
        margin-right: 80px;
    }
}
</style>
<template>
    <div class="personInfo">
        <div class="headerbox">
            <div class="logoIcon">
                <img src="../assets/images/logo.png">
            </div>
            <div class="rightText">
                <span class="name cursor" @click="openPerson">{{userInfo.username}}</span>
                <span class="loginout cursor" @click="loginOut"> 退出</span>
            </div>
        </div>
        <Personinfo v-if="isShow" @clickperson="closeinfo"></Personinfo>
    </div>

</template>
<script>
    import  Personinfo from '../components/personinfo'
    import Service from '../common/service'
    export default {
        name: "headercontent",
        components:{
            Personinfo
        },
        data(){
        return{
            isShow: false,
            userInfo: '',
            }
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if(!(this.userInfo)){
                localStorage.removeItem('param');
                localStorage.removeItem('contentnews');
                localStorage.removeItem('type');
                this.$router.push({name: 'login'})
            }
        },
        methods:{
            closeinfo(str){
                this.isShow = false
            },
            openPerson(){
                this.isShow = true;
            },
            loginOut(){
                Service.login().loginOut({
                }).then(response => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('param');
                    localStorage.removeItem('contentnews');
                    localStorage.removeItem('type');
                    localStorage.removeItem('access_token');
                    this.$router.push({name: 'login'})
                }, err => {
                });
            },
        }
    }
</script>

