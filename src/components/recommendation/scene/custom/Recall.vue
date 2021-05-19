<template>
        <a-modal centered destroyOnClose v-model="addModal" title="基于物品的协同过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" labelAlign="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item label="策略名称" prop="name">
            <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="时间跨度（天）" prop="date">
            <a-input placeholder="请输入时间跨度（天）" v-model="dataForm.date"/>
        </a-form-model-item>
        <a-form-model-item label="推荐商品数" prop="num">
            <a-input-number placeholder="请输入推荐商品数" style="width:100%" v-model="dataForm.num" :min="0" :max="100"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
</template>
<script>
export default {
    name:"Recall"
}
</script>
<style scoped>

</style>