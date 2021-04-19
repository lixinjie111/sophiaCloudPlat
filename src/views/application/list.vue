<template>
  <div class="container">
<!--    <template><init-page></init-page></template>-->
    <template><list-page></list-page></template>
  </div>
</template>

<script>
  import InitPage from '@/components/application/list/InitPage'
  import ListPage from '@/components/application/list/ListPage'
  export default {
    name: 'applicationList',
    components: { InitPage, ListPage }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
     padding:24px;
  }
</style>
