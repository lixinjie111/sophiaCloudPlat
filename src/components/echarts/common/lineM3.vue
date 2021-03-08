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
			myChart:null
		}
	},
	watch:{
		myData(val,val1){
			this.initEcharts();	
			if(this.myChart){
				this.myChart.resize();
			}
		}
	},
    mounted() {
        	this.initEcharts();
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
            color: this.colorList,
            tooltip: {
                trigger: 'axis',
				formatter:(val)=>{
					var msg='';
					//var msg='<div style="width:200px;height:auto">';
					// msg+=val[0].axisValue+"<br/>"
					val.forEach(item=>{
						if(item.seriesName=='邓老凉茶'){
							this.myData.value.forEach(item1=>{
								if(item1.name=='邓老凉茶'){
									let max=Math.max(...item1.data);
									if(item.data==max){
										msg+=item.marker+`<span style="color:#4D94FF">促销事件</span><br/><span style="color:#fff">邓老凉茶健康守护攻略在6日和11日两度登上微博热搜，<br>引发其他品牌蓝V、健康/资讯类KOL和网友的热议，<br/>最终话题阅读量突破3700万，讨论量达1.2万。<br/>营销事件为邓老凉茶实现销售转化，<br/>其天猫旗舰店产品“邓老凉茶颗粒冲剂”在11日的访问人<br/>数是日常访问数的一百多倍</span>`
									}
								}
							});
							
						}
						if(item.seriesName=='加多宝'){
							this.myData.value.forEach(item1=>{
								if(item1.name=='加多宝'){
									let max=Math.max(...item1.data);
									if(item.data==max){
										if(item.data==max){
											msg+=item.marker+`<span style="color:#A49DFA">公共事件</span><br/><span style="color:#fff">加多宝力压王老吉 恶斗影响两巨头口碑</span>`
										}
									}
								}
							});
						}
						if(item.seriesName=='王老吉'){
							this.myData.value.forEach(item1=>{
								if(item1.name=='王老吉'){
									let max=Math.max(...item1.data);
									if(item.data==max){
										if(item.data==max){
											msg+=item.marker+`<span style="color:#A49DFA">公共事件</span><br/><span style="color:#fff">广州药业集团董事长李楚源在参加某论坛时宣布，<br/>国家863计划研究结果表明，喝王老吉可延长寿命大约10%。<br/>一时间，引起一片哗然。该信息的传播不仅未给品牌形象加分，<br/>而且适得其反，引发了大范围的质疑。</span>`
										}
									}
								}
							});
						}
						if(item.seriesName=='和其正'){
							this.myData.value.forEach(item1=>{
								if(item1.name=='和其正'){
									let max=Math.max(...item1.data);
									if(item.data==max){
										if(item.data==max){
											msg+=item.marker+`<span style="color:#A49DFA">公共事件</span><br/><span style="color:#fff">媒体公开报道显示，近期和其正深陷诸如“味道同白水<br/>”“虚假促销”“饮料中现絮状物”“篡改生产日期”<br/>等负面消息当中，声誉一落千丈。</span>`
										}
									}
								}
							});
						}
						if(item.seriesName=='白云山'){
							this.myData.value.forEach(item1=>{
								if(item1.name=='白云山'){
									let max=Math.max(...item1.data);
									if(item.data==max){
										if(item.data==max){
											msg+=item.marker+`<span style="color:#A49DFA">公共事件</span><br/><span style="color:#fff">广药白云山企业自从拥有了王老吉这个宝，<br/>白云山凉茶也就显得不太重要了，受企业策略布局影响，<br/>白云山凉茶的市场占有率进一步萎缩中</span>`
										}
									}
								}
							});
						}
					})
					//msg+='</div>';
					return msg
				},
			},
			legend: {
				type: 'scroll',
				pageFormatter:" ",
				pageButtonItemGap:1,
				pageButtonGap:1,
				pageIconSize:10,
				pageTextStyle:{
					width:0,
					fontSize:2
				},
				bottom:0,
				itemGap:5,
				itemWidth:8,
				itemHeight:8,
				icon:"circle",
				data:this.myData.legName,
			},
            grid: {
                left: 14,
                right: '6%',
                bottom: 25,
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

