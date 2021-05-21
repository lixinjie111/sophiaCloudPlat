<template>
    <a-modal :footer="null" centered destroyOnClose v-model="addModal" title="基于物品的协同过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="detailData" :rules="rules" labelAlign="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item label="策略名称" prop="name">
            {{detailData.name}}
        </a-form-model-item>
        <a-form-model-item label="时间跨度（天）" prop="daySpan">
           {{detailData.daySpan}}
        </a-form-model-item>
        <a-form-model-item label="推荐商品数" prop="goodsNum">
            {{detailData.goodsNum}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
</template>
<script>
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
        }
    },
    methods:{
        handleCancel(){
            this.addModal = false
            this.$emit('initType')
        },
        handleOk(){
            this.addModal = false
            this.$emit('initType')
        },

    },

}
</script>
<style scoped lang="scss">

</style>