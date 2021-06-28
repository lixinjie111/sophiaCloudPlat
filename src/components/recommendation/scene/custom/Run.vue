<template>
    <a-modal :footer="null" centered destroyOnClose v-model="addModal" title="设置必推" @cancel="handleCancel" @ok="handleOk">
        <a-row>
            <a-col :span="4">策略名称:</a-col>
            <a-col :span="20">{{detailData.name}}</a-col>
        </a-row>
        <a-row>
            <a-col :span="4">必推行为:</a-col>
            <a-col :span="20">
                
            </a-col>
        </a-row>
    </a-modal>
</template>
<script>
export default {
    name:"Run",
    props:{
        detailData:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {
            addModal:true
        }
    },
    methods:{
        handleCancel(){
            this.addModal = false
        },
        handleOk(){
            this.addModal = false
        }
    }
}
</script>
<style scoped>

</style>