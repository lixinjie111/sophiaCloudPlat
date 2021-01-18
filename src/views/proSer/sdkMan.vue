<template>
  <div class="sdkMan_container">
    <div class="sdk_one_container">
      <div class="title_btn_container">
        <div class="title">SDK管理</div>
        <div class="btn_container">
          <a-button type="primary" style="width:100%;height:100%;">申请</a-button>
        </div>
      </div>
      <div class="echarts_container">
        <div class="sq_text_container">
          <div class="text_title">授权总数</div>
          <div class="sq_num">601,986,875</div>
        </div>
        <div class="echarts1_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="75"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5B8FF9"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">已分配</div>
            <div class="text_num1">370,221,928</div>
            <div class="per_num1">占比 61.5%</div>
          </div>
        </div>
        <div class="echarts2_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="75"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5AD8A6"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">已分配</div>
            <div class="text_num1">370,221,928</div>
            <div class="per_num1">占比 61.5%</div>
          </div>
        </div>
        <div class="echarts3_container">
          <div class="echarts_class">
            <a-progress
              stroke-linecap="square"
              :percent="75"
              type="circle"
              :width="64"
              :showInfo="false"
              strokeColor="#5D7092"
              strokeWidth="10"
            />
          </div>
          <div class="echarts_text_container">
            <div class="text_title1">已分配</div>
            <div class="text_num1">370,221,928</div>
            <div class="per_num1">占比 61.5%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sdk_two_container">
      <div class="sdk_item"></div>
      <div class="sdk_item"></div>
      <div class="sdk_item"></div>
      <div class="sdk_item"></div>
    </div>
    <div class="sdk_three_container">
      <div class="sqm_container">
        <div class="sqm_title">授权管理</div>
        <div class="btn_container">
          <a-button type="primary" icon="plus" size="big" @click="appAuth">应用授权</a-button>
        </div>
      </div>
      <div class="table_container">
        <a-table :columns="sqcolumns" :data-source="sqdata">
          <a slot="appname" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="operating" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
    <div class="sdk_four_container">
      <div class="sdk_title">SDK资源</div>
      <div class="sdk_content_container">
        <div class="sdk_content_item" v-for="(item,index) in sdkSorceList" :key="index">
          <div class="sdk_title1">{{item.sdkName}}</div>
          <div class="sdk_type_logo">
            <a-icon type="android" :style="{ fontSize: '20px', color: '#08c' }" />
          </div>
          <div class="sdk_desc">
            <div>{{item.sdkDsc}}</div>
            <div>{{item.date}}</div>
          </div>
          <div class="use_intro">
            <a href>使用说明</a>
          </div>
          <div class="down_load_btn">
            <a-button type="primary" icon="download" :size="size">{{item.btn}}</a-button>
          </div>
        </div>
      </div>
    </div>
    <vAuthPop v-show="ifShowPop" @closeMe='closePopWin'></vAuthPop>
  </div>
</template>

