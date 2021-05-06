<template>
    <div class="rem_custom">
        <a-steps :current="current" size="small">
            <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
        </a-steps>
        <div class="steps_content">
            请至少添加一个召回策略，您最多能创建5个召回策略，系统将按您创建的顺序执行召回策略
            <div class="method_list">
                <p>召回策略</p>
                <div class="line"></div>
                <ul>
                    <li>
                        <div>
                            <span>召回策略1:</span>
                            <span class="item_name">基于物品的协同过滤01</span>
                        </div>
                        <span class="item_del">删除</span>
                    </li>
                </ul>
                <a-button class="add_btn" @click="add" :width="100">
                    <a-icon type="plus"/>
                </a-button>
            </div>
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
        add(){
            
        },
        next(){
            this.current++
        },
        cancel(){

        },
        uploadSuc(){}
    }
}
</script>
<style scoped lang="scss">
    .rem_custom{
        padding: 24px;
        .steps_content{
            margin-top: 24px;
            .method_list{
                padding: 0 24px;
                >p{
                    margin: 12px 0;
                    font-weight: 600;
                }
                .line{
                    width: 100%;
                    height: 0;
                    border-top: 1px dashed #666;    
                }
                ul{
                    >li{
                        display: flex;
                        margin: 16px 0;
                        .item_name{
                            font-weight: 600;
                        }
                        .item_del{
                            margin-left: 40px;
                            color: #2373FF;
                            cursor: pointer;
                        }
                    }
                }
                .add_btn{
                    width: 50%;
                }
            }

        }
    }
</style>    