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
    <div class="diaoyon_inter_container"></div>
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
      plainOptions: ["调用成功", "调用失败"]
    };
  },
  methods: {}
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
        width: 60px;
        margin-right: 71px;
        font-size: 12px;
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
}
</style>
