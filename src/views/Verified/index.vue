<template>
    <div class="Verified_container">
        <div class="verified_til_container">实名认证</div>
        <div class="verified_con_container">
            <div class="info_container">
                <div class="info_icon">
                    <img :src="info" alt="" srcset="" class="info">
                </div>
                <div class="info_txt">
                    <div class="info_txt_til">您还未进行任何实名认证</div>
                    <div class="info_txt_con">为了您的账号安全，我们建议您进行实名认证。</div>
                </div>
            </div>
            <div class="verifi_type_container">
                <div class="geren">
                    <div class="geren_icon_container">
                        <img :src="humanPng" alt="" srcset="" class="humanPng">
                    </div>
                    <div class="geren_til_txt">个人认证</div>
                    <div class="geren_til_info">适用于个人用户</div>
                    <div class="wendang_container">相关文档：<span style="color:#0376FD;">个人如何完成实名认证 ></span></div>
                </div>
                <div class="qiye">
                    <div class="geren_icon_container">
                        <img :src="humanPng" alt="" srcset="" class="humanPng">
                    </div>
                    <div class="geren_til_txt">企业认证</div>
                    <div class="geren_til_info">含企业、政府、事业单位、团体、组织</div>
                    <div class="wendang_container">相关文档：<span style="color:#0376FD;">企业如何完成实名认证 ></span></div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

export default {
    data() {
        return {
            info:require("../../assets/images/verify/info.png"),
            humanPng:require("../../assets/images/verify/human.png")
        }
    },
    created() {

    },
    methods:{}
}
</script>
<style lang="scss" scoped>
.Verified_container{
    width: 100%;
    .verified_til_container{
        width: 100%;
        padding: 15px 27px;
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
        border-bottom: 2px solid #CFCDCD;
    }
    .verified_con_container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .info_container{
            width: 70%;
            height: 82px;
            padding: 16px 26px;
            box-sizing: border-box;
            margin-top: 18px;
            margin-bottom: 30px;
            background: #FFFBE6;
            border-radius: 2px;
            border: 1px solid #FFE58F;
            display: flex;
            .info_icon{
                width: 24px;
                height: 24px;
                margin-right: 16px;
                .info{
                    display: block;
                    width: 100%;
                }
            }
            .info_txt{
                flex-grow: 1;
                .info_txt_til{
                    width: 100%;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.85);
                    margin-bottom: 4px;
                }
                .info_txt_con{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.65);
                }
            }
        }
        .verifi_type_container{
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .geren,.qiye{
                width: 49%;
                height: 360px;
                background: #F7F9FA;
                border-radius: 2px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .geren_icon_container{
                    width: 200px;
                    height: 185px;
                    margin-bottom: 29px;
                    .humanPng{
                        display: block;
                        width:100%;
                    }
                }
                .geren_til_txt{
                    font-size: 24px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #0376FD;
                    margin-bottom: 15px;
                }
                .geren_til_info{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.45);
                    margin-bottom: 15px;
                }
                .wendang_container{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.45);
                }
            }
        }
    }
}
</style>