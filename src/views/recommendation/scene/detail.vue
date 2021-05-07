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
    <a-card title="用户数据" size="small" class="c-mb-20">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="detail.dataInfo.userHistoryData.length">
          <div v-for="(item,index) in detail.dataInfo.userHistoryData" :key="index" class="data-info">
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
        <a-descriptions-item label="新增数据" v-if="detail.dataInfo.userNewData.length">
          <div v-for="(item,index) in detail.dataInfo.userNewData" :key="index" class="data-info">
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
    <a-card title="物料数据" size="small" class="c-mb-20">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="detail.dataInfo.itemHistoryData.length">
          <div v-for="(item,index) in detail.dataInfo.itemHistoryData" :key="index" class="data-info">
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
        <a-descriptions-item label="新增数据" v-if="detail.dataInfo.itemNewData.length">
          <div v-for="(item,index) in detail.dataInfo.itemNewData" :key="index" class="data-info">
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
    <a-card title="行为数据" size="small" class="c-mb-20">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="历史数据" v-if="detail.dataInfo.behaviorHistoryData.length">
          <div v-for="(item,index) in detail.dataInfo.behaviorHistoryData" :key="index" class="data-info">
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
        <a-descriptions-item label="新增数据" v-if="detail.dataInfo.behaviorNewData.length">
          <div v-for="(item,index) in detail.dataInfo.behaviorNewData" :key="index" class="data-info">
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
    <!--智能场景规则-->
    <a-card title="规则推荐" size="small" v-if="sceneType == '0'">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="筛选物品" v-if="detail.ruleInfo.filterItemParams.length">
          <div class="rule-info">
            <div>序号</div>
            <div>1级品类</div>
            <div>2级品类</div>
            <div>品牌</div>
            <div>物品特征</div>
            <div>逻辑判断</div>
            <div>规则数值</div>
          </div>
          <a-divider />
          <div v-for="(item,index) in detail.ruleInfo.filterItemParams" :key="item.id" class="rule-info">
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
          <div v-if="detail.ruleInfo.buyFlag">有购买行为的物品</div>
          <div v-if="detail.ruleInfo.hasPushFlag">用户过去3天内有过曝光行为的物品</div>
          <div v-if="detail.ruleInfo.complainFlag">用户投诉的物品</div>
        </a-descriptions-item>
        <a-descriptions-item label="必推行为">
          <div v-if="detail.ruleInfo.mustRecommendFlag">有必推商品</div>
          <div v-else>无必推商品</div>
        </a-descriptions-item>
        <a-descriptions-item label="有必推商品" v-if="detail.ruleInfo.recommendParams.length">
          <div class="rule-info1">
            <div>序号</div>
            <div>品牌</div>
            <div>逻辑判断</div>
            <div>值</div>
          </div>
          <a-divider />
          <div v-for="(item,index) in detail.ruleInfo.recommendParams" :key="item.id" class="rule-info1">
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
        detail: {}
      }
    },
    created() {
      this.getSceneDetail();
    },
    computed: {
      // 场景类型 0-智能场景 1-自定义场景 2-模板场景
      sceneType() {
        return JSON.parse(localStorage.getItem('sceneInfo')).sceneType
      }
    },
    methods: {
      toEdit(applicationId,id) {
        this.$router.push({
          path: '/recommendation/scene/edit?appId=' + this.$route.query.appId + '&sceneId=' + this.$route.query.sceneId
        });
      },
      toTest() {
        this.$router.push({
          path: '/recommendation/operation/result',
          query:{
            activekey:['tuijianceshijijieguo'],
            openkey:['dataSer1',"tuijianyunying"]
          }
        });
      },
      toDetail(item){
        this.$router.push({
          path: '/recommendation/data/detail?name='+ item.sourceTableName,
          query:{
            activekey:['shujuguanlik'],
            openkey:['dataSer1',"shujuzhongxin"]
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
            let sceneInfo= {
              sceneType: res.data.sceneType,
              recommendObjectType: res.data.recommendObjectType
            };
            localStorage.setItem("sceneInfo",JSON.stringify(sceneInfo));
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

      >button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }

    .data-info {
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

    .rule-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > div {
        margin: 5px;
        width: 10%;
      }
    }

    .rule-info1 {
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

    .ant-divider-horizontal {
      margin: 4px 0;
    }
  }
</style>

