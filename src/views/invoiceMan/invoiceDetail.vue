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
        <vxe-grid
          border
          highlight-hover-row
          class="reverse-table"
          :show-header="false"
          :columns="tableColumn"
          :data="tableData"
        ></vxe-grid>
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
      tableColumn: [],
      tableData: [],
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
    console.log(this.$route.query.detailData, "detailData");
    const myColumns = [
      { field: "name", title: "所属账号" },
      { field: "role", title: "发票性质" },
      { field: "sex", title: "发票类型" },
      { field: "age", title: "申请时间" },
      { field: "address", title: "退票原因" },
    ];
    const myData = [
      {
        id: 10001,
        name: "Test1",
        nickname: "T1",
        role: "Develop",
        sex: "Man",
        age: 28,
        address: "Shenzhen",
      },
    ];
    this.reverseTable(myColumns, myData);
  },
  methods: {
    handlePageChange2 ({ currentPage, pageSize }) {
        this.tablePage2.currentPage = currentPage
        this.tablePage2.pageSize = pageSize
        // this.getfpManData()
    },
    reverseTable(columns, list) {
      const buildData = columns.map((column) => {
        const item = { col0: column.title };
        list.forEach((row, index) => {
          item[`col${index + 1}`] = row[column.field];
        });
        return item;
      });
      const buildColumns = [
        {
          field: "col0",
          fixed: "left",
          width: 80,
        },
      ];
      list.forEach((item, index) => {
        buildColumns.push({
          field: `col${index + 1}`,
          minWidth: 120,
        });
      });
      this.tableData = buildData;
      this.tableColumn = buildColumns;
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
    }
    .order_table {
      width: 100%;
    }
  }
}
</style>