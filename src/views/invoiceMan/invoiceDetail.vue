<template>
  <div class="invoiceDetail_con">
    <div class="title_container">发票详情</div>
    <div class="content_container">
      <div class="info_con">
        <span>您的发票申请分</span>
        <span class="info_num">{{ fpNum }}</span>
        <span>张发票开具，开票总额：</span>
        <span class="info_num">¥ {{ fpMoney }}</span>
      </div>
      <div class="label_txt">发票1</div>
      <div class="fp_table">
          <table class="fp1_class">
              <tr class="tr_class">
                  <td class="td_label">所属账号</td>
                  <td>psychic0111</td>
                  <td class="td_label">发票金额</td>
                  <td>¥ 123.00</td>
              </tr>
              <tr class="tr_class">
                  <td class="td_label">发票性质</td>
                  <td>电子发票</td>
                  <td class="td_label">发票状态</td>
                  <td>待审核</td>
              </tr>
              <tr class="tr_class">
                  <td class="td_label">发票类型</td>
                  <td>增值税普通发票</td>
                  <td class="td_label">发票抬头</td>
                  <td>上海元知晟睿科技研究有限公司北京分公司</td>
              </tr>
              <tr class="tr_class">
                  <td class="td_label">申请时间</td>
                  <td>2021-02-21 18:00:02</td>
                  <td class="td_label">发票编号</td>
                  <td>--</td>
              </tr>
              <tr class="tr_class tr_class1">
                  <td class="td_label">备注</td>
                  <td colspan="3"></td>
              </tr>
          </table>
      </div>
      <div class="label_txt">订单信息</div>
      <div class="order_table">
        <vxe-table
          :align="allAlign"
          :data="myTableData"
          highlight-hover-row
          show-header-overflow
        >
          <vxe-table-column
            field="orderNum"
            title="订单编号"
          ></vxe-table-column>
          <vxe-table-column field="proName" title="产品名称"></vxe-table-column>
          <vxe-table-column
            field="payTime"
            title="订单支付时间"
          ></vxe-table-column>
          <vxe-table-column field="money" title="金额"></vxe-table-column>
          <vxe-table-column
            field="successTime"
            title="成功时间"
          ></vxe-table-column>
        </vxe-table>
        <vxe-pager
          border
          size="medium"
          :loading="loading2"
          :current-page="tablePage2.currentPage"
          :page-size="tablePage2.pageSize"
          :total="tablePage2.totalResult"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChange2"
        >
        </vxe-pager>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "invoiceDetail",
  data() {
    return {
      fpNum: 1,
      fpMoney: "123.00",
      allAlign: null,
      myTableData: [
        {
          orderNum: "Test1",
          proName: "Develop",
          payTime: "Man",
          money: 28,
          successTime: "vxe-table 从入门到放弃",
        },
        {
          orderNum: "Test2",
          proName: "Test",
          payTime: "Women",
          money: 22,
          successTime: "Guangzhou",
        },
        {
          orderNum: "Test3",
          proName: "PM",
          payTime: "Man",
          money: 32,
          successTime: "Shanghai",
        },
        {
          orderNum: "Test4",
          proName: "Designer",
          payTime: "Women ",
          money: 24,
          successTime: "Shanghai",
        },
      ],
      loading2: false,
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
    };
  },
  created() {

  },
  methods: {
    handlePageChange2 ({ currentPage, pageSize }) {
        this.tablePage2.currentPage = currentPage
        this.tablePage2.pageSize = pageSize
    }
  },
};
</script>
<style lang="scss" scoped>
.invoiceDetail_con {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .title_container {
    width: 100%;
    height: 53px;
    border-bottom: 1px solid #cfcdcd;
    padding: 15px 27px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
  }
  .content_container {
    width: 100%;
    min-height: 600px;
    padding: 19px 27px;
    box-sizing: border-box;
    .info_con {
      width: 100%;
      height: 40px;
      background: #fffbe6;
      padding-left: 20px;
      border-radius: 2px;
      border: 1px solid #ffe58f;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      .info_num {
        color: #0376fd;
      }
    }
    .label_txt {
      width: 100%;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #121c33;
      margin: 20px 0;
    }
    .fp_table {
      width: 100%;
      height: 285px;
      .fp1_class{
          width: 100%;
          height: 100%;
          border-radius: 2px;
          .tr_class{
              width: 100%;
              height: 45px;
              .td_label{
                  width: 144px;
                  background-color:#FAFAFA;
              }
          }
          .tr_class1{
              height: 104px;
          }
      }
      .fp1_class,tr,td{
          border: 1px solid rgba(0, 0, 0, 0.15);
          text-align: left;
          padding-left: 24px;
          box-sizing: border-box;
      }
    }
    .order_table {
      width: 100%;
    }
  }
}
</style>