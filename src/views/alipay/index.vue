<template>
    <div class="payContainer">
			<div class="header">
                <div class="pic"><img src="../../assets/images/alipic.png" alt=""></div> 支付宝支付
            </div>
			<div class="panel">
                <div class="title">支付金额 <span class="red">¥{{orderObj.orderAmount}}</span> ，请使用支付宝扫描下方二维码码完成支付</div>
                <div class="panel_box">
                    <div class="panel_left">
                       <div id="qrCode" ref="qrCodeDiv"></div>
                    </div>
                    <div class="panel_rt">
                        <div class="list">
                            <span class="list_title">商家名称：</span>
                            <span class="list_desc">{{orderObj.merchantName}}</span>
                        </div>
                        <div class="list">
                            <span class="list_title">商品名称：</span>
                            <span class="list_desc">{{orderObj.serviceName}}</span>
                        </div>
                        <div class="list">
                            <span class="list_title">交易单号：</span>
                            <span class="list_desc">{{orderObj.orderSn[0]}}</span>
                        </div>
                        <div class="list">
                            <span class="list_title">创建时间：</span>
                            <span class="list_desc">{{orderObj.creatTime}}</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">Sophia云平台</div>
            </div>

	</div>
</template>

<script>
import QRCode from 'qrcodejs2';
import {
  payAli
} from "../../api/bugBag/index";
export default {
    data() {
        return {
            orderObj:{
                merchantName:'',
                serviceName:'',
                orderSn:[],
                creatTime:''
            }
        }
    },
    mounted() {
        this.initInfo();
    },
    methods: {
        bindQRCode(str){
            new QRCode(this.$refs.qrCodeDiv, {
            text: str,
            width: 220,
            height: 220,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
        },
        initInfo(){
            let _param=this.$route.query.orderParm;
            payAli(_param)
                .then(res => {
                if (res.code == 200000) {
                    this.orderObj=res.data;
                     this.$nextTick(function () {
                            this.bindQRCode(res.data.qrcode);
                        })
                } else {
                    this.$message.error(res.message || "请求失败！");
                }
            })
            .catch(err => {
            this.$message.error("请求失败！");
            });
        },
        closeDialog1(){
        },
    }
}
</script>
<style lang="scss" scoped>
    .payContainer{
        background: rgb(227,232,246);
        height: 100%;
        .header{
            height: 70px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            .pic{
                width: 36px;
                margin-right: 20px;
            }
        }
        .panel{
            width: 1000px;
            height: 400px;
            margin: 40px auto;
            background: #fff;
            padding-left:130px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .title{
                padding-left: 20px;
                height: 70px;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                 line-height: 70px;
                color: #000000;
                border-bottom: 1px solid #EBEEF5;
                .red{
                    color: #FF4D4F;
                }
            }
            .panel_box{
                display: flex;
                align-items: center;
                .panel_left{
                    margin-right: 50px;
                    width: 220px;
                    #qrCode{
                        height: 220px;
                        width: 220px;
                        // display: inline-block;
                        // img {
                        //     width: 132px;
                        //     height: 132px;
                        //     background-color: #fff; //设置白色背景色
                        //     padding: 6px; // 利用padding的特性，挤出白边
                        //     box-sizing: border-box;
                        // }
                    }
                }
                .panel_rt{
                    .list{
                        margin-bottom: 12px;
                        .list_title{
                            font-size: 16px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #909399;
                        }
                        .list_desc{
                            font-size: 16px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #000000;
                        }
                    }
                }
            }
            .bottom{
                height: 50px;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #909399;
                border-top: 1px solid #EBEEF5;
                text-align: center;
                line-height: 50px;
            }
        }
    } 
   		
			
			
</style>