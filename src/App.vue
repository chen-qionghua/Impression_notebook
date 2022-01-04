<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>

import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {Sidebar}
}
</script>

<style scoped>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
*::after,*::before {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
body { overflow:scroll;overflow-y:hidden; }
#app {
  height: 100vh;
  overflow:hidden;
}


body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}


a {
  text-decoration: none;
  color: #444;
}

ul, li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}


#app {
  display: flex;
  align-items: stretch;
}
</style>
