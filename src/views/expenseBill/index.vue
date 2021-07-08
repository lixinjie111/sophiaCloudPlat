<template>
  <div class="invoice_con">
    <div class="first_area">
      <div class="til">费用账单</div>
    </div>
    <div class="second_area">
        <a-tabs v-model="activePane" @change="tabsChanCallback">
        <a-tab-pane key="1" tab="账单总览">
            <vBillOverview></vBillOverview>
        </a-tab-pane>
        <a-tab-pane key="2" tab="账单明细" force-render>
            <vBillMinxi></vBillMinxi>
        </a-tab-pane>
        <a-tab-pane key="3" tab="账单详情">
            <vBillDetals></vBillDetals>
        </a-tab-pane>
        </a-tabs>
    </div>
  </div>
</template>

<script>
import vBillOverview from "./billOverview.vue";
import vBillMinxi from "./billMinxi.vue";
import vBillDetals from "./billDetails.vue";
export default {
  name: "expensebill",
  data() {
    return {
        activePane:'1'
    };
  },
  components:{
    vBillOverview,
    vBillMinxi,
    vBillDetals
  },
  created() {},
  computed: {},
  methods: {
    tabsChanCallback(activeKey){
        console.log(activeKey,'activeKey')
    }
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
.invoice_con {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .first_area {
    width: 100%;
    height: 80px;
    background: #ffffff;
    border-radius: 2px;
    margin-bottom: 16px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .til {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
  }
  .second_area{
    width: 100%;
    min-height: 906px;
    background-color: #ffffff;
    padding: 25px 19px;
    box-sizing: border-box;
  }
}
</style>