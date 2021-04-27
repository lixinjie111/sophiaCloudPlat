<template>
  <div class="create_form_box">
    <a-form-model ref="createForm" :model="createForm" :rules="createFormRules">
      <a-form-model-item label="应用名称" prop="appName">
        <a-input placeholder="请输入应用名称" v-model="createForm.appName" :maxLength="14"/>
      </a-form-model-item>
      <a-form-model-item label="所属行业" prop="industry">
        <a-select placeholder="请选择行业" v-model="createForm.industry" @change="tradeChange"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
          <a-select-option :value="item.id" v-for="(item,index) in industryList" :key="index">{{item.industry}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="应用描述" prop="description">
        <a-textarea v-model="createForm.description" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入应用描述"
                    :maxLength="100"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  import {getIndustryList} from "@/api/recommendation/index";

  export default {
    name: "CreateForm",
    data() {
      return {
        industryList: [],
        createForm: {
          appName: '',
          industry: undefined,
          description: ''
        },
        createFormRules: {
          appName: [
            {required: true, message: '请输入应用名称', trigger: 'blur'}
          ],
          industry: [
            {required: true, message: '请选择行业', trigger: 'change'}
          ],
          description: [
            {required: true, message: '请输入应用描述', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.getIndustryList();
    },
    methods: {
      getIndustryList() {
        getIndustryList({}).then(res => {
          if (res.code == 200000) {
            this.industryList = res.data;
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

</style>
