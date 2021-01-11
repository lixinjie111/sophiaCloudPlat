<template>
  <div class="c-padding-10">
    <ul class="c-text-both">
      <li v-for="item in tabData" :class="{'tabActive':currentId===item.id}" :key="item.id" @click="handleClick(item)">
        {{item.name}}
      </li>
    </ul>
    <!--参数部分-->
    <div class="opContent c-mt-20 c-mb-10 box" v-show="currentId === 2">
      <div class="opContent-col-row">
        <span class="opContent-col-label">
          选择字段
        </span>
        <span class="opContent-col-item">
          <el-select @change="selectField" v-model="encoder.field" placeholder="请选择" style="width: 80%;" class="opContent-col-item-select">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="opContent-col-row">
        <span class="opContent-col-label">
          编码方式
        </span>
        <span class="opContent-col-item">
          <el-select  @change="selectChange($event)" v-model="encoder.selectedCodeType" placeholder="请选择" style="width: 80%;" class="opContent-col-item-select">
            <el-option
              v-for="item in codeType"
              :key="item.key"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div v-if="encoder.selectedCodeType === 'content'" class="content-type">
        <div>编码内容</div>
        <div v-for="(it, i) in codeArr" :key="i" class="content-row">
          <span class="content-series">{{i + 1}}</span>
