<template>
    <div class="rem_set_custom">
        <div class="top">
            共{{total}}个推荐策略
            <a-button v-if="curOpt=='edit'" style="margin-left:20px" type="primary" @click="toRule">添加推荐策略</a-button>
        </div>
        <a-table :columns="columns" :data-source="list" :pagination="pagination" :rowKey="record=>record.id">
            <template slot="operation" slot-scope="text,record,index">
                <div class="operate" v-if="curOpt=='edit'">
                    <a-switch v-model="record.status" checked-children="启用" un-checked-children="停用" 
                    :default-checked="record.status" @click="onClick" @change="onChange(record.id)"/>
                    <a-button class="p0" type="link" @click="edit(record)">修改</a-button>
                    <a-popconfirm
                        title="是否删除该应用?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="del(record.id)">
                        <a-button class="p0" type="link">删除</a-button>
                    </a-popconfirm>
                </div>
                <div v-else>
                    <a-button type="link" @click="showDetail(record)">查看</a-button>
                </div>
            </template>
        </a-table>
        <div class="opt_btn" v-if="curOpt=='edit'">
            <a-button type="primary" @click="complete">完成</a-button>
            <a-button @click="cancel">取消</a-button>
        </div>
         <Recall v-if="curType=='召回策略'&&curOpt=='detail'" :detailData="detailData" @initType="initType"></Recall>
         <RecallEdit v-else-if="curType=='召回策略'&&curOpt=='edit'" :detailData="detailData" @refresh="initList"></RecallEdit>
         <FilterRule v-if="curType=='行为过滤'" :detailData="detailData" @initType="initType"></FilterRule>
         <Black v-if="curType=='黑名单'" :detailData="detailData" @initType="initType"></Black>
         <Sort v-if="curType=='排序策略'" :detailData="detailData" @initType="initType"></Sort>
         <Run v-if="curType=='设置必推'" :detailData="detailData" @initType="initType"></Run>
    </div>
</template>
<script>
import Recall from "@/components/recommendation/scene/custom/Recall"
import RecallEdit from "@/components/recommendation/scene/custom/RecallEdit"
import FilterRule from "@/components/recommendation/scene/custom/Filter"
import Black from "@/components/recommendation/scene/custom/Black"
import Sort from "@/components/recommendation/scene/custom/Sort"
import Run from "@/components/recommendation/scene/custom/Run"
import {getStrategies, startStrategy, endStrategy, deleteStrategy, 
getRecallStrategy, getFilterRule, getBlacklist, getSortStrategy, getMustRecommend} from "@/api/recommendation/index"

export default {
    name:"SetCustom",
    components:{Recall, RecallEdit, FilterRule, Black, Sort, Run},
    props:{
        curOpt:{
            type:String
        }
    },
    data(){
        return{
            total:0,
            columns:[
                {
                    title:"序号",
                    customRender:(text,record,index)=>`${index+1}`,
                    width:60,
                },
                {
                    title:"策略名称",
                    dataIndex:"name"
                },
                {
                    title:"策略属性",
                    dataIndex:"typeDesc"
                },
                {
                    title:"策略类型",
                    dataIndex:"subTypeDesc"
                },
                {
                    title:"创建人",
                    dataIndex:"userName"
                },
                {
                    title:"跟新时间",
                    dataIndex:"updateTime"
                },
                {
                    title:"操作",
                    dataIndex:"operation",
                    scopedSlots:{
                        customRender:'operation'
                    }
                }
            ],
            list:[],
            pagination:{
                total:0,
                current:1,
                pageSize:10,
                onChange:(pageNumber)=>{
                    this.getList(pageNumber)
                }
            },
            curId:"",
            curType:'',
            detailData:{}
        }
    },
    methods:{
        toRule(){

        },
        onChange(id){
            this.curId = id
        },
        onClick(checked){
            if(checked){
                startStrategy({id:this.curId}).then(res=>{}).catch(err=>{this.$message.error(err.message)})
            }else{
                endStrategy({id:this.curId}).then(res=>{}).catch(err=>{this.$message.error(err.message)})
            }
        },
        edit(item){
            this.curType = item.typeDesc
            switch(this.curType){
                case '召回策略' :
                    this.getRecallStrategy(item.id)
                    break
                case '行为过滤' :
                    this.getFilterRule(item.id)
                    break
                case '黑名单' :
                    this.getBlacklist(item.id)
                    break
                case '排序策略' :
                    this.getSortStrategy(item.id)
                    break
                case '设置必推' :
                    this.getMustRecommend(item.id)
                    break
            }            
        },
        del(id){
            deleteStrategy({id}).then(res=>{
                if(res.code==200000){
                    if(res.data){
                        this.getList()
                    }
                }else{
                    this.$message.error("请求失败！")
                    this.getList()
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        showDetail(item){
            this.curType = item.typeDesc
            switch(this.curType){
                case '召回策略' :
                    this.getRecallStrategy(item.id)
                    break
                case '行为过滤' :
                    this.getFilterRule(item.id)
                    break
                case '黑名单' :
                    this.getBlacklist(item.id)
                    break
                case '排序策略' :
                    this.getSortStrategy(item.id)
                    break
                case '设置必推' :
                    this.getMustRecommend(item.id)
                    break
            }
        },
        initType(){
            this.curType = ""
        },
        initList(){
            this.curType = ""
            this.getList()
        },
        complete(){},
        cancel(){},
        getList(current){
            let params = {
                pageNum:current||1,
                pageSize:this.pagination.pageSize,
                sceneId:this.$route.query.sceneId
            }
            getStrategies(params).then(res=>{
                if(res.code==200000){
                    this.list = res.data.list
                    this.total = res.data.total
                    this.pagination.total = res.data.total
                    this.pagination.current = current || 1
                }else{
                    this.$message.error(res.messag)
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        async getRecallStrategy(id){
            getRecallStrategy({id}).then(res=>{
                if(res.code==200000){
                    this.detailData = res.data
                }else{
                    this.$message.error("请求失败！")
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }, 
        getFilterRule(id){
            getFilterRule({id}).then(res=>{
                if(res.code==200000){
                    this.detailData = res.data
                }else{
                    this.$message.error("请求失败！")
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }, 
        getBlacklist(id){
            getBlacklist({id}).then(res=>{
                if(res.code==200000){
                    this.detailData = res.data
                }else{
                    this.$message.error("请求失败！")
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }, 
        getSortStrategy(id){
            getSortStrategy({id}).then(res=>{
                if(res.code==200000){
                    this.detailData = res.data
                }else{
                    this.$message.error("请求失败！")
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }, 
        getMustRecommend(id){
            getMustRecommend({id}).then(res=>{
                if(res.code==200000){
                    this.detailData = res.data
                }else{
                    this.$message.error("请求失败！")
                }
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }
    },
    mounted(){
        this.getList()
    }
}
</script>
<style scoped lang="scss">
    .rem_set_custom{
    .top{
        margin-bottom: 18px;
    }
    .operate{
      display: flex;
      justify-content: space-between;
      align-items:center;
      flex-wrap: wrap;
        .p0{
            padding: 0 10px;
        }
    }
        .opt_btn{
            text-align: center;
        }
    }
</style>