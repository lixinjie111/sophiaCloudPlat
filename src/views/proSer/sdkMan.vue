<template>
  <div class="sdkMan_container" style="padding: 24px;box-sizing: border-box;">
    <div class="sdk_one_container">
      <div class="title_btn_container">
        <div class="title">SDK管理</div>
        <div class="btn_container">
          <a-button type="primary" style="width:100%;height:100%;" @click="sdkApplyfn">申请</a-button>
        </div>
      </div>
      <div class="echarts_container">
        <div class="sq_text_container">
          <div class="text_title">授权总数</div>
          <div class="sq_num">{{sdkManData.authorizationCount}}</div>
        </div>
        <div class="echarts1_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="sdkManData.assignAuthorizationInfo.assignAuthorizationPercentage"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5B8FF9"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">已分配</div>
            <div class="text_num1">{{sdkManData.assignAuthorizationInfo.assignAuthorizationCount}}</div>
            <div
              class="per_num1"
            >占比 {{sdkManData.assignAuthorizationInfo.assignAuthorizationPercentage}}%</div>
          </div>
        </div>
        <div class="echarts2_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="sdkManData.usedInfo.usedCountPercentage"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5AD8A6"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">已激活</div>
            <div class="text_num1">{{sdkManData.usedInfo.usedCount}}</div>
            <div class="per_num1">占比 {{sdkManData.usedInfo.usedCountPercentage}}%</div>
          </div>
        </div>
        <div class="echarts3_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="sdkManData.surplusInfo.surplusPercentage"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5D7092"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">剩余可分配</div>
            <div class="text_num1">{{sdkManData.surplusInfo.surplusCount}}</div>
            <div class="per_num1">占比 {{sdkManData.surplusInfo.surplusPercentage}}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sdk_two_container">
      <div class="sdk_item" v-for="(item,index) in sdkApyList" :key="index">
        <div class="sdk_title2" :title="item.serviceName">{{item.serviceName}}</div>
        <div class="total_num_container">
          <span>{{item.authorizationCount}}</span>授权总数
        </div>
        <div class="per_container">
          <span class="per_title">已分配/剩余</span>
          <span class="per_value">{{item.surplusPercentage}}%</span>
        </div>
        <div class="per_compent_container">
          <a-progress
            :percent="item.surplusPercentage"
            stroke-linecap="square"
            :showInfo="false"
            status="active"
          />
        </div>
        <div class="yijihuo_text">已激活</div>
        <div class="yijihuo_echarts" :id="'sdkEcharts'+item.id"></div>
      </div>
    </div>
    <div class="sdk_three_container">
      <div class="sqm_container">
        <div class="sqm_title">授权管理</div>
        <div class="btn_container">
          <a-button type="primary" icon="plus" size="big" @click="appAuth">应用授权</a-button>
        </div>
      </div>
      <div class="table_container">
        <a-table :columns="sqcolumns" :pagination="pagination" :loading="loading" :data-source="sqdata" @change="changePage">
          <a slot="appName" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a
            slot="operating"
            class="ant-dropdown-link"
            slot-scope="text,record"
            @click="viewDeatil(record)"
          >{{ text }}</a>
        </a-table>
      </div>
    </div>
    <div class="sdk_four_container">
      <div class="sdk_title">SDK资源</div>
      <div class="sdk_content_container">
        <div class="sdk_content_item" v-for="(item,index) in sdkSorceList" :key="index">
          <div class="sdk_title1">{{item.serviceName}}</div>
          <div class="sdk_type_logo">
            <img :src="item.iconUrl" class="logoIcon" />
          </div>
          <div class="sdk_desc">
            <div>{{item.serviceDesc}}</div>
            <div class="sdk_desc_date">{{item.createTime}}</div>
          </div>
          <div class="use_intro">
            <a :href="item.useIntro">使用说明</a>
          </div>
          <div class="down_load_btn">
            <a-button
              type="primary"
              icon="download"
              size="large"
              @click="downLoad(item.sdkDowmLoadUrl)"
            >下载</a-button>
          </div>
        </div>
      </div>
    </div>
    <vAuthPop
      v-if="ifShowPop"
      @closeMe="closePopWin"
      :serviceModel="routerData"
      :sqDetail="sqDetailData"
    ></vAuthPop>
  </div>
</template>

