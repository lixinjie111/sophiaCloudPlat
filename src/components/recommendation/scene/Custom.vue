<template>
    <div class="rem_custom">
        <a-steps :current="current" size="small">
            <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
        </a-steps>
        <div class="steps_content" v-if="current==0">
            <CustomRecall></CustomRecall>
        </div>
        <div class="steps_content" v-else-if="current==1">
            <CustomFilter></CustomFilter>
        </div>
        <div class="steps_content" v-else-if="current==2">
            <CustomBlack></CustomBlack>
        </div>
        <div class="steps_content" v-else-if="current==3">
            <CustomSort></CustomSort>
        </div>
        <div class="steps_content" v-else>
            <CustomRun></CustomRun>
        </div>
        <div class="steps_action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
            确定
        </a-button>
        <!-- <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="complete">
            完成
        </a-button>
        <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="publish">
            发布
        </a-button>
        <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="test">
            测试
        </a-button>         -->
        <a-button v-if="current < steps.length - 1" @click="cancel">
            取消
        </a-button>   
        <a-button
            v-if="current>0"
            @click="back">
            上一步
        </a-button>    
        </div>        
    </div>
</template>
<script>
import CustomRecall from "@/components/recommendation/scene/custom/CustomRecall"
import CustomFilter from "@/components/recommendation/scene/custom/CustomFilter"
import CustomBlack from "@/components/recommendation/scene/custom/CustomBlack"
import CustomSort from "@/components/recommendation/scene/custom/CustomSort"
import CustomRun from "@/components/recommendation/scene/custom/CustomRun"
export default {
    name:"Custom",
    components:{CustomRecall,CustomFilter,CustomBlack,CustomSort,CustomRun},
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
        cancel(){
            this.$router.push({
                path: '/recommendation/scene/list'
            });
        },
        // complete(){},
        // publish(){},
        // test(){},
        back(){
            this.current--
        }
    }
}
</script>
<style scoped lang="scss">
    .rem_custom{
        padding: 24px;
        .steps_content{
            margin-top: 24px;
        }
        .steps_action{
            margin-top: 20px;
            text-align: center;
        }
    }
</style>    
