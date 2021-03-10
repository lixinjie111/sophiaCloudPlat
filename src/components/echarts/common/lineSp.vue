<template>
	<div class="echarts-box" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
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
				color:this.colorList,
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					data: [
						'0 获客区',
						'1 获客区',
						'2 升值区',
						'3 升值区',
						'4 留存区',
						'5 留存区',
					],
					axisLine:{
						lineStyle:{
							color:'#E9EBF1',
						}
					} ,
					axisLabel: {
						formatter: function(res) {
							//return res.split(" ")[0] + "\n" + res.split(" ")[1];
							return res.split(" ")[1];
						},
						textStyle: {
							color: "#97A0C3",   //这里用参数代替了
							fontSize:'12'
						}
					}
				},
				yAxis: {
					axisLine:{
						lineStyle:{
							color:'#E9EBF1',
							//width:8,//这里是为了突出显示加上的
						}
					},
					axisLabel: {
						textStyle: {
							color: "#97A0C3",   //这里用参数代替了
							fontSize:'12'
						}
					},
				},
				series: [{
					name: "",
					smooth: true,
					type: 'line',
					data:[10, 30, 90, 110, 90,10],
					markArea: {
						silent: true,
						itemStyle: {
							normal: {
								borderWidth: 1,
								borderType: 'dashed'
							}
						},
						data: [[
							{
								name: '引入区',
								xAxis: '0 获客区',
								itemStyle: {
									color: 'rgba(164,157,250,.3)',
								}
							},
							{
								xAxis: '1 获客区',
							}
						], [
							{
								name: '成长期',
								xAxis: '1 获客区',
								itemStyle: {
									color: 'rgba(252,128,159,.3)',
								}
							},
							{
								xAxis: '2 升值区',
							},
						], 
						[
							{
								name: '成熟期',
								xAxis: '2 升值区',
								itemStyle: {
									color: 'rgba(255,217,140,.3)',
								}
							},
							{
								xAxis: '3 升值区',
							},
						],
						[
							{
								name: '休眠区',
								xAxis: '3 升值区',
								itemStyle: {
									color: 'rgba(138,230,199,.3)',
								}
							},
							{
								xAxis: '4 留存区',
							}
						],
						[
							{
								name: '流失区',
								xAxis: '4 留存区',
								itemStyle: {
									color: 'rgba(225,149,100,.3)',
								}
							},
							{
								xAxis: '5 留存区',
							}
						],
						]
					},
				}]
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