<script>
import vAuthPop from './authPop';
export default {
  name: "sdkMan",
  data() {
    return {
      sqcolumns: [
        {
          title: "应用名称",
          dataIndex: "appname",
          key: "appname",
          scopedSlots: { customRender: "appname" },
          filters: [
            {
              text: "Joe",
              value: "Joe"
            },
            {
              text: "Jim",
              value: "Jim"
            },
            {
              text: "Submenu",
              value: "Submenu",
              children: [
                {
                  text: "Green",
                  value: "Green"
                },
                {
                  text: "Black",
                  value: "Black"
                }
              ]
            }
          ]
        },
        {
          title: "APP ID",
          dataIndex: "appid",
          key: "appid"
        },
        {
          title: "应用平台",
          dataIndex: "appPlat",
          key: "appPlat",
          filters: [
            {
              text: "Joe",
              value: "Joe"
            },
            {
              text: "Jim",
              value: "Jim"
            },
            {
              text: "Submenu",
              value: "Submenu",
              children: [
                {
                  text: "Green",
                  value: "Green"
                },
                {
                  text: "Black",
                  value: "Black"
                }
              ]
            }
          ]
        },
        {
          title: "SDK名称",
          key: "sdkName",
          dataIndex: "sdkName",
          filters: [
            {
              text: "Joe",
              value: "Joe"
            },
            {
              text: "Jim",
              value: "Jim"
            },
            {
              text: "Submenu",
              value: "Submenu",
              children: [
                {
                  text: "Green",
                  value: "Green"
                },
                {
                  text: "Black",
                  value: "Black"
                }
              ]
            }
          ]
        },
        {
          title: "已分配/激活",
          key: "yifenP",
          dataIndex: "yifenP"
        },
        {
          title: "有效期",
          key: "validPer",
          dataIndex: "validPer",
          filters: [
            {
              text: "Joe",
              value: "Joe"
            },
            {
              text: "Jim",
              value: "Jim"
            },
            {
              text: "Submenu",
              value: "Submenu",
              children: [
                {
                  text: "Green",
                  value: "Green"
                },
                {
                  text: "Black",
                  value: "Black"
                }
              ]
            }
          ]
        },
        {
          title: "授权时间",
          key: "sqTime",
          dataIndex: "sqTime",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.age - b.age
        },
        {
          title: "操作",
          key: "operating",
          dataIndex: "operating",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "appname" }
        }
      ],
      sqdata: [
        {
          key: "1",
          appname: "好生活",
          appid: "243234a4",
          appPlat: "Android",
          sdkName: "语音识别Android SDK",
          yifenP: "6000/1234",
          validPer: "12个月",
          sqTime: "2019-12-23 14:07",
          operating: "查看"
        },
        {
          key: "2",
          appname: "合生通",
          appid: "243234a4",
          appPlat: "iOS",
          sdkName: "语音识别iOS SDK",
          yifenP: "6000/1234",
          validPer: "12个月",
          sqTime: "2019-12-23 14:07",
          operating: "查看"
        },
        {
          key: "3",
          appname: "好生活好房",
          appid: "243234a4",
          appPlat: "Android",
          sdkName: "语音识别Android SDK",
          yifenP: "6000/1234",
          validPer: "12个月",
          sqTime: "2019-12-23 14:07",
          operating: "查看"
        }
      ],
      size: "large",
      sdkSorceList: [
        {
          sdkName: "语音识别Android SDK",
          sdkDsc: "3.1.6默认识别模型pid为输入法模型1537",
          date: "2020-01-08",
          btn: "下载"
        },
        {
          sdkName: "语音识别Android SDK",
          sdkDsc: "3.1.6默认识别模型pid为输入法模型1537",
          date: "2020-01-08",
          btn: "下载"
        },
        {
          sdkName: "语音识别Android SDK",
          sdkDsc: "3.1.6默认识别模型pid为输入法模型1537",
          date: "2020-01-08",
          btn: "下载"
        },
        {
          sdkName: "语音识别Android SDK",
          sdkDsc: "3.1.6默认识别模型pid为输入法模型1537",
          date: "2020-01-08",
          btn: "下载"
        },
        {
          sdkName: "语音识别Android SDK",
          sdkDsc: "3.1.6默认识别模型pid为输入法模型1537",
          date: "2020-01-08",
          btn: "下载"
        }
      ],
      ifShowPop:false
    };
  },
  components:{
    vAuthPop
  },
  mounted() {
    this.changeCircleSty();
  },
  methods: {
    changeCircleSty() {},
    appAuth(){
        console.log('qq')
        this.ifShowPop = true;
    },
    closePopWin(arg){
        this.ifShowPop = arg;
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
    height: 289px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .sdk_item {
      width: 24%;
      height: 100%;
      background-color: navy;
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
        }
        .sdk_title1 {
          width: 390px;
          height: 100%;
        }
        .sdk_type_logo {
          width: 100px;
          height: 100%;
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
