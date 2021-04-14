<template>
	<div class="echarts-box" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
export default {
	props: {
		myTotaldata:{
			default:()=>{
				return {};
			},
		},
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
		myData:{
            handler:function(val,oldval){  
               this.initEcharts();
            },  
            deep:true//对象内部的属性监听，也叫深度监听  
        },
		myTotaldata:{
            handler:function(val,oldval){  
                this.initEcharts();
            },  
            deep:true//对象内部的属性监听，也叫深度监听  
        },
		"$store.state.collapsed"(newVal,oldVal){
			if(this.myChart){
				setTimeout(()=>{
					this.myChart.resize();
				},100)
				
			}
		},
	},
	created(){
		//this.collapse=this.$store.state.collapsed;
	},
    mounted() {
		setTimeout(()=>{
			this.initEcharts();
		},100)
    },
	methods: {
		initEcharts() {
			let _option = this.defaultOption();
			this.myChart = this.$echarts.init(document.getElementById(this.id));
			this.myChart.setOption(_option,true);
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
				width:'100%',
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
					type: 'line',
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: this.colorList[0],
						}, {
							offset: 1,
							color: '#fff'
						}])
					},
					// label:{
					// 	position: 'right',
					// },
					// itemStyle: {
                    //      normal: {
					// 		   fontSize:20,
                    //            barBorderRadius:30
					// 	 },
					// 	 emphasis:{
					// 		 color:'#FF9F7F'
					// 	 }
                    // },
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

