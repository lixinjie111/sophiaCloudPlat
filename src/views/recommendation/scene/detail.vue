<template>
  <div class="scene_detail_container">
    <div class="app_detail_top c-mb-10">
      <a-button type="primary" @click="toTest">
        测试
      </a-button>
      <a-button type="primary" @click="toEdit">
        编辑
      </a-button>
    </div>
    <a-card title="基本信息" size="small" class="c-mb-20">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="场景名称">
          {{detail.title}}
        </a-descriptions-item>
        <a-descriptions-item label="所属应用">
          {{detail.applicationName}}
        </a-descriptions-item>
        <a-descriptions-item label="场景类型">
          {{detail.sceneTypeDesc}}
        </a-descriptions-item>
        <a-descriptions-item label="推荐种类">
          {{detail.recommendObjectTypeDesc}}
        </a-descriptions-item>
        <a-descriptions-item label="推荐类型">
          {{detail.recommendTypeDesc}}
        </a-descriptions-item>
        <a-descriptions-item label="启动方式">
          {{detail.startTypeDesc}}
        </a-descriptions-item>
        <a-descriptions-item label="推荐位置">
          {{detail.place}}
        </a-descriptions-item>
        <!--    <a-descriptions-item label="场景模板">-->
        <!--    </a-descriptions-item>-->
        <a-descriptions-item label="场景描述">
          {{detail.description}}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="推荐数据" size="small" class="c-mb-20">
      <p class="desc_title">用户数据</p>
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="userHistoryData.length">
          <div v-for="(item,index) in userHistoryData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型：</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="新增数据" v-if="userNewData.length">
          <div v-for="(item,index) in userNewData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型：</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <p class="desc_title">物料数据</p>
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="itemHistoryData.length">
          <div v-for="(item,index) in itemHistoryData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型:</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="新增数据" v-if="itemNewData.length">
          <div v-for="(item,index) in itemNewData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型：</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <p class="desc_title">行为数据</p>
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="behaviorHistoryData.length">
          <div v-for="(item,index) in behaviorHistoryData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型：</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="新增数据" v-if="behaviorNewData.length">
          <div v-for="(item,index) in behaviorNewData" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>数据类型：</div>
            <div>{{item.dataTypeDesc}}</div>
            <div>数据源：</div>
            <div>{{item.folderName}}</div>
            <div>数据源表：</div>
            <div>{{item.sourceUserTableName}}</div>
            <div>
              <a-button type="primary" @click="toDetail(item)">详情</a-button>
            </div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="特征抽取" size="small" class="c-mb-20">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="推荐算法使用特征">
          <div class="text_left" v-if="featureInfo.featureExtractFlag">使用抽取特征</div>
          <div class="text_left" v-if="featureInfo.tableFeatureFlag">使用原表特征</div>
        </a-descriptions-item>
        <a-descriptions-item label="用户特征抽取" v-if="userFeatures.length">
          <div v-for="(item,index) in userFeatures" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>特征名称：</div>
            <div>{{item.featureDesc}}</div>
            <div>抽取范围：</div>
            <div>{{item.scopeName}}</div>
            <div>应用于：</div>
            <div>{{item.applyToDesc}}</div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item :label="'物料特征抽取（ '+ featureInfo.dataTypeDesc+' ）'" v-if="itemFeatures.length">
          <div v-for="(item,index) in itemFeatures" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>特征名称：</div>
            <div>{{item.featureDesc}}</div>
            <div>抽取范围：</div>
            <div>{{item.scopeName}}</div>
            <div>应用于：</div>
            <div>{{item.applyToDesc}}</div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="行为特征抽取" v-if="behaviorFeatures.length">
          <div v-for="(item,index) in behaviorFeatures" :key="index" class="data_info">
            <div>{{index+1}}</div>
            <div>特征名称：</div>
            <div>{{item.featureDesc}}</div>
            <div>抽取范围：</div>
            <div>{{item.scopeName}}</div>
            <div>应用于：</div>
            <div>{{item.applyToDesc}}</div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <!--智能场景规则-->
    <a-card title="规则推荐" size="small" v-if="sceneType == '0'">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="筛选物品" v-if="filterItemParams.length">
          <div class="rule_info">
            <div>序号</div>
            <div>1级品类</div>
            <div>2级品类</div>
            <div>品牌</div>
            <div>物品特征</div>
            <div>逻辑判断</div>
            <div>规则数值</div>
          </div>
          <a-divider/>
          <div v-for="(item,index) in filterItemParams" :key="item.id" class="rule_info">
            <div>{{index+1}}</div>
            <div>{{item.firstLevelCategory}}</div>
            <div>{{item.secondLevelCategory}}</div>
            <div>{{item.brand}}</div>
            <div>{{item.itemProperty}}</div>
            <div>{{item.logicCalc}}</div>
            <div>{{item.value}}</div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="过滤行为">
          <div class="text_left" v-if="ruleInfo.buyFlag">有购买行为的物品</div>
          <div class="text_left" v-if="ruleInfo.hasPushFlag">用户过去3天内有过曝光行为的物品</div>
          <div class="text_left" v-if="ruleInfo.complainFlag">用户投诉的物品</div>
        </a-descriptions-item>
        <a-descriptions-item label="运营策略">
          <div class="text_left" v-if="ruleInfo.varietyFlag">
              {{operationDescList[recommendObjectType].varietyName}}:
              {{operationDescList[recommendObjectType].varietyDesc1}}
              {{ruleInfo.varietyNum}}
              {{operationDescList[recommendObjectType].varietyDesc2}}
            </div>
          <div class="text_left" v-if="ruleInfo.scatterFlag">
              {{operationDescList[recommendObjectType].scatterName}}:
              {{operationDescList[recommendObjectType].scatterDesc1}}
              {{ruleInfo.scatterNum}}
              {{operationDescList[recommendObjectType].scatterDesc2}}
              {{ruleInfo.scatterChannelNum}}
              {{operationDescList[recommendObjectType].scatterDesc3}}
            </div>
          <div class="text_left" v-if="ruleInfo.shufflingFlag">
              {{operationDescList[recommendObjectType].shufflingName}}:
              {{operationDescList[recommendObjectType].shufflingDesc}}
              <div v-for="(item,index) in ruleInfo.shufflings" :key="index">
                <span>{{index+1}}.</span>
                <span>{{item.d}}的占比为{{item.c}}</span>
              </div>
            </div>
        </a-descriptions-item>
        <a-descriptions-item label="必推行为">
          <div class="text_left" v-if="ruleInfo.mustRecommendFlag">有必推商品</div>
          <div class="text_left" v-else>无必推商品</div>
        </a-descriptions-item>
        <a-descriptions-item label="必推物品" v-if="recommendParams.length">
          <div class="rule_info1">
            <div>序号</div>
            <div>品牌</div>
            <div>逻辑判断</div>
            <div>值</div>
          </div>
          <a-divider/>
          <div v-for="(item,index) in recommendParams" :key="item.id" class="rule_info1">
            <div>{{index+1}}</div>
            <div>{{item.property}}</div>
            <div>{{item.logicCalc}}</div>
            <div>{{item.value}}</div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <!--自定义场景规则-->
    <a-card title="规则推荐" size="small" v-if="sceneType == '1'">
