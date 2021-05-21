<template>
    <a-modal centered destroyOnClose v-model="addModal" title="基于物品的协同过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" labelAlign="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item label="策略名称" prop="name">
            {{dataForm.name}}
        </a-form-model-item>
        <a-form-model-item label="时间跨度（天）" prop="daySpan">
            <a-input placeholder="请输入时间跨度（天）" v-model="dataForm.daySpan"/>
        </a-form-model-item>
        <a-form-model-item label="推荐商品数" prop="goodsNum">
            <a-input-number placeholder="请输入推荐商品数" style="width:100%" v-model="dataForm.goodsNum" :min="0" :max="100"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
</template>
<script>
import {saveRecallStrategy} from "@/api/recommendation/index"
export default {
    name:"Recall",
    props:{
        detailData:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return{
            addModal:true,
            dataForm:{
                name:this.detailData.name||"",
                daySpan:this.detailData.daySpan||"",
                goodsNum:this.detailData.goodsNum||""
            },
            rules:{
                name:[{required:true,message:"请输入策略名称",trigger:"blur"}],
            }
        }
    },
    methods:{
        handleCancel(){
            this.addModal = false
            this.$emit('refresh')
        },
        handleOk(){
            this.addModal = false
            this.$emit('refresh')
            this.save()
        },
      save(){
        let params = {
          applicationId:this.$route.query.appId,
          sceneId:this.$route.query.sceneId,
          strategyType:0,
          name:this.dataForm.name,
          id:this.detailData.id, //召回策略主键ID，用于修改
          daySpan:this.dataForm.daySpan,
          goodsNum:this.dataForm.goodsNum
        }
        console.log(params)
        saveRecallStrategy(params).then(res=>{
          if(res.data){
              
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
    },

}
</script>
<style scoped lang="scss">

</style>