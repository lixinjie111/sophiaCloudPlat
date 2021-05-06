<template>
  <div>
    <div class="pay_text">
      购买资源包
    </div>
    <el-divider></el-divider>
    <div>
      <el-steps :active="activeName" align-center finish-status="success">
        <el-step title="选择资源包"></el-step>
        <el-step title="确认订单"></el-step>
        <el-step title="在线支付"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>
    </div>
    <div v-if="activeName==2">
      <div class="flex_between" style="padding: 0 20px 0 20px;margin-top: 20px">
        <div>
          <div style="border-left: 3px solid #0376FD">
            <span style="font-weight: 500;margin-left: 6px">待支付订单</span>
          </div>
        </div>
        <div>
          <span>待支付总金额：</span><span
          style="font-weight: 400;color: #0376FD;font-size: 18px">¥ {{totalOrderAmount}}</span>
        </div>
      </div>
      <div style="padding: 20px">
        <el-table
          :data="orderinfo"
        >
          <el-table-column
            prop="orderSn"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="serviceName"
            label="产品名称"
          >
          </el-table-column>
          <el-table-column
            prop="orderAllocations"
            label="配置">
            <template slot-scope="scope">
              <span style="color: #0376FD;cursor: pointer" @click="getOrderAllocations(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderPackageTime"
            label="时长">
            <template slot-scope="scope">
              <span>{{scope.row.orderPackageTime===null?'':scope.row.orderPackageTime+'年'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            label="总额">
            <template slot-scope="scope">
              <span>{{scope.row.orderAmount===null?'':'￥'+scope.row.orderAmount}}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div style="padding: 0 20px 0 20px;margin-top: 20px">
        <div>
          <div style="border-left: 3px solid #0376FD">
            <span style="font-weight: 500;margin-left: 6px">选择支付方式</span>
          </div>
        </div>
      </div>
      <div style="padding: 0 20px 0 60px;margin-top: 20px">
        <div>
          <el-radio v-model="radio" label="1">
            <span>账户余额（当前账户余额 ¥ {{UserInfo.amount}}） </span>
            <div class="flex" style="align-items: center;padding-left: 23px;margin-top: 15px">
              <div>
                需支付：<span style="color: #0376FD;font-weight: bold">￥</span>
              </div>
              <div style="margin-left: 15px">
                <el-input placeholder="请输入" type="number" v-model="money"></el-input>
              </div>
            </div>
            <div style="font-size: 12px;font-weight: 400;color: #999999;padding-left: 23px;margin-top: 15px">
              温馨提示：如果您有正在使用中的后付费产品，请保证有足够余额。
            </div>
          </el-radio>
        </div>
        <div style="margin-top: 15px">
          <el-radio v-model="radio" label="2">
            <span>其他方式支付</span>
            <div style="margin-top: 8px">
              <el-tabs v-model="activeName">
                <el-tab-pane label="支付宝" name="first">

                </el-tab-pane>
                <el-tab-pane label="微信" name="second">

                </el-tab-pane>
                <el-tab-pane label="个人网银" name="third">

                </el-tab-pane>
                <el-tab-pane label="企业网银" name="fourth">

                </el-tab-pane>
                <el-tab-pane label="线下汇款" name="fifth">

                </el-tab-pane>
              </el-tabs>
            </div>
          </el-radio>
        </div>
        <div style="text-align: right">
          <span>应付金额：</span><span style="font-weight: 500;color: #0376FD;font-size: 24px">¥ {{totalOrderAmount}}</span>
        </div>
        <div style="text-align: right;margin: 20px 0 40px 0">
          <el-button type="primary" @click="payBulk">支 付</el-button>
        </div>
      </div>
    </div>
    <div v-if="activeName==4" style="text-align: center;">
      <div style="text-align: center;font-size: 20px;font-weight: 600;margin-top: 40px">
        支付成功！
      </div>
      <div style="color: rgba(0, 0, 0, 0.65);margin-top: 40px">
        您购买的服务将在1～5分钟内开通，请耐心等待。
      </div>
      <div style="margin-top: 30px">
        <el-button type="primary" size="small">控制台</el-button>
        <el-button type="text" @click="getDetail">查看订单明细</el-button>
      </div>
    </div>
    <el-dialog
      title="当前配置"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="display: flex;flex-direction: row;margin-bottom: 20px">
        <div style="width: 100px">
          资源包类型:
        </div>
        <div>
          {{info.serviceName}}
        </div>
      </div>
      <div style="display: flex;flex-direction: row;margin-bottom: 20px">
        <div style="width: 100px">
          资源包配置:
        </div>
        <div v-for="(item,index) in info.orderAllocations" style="margin-bottom: 10px">
          <div>
            {{item.packageAllocation}}万次 * {{item.orderNum}}个
          </div>
        </div>
      </div>
      <div style="display: flex;flex-direction: row;margin-bottom: 20px">
        <div style="width: 100px">
          购买时长:
        </div>
        <div>
          {{info.orderPackageTime}}
        </div>
      </div>
      <div style="display: flex;flex-direction: row">
        <div style="width: 100px">
          价格:
        </div>
        <div style="font-weight: 500;color: #0376FD;font-size: 24px">
          ￥{{info.orderAmount}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {batchOrderInfoList, payBulk, userAccount} from '@/api/invoiceMan';

    export default {
        data() {
            return {
                money: "",
                UserInfo: "",
                dialogVisible: false,
                radio: '1',
                activeName: 2,
                orderinfo: [],
                totalOrderAmount: "",
                info: "",
                tableData: []
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.getOrderInfo()
                this.userAccount()
            }
        },
        methods: {
            getDetail() {
                this.$router.push({
                    path: "/order_info?id=" + this.$route.query.id
                })
            },
            getOrderAllocations(item) {
                this.info = item;
                this.dialogVisible = true;
            },
            payBulk() {
                var orderSnList = this.$route.query.id.split(',');
                payBulk(orderSnList).then((res) => {
                    console.log(res)
                    if (res.data.code === 200000) {
                        this.$message.success('支付成功');
                        this.activeName = 4
                    } else {
                        this.$message.error('订单查询失败');
                    }
                })
            },
            userAccount() {
                userAccount().then((res) => {
                    console.log(res)
                    if (res.data.code === 200000) {
                        this.UserInfo = res.data.data;
                    } else {
                        this.$message.error('订单查询失败');
                    }
                })
            },
            getOrderInfo() {
                console.log(this.$route.query.id)
                var orderSnList = this.$route.query.id.split(',');
                batchOrderInfoList(orderSnList).then((res) => {
                    console.log(res)
                    if (res.data.code === 200000) {
                        this.orderinfo = res.data.data.orderInfoRespList;
                        this.totalOrderAmount = res.data.data.totalOrderAmount;
                    } else {
                        this.$message.error('订单查询失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
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
