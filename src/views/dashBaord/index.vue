<template>
    <div class="dash">
        <div class="tip">
            <div class="tipTitle">
                Hi，欢迎使用应用 Sophia 智能服务平台
            </div>
            <div class="tipDesc">
                轻松创建、部署和管理你的应用，提升研发效率，降低业务成本。
            </div>
        </div>
        <div class="boxContent">
            <a-row :gutter="[20,20]">
                <a-col :span="12">
                    <div class="box cash">
                        <div class="title">现金余额</div>
                        <div class="jine">￥ 0</div>
                        <div class="kaipiao">可开票金额 <span> ￥ 0</span> </div>
                        <el-button size="mini" round type="primary" class="charge">充值</el-button>
                    </div>
                </a-col>
                <a-col :span="12">
                     <a-row :gutter="[20,20]">
                        <a-col :span="12">
                            <div class="box xufei">
                                <div class="xufeiBox"><span>8</span> &nbsp; 个待续费</div>  <span class="look">查看</span>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="box xufei">
                                <div class="xufeiBox"><span>8</span> &nbsp;  个待支付订单</div>  <span class="look">查看</span>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="[20,0]">
                <a-col :span="12">
                    <div class="box1">
                        <div class="titleNav">
                            <div class="title">消费趋势</div>
                            <div class="titleRt">
                                <a-radio-group v-model="time" @change="onChange">
                                    <a-radio-button value="a">
                                    月
                                    </a-radio-button>
                                    <a-radio-button value="b">
                                    半年
                                    </a-radio-button>
                                    <a-radio-button value="c">
                                    年
                                    </a-radio-button>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box58" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="box1"></div>
                </a-col>
            </a-row>
        </div>
        <div class="searchBox">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item >
                    <el-select v-model="formInline.region" placeholder=""  style="width:150px">
                        <el-option label="全部" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                       <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-select v-model="formInline.region" placeholder="" style="width:150px">
                        <el-option label="近7天" value="0"></el-option>
                        <el-option label="近30天" value="1"></el-option>
                        <el-option label="本月" value="2"></el-option>
                        <el-option label="上月" value="3"></el-option>
                        <el-option label="自定义" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="resBox">
            <a-row :gutter="[20,20]" type="flex">
                <a-col flex="200px">
                    <div class="box"></div>
                </a-col>
                <a-col  flex="auto">
                     <a-row :gutter="[20,20]">
                        <a-col :span="12">
                            <div class="box"></div>
                        </a-col>
                        <a-col :span="12">
                            <div class="box"></div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="[20,20]">
                <a-col :span="6">
                    <div class="box1"></div>
                </a-col>
                <a-col :span="6">
                    <div class="box1"></div>
                </a-col>
                <a-col :span="6">
                    <div class="box1"></div>
                </a-col>
                <a-col :span="6">
                    <div class="box1"></div>
                </a-col>
            </a-row>
        </div>
        <div class="barTitle">
            能力调用趋势
        </div>
        <div class="boxContent neng">
            <a-row :gutter="[20,20]">
                <a-col :span="12">
                    <div class="box2"></div>
                </a-col>
                <a-col :span="12">
                    <div class="box2"></div>
                </a-col>
                <a-col :span="12">
                    <div class="box2"></div>
                </a-col>
                <a-col :span="12">
                    <div class="box2"></div>
                </a-col>
            </a-row>
        </div>
	</div>
</template>

<script>
import cLine from '@/components/echarts/common/line';
export default {
    components:{cLine},
    data() {
        return {
            formInline: {
                region: '0'
            },
            time:"b",
            value1: '',

        }
    },
    created() {
    },
    methods: {
        onChange(){},
        onSubmit() {
            console.log('submit!');
        },
        reset() {
            console.log('submit!');
        }
    }
}
</script>
<style lang="scss" scoped>
	.dash{
         background: #f0f2f5; 
         height: 100%;
        .tip{
            padding:24px;
            background: #60ACFF;
            border-radius: 4px; 
           .tipTitle{
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 32px;
                margin-bottom: 8px;
           }
           .tipDesc{
                font-size: 14px;
                font-family: Helvetica;
                color: #FFFFFF;
                line-height: 22px;
           }
        }
        .barTitle{
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #54565B;
            line-height: 22px;
        }
        .resBox{
            .box{
                 background: #fff;
                height: 155px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
            }
            .box1{
                background: #fff;
                height: 290px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
            }
        }
        .boxContent{
            background: #fff;
            padding:20px;
            margin: 20px 0;
            &.neng{
                margin-top: 10px;
            }
            .box{
                height: 120px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                &.cash{
                    padding: 10px 30px;
                    position: relative;
                    .charge{
                        position: absolute;
                        right: 30px;
                        top:10px;
                    }
                    .title{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #606266;
                        line-height: 17px;
                    }
                    .jine{
                        margin-top: 8px;
                        font-size: 20px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                        line-height: 38px;
                    }
                    .kaipiao{
                        margin-top: 20px;
                         font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #606266;
                        line-height: 17px;
                        span{
                            color: #121C33;
                        }
                    }
                }
                &.xufei{
                    padding: 10px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #606266;
                    line-height: 17px;
                    .look{
                           cursor: pointer; 
                        }
                    .xufeiBox{
                         display: flex;
                          align-items: center;
                        span{
                            font-size: 24px;
                            color:#121C33;
                        }
                        
                    }
                }
            }
            .box1{
                height: 291px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                padding:20px;
                display: flex;
                flex-direction: column;
                .titleNav{
                    display: flex;
                   justify-content: space-between;
                   align-items: center;
                }
                .boxEts{
                    flex:1;
                }
            }
            .box2{
                height: 291px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
            }
        }
        .searchBox{
            background: #fff;
            margin: 20px 0;
             padding-top:22px;
             padding-left:22px;
             padding-right:22px;
            .demo-form-inline{
                .el-form-item:last-child{
                    float: right;
                }
            }
        }
    }		
</style>