<script>
import vAuthPop from "./authPop";
import {
  sdkApply,
  getSdkApplyList,
  sdkAuth,
  getSdkAuthList,
  getSdkManagement,
  getSdkSourceList
} from "../../api/proSer/index";
export default {
  name: "sdkMan",
  data() {
    return {
      sqcolumns: [
        {
          title: "应用名称",
          dataIndex: "appName",
          key: "appName",
          scopedSlots: { customRender: "appName" },
          filters: []
        },
        {
          title: "APP ID",
          dataIndex: "appId",
          key: "appId"
        },
        {
          title: "应用平台",
          dataIndex: "applicationPlatform",
          key: "applicationPlatform",
          filters: []
        },
        {
          title: "SDK名称",
          key: "serviceName",
          dataIndex: "serviceName",
          filters: []
        },
        {
          title: "已分配",
          key: "assignAuthorizationCount",
          dataIndex: "assignAuthorizationCount"
        },
        {
          title: "激活",
          key: "usedCount",
          dataIndex: "usedCount"
        },
        {
          title: "有效期",
          key: "effectiveTime",
          dataIndex: "effectiveTime",
          filters: []
        },
        {
          title: "授权时间",
          key: "createTime",
          dataIndex: "createTime",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.age - b.age
        },
        {
          title: "操作",
          key: "operating",
          dataIndex: "operating",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "operating" }
        }
      ],
      sqdata: [],
      size: "large",
      sdkSorceList: [],
      ifShowPop: false,
      routerData: null,
      sdkApyList: [],
      sdkManData: {
        assignAuthorizationInfo: {
          assignAuthorizationPercentage: ""
        },
        surplusInfo: {},
        usedInfo: {}
      },
      sqDetailData: {},
      pagination:{},
      loading:false
    };
  },
  components: {
    vAuthPop
  },
  created() {
    this.routerData = this.$route.query.serviceModel;
  },
  mounted() {
    this.getPageData();
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.routerData = this.$route.query.serviceModel;
      this.getPageData();
    }
  },
  methods: {
    appAuth() {
      this.sqDetailData = {
        vType: "add"
      };
      this.ifShowPop = true;
    },
    viewDeatil(re) {
      re.vType = "view";
      this.sqDetailData = re;
      this.ifShowPop = true;
    },
    closePopWin(arg) {
      this.ifShowPop = arg;
      this.getSdkAuthList({ current: 1, pageSize: 10 });
    },
    sdkApplyfn() {
      this.$router.push({
        path: "/sdkApply",
        query: {
          serviceType: this.routerData
        }
      });
    },
    getPageData() {
      this.getSdkManagement();
      this.getSdkApplyList();
      this.getSdkAuthList({ current: 1, pageSize: 10 });
      this.getSdkSorceList();
    },
    downLoad(url) {
      window.location.href = url;
    },
    getSdkManagement() {
      var getParms = {
        serviceModel: this.routerData
      };
      getSdkManagement(getParms)
        .then(res => {
          if (res.code == 200000) {
            var sdkManData = res.data || {};
            this.sdkManData = sdkManData;
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getSdkApplyList() {
      var getParms = {
        pageNum: 1,
        pageSize: 100,
        serviceModel: this.routerData
      };
      getSdkApplyList(getParms)
        .then(res => {
          if (res.code == 200000) {
            var sdkApplyData = res.data;
            var sdkAppllList = sdkApplyData.list || [];
            this.sdkApyList = sdkAppllList;
            setTimeout(() => {
              sdkAppllList.forEach(item => {
                this.initEcharts1(item.totalDataList, `sdkEcharts${item.id}`);
              });
            }, 1000);
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getSdkAuthList(pagination) {
      this.loading = true;
      var getParms = {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        serviceModel: this.routerData
      };
      getSdkAuthList(getParms)
        .then(res => {
          if (res.code == 200000) {
            const pagination = { ...this.pagination };
            pagination.total = res.data.total;
            this.loading = false;
            this.pagination = pagination;
            var sdkAuthListData = res.data.list || [];
            sdkAuthListData.forEach(element => {
              element.key = element.appId;
              element.operating = "查看";
            });
            this.sqdata = sdkAuthListData;
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getSdkSorceList() {
      var sdkSorceListParm = {
        serviceModel: this.routerData
      };
      getSdkSourceList(sdkSorceListParm)
        .then(res => {
          if (res.code == 200000) {
            var sdkSorListData = res.data || [];
            this.sdkSorceList = sdkSorListData;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    initEcharts1(echData = [], echId) {
      var xData = [];
      var yData = [];
      echData.forEach(item => {
        xData.push(item.createTime);
        yData.push(item.count);
      });
      var myChart = this.$echarts.init(document.getElementById(echId));
      var option = {
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        grid: {
          left: "13%",
          right: "10%",
          bottom: "18%",
          top: "10%"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yData,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#2a55f0"
                  },
                  {
                    offset: 1,
                    color: "hsl(227, 63%, 90%)"
                  }
                ],
                global: false
              }
            },
            itemStyle: {
              normal: {
                color: "#2a55f0",
                lineStyle: {
                  color: "#2a55f0"
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    changePage(pagination, filters, sorter) {
      this.getSdkAuthList(pagination);
    }
  }
};
</script>

<style lang="scss" scoped>
.sdkMan_container {
  width: 100%;
  height: 100%;
  .sdk_one_container {
    width: 100%;
    height: 189px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    .title_btn_container {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
      }
      .btn_container {
        width: 120px;
        height: 36px;
      }
    }
    .echarts_container {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sq_text_container,
      .echarts1_container,
      .echarts2_container,
      .echarts3_container {
        width: 25%;
        height: 100%;
        padding: 24px;
        box-sizing: border-box;
      }
      .sq_text_container {
        .text_title {
          width: 100%;
          margin-bottom: 4px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 22px;
        }
        .sq_num {
          width: 100%;
          font-size: 30px;
          font-family: Helvetica;
          color: rgba(0, 0, 0, 0.85);
          line-height: 38px;
        }
      }
      .echarts1_container,
      .echarts2_container,
      .echarts3_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .echarts_class {
          width: 64px;
          height: 64px;
          margin-right: 17px;
        }
        .echarts_text_container {
          flex: 1;
          .text_title1 {
            width: 100%;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            line-height: 22px;
            margin-bottom: 4px;
          }
          .text_num1 {
            width: 100%;
            margin-bottom: 4px;
            font-size: 20px;
            font-family: Helvetica;
            color: rgba(0, 0, 0, 0.85);
            line-height: 28px;
          }
          .per_num1 {
            width: 100%;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.45);
            line-height: 20px;
          }
        }
      }
    }
  }
  .sdk_two_container {
    width: 100%;
    min-height: 289px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    .sdk_item {
      width: 24%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-right: 15px;
      margin-bottom: 15px;
      .sdk_title2 {
        width: 100%;
        font-size: 16px;
        font-weight: 550;
        margin-bottom: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .total_num_container {
        font-size: 14px;
        color: rgba(117, 116, 114, 0.973);
        margin-bottom: 10px;
        span {
          font-size: 19px;
          font-weight: 550;
          margin-right: 5px;
          color: black;
          margin-right: 10px;
        }
      }
      .per_container {
        font-size: 14px;
        color: rgba(117, 116, 114, 0.973);
        margin-bottom: 10px;
        .per_title {
          margin-right: 185px;
        }
      }
      .per_compent_container {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }
      .yijihuo_text {
        margin-bottom: 12px;
        color: rgba(117, 116, 114, 0.973);
      }
      .yijihuo_echarts {
        width: 100%;
        height: 100px;
      }
    }
  }
  .sdk_three_container {
    width: 100%;
    min-height: 300px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    .sqm_container {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sqm_title {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
        line-height: 21px;
      }
      .btn_container {
        width: 120px;
        height: 36px;
      }
    }
    .table_container {
      flex: 1;
      /deep/ .ant-table-wrapper {
        /deep/ .ant-spin-nested-loading {
          /deep/ .ant-pagination {
            display: flex;
            justify-content: center;
            float: inherit;
          }
        }
      }
    }
  }
  .sdk_four_container {
    width: 100%;
    min-height: 300px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    .sdk_title {
      width: 100%;
      height: 51px;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #676970;
      line-height: 21px;
    }
    .sdk_content_container {
      flex: 1;
      width: 100%;
      padding: 0 24px;
      box-sizing: border-box;
      .sdk_content_item {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        .sdk_title1,
        .sdk_type_logo,
        .use_intro,
        .down_load_btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sdk_desc {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .sdk_desc_date {
            color: rgba(0, 0, 0, 0.5);
            margin-top: 7px;
          }
        }
        .sdk_title1 {
          width: 390px;
          height: 100%;
          display: flex;
          justify-content: flex-start;
        }
        .sdk_type_logo {
          width: 100px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .logoIcon {
            display: block;
            width: 30px;
            height: 30px;
          }
        }
        .sdk_desc {
          width: 708px;
          height: 100%;
        }
        .use_intro {
          width: 227px;
          height: 100%;
        }
        .down_load_btn {
          width: 217px;
          height: 100%;
        }
      }
    }
  }
}
</style>
