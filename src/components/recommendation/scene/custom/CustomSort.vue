<template>
  <div class="custom_sort">
    请添加排序策略，您最多能创建2个排序策略，系统将按您创建的顺序执行排序策略
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
      <a-button class="add_btn" @click="add" :width="100" v-if="list.length<2">
        <a-icon type="plus" />
      </a-button>
    </div>
    <a-modal centered destroyOnClose v-model="addModal" title="梯度下降树(GBDT)" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-model-item label="策略名称" prop="name">
              <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
          </a-form-model-item>
        </a-form-model>
        <a-row class="mb24">
          <a-col :span="6">选择算法模式:</a-col>
          <a-col :span="18">
            <a-select v-model="algorithmMode">
              <a-select-option :value="0">训练模式</a-select-option>
              <a-select-option :value="1">测试模式</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">时间跨度(天):</a-col>
          <a-col :span="18">
            <a-input-number v-model="daySpan"></a-input-number>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">是否重新训练</a-col>
          <a-col :span="18">
            <a-radio-group v-model="retrainFlag">
              <a-radio :value="0">开启</a-radio>
              <a-radio :value="1">关闭</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">商品参与训练得特征</a-col>
          <a-col :span="18">
            <a-select labelInValue v-model="curGoodsFeature" style="width:120px">
              <a-select-option v-for="item in goodsFeatures" :key="item.goodsFeature">{{item.goodsFeatureField}}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">用户参与训练得特征</a-col>
          <a-col :span="18">
            <a-select labelInValue v-model="curUserFeature" style="width:100px">
              <a-select-option v-for="item in userFeatures" :key="item.userFeature">{{item.userFeatureField}}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">随机种子数</a-col>
          <a-col :span="18">
            <a-input-number v-model="randomSeedNum"></a-input-number>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">学习率</a-col>
          <a-col :span="18">
            <a-input-number v-model="learningRate"></a-input-number>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">决策数深度</a-col>
          <a-col :span="18">
            <a-input-number v-model="treeDepth"></a-input-number>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">迭代步数</a-col>
          <a-col :span="18">
            <a-input-number v-model="iterations"></a-input-number>
          </a-col>
        </a-row>
        <a-row class="mb24">
          <a-col :span="6">商品筛选SQL</a-col>
          <a-col :span="18">
            <a-textarea :row="6" v-model="filterSql"></a-textarea>
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
        userFeatures:[],
        randomSeedNum:"",
        iterations:"",
        learningRate:"",
        treeDepth:"",
        filterSql:""

    };
  },
  methods: {
      initData(){
        this.dataForm.name=""
        this.algorithmMode=0
        this.daySpan=""
        this.retrainFlag=0
        this.curGoodsFeature={}
        this.curUserFeature={}
        this.randomSeedNum=""
        this.iterations=""
        this.learningRate=""
        this.treeDepth=""
        this.filterSql=""
      },
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
        this.initData()
      },
      handleOk(){
        this.addModal = false
        this.saveSortStrategy()
        this.initData()
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
      },
      getList(){
        getStrategiesDetail({id:this.$route.query.sceneId}).then(res=>{
          if(res.code==200000){
            this.list = res.data.sortStrategies
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      saveSortStrategy(){
        let params = {
          // id:"",
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId, 
          name:this.dataForm.name,
          algorithmMode:this.algorithmMode,
          daySpan:this.daySpan,
          retrainFlag:this.retrainFlag,
          goodsFeatures:[{goodsFeature:this.curGoodsFeature.label,goodsFeatureField:this.curGoodsFeature.key}],
          userFeatures:[{userFeature:this.curUserFeature.label,userFeatureField:this.curUserFeature.key}],
          randomSeedNum:this.randomSeedNum,
          learningRate:this.learningRate,
          treeDepth:this.treeDepth,
          iterations:this.iterations,
          filterSql:this.filterSql,
          strategyType:0
        }
        saveSortStrategy(params).then(res=>{
          if(res.code==200000){
            if(res.data){this.getList()}
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      }
  },
  mounted(){
    this.getList()
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
<style scoped>
  .mb24{
    margin-bottom: 24px;
  }
</style>