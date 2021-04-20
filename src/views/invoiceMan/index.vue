<template>
  <div class="invoice_con">
    <div class="first_area">
      <div class="til">发票管理</div>
      <div class="search_area">
        <div class="sear_label">申请时间：</div>
        <div class="choice_time">
          <div class="time_container">
            <el-date-picker
              v-model="rangeTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="changeDataRange"
              style="height: 100%"
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
        <div class="sear_label">发票抬头：</div>
        <div class="sear_input">
            <el-input v-model="fpttVal" class="fptt_class"></el-input>
            <el-button type="primary">搜 索</el-button>
        </div>
      </div>
    </div>
    <div class="sec_area">
        <div class="fp_money">
            <div class="fp_money_til">可索取发票金额</div>
            <div class="fp_money_num">¥ {{moneyNum}}</div>
            <div class="fp_money_btn">查看明细及索取发票</div>
        </div>
        <div class="fp_info">
            <div class="til_edit_con">
                <div class="til_txt">发票信息</div>
                <i class="el-icon-edit" @click="editfpInfo"></i>
            </div>
            <div class="no_fp_info_con">暂无有效的发票信息</div>
        </div>
        <div class="fp_address">
            <div class="til_edit_con">
                <div class="til_txt">默认寄送地址</div>
                <i class="el-icon-edit" @click="editfpaddress"></i>
            </div>
            <div class="no_fp_info_con">暂无默认地址信息</div>
        </div>
    </div>
    <div class="three_area">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="发票列表" name="first">
                <vxe-table
                    border
                    show-header-overflow
                    show-overflow
                    highlight-hover-row
                    :align="allAlign"
                    :data="tableData"
                    :loading="loading"
                >
                    <vxe-table-column field="sqTime" title="申请时间" sortable></vxe-table-column>
                    <vxe-table-column field="fpTaitou" title="发票抬头" :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
                    <vxe-table-column field="fpTotal" title="发票总额"></vxe-table-column>
                    <vxe-table-column field="fpType" title="发票类型" :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
                    <vxe-table-column field="fpxz" title="发票性质" :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
                    <vxe-table-column field="fpStatus" title="发票状态" :title-help="{message: '自定义帮助提示信息'}" :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
                    <vxe-table-column field="operation" title="操作"></vxe-table-column>
                </vxe-table>
                <vxe-pager
                    border
                    size="medium"
                    :loading="loading2"
                    :current-page="tablePage2.currentPage"
                    :page-size="tablePage2.pageSize"
                    :total="tablePage2.totalResult"
                    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                    @page-change="handlePageChange2"
                >
                </vxe-pager>
            </el-tab-pane>
            <el-tab-pane label="发票信息管理" name="second">发票信息管理</el-tab-pane>
            <el-tab-pane label="寄送地址管理" name="third">寄送地址管理</el-tab-pane>
            <el-tab-pane label="电子邮箱" name="fourth">电子邮箱</el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "invoiceMan",
  data() {
    return {
        rangeTime:[moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
        selVal:'cl7',
        fpttVal:'',
        moneyNum:'0.00',
        activeName:'first',
        allAlign: null,
        tableData: [
            {sqTime: '2021-04-20', fpTaitou: '元知智能研究院', fpTotal: '100.00', fpType: 28, fpxz: 'vxe-table 从入门到放弃',fpStatus:'开票中'},
            {sqTime: '2021-04-20', fpTaitou: '元知智能研究院', fpTotal: '200.00', fpType: 22, fpxz: 'Guangzhou',fpStatus:'已开票' },
            {sqTime: '2021-04-20', fpTaitou: '元知智能研究院', fpTotal: '333.33', fpType: 32, fpxz: 'Shanghai',fpStatus:'已拒绝' },
            {sqTime: '2021-04-20', fpTaitou: '元知智能研究院', fpTotal: '555.55 ', fpType: 24, fpxz: 'Shanghai',fpStatus:'已作废' }
        ],
        loading:false,
        loading2: false,
        tableData2: [],
        tablePage2: {
            currentPage: 1,
            pageSize: 10,
            totalResult: 0
        }
    };
  },
  created() {},
  methods: {
    changeDataRange(e){
      var dateList = e || [];
    //   this.beginDate = dateList[0];
    //   this.endDate = dateList[1];
    },
    choiceRange(e) {
      if(e == 'cl7'){
        // this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
        // this.beginDate = this.rangeTime[0];
        // this.endDate = this.rangeTime[1];
      }
      else if(e == 'by'){
        // const startDate = moment().month(moment().month()).startOf('month').valueOf();
        // const endDate = moment().month(moment().month()).endOf('month').valueOf();
        // this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        // this.beginDate = this.rangeTime[0];
        // this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgy'){
        // const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
        // const endDate = moment().month(moment().month() - 1).endOf('month').valueOf();
        // this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        // this.beginDate = this.rangeTime[0];
        // this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgjd'){
        // const startDate = moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf();
        // const endDate = moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf();
        // this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        // this.beginDate = this.rangeTime[0];
        // this.endDate = this.rangeTime[1];
      }
    },
    editfpInfo(){
        alert('编辑发票信息！！！');
    },
    editfpaddress(){
        alert('编辑地址信息！！！');
    },
    handleClick(tab, event) {
        console.log(tab,'tab');
        console.log(event,'event');
    },
    findList2 () {
        // this.loading = true
        // XEAjax.get(`/api/user/page/list/${this.tablePage2.pageSize}/${this.tablePage2.currentPage}`)then(({ page, result }) => {
        // this.tableData2 = result
        // this.tablePage2.totalResult = page.totalResult
        //     this.loading2 = false
        // }).catch(e => {
        //     this.loading2 = false
        // })
    },
    handlePageChange2 ({ currentPage, pageSize }) {
        // this.tablePage2.currentPage = currentPage
        // this.tablePage2.pageSize = pageSize
        // this.findList2()
    }
  },
};
</script>
<style lang="scss" scoped>
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
      .sear_input{
          display: flex;
          align-items: center;
          .fptt_class{
            width: 174px;
            height: 32px; 
            margin-right: 21px;
            /deep/ .el-input__inner{
                height:100%;
            }
          }
          .el-button--primary{
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
    .fp_money{
        width: 24.6%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        .fp_money_til{
            width: 100%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #121C33;
        }
        .fp_money_num{
            width: 100%;
            padding-left: 33px;
            box-sizing: border-box;
            margin-bottom: 19px;
            font-size: 36px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0376FD;
        }
        .fp_money_btn{
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
    .fp_info,.fp_address{
        width: 37.08%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        .til_edit_con{
            width: 100%;
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            .til_txt{
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #121C33;
            }
            .el-icon-edit{
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .no_fp_info_con{
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