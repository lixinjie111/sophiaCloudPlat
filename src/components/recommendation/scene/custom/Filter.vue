<template>
    <a-modal class="add_modal" :footer="null" centered destroyOnClose v-model="addModal" title="行为过滤" @cancel="handleCancel" @ok="handleOk">
        <a-row style="margin-bottom:6px">
          <a-col :span="4">策略名称:</a-col>
          <a-col :span="20">{{detailData.name}}</a-col>
        </a-row>
          <a-row class="filter_behavior">
            <a-col :span="4">过滤行为:</a-col>  
            <a-col :span="20" class="flex_box">
              <div class="behavior_item" v-for="(item,index) in detailData.behaviors" :key="index">
                <div>
                  <div style="margin-bottom:6px">行为类型:
                    {{item.typeDesc}}
                  </div>
                  <div>最少次数: 
                    {{item.minTimes}}
                  </div>                 
                </div>
                <div>
                  <div style="margin-bottom:6px">时间间隔(天):
                    {{item.daySpan}}
                  </div>
                  <div style="display:flex;justify-content:space-between">最大次数:
                    {{item.maxTimes}}
                  </div>
                </div> 
              </div>
            </a-col>
          </a-row> 
          <a-row>
            <a-col :span="4">过滤逻辑</a-col>
            <a-col :span="20">
              <a-radio-group v-model="detailData.filterLogic" disabled>
                <a-radio :value="'AND'">AND</a-radio>
                <a-radio :value="'OR'">OR</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
    </a-modal> 
</template>
<script>
export default {
    name:"Filter",
    props:{
      detailData:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return {
        addModal:true,
        rules:{
          name:[{required:true,message:"请输入策略名称",trigger:"blur"}]
        },
      }
    },
    methods:{
      handleCancel(){
          this.addModal = false
          this.$emit('initType')
      },
      handleOk(){
        this.addModal = false
        this.$emit('initType')
      }                              
    }
}
</script>
<style scoped lang="scss">
  .add_modal{
    .filter_behavior{
      p{color: rgba(0,0,0,0.85);
        font-size: 14px;}
      .flex_box{
        .behavior_item{
          padding: 16px 10px;
          margin-bottom: 10px;
          background: rgb(238, 234, 235);
          border-radius: 4px;
          display: flex;
          flex-wrap: wrap;
          >div{
            width: 50%;
          }
        }
      }
    }
    .modal_btn{
      margin-bottom: 10px;
      width: 100%;
    }
  }
</style>