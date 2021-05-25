<template>
    <a-modal class="add_modal" centered destroyOnClose v-model="addModal" title="行为过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" labelAlign="left">
          <a-form-model-item label="策略名称" prop="name">
              {{dataForm.name}}
          </a-form-model-item>
        </a-form-model>
          <a-row class="filter_behavior">
            <a-col :span="4" style="padding-left:10px">过滤行为:</a-col>  
            <a-col :span="20" class="flex_box">
              <div class="behavior_item" v-for="(item,index) in behaviorList" :key="index">
                <div>
                  <div style="margin-bottom:6px">行为类型:
                    <a-select labelInValue v-model="item.type" style="width:100px">
                      <a-select-option v-for="ele in behaviorTypes" :key="ele.id">{{ele.name}}</a-select-option>
                    </a-select>
                  </div>
                  <div>最少次数: 
                    <a-input-number v-model="item.minTimes" :min="0" @change="minChange(item)" />
                  </div>                 
                </div>
                <div style="padding-left:10px">
                  <div style="margin-bottom:6px">时间间隔(天):
                    <a-input-number v-model="item.daySpan" :min="0"/>
                  </div>
                  <div style="display:flex;justify-content:space-between">最大次数:
                    <a-input-number v-model="item.maxTimes" :min="0" @change="maxChange(item)" />
                  </div>
                </div>
                <a-button class="modal_del" icon="close" size="small" @click="delBehavior(index)"></a-button> 
              </div>
            </a-col>
          </a-row> 
          <a-button class="modal_btn" @click="addBehavior">
            <a-icon type="plus" />
          </a-button>
          <a-row>
            <a-col :span="4" style="padding-left:10px">过滤逻辑</a-col>
            <a-col :span="20">
              <a-radio-group v-model="dataForm.filterLogic">
                <a-radio :value="'AND'">AND</a-radio>
                <a-radio :value="'OR'">OR</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
    </a-modal> 
</template>
<script>
import {getBehaviorTypes, saveFilterRule} from "@/api/recommendation/index"
export default {
    name:"FilterEdit",
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
        dataForm:{...this.detailData},
        behaviorList:this.detailData.behaviors.map(item=>{
            let obj = {...item}
            obj.type = {key:item.type,label:item.typeDesc}
            return obj
        }),
        behaviorTypes:[],
      }
      
    },
    methods:{
      handleCancel(){
          this.addModal = false
          this.$emit('refresh')
      },
      handleOk(){
        this.addModal = false
        this.saveFilterRule()
      },
      getBehaviorTypes(){
        getBehaviorTypes({}).then(res=>{
          if(res.code==200000){
            this.behaviorTypes = res.data
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },   
      minChange(val){
        if(typeof val.minTimes === "number"){
          val.maxTimes?val.minTimes > val.maxTimes ? [val.minTimes, val.maxTimes] = [val.maxTimes, val.minTimes]:null:null
        }
      },
      maxChange(val){
        if(typeof val.maxTimes === "number"){
          val.minTimes?val.maxTimes < val.minTimes ? [val.minTimes, val.maxTimes] = [val.maxTimes, val.minTimes]:null:null
        }
      }, 
      delBehavior(index){
        this.behaviorList.splice(index,1)
      },
      addBehavior(){
        this.behaviorList.push({
            type:{
                key:0,
                label:"曝光"
            },
            minTimes:"",
            daySpan:"",
            maxTimes:""
          })
      }, 
      saveFilterRule(){
        let params = {
          id:this.dataForm.id,
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId, 
          name:this.dataForm.name,
          filterLogic:this.dataForm.filterLogic,
          behaviors:this.behaviorList.map(item=>{
            let obj = {}
            obj.daySpan = item.daySpan
            obj.maxTimes = item.maxTimes
            obj.minTimes = item.minTimes
            obj.type = item.type.key
            obj.typeDesc = item.type.label
            return obj
          })
        }
        saveFilterRule(params).then(res=>{
          if(res.code==200000){
            if(res.data){this.$emit('refresh')}
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      }                               
    },
    mounted(){
      this.getBehaviorTypes()
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
          position: relative;
          padding: 16px 10px;
          margin-bottom: 10px;
          background: rgb(238, 234, 235);
          border-radius: 4px;
          display: flex;
          flex-wrap: wrap;
          .modal_del{
            position: absolute;
            top: 0;
            right: 0;
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