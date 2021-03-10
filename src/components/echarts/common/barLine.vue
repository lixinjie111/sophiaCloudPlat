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
            color: this.colorList,
            tooltip: {
				trigger: 'axis',
				// formatter: function(list) {
				// 	var msg = "";
				// 	for (let i in list) {
				// 		if (i == 0) {
				// 			msg += list[i].name + "s<br>";
				// 		}
				// 		msg += list[i].seriesName + "：" + list[i].data + "<br>";
				// 		// if (list[i].seriesName == "SCL") {
				// 		// 	msg += list[i].seriesName + "：" + list[i].data + "<br>";
				// 		// }else{
							
				// 		// }
				// 	}
				// 	return msg;
				// }
			},
            grid: {
                left: 14,
                right: 14,
                bottom: 30,
                top: '10%',
                containLabel: true,
			},
			legend: {
				icon: 'circle',
				data: this.myData.legName,
				bottom: 0,
				textStyle: {
					fontSize: 14,
					color: '#424242'
				}
			},
            xAxis: {
                type: 'category',
				data: this.myData.name,
				//设置轴线的属性
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

            },
            yAxis: [
			{
				// name: '情绪指标',
				type: 'value',
				nameTextStyle:{
					color:"#97A0C3", 
					fontSize:12,  
				},
                axisLabel: {
					formatter: '{value} ',
					textStyle: {
						color: "#97A0C3",   //这里用参数代替了
						fontSize:'12'
					}
                },
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
				
			},
			{
				// type: 'value',
				// name: '眼动注视指数',
				// nameTextStyle:{
				// 	color:"#97A0C3", 
				// 	fontSize:12,  
				// },
				textStyle: {
					color: "#97A0C3",   //这里用参数代替了
					fontSize:'12'
				},
				axisLabel: {
					formatter: `{value}${this.myData.formatter}`,
					textStyle: {
						color: "#97A0C3",   //这里用参数代替了
						fontSize:'12'
					}
                },
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
			}
		],
			
            series: this.myData.value
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

