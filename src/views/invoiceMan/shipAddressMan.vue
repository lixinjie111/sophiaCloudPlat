<template>
  <div class="shipAddressMan_con">
    <div class="invoice_info">
      当前已添加
      <span>{{ hasNum }}</span>
      条地址，还能保存
      <span>{{ remainNum }}</span>
      条地址
    </div>
    <div class="invoice_con">
      <vxe-table
        border
        show-header-overflow
        show-overflow
        highlight-hover-row
        :data="tableData"
        :loading="loading"
        ref="xTableAddress"
      >
        <vxe-table-column
          field="recsName"
          title="收件人姓名"
        ></vxe-table-column>
        <vxe-table-column field="telNum" title="电话号码"></vxe-table-column>
        <vxe-table-column field="address" title="地址"></vxe-table-column>
        <vxe-table-column field="postCode" title="邮编"></vxe-table-column>
        <vxe-table-column field="operation" title="操作" show-overflow>
          <template v-slot="{ row }">
            <div class="operDiv">
              <a
                v-if="row.isDefaultFlag == 1"
                :class="{ isdefault: row.isDefaultFlag == 1 }"
                @click="settingAddress(row)"
                >默认地址</a
              >
              <a v-else @click="settingAddress(row)">设为默认</a>
              <a style="color: #0376fd" @click="editRow(row)">修改</a>
              <a style="color: #ff4d4f" @click="deleteRow(row)">删除</a>
            </div>
          </template>
        </vxe-table-column>
        <template v-slot:empty>
          <span>暂无地址，请先</span><span @click="addAddress">添加地址</span>
        </template>
      </vxe-table>
    </div>
    <div class="add_btn_con">
      <a-button type="primary" icon="plus" @click="addAddress">
        新增地址
      </a-button>
    </div>
    <vAddShipAddress
      v-if="ifShowPopwin"
      @closePopWin="closeMyPopWin"
      :operParms="operParmsFath"
    ></vAddShipAddress>
  </div>
</template>

<script>
import {
  queryPostAddressList,
  deletePostAddress,
  setDefaultAddress
} from "../../api/invoiceMan/index";
import vAddShipAddress from "./addShipAddress";
export default {
  name: "shipAddressMan",
  data() {
    return {
      hasNum: 0,
      remainNum: 10,
      tableData: [],
      loading: false,
      ifShowPopwin: false,
      operParmsFath: {},
    };
  },
  created() {
    this.getTableData();
  },
  components: {
    vAddShipAddress,
  },
  methods: {
    settingAddress(arg) {
      if (arg.isDefaultFlag == 1) {
        return;
      } else {
        var parms = {
          addressId: arg.addressId,
          isDefaultFlag: 1,
        };
        setDefaultAddress(parms)
          .then((res) => {
            if (res.code == 200000) {
              this.$message.success("设为默认地址成功！");
              this.$emit("getNewAddress");
              this.getTableData();
            } else {
              this.$message.error(res.message || "设为默认地址失败！");
            }
          })
          .catch((err) => {
            this.$message.error("设为默认地址失败！");
          });
      }
    },
    editRow(arg) {
      this.operParmsFath = {
        title: "编辑地址",
        operType: "edit",
        arg: arg,
      };
      this.ifShowPopwin = true;
    },
    deleteRow(arg) {
      var parms = {
        addressId: arg.addressId
      };
      this.$comfirm("确定要删除这条地址吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "configPopwin",
      })
        .then(() => {
          deletePostAddress(parms)
            .then((res) => {
              if (res.code == 200000) {
                this.$message.success("删除成功！");
                this.getTableData();
              } else {
                this.$message.error("删除寄送地址失败！");
              }
            })
            .catch((err) => {
              this.$message.error("删除寄送地址失败！");
            });
        })
        .catch(() => {
          console.log("失败！");
        });
    },
    addAddress() {
      if (this.remainNum == 0) {
        this.$message.warning("添加地址条数已到上限！");
        return;
      }
      this.operParmsFath = {
        title: "添加地址",
        operType: "add",
      };
      this.ifShowPopwin = true;
    },
    closeMyPopWin(arg) {
      this.ifShowPopwin = arg.bl;
      if (arg.op == "ref") {
        this.getTableData();
        this.$emit("getNewAddress");
      }
    },
    getTableData() {
      this.loading = true;
      var parms = {
        addressId: "",
        page: 1,
        pageSize: 10,
      };
      queryPostAddressList(parms)
        .then((res) => {
          if (res.code == 200000) {
            this.loading = false;
            var newTableData = [];
            var tableDataList = res.data.list || [];
            this.hasNum = tableDataList.length;
            this.remainNum = 10 - tableDataList.length;
            tableDataList.forEach((element) => {
              newTableData.push({
                recsName: element.recipient,
                telNum: element.contactPhone,
                address: element.addressComplete,
                postCode: element.postalCode,
                isDefaultFlag: element.isDefaultFlag,
                addressId: element.addressId,
                province: element.province,
                city: element.city,
                district: element.district,
              });
            });
            this.tableData = newTableData;
          } else {
            this.loading = false;
            this.$message.error(res.message || "获取寄送地址列表数据失败！");
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("获取寄送地址列表数据失败！");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.shipAddressMan_con {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .invoice_info {
    width: 100%;
    height: 32px;
    background-color: rgba(255, 251, 230, 0.6);
    padding-left: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    span {
      color: #0376fd;
    }
  }
  .invoice_con {
    width: 100%;
    margin-top: 23px;
    /deep/
      .vxe-table--render-default
      .vxe-table--main-wrapper
      .vxe-table--body-wrapper
      .vxe-table--body
      tbody
      .vxe-body--row
      .vxe-body--column
      .vxe-cell
      .operDiv {
      a {
        border: 1px solid rgba(0, 0, 0, 0.3);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        padding: 0px 4px;
      }
      .isdefault {
        border: 1px solid #faad14;
        color: #faad14;
      }
    }
    /deep/ .vxe-table .vxe-table--empty-placeholder .vxe-table--empty-content {
      span:nth-child(1),
      span:nth-child(2) {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 33px;
      }
      span:nth-child(1) {
        color: rgba(0, 0, 0, 0.2);
      }
      span:nth-child(2) {
        color: #0376fd;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .add_btn_con {
    width: 100%;
    margin-top: 29px;
  }
}
</style>