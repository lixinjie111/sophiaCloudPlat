<template>
	<div class="echarts-box" :id="id"></div>
</template>

<script>
	import echarts from 'echarts';
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
    mounted(){this.initEcharts()},
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
                 title: {
        text: `{value|${60}}{unit|%}`,
        top: 'center',
        left: 'center',
        textStyle: {
            rich: {
                value: {
                    fontSize: 28,
                    color: '#333',
                    fontWeight: 700
                },
                unit: {
                    fontSize: 14,
                    color: '#333',
                    padding: [0, 0, 6, 1],
                    fontWeight: 700

                }
            }
        }
    },
                legend: {
         show: false,
         data: []
     },

     series: [{
            type: 'pie',
            clockwise: false,
            radius: ['89%', '90%'],
            zlevel: 3,
            hoverAnimation: false,
            label: {
                show: false,
            },
            data: [{
                value: 100 - 60,
                itemStyle: {
                    color: 'transparent',
                }
            }, {
                value: 60,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        borderColor: new echarts.graphic.LinearGradient(
    0, 0, 1, 0, [{
            offset: 0,
            color: "#4D94FF",
        },
        {
            offset: 1,
            color: "#4D94FF",
        }
    ]
),
                        color: new echarts.graphic.LinearGradient(
    0, 0, 1, 0, [{
            offset: 0,
            color: "#4D94FF",
        },
        {
            offset: 1,
            color: "#4D94FF",
        }
    ]
)
                    }
                },
            }, ]
        },
        {
            type: 'pie',
            clockwise: false,
            radius: ['89%', '90%'],
            hoverAnimation: false,
            zlevel: 2,
            label: {
                show: false,
            },
            itemStyle: {
                color: '#ECEFF4',
                borderWidth: 5,
                borderColor: '#ECEFF4'
            },
            emphasis: {
                itemStyle: {
                    color: '#ECEFF4',
                    borderWidth: 5 ,
                    borderColor: '#ECEFF4'
                }
            },
            data: [100]
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

