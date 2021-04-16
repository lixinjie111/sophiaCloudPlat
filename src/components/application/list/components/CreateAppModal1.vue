<template>
  <a-modal v-model="visible" title="创建应用" @cancel="onCancel" @ok="handleOk" width="488px" wrapClassName="wrapClassName">
    <div class="row mg0">
      <div class="label must">应用名称</div>
      <div><a-input placeholder="请输入应用名称" v-model="name"/></div>
    </div>
    <div class="row">
      <div class="label must">所属行业</div>
      <div>
        <a-select style="width: 100%" placeholder="请选择所属行业" v-model="industry">
          <a-select-option :value="it.industry" v-for="it in industryList" :key="it.industry">{{it.industry}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="row">
      <div class="label must">应用描述</div>
      <div> <a-textarea placeholder="请输入应用描述" style="height: 96px" v-model="desc">
      </a-textarea></div>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="handleSubmit">
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import { getIndustryOptions, saveApplication } from '@/api/application';
  export default {
    data(){
      return{
        visible:true,
        industry: '',
        name: '',
        desc: '',
        industryList:[],
      }
    },
    created(){
      this.getIndustryOptions();
    },
    methods: {
      onCancel(){
        this.$emit('cancel')
      },
      verification(){
        if(!this.industry){
          this.$message.warning('请选择行业')
          return
        }else if(!this.name){
          this.$message.warning('请输入应用名称')
          return
        }else if(!this.desc) {
          this.$message.warning('请输入应用描述')
          return
        }
        return true
      },
      // 获取行业下拉选项
      getIndustryOptions(){
        getIndustryOptions().then((res)=>{
          this.industryList = res.data
        })
      },
      // 完成时
      handleSubmit(){
        const parmas = { appName: this.name, industry: this.industry, description: this.desc }
        const flag = this.verification();
        if(flag){
          saveApplication(parmas).then((res)=>{
            this.$message.success('创建应用成功')
            this.onCancel()
            this.$emit('refreshList')
          })
        }

      },
    }
  }
</script>

<style scoped lang="scss">
  .wrapClassName{
    padding: 60px;
  }
  .row.mg0{
    margin: 0;
  }
  .row{
   margin: 24px 0;
  }
  .must{
    &:before{
      content: '*';
      color: red;
    }
  }

</style>
