<template>
  <div class="custom_run">
      <div class="scene_box">
        <p class="title">运营策略:</p>
        <AddOperation ref="operationChild" :operationObject="operationObject"></AddOperation>
        <!-- <ul>
            <li>
                <a-checkbox>商品多样性</a-checkbox>
                <span>一次推荐请求返回的结果里面，相邻的<a-input></a-input>个商品，作者不重复</span>
            </li>
            <li>
                <a-checkbox>根据店铺进行打散</a-checkbox>
                <span>一次推荐请求返回的结果里面，相邻的<a-input></a-input>个商品，<a-input></a-input>级频道不重复</span>                
            </li>
            <li>
                <a-checkbox>根据商品类型进行混排</a-checkbox>
                <span>一次推荐请求返回的结果里面：物品类型为    
                    <a-select default-value="lucy">
                    <a-select-option value="jack">
                        Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                        Lucy
                    </a-select-option>
                    <a-select-option value="disabled">
                        Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                    </a-select>的物品占比为
                    <a-input></a-input></span>                
            </li>
        </ul> -->          
      </div>
      <div class="scene_box">
        <p class="title">设置必推:</p>
        <div>
          <div>
            必推行为:
            <a-radio-group v-model="mustRecommendFlag">
              <a-radio :value="0">无必推商品</a-radio>
              <a-radio :value="1">有必推商品</a-radio>
            </a-radio-group>
          </div>
          <div class="best_goods" v-if="mustRecommendFlag">
            <div class="best_goods_title">
              <p>筛选必推物品：</p>
              <a-button type="primary" @click="toWillPush">必推物品池</a-button>
            </div>
            <AddBestGoods :list="recommendParams" :propertiesList="mustPushPropertiesList"></AddBestGoods>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <a-button
            type="primary"
            @click="complete">
            完成
        </a-button>
        <a-button
            type="primary"
            @click="publish">
            发布
        </a-button>
        <a-button
            type="primary"
            @click="test">
            测试
        </a-button>        
        <a-button
            @click="cancel">
            取消
        </a-button>        
        <a-button
            @click="back">
            上一步
        </a-button>        
      </div>
  </div>
</template>
<script>
  import AddBestGoods from "../AddBestGoods";
  import AddOperation from "../AddOperation";
  import {saveMustRecommend,getSceneMustPushProperties} from "@/api/recommendation/index"
export default {
  name: "CustomSort",
  components:{AddBestGoods, AddOperation},
  props: {},
  data() {
    return {
        operationObject: {
          varietyFlag: 0,
          scatterFlag: 0,
          shufflingFlag:  0,
          varietyNum: '',
          scatterNum: '',
          scatterChannelNum: '',
          shufflings: [],
        },  
        mustRecommendFlag:0 ,
        recommendParams: [],   
        mustPushPropertiesList:[]
    };
  },
  methods: {
    complete(){
      this.saveMustRecommend()
    },
    publish(){
      this.saveMustRecommend()
    },
    test(){
      this.saveMustRecommend('test')
    },
    back(){
      this.$emit('last')
    },
    saveMustRecommend(type){
      let operationObject = this.$refs.operationChild.operationObject;
      let params = {
        // id:"",
        applicationId:this.$route.query.appId,
        sceneId:this.$route.query.sceneId, 
        mustRecommendFlag: this.mustRecommendFlag,
        varietyFlag: operationObject.varietyFlag,
        varietyNum: operationObject.varietyNum,
        scatterFlag: operationObject.scatterFlag,
        scatterNum: operationObject.scatterNum,
        scatterChannelNum: operationObject.scatterChannelNum,
        shufflingFlag: operationObject.shufflingFlag,
        shufflings: operationObject.shufflings      
      }
      if(this.mustRecommendFlag){
        params = Object.assign(params,{recommendParams:this.recommendParams})
      }
      saveMustRecommend(params).then(res=>{
        if(res.code==200000){
          this.$message.success("成功！");
          if(type =='test'){
            this.$router.push({
              path: '/recommendation/operation/result',
              query:{
                activekey:['tuijianceshijijieguo'],
                openkey:['dataSer1',"tuijianyunying"]
              }
            });
          }else {
            this.$router.push({
              path: '/recommendation/scene/list'
            });
          }
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    getSceneMustPushProperties(){
      getSceneMustPushProperties({}).then(res=>{
        if(res.code==200000){
          this.mustPushPropertiesList = res.data
        }else{
          this.$message.error(res.message||"error")
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    }
  },
  mounted(){
    this.getSceneMustPushProperties()
  }
};
</script>
<style scoped lang="scss">
.custom_run {
    .scene_box {
      margin-bottom: 20px;
      display: flex;

      .title {
        width: 100px;
      }

      /deep/ .ant-checkbox-group {
        /deep/ .ant-checkbox-group-item {
          margin-bottom: 10px;
          display: block;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .best_goods {
        width: 575px;

        .best_goods_title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .btn_box{
      text-align: center;
    }
}
</style>