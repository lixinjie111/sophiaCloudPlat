<template>
    <div class="c-wrapper-20">
        <el-form :inline="true" size="mini" ref="searchForm" :model="searchKey" :rules="rules">
            <el-form-item label="模型名称：" prop="name">
                <el-input v-model.trim="searchKey.name"></el-input>
            </el-form-item>
            <el-form-item label="算法大类" prop="type">
                <el-select v-model.trim="searchKey.type" placeholder="请选择">
                    <el-option :key="key" :label="item" :value="key"  v-for="(item,key) in filterList">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="算法分类" prop="type1">
                <el-select v-model.trim="searchKey.type1" placeholder="请选择">
                    <el-option :key="key" :label="item" :value="key"  v-for="(item,key) in filterList1">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" icon="el-icon-search" @click="searchClick" size="mini" :loading="searchloading">查询</el-button>
                <el-button type="primary" plain icon="el-icon-setting" size="mini" @click="resetClick">重置</el-button>
            </el-form-item>
         </el-form>

        <div class="c-button-wrapper c-text-right">
            <el-button size="mini" plain @click="getRemoveEvent()">删除</el-button>
        </div>
        <vxe-table
            border
            stripe
            resizable
            align="center"
            max-height="800"
            highlight-hover-row
            show-overflow
            ref="xTable"
            :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
            :loading="tableLoading"
            :data="dataList">
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="updatetime" sortable title="创建时间"></vxe-table-column>
            <vxe-table-column field="onetypeName" sortable title="算法大类" ></vxe-table-column>
            <vxe-table-column field="secondtypeName" sortable title="算法分类" ></vxe-table-column>
            <vxe-table-column field="name" title="模型名称"></vxe-table-column>
            <vxe-table-column field="work" title="操作" width="230">
                <template v-slot="{ row }" >
                    <vxe-button @click="lookDetail(row)" size="mini">重新训练</vxe-button>
                    <!-- <vxe-button @click="clickItem(row)" size="mini">删除</vxe-button> -->
                    <vxe-button @click="exEdit(row)" size="mini">评估</vxe-button>
                    <vxe-button @click="downLoad(row)" size="mini">预测</vxe-button>
                </template>
            </vxe-table-column>
            <!-- <vxe-table-column field="date" title="分析" width="230">
                <template v-slot="{ row }">
                    <vxe-button status="primary" @click="clickItem(row)" size="mini">直接分析</vxe-button>
                    <vxe-button @click="clickItem(row)" size="mini">分析推荐</vxe-button>
                </template>
            </vxe-table-column> -->
        </vxe-table>
        <div class="c-button-wrapper">
            <vxe-pager
            :loading="tableLoading"
            :current-page="tablePage.currentPage"
            :page-size="tablePage.pageSize"
            :total="tablePage.totalResult"
            align="center"
            :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'Sizes', 'Total']"
            @page-change="handlePageChange1">
            </vxe-pager>
        </div>
    </div>
