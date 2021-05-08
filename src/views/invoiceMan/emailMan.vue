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
        ref="xTableEmailMan"
      >
        <vxe-table-column
          field="emial"
          width="50%"
          title="邮箱"
        ></vxe-table-column>
        <vxe-table-column
          field="operation"
          width="50%"
          title="操作"
          show-overflow
        >
          <template v-slot="{ row }">
            <div>
              <a
                style="
                  color: #faad14;
                  border: 1px solid #faad14;
                  padding: 2px 6px;
                "
                @click="settingAddress(row)"
                >默认地址</a
              >
              <a style="color: #0376fd" @click="editRow(row)">修改</a>
              <a style="color: #ff4d4f" @click="deleteRow(row)">删除</a>
            </div>
          </template>
        </vxe-table-column>
        <template v-slot:empty>
          <span>暂无地址，请先</span><span @click="addAddress">添加邮箱</span>
        </template>
      </vxe-table>
    </div>
    <div class="add_btn_con">
      <a-button type="primary" icon="plus" @click="addAddress">
        新增邮箱
      </a-button>
    </div>
    <vAddEmail v-if="ifShowEmialPopwin" @closePopWin="closeMyPopWin"></vAddEmail>
  </div>
</template>

<script>
import vAddEmail from "./addEmail";
export default {
  name: "shipAddressMan",
  data() {
    return {
      hasNum: 0,
      remainNum: 10,
      tableData: [
        // { recsName: "Test1", telNum: "Develop", address: "Man", postCode: 28 },
      ],
      loading: false,
      ifShowEmialPopwin: false,
    };
  },
  created() {},
  components: {
    vAddEmail,
  },
  methods: {
    settingAddress(arg) {},
    editRow(arg) {},
    deleteRow(arg) {},
    addAddress() {
      this.ifShowEmialPopwin = true;
    },
    closeMyPopWin(arg){
      this.ifShowEmialPopwin = arg;
    }
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
    min-height: 200px;
    margin-top: 23px;
    /deep/ .vxe-table--render-default {
      min-height: 200px;
    }
    /deep/
      .vxe-table--render-default
      .vxe-table--main-wrapper
      .body--wrapper
      .vxe-table--header {
      width: 100%;
    }
    /deep/ .vxe-table .vxe-table--empty-placeholder {
      height: 254px !important;
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