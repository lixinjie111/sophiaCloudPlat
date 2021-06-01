<template>
  <div>
    <div class="pay_text">
      订单详情
    </div>
    <el-divider></el-divider>
    <div v-if="orderinfo.payStatus==2">
      <div class="info_message">
        <i class="el-icon-warning" style="margin-right: 10px"></i>订单状态：<span style="color: #FF4D4F">未支付</span>，请于{{orderinfo.createTime}}前完成支付，若未及时付款，系统将自动取消订单
      </div>
    </div>
    <div class="flex_between" style="padding: 0 20px 0 20px;margin-top: 20px">
      <div>
        <div style="border-left: 3px solid #0376FD">
          <span style="font-weight: 500;margin-left: 6px">订单信息</span>
        </div>
      </div>
    </div>
    <div style="padding: 20px">
      <div class="flex_between" style="width: 80%">
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            订单号:
          </div>
          <div>
            {{orderinfo.orderSn}}
          </div>
        </div>
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            订单类型:
          </div>
          <div>
            <span v-if="orderinfo.orderType==1">新购</span>
            <span v-if="orderinfo.orderType==2">续费</span>
            <span v-if="orderinfo.orderType==3">升级</span>
            <span v-if="orderinfo.orderType==4">降级</span>
            <span v-if="orderinfo.orderType==5">退费</span>
          </div>
        </div>
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            支付方式:
          </div>
          <div>
            <span v-if="orderinfo.orderAssort==1">后付费</span>
            <span v-if="orderinfo.orderAssort==2">预付费</span>
          </div>
        </div>
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            创建时间:
          </div>
          <div>
            {{orderinfo.createTime}}
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 0 20px 0 20px;margin-top: 10px">
      <div>
        <div style="border-left: 3px solid #0376FD">
          <span style="font-weight: 500;margin-left: 6px">订单配置</span>
        </div>
      </div>
    </div>
    <div style="padding: 20px">
      <el-table
        :data="tableData"
      >
        <el-table-column
          prop="serviceModelName"
          label="API名称"
        >
          <template slot-scope="scope">
            <span >{{scope.row.serviceName}}-{{scope.row.serviceModelName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderAssort"
          label="付费方式"

        >
          <template slot-scope="scope">
            <span v-if="scope.row.orderAssort==1">后付费</span>
            <span v-if="scope.row.orderAssort==2">预付费</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="packageAllocation"
          label="配置">
          <template slot-scope="scope">
            <span>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderPackageTime"
          label="时长">
          <template slot-scope="scope">
            <span>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
          <template slot-scope="scope">
            <span style="color: #0376FD" @click="onPriceLook(scope.row)">见产品定价文档</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="resourceUnit"
          label="计费方式">
          <template slot-scope="scope">
            <span v-if="scope.row.resourceUnit==1">按量计费</span>
            <span v-if="scope.row.resourceUnit==2">按时长计费</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import {getPostOrderInfo} from '@/api/order/order';
    export default {
        data() {
            return {
                orderinfo: "",
                radio: 1,
                payStatus: 2,
                activeName: 'first',
                tableData: []
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.getOrderInfo()
            }
        },
        methods: {
            getOrderInfo() {
                let data = new FormData();
                data.append('orderSn', this.$route.query.id);
                getPostOrderInfo(data).then((res) => {
                    if (res.data.code === 200000) {
                        this.orderinfo = res.data.data;
                        this.tableData = [res.data.data]
                    }
                })
            },
            onPriceLook(record){
              window.open(record.fixedPriceUrl)
            }
        }
    }
</script>

<style scoped>
  .info_message {
    width: 60%;
    margin: auto;
    text-align: center;
    line-height: 32px;
    height: 32px;
    background: #FFFBE6;
    border-radius: 2px;
    border: 1px solid #FFE58F;
    color: rgba(0, 0, 0, 0.65);
  }

  .flex_between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .flex {
    display: flex;
    flex-direction: row;
  }

  .pay_text {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    padding: 10px 10px 0px 20px
  }
</style>
