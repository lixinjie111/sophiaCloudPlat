<template>
  <div class="app_data_container">
    <SetData></SetData>
  </div>
</template>

<script>
  import SetData from "@/components/recommendation/SetData";

  export default {
    name: "data",
    components: {SetData}
  }
</script>

<style scoped lang="scss">
  .app_data_container {
    padding: 20px;
  }
</style>
