<template>
  <a-modal v-model="visible" @cancel="onCancel" @ok="handleOk" width="488px" wrapClassName="wrapClassName">
    <div class="row mg0">
      <div class="label must">应用名称</div>
      <div><a-input placeholder="请输入应用名称" v-model="name"/></div>
    </div>
    <div class="row">
      <div class="label must">所属行业</div>
      <div>
        <a-select style="width: 100%" placeholder="请选择所属行业" v-model="industry">
          <a-select-option :value="it.value" v-for="it in industryList" :key="it.value">{{it.name}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="row">
      <div class="label must">应用描述</div>
      <div> <a-textarea placeholder="请输入应用描述" style="height: 96px" v-model="desc">
        <span slot="suffix">
          111
        </span>
      </a-textarea></div>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="handleCancel">
        创建
      </a-button>
      <a-button @click="onNext">
        下一步
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  export default {
    data(){
      return{
        visible:true,
        // 行业下拉选项
        industryList: [
          { name: '教育培训', value: '教育培训'},
          { name: '文化娱乐', value: '文化娱乐'},
          { name: '视频直播', value: '视频直播'},
          { name: '游戏', value: '游戏'},
          { name: '交通出行', value: '交通出行'},
          { name: '电子商务', value: '电子商务'},
          { name: '金融', value: '金融'},
          { name: '零售', value: '零售'},
          { name: '酒店旅游', value: '酒店旅游'},
          { name: '企业服务', value: '企业服务'},
          { name: '物流货运', value: '物流货运'},
          { name: '生活服务', value: '生活服务'},
          { name: '医疗健康', value: '医疗健康'},
          { name: '房产家装', value: '房产家装'},
          { name: '商业地产', value: '商业地产'},
          { name: '制造业', value: '制造业'},
          { name: '法律政务', value: '法律政务'},
          { name: '安防监控', value: '安防监控'},
          { name: '软件工具', value: '软件工具'},
          { name: '智能手机', value: '智能手机'},
          { name: '其他', value: '其他'},
        ],
        industry: [],
        name: '',
        desc: '',
      }
    },
    created(){
      console.log(111)
    },
    methods: {
      onCancel(){
        this.$emit('cancel')
      },
      onNext(){
        const flag = this.verification();
        if(flag){
          this.$emit('next', { industry: this.industry, name: this.name, desc: this.desc })
        }

      },
      onCreate(){
        const flag = this.verification();
        if(flag){
          this.$emit('create', { industry: this.industry, name: this.name, desc: this.desc })
        }
      },
      verification(){
        console.log(this.industry)
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
      }
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
