<template>
  <div>
    <el-button size="mini" plain @click="saveRes" v-if="saveData.data">保存结果</el-button>
    <el-button
      size="mini"
      plain
      @click="ExportSavePdf(saveData.title, saveData.dom)"
      >导出PDF</el-button
    >
    <el-button size="mini" plain @click="help">帮助</el-button>
  </div>
</template>
<script>
import { saveModel } from "@/api/algorithm";
export default {
  props: ["saveData"],
  data() {
    return {};
  },
  methods: {
    saveRes() {
      let params = this.saveData.data;
      if(this.saveData.model_info2){
        this.saveModel(this.saveData.model_info2)
      }
      this.saveModel(params)
    },
    saveModel(params){
      saveModel(params)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              duration: "1500",
              message: res.message || "保存成功",
              showClose: true
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
