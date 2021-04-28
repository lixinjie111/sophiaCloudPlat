<template>
<div  class="payContainer">
    <div class="gailan">
        <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            title="概览"
        />
        <div class="gailan_container">
          <div class="paystep">
             <a-steps :current="currentIndex">
                <a-step title="选择接口"></a-step>
                <a-step title="确认订单" />
                <a-step title="开通成功"/>
              </a-steps>
          </div>
          <template v-if="currentIndex==0">
              <div class="payForm">
                <div class="payItem">
                  <div class="payLeft">
                      接口选择
                  </div>
                  <div class="payRt">
                      <div class="payDesc">支持调用方式：REST API</div>
                      <div class="payCk">
                        <el-checkbox-group 
                            v-model="checkedCities"
                            :min="1"
                            >
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                  </div>
                </div>
                <div class="payItem">
                  <div class="payLeft">
                      价目表
                  </div>
                  <div class="payRt">
                      <div class="payDesc">开通付费后，默认使用按量后付费形式进行阶梯计费
                        <el-tooltip class="item" effect="dark" placement="right">
                            <i class="el-icon-question"></i>
                            <div slot="content">计费详情可参考<span style="color:#1890FF">产品定价文档</span></div>
                          </el-tooltip>
                      </div>
                      <div class="payCk">
                        <vxe-table
                            border
                            show-header-overflow
                            show-overflow
                            highlight-hover-row
                            :align="allAlign"
                            :data="tableData">
                            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
                            <vxe-table-column field="name" title="Name"></vxe-table-column>
                            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                            <vxe-table-column field="age" title="Age"></vxe-table-column>
                            <vxe-table-column field="address" title="Address"></vxe-table-column>
                          </vxe-table>
                      </div>
                      <div class="payMark">
                        注：“w”表示万次，"调用量"指使用按量后付费形式产生的计费调用量
                      </div>
                  </div>
                </div>
              
              </div>
              <div class="confirmBtn">
                <el-button type="primary">确认开通</el-button>
              </div>
              <div class="payMark1">
                温馨提示：1. 为确保业务正常进行，请保证您的账户余额充足，可点击进行 充值2. 开通成功后，如需停止付费，可点击 “停用” 自助关停。
              </div>
          </template>  
          <template v-if="currentIndex==1"> 
            <div class="detailTitle">订单详情</div>
            <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                  :align="allAlign"
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
      currentIndex:1,
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
              .payItem{
                display: flex;
                margin-bottom: 30px;
                .payLeft{
                  width: 56px;
                  margin-right: 18px;
                }
                .payRt{
                  flex: 1;
                  .payDesc{
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #909399;
                    margin-bottom: 23px;
                  }
                  .payMark{
                    margin-top: 30px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #909399;
                  }
                }
              }
            }
            .confirmBtn{
              display: flex;
              justify-content: flex-end;
              padding-right: 50px;
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
