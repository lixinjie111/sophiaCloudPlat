<template>
  <div class="invoice_con">
    <div class="first_area">
      <div class="til">收支明细</div>
      <div class="search_area">
        <div class="sear_label">流水号：</div>
        <div class="sear_input liushuinum">
          <el-input
            v-model="fpttVal"
            class="fptt_class"
            placeholder="流水号"
          ></el-input>
        </div>
        <div class="sear_label">交易时间：</div>
        <div class="choice_time">
          <div class="time_container">
            <el-date-picker
              v-model="rangeTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="changeDataRange"
              style="height: 100%"
            ></el-date-picker>
          </div>
          <div class="select_container close_week">
            <a-select
              v-model="selVal"
              style="width: 100%"
              @change="choiceRange"
            >
              <a-select-option value="cl7">最近7天</a-select-option>
              <a-select-option value="by">本月</a-select-option>
              <a-select-option value="sgy">上个月</a-select-option>
              <a-select-option value="sgjd">上个季度</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="sear_label">交易类型：</div>
        <div class="sear_input">
          <el-select v-model="jyType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="btn_container">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
          <i class="el-icon-upload2"></i>
          <i class="el-icon-refresh" :class="{'refreshing' : ifStart}" @click="refreshFn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "Inexpdetails",
  data() {
    return {
      rangeTime: [
        moment(new Date(new Date().getTime() - 3600 * 1000 * 24 * 365)).format(
          "YYYY-MM-DD"
        ),
        moment(new Date()).format("YYYY-MM-DD"),
      ],
      selVal: "cl7",
      fpttVal: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      jyType: "",
      ifStart:false
    };
  },
  created() {},
  computed: {},

  methods: {
      refreshFn(){
        this.ifStart = true;
        setTimeout(() => {
            //刷新结束，停止旋转
            this.ifStart = false;
        }, 3000);
      }
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
.invoice_con {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .first_area {
    width: 100%;
    height: 80px;
    background: #ffffff;
    border-radius: 2px;
    margin-bottom: 16px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .til {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .search_area {
      display: flex;
      align-items: center;
      .sear_label {
        width: 70px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        margin-right: 6px;
      }
      .choice_time {
        display: flex;
        align-items: center;
        .select_container {
          min-width: 120px;
          height: 32px;
          margin-right: 20px;
        }
        .close_week {
          margin-left: 20px;
        }
        .time_container {
          height: 32px;
          /deep/ .el-date-editor .el-range-separator {
            line-height: 26px;
          }
          /deep/ .el-date-editor .el-input__icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .sear_input {
        display: flex;
        align-items: center;
        .fptt_class {
          width: 174px;
          height: 32px;
          margin-right: 21px;
          /deep/ .el-input__inner {
            height: 100%;
          }
        }
        .el-button--primary {
          width: 64px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /deep/ .el-select {
          height: 32px !important;
          .el-input--suffix {
            height: 100% !important;
            .el-input__inner {
              height: 100% !important;
            }
            .el-input__suffix {
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .liushuinum {
        margin-right: 40px;
      }
      .btn_container {
        height: 32px;
        display: flex;
        align-items: center;
        margin-left: 33px;
        .el-button {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .el-icon-upload2,
        .el-icon-refresh {
          font-size: 20px;
          color: #1890ff;
        }
        .el-icon-upload2 {
          margin-left: 33px;
          margin-right: 16px;
        }
        @keyframes myrefresh {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .refreshing{
            animation: myrefresh 2s infinite;
            -webkit-animation:myrefresh 2s infinite;
        }
      }
    }
  }
}
</style>