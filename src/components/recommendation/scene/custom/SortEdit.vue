<template>
  <a-modal
    centered
    destroyOnClose
    v-model="addModal"
    title="梯度下降树(GBDT)"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-row class="mb24">
        <a-col :span="6">策略名称:</a-col>
        <a-col :span="18">{{dataForm.name}}</a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">选择算法模式:</a-col>
      <a-col :span="18">
        <a-select v-model="dataForm.algorithmMode">
            <a-select-option :value="0">训练模式</a-select-option>
            <a-select-option :value="1">测试模式</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">时间跨度(天):</a-col>
      <a-col :span="18">
        <a-input-number v-model="dataForm.daySpan"></a-input-number>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">是否重新训练:</a-col>
      <a-col :span="18">
        <a-radio-group v-model="dataForm.retrainFlag">
            <a-radio :value="0">开启</a-radio>
            <a-radio :value="1">关闭</a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="8">商品参与训练得特征:</a-col>
      <a-col :span="16">
            <a-select labelInValue v-model="curGoodsFeature" style="width:120px">
              <a-select-option v-for="item in goodsFeatures" :key="item.goodsFeature">{{item.goodsFeatureField}}</a-select-option>
            </a-select>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="8">用户参与训练得特征:</a-col>
      <a-col :span="16">
            <a-select labelInValue v-model="curUserFeature" style="width:100px">
              <a-select-option v-for="item in userFeatures" :key="item.userFeature">{{item.userFeatureField}}</a-select-option>
            </a-select>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">随机种子数:</a-col>
      <a-col :span="18">
        <a-input-number v-model="dataForm.randomSeedNum"></a-input-number>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">学习率:</a-col>
      <a-col :span="18">
        <a-input-number v-model="dataForm.learningRate"></a-input-number>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">决策数深度:</a-col>
      <a-col :span="18">
        <a-input-number v-model="dataForm.tree_depth"></a-input-number>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">迭代步数:</a-col>
      <a-col :span="18">
        <a-input-number v-model="dataForm.iterations"></a-input-number>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">商品筛选SQL:</a-col>
      <a-col :span="18">
        <a-textarea :row="6" v-model="dataForm.filterSql"></a-textarea>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import {saveSortStrategy, getGoodsFeatures, getUserFeatures} from "@/api/recommendation/index"
export default {
  name: "Sort",
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      addModal: true,
      dataForm:{...this.detailData},
      curGoodsFeature:{key:this.detailData.goodsFeatures[0].goodsFeatureField,label:this.detailData.goodsFeatures[0].goodsFeature},
      goodsFeatures:[],
      curUserFeature:{key:this.detailData.userFeatures[0].userFeatureField,label:this.detailData.userFeatures[0].userFeature},
      userFeatures:[],
    };
  },
  methods: {
    handleCancel() {
      this.addModal = false;
      this.$emit("refresh");
    },
    handleOk() {
      this.addModal = false;
      this.saveSortStrategy()
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
      saveSortStrategy(){
        let params = {
          id:this.detailData.id,
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId, 
          name:this.dataForm.name,
          algorithmMode:this.dataForm.algorithmMode,
          daySpan:this.dataForm.daySpan,
          retrainFlag:this.dataForm.retrainFlag,
          goodsFeatures:[{goodsFeature:this.curGoodsFeature.label,goodsFeatureField:this.curGoodsFeature.key}],
          userFeatures:[{userFeature:this.curUserFeature.label,userFeatureField:this.curUserFeature.key}],
          randomSeedNum:this.dataForm.randomSeedNum,
          learningRate:this.dataForm.learningRate,
          treeDepth:this.dataForm.tree_depth,
          iterations:this.dataForm.iterations,
          filterSql:this.dataForm.filterSql,
          strategyType:0
        }
        saveSortStrategy(params).then(res=>{
          if(res.code==200000){
            if(res.data){this.$emit("refresh");}
          }
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
  .mb24{
    margin-bottom: 24px;
  }
</style>