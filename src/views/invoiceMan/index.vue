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
            <el-button type="primary" @click="searchInvoice">搜 索</el-button>
        </div>
      </div>
    </div>
    <div class="sec_area">
        <div class="fp_money">
            <div class="fp_money_til">可索取发票金额</div>
            <div class="fp_money_num">¥ {{moneyNum}}</div>
            <div class="fp_money_btn" :class="{'activeBtn': moneyNum != '0.00'}" @click="watchDetailGetMoney">查看明细及索取发票</div>
        </div>
        <div class="fp_info">
            <div class="til_edit_con">
                <div class="til_txt">发票信息</div>
                <i class="el-icon-edit" @click="editfpInfo"></i>
            </div>
            <div class="no_fp_info_con" v-if="nofpInfo">暂无有效的发票信息</div>
            <div class="has_fp_info_con" v-else>
                <div class="fptt_con">
                    <span>发票抬头：</span>
                    <span>{{fpinfoObj.title}}</span>
                </div>
                <div class="kjlx_con">
                    <span>开具类型：</span>
                    <span>{{fpinfoObj.type}}</span>
                </div>
            </div>
        </div>
        <div class="fp_address">
            <div class="til_edit_con">
                <div class="til_txt">默认寄送地址</div>
                <i class="el-icon-edit" @click="editfpaddress"></i>
            </div>
            <div class="no_fp_info_con" v-if="nofpAddress">暂无默认地址信息</div>
            <div class="has_fp_info_con" v-else>
                <div class="fptt_con">
                    <span>{{addressObj.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{addressObj.phone}}</span>
                </div>
                <div class="kjlx_con">
                    <span>{{addressObj.address}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="three_area">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="发票列表" name="first">
                <div v-if="ifShowfpList">
                    <vxe-table
                        border
                        show-header-overflow
                        show-overflow
                        highlight-hover-row
                        :align="allAlign"
                        :data="tableData"
                        :loading="loading"
                        ref="xTable"
                    >
                        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                        <vxe-table-column field="applyTime" title="申请时间" sortable></vxe-table-column>
                        <vxe-table-column field="title" title="发票抬头" :filters="fpttFilter" :filter-method="filterNameMethod"></vxe-table-column>
                        <vxe-table-column field="totalAmount" title="发票总额" formatter="formatAmount"></vxe-table-column>
                        <vxe-table-column field="invoiceTypeDesc" title="发票类型" :filters="fptypeFilter" :filter-method="filtertypeMethod"></vxe-table-column>
                        <vxe-table-column field="invoicePropertyDesc" title="发票性质" :filters="fpxzFilter" :filter-method="filterxzMethod"></vxe-table-column>
                        <vxe-table-column field="invoiceStatusDesc" type="html" title="发票状态" :title-help="{message:helpMsg}" :filters="fpztFilter" :filter-method="filterztMethod"></vxe-table-column>
                        <vxe-table-column field="operation" title="操作" show-overflow>
                            <template v-slot="{ row }">
                                <div v-if="(formatHtml(row.invoiceStatusDesc) == '待审核') || (formatHtml(row.invoiceStatusDesc) == '开票中')">
                                    <a style="color:#0376FD;" @click="goDetail(row)">详情</a>
                                    <a style="color:#0376FD;" @click="exportDetail(row)">导出明细</a>
                                    <a style="color:#0376FD;" @click="cancelFn(row)">撤销</a>
                                </div>
                                <div v-else-if="formatHtml(row.invoiceStatusDesc) == '已开票'">
                                    <a style="color:#0376FD;" @click="returnTicket(row)">退票</a>
                                    <a style="color:#0376FD;" @click="goDetail(row)">详情</a>
                                    <a style="color:#0376FD;" @click="exportDetail(row)">导出明细</a>
                                    <a style="color:#0376FD;" @click="cancelFn(row)">撤销</a>
                                    <a style="color:#0376FD;" @click="downLoad(row)">下载</a>
                                </div>
                                <div v-else-if="(formatHtml(row.invoiceStatusDesc) == '已拒绝') || (formatHtml(row.invoiceStatusDesc) == '已撤销') || (formatHtml(row.invoiceStatusDesc) == '已作废') || (formatHtml(row.invoiceStatusDesc) == '退票中')">
                                    <a style="color:#0376FD;" @click="goDetail(row)">详情</a>
                                    <a style="color:#0376FD;" @click="exportDetail(row)">导出明细</a>
                                </div>
                            <div v-else-if="(formatHtml(row.invoiceStatusDesc) == '已红冲')">
                                    <a style="color:#0376FD;" @click="goDetail(row)">详情</a>
                                    <a style="color:#0376FD;" @click="exportDetail(row)">导出明细</a>
                                    <a style="color:#0376FD;" @click="downLoad(row)">下载</a>
                                </div>
                            </template>
                        </vxe-table-column>
                        <template v-slot:empty>
                            <span>暂无已索取发票数据，</span><span>索取发票</span>
                        </template>
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="发票信息管理" name="second">
                <vInvoInfoShow v-if="ifShowShowPanel" @showEditPanel="showeditpanelfaFn"></vInvoInfoShow>
                <vEditInvoInfo v-else :invoiceDetailIdInfo="invoiceDetailIdData" @closeEditShow="closeEditShowFn"></vEditInvoInfo>
            </el-tab-pane>
            <el-tab-pane label="寄送地址管理" name="third">
                <vShipAddressMan v-if="ifShowjsAddress" @getNewAddress="getNewAddressFa"></vShipAddressMan>
            </el-tab-pane>
            <el-tab-pane label="电子邮箱" name="fourth">
                <vEmailMan v-if="ifShowEmail"></vEmailMan>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!--发票退票弹框-->
    <vInvoiceReturn v-if="ifShowPtInvReturn" :invoiceInfo="invoiceParm" @closePopWin="closePtInvoReturnPop"></vInvoiceReturn>
    <vInvoiceZpReturn v-if="ifShowZpInvReturn" :invoiceInfo="invoiceParm" @closePopWin="closeZpInvoReturnPop"></vInvoiceZpReturn>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
import {fapSearch,queryInvoiceBase,exportInvoiceDetail,operateInvoice} from "../../api/invoiceMan/index";
import vEditInvoInfo from "./editInvoiceInfo";
import vInvoInfoShow from "./invoInfoShow";
import vShipAddressMan from "./shipAddressMan";
import vEmailMan from "./emailMan";
import vInvoiceReturn from "./invoiceReturn";
import vInvoiceZpReturn from "./invoiceZpReturn";
export default {
  name: "invoiceMan",
  data() {
    return {
        rangeTime:[moment(new Date(new Date().getTime() - 3600*1000*24*365)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
        selVal:'cl7',
        fpttVal:'',
        money:0,
        activeName:'first',
        allAlign: null,
        tableData: [],
        loading:false,
        loading2: false,
        nofpInfo:false,
        nofpAddress:false,
        tablePage2: {
            currentPage: 1,
            pageSize: 10,
            totalResult: 0
        },
        fpinfoObj:{
            title:'',
            type:''
        },
        addressObj:{
            name:'',
            phone:'',
            address:''
        },
        beginDate:moment(new Date(new Date().getTime() - 3600*1000*24*365)).format('YYYY-MM-DD'),
        endDate:moment(new Date()).format('YYYY-MM-DD'),
        helpMsg:`待审核：已提交发票申请，暂未经过财务审核，此时用户可取消发票申请
                 开票中：Sophia云已通过了开票申请，发票开具中 
                 已开票：发票已开具 
                 已拒绝：由于实名认证信息、发票抬头等信息存在错误，财务驳回了您的发票申请，发票金额将返回您的可开票余额池中 
                 已撤销：在财务审核通过前，您取消的发票申请 
                 已寄出：发票已寄出 
                 退票中：由于发票信息有误等原因需要退票的，可以在线上申请退票操作 
                 已作废：Sophia云已线下将发票作废 
                 已冲红：在线提交退票申请，我们受理后会为您红冲原票操作，即为您再生成一条等额的红字发票，供您下载后，冲抵账务使用`,
        fptypeFilter:[],
        fpttFilter:[],
        fpxzFilter:[],
        fpztFilter:[],
        ifShowShowPanel:true,
        ifShowPtInvReturn:false,
        ifShowZpInvReturn:false,
        invoiceParm:null,
        infoMsg:{},
        invoiceDetailIdData:{},
        ifShowjsAddress:false,
        ifShowfpList:true,
        ifShowEmail:false,
        reqParms:null
    };
  },
  created() {
      this.getfpManData();
      this.getInvoiceBase();
      this.settitle();
  },
  computed:{
      moneyNum(){
        return this.$myUtilsFn.commafy(this.$myUtilsFn.toNumber(this.money), { digits:2 })
      }
  },
  components:{
      vEditInvoInfo,
      vInvoInfoShow,
      vShipAddressMan,
      vEmailMan,
      vInvoiceReturn,
      vInvoiceZpReturn
  },
  methods: {
    settitle(){
        var setObj = this.$route.query.setting;
        this.activeName = 'first';
        if(setObj == 'now'){
          this.activeName = 'second';
          this.ifShowShowPanel = false;
        }
    },
    watchDetailGetMoney(){
        var ifCanClick = this.moneyNum == '0.00' ? false : true;
        var fpttObj = this.reqParms;
        if(ifCanClick){
            this.$router.push({
                path:'/InvoiceReq',
                query:{
                    fpttObj
                }
            });
        }
        else{
            return;
        }
    },
    returnTicket(e){
        var titleFlg = e.invoiceTypeDesc;
        this.invoiceParm = e;
        if(titleFlg == '增值税专用发票'){
            this.ifShowZpInvReturn = true;
            this.ifShowPtInvReturn = false;
        }
        else{
            this.ifShowPtInvReturn = true;
            this.ifShowZpInvReturn = false;
        }        
    },
    closePtInvoReturnPop(e){
        if(e.refreshParm == 'refresh'){
            this.ifShowPtInvReturn = e.operParm;
            this.getfpManData();
        }
        else{
            this.ifShowPtInvReturn = e.operParm;
        }
    },
    closeZpInvoReturnPop(e){
        if(e.refreshParm == 'refresh'){
            this.ifShowZpInvReturn = e.operParm;
            this.getfpManData();
        }
        else{
            this.ifShowZpInvReturn = e.operParm;
        }
    },
    goDetail(e){
        this.$router.push({
            path:'/invoiceDetail',
            query:{
                detailData:e
            }
        });
    },
    exportDetail(e){
        var invoiceId = e.invoiceId || '';
        var parms = {
            invoiceId:invoiceId,
        };
        exportInvoiceDetail(parms).then(res=>{
          var eleLink = document.createElement('a');
          eleLink.download = '发票明细';
          eleLink.style.display = 'none'
          var blob = new Blob([res],{type: 'application/vnd.ms-excel'});
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        }).catch(err=>{
            this.$message.error('导出明细失败！')
        });
    },
    cancelFn(arg) {
        var invoiceId = arg.invoiceId || '';
        var parms = {
            invoiceId:invoiceId,
            invoiceStatus:'4'
        };
        this.$comfirm('撤销后将不会为您开具相应的发票，您是否要撤销此次发票申请？', '撤销发票', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:'configPopwin'
        }).then(() => { 
            operateInvoice(parms).then(res=>{
                if(res.code == 200000){
                    this.getfpManData();
                }
                else{
                    this.$message.error('撤销失败！')
                }
            }).catch(err=>{
                this.$message.error('撤销失败！')
            });
        }).catch(() => {
          console.log('失败！')         
        });
    },
    downLoad(e){
        console.log('下载后端说暂时做不了')
    },
    formatHtml(dom){
        let frag = document.createRange().createContextualFragment(dom).children[0].innerText;
        return frag;
    },
    changeDataRange(e){
      var dateList = e || [];
      this.beginDate = dateList[0];
      this.endDate = dateList[1];
    },
    choiceRange(e) {
      if(e == 'cl7'){
        this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'by'){
        const startDate = moment().month(moment().month()).startOf('month').valueOf();
        const endDate = moment().month(moment().month()).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgy'){
        const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
        const endDate = moment().month(moment().month() - 1).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgjd'){
        const startDate = moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf();
        const endDate = moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
    },
    editfpInfo(){
        this.activeName = 'second';
        this.ifShowShowPanel = false;
    },
    showeditpanelfaFn(arg){
        this.ifShowShowPanel = arg.opt; 
        this.invoiceDetailIdData = arg;
    },
    closeEditShowFn(arg){
        this.ifShowShowPanel = arg;
        this.getInvoiceBase();
    },
    editfpaddress(){
        this.activeName = 'third'; 
    },
    handleClick(tab, event) {
        if(tab.paneName == "first"){
            this.ifShowfpList = true;
        }
        else{
            this.ifShowfpList = false;
        }
        if(tab.paneName == "second"){
            this.ifShowShowPanel = true;
        }
        if(tab.paneName == "third"){
            this.ifShowjsAddress = true;
        }
        else{
            this.ifShowjsAddress = false;
        }
        if(tab.paneName == 'fourth'){
            this.ifShowEmail = true;
        }
        else{
            this.ifShowEmail = false;
        }
        this.activeName = tab.paneName; 
    },
    handlePageChange2 ({ currentPage, pageSize }) {
        this.tablePage2.currentPage = currentPage
        this.tablePage2.pageSize = pageSize
        this.getfpManData()
    },
    deWeight(arr,attr) {
        var attr = attr;
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i][attr] == arr[j][attr]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    },
    searchInvoice(){
        this.getfpManData();
    },
    getfpManData(){
        var that = this;
        this.loading = true;
        this.loading2 = true;
        var parms = {
            beginDate:this.beginDate,
            endDate:this.endDate,
            page:this.tablePage2.currentPage,
            pageSize:this.tablePage2.pageSize,
            title:this.fpttVal
        };
        fapSearch(parms).then(res=>{
            this.loading = false;
            this.loading2 = false;
            if(res.code == 200000){
                var getData = res.data || {};
                var fpty = [],fptt=[],fpxz=[],fpzt=[];
                var fpList = getData.list ? getData.list : [];
                fpList.forEach(item=>{
                    var fontColor = '';
                    if(item.invoiceStatusDesc == '待审核'){
                        fontColor = '#0376FD';
                    }
                    else if(item.invoiceStatusDesc == '开票中' || item.invoiceStatusDesc == '退票中'){
                        fontColor = '#FAAD14';
                    }
                    else if(item.invoiceStatusDesc == '已开票'){
                        fontColor = '#51C41B';
                    }
                    else if(item.invoiceStatusDesc == '已拒绝'){
                        fontColor = '#FF4D4F';
                    }
                    else{
                        fontColor = 'rgba(0, 0, 0, 0.65)';
                    }
                    item.invoiceStatusDesc = `<span style="color:${fontColor};">${item.invoiceStatusDesc || ''}</span>`;
                });
                this.tableData = fpList;
                this.tablePage2.totalResult = getData.total ? getData.total : 0;
                for(var i=0;i<fpList.length;i++){
                    fpty.push({
                        label:fpList[i].invoiceTypeDesc,
                        value:fpList[i].invoiceTypeDesc
                    });
                    fptt.push({
                        label:fpList[i].title,
                        value:fpList[i].title
                    });
                    fpxz.push({
                        label:fpList[i].invoicePropertyDesc,
                        value:fpList[i].invoicePropertyDesc
                    });
                    fpzt.push({
                        label:document.createRange().createContextualFragment(fpList[i].invoiceStatusDesc).children[0].innerText, 
                        value:document.createRange().createContextualFragment(fpList[i].invoiceStatusDesc).children[0].innerText
                    });
                }
                const xTable = this.$refs.xTable;
                const column = xTable.getColumnByField('invoiceTypeDesc');
                const column1 = xTable.getColumnByField('title');
                const column2 = xTable.getColumnByField('invoicePropertyDesc');
                const column3 = xTable.getColumnByField('invoiceStatusDesc');
                xTable.setFilter(column,that.deWeight(fpty,'label'));
                xTable.setFilter(column1,that.deWeight(fptt,'label'));
                xTable.setFilter(column2,that.deWeight(fpxz,'label'));
                xTable.setFilter(column3,that.deWeight(fpzt,'label'));
                xTable.updateData()
            }
            else{
               this.$message.error(res.message||'请求发票列表数据失败！')
            }
        }).catch(err=>{
            this.$message.error('请求发票列表数据失败！')
        });
    },
    getNewAddressFa(){
        this.getInvoiceBase();
    },
    getInvoiceBase(){
        var parms = {
            invoiceDetailId:''
        };
        this.addressObj = {
            name:'',
            phone:'',
            address:''
        };
        queryInvoiceBase(parms).then(res=>{
            if(res.code == 200000){
                var InvoiceMsgObj = res.data || {};
                this.reqParms = InvoiceMsgObj;
                this.money = InvoiceMsgObj.totalAmount;
                if(!InvoiceMsgObj){
                    this.ifShowShowPanel = false;
                }
                else{
                    this.infoMsg = InvoiceMsgObj;
                    this.ifShowShowPanel = true;
                    this.invoiceDetailIdData = InvoiceMsgObj || {};
                    if(InvoiceMsgObj.title){
                        this.nofpInfo = false;
                        var typeTxt = '';
                        if(InvoiceMsgObj.invoiceType == 0){
                            typeTxt = '增值税普通发票';
                        }
                        else if(InvoiceMsgObj.invoiceType == 1){
                            typeTxt = '增值税专用发票';
                        }
                        else if(InvoiceMsgObj.invoiceType == 2){
                            typeTxt = '组织（非企业）增值税普通发票';
                        }
                        else{
                            typeTxt = '';
                        }
                        this.fpinfoObj = {
                            title:InvoiceMsgObj.title,
                            type:typeTxt
                        };
                    }
                    else{
                        this.nofpInfo = true;
                    }
                    if(!InvoiceMsgObj.postAddressVo){
                        this.nofpAddress = true;
                    }
                    else{
                        this.nofpAddress = false;
                        this.addressObj={
                            name:InvoiceMsgObj.postAddressVo ? InvoiceMsgObj.postAddressVo.recipient : '',
                            phone:InvoiceMsgObj.postAddressVo ? InvoiceMsgObj.postAddressVo.contactPhone : '',
                            address:InvoiceMsgObj.postAddressVo ? InvoiceMsgObj.postAddressVo.addressComplete : '',
                        };
                    }
                }
            }
            else{
                this.$message.error(res.message||'请求发票列表数据失败！')
            }
        }).catch(err=>{
            this.$message.error('请求发票基本信息数据失败！')
        });
    },
    filterNameMethod ({ value, row, column }) {
        return row.title == value
    },
    filtertypeMethod({ value, row, column }){
        return row.invoiceTypeDesc == value
    },
    filterxzMethod({ value, row, column }){
        return row.invoicePropertyDesc == value
    },
    filterztMethod({ value, row, column }){
        return document.createRange().createContextualFragment(row.invoiceStatusDesc).children[0].innerText == value
    }
  },
};
</script>
<style>
.v-modal{
    z-index: 9999999 !important; 
}
.el-message-box__wrapper{
    z-index: 999999991 !important;
}
.el-message-box__wrapper .configPopwin{
    z-index: 999999992 !important;
}
</style>
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
        .activeBtn{
            background: #0376FD;
            &:hover{
                cursor: pointer;
            }
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
        .has_fp_info_con{
            width: 100%;
            .fptt_con,.kjlx_con{
                width: 100%;
                margin: 18px 0;
                display: flex;
                align-items: center;
            }
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
    /deep/ .el-tabs .el-tabs__content{
        overflow: inherit;
    }
  }
}
</style>