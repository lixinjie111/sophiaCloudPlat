<template>
    <div class="rem_custom">
        <a-steps :current="current" size="small">
            <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
        </a-steps>
        <div class="steps_content">
            请至少添加一个召回策略，您最多能创建5个召回策略，系统将按您创建的顺序执行召回策略
            <p>召回策略</p>
            <ul>
                <li>
                    <div>
                        <span>召回策略1:</span>
                        <span>基于物品的协同过滤01</span>
                    </div>
                    <span>删除</span>
                </li>
            </ul>
            <a-button type="dashed" class="add_btn" @click="add">
                <a-icon type="plus"/>
            </a-button>
        </div>
        <div class="steps_action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
            确定
        </a-button>
        <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="uploadSuc">
            完成
        </a-button>
        <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="uploadSuc">
            发布
        </a-button>
        <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="uploadSuc">
            测试
        </a-button>        
        <a-button @click="cancel">
            取消
        </a-button>      
        </div>        
    </div>
</template>
<script>
export default {
    name:"custom",
    data(){
        return {
            current: 0,
            steps: [
                {
                title: "召回策略",
                content: "First",
                },
                {
                title: "过滤规则",
                content: "Second",
                },
                {
                title: "添加黑名单",
                content: "Third",
                },
                {
                title: "排序策略",
                content: "Forth",
                },
                {
                title: "运营规则",
                content: "Last",
                }
            ],
        }
    },
    methods:{
        next(){
            this.current++
        },
        cancel(){},
        uploadSuc(){}
    }
}
</script>
<style scoped lang="scss">
    .rem_custom{
        padding: 24px;
        .steps_content{
            
        }
    }
</style>    