<!-- 自定义详情 -->
    </a-card>
  </div>
</template>

<script>
  import {getSceneDetail} from "@/api/recommendation/index";

  export default {
    name: "detail",
    data() {
      return {
        detail: {},
        userHistoryData: [],
        userNewData: [],
        itemHistoryData: [],
        itemNewData: [],
        behaviorHistoryData: [],
        behaviorNewData: [],
        featureInfo: {},
        userFeatures: [],
        itemFeatures: [],
        behaviorFeatures: [],
        ruleInfo: {},
        filterItemParams: [],
        recommendParams: [],
        operationDescList: [
          {
            varietyName: '商品多样性',
            varietyDesc1: '一次推荐请求返回的结果里面，相邻的',
            varietyDesc2: '个商品，品牌不重复',
            scatterName: '根据店铺进行打散',
            scatterDesc1: '一次推荐请求返回的结果里面，相邻的',
            scatterDesc2: '个商品，',
            scatterDesc3: '个店铺不重复',
            shufflingName: '根据商品类型进行混排',
            shufflingDesc: '一次推荐请求返回的结果里面：'
          }
        ]
      }
    },
    created() {
      this.getSceneDetail();
    },
    computed: {
      // 场景类型 0-智能场景 1-自定义场景 2-模板场景
      sceneType() {
        return JSON.parse(localStorage.getItem('sceneInfo')).sceneType
      },
      // 推荐种类 0：推荐商品 1：推荐用户 2：推荐咨询 3:推荐活动
      recommendObjectType() {
        return JSON.parse(localStorage.getItem('sceneInfo')).recommendObjectType
      }
    },
    methods: {
      toEdit() {
        this.$router.push({
          path: '/recommendation/scene/edit?appId=' + this.$route.query.appId + '&sceneId=' + this.$route.query.sceneId
        });
      },
      toTest() {
        this.$router.push({
          path: '/recommendation/operation/result',
          query: {
            activekey: ['tuijianceshijijieguo'],
            openkey: ['dataSer1', "tuijianyunying"]
          }
        });
      },
      toDetail(item) {
        this.$router.push({
          path: '/recommendation/data/detail?name=' + item.sourceTableName,
          query: {
            activekey: ['shujuguanlik'],
            openkey: ['dataSer1', "shujuzhongxin"]
          }
        });
      },
      getSceneDetail() {
        let params = {
          id: this.$route.query.sceneId,
          hasDataFlag: 1
        };
        getSceneDetail(params).then(res => {
          if (res.code == 200000) {
            this.detail = res.data;
            // 推荐数据
            this.userHistoryData = res.data.dataInfo.userHistoryData || [];
            this.userNewData = res.data.dataInfo.userNewData || [];
            this.itemHistoryData = res.data.dataInfo.itemHistoryData || [];
            this.itemNewData = res.data.dataInfo.itemNewData || [];
            this.behaviorHistoryData = res.data.dataInfo.behaviorHistoryData || [];
            this.behaviorNewData = res.data.dataInfo.behaviorNewData || [];
            // 特征抽取
            this.featureInfo = res.data.featureInfo || {};
            this.userFeatures = res.data.featureInfo.userFeatures || [];
            this.itemFeatures = res.data.featureInfo.itemFeatures || [];
            this.behaviorFeatures = res.data.featureInfo.behaviorFeatures || [];
            // 配置规则
            this.ruleInfo = res.data.ruleInfo || {};
            this.filterItemParams = res.data.ruleInfo.filterItemParams || [];
            this.recommendParams = res.data.ruleInfo.recommendParams || [];
            // 场景信息存储
            let sceneInfo = {
              sceneType: res.data.sceneType,
              recommendObjectType: res.data.recommendObjectType
            };
            localStorage.setItem("sceneInfo", JSON.stringify(sceneInfo));
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .scene_detail_container {
    padding: 20px;

    .app_detail_top {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }

    .data_info {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > div {
        margin: 5px;
        width: 10%;

        &:nth-child(1) {
          width: 6%;
        }

        &:nth-child(3), &:nth-child(5), &:nth-child(7) {
          width: 18%;
        }
      }
    }

    .rule_info {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > div {
        margin: 5px;
        width: 10%;
      }
    }

    .rule_info1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > div {
        margin: 5px;
        width: 10%;

        &:nth-child(4) {
          width: 60%;
        }
      }
    }

    .desc_title {
      margin: 10px 0 10px;
      font-weight: 500;
    }

    .text_left {
      text-align: left;
    }

    .ant-divider-horizontal {
      margin: 4px 0;
    }
  }
</style>

