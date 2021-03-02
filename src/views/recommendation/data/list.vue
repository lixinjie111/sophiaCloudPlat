<template>
  <div class="data-admin">
      <div class="top">
          <div class="left">
            <a-button type="primary" @click="upload" style="margin-right: 10px">上传数据</a-button>
            <a-button type="primary" @click="exportTable" icon="plus">文件夹</a-button>
          </div>
          <div class="operate"></div>
      </div>
      <div class="table">

      </div>
  </div>
</template>

<script>
export default {
    name:"list",
    data(){
        return{

        }
    },
    methods:{
        upload(){}
    }
}
</script>

<style scoped lang="scss">
.data-admin{
    .top{
        .left{

        }
    }
}
</style>