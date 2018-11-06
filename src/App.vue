<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data() {
        return {
            router:'home'
        };
    },
}
</script>

<style>
#app {
  font-family: PingFang SC, Microsoft YaHei UI, Microsoft YaHei,"微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
