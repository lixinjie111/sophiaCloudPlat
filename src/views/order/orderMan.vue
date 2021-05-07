<template>
  <div class="invoice_con">
    <div class="first_area">
      <div class="til">订单管理</div>
      <div class="search_area">
        <div style="margin-right: 10px">
          产品：
          <a-select style="width: 120px" placeholder="请选择" v-model="parmas.serviceModel">
            <a-select-option v-for="it in proList" :key="it.id" :value="it.id">
              {{it.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="sear_label">时间范围：</div>
        <div class="choice_time">
          <div class="time_container">
            <el-date-picker

              v-model="rangeTime"
              type="daterange"
              range-separator="→"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="changeDataRange"
              style="width: 280px;height: 100%"
            ></el-date-picker>
          </div>
          <div class="select_container close_week">
            <a-select
              v-model="selVal"
              style="width: 100%"
              @change="choiceRange"
            >
              <a-select-option value="cl7">最近7天</a-select-option>
              <a-select-option value="by">本月</a-select-option>
              <a-select-option value="sgy">上个月</a-select-option>
              <a-select-option value="sgjd">上个季度</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="sear_label">订单号：</div>
        <div class="sear_input">
          <el-input v-model="parmas.orderSn" class="fptt_class" placeholder="请输入" style="width: 150px"></el-input>
          <el-button type="primary" @click="getSearch">搜 索</el-button>
          <el-button icon="el-icon-refresh-right" circle @click="refresh"></el-button>
        </div>
      </div>
    </div>
    <div class="three_area">
      <vxe-table
        border
        ref="xTable"
        :scroll-y="{enabled: false}"
        show-header-overflow
        highlight-hover-row
        :align="allAlign"
        :data="tableData"
        :loading="loading"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="orderSn" title="订单号" width="200">
          <template #default="{ row }">
            <vxe-button type="text" status="primary" @click="getDetail(row.orderSn)">{{row.orderSn}}</vxe-button>
          </template>
        </vxe-table-column>
        <vxe-table-column field="serviceName" title="产品名称" width="100"></vxe-table-column>
        <vxe-table-column field="payStatus" title="支付状态" width="120" :title-help="{message: `未支付：订单创建完成，但并未完成支付
         已支付：订单创建并完成支付
         已作废：订单由于支付超时或主动取消`}"
                          :filters="[{label: '已支付', value: 1}, {label: '未支付', value: 2}, {label: '已作废', value: 3}, {label: '退款中', value: 4}, {label: '已退款', value: 5}]"
                          :filter-multiple="true">
          <template #default="{ row }">
            <span style="color: #51C41B" v-if="row.payStatus==1">已支付</span>
            <span style="color: #FF4D4F" v-if="row.payStatus==2">未支付</span>
            <span style="color: #FAAD14" v-if="row.payStatus==3">已作废</span>
            <span style="color: #409EFF" v-if="row.payStatus==4">退款中</span>
            <span style="color: #909399" v-if="row.payStatus==5">已退款</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="orderType" width="120" title="订单类型" :title-help="{message: '新购：用户采购或开通某种产品或者服务\n'+
'续费：用户通过付费延长资源的有效使用时长\n'+
'升级：用户在付费有效期内提升产品规格、功能或者服务\n'+
'降级：用户在有效期内降低产品或者服务的配置\n'+
'退费：用户发起释放资源并按照使用情况退还相关费用'}"
                          :filters="[{label: '新购', value: 1}, {label: '续费', value: 2}, {label: '退费', value: 5}]"
                          :filter-multiple="true">
          <template #default="{ row }">
            <span v-if="row.orderType==1">新购</span>
            <span v-if="row.orderType==2">续费</span>
            <span v-if="row.orderType==3">升级</span>
            <span v-if="row.orderType==4">降级</span>
            <span v-if="row.orderType==5">退费</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="orderAmount" width="100" title="订单金额">
          <template #default="{ row }">
            <span>￥{{row.orderAmount}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="orderPayAmount" width="100" title="应付金额">
          <template #default="{ row }">
            <span>￥{{row.orderPayAmount}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="orderAssort" title="付费方式" width="100"
                          :filters="[{label: '后付费', value: 1}, {label: '预付费', value: 2}]"
                          :filter-multiple="true">
          <template #default="{ row }">
            <span v-if="row.orderAssort==1">后付费</span>
            <span v-if="row.orderAssort==2">预付费</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="createTime" title="下单时间" sortable width="150" center></vxe-table-column>
        <vxe-table-column field="paySuccessTime" title="支付/开通时间" sortable width="150"></vxe-table-column>
        <vxe-table-column title="操作" width="200">
          <template #default="{ row }">
            <vxe-button type="text" status="primary" content="详情" @click="getDetail(row.orderSn)"></vxe-button>
            <el-tag type="danger" @click="payOne(row.orderSn)" v-if="row.payStatus==2" style="width: 40px;
height: 22px;line-height: 22px;cursor: pointer;    text-align: center;
    padding: 0;">支付
            </el-tag>
            <vxe-button type="text" status="primary" content="取消订单" @click="cancelOrder(row.orderSn)"
                        v-if="row.payStatus==2"></vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager
        border
        size="medium"
        :current-page="parmas.pageIndex"
        :page-size="parmas.pageSize"
        :total="totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange2"
      >
        <template #left>
            <span class="page-left">
              <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate"
                            @change="changeAllEvent"></vxe-checkbox>
              <span style="position: relative;top: 3px;">{{ selectRecords.length }} 条</span>
              <vxe-button status="primary" :disabled="selectRecords.length===0" @click="payAll">批量支付</vxe-button>
              <vxe-button status="primary" :disabled="selectRecords.length===0" @click="AllCancel">批量取消</vxe-button>
            </span>
        </template>
      </vxe-pager>
    </div>
  </div>
</template>

<script>
    import moment from "moment";
    import "moment/locale/zh-cn";
    import {orderList, cancelOrder} from '@/api/order/order';
    import {MessageBox} from 'element-ui'

    export default {
        name: "invoiceMan",
        data() {
            return {
                parmas: {
                    "serviceModel": undefined,
                    "orderSn": "",
                    "beginDate": "",
                    "endDate": "",
                    "pageIndex": 1,
                    "pageSize": 10
                },
                totalResult: "",
                isAllChecked: false,
                isIndeterminate: false,
                selectRecords: [],
                date: [],
                proList: [
                    {
                        id: 1,
                        name: "自然语言处理"
                    },
                    {
                        id: 2,
                        name: "语言技术"
                    }, {
                        id: 3,
                        name: "文字识别"
                    }, {
                        id: 4,
                        name: "图片识别"
                    }, {
                        id: 5,
                        name: "视频技术"
                    }, {
                        id: 6,
                        name: "人脸识别"
                    }],
                rangeTime: [moment(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')],
                selVal: 'cl7',
                fpttVal: '',
                moneyNum: '0.00',
                activeName: 'first',
                allAlign: null,
                tableData: [],
                loading: false,
                loading2: false,
                tableData2: [],
                tablePage2: {
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 0
                }
            };
        },
        created() {
            this.getList()
        },
        methods: {
            getDetail(id) {
                this.$router.push({
                    path: "/orderInfo?id=" + id
                })
            },
            payOne(id) {
                this.$router.push({
                    path: "/pay?id=" + id
                })
            },
            payAll() {
                console.log(this.selectRecords)
                var orderSnList = []
                this.selectRecords.forEach((value) => {
                    orderSnList.push(value.orderSn)
                })
                this.$router.push({
                    path: "/pay?id=" + orderSnList.splice(',')
                })
            },
            AllCancel() {
                this.selectRecords.forEach((value) => {
                    this.cancelOrder(value.orderSn)
                })
            },
            cancelOrder(id) {
                MessageBox.confirm('您是否要取消该订单?', '取消订单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new FormData();
                    data.append('orderSn', id);
                    cancelOrder(data).then((res) => {
                        console.log(res)
                        if (res.data.code === 200000) {
                            this.$message.success("取消成功")
                            this.getList()
                        } else {
                            this.$message.error("取消订单失败")
                        }
                    })
                }).catch(() => {

                });
            },
            refresh() {
                this.rangeTime = [moment(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')]
                this.selVal = 'cl7'
                this.parmas = {
                    "serviceModel": undefined,
                    "orderSn": "",
                    "beginDate": "",
                    "endDate": "",
                    "pageIndex": 1,
                    "pageSize": 10
                };
                this.getList()
            },
            getSearch() {
                this.getList()
            },
            // 获取应用列表
            getList() {
                this.loading = true
                orderList(this.parmas).then((res) => {
                    console.log(res)
                    if (res.data.code === 200000) {
                        this.tableData = res.data.data.list
                        console.log('res.data.total', res.data.data.total)
                        this.totalResult = res.data.data.total
                        this.loading = false
                    } else {
                        this.$message.error("获取失败")
                    }
                })
            },
            changeAllEvent() {
                const $table = this.$refs.xTable
                $table.setAllCheckboxRow(this.isAllChecked)
                this.selectRecords = $table.getCheckboxRecords()
            },
            checkboxChangeEvent({records}) {
                const $table = this.$refs.xTable
                this.isAllChecked = $table.isAllCheckboxChecked()
                this.isIndeterminate = $table.isCheckboxIndeterminate()
                this.selectRecords = records
            },
            changeDataRange(e) {
                var dateList = e || [];
                this.parmas.beginDate = dateList[0];
                this.parmas.endDate = dateList[1];
            },
            choiceRange(e) {
                if (e == 'cl7') {
                    this.rangeTime = [moment(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')];
                    this.parmas.beginDate = this.rangeTime[0];
                    this.parmas.endDate = this.rangeTime[1];
                } else if (e == 'by') {
                    const startDate = moment().month(moment().month()).startOf('month').valueOf();
                    const endDate = moment().month(moment().month()).endOf('month').valueOf();
                    this.rangeTime = [moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')];
                    this.parmas.beginDate = this.rangeTime[0];
                    this.parmas.endDate = this.rangeTime[1];
                } else if (e == 'sgy') {
                    const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
                    const endDate = moment().month(moment().month() - 1).endOf('month').valueOf();
                    this.rangeTime = [moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')];
                    this.parmas.beginDate = this.rangeTime[0];
                    this.parmas.endDate = this.rangeTime[1];
                } else if (e == 'sgjd') {
                    const startDate = moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf();
                    const endDate = moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf();
                    this.rangeTime = [moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')];
                    this.parmas.beginDate = this.rangeTime[0];
                    this.parmas.endDate = this.rangeTime[1];
                }
            },
            handlePageChange2({currentPage, pageSize}) {
                this.parmas.pageIndex = currentPage
                this.parmas.pageSize = pageSize
                this.getList()
            }
        },
    };
</script>
<style lang="scss" scoped>
  .page-left {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

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

      .search_area {
        display: flex;
        align-items: center;

        .sear_label {
          width: 70px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          margin-right: 6px;
        }

        .choice_time {
          display: flex;
          align-items: center;

          .select_container {
            min-width: 120px;
            height: 32px;
            margin-right: 20px;
          }

          .close_week {
            margin-left: 20px;
          }

          .time_container {
            height: 32px;

            /deep/ .el-date-editor .el-range-separator {
              line-height: 26px;
            }

            /deep/ .el-date-editor .el-input__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .sear_input {
          display: flex;
          align-items: center;

          .fptt_class {
            width: 174px;
            height: 32px;
            margin-right: 21px;

            /deep/ .el-input__inner {
              height: 100%;
            }
          }

          .el-button--primary {
            width: 64px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .sec_area {
      width: 100%;
      height: 179px;
      background-color: #f5f5f5;
      border-radius: 2px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .fp_money {
        width: 24.6%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;

        .fp_money_til {
          width: 100%;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #121C33;
        }

        .fp_money_num {
          width: 100%;
          padding-left: 33px;
          box-sizing: border-box;
          margin-bottom: 19px;
          font-size: 36px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0376FD;
        }

        .fp_money_btn {
          width: 160px;
          height: 32px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .fp_info, .fp_address {
        width: 37.08%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;

        .til_edit_con {
          width: 100%;
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .til_txt {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #121C33;
          }

          .el-icon-edit {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .no_fp_info_con {
          margin-top: 40px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #121C33;
        }
      }
    }

    .three_area {
      width: 100%;
      min-height: 615px;
      background: #ffffff;
      border-radius: 2px;
      padding: 25px 19px;
      box-sizing: border-box;
    }
  }
</style>
