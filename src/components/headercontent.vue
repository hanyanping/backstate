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
    <div class="headerbox">
        <div class="logoIcon">
            <img src="../assets/images/logo.png">
        </div>
        <div class="rightText">
            <span class="name">yangxiaofeng@ifxj.com</span>
            <span class="loginout"> 退出</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "headercontent"
    }
</script>

