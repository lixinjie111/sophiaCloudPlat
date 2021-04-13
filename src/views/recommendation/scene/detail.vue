<template>
  <div class="scene_edit_container">

  </div>
</template>

<script>
  import {getSceneDetail} from "@/api/recommendation/index";

  export default {
    name: "detail",
    created() {
      this.getSceneDetail();
    },
    methods: {
      getSceneDetail() {
        let params = {
          id: this.$route.query.id
        };
        getSceneDetail(params).then(res => {
          if (res.code == 200000) {
            console.log(res);
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
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

