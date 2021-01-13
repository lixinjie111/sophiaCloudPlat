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
    <div class="sdk_two_container"></div>
    <div class="sdk_three_container"></div>
    <div class="sdk_four_container"></div>
  </div>
</template>

<script>
export default {
  name: "sdkMan",
  data() {
    return {};
  },
  mounted() {
    this.changeCircleSty();
  },
  methods: {
    changeCircleSty() {}
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
    background-color: lightcoral;
  }
  .sdk_three_container {
    width: 100%;
    height: 571px;
    margin-bottom: 20px;
    background-color: maroon;
  }
  .sdk_four_container {
    width: 100%;
    min-height: 300px;
    background-color: mediumorchid;
    margin-bottom: 20pxsss;
  }
}
</style>
