<template>
    <div class="c-view-dialog excelImport" v-cloak>
        <div class="c-scroll-wrap">
            <div class="c-scroll-inner">
                <div class="c-title-fixed">
                    <h3 class="c-title">
                        数据列表<i class="el-icon-arrow-right"></i>表格合并
                        <el-page-header @back="backClick" class="c-return-btn"></el-page-header>
                    </h3>
                </div>
                <div class="c-wrapper-20">
                    <div class="c-text-between">
                        <div class="operateTable">
                            <p class="c-text-center c-button-wrapper">合并结果</p>
                            <el-row>
                                <el-col :span="24">
                                    <p class="c-pdb-20"><span class="ex_title">表格名称：</span><span  class="ex_desc">{{userTableName}}</span></p>
                                    <!-- <p><span class="ex_title">一级分类：</span><span  class="ex_desc">{{rowData.tableCategory||'--'}}</span></p> -->
                                </el-col>
                                <!-- <el-col :span="12">
                                    <p><span class="ex_title">创建时间：</span><span  class="ex_desc">{{rowData.createTime}}</span></p>
                                    <p><span class="ex_title">数据描述：</span><span  class="ex_desc">{{rowData.tableComment||'--'}}</span></p>
                                </el-col> -->
                            </el-row>
                            <div class="contentStep">
                                <div v-for="(item,index) in dataList" :key="index" class="c-detail-box">
                                    <vxe-table
                                        border
                                        show-header-overflow
                                        show-overflow
                                        highlight-hover-row
                                        max-height="700"
                                        :data="item.content">
                                        <vxe-table-column :field="subItem" :title="subItem" v-for="(subItem,subIndex) in item.nameList" :key="subIndex"></vxe-table-column>
                                    </vxe-table>
                                </div>
                            </div>
                        </div>
                        <div class="operate">
                            <operate @getCode="ininMyData" @lookRes="lookRes"></operate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import operate from '@/components/operate/mergeSet';
import {getTableData} from '@/api/index';
  export default {
    components: {
        operate
    },
    data(){
        return {
            dataList:[],
            userTableName:'',
        }
    },
    mounted() {
          
    },
    methods: {
        ininMyData(code){
            this.dataList=[];
            getTableData({'name':code}).then(res=>{
                if (res.code == 200000) {
                     let cloumName=[];
                    for(var key in res.data.list[0]){
                        cloumName.push(key);
                    }
                    this.userTableName=res.data.userTableName,
                    this.dataList.push({
                       nameList:cloumName,
                       content:res.data.list
                    });
                }
            }).catch(err => {

            });
        },
        backClick(){
            this.$emit('closeDialog',true)
        },
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
.operateTable{
    flex:1;
    background:#fff;
    padding:0 10px;
}
.operate{
    margin-left: 20px;
    width: 300px;
    background:#fff;
}
</style>