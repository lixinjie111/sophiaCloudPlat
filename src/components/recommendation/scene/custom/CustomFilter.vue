<template>
  <div class="custom_filter">
    请添加过滤规则，您最多能创建5个过滤规则，系统将按您创建的顺序执行过滤规则
    <div class="method_list">
      <p>过滤规则</p>
      <div class="line"></div>
      <ul>
        <li v-for="(item,index) in list" :key="item.id">
          <div>
            <span>过滤规则{{index+1}}:</span>
            <span class="item_name">{{item.name}}</span>
          </div>
          <a-popconfirm
            title="是否删除该条目?"
            ok-text="是"
            cancel-text="否"
            @confirm="delItem(item.id,index)">
            <a-button class="item_del" type="link">删除</a-button>
          </a-popconfirm>            
        </li>          
      </ul>
      <a-button class="add_btn" @click="add" :width="100" v-if="list.length<5">
        <a-icon type="plus" />
      </a-button>
    </div>
    <a-modal centered class="add_modal" destroyOnClose v-model="addModal" title="行为过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" labelAlign="left">
          <a-form-model-item label="策略名称" prop="name">
              <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
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
                    <a-input-number v-model="item.minTime" :min="0" @blur="minChange(item)" />
                  </div>                 
                </div>
                <div style="padding-left:10px">
                  <div style="margin-bottom:6px">时间间隔(天):
                    <a-input-number v-model="item.daySpan" :min="0"/>
                  </div>
                  <div style="display:flex;justify-content:space-between">最大次数:
                    <a-input-number v-model="item.maxTime" :min="0" @blur="maxChange(item)" />
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
              <a-radio-group v-model="radioModel">
                <a-radio :value="'AND'">AND</a-radio>
                <a-radio :value="'OR'">OR</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
    </a-modal>    
  </div>
</template>
<script>
import {getStrategiesDetail, getBehaviorTypes, deleteStrategy, saveFilterRule} from "@/api/recommendation/index"
export default {
  name: "CustomFilter",
  props: {},
  data() {
    return {
        addModal:false,
        behaviorTypes:[],
        behaviorList:[
          {
            type:{
              key:0,
              label:"曝光"
            },
            minTime:"",
            daySpan:"",
            maxTime:""
          }
        ],
        list:[],
        dataForm:{
            name:"",
        },
        rules:{
            name:[{required:true,message:"请输入策略名称",trigger:"blur"}]
        },
        radioModel:'AND'
    };
  },
  methods: {
      delItem(id,index){
        deleteStrategy({id}).then(res=>{
          if(res.data){
            this.list.splice(index,1)
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      add(){
          this.addModal = true
      },
      handleCancel(){
        this.addModal = false
        this.dataForm = {name:""}
        this.behaviorList = [
          {
            type:{
              key:0,
              label:"曝光"
            },
            minTime:"",
            daySpan:"",
            maxTime:""
          }
        ]
        this.radioModel='AND'
      },
      handleOk(){ 
          this.addModal = false
          this.saveFilterRule()
          this.dataForm = {name:""}
          this.behaviorList = [
          {
            type:{
              key:0,
              label:"曝光"
            },
            minTime:"",
            daySpan:"",
            maxTime:""
          }
        ],
        this.radioModel='AND'
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
        if(typeof val.minTime === "number"){
          val.maxTime?val.minTime > val.maxTime ? [val.minTime, val.maxTime] = [val.maxTime, val.minTime]:null:null
        }
      },
      maxChange(val){
        if(typeof val.maxTime === "number"){
          val.minTime?val.maxTime < val.minTime ? [val.minTime, val.maxTime] = [val.maxTime, val.minTime]:null:null
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
            minTime:"",
            daySpan:"",
            maxTime:""
          })
      },
      getList(){
        getStrategiesDetail({id:this.$route.query.sceneId}).then(res=>{
          if(res.code==200000){
            let ary = res.data.filterRuleStrategies
            this.list = ary
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      saveFilterRule(){
        let params = {
          // id:"",
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId, 
          name:this.dataForm.name,
          filterLogic:this.radioModel,
          behaviors:this.behaviorList.map(item=>{
            let obj = {}
            obj.daySpan = item.daySpan
            obj.maxTimes = item.maxTime
            obj.minTimes = item.minTime
            obj.type = item.type.key
            obj.typeDesc = item.type.label
            return obj
          })
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
    this.getBehaviorTypes()
    this.getList()
  }
};
</script>
<style scoped lang="scss">
.custom_filter {
  .method_list {
    padding: 0 24px;
    > p {
      margin: 12px 0;
      font-weight: 600;
    }
    .line {
      width: 100%;
      height: 0;
      border-top: 1px dashed #666;
    }
    ul {
      > li {
        display: flex;
        align-items: center;
        margin: 16px 0;
        .item_name {
          font-weight: 600;
        }
        .item_del {
          margin-left: 40px;
          color: #2373ff;
          cursor: pointer;
        }
      }
    }
    .add_btn {
        margin-top: 20px;        
        width: 50%;
    }
  }
}
</style>
<style lang="scss">
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