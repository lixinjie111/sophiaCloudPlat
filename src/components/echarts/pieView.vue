<template>
  <div class="box-content">
    <!-- 教育背景结构 -->
    <div class="box box1">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box box2">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box2Data"></PieEcharts>
    </div>
    <div class="box box3">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box3Data" roseType="radius"></PieEcharts>
    </div>
    <div class="box box4">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box4Data"></PieEcharts>
    </div>
    <div class="box box5">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box5Data"></PieEcharts>
    </div>
    <div class="box box6">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box6Data"></PieEcharts>
    </div>
    <div class="box box7">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box7Data"></PieEcharts>
    </div>
    <div class="box box8">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box8Data"></PieEcharts>
    </div>
    <div class="box box9">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box9Data"></PieEcharts>
    </div>
    <div class="box box10">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box10Data"></PieEcharts>
    </div>
    <div class="box box11">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box11Data"></PieEcharts>
    </div>
    <div class="box box12">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box12Data"></PieEcharts>
    </div>
    <!-- <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box1Data"></PieEcharts>
    </div> -->
    <div class="box box13">
      <RotateChart :colorList="$fjData.colorList" :myData="$fjData.box13Data"></RotateChart>
    </div>
    <div class="box box14">
      <LeidaEcharts :colorList="$fjData.colorList" :myData="$fjData.box14Data" titleText="92"></LeidaEcharts>
    </div>
    <div class="box box15">
      <MatchEcharts :colorList="$fjData.colorList" :myData="$fjData.box15Data" ></MatchEcharts>
    </div>
    <div class="box box16">
      <Yibiao1Echarts :colorList="$fjData.colorList" :myData="$fjData.box16Data" ></Yibiao1Echarts>
    </div>
    <div class="box box17">
      <YibiaoCharts2 :colorList="$fjData.colorList" :myData="$fjData.box17Data" ></YibiaoCharts2>
    </div>
    <div class="box box18">
      <Yuanhuan1 :colorList="$fjData.colorList" :myData="$fjData.box18Data" ></Yuanhuan1>
    </div>
    <div class="box box19">
      <Leida2Echarts :colorList="$fjData.colorList" :myData="$fjData.box19Data" ></Leida2Echarts>
    </div>
     <div class="box box20">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box20Data" ></PieEcharts>
    </div>
    <div class="box box31">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box31Data" ></PieEcharts>
    </div>
    <div class="box box32">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box32Data" ></PieEcharts>
    </div>2
    <div class="box box33">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box33Data" ></PieEcharts>
    </div>
    <div class="box box34">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box34Data" ></PieEcharts>
    </div>
    <div class="box box35">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box35Data" ></PieEcharts>
    </div>
    <div class="box box36">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box36Data" ></PieEcharts>
    </div>
    <div class="box box37">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box37Data" ></PieEcharts>
    </div>
    <div class="box box38">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box38Data" ></PieEcharts>
    </div>
    <div class="box box39">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box39Data" ></PieEcharts>
    </div>
    <div class="box box40">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box40Data" ></PieEcharts>
    </div>
    <div class="box box41">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box41Data" ></PieEcharts>
    </div>
    <div class="box box42">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box42Data" ></PieEcharts>
    </div>
    <div class="box">
      <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box21Data" roseType="radius"></PieEcharts>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts';
  import PieEcharts from './common/PieEcharts';
  import RotateChart from './common/RotateChart';
  import LeidaEcharts from './common/LeidaEcharts';
  import MatchEcharts from './common/MatchEcharts';
  import Yibiao1Echarts from './common/Yibiao1Echarts';
  import YibiaoCharts2 from './common/YibiaoCharts2';
  import Yuanhuan1 from './common/Yuanhuan1';
  import Leida2Echarts from './common/Leida2Echarts';

  export default {
    components: {
      PieEcharts, RotateChart, LeidaEcharts, MatchEcharts, Yibiao1Echarts, YibiaoCharts2, Yuanhuan1, Leida2Echarts,
    },
    // data() {
    //   return {
    //     colorList: ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#BF6E9B', '#CECE7E', '#91C2F2', '#B7C8EA', '#FF9F7F',],
        // box1Data: {
        //   name: ['26-30岁', '31-35岁', '41-45岁', '21-25岁', '18-20岁', '36-40岁'],
        //   value: [528, 464, 958, 423, 123, 400],
        // },
        // colorList1: ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#BF6E9B', '#CECE7E', '#91C2F2', '#B7C8EA', '#FF9F7F',],
        // box2Data: {
        //   name: ["11001-13000元","10001-11001元","13001-15000元", "7001-10000元", "5000元以下", "5000-7000元","15001-17000元","17001-20000元","20001-30000元","30001-50000元","50000元以上",],
        //   value: [30, 44, 52,21,48, 35,34,55,63,71,81],
        // },
        // box3Data: {
        //   name: ['中层管理者', '公司白领', '自由职业者', '全职太太', '高层管理', '其他'],
        //   value: [23, 29, 40, 31, 23, 18],
        // },
        // box4Data: {
        //   name: ['无', '有'],
        //   value: [75, 25],
        // },
        // box5Data: {
        //   name: ['女', '男'],
        //   value: [75, 25],
        // },
        // box6Data: {
        //   name: ['喜好', '厌恶','一般', '创伤'],
        //   value: [25, 25,25,25],
        // },
        // box7Data: {
        //   name: ['小红书', '抖音', '微博', '快手', 'bilibili'],
        //   value: [33, 118, 89, 59, 41],
        // },
        // box8Data: {
        //   name: ['放松休闲', '工作加班', '其他活动', '通勤', '休息'],
        //   value: [38, 19, 17, 16, 10],
        // },
        // box9Data: {
        //   name: ['大众点评', '抖音', '微博', '公众号', '新浪微博', '微信社区'],
        //   value: [38, 5, 42, 2, 9,5],
        // },
        // box10Data: {
        //   name: ['碳酸类', '果汁类', '乳酸类', '功能饮料', '饮用水', '茶类', '咖啡类'],
        //   value: [19, 13, 9, 11, 23,16,9],
        // },
        //  box11Data: {
        //   name: ['四口之家', '五口之家', '单身与父母一起住', '俩口之家', '三口之家'],
        //   value: [17, 10, 18, 30, 35],
        // },
        //  box12Data: {
        //   name: ['<25岁', '35-45岁', '>56岁', '26-34岁', '46-55岁'],
        //   value: [57, 20, 10, 8, 5],
        // },
        //  box13Data: {
        //   name: ['已覆盖目标受众', '未覆盖目标受众'],
        //   value: [72, 50],
        // },
        //  box14Data: {
        //   name: ['覆盖度', '匹配度', '契合度', '关联度', '入驻成本', '稀缺度'],
        //   value: [[80, 50, 55, 80, 50, 80, 48, 43], [60, 60, 65, 60, 70, 40, 80, 63]],
        // },
        //  box15Data: {
        //   name: ['职业匹配度', '婚恋状态匹配度', '年龄匹配度', '收入匹配度', '教育程度匹配度'],
        //   value: [94.3, 74.5, 98.2, 88.7, 86.9],
        // },
        // box16Data: {
        //   name: [],
        //   value: [3, 10],
        // },
        // box17Data: {
        //   name: ['应对速度', '应对态度', '应对技巧', '应对信息质量', '动态发布', '防止再炒作', '公信力修复', '专业认可度', '集体认可度', '网友认可度'],
        //   value: 0.12,
        // },
        // box18Data: {
        //   name: [['新式茶', '混合茶', '传统萃取'],  ['新式茶', '混合茶', '传统萃取']],
        //   value: [[50, 10, 10], [50, 10, 10], [[6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806], [6.9, 178336, 36496, 6806]]],
        // },
        // box19Data: {
        //   name: ['应对速度', '应对态度', '应对技巧', '应对信息质量', '动态发布', '防止再炒作', '公信力修复', '专业认可度', '集体认可度', '网友认可度'],
        //   value: [5, 4, 5, 7, 5, 8, 4, 7, 7, 8],
        // },
    //   }
    // },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
  .box-content {
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 30%;
      height: 300px;
      margin: 3px;
      border: 1px solid #f00;
    }
    .big.box {
      width: 800px;
      height: 800px;
      margin: 3px;
      border: 1px solid #f00;
    }
  }

</style>
