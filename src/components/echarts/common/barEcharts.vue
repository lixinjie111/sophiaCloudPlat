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
			myChart:"",
		}
	},
	watch:{
		"$store.state.collapsed"(newVal,oldVal){
			if(this.myChart){
				setTimeout(()=>{
					this.myChart.resize();
				},100)
				
			}
		},
	},
    mounted() {
			this.initEcharts();
    },
	methods: {
		initEcharts() {
			let _option = this.defaultOption();
			this.myChart = this.$echarts.init(document.getElementById(this.id));
			this.myChart.setOption(_option);
			window.addEventListener('resize',()=>{
				this.myChart.resize();
			})
		},
		defaultOption() {
			var option = {
            color: this.colorList[0],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 14,
                right: '6%',
                bottom: '6%',
                top: '10%',
                containLabel: true,
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
            yAxis: {
                type: 'value',
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
            series: [
                {
                    data: this.myData.value,
                    type: 'bar',
					barWidth: '10',
					label:{
						position: 'right',
					},
					itemStyle: {
                         normal: {
                               barBorderRadius:[30,30,0,0]
						 },
						 emphasis:{
							 color:'#FF9F7F'
						 }
                    },
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

