<template>
  <div class="monRep_container">
    <div class="mon_rep_title">监控报表</div>
    <div class="mon_app_content_container">
      <div class="content_item">
        <div class="label">选择应用：</div>
        <div class="input_container">
          <a-select default-value="lucy" style="width:100%;height:100%;">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="content_item">
        <div class="label">选择API：</div>
        <div class="input_container">
          <a-select default-value="lucy" style="width:100%;">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="content_item">
        <div class="label">统计项：</div>
        <div class="input_container">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">调用量</a-radio>
            <a-radio :value="2" style="margin-left:20px;">QPS</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="content_item">
        <div class="label">监控项：</div>
        <div class="input_container">
          <a-checkbox-group v-model="jkValue" name="checkboxgroup" :options="plainOptions" />
        </div>
      </div>
      <div class="content_item">
        <div class="label">时间段：</div>
        <div class="input_container">
          <a-range-picker separator="-" :locale="locale">
            <a-icon slot="suffixIcon" type="schedule" />
          </a-range-picker>
        </div>
      </div>
      <div class="content_item">
        <div class="label"></div>
        <div class="input_container searchBtn">
          <a-button type="primary" style="width:100%;height:100%;">查询</a-button>
        </div>
      </div>
    </div>
    <div class="diaoyon_inter_container">
      <div class="radio_container">
        <a-radio-group v-model="timeRadioVal">
          <a-radio :value="1">按时</a-radio>
          <a-radio :value="2">按日</a-radio>
        </a-radio-group>
      </div>
      <div class="line_echarts_container" id="timeEchartsId"></div>
    </div>
  </div>
</template>

<script>
import locale from "x-intelligent-ui/es/date-picker/locale/zh_CN";
export default {
  name: "monRep",
  data() {
    return {
      locale,
      jkValue: [],
      plainOptions: ["调用成功", "调用失败"],
      timeRadioVal: []
    };
  },
  mounted() {
    this.initLineEcharts();
  },
  methods: {
    initLineEcharts() {
      var myChart = this.$echarts.init(
        document.getElementById("timeEchartsId")
      );
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["调用成功", "调用失败"],
          bottom: "1%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "13%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "调用成功",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                color: "#08C971"
              }
            }
          },
          {
            name: "调用失败",
            type: "line",
            data: [20, 2, 11, 34, 21, 30, 10],
            itemStyle: {
              normal: {
                color: "#F64D15"
              }
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.monRep_container {
  width: 100%;
  .mon_rep_title,
  .mon_app_content_container,
  .diaoyon_inter_container {
    width: 100%;
  }
  .mon_rep_title {
    padding-left: 27px;
    box-sizing: border-box;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    border-bottom: 2px solid #cfcdcd;
  }
  .mon_app_content_container {
    min-height: 302px;
    padding: 57px 83px;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #cfcdcd;
    .content_item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .label {
        width: 73px;
        margin-right: 71px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #676970;
        line-height: 17px;
      }
      .input_container {
        width: 246px;
        /deep/ .ant-checkbox-group {
          /deep/.ant-checkbox-group-item {
            margin-right: 15px;
          }
        }
      }
      .searchBtn {
        width: 95px;
        height: 26px;
        margin-top: 30px;
      }
    }
  }
  .diaoyon_inter_container {
    min-height: 450px;
    padding: 8px 78px 26px 83px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .radio_container {
      width: 100%;
      margin-bottom: 11px;
      display: flex;
      justify-content: flex-end;
    }
    .line_echarts_container {
      width: 957px;
      height: 375px;
    }
  }
}
</style>