<!--          <span>{{it.setValue}}</span>-->
          <el-input-number v-model.number="it.setValue" class="content-input" autocomplete="off"></el-input-number>
        </div>
      </div>
      <div v-else-if="encoder.selectedCodeType === 'range'" class="range-type">
        <div>编码内容</div>
        <div v-for="(it, i) in range" :key="i" class="range-row">
          <div class="content-row-title">
            <div class="row-range">范围介意</div>
            <div class="row-input">数字编码</div>
          </div>
          <div class="range-col-row">
            <div class="range-col row-range">
              <el-input size="small" @input="inputChange($event, it, 'start')" controls-position="" v-model.number="it.start" class="content-input input-number" autocomplete="off"></el-input>
              <span class="range-divide">-</span>
              <el-input size="small" @input="inputChange($event, it, 'end')"  controls-position="" v-model.number="it.end"  class="content-input content-input-end input-number" autocomplete="off"></el-input>
            </div>
            <div class="range-col row-input">
              <el-input size="small" @input="inputChange($event, it, 'number')" v-model.number="it.number"  class="content-input  input-number" autocomplete="off"></el-input>
              <span class="range-col-opter">
                <i class="el-icon-plus" @click="addRow(i)"></i>
                <i class="el-icon-minus" v-show="range.length > 1" @click="minusRow(i)"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="c-text-center btn-container" style="margin-top: 20px">
        <el-button type="primary" size="small" @click="clearCodeArr">重置</el-button>
        <el-button type="primary" size="small" @click="submitFunc1">确定</el-button>
        <el-button type="primary" size="small" :disabled="disabledContinue" @click="continueInput">继续编码</el-button>
      </div>
    </div>
    <!--数据部分-->
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId===1">
      <el-form ref="dialogForm" :model="formParams1" label-width="90px" size="mini">
        <el-form-item label="选择数据表">
          <el-select v-model="formParams1.data" placeholder="我的数据" value-key="id" @change="selectMydata($event)">
            <el-option v-for="(item,index) in dataList" :key="index" :label="item.userTableName"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="c-text-center">
        <el-button type="primary" size="small" @click="chakanFunc">查看数据</el-button>
      </div>
    </div>
    <!--路径部分-->
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <div class="c-text-center c-mb-20">tab3</div>
      <div class="c-text-center">
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {myDataList, getTableData, getTableCosumn} from '@/api/index'
  import {submitColumnenCode, getDistinctcolumn} from '@/api/dataDeal/index'
  function generateRange() {
    return { start: null, end: null, number: null, field: null}
  }
  export default {
    data() {
      return {
        formParams1: {
          data: null
        },
        disabledContinue: false, // 是否禁用继续编码按钮
        currentId: 1,
        range: [generateRange()],
        tableList: [],
        codeArr: [],
        allCodeArr: [],
        tabData: [
          {name: "数据", id: 1},
          {name: "参数", id: 2},
          {name: "路径", id: 3},
        ],
        dataList: null,
        choicedTableId: '',
        codeType: [{ name: '数字编码', value: 'content' }, { name: '范围编码', value: 'range' }],
        options: [],
        encoder: { field: '', selectedCodeType: ''}
      };
    },
    created() {
      this.initData();
    },
    methods: {
      selectMydata(e) {
        this.choicedTableId = e.id;
        const encodeTableName = this.tableName = e.tableName;
        let Name = this.userTableName = e.userTableName;
        let tableInfo = {
          encodeTableName,
          Name
        };
        this.ininSearch(encodeTableName)
        this.$emit('putChoiceTableId', e.id, tableInfo);
      },
      handleClick(item) {
        this.currentId = item.id
      },
      initData() {
        this.dataList = [];
        myDataList().then(res => {
          if (res.code == 200000) {
            this.ClassifiyList = res.data.tableClassification;
            this.dataList = res.data.tableInfo;
          }
        }).catch(err => {
        });
      },
      chakanFunc() {
        let kuName = this.formParams1.data.tableName;
        this.tableKayName = kuName;
        let parm = {
          name: kuName
        };
        this.encoder.field = ''
        this.encoder.selectedCodeType = ''
        getTableData(parm).then(res => {
          if (res.code == 200000) {
            let detailData = this.tableList = res.data.list;
            this.$emit('beforeOperData', detailData);
          } else {
            this.$message({
              type: 'error',
              duration: '1500',
              message: "获取数据失败",
              showClose: true
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: '1500',
            message: "获取数据失败",
            showClose: true
          });
        });
      },
      ininSearch(code){
        this.options = []
        getTableCosumn({'name': code}).then(res=>{
          if (res.code == 200000) {
            this.options = res.data.filter(e=>e.column_name !== 'id' && e.data_type === 'int').map(e=>({ label: e.column_name, value: e.column_name }));
          }
        }).catch(err => {

        });
      },
      /**
       * 检测重复,返回为 true 这可以通过
       * @returns {boolean}
       */
      testRepetition(){
        if(this.encoder.selectedCodeType === 'content'){
          const numbers = this.codeArr.map(e=>e.setValue)
          return [...new Set(numbers)].length === numbers.length
        }else if(this.encoder.selectedCodeType === 'range'){
          return true
        }
      },
      /**
       * 检查输入的内容是否在表格中存在
       */
      testFieldInTable(){
        // 找出选择字段列的所有内容
        const arr = this.tableList.map(e=>e[this.encoder.field])
        return this.codeArr.map(e=>e.setValue).filter(e=>arr.includes(e)).length === this.codeArr.length
      },
      submitFunc1() {
        const parmsData = { tableId: this.choicedTableId, encodeDetails: [] };

        if(!this.encoder.field){
          return this.$message.error('请输入之后在进行提交')
        }
        const flag = this.testRepetition()
        if(!flag){
          return this.$message.error('输入含有重复的内容')
        }
        if(this.encoder.selectedCodeType === 'content'){
          // 判断是否有多次点击提交按钮所产生的重复数据
          if(!this.allCodeArr.length || this.allCodeArr[this.allCodeArr.length - 1].children != this.codeArr){
            const result = this.testFieldInTable()
            if(!result){
              return this.$message.error('输入的内容必须是表格中该列存在的数据')
            }
            this.allCodeArr.push({ type: 'content', field: this.encoder.field, children: this.codeArr})
          }

        }else if(this.encoder.selectedCodeType === 'range'){
          // 判断是否有多次点击提交按钮所产生的重复数据
          if(!this.allCodeArr.length || this.allCodeArr[this.allCodeArr.length - 1].children != this.codeArr){
            this.allCodeArr.push({ type: 'range', field: this.encoder.field, children: this.range })
          }
        }
        const temp = {}
        const encodeDetails = []
        this.allCodeArr.forEach((it, i)=>{
          if(it.type === 'range'){
            const encodeMap = {}
            it.children.forEach((e)=>{
              const key = `${e.start}-${e.end}`
              encodeMap[key] = Number(e.number)
            })
            temp[`${it.field}-RANGE`] = i
            encodeDetails.push({ columnName: it.field, encodeType: 'RANGE', encodeMap })
          }else if(it.type === 'content'){
            const encodeMap = {}
            it.children.forEach((e, i)=>{
              const key = i + 1
              encodeMap[key] = Number(e.setValue)
            })
            temp[`${it.field}-NUMBER`] = i
            encodeDetails.push({ columnName: it.field, encodeType: 'NUMBER', encodeMap })
          }
        })
        const indexArr = Object.values(temp)
        // 去重，并且以最后一次结果为准
        parmsData.encodeDetails = encodeDetails.filter((e, i)=>indexArr.includes(i))
        // 禁止点击继续编码按钮
        this.disabledContinue = true
        submitColumnenCode(parmsData).then(res => {
          if (res.code == 200000) {
            let detailData = res.data;
            this.$emit('afterOperData', detailData);
          } else {
            this.$message({
              type: 'error',
              duration: '1500',
              message: "获取数据失败",
              showClose: true
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: '1500',
            message: "获取数据失败",
            showClose: true
          });
        })
      },
      selectField(field){
        this.encoder.field = field
        this.encoder.selectedCodeType = ''
        this.codeArr = []
        this.range = [generateRange()]

      },
      selectChange(){
        const { field, selectedCodeType } = this.encoder
        this.codeArr = []
        this.range = [generateRange()]
        if(field && selectedCodeType === 'content'){
          this.getDistinctcolumn(field)
        }
      },
      clearCodeArr(){
        this.codeArr = []
        this.allCodeArr = []
        this.range = [generateRange()]
        this.encoder.field = ''
        this.encoder.selectedCodeType = ''
        this.disabledContinue = false
      },
      // 暂存，继续编码
      continueInput(){
        const flag = this.testRepetition()
        if(!flag){
          return this.$message.error('输入含有重复的内容')
        }
        if(this.encoder.selectedCodeType === 'content'){
          const result = this.testFieldInTable()
          if(!result){
            return this.$message.error('输入的内容必须是表格中该列存在的数据')
          }
          this.allCodeArr.push({ type: 'content', field: this.encoder.field, children: this.codeArr})
        }else if(this.encoder.selectedCodeType === 'range'){
          this.allCodeArr.push({ type: 'range', field: this.encoder.field, children: this.range })
        }
        this.codeArr = []
        this.range = [generateRange()]
        this.encoder.field = ''
        this.encoder.selectedCodeType = ''
      },
      // 输入事件，允许输入数字
      inputChange(value, item, key){
        if(!Number(value)){
          item[key] = null
        }else {
          item[key] = value
        }
      },
      // 添加行
      addRow(i){
        this.range.splice(i + 1, 0, generateRange())
      },
      // 删减行
      minusRow(i){
        this.range.splice(i, 1)
      },
      // /column/distinctcolumn
      // 获取去重数字
      getDistinctcolumn(columnName){
        const params = {tableId: this.choicedTableId, columnName, accessToken: localStorage.getItem('yk-token') }
        getDistinctcolumn(params).then((res)=>{
          res.data.forEach(e=>{
            this.codeArr.push({ setValue: null })
          })
        })
      }
    },
    computed: {
    }
  };
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/theme.scss';
  .input-number{
    .el-input__inner{
      padding: 0 4px;
    }
  }

  li {
    flex: 1;
    padding-bottom: 10px;
    padding-top: 5px;
    @include layoutMode(both);
    cursor: pointer;
    box-sizing: border-box;
  }

  .tabActive {
    color: #409eff;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: calc(50% - 15px);
      width: 30px;
      height: 2px;
      background: #409eff;
    }
  }

  .checkBox_container {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    color: #606266;
    .fanwei_title {
      margin-right: 16px;
    }
    .fanwei_content {
      .allTable {
        margin-bottom: 10px;
      }
    }
  }

  .box.opContent {
    height: 412px;
    overflow-y: auto;
  }

  .opContent-col-row {
    display: flex;
    margin-bottom: 12px;
    .opContent-col-label {
      width: 100px;
      display: flex;
      align-items: center;
      margin-right: 8px;
    }
  }

  .opContent-col-item {
    display: flex;
    align-items: center;
    .opContent-col-item-select {
      margin-right: 8px;
    }
    .operation {
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
  }

  .operation-text {
    font-size: 20px;
  }
  .btn-container{
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
  .content-type{
    .content-row{
      display: flex;
      align-items: center;
      margin: 8px 0;
      padding-left: 30px;
    }
    .content-series{
      display: inline-block;
      width: 35px;
      height: 35px;
      line-height: 35px;
      border-radius: 6px;
      background: #2299dd;
      color: #fff;
      text-align: center;
      font-size: 16px;
    }
    .content-input{
      width: 160px;
      margin-left: 16px;
    }
  }
  .range-type{
    .range-row{
      /*padding-left: 30px;*/
    }
    .content-row-title{
      display: flex;
      align-items: center;
      margin: 8px 0;
    }
    .range-col-row{
      display: flex;
      align-items: center;
    }
    .range-col{
      display: flex;
      /*width: 50%;*/
      height: 50px;
      line-height: 50px;
      border-radius: 3px;
      text-align: center;
      font-size: 16px;
    }
    .range-col-opter{
      display: flex;
      align-items: center;
      width: 80px;
      i{
        flex: 1 1;
        color: #000;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .range-divide{
      padding: 0 10px;
    }
    .content-input{
      width: 120px;
      margin-left: 16px;
    }
    .content-input.content-input-end{
      margin-left: 0;
    }

  }
  .row-range{
    width: 60%;
    text-align: center;
  }
  .row-input{
    width: 40%;
    text-align: center;
  }

</style>
