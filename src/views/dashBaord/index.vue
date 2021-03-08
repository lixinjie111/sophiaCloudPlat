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
                    <div class="box1">
                          <div class="titleNav">
                            <div class="title">消费分布</div>
                            <div class="titleRt">
                                <a-range-picker @change="onChange" />
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box59" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
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
                        <a-range-picker @change="onChange" size="large" style="width:250px"/>
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
                    <div class="box yingyong">
                        <div class="top">应用数</div>
                        <div class="mid"><span>12</span> 个</div>
                        <div class="bm"></div>
                    </div>
                </a-col>
                <a-col  flex="auto">
                     <a-row :gutter="[20,20]">
                        <a-col :span="12">
                            <div class="box api">
                                <div class="yingyong">
                                    <div class="top">API调用</div>
                                    <div class="mid midLeft"><span>9,852.00</span> 千次</div>
                                    <div class="bm">周环比<a-icon type="caret-up" :style="{ fontSize: '16px', color: '#FF4D4F' }" /><span :style="{ color: '#FF4D4F' }">6.47%</span>，月环比<a-icon type="caret-down"  :style="{ fontSize: '16px', color: '#52C41A' }"/><span :style="{ color: '#52C41A' }">6.47%</span></div>
                                </div>
                                <div class="boxEts">
                                   <cLine id="box57" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="box api">
                                <div class="yingyong">
                                    <div class="top">SDK调用</div>
                                    <div class="mid midLeft"><span>3,852.00</span> 千次</div>
                                    <div class="bm">周环比<a-icon type="caret-up" :style="{ fontSize: '16px', color: '#FF4D4F' }" /><span :style="{ color: '#FF4D4F' }">6.47%</span>，月环比<a-icon type="caret-down"  :style="{ fontSize: '16px', color: '#52C41A' }"/><span :style="{ color: '#52C41A' }">6.47%</span></div>
                                </div>
                                <div class="boxEts">
                                   <cLine id="box56" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="[20,20]">
                <a-col :span="6">
                    <div class="box1">
                        <div class="top">自然语言处理</div>
                        <div class="lv">使用率</div>
                        <div class="per">50.98%</div>
                        <div class="bm">
                            总量 <span :style="{ color: '#52C41A' }">100，000</span>
                            <span class="half">剩余</span> <span :style="{ color: '#FF4D4F' }">100，000</span>
                        </div>
                        <div class="boxEts">
                            <cLine id="box55" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="box1">
                        <div class="top">自然语言处理</div>
                        <div class="lv">使用率</div>
                        <div class="per">50.98%</div>
                        <div class="bm">
                            总量 <span :style="{ color: '#52C41A' }">100，000</span>
                            <span class="half">剩余</span> <span :style="{ color: '#FF4D4F' }">100，000</span>
                        </div>
                        <div class="boxEts">
                            <cLine id="box54" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="box1">
                        <div class="top">自然语言处理</div>
                        <div class="lv">使用率</div>
                        <div class="per">50.98%</div>
                        <div class="bm">
                            总量 <span :style="{ color: '#52C41A' }">100，000</span>
                            <span class="half">剩余</span> <span :style="{ color: '#FF4D4F' }">100，000</span>
                        </div>
                        <div class="boxEts">
                            <cLine id="box53" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="box1">
                        <div class="top">自然语言处理</div>
                        <div class="lv">使用率</div>
                        <div class="per">50.98%</div>
                        <div class="bm">
                            总量 <span :style="{ color: '#52C41A' }">100，000</span>
                            <span class="half">剩余</span> <span :style="{ color: '#FF4D4F' }">100，000</span>
                        </div>
                        <div class="boxEts">
                            <cLine id="box52" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="barTitle">
            能力调用趋势
        </div>
        <div class="boxContent neng">
            <a-row :gutter="[20,20]">
                <a-col :span="12">
                    <div class="box2">
                        <div class="top">人脸识别</div>
                        <div class="sel">
                            <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                             <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio1" @change="onChange" size="small">
                                    <el-radio-button label="调用量">
                                    </el-radio-button>
                                    <el-radio-button label="QPS">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio2" @change="onChange" size="small">
                                    <el-radio-button label="7天">
                                    </el-radio-button>
                                    <el-radio-button label="30天">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box51" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="box2">
                        <div class="top">人脸识别</div>
                        <div class="sel">
                            <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                             <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio1" @change="onChange" size="small">
                                    <el-radio-button label="调用量">
                                    </el-radio-button>
                                    <el-radio-button label="QPS">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio2" @change="onChange" size="small">
                                    <el-radio-button label="7天">
                                    </el-radio-button>
                                    <el-radio-button label="30天">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box43" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="box2">
                        <div class="top">人脸识别</div>
                        <div class="sel">
                            <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                             <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio1" @change="onChange" size="small">
                                    <el-radio-button label="调用量">
                                    </el-radio-button>
                                    <el-radio-button label="QPS">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio2" @change="onChange" size="small">
                                    <el-radio-button label="7天">
                                    </el-radio-button>
                                    <el-radio-button label="30天">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box42" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="box2">
                        <div class="top">人脸识别</div>
                        <div class="sel">
                            <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                             <div class="selectItem">
                                <el-select v-model="formInline.region" placeholder=""  style="width:80px" size="small">
                                    <el-option label="全部" value="0"></el-option>
                                </el-select>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio1" @change="onChange" size="small">
                                    <el-radio-button label="调用量">
                                    </el-radio-button>
                                    <el-radio-button label="QPS">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="radio2" @change="onChange" size="small">
                                    <el-radio-button label="7天">
                                    </el-radio-button>
                                    <el-radio-button label="30天">
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box41" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                        </div>
                    </div>
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
            value2: '',
            radio1: '',
            radio2: '',

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
                padding:20px;
                &.yingyong{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .top{
                        font-size: 14px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                    }
                    .mid{
                        text-align: center;
                        span{
                            font-size: 20px;
                            font-family: HelveticaNeue;
                            color: #000;
                        }
                    }
                }
                &.api{
                    display: flex;
                    .boxEts{
                        flex: 1;
                    }
                    .yingyong{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .top{
                            font-size: 14px;
                            font-family: HelveticaNeue;
                            color: #121C33;
                        }
                        .mid{
                            span{
                                font-size: 20px;
                                font-family: HelveticaNeue;
                                color: #000;
                            }
                        }
                        .bm{
                            font-size: 12px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #54565B;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
                
            }
            .box1{
                padding:20px;
                background: #fff;
                // height: 290px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                .top{
                    font-size: 14px;
                    font-family: HelveticaNeue;
                    color: #121C33;
                    font-weight: bold;
                }
                .lv{
                    margin-top: 20px;
                    font-size: 12px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #54565B;
                }
                .per{
                    font-size: 30px;
                    font-family: HelveticaNeue;
                    color: rgba(0, 0, 0, 0.85);
                    line-height: 38px; 
                }
                .bm{
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #54565B;
                    line-height: 20px; 
                    .half{
                        margin-left: 10px;
                    }
                }
                .boxEts{
                    margin-top: 8px;
                    height: 112px;
                }
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
                   .title{
                        font-size: 18px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                   }
                   .titleRt{
                       width: 250px;
                   }
                }
                .boxEts{
                    flex:1;
                }
            }
            .box2{
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                padding:20px;
                .top{
                    font-size: 18px;
                    font-family: HelveticaNeue;
                    color: #121C33;
                }
                .sel{
                    margin-top: 10px;
                    display: flex;
                    .selectItem{
                        margin-right: 5px;
                    }
                }
                .boxEts{
                    margin-top: 10px;
                   height: 150px; 
                }
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