<template>
  <div class="app_scene_container">
    <SetRules></SetRules>
  </div>
</template>

<script>
  import SetRules from "@/components/recommendation/SetRules";

  export default {
    name: "scene",
    components: {SetRules},
  }
</script>

<style scoped lang="scss">
  .app_scene_container {
    padding: 20px;
  }
</style>
