<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
export default {
  	name: 'App',
  	data() {
      return {
        moment
      }
    },
}
</script>

<style lang="scss">
#app {
	height: 100%;
}
img{
    width: 100%;
    display: block;
}
::-webkit-scrollbar {
    position: absolute;
    height: 8px;
    width: 8px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
   position: absolute;
    width: 8px;
    min-height: 15px;
    background: rgba(122, 121, 121, 0.6) !important;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}
</style>
