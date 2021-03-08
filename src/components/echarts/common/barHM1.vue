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
	watch:{
		myData(val,val1){
				this.initEcharts();	
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
                trigger: 'axis'
			},
			legend: {
				show:false,
                bottom: 0,
                data: this.myData.legName,
            },
            grid: {
                left: 40,
                right: '2%',
                bottom: 0,
                top: '10%',
                containLabel: false,
            },
            xAxis: {
				type: 'value',
				//设置轴线的属性
				show:false,
				axisLine:{
					lineStyle:{
						color:'#E9EBF1',
					}
				} ,
				axisLabel: {
					formatter: '{value}%',
					textStyle: {
						color: "#97A0C3",   //这里用参数代替了
						fontSize:'12'
					}
				},

            },
            yAxis: {
                type: 'category',
                data: this.myData.name,
				axisLine:{
					show:false,
					lineStyle:{
						color:'#E9EBF1',
						//width:8,//这里是为了突出显示加上的
					}
				},
				axisLabel: {
					textStyle: {
						color: "#97A0C3",   //这里用参数代替了
						fontSize:'14'
					}
				},
                // splitLine: {
                //     lineStyle: {
				// 		color:'#E9EBF1',
                //         //type: 'dashed',
                //     }
                // },
            },
            series: this.myData.value,
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

