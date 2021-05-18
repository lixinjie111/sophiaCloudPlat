<template>
        <a-modal centered class="add_modal" destroyOnClose v-model="addModal" title="行为过滤" @cancel="handleCancel" @ok="handleOk">
        <a-form-model :model="dataForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" labelAlign="left">
          <a-form-model-item label="策略名称" prop="name">
              <a-input placeholder="请输入策略名称" v-model="dataForm.name"/>
          </a-form-model-item>
        </a-form-model>
          <a-row class="filter_behavior">
            <a-col :span="4" style="padding-left:10px">过滤行为:</a-col>  
            <a-col :span="20" class="flex_box">
              <div class="behavior_item" v-for="(item,index) in behaviorList" :key="index">
                <div>
                  <div style="margin-bottom:6px">行为类型:
                    <a-select labelInValue v-model="item.type" style="width:100px">
                      <a-select-option v-for="ele in behaviorTypes" :key="ele.id">{{ele.name}}</a-select-option>
                    </a-select>
                  </div>
                  <div>最少次数: 
                    <a-input-number v-model="item.minTime" :min="0" @change="minChange(item)" />
                  </div>                 
                </div>
                <div style="padding-left:10px">
                  <div style="margin-bottom:6px">时间间隔(天):
                    <a-input-number v-model="item.daySpan" :min="0"/>
                  </div>
                  <div style="display:flex;justify-content:space-between">最大次数:
                    <a-input-number v-model="item.maxTime" :min="0" @change="maxChange(item)" />
                  </div>
                </div>
                <a-button class="modal_del" icon="close" size="small" @click="delBehavior(index)"></a-button> 
              </div>
            </a-col>
          </a-row> 
          <a-button class="modal_btn" @click="addBehavior">
            <a-icon type="plus" />
          </a-button>
          <a-row>
            <a-col :span="4" style="padding-left:10px">过滤逻辑</a-col>
            <a-col :span="20">
              <a-radio-group v-model="radioModel">
                <a-radio :value="'AND'">AND</a-radio>
                <a-radio :value="'OR'">OR</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
    </a-modal> 
</template>
<script>
export default {
    name:"Filter"
}
</script>
<style scoped>

</style>