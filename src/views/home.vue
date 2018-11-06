<style rel="stylesheet/scss" lang="scss"  scoped>
.content{
    display: flex;
    .contanter{
        background: #f00;
        flex:1;
    }
}
</style>
<template>
    <div class="home">
        <div class="content">
            <Aside></Aside>
            <div class="contanter">
                <el-time-picker
                        v-model="value2"
                        :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
                        placeholder="任意时间点">
                </el-time-picker>
                <el-time-picker
                        arrow-control
                        v-model="value3"
                        :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
                        placeholder="任意时间点">
                </el-time-picker>
            </div>
        </div>
    </div>
</template>

<script>
    import Aside from '../components/aside'
    export default {
        name: "home",
        data() {
            return {
                value2: new Date(2016, 9, 10, 18, 40),
                value3: new Date(2016, 9, 10, 18, 40)
            };
        },
        components:{
            Aside,
        },
    }
</script>

