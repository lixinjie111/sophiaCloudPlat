<template>
    <div class="rem_set_custom">
        <div class="top">
            共{{total}}个推荐策略
            <a-button v-if="curOpt=='edit'" style="margin-left:20px" type="primary" @click="toRule">添加推荐策略</a-button>
        </div>
        <a-table :columns="columns" :data-source="list" :pagination="pagination" :rowKey="record=>record.id">
            <template slot="operation" slot-scope="text,record,index">
                <div class="operate" v-if="curOpt=='edit'">
                    <a-switch v-model="record.status" checked-children="启用" un-checked-children="停用" :default-checked="record.status" @click="onClick" @change="onChange(record.id)"/>
                    <!-- <a-button class="p0" type="link" @click="toStart">启用</a-button> -->
                    <!-- <a-button class="p0" type="link" @click="toEnd">停用</a-button> -->
                    <a-button class="p0" type="link" @click="edit">修改</a-button>
                    <!-- <a-button class="p0" type="link" @click="del">删除</a-button> -->
                    <a-popconfirm
                        title="是否删除该应用?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="del(record.id)">
                        <a-button class="p0" type="link">删除</a-button>
                    </a-popconfirm>
                </div>
                <div v-else>
                    <a-button type="link" @click="showDetail">查看</a-button>
                </div>
            </template>
        </a-table>
        <div class="opt_btn" v-if="curOpt=='edit'">
            <a-button type="primary" @click="complete">完成</a-button>
            <a-button @click="cancel">取消</a-button>
        </div>
    </div>
</template>
<script>
import {getStrategies, startStrategy, endStrategy, deleteStrategy} from "@/api/recommendation/index"
export default {
    name:"SetCustom",
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
            curId:""
        }
    },
    methods:{
        toRule(){

        },
        toStart(){},
        toEnd(){},
        onChange(id){
            this.curId = id
        },
        onClick(checked){
            console.log(`click ${checked}`)
            if(checked){
                startStrategy({id:this.curId}).then(res=>{}).catch(err=>{this.$message.error(err.message)})
            }else{
                endStrategy({id:this.curId}).then(res=>{}).catch(err=>{this.$message.error(err.message)})
            }
        },
        edit(){},
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
        showDetail(){},
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