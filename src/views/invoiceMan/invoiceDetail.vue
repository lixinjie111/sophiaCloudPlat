<template>
  <div class="invoiceDetail_con">
    <div class="title_container">发票详情</div>
    <div class="content_container">
      <!-- <div class="info_con">
        <span>您的发票申请分</span>
        <span class="info_num">{{ fpNum }}</span>
        <span>张发票开具，开票总额：</span>
        <span class="info_num">¥ {{ fpMoney }}</span>
      </div> -->
      <div class="label_txt">发票1</div>
      <div class="fp_table">
        <table class="fp1_class">
          <tr class="tr_class">
            <td class="td_label">所属账号</td>
            <td>{{ detailTableData.userAccount }}</td>
            <td class="td_label">发票金额</td>
            <td>¥ {{ moneyNum }}</td>
          </tr>
          <tr class="tr_class">
            <td class="td_label">发票性质</td>
            <td>
              {{ detailTableData.invoicePropertyDesc }} &nbsp;&nbsp;&nbsp;&nbsp;
              <a-button
                v-if="
                  detailTableData.invoiceStatusDesc == '已开票' ||
                  detailTableData.invoiceStatusDesc == '已作废' ||
                  detailTableData.invoiceStatusDesc == '已红冲' ||
                  detailTableData.invoiceStatusDesc == '退票中'
                "
                type="primary"
                icon="download"
                size="small"
                @click="downInvoice(detailTableData)"
                >下载</a-button
              >
            </td>
            <td class="td_label">发票状态</td>
            <td :style="detailTableData.styleObject">
              {{ detailTableData.invoiceStatusDesc }}
            </td>
          </tr>
          <tr class="tr_class">
            <td class="td_label">发票类型</td>
            <td>{{ detailTableData.invoiceTypeDesc }}</td>
            <td class="td_label">发票抬头</td>
            <td>{{ detailTableData.title }}</td>
          </tr>
          <tr class="tr_class">
            <td class="td_label">申请时间</td>
            <td>{{ detailTableData.applyTime }}</td>
            <td class="td_label">发票编号</td>
            <td>{{ detailTableData.orderSn }}</td>
          </tr>
          <tr
            class="tr_class"
            v-if="detailTableData.invoiceStatusDesc == '已拒绝'"
          >
            <td class="td_label">拒绝原因</td>
            <td colspan="3" :style="detailTableData.styleObject">
              {{ detailTableData.refundTypeDesc }}
            </td>
          </tr>
          <tr class="tr_class tr_class1">
            <td class="td_label">备注</td>
            <td colspan="3">{{ detailTableData.remark }}</td>
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
          :loading="loading"
          ref="xTable"
        >
          <vxe-table-column field="orderSn" title="订单编号"></vxe-table-column>
          <vxe-table-column
            field="serviceName"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            field="paySuccessTime"
            title="订单支付时间"
          ></vxe-table-column>
          <vxe-table-column field="invoiceAmount" title="金额" formatter="formatAmount"></vxe-table-column>
          <vxe-table-column
            field="openTime"
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
import {
  queryInvoiceDetail,
  queryInvoiceOrderList,
} from "../../api/invoiceMan/index";
export default {
  name: "invoiceDetail",
  data() {
    return {
      fpNum: 1,
      fpMoney: "123.00",
      allAlign: null,
      myTableData: [],
      loading2: false,
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      loading: false,
      loading2: false,
      detailTableData: {},
    };
  },
  created() {
    this.getPageData();
    this.getOrderList();
  },
  computed: {
    moneyNum() {
      return this.$myUtilsFn.commafy(
        this.$myUtilsFn.toNumber(this.detailTableData.totalAmount),
        { digits: 2 }
      );
    },
  },
  methods: {
    downInvoice(arg) {
      console.log(arg, "arg");
      location.href = arg.invoiceFile || "";
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage;
      this.tablePage2.pageSize = pageSize;
      this.getOrderList();
    },
    getPageData() {
      var parms = this.$route.query.detailData;
      var getParm = {
        invoiceId: parms.invoiceId || "",
      };
      queryInvoiceDetail(getParm)
        .then((res) => {
          if (res.code == 200000) {
            var getData = res.data || {};
            if (
              getData.invoiceStatusDesc == "待审核" ||
              getData.invoiceStatusDesc == "已开票"
            ) {
              getData.styleObject = {
                color: "#51C41B",
              };
            } else if (getData.invoiceStatusDesc == "开票中") {
              getData.styleObject = {
                color: "#FAAD14",
              };
            } else if (
              getData.invoiceStatusDesc == "已拒绝" ||
              getData.invoiceStatusDesc == "已作废" ||
              getData.invoiceStatusDesc == "已红冲" ||
              getData.invoiceStatusDesc == "退票中"
            ) {
              getData.styleObject = {
                color: "#FF4D4F",
              };
            } else if (getData.invoiceStatusDesc == "已撤销") {
              getData.styleObject = {
                color: "#121C33",
              };
            }
            this.detailTableData = getData;
          } else {
            this.$message.error(res.message || "请求发票列表数据失败！");
          }
        })
        .catch((err) => {
          this.$message.error("请求发票列表数据失败！");
        });
    },
    getOrderList() {
      this.loading = true;
      this.loading2 = true;
      var parms = this.$route.query.detailData;
      var getParm = {
        invoiceId: parms.invoiceId || "",
        page: this.tablePage2.currentPage,
        pageSize: this.tablePage2.pageSize,
      };
      queryInvoiceOrderList(getParm)
        .then((res) => {
          this.loading = false;
          this.loading2 = false;
          if (res.code == 200000) {
            var getData = res.data || {};
            this.myTableData = getData.list || [];
            this.tablePage2.totalResult = getData.total || 0;
          } else {
            this.$message.error(res.message || "请求发票列表数据失败！");
          }
        })
        .catch((err) => {
          this.$message.error("请求发票列表数据失败！");
        });
    },
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
      .fp1_class {
        width: 100%;
        border-radius: 2px;
        .tr_class {
          width: 100%;
          height: 45px;
          .td_label {
            width: 144px;
            background-color: #fafafa;
          }
        }
        .tr_class1 {
          height: 104px;
        }
      }
      .fp1_class,
      tr,
      td {
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