</template>
<script>
import {modelList,delTable,downLoad,getOneType,getSecondType,deleteModel} from '@/api/algorithm';
export default {
    // components: {
    //     add,importData,newExcel,excelMerge,exDetail,exEdit,copy,moreMerge
    // },
    data(){
        return {
            searchKey:{
                name:'',
                type:'',
                type1:'',
            },
            historySearchKey: {},
            ClassifiyList:[],
            exDetailFlag:false,
            exEditFlag:false,
            rowData:null,
            excelMergeFlag:false,
            MoreMergeFlag:false,
            pageOption: {
                size: 10,
                total: 0,
                page: 1     
            },
            popData: {
                title: '提示',
                data: {},
                visible: true
            },
            dataList: [],
            tableLoading: false,
            addFlag:false,
            copyFlag:false,
            dialogData:{
                title:'',
                data:'',
                type:'',    //type 1：新增，2：编辑
                viewFlag: false,
            },
            importFlag:false,
            newExcelFlag:false,
            filterList:[],
            filterList1:[],
            tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            }
        }
    },
    created(){
        this.initData();
        this.getOneType();
        this.getSecondType();
    },
    methods: {
        initPageOption() {
            this.dataList = [];
            this.tablePage.totalResult = 0;
            this.tablePage.currentPage = 1;
        },
        searchClick(){
            this.$refs.searchForm.validate((valid) => {
                if (valid) {
                    this.searchloading = true;
                    this.historySearchKey = this.searchKey;
                    this.initPageOption();
                    this.initData();
                } else {
                    return false;
                }
            });
        },
        resetClick(){
            this.$refs.searchForm.resetFields();
        },
        handlePageChange1 ({ currentPage, pageSize }) {
            this.tablePage.currentPage = currentPage
            this.tablePage.pageSize = pageSize
            this.initData()
        },
        filterCateMethod({ option, row }){
            return row.tableCategory === option.data
        },
        filterCateMethod1({ option, row }){
            return row.type === option.data
        },
        filterNameMethod({ option, row }){
              return row.name.includes(option.data);
        },
        getOneType(){
            getOneType({}).then(res=>{
                if (res.code == 200) {
                    this.filterList = res.result;
                }
                this.tableLoading = false;
            }).catch(err => {
                this.tableLoading = false;
            });
        },
        getSecondType(){
            getSecondType({}).then(res=>{
                if (res.code == 200) {
                    this.filterList1 = res.result;
                }
            }).catch(err => {
            });
        },
        downLoad(row){
           this.$router.push({name:'algoPre',params:{rowData:row}})
        },
        exEdit(row){
           this.$router.push({name:'algotest',params:{rowData:row}})
        },
        lookDetail(row){
            let _path='';
            if(row.secondtype=='decisionTree'){//决策树
                _path='deTree';
            }
            if(row.secondtype=='hierarchicalCluster'){//层次聚类
                 _path='layer';
            }
            if(row.secondtype=='kMeans'){//kMeans聚类
                 _path='KMeans';
            }
            if(row.secondtype=='linerRegression'){//线性回归
                 _path='linerun';
            }
            if(row.secondtype=='logisticRegression'){//逻辑回归
                 _path='algorun';
            }
            if(row.secondtype=='polyLinerRegression'){//多项式回归
                 _path='polyfit';
            }
            if(row.secondtype=='randomForest'){//随机森林
                 _path='rdmForest';
            }
            if(row.secondtype=='svmClassifier'){//支持向量机
                 _path='vector';
            }
            if(row.secondtype=='mlpClassifier'){//多层感知机
                 _path='mlpClassifier';
            }
            this.$router.push({name:_path,params:{rowData:row}})
        },
        initData(){
            this.dataList=[];
            this.tableLoading = true;
            let params = {
                name: this.historySearchKey.name,
                onetype: this.historySearchKey.type,
                secondtype: this.historySearchKey.type1,
                rows: this.tablePage.pageSize,
                page: this.tablePage.currentPage,
            };
            modelList(params).then(res=>{
                if (res.code == 200) {
                    this.dataList = res.rows;
                    this.tablePage.totalResult = res.records;
                    this.searchloading=false
                }
                this.tableLoading = false;
                this.searchloading=false
            }).catch(err => {
                this.tableLoading = false;
                this.searchloading=false
            });
        },
        getRemoveEvent () {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let removeRecords = this.$refs.xTable.getCheckboxRecords();
                let arr=[];
                removeRecords.forEach(item=>{
                    arr.push(item.id);
                })
                let params={"ids":arr.join(',')}
                deleteModel(params).then(res=>{
                    if (res.code == 200) {
                        this.initData();
                        this.$message({
                            type: 'success',
                            duration: '1500',
                            message: "删除成功！",
                            showClose: true
                        });      
                    }
                }).catch(err => {

                });
             }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     duration: '1500',
                //     message: "已取消删除！",
                //     showClose: true
                // });  
            });    
        },
    },
   

}
</script>
<style lang="scss" scoped>
.vxe-table{
    width: 100%;;
}
.my-select {
    margin: 10px;
    width: 100px;
    height: 32px;
    border:1px solid #000;
}
.my-input {
    margin: 10px;
    width: 140px;
    height: 32px;
    border:1px solid #000;
}
</style>

