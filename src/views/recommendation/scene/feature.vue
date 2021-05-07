<template>
  <div class="scene_feature_container">
    <SetFeature></SetFeature>
  </div>
</template>

<script>
  import SetFeature from "@/components/recommendation/scene/SetFeature";

  export default {
    name: "feature",
    components: {SetFeature}
  }
</script>

<style scoped lang="scss">
  .scene_feature_container {
    padding: 20px;
  }
</style>
