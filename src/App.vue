<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components:{}
  }
</script>

<style>
/* 消除浏览器默认样式 */
html,body{
  margin:0;
  padding:0;
}

#app {
  height: 100vh;
}
</style>
