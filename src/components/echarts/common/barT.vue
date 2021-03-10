<template>
	<div class="echarts-box" :id="id"></div>
</template>

<script>
export default {
	props: {
		myData:{
			default:()=>{
				return [];
			},
		},
		id:{
			type:String,
			default:()=>{
				return '';
			},
		},
		colorList:{
			type:Array,
			default:()=>{
				return  ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564','#BF6E9B','#CECE7E','#91C2F2','#B7C8EA','#FF9F7F','#91C2F2','#B380B6','#EDA8AD','#738AD4','#FF9F7F'];
			},
		},
	},
	data () {
		return {
			
		}
	},
    mounted() {
        	this.initEcharts();
    },
	methods: {
		initEcharts() {
			let _option = this.defaultOption();
			let myChart = this.$echarts.init(document.getElementById(this.id));
			myChart.setOption(_option);
			window.addEventListener('resize',()=>{
				myChart.resize();
			})
		},
		defaultOption() {
			var option = {
				grid: {
					left: '4%',
					right: '4%',
					bottom: '5%',
					top:'5%',
				//	padding:'0 0 10 0',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLine:{
						lineStyle:{
							color:'#E9EBF1',
						}
					} ,
					axisLabel: {
						show: true,
						textStyle: {
							color: "#97A0C3",   //这里用参数代替了
							fontSize:'12'
						}
					},
					scale:true,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 1,
					interval: 0.25,
					boundaryGap: [0, '30%'],
					axisLine:{
						lineStyle:{
							color:'#E9EBF1',
							//width:8,//这里是为了突出显示加上的
						}
					},
					splitLine: {
						lineStyle: {
							color:'#E9EBF1',
							//type: 'dashed',
						}
					},
					axisLabel: {
						formatter: function(value) {
							if(value==0){
								return '糟糕'
							}
							if(value==0.25){
								return '低落'
							}
							if(value==0.5){
								return '一般'
							}
							if(value==0.75){
								return '舒服'
							}
							if(value==1){
								return '愉悦'
							}
						},
						textStyle: {
							color: "#97A0C3",   //这里用参数代替了
							fontSize:'12'
						}
					}
					
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					},
					confine:true,
					formatter: function(list) {
						var msg = "";
						for (let i in list) {
							// if (i == 0) {
							 	// 	msg += list[i].name + "<br>";
							// }
							//msg += list[i].seriesName + "：" + list[i].data + "<br>";
							if (list[i].name == "6:30"||list[i].name == "7:00"||list[i].name == "7:30"||list[i].name == "8:00"||list[i].name == "8:30") {
								msg += "早高峰通勤" + "<br> 微信、企业微信、亿通行、微博、支付宝";
							}else if (list[i].name == "9:30"||list[i].name == "9:00"||list[i].name == "10:30"||list[i].name == "10:00"||list[i].name == "11:30"||list[i].name == "11:00") {
								msg += "办公" + "<br> 停留；企业类APP；企业微信、今日头条、腾讯会议、百度网";
							}else if (list[i].name == "12:30"||list[i].name == "13:00"||list[i].name == "13:30"||list[i].name == "14:00"||list[i].name == "14:30"||list[i].name == "15:00"||list[i].name == "15:30"||list[i].name == "16:00"||list[i].name == "16:30"||list[i].name == "17:00") {
								msg += "办公" + "<br> 开始办公；工作交流；茶歇、微信、企业微信、王者荣耀、支付宝、淘宝、京东";
							}else if (list[i].name == "17:30"||list[i].name == "18:00"||list[i].name == "18:30") {
								msg += "晚高峰通勤" + "<br> 打车；堵车；听歌；滴滴出行、喜马拉雅、网易云音乐、Kindle";
							}else if (list[i].name == "19:30"||list[i].name == "19:00"||list[i].name == "20:30"||list[i].name == "20:00"||list[i].name == "21:00") {
								msg += "住宅" + "<br> 晚饭；外卖、刷短视频、睡觉；抖音、爱奇艺、哔哩哔哩、淘宝、蜗牛睡眠";
							}
						}
						return msg;
					}
				},
				visualMap: {
					type: 'piecewise',
					show: false,
					dimension: 0,
					seriesIndex: 0,
					pieces: [{
						gt: 1,
						lt: 5,
						color: this.colorList[5],
					},
					{
						gt: 6,
						lt:11,
						color:this.colorList[1],
					},
					{
						gt: 13,
						lt: 22,
						color: this.colorList[2],
					},
					{
						gt: 23,
						lt: 25,
						color: this.colorList[3],
					},
					{
						gt: 26,
						lt: 30,
						color: this.colorList[4],
					},
				]
				},
				series: [
					{
						type: 'line',
						smooth: 0.6,
						symbol: 'none',
						lineStyle: {
							color: this.colorList[0],
							width: 1
						},
						markLine: {
							symbol: ['none', 'none'],
							label: {show: false},
							// data: [
							// 	{xAxis: 1},
							// 	{xAxis: 3},
							// 	{xAxis: 5},
							// 	{xAxis: 7}
							// ]
						},
						areaStyle: {},
						data: [
							['6:00', 0.59],
							['6:30', 0.61],
							['7:00', 0.62],
							['7:30', 0.38],
							['8:00', 0.26],
							['8:30', 0.335],
							['9:00', 0.375],
							['9:30', 0.33],
							['10:00',0.295],
							['10:30',0.605],
							['11:00',0.755],
							['11:30',0.795],
							['12:00',0.925],
							['12:30',0.935],
							['13:00',0.955],
							['13:30',0.49],
							['14:00',0.285],
							['14:30',0.24],
							['15:00',0.195],
							['15:30',0.44],
							['16:00',0.525],
							['16:30',0.635],
							['17:00',0.245],
							['17:30',0.33],
							['18:00',0.71],
							['18:30',0.67],
							['19:00',0.605],
							['19:30',0.685],
							['20:00',0.72],
							['20:30',0.785],
							['21:00',0.83],
						]
					}
				]
			};
			return option;
		}
	}
}
</script>
<style lang="scss" scoped>
.echarts-box{
    width: 100%;
    height:100%;
}
</style>

