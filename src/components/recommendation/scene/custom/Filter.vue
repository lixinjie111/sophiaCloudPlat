<template>
    <a-modal class="add_modal" :footer="footer" centered destroyOnClose v-model="addModal" title="行为过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="detailData" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" labelAlign="left">
          <a-form-model-item label="策略名称" prop="name">
              <a-input placeholder="请输入策略名称" v-model="detailData.name" disabled/>
          </a-form-model-item>
        </a-form-model>
          <a-row class="filter_behavior">
            <a-col :span="4" style="padding-left:10px">过滤行为:</a-col>  
            <a-col :span="20" class="flex_box">
              <div class="behavior_item" v-for="(item,index) in detailData.behaviors" :key="index">
                <div>
                  <div style="margin-bottom:6px">行为类型:
                    <a-select labelInValue v-model="item.typeDesc" style="width:100px">
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
              <a-radio-group v-model="detailData.filterLogic" disabled>
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
    name:"Filter",
    props:{
      curOpt:{
        type:String
      },
      detailData:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    computed:{
        footer(){
            if(this.curOpt=='detail'){
                return null
            }
        },
        disabled(){
          if(this.curOpt=='detail'){
            return true
          }else{
            return false
          }
        }
    },
    data(){
      return {
        addModal:true,
        rules:{
          name:[{required:true,message:"请输入策略名称",trigger:"blur"}]
        },
        behaviorTypes:[],
      }
    },
    methods:{
      handleCancel(){
          // console.log('cancel')
          this.addModal = false
          this.$emit('initType')
      },
      handleOk(){
        // console.log('ok')
        this.addModal = false
        this.$emit('initType')
        // this.saveFilterRule()
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
        // if(typeof val.minTime === "number"){
        //   val.maxTime?val.minTime > val.maxTime ? [val.minTime, val.maxTime] = [val.maxTime, val.minTime]:null:null
        // }
      },
      maxChange(val){
        // if(typeof val.maxTime === "number"){
        //   val.minTime?val.maxTime < val.minTime ? [val.minTime, val.maxTime] = [val.maxTime, val.minTime]:null:null
        // }
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
            minTime:"",
            daySpan:"",
            maxTime:""
          })
      }, 
      saveFilterRule(){
        let params = {
          // id:"",
          // applicationId:this.$route.query.appId,
          // sceneId:this.$route.query.sceneId, 
          // name:this.dataForm.name,
          // filterLogic:this.radioModel,
          // behaviors:this.behaviorList.map(item=>{
          //   let obj = {}
          //   obj.daySpan = item.daySpan
          //   obj.maxTimes = item.maxTime
          //   obj.minTimes = item.minTime
          //   obj.type = item.type.key
          //   obj.typeDesc = item.type.label
          //   return obj
          // })
        }
        saveFilterRule(params).then(res=>{
          if(res.code==200000){
            if(res.data){this.getList()}
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      }                               
    },
    mounted(){
      console.log('filter')
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