<template>
  <div class="scene_rule_container">
    <!--智能场景规则-->
    <template v-if="sceneType == '0'">
      <SetRules></SetRules>
    </template>
    <!--自定义场景规则-->
    <template v-if="sceneType == '1'">

    </template>
  </div>
</template>

<script>
  import SetRules from "@/components/recommendation/scene/SetRules";

  export default {
    name: "scene",
    computed: {
      // 场景类型 0-智能场景 1-自定义场景 2-模板场景
      sceneType() {
        return JSON.parse(localStorage.getItem('sceneInfo')).sceneType
      }
    },
    components: {SetRules},
  }
</script>

<style scoped lang="scss">
  .scene_rule_container {
    padding: 20px;
  }
</style>
