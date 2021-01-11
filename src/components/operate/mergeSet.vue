<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <el-form ref="dialogForm1" :model="formParams1" label-width="90px" size="mini" :rules="rules1" label-position="top">
        <el-form-item label="合并形式" prop='direction'>
            <el-radio-group v-model="formParams1.direction">
                <el-radio label="1">水平</el-radio>
                <el-radio label="2">垂直</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="formParams1.direction==1">
            <el-form-item label="合并方式" prop='type'>
                <el-radio-group v-model="formParams1.type">
                    <el-radio label="union">交集</el-radio>
                    <el-radio label="intersection">并集</el-radio>
                    <el-radio label="subtract">差集</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="合并主键"  prop='key'>
                <el-select v-model="formParams1.key" placeholder="请选择"  @change="selectKey">
                    <el-option  v-for="item in keyList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择主表字段"  prop='filed1'>
                <el-select v-model="formParams1.filed1" placeholder="请选择" multiple @change="selectFiled1">
                    <el-option  v-for="item in designList2" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="选择副表字段"  prop='filed2'>
                <el-select v-model="formParams1.filed2" placeholder="请选择" multiple>
                    <el-option  v-for="item in designList3" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
        </template>
        <el-form-item label="添加表名" prop='newTableName'>
            <el-input v-model.trim="formParams1.newTableName"></el-input>
        </el-form-item>
        <el-form-item label="添加分类"  prop='cate'>
            <el-select v-model="formParams1.cate" placeholder="请选择">
                <el-option  v-for="item in categoryList" :key="item.id" :label="item.classificationName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>   
        <el-form-item label="数据描述" prop='desc'>
            <el-input
                type="textarea"
                :rows="3"
                placeholder=""        
                v-model.trim="formParams1.desc">
            </el-input>
        </el-form-item>  
      </el-form>
      <div class="c-text-center" style="margin-top: 20px">
          <el-button type="primary" size="small" @click="submitForm">确定</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==1">
      <el-form ref="dialogForm2" :model="formParams2" label-width="100px" size="mini" :rules="rules2" label-position="top">
        <el-form-item label="选择主表"  prop='ku'>
            <el-select v-model="formParams2.ku" placeholder="请选择" @change="selectTable2">
                <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==2">
        <el-form ref="dialogForm3" :model="formParams3" label-width="100px" size="mini" :rules="rules3" label-position="top">
            <el-form-item label="选择副表"  prop='ku'>
              <el-select v-model="formParams3.ku" placeholder="请选择" @change="selectTable3">
                  <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>
