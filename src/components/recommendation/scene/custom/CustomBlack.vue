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
            @confirm="del(item,index)">
            <a-button class="item_del" type="link" style="color: red">删除</a-button>
          </a-popconfirm>            
        </li>          
      </ul>
      <a-button class="add_btn" @click="add" :width="100" v-if="list.length<5">
        <a-icon type="plus" />
      </a-button>
    </div>
    <a-modal destroyOnClose v-model="addModal" title="基于物品的协同过滤" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" destroyOnClose>
        <a-form-model :model="dataForm" :rules="rules">
        <a-form-model-item label="策略名称" prop="name">
            <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="时间跨度（天）" prop="date">
            <a-input placeholder="请输入时间跨度（天）" v-model="dataForm.date"/>
        </a-form-model-item>
        <a-form-model-item label="推荐商品数" prop="num">
            <a-input-number placeholder="请输入推荐商品数" width="200" v-model="dataForm.num" :min="0" :max="100"/>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
          <a-button key="submit" @click="handleOk">确认</a-button>
          <a-button key="back" @click="handleCancel">取消</a-button>
      </template>
    </a-modal>    
  </div>
</template>
<script>
export default {
  name: "CustomBlack",
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
      del(item){
          console.log(item,index)
          this.list.splice(index,1)
      },
      add(){
          this.addModal = true
      },
      handleCancel(){

      },
      handleOk(){
          this.addModal = false
          this.list.push({name:this.dataForm.name})
      }      
  },
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