<template>
  <div class="apiMan_container">
      <div class="select_area_container"></div>
      <div class="fangwen_area_container"></div>
      <div class="nengli_area_container"></div>
  </div>
</template>

<script>
export default {
  name:'apiMan'
}
</script>

<style lang="scss" scoped>
.apiMan_container{
    width: 100%;
    height:100%;
    .select_area_container{
      width: 100%;
      height:80px;
      margin-bottom: 10px;
      background-color: brown;
    }
    .fangwen_area_container{
      width: 100%;
      height: 316px;
      margin-bottom: 13px;
      background-color: chartreuse;
    }
    .nengli_area_container{
      width: 100%;
      height: 620px;
      background-color: darkolivegreen;
    }
}
</style>