import {myDataList} from '@/api/index';
import {getTableData,getTableCosumn,getUserClassification,verticalConsolidation,horizontalConsolidation} from '@/api/index';
import {crosstable,checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          formParams: {
            type: [],
            alpha:''
          },
          formParams1: {
            direction:'1',
            type:'',
            key:'',
            filed1:[],
            filed2:[],
            newTableName:'',
            cate:'',
            desc:'',
          },
          formParams2: {
            ku:'',
          },
          formParams3: {
            ku:'',
          },
          currentId:"1",
          tabData:[
              {name:"设置主表",id:1},
              {name:"设置副表",id:2},
              {name:"合并配置",id:3},
          ],
          designList2:[],
          designList3:[],
          keyList:[],
          ClassifiyList:[],
          dataList:[],
          zunList:[
            {name:'自变量在一列内',value:'v'},
            {name:'自变量为字段名',value:'h'},
          ],
          rules1:{
              direction: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              type: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              key: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              filed1: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
              filed2: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
              newTableName: [
                { required: true, message: '请输入', trigger: 'blur' }
              ],
              cate: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
          },
          rules2:{
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
          },
          rules3:{
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
          },
          result:[],
          categoryList:[],
      };
    },
    created(){
      this.initData();
      this.ininCate();
    },
    methods: {
       ininCate(){
            this.categoryList=[];
            getUserClassification().then(res=>{
                if (res.code == 200000) {
                    this.categoryList=res.data;
                }
            }).catch(err => {

            }); 
      },
      realForm2(){
        let params={
            "newTableName": this.formParams1.newTableName,
            "tableName1": this.formParams2.ku,
            "tableName2": this.formParams3.ku,
            'tableRemark':this.formParams1.desc,
            'classId':this.formParams1.cate
        };
        verticalConsolidation(params).then(res => {
            if(res.code == 200000) {
                this.$emit('getCode',res.data)
            }
        }).catch(err => {

        });
      },
      realForm1(){
        let params={
            'columns1':this.formParams1.filed1,
            'columns2':this.formParams1.filed2,
            'key':this.formParams1.key,   
            'type':this.formParams1.type,   
            "newTableName": this.formParams1.newTableName,
            "tableName1": this.formParams2.ku,
            "tableName2": this.formParams3.ku,
            'tableRemark':this.formParams1.desc,
            'classId':this.formParams1.cate
        };
        horizontalConsolidation(params).then(res => {
            if(res.code == 200000) {
                this.$emit('getCode',res.data)
            }
        }).catch(err => {

        });
      },
      submitForm(formName) {
        this.$refs.dialogForm1.validate((valid1) => {
          if (valid1) {
            this.$refs.dialogForm2.validate((valid2) => {
              if (valid2) {
                this.$refs.dialogForm3.validate((valid3) => {
                    if (valid3) {
                        if(this.formParams1.direction==1){
                            this.realForm1();
                        }else{
                            this.realForm2();
                        }
                    } else {
                        this.$message({
                            type: 'info',
                            duration: '1500',
                            message: "请填写副表配置",
                            showClose: true
                        });
                        return false;
                    }
                });
              } else {
                 this.$message({
                    type: 'info',
                    duration: '1500',
                    message: "请填写主表配置",
                    showClose: true
                });
                return false;
              }
            });
          } else {
            this.$message({
                type: 'info',
                duration: '1500',
                message: "请填写合并配置",
                showClose: true
            });
            return false;
          }
        });
      },
      handleClick(item) {
       this.currentId=item.id
      },
      selectTable2(val){
         this.formParams1.key='';
         this.keyList=[];
         this.formParams1.filed1=[];
         this.designList2=[];
        //  this.formParams1.filed2=[];
        //  this.designList3=[];
         this.ininSearch(val,2);
      },
      selectTable3(val){
         this.formParams1.key='';
         this.keyList=[];
        //  this.formParams1.filed1=[];
        //  this.designList2=[];
         this.formParams1.filed2=[];
         this.designList3=[];
         this.ininSearch(val,3);
      },
      selectFiled1(){
        this.designList3.forEach(item=>{
          this.formParams1.filed1.forEach(item1=>{
              if(item.column_name==item1){
                item['disabled']=true;
              }
          })
        })
      },
      selectKey(val){
        this.designList2.forEach(item=>{
              item['disabled']=false;
        })
        this.designList3.forEach(item=>{
              item['disabled']=false;
        })
        this.designList2.forEach(item=>{
            if(item.column_name==val){
              item['disabled']=true;;
            }
        })
        this.designList3.forEach(item=>{
            if(item.column_name==val){
              item['disabled']=true;;
            }
        })
      },
      initData(){
          this.dataList=[];
          myDataList().then(res=>{
              if (res.code == 200000) {
                  this.ClassifiyList=res.data.tableClassification;
                  this.dataList = res.data.tableInfo;
              }
          }).catch(err => {
          });
      },
      ininSearch(code,val){
          getTableCosumn({'name':code}).then(res=>{
              if (res.code == 200000) {
                  if(val==2){
                      this.designList2=res.data;
                      this.designList2.splice(this.designList2.findIndex(item=>item.column_name=='id'),1)
                  }else{
                      this.designList3=res.data;
                      this.designList3.splice(this.designList3.findIndex(item=>item.column_name=='id'),1)
                      this.keyList=[];
                      this.designList2.forEach(item=>{
                        this.designList3.forEach(item1=>{
                            if(item.column_name==item1.column_name){
                                this.keyList.push(item);
                            }
                        })
                      })
                      //console.log(this.keyList)
                  }
                  
              }
          }).catch(err => {

          });
      },
    }
  };
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
li{
    flex:1;
    padding-bottom:10px;
    padding-top:5px;
    @include layoutMode(both);
    cursor: pointer;
    box-sizing: border-box;
}
.tabActive{
        color:#409eff;
        position: relative;
            &::after{
               content: "";
                display:block;
                position: absolute;
                bottom: -2px;
                left: calc(50% - 15px);
                width: 30px;
                height: 2px;
                background: #409eff;
            }
    }
</style>