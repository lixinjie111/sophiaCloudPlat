<template>
  <div class="scene_data_container">
    <SetData></SetData>
  </div>
</template>

<script>
  import SetData from "@/components/recommendation/scene/SetData";

  export default {
    name: "data",
    components: {SetData}
  }
</script>

<style scoped lang="scss">
  .scene_data_container {
    padding: 20px;
  }
</style>
