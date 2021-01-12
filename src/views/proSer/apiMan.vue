<template>
  <div class="apiMan_container">
    <div class="select_area_container">
      <div class="select_container">
        <a-select default-value="lucy" style="width:100%">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>
            <!--禁止选中-->
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <div class="time_container">
        <a-range-picker style="width:100%" separator="-" />
      </div>
      <div class="btn_container">
        <a-button>重置</a-button>
        <a-button type="primary">查询</a-button>
      </div>
    </div>
    <div class="fangwen_area_container"></div>
    <div class="nengli_area_container"></div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "apiMan",
  data() {
    return {};
  },
  components:{
    moment
  }
};
</script>

<style lang="scss" scoped>
.apiMan_container {
  width: 100%;
  height: 100%;
  .select_area_container {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding-left: 29px;
    box-sizing: border-box;
    .select_container {
      width: 199px;
      height: 32px;
      margin-right: 20px;
    }
    .time_container {
      width: 394px;
      height: 32px;
      margin-right: 318px;
    }
    .btn_container {
      width: 136px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .fangwen_area_container {
    width: 100%;
    height: 316px;
    margin-bottom: 13px;
    background-color: chartreuse;
  }
  .nengli_area_container {
    width: 100%;
    height: 620px;
    background-color: darkolivegreen;
  }
}
</style>
