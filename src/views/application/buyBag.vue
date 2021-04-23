<template>
<div  class="payContainer">
    <div class="gailan">
        <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            title="购买资源包"
        />
        <div class="gailan_container">
          <div class="paystep">
              <a-steps :current="currentIndex">
                <a-step title="选择资源包"></a-step>
                <a-step title="确认订单" />
                <a-step title="在线支付"/>
                <a-step title="支付成功"/>
              </a-steps>
          </div>
          <template v-if="currentIndex==0">
              <div class="payForm">
                <div class="payLeft">
                    <div class="payTitle">资源包类型：短语音识别-中文普通话</div>
                    <div class="payDesc">
                     温馨提示：资源包有剩余时优先使用资源包抵扣
                    </div>
                    <div class="payTitle">资源包规格</div>
                    <div class="payDesc">
                     温馨提示：各API的具体抵扣次数规则详见产品定价文档。购买资源越多，享受更多折扣优惠
                    </div>
                     <vxe-table
                        border
                        show-header-overflow
                        show-overflow
                        highlight-hover-row
                        :data="tableData">
                        <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
                        <vxe-table-column field="name" title="Name"></vxe-table-column>
                        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                        <vxe-table-column field="age" title="Age"></vxe-table-column>
                        <vxe-table-column field="address" title="Address"></vxe-table-column>
                    </vxe-table>
                </div>
                <div class="payRt">
                  <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                      <span>当前配置</span>
                      <el-button style="float: right; padding: 3px 0" type="text">清除</el-button>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          资源包类型：
                      </div>
                      <div class="payRight">
                          短语音识别-中文普通话
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          资源包配置：
                      </div>
                      <div class="payRight">
                        <p>100万次 * 1个</p>
                        <p>100万次 * 1个</p>
                        <p>100万次 * 1个</p>
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          购买时长：       
                      </div>
                      <div class="payRight">
                        1年
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          价格：       
                      </div>
                      <div class="payRight">
                        <div class="price">¥ 40,800.00</div>
                      </div>
                    </div>
                    <div class="confirmBtn">
                      <el-button type="primary" style="width:80%">确认开通</el-button>
                    </div>
                    <div class="payDesc1">
                      资源包购买成功后即刻生效，资源包使用后剩余流量不支持退订
                    </div>
                  </el-card>
                </div>
              </div>
          </template>  
          <template v-if="currentIndex==1"> 
            <div class="detailTitle">订单详情</div>
            <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                  :data="tableData">
                  <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
                  <vxe-table-column field="name" title="Name"></vxe-table-column>
                  <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                  <vxe-table-column field="address" title="Address"></vxe-table-column>
              </vxe-table>
              <div class="payMark2">
                *后付费服务将根据使用情况从账户余额中扣除，请保证有足够的金额。
              </div>
              <div class="confirmBtn1">
                  <el-button type="primary" @click="onSubmit">去开通</el-button>
                  <el-button>返回修改</el-button>
              </div>
          </template> 
          <template v-if="currentIndex==2"> 
            <div class="openStatus">
              <div class="text1">
                <i class="el-icon-circle-check"></i> 开通成功
              </div>
              <div class="text2">
                您购买的服务将在1～5分钟内开通，请耐心等待。
              </div>
              <div class="text3">
                <el-button type="primary" @click="onSubmit" size="small" style="margin-right:10px">控制台</el-button><el-link type="primary">查看订单明细</el-link>
              </div>
            </div> 
          </template>  
        </div>
    </div>
   <a-modal v-model="visible" title="提醒" @ok="handleOk" cancelText="取消" centered okText="购买">
      <p>资源包使用完毕会自动切换为按量后付费模式以保证您的正常使用</p>
    </a-modal>
</div>
</template>

<script>
import {
  apiVisitTrend,
  apiVisitTrendInfo,
  serviceList
} from "../../api/proSer/index";
import {
  appCount,
  apiVisitDosage,
  userServiceModels
} from "../../api/gailan/index";
export default {
  data() {
    return {
      visible:true,
      currentIndex:0,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ],
      checkedCities: ['短语音识别-英语', '北京'],
      cities: ['短语音识别-中文普通话', '短语音识别-英语', '短语音识别-英语', '短语音识别-英语'],
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
   
  }
};
</script>

<style lang="scss" scoped>
.payContainer{
     background: #f0f2f5; 
    .gailan{
        background: #fff;
        margin-bottom: 20px;
        .gailan_container{
            padding:20px;
            .paystep{
              width: 80%;
              margin: 0 auto;
            }
            .openStatus{
              margin-top: 80px;
              text-align: center;
              .text1{
                font-size: 18px;
                color:#000;
                margin-bottom: 50px;
                i{
                  color:#52C41A;
                  font-size: 20px;
                }
              }
              .text2{
                margin-bottom: 50px;
              }
            }
            .detailTitle{
              border-left:2px solid #0376FD;
              padding-left: 5px;
              margin-bottom: 30px;
            }
            .payForm{
              margin-top:40px;
              display: flex;
              .payLeft{
                flex:2;
                margin-right: 18px;
                .payTitle{
                  border-left:2px solid #0376FD;
                  padding-left: 5px;
                  margin-bottom: 30px;
                }
                .payDesc{
                  margin-top: 6px;
                  margin-bottom: 15px;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #909399;
                }
              }
              .payRt{
                flex:1;
                .payItem{
                    display: flex;
                    margin-bottom: 18px;
                    .payLf{
                      width: 100px;
                      margin-right: 18px;
                    }
                    .payRight{
                      flex: 1;
                      p{
                        margin-bottom: 18px;
                      }
                      .price{
                        font-size: 18px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #0376FD;
                      }
                    }
                  }
              }
            }
            .confirmBtn{
              margin-top: 35px;
              display: flex;
              justify-content: center;
            }
            .payDesc1{
              margin-top: 10px;
              margin-bottom: 15px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
              text-align: center;
            }
            .confirmBtn1{
              margin-top: 100px;
              display: flex;
              justify-content: flex-end;
              padding-right: 50px;
            }
            .payMark1{
              padding-right: 50px;
              margin-top: 20px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
              text-align: right;
            }
            .payMark2{
              margin-top: 20px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
            }
        }
    }
}
</style>
