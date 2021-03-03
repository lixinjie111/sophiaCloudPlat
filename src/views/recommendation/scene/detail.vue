<template>
  <div class="scene_edit_container">
    <a-button type="primary" class="c-mr-20" @click="edit">编辑</a-button>
  </div>
</template>

<script>
  export default {
    name: "detail",
    methods: {
      edit() {
        this.$router.push({
          path: '/recommendation/scene/edit'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .scene_edit_container {
    padding: 20px;
  }
</style>

