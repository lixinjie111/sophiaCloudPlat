<template>
  <div class="custom_sort">
    请添加排序策略，您最多能创建3个排序策略，系统将按您创建的顺序执行排序策略
    <div class="method_list">
      <p>排序策略</p>
      <div class="line"></div>
      <ul>
        <li v-for="(item,index) in list" :key="item.id">
          <div>
            <span>排序策略{{index+1}}:</span>
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
    <a-modal centered destroyOnClose v-model="addModal" title="梯度下降树(GBDT)" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-model-item label="策略名称" prop="name">
              <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
          </a-form-model-item>
        </a-form-model>
        <a-row>
          <a-col :span="6">选择算法模式:</a-col>
          <a-col :span="18">
            <a-select v-model="algorithmMode">
              <a-select-option :value="0">训练模式</a-select-option>
              <a-select-option :value="1">测试模式</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">时间跨度(天):</a-col>
          <a-col :span="18">
            <a-input-number v-model="daySpan"></a-input-number>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">是否重新训练</a-col>
          <a-col :span="18">
            <a-radio-group v-model="retrainFlag">
              <a-radio :value="0">开启</a-radio>
              <a-radio :value="1">关闭</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">商品参与训练得特征</a-col>
          <a-col :span="18">
            <a-select labelInValue v-model="curGoodsFeature">
              <a-select-option v-for="item in goodsFeatures" :key="item.goodsFeature">{{item.goodsFeatureField}}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">用户参与训练得特征</a-col>
          <a-col :span="18">
            <a-select labelInValue v-model="curUserFeature">
              <a-select-option v-for="item in userFeatures" :key="item.userFeature">{{item.userFeatureField}}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">随机种子数</a-col>
          <a-col :span="18">
            <a-input-number></a-input-number>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">学习率</a-col>
          <a-col :span="18">
            <a-input-number></a-input-number>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">决策数深度</a-col>
          <a-col :span="18">
            <a-input-number></a-input-number>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">迭代步数</a-col>
          <a-col :span="18">
            <a-input-number></a-input-number>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">商品筛选SQL</a-col>
          <a-col :span="18">
            <a-input></a-input>
          </a-col>
        </a-row>
      
    </a-modal>    
  </div>
</template>
<script>
import {getStrategiesDetail, deleteStrategy, saveSortStrategy, getGoodsFeatures, getUserFeatures} from "@/api/recommendation/index"
export default {
  name: "CustomSort",
  props: {},
  data() {
    return {
        list:[],
        addModal:false,
        dataForm:{
            name:""
        },
        rules:{
            name:[{required:true,message:"请输入策略名称",trigger:"blur"}]
        },
        algorithmMode:0,
        daySpan:"",
        retrainFlag:0,
        curGoodsFeature:{},
        goodsFeatures:[],
        curUserFeature:{},
        userFeatures:[]

    };
  },
  methods: {
      delItem(id,index){
          console.log(id,index)
      },
      add(){
          this.addModal = true
      },
      handleCancel(){
        this.addModal = false
      },
      handleOk(){
        this.addModal = false
      },
      // 商品参与训练的特征
      getGoodsFeatures(){
        getGoodsFeatures({}).then(res=>{
          this.goodsFeatures = res.data
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      // 用户参与训练的特征
      getUserFeatures(){
        getUserFeatures({}).then(res=>{
          this.userFeatures = res.data
        }).catch(err=>{
          this.$message.error(err.message)
        })
      }
  },
  mounted(){
    this.getGoodsFeatures()
    this.getUserFeatures()
  }
};
</script>
<style scoped lang="scss">
.custom_sort {
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