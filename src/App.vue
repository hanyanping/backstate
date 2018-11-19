<template>
  <div id="app">
      <loading v-if="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
    import Store from './vuex/index';
    import Loading from './components/loading';
export default {
  name: 'App',
    computed: {
        isLoading: function () {
            return Store.state.isLoading
        }
    },
    components: {
        Loading,
    },
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
