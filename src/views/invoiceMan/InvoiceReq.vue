<template>
  <div class="InvoiceReq_con">
    <div class="til_con">发票索取</div>
    <div class="invo_get_con">
      <div class="invo_get_con1">
        <a-steps :current="current">
          <a-step title="选择发票" />
          <a-step title="确认信息和地址" />
        </a-steps>
      </div>
      <template v-if="current == 0">
        <div class="invo_get_con2" v-if="ifShowFpinfo">
          <i class="el-icon-warning"></i>
          <span
            >您的发票模板信息还不完善，请先在发票信息管理里填写相关信息后，再申请发票！</span
          >
          <span class="setting_now" @click="settingTitleNow"
            >立即设置发票抬头</span
          >
        </div>
        <div class="invo_get_con3">
          <p>
            后付费月结算单的可开票金额为当月实际结算金额，本月产生的后付费业务月结算单在下个月二号以后才可以索取发票。
          </p>
          <p>发票基于订单、月结算单开具（单个订单、月结算单不可拆分开票）。</p>
          <p>
            一张发票只能有一个税率，当开具的发票税率有多个时，系统会自动生成多张发票。
          </p>
          <p>
            单张电子发票金额不能超过10万，单张纸质发票金额不能超过100万。若您申请的开票金额超过限额，将在审核通过后拆分为多笔不超限额的发票记录，经拆分的发票金额总和将等于您的申请开票金额。
          </p>
          <p>
            自2017.07.01起，申请普通发票需填写税号信息，否则将无法应税使用，请及时维护您的税号信息。
          </p>
          <p>
            从2017年8月25日起，申请纸质增值税普通发票，如金额未满200元，快递费用到付需自行承担。
          </p>
        </div>
        <div class="invo_get_con4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="可开票消费" name="first">
             <template v-if="activeName=='first'">
                <div class="input_con">
                  <span class="inp_label">产品名称：</span>
                  <div class="input_self">
                    <el-input
                      v-model="proName"
                      placeholder="产品名称模糊搜索"
                    ></el-input>
                  </div>
                  <span class="inp_label">起止时间：</span>
                  <div class="input_self timeRange_con">
                    <el-date-picker
                      v-model="timeRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                  <span class="inp_label">金额范围：</span>
                  <div class="input_self">
                    <el-input
                      v-model="moneyRange"
                      placeholder="请选择金额范围"
                      @focus="choiceMoneyRange"
                    ></el-input>
                  </div>
                  <span class="inp_label">订单编号：</span>
                  <div class="input_self">
                    <el-input
                      v-model="orderNum"
                      placeholder="请输入订单编号"
                    ></el-input>
                  </div>
                  <el-button class="my_el_btn"  @click="reset">重 置</el-button>
                  <el-button class="my_el_btn" type="primary" @click="search">查 询</el-button>
                </div>
                <div class="check_con">
                  <el-checkbox
                    v-model="allChecked"
                    style="margin-right: 8px"
                  ></el-checkbox>
                  <span>全选(支持跨分页)：有</span>
                  <span class="active_num">{{ invoiceNum }}</span>
                  <span>个订单可申请发票，可开票总额：</span>
                  <span class="active_num">￥ 0.00</span>
                </div>
                <div class="table_con">
                  <vxe-table
                    row-id="id"
                    :checkbox-config="{ labelField: '', highlight: true, trigger: 'row', reserve: true , range: true}"
                    :align="allAlign"
                    :data="tableData"
                    show-header-overflow
                    show-overflow
                    highlight-hover-row
                    ref="xTable1"
                    @checkbox-all="selectChangeEvent"
                    @checkbox-change="selectChangeEvent"
                  >
                    <vxe-table-column
                      type="checkbox"
                      width="60"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="orderSn"
                      title="订单编号"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="orderType"
                      title="资金类型"
                    >
                      <template #default="{ row }">
                        <span v-if="row.orderType==1">新购</span>
                        <span v-if="row.orderType==2">续费</span>
                        <span v-if="row.orderType==3">升级</span>
                        <span v-if="row.orderType==4">降级</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field=""
                      title="订单类型"
                    >
                      <template #default="{ row }">
                        <span v-if="row.orderAssort==1">账单</span>
                        <span v-if="row.orderAssort==2">订单</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field="serviceName"
                      title="产品名称"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="orderAmount"
                      title="订单实付金额"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="invoiceAmount"
                      title="可开票金额"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="masterOrderSn"
                      title="原始订单编号"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="paySuccessTime"
                      title="订单支付时间"
                    ></vxe-table-column>
                    <template v-slot:empty>
                      <i class="el-icon-warning-outline"></i>
                      <span>暂无可开票订单/账单</span>
                    </template>
                  </vxe-table>
                  <div class="tab_bom_con">
                    <div class="tab_bom_lef">
                      <!-- <el-checkbox v-model="setingChecked"></el-checkbox> -->
                      <el-button type="info" plain @click="next">下一步</el-button>
                      <div v-if="ifShowFpinfo">
                        <span class="set_info"
                          >您尚未设置有效的开票信息，无法开具发票</span
                        >
                        <span class="set_txt">立即设置发票抬头</span>
                      </div>
                      <div v-else>
                      待开票金额： <span class="set_txt">¥ {{invoiceAmount}}</span>，已选 <span class="set_txt">{{this.selectionRows.length}}</span>个订单
                      </div>
                    </div>
                    <div class="tab_bom_rig">
                      <vxe-pager
                        border
                        size="medium"
                        :loading="loading2"
                        :current-page="tablePage2.currentPage"
                        :page-size="tablePage2.pageSize"
                        :total="tablePage2.totalResult"
                        :layouts="[
                          'PrevPage',
                          'JumpNumber',
                          'NextPage',
                          'FullJump',
                          'Sizes',
                          'Total',
                        ]"
                        @page-change="handlePageChange2"
                      >
                      </vxe-pager>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="暂不可开票消费" name="second">
              <template v-if="activeName=='second'">
                <div class="input_con">
                  <span class="inp_label">产品名称：</span>
                  <div class="input_self">
                    <el-input
                      v-model="proName"
                      placeholder="产品名称模糊搜索"
                    ></el-input>
                  </div>
                  <span class="inp_label">起止时间：</span>
                  <div class="input_self timeRange_con">
                    <el-date-picker
                      v-model="timeRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                  <span class="inp_label">金额范围：</span>
                  <div class="input_self">
                    <el-input
                      v-model="moneyRange"
                      placeholder="请选择金额范围"
                      @focus="choiceMoneyRange"
                    ></el-input>
                  </div>
                  <span class="inp_label">订单编号：</span>
                  <div class="input_self">
                    <el-input
                      v-model="orderNum"
                      placeholder="请输入订单编号"
                    ></el-input>
                  </div>
                  <el-button class="my_el_btn"  @click="reset">重 置</el-button>
                  <el-button class="my_el_btn" type="primary" @click="search">查 询</el-button>
                </div>
                <div class="table_con">
                  <vxe-table
                    row-id="id"
                    :align="allAlign"
                    :data="tableData1"
                    show-header-overflow
                    show-overflow
                    highlight-hover-row
                  >
                    <vxe-table-column
                      field="orderSn"
                      title="订单编号"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="orderType"
                      title="资金类型"
                    >
                      <template #default="{ row }">
                        <span v-if="row.orderType==1">新购</span>
                        <span v-if="row.orderType==2">续费</span>
                        <span v-if="row.orderType==3">升级</span>
                        <span v-if="row.orderType==4">降级</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field=""
                      title="订单类型"
                    >
                      <template #default="{ row }">
                        <span v-if="row.orderAssort==1">账单</span>
                        <span v-if="row.orderAssort==2">订单</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field="serviceName"
                      title="产品名称"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="orderAmount"
                      title="订单实付金额"
                    >
                     <template #default="{ row }">
                        <span>累账中</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field="invoiceAmount"
                      title="可开票金额"
                    >
                     <template #default="{ row }">
                        <span>累账中</span>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column
                      field="masterOrderSn"
                      title="原始订单编号"
                    ></vxe-table-column>
                    <vxe-table-column
                      field="paySuccessTime"
                      title="订单支付时间"
                    ></vxe-table-column>
                    <template v-slot:empty>
                      <i class="el-icon-warning-outline"></i>
                      <span>暂无可开票订单/账单</span>
                    </template>
                  </vxe-table>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <template v-if="current == 1">
        <div class="invo_get_con2">
          <span
            >您选取了{{this.selectionRows.length}}条单据开具发票（若选中多条订单，订单金额将合并开具在一张票据中），开票金额合计：</span
          >
          <span class="setting_now">￥ {{invoiceAmount}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">发票抬头：</span>
          <span class="setting_now1"
            >{{detailObj.title}}</span
          >
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开具类型：</span>
          <span class="setting_now1">{{detailObj.issueTypeDesc}}</span>
        </div>
        <div class="invo_get_con2">
          <i class="el-icon-warning"></i>
          <span
            >发票类型为‘增值税专用发票’只可以开具纸质发票，如需修改可前往</span
          >
          <span class="setting_now">发票信息管理</span>进行修改
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">纳税人识别号：</span>
          <span class="setting_now1"
            >{{detailObj.taxpayerNumber}}</span
          >
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开户银行名称：</span>
          <span class="setting_now1">{{detailObj.bankName}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开户账号：</span>
          <span class="setting_now1">{{detailObj.bankNumber}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">注册场所地址：</span>
          <span class="setting_now1">{{detailObj.companyAddress}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">注册固定电话：</span>
          <span class="setting_now1">{{detailObj.companyPhone}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">发票性质：</span>
          <span class="setting_now1">{{detailObj.invoiceTypeDesc}}</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">电子发票邮寄地址：</span>
          <span class="setting_now1">
            <span v-for="(item,index) in emailList1" :key="index">
              {{item}},
            </span>
            <span class="setting_now" @click="isMail=true">更换地址</span>
            </span>
          
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">备注：</span>
          <span class="setting_now1"
            ><el-input
              type="textarea"
              v-model="memo"
              style="width: 600px"
              placeholder="该备注信息会展示在发票上，如有需要请录入，否则无需录入任何信息。"
            ></el-input>
            <br /><br />建议不要超过25个汉字或50个（数字+字母），否则盖章的时候有可能压到。<span
              class="setting_now" @click="isPreview=true"
              >查看样例</span
            ></span
          >
        </div>
        <div class="table_con" style="width: 100%; margin-top: 20px">
          <vxe-table
            :align="allAlign"
            :data="detailObj.invoicePlayInfoList"
            show-header-overflow
            show-overflow
            highlight-hover-row
          >
            <vxe-table-column
              field="orderNum"
              title="发票示例"
            >
              <template #default="{ row }">
                <span style="color:#0376fd;cursor:pointer" @click="isPreview=true">发票预览</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="invoiceContent"
              title="开票内容"
            ></vxe-table-column>
            <vxe-table-column
              field="moneyType"
              title="规格型号"
            ></vxe-table-column>
            <vxe-table-column field="amount" title="数量"></vxe-table-column>
            <vxe-table-column field="unit" title="单位"></vxe-table-column>
            <vxe-table-column
              field="totalAmount"
              title="总价"
            ></vxe-table-column>
            <vxe-table-column field="tax" title="税率"></vxe-table-column>
            <template v-slot:empty>
              <i class="el-icon-warning-outline"></i>
              <span>暂无可开票订单/账单</span>
            </template>
          </vxe-table>
          <div class="tab_bom_con" style="margin-top: 20px">
            <el-button plain @click="current--">上一步</el-button>
            <el-button type="primary" @click="askInvoice">索要发票</el-button>
          </div>
        </div>
      </template>
    </div>
    <el-dialog title="金额范围" :visible.sync="dialogFormVisible">
      <el-form :model="rangeForm">
        <el-form-item>
          <a-input-number v-model="rangeForm.min" :min="1" :max="9999"/>
        </el-form-item>
        &nbsp;&nbsp;
        <div class="henxian">-</div>
        &nbsp;&nbsp;
        <el-form-item>
          <a-input-number v-model="rangeForm.max" :min="1" :max="9999"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makeUp"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="更换地址" :visible.sync="isMail">
      <div>最多可以选择3个邮箱地址 <span style="color:#0376fd;cursor:pointer" @click="goLink">电子邮箱管理</span></div>
      <el-form :model="mailForm" label-position="top" style="display:block">
        <el-form-item label="邮箱" prop="type">
          <el-checkbox-group v-model="mailForm.type" max="3" min="1">
            <el-checkbox :label="item.email" name="type" v-for="item in emailList" :key="item.id" style="display:block"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isMail = false">取 消</el-button>
        <el-button type="primary" @click="makeSure"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="发票预览" :visible.sync="isPreview">
        <img src="../../assets/images/fapiao.png" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
 queryEnableOrderList,queryDisableOrderList,pretreatInvoice,queryEmailList,addInvoice
} from "../../api/InvoiceReq/index";
export default {
  name: "InvoiceReq",
  data() {
    return {
      isPreview:false,
      isMail:false,
      memo: "",
      current: 0,
      activeName: "first",
      proName: "",
      moneyRange: "",
      orderNum: "",
      timeRange: [],
      allChecked: false,
      setingChecked: false,
      allAlign: null, //对齐方式
      tableData: [],
      tableData1: [],
      loading2: false,
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      ifShowFpinfo: false,
      invoiceNum: 0,
      dialogFormVisible:false,
      rangeForm:{
        min:'',
        max:''
      },
      mailForm:{
        type:[],
      },
        /*table选中keys*/
      selectedRowKeys: [],
      /*table选中records*/
      selectionRows : [],
      emailList : [],
      emailList1 : [],
      invoiceAmount:0,
      parmObj:{},
      detailObj:{},
    };
  },
  created() {
    this.parmObj = JSON.parse(localStorage.getItem('fpttObj'));
    if (!this.parmObj.title) {
      this.ifShowFpinfo = true;
    }
    this.queryList();
    this.queryEmail();
  },
  methods: {
    goLink(){
      this.$router.push({
        path:'/invoiceMan'
      })
    },
    makeSure(){
      this.emailList1=this.mailForm.type;
      this.isMail=false;
    },
    next(){
      if(this.ifShowFpinfo){
        this.$message.warning("请设置发票抬头");
        return
      }
      // if(this.setingChecked==false){
      //   this.$message.warning("请勾选");
      //   return
      // }
      if(this.selectionRows.length<1){
        this.$message.warning("请至少选择一个订单");
         return
      }
      this.preView();
     
    },
    selectChangeEvent ({ checked, records, reserves, row }) {
        if (checked) {
            //第一次选数据，还未进行翻页时
            if (reserves.length == 0){
                this.selectedRowKeys = records.map(v => v.id);
                this.selectionRows = records;
            }else {
                //id集合，翻页存在已选中的数据时,拼接新选中的数据
                this.selectedRowKeys = [...reserves.map(v => v.id),...records.map(v => v.id)];
                //数据集合，翻页存在已选中的数据时,拼接新选中的数据
                this.selectionRows = [...reserves,...records];
            }
        }else {
            //取消选中时
            let idIndex = this.selectedRowKeys.indexOf(row.id);
            if (idIndex > -1) {
                //删除取消选中删除指定元素id
                this.$delete(this.selectedRowKeys, idIndex);
            }
            
            let dataIndex = null;
            for(let i = 0; i < this.selectionRows.length; i++) {
                if (this.selectionRows[i].id == row.id) {
                    dataIndex = i;
                    break;
                }
            }
            //删除取消选中的元素整个对象
            this.$delete(this.selectionRows, dataIndex);
        }
        let _sum=0;
        this.selectionRows.forEach(item=>{
           _sum=(_sum+(item.invoiceAmount)*100);
        })
        this.invoiceAmount=_sum/100;
    },
    reset(){
      this.proName="";
      this.moneyRange="";
      this.orderNum="";
      this.timeRange=[];
      this.rangeForm={
        min:'',
        max:''
      };
    },
    search(){
      this.tablePage2.currentPage=1;
      if(this.activeName=='first'){
        this.queryList();
      }else{
        this.queryList1();
      }
      
    },
    makeUp(){
      this.dialogFormVisible = false;
      this.moneyRange=this.rangeForm.min+'-'+this.rangeForm.max;
    },
    preView(){
      let _list=[];
      this.selectionRows.forEach(item=>{
        _list.push(item.orderSn)
      })
       let _param={
        "invoiceDetailId": this.parmObj.invoiceDetailId,
        "orderSnList":_list,
      };
      pretreatInvoice(_param)
        .then(res => {
          if (res.code == 200000) {
            this.detailObj=res.data;
            this.mailForm.type=[this.detailObj.email];
            this.emailList1=[this.detailObj.email];
            this.current++;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    askInvoice(){
      let _list=[];
      this.selectionRows.forEach(item=>{
        _list.push(item.orderSn)
      })
       let _param={
        "email": this.emailList1,
        "invoiceDetailId": this.parmObj.invoiceDetailId,
        "orderSnList":_list,
        "remark": this.memo
      };
      addInvoice(_param)
        .then(res => {
          if (res.code == 200000) {
            this.$message.error("success");
            this.$router.push({
              path:"/invoiceMan"
            })
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    queryEmail(){
       let _param={
        "page": 1,
        "pageSize":30,
      };
      queryEmailList(_param)
        .then(res => {
          if (res.code == 200000) {
            this.emailList= res.data.list;
            this.tablePage2.totalResult=res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    queryList(){
       let _param={
        "beginDate": this.timeRange[0],
        "endDate": this.timeRange[1],
        "maxMoney": this.rangeForm.max,
        "minMoney": this.rangeForm.min,
        "orderSn": this.orderNum,
        "page": this.tablePage2.currentPage,
        "pageSize":this.tablePage2.pageSize,
        "serviceName":this.proName,
      };
      queryEnableOrderList(_param)
        .then(res => {
          if (res.code == 200000) {
            this.tableData= res.data.list;
            this.tablePage2.totalResult=res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    queryList1(){
       let _param={
        "beginDate": this.timeRange[0],
        "endDate": this.timeRange[1],
        "maxMoney": this.rangeForm.max,
        "minMoney": this.rangeForm.min,
        "orderSn": this.orderNum,
        "page": this.tablePage2.currentPage,
        "pageSize":this.tablePage2.pageSize,
        "serviceName":this.proName,
      };
      queryDisableOrderList(_param)
        .then(res => {
          if (res.code == 200000) {
            this.tableData1= res.data.list;
            this.tablePage2.totalResult=res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    choiceMoneyRange(){
      this.dialogFormVisible = true;
    },
    settingTitleNow() {
      this.$router.push({
        path: "/invoiceMan",
        query: {
          setting: "now",
        },
      });
    },
    onChange(current) {
      this.current = current;
    },
    handleClick(tab, event) {
      this.reset();
      this.tablePage2.currentPage=1;
      if(tab.name=='first'){
        this.queryList();
      }else{
        this.queryList1();
      }
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage;
      this.tablePage2.pageSize = pageSize;
      this.queryList();
    },
  },
};
</script>
<style>
.v-modal{
  z-index:999991 !important;
}
.el-dialog__wrapper{
  z-index:999992 !important;
}
</style>
<style lang="scss" scoped>
.InvoiceReq_con {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .til_con {
    width: 100%;
    height: 53px;
    border-bottom: 1px solid #cfcdcd;
    display: flex;
    align-items: center;
    padding-left: 27px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
  }
  .invo_get_con {
    width: 100%;
    padding: 27px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .invo_get_con1 {
      width: 600px;
      margin-top: 6px;
    }
    .invo_get_con2 {
      width: 100%;
      height: 40px;
      margin-top: 32px;
      background: #fffbe6;
      border-radius: 2px;
      border: 1px solid #ffe58f;
      padding: 9px 17px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      /deep/ .el-icon-warning:before {
        color: #faad14;
        font-size: 20px;
        margin-right: 8px;
      }
      .setting_now {
        color: #0376fd;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .invo_get_item {
      width: 100%;
      display: flex;
      margin-top: 20px;
      .setting_now0 {
        width: 150px;
        text-align: right;
        margin-right: 50px;
      }
      .setting_now1 {
        flex: 1;
        .setting_now {
          margin-left: 20px;
          color: #0376fd;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .invo_get_con3 {
      width: 100%;
      height: 174px;
      margin-top: 20px;
      background: #fffbe6;
      opacity: 0.6;
      padding: 15px 39px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
    }
    .invo_get_con4 {
      width: 100%;
      margin-top: 32px;
      /deep/ .el-tabs {
        width: 100%;
      }
      /deep/ .el-tabs .el-tabs__content {
        width: 100%;
      }
      /deep/ .el-tabs .el-tabs__content .el-tab-pane {
        width: 100%;
        .input_con {
          width: 100%;
          display: flex;
          align-items: center;
          .inp_label {
            width: 80px;
            height: 22px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            line-height: 22px;
          }
          .input_self {
            width: 260px;
            margin-right: 20px;
            /deep/ .el-input {
              width: 100%;
              height: 100%;
              /deep/ .el-input__inner {
                width: 100%;
                height: 100%;
              }
            }
            /deep/ .el-date-editor--daterange {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              /deep/ .el-icon-date {
                height: auto;
              }
              /deep/ .el-range-separator {
                height: auto;
                width: auto;
              }
            }
          }
          .timeRange_con {
            width: 350px;
          }
          .my_el_btn {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .check_con {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 22px;
          margin-top: 20px;
          .active_num {
            color: #0376fd;
          }
        }
        .table_con {
          width: 100%;
          margin-top: 10px;
          .tab_bom_con {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
            .tab_bom_lef,
            .tab_bom_rig {
              width: 50%;
              height: 100%;
              .set_info {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #faad14;
                margin-right: 8px;
              }
              .set_txt {
                color: #0376fd;
              }
              .el-checkbox {
                margin-right: 10px;
              }
              .is-plain {
                width: 76px;
                height: 32px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .tab_bom_lef {
              display: flex;
              align-items: center;
            }
            .tab_bom_rig {
              background-color: magenta;
            }
          }
        }
      }
    }
  }
  /deep/ .el-dialog{
    width: 28% !important;
    margin-top: 18% !important;
  }
  /deep/ .el-dialog .el-dialog__body .el-form{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-dialog .el-dialog__body .el-form .henxian{
    height: 40px;
  }
}
</style>