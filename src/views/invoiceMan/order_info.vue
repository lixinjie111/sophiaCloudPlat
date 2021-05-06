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
      <div class="flex_between" style="width: 60%">
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
      </div>
      <div class="flex" style="width: 60%;margin-top: 10px">
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            创建时间:
          </div>
          <div>
            {{orderinfo.createTime}}
          </div>
        </div>
        <div class="flex" style="align-items: center;margin-left: 157px">
          <div style="width: 100px">
            支付/生效时间:
          </div>
          <div>
            {{orderinfo.paySuccessTime==null?'- -':orderinfo.paySuccessTime}}
          </div>
        </div>
      </div>
      <div class="flex_between" style="width: 60%;margin-top: 10px">
        <div class="flex" style="align-items: center">
          <div style="width: 80px">
            订单状态:
          </div>
          <div style="color: #FF4D4F;" v-if="orderinfo.payStatus==2">
            未支付 ¥ {{orderinfo.orderAmount}}
          </div>
          <div style="color: #51C41B;" v-if="orderinfo.payStatus==1">
            已支付 ¥ {{orderinfo.orderAmount}}
          </div>
          <div style="color: #FAAD14" v-if="orderinfo.payStatus==3">
            已作废 ¥ {{orderinfo.orderAmount}}
          </div>
        </div>
      </div>
      <div style="margin-top: 20px" v-if="orderinfo.payStatus==2">
        <div>
          <el-button type="primary" size="medium" @click="pay">立即支付</el-button>
          <el-button size="medium" type="info" @click="cancelOrder">取消订单</el-button>
        </div>
      </div>
      <div v-if="orderinfo.payStatus==1||orderinfo.payStatus==3" style="margin-top: 20px">
        <el-table
          :data="tableData"
        >
          <el-table-column
            prop="payWay"
            label="支付渠道"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.payWay==1">微信</span>
              <span v-if="scope.row.payWay==2">支付宝</span>
              <span v-if="scope.row.payWay==3">余额</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            label="扣款费用"
          >
            <template slot-scope="scope">
              <span>￥{{scope.row.orderAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="paySuccessTime"
            label="扣款时间">
          </el-table-column>
          <el-table-column
            prop="orderSn"
            label="流水编号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="支付账号">
          </el-table-column>
        </el-table>
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
        :data="orderinfo.orderAllocations"
      >
        <el-table-column
          prop="apiPackageName"
          label="资源包类型"
        >
        </el-table-column>
        <el-table-column
          prop="paymentMethod"
          label="付费方式"

        >
          <template slot-scope="scope">
            <span v-if="scope.row.paymentMethod==1">后付费</span>
            <span v-if="scope.row.paymentMethod==2">预付费</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="packageAllocation"
          label="配置">
          <template slot-scope="scope">
            <span>{{scope.row.packageAllocation===null?'':scope.row.packageAllocation+'万次'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="packageTime"
          label="时长">
          <template slot-scope="scope">
            <span>{{scope.row.packageTime===null?'':scope.row.packageTime+'年'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
          <template slot-scope="scope">
            <span style="color: #0376FD">{{scope.row.price===null?'':'￥'+scope.row.price+'/个'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="billingMethod"
          label="计费方式">
          <template slot-scope="scope">
            <span v-if="scope.row.billingMethod==1">次数包</span>
            <span v-if="scope.row.billingMethod==2">时长包</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: right;font-weight: 500;padding: 0 20px 20px 0">
      <div>
        <span>订单金额：</span><span style="color: #121C33;">¥ {{orderinfo.orderAmount}}</span>
      </div>
      <div style="margin-top: 10px">
        <span>应付金额：</span><span style="color: #FF4D4F;">¥ {{orderinfo.orderAmount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {getOrderInfo, cancelOrder} from '@/api/invoiceMan';
    import {MessageBox} from 'element-ui'

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
            pay() {
                this.$router.push({
                    path: "/pay?id=" + this.$route.query.id
                })
            },
            cancelOrder(id) {
                MessageBox.confirm('您是否要取消该订单?', '取消订单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new FormData();
                    data.append('orderSn', this.$route.query.id);
                    cancelOrder(data).then((res) => {
                        console.log(res)
                        if (res.data.code === 200000) {
                            this.$message.success("取消成功")
                            this.$router.go(-1)
                        }
                    })
                }).catch(() => {

                });
            },
            getOrderInfo() {
                let data = new FormData();
                this.tableData = []
                data.append('orderSn', this.$route.query.id);
                getOrderInfo(data).then((res) => {
                    console.log(res)
                    if (res.data.code === 200000) {
                        this.orderinfo = res.data.data;
                        this.tableData.push({
                            "orderAmount": res.data.data.orderAmount,
                            "payWay": res.data.data.payWay,
                            "orderSn": res.data.data.orderSn,
                            "paySuccessTime": res.data.data.paySuccessTime,
                        })
                    }
                })
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
