<template>
  <div class="custom_recall">
    请至少添加一个召回策略，您最多能创建5个召回策略，系统将按您创建的顺序执行召回策略
    <div class="method_list">
      <p>召回策略</p>
      <div class="line"></div>
      <ul>
        <li v-for="(item,index) in list" :key="item.id">
          <div>
            <span>召回策略{{index+1}}:</span>
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
        <!-- <li>
          <div>
            <span>召回策略1:</span>
            <span class="item_name">基于物品的协同过滤01</span>
          </div>
          <a-popconfirm
            title="是否删除该条目?"
            ok-text="是"
            cancel-text="否"
            @confirm="del">
            <a-button class="item_del" type="link" style="color: red">删除</a-button>
          </a-popconfirm>
        </li> -->
      </ul>
      <a-button class="add_btn" @click="add" :width="100" v-if="list.length<5">
        <a-icon type="plus" />
      </a-button>
    </div>
    <a-modal centered destroyOnClose v-model="addModal" title="基于物品的协同过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" labelAlign="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item label="策略名称" prop="name">
            <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="时间跨度（天）" prop="date">
            <a-input placeholder="请输入时间跨度（天）" v-model="dataForm.date"/>
        </a-form-model-item>
        <a-form-model-item label="推荐商品数" prop="num">
            <a-input-number placeholder="请输入推荐商品数" style="width:100%" v-model="dataForm.num" :min="0" :max="100"/>
        </a-form-model-item>
      </a-form-model>
      <!-- <template slot="footer">
          <a-button type="pro" @click="handleOk">确认</a-button>
          <a-button @click="handleCancel">取消</a-button>
      </template> -->
    </a-modal>
  </div>
</template>
<script>
import {getStrategiesDetail, saveRecallStrategy, deleteStrategy} from "@/api/recommendation/index"
export default {
  name: "CustomRecall",
  props: {},
  data() {
    return {
        list:[],
        addModal:false,
        dataForm:{
            name:"",
            date:"",
            num:""
        },
        rules:{
            name:[{required:true,message:"请输入策略名称",trigger:"blur"}],
            date:[{required:true,message:"请输入时间跨度（天）",trigger:"blur"}],
            num:[{required:true,message:"请输入推荐商品数",trigger:"blur"}]
        }
    };
  },
  methods: {
      add(){
          this.addModal = true
      },
      handleCancel(){
        this.addModal = false
        this.dataForm = {
          name:"",
          date:"",
          num:""
        }
      },
      handleOk(){
          this.addModal = false
          // this.list.push({name:this.dataForm.name})
          this.save()
          this.dataForm = {
            name:"",
            date:"",
            num:""
          }          
      },
      getList(){
        getStrategiesDetail({id:this.$route.query.sceneId}).then(res=>{
          if(res.code==200000){
            let ary = res.data.recallStrategies
            this.list = ary
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      save(){
        let params = {
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId,
          strategyType:0,
          name:this.dataForm.name,
          // id:, //召回策略主键ID，用于修改
          daySpan:this.dataForm.date,
          goodsNum:this.dataForm.num
        }
        saveRecallStrategy(params).then(res=>{
          if(res.data){this.getList()}
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      delItem(id,index){
        deleteStrategy({id}).then(res=>{
          if(res.data){
            this.list.splice(index,1)
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      }
  },
  mounted(){
    this.getList()
  }
};
</script>
<style scoped lang="scss">
.custom_recall {
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