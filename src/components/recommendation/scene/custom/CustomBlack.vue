<template>
  <div class="custom_back">
    请添加黑名单，您最多能添加5个黑名单，系统将按您创建的顺序执行黑名单
    <div class="method_list">
      <p>添加黑名单</p>
      <div class="line"></div>
      <ul>
        <li v-for="(item,index) in list" :key="item.name">
          <div>
            <span>黑名单{{index+1}}:</span>
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
    <a-modal centered destroyOnClose v-model="addModal" title="添加黑名单" @cancel="handleCancel" @ok="handleOk">
    <a-row>
      <a-col :span="6">选择黑名单类型:</a-col>
      <a-col :span="18">
        <a-radio-group v-model="radioModel" @change="radioChange">
          <a-radio :value="1">物品</a-radio>
          <a-radio :value="2">资讯</a-radio>
          <a-radio :value="3">活动</a-radio>
          <a-radio :value="4">用户</a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px">
      <a-col :span="6">选择黑名单:</a-col>
      <a-col :span="18">
        <a-select v-model="blackId" :defaultActiveFirstOption="false" style="width:100%">
          <a-select-option v-for="item in blackList" :key="item.id">{{item.userTableName}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    </a-modal>    
  </div>
</template>
<script>
import {getStrategiesDetail, deleteStrategy, getBlackList, saveBlack} from "@/api/recommendation/index"
export default {
  name: "CustomBlack",
  props: {},
  data() {
    return {
        list:[],
        addModal:false,
        radioModel:1,
        blackId:"",
        blackList:[]        
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
        this.radioModel = 1
        this.blackId = ""
      },
      handleOk(){
        this.addModal = false
        this.saveBlack()
        this.radioModel = 1
        this.blackId = ""
      },
      async getBlackList(){
        try{
          let res = await getBlackList({blacklistType:this.radioModel})
          if(res.code==200000){
            this.blackList = res.data
          }
        }catch(err){
          this.$message.error(err.message)
        }
      },
      getList(){
        getStrategiesDetail({id:this.$route.query.sceneId}).then(res=>{
          if(res.code==200000){
            let ary = res.data.blankList
            this.list = ary
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },  
      saveBlack(){
        let params = {
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId, 
          // id:"",
          blacklistId:this.blackId,
          type:this.radioModel
        }
        saveBlack(params).then(res=>{
          if(res.code==200000){
            if(res.data){this.getList()}
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      radioChange(){
        this.blackId = ""
        this.getBlackList()
      }   
  },
  mounted(){
    this.getBlackList()
    this.getList()
    
  }
};
</script>
<style scoped lang="scss">
.custom_back {
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