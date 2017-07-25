//营销执行情况数据   100008825
var  areaWorksheetContactRateData = {
	'xData':['石家庄','唐山','秦皇岛','保定','邯郸','廊坊','承德','沧州','邢台','张家口','衡水'],
	'yWorkSheet':[260, 590, 900, 264, 287, 707, 176, 182, 487, 188, 65],
	'yContectRate':[2.0, 2.2, 3.3, 4.5, 6.3, 5.2, 7.3, 8.4, 3.0, 6.5, 2.0]
};
var skillWorksheetContactRateData = {
	'skillWorkSheet':[{value:500, name:'客户经理'},{value:600, name:'短信'},{value:1000, name:'弹窗'}],
	'allSkillContactData':[
		                {value:200, name:'客户经理接触成功'},
		                {value:100, name:'客户经理接触失败'},
		                {value:200, name:'客户经理未接触'},
		                {value:300, name:'短信接触成功'},
		                {value:100, name:'短信接触失败'},
		                {value:200, name:'短信未接触'},
		                {value:500, name:'弹窗接触成功'},
		                {value:300, name:'弹窗接触失败'},
		                {value:200, name:'弹窗未接触'}
		            ]
};
var contactTendData = {
	'xData':['0615','0616','0617','0618','0619','0620','0621','0615','0616','0617'],
	'yData':[820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901]
};

//营销成功情况数据
var areaSuccessData = {
	'xData':['石家庄','唐山','秦皇岛','保定','邯郸','廊坊','承德','沧州','邢台','张家口','衡水'],
	'yContectSucData':[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0,30],
	'yNatureSucData':[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,40],
	'ySucRateData':[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
};
var skillSuccessData = {
	'ydata':[
		{value:0.3, name:'客户经理'},
         {value:0.4, name:'短信'},
         {value:0.4, name:'弹窗'},
         {value:0.6, name:'网厅'},
         {value:0.8, name:'手厅'}
		/*{value:335, name:'客户经理'},
        {value:310, name:'短信'},
        {value:274, name:'弹窗'},
        {value:235, name:'网厅'},
        {value:400, name:'手厅'}*/
            ]
};
var areaSuccessAllData={
	'xData':['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	'allUseCountData':[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	'contactUseRateData':[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
	'natureUseRateData':[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
};

//营销成功情况数据
var indicatorChangeData = {
	'xData':['石家庄','唐山','秦皇岛','保定','邯郸','廊坊','承德','沧州','邢台','张家口','衡水'],
	'ySucUseAvgRateData':[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0,30],
	'yNotUseAvgRateData':[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,40],
	'yBigNetAvgRateData':[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
};
var userTraceData = {
	'xData':['(0~20]','(150~300]','(20~50]','(50~90]','(90~150]','0','>300','其他'],
	'useCountData':[320, 332, 301, 334, 390, 330, 320,300],
	'unuseCountData':[120, 132, 101, 134, 90, 230, 210,100]
};

// 动态计算图表外层div的高度
function calcChartsWrapH() {
	$('.oneChartWrap').each(function(i) {
		$(this).css('height',$(this).width()*2/3).children('.chartWrap').css('height',$(this).height()-40);
	})
}
var areaWorksheetContactRateChart,               // 营销范围的工单和接触率
	skillWorksheetContactRateChart,              // 触点工单量占比、接触占比
	contactTendChart,                            // 接触用户日趋势
	areaSuccessChart,                            // 营销成功模块图表一
	skillSuccessChart,                           // 营销成功模块图表二
	areaSuccessAllChart,                         // 营销成功模块图表三
	indicatorChangeChart,                        // 价值提升模块图表一
	userTraceChart;                              // 价值提升模块图表二	
var chartsObj = {
	init: function(){
		chartsObj.initExeCharts();
		chartsObj.initSuccessCharts();
		chartsObj.initValueCharts();
	},
	initExeCharts:function(){
		//初始化营销执行模块图表
		/*chartsObj.initAreaWorksheetContactRate(areaWorksheetContactRateData);
		chartsObj.initSkillWorksheetContactRate(skillWorksheetContactRateData);
		chartsObj.initContactTend(contactTendData);*/
		var index = '99';
		var jsonObj={'orgId':'018','activityId':activityId,'index':index};		
		//var jsonObj={'orgId':'V0130100','activityId':'100008825','index':index};		
		jsonObject(jsonObj);
	},
	initAreaWorksheetContactRate:function(areaWorksheetContactRateData){
		var _myData = areaWorksheetContactRateData;
		//初始化营销执行模块图表一 营销范围的工单和接触率
		areaWorksheetContactRateChart = echarts.init(document.getElementById('areaWorksheetContactRate'));
		var _option = {
            tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['工单量','接触率']
		    },
		    grid: {
		    	bottom: '15%'
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: _myData.xData?_myData.xData:[],
		            axisPointer: {
		                type: 'shadow'
		            },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '工单量(条)',
		            min: 0,
		            max: 6000,
		            axisLabel: {
		                formatter: '{value}'
		            },
	                splitLine: {
	                    show: false
	                },
		            axisTick:{
		            	show:false
		            }
		        },
		        {
		            type: 'value',
		            name: '接触率(%)',
		            min: 0,
		            max: 20,
		            axisLabel: {
		                formatter: '{value}'
		            },
	                splitLine: {
	                    show: false
	                },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    series: [
		        {
		            name:'工单量',
		            type:'bar',		           
		            barWidth:'30%',
		            data:_myData.yWorkSheet?_myData.yWorkSheet:[]
		        },
		        {
		            name:'接触率',
		            type:'line',
		            symbol:'circle',
		            yAxisIndex: 1,
		            data:_myData.yContectRate?_myData.yContectRate:[]
		        }
		    ]
        };
		areaWorksheetContactRateChart.setOption(_option);
	},
	initSkillWorksheetContactRate:function(skillWorksheetContactRateData){
		//初始化营销执行模块图表二 触点工单量占比、接触占比
		var _myData = skillWorksheetContactRateData;
		skillWorksheetContactRateChart = echarts.init(document.getElementById('skillWorksheetContactRate'));
		var _option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    series: [
		        {
		            name:'触点工单占比',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '30%'],
		            label: {
		                normal: {
		                    position: 'inner'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:_myData.skillWorkSheet?_myData.skillWorkSheet:[]
		        },
		        {
		            name:'接触占比',
		            type:'pie',
		            radius: ['40%', '55%'],
		            data:_myData.allSkillContactData?_myData.allSkillContactData:[]
		        }
		    ]
		};
		skillWorksheetContactRateChart.setOption(_option);
	},
	initContactTend:function(contactTendData){
		//初始化营销执行模块图表三 接触用户日趋势
		var _myData = contactTendData;
		contactTendChart = echarts.init(document.getElementById('contactTend'));
		var _option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['活动接触用户数日趋势']
		    },
		    grid: {
		        left: '2%',
		        right: '2%',
		        bottom: '10%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        axisLabel:{
		            rotate:50
		        },
	            axisTick:{
	            	show:false
	            },
		        data: _myData.xData?_myData.xData:[]
		    },
		    yAxis: {
		        type: 'value',
		        name: '接触用户数（户）',
		        min: 0,
	            max: 5000,
		        axisLabel: {
	                formatter: '{value}'
	            },
		        splitLine: {
                    show: false
                },
	            axisTick:{
	            	show:false
	            }
		    },
		    series: [
		        {
		            name:'活动接触用户数日趋势',
		            min: 0,
		            max: 5000,
		            type:'line',
		            symbol:'circle',
		            data:_myData.yData?_myData.yData:[]
		        }
		    ]
		};
		contactTendChart.setOption(_option);
	},
	initSuccessCharts:function(){
		//初始化营销成功模块图表
		chartsObj.initAreaSuccess(areaSuccessData);
		chartsObj.initSkillSuccess(skillSuccessData);
		chartsObj.initAreaSuccessAll(areaSuccessAllData);
	},
	initAreaSuccess:function(areaSuccessData){
		//初始化营销成功模块图表一
		var _myData = areaSuccessData;
		areaSuccessChart = echarts.init(document.getElementById('areaSuccess'));
		var _option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['接触成功数','自然成功数','成功率']
		    },
		    grid: {
		    	bottom: '15%'
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: _myData.xData?_myData.xData:[],
		            axisPointer: {
		                type: 'shadow'
		            },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '成功数（户）',
		            axisLabel: {
		                formatter: '{value}'
		            },
		            min: 0,
		            axisTick:{
		            	show:false
		            },
		            splitLine: {
	                    show: false
	                }
		        },
		        {
		            type: 'value',
		            name: '成功率（%）',
		            axisLabel: {
		                formatter: '{value}'
		            },
		            min: 0,
		            axisTick:{
		            	show:false
		            },
		            splitLine: {
	                    show: false
	                }
		        }
		    ],
		    series: [
		        {
		            name:'接触成功数',
		            type:'bar',
		            barWidth:'30%',
		            data:_myData.yContectSucData?_myData.yContectSucData:[]
		        },
		        {
		            name:'自然成功数',
		            type:'bar',
		            barWidth:'40%',
		            data:_myData.yNatureSucData?_myData.yNatureSucData:[]
		        },
		        {
		            name:'成功率',
		            type:'line',
		            symbol:'circle',
		            yAxisIndex: 1,
		            data:_myData.ySucRateData?_myData.ySucRateData:[]
		        }
		    ]
		};
		areaSuccessChart.setOption(_option);
	},
	initSkillSuccess:function(skillSuccessData){
		//初始化营销成功模块图表二
		var _myData = skillSuccessData;
		skillSuccessChart = echarts.init(document.getElementById('skillSuccess'));
		var _option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    visualMap: {
		        show: false,
		        min: 0,
		        max: 1,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series : [
		        {
		            name:'不同触点接触成功占比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            data:_myData.ydata?_myData.ydata:[],
		            roseType: 'radius',
		            label: {
		                normal: {
		                    textStyle: {
		                        color: 'rgba(0, 0, 0, 0.6)'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    lineStyle: {
		                        color: 'rgba(0, 0, 0, 0.6)'
		                    },
		                    smooth: 0.2,
		                    length: 10,
		                    length2: 20
		                }
		            },
		            animationType: 'scale',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
		};
		skillSuccessChart.setOption(_option);
	},
	initAreaSuccessAll:function(areaSuccessAllData){
		//初始化营销成功模块图表三
		var _myData = areaSuccessAllData;
		areaSuccessAllChart = echarts.init(document.getElementById('areaSuccessAll'));
		var _option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['办理用户数','接触办理率','自然办理率']
		    },
		    grid: {
		    	bottom: '15%'
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: _myData.xData?_myData.xData:[],
		            axisPointer: {
		                type: 'shadow'
		            },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '办理用户数(户)',
		            min: 0,
		            max: 4000,
		            axisLabel: {
		                formatter: '{value}'
		            },
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            }
		        },
		        {
		            type: 'value',
		            name: '办理率（%）',
		            min: 0,
		            max: 2,
		            axisLabel: {
		                formatter: '{value}'
		            },
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    series: [
		        {
		            name:'办理用户数',
		            type:'bar',
		            barWidth:'30%',
		            data:_myData.allUseCountData ? _myData.allUseCountData:[]
		        },
		        {
		            name:'接触办理率',
		            type:'line',
		            yAxisIndex: 1,
		            symbol:'circle',
		            data:_myData.contactUseRateData ? _myData.contactUseRateData:[]
		        },
		        {
		            name:'自然办理率',
		            type:'line',
		            yAxisIndex: 1,
		            symbol:'circle',
		            data:_myData.natureUseRateData ? _myData.natureUseRateData:[]
		        }
		    ]
		};
		areaSuccessAllChart.setOption(_option);
	},
	initValueCharts:function(){
		//初始化价值提升模块图表
		chartsObj.initIndicatorChange(indicatorChangeData);
		chartsObj.initUserTrace(userTraceData);
	},
	initIndicatorChange:function(indicatorChangeData){
		//初始化价值提升模块图表一
		var _myData = indicatorChangeData;
		indicatorChangeChart = echarts.init(document.getElementById('indicatorChange'));
		var _option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['成功办理用户的平均提升率','未办理用户的平均提升率','大网指标值平均提升率'],
		        show:false
		    },
		    grid: {
		    	bottom: '15%'
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: _myData.xData?_myData.xData:[],
		            axisPointer: {
		                type: 'shadow'
		            },
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '用户的平均提升率（%）',
		            min: 0,
		            max: 150,
		            axisLabel: {
		                formatter: '{value}'
		            },
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        },
		        {
		            type: 'value',
		            name: '大网指标值均提升率（%）',
		            min: 0,
		            max: 150,
		            axisLabel: {
		                formatter: '{value}'
		            },
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        }
		    ],
		    series: [
		        {
		            name:'成功办理用户的平均提升率',
		            type:'bar',
		            barWidth:'30%',
		            data:_myData.ySucUseAvgRateData?_myData.ySucUseAvgRateData:[]
		        },
		        {
		            name:'未办理用户的平均提升率',
		            type:'bar',
		            barWidth:'30%',
		            data:_myData.yNotUseAvgRateData?_myData.yNotUseAvgRateData:[]
		        },
		        {
		            name:'大网指标值平均提升率',
		            type:'line',
		            symbol:'circle',
		            yAxisIndex: 1,
		            data:_myData.yBigNetAvgRateData?_myData.yBigNetAvgRateData:[]
		        }
		    ]
		};
		indicatorChangeChart.setOption(_option);
	},
	initUserTrace:function(userTraceData){
		//初始化价值提升模块图表二
		var _myData = userTraceData;
		userTraceChart = echarts.init(document.getElementById('userTrace'));
		_option = {
		    title:{
		        text:'评估指标分档'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:['办理用户数','未办理用户数'],
		        orient:'right',
		        align:'right',
		        right:10
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            min: 0,
		            max: 6500,
		            axisLabel:{
				        rotate:50
				    },
		            axisTick:{
		            	show:false
		            },
		            data : _myData.xData?_myData.xData:[]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name:'户',
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        }
		    ],
		    series : [
		        {
		            name:'办理用户数',
		            type:'bar',
		            barWidth:'30%',
		            stack:'活动包含客户群',
		            data:_myData.useCountData?_myData.useCountData:[]
		        },
		        {
		            name:'未办理用户数',
		            type:'bar',
		            barWidth:'30%',
		            stack: '活动包含客户群',
		            data:_myData.unuseCountData?_myData.unuseCountData:[]
		        }
		    ]
		};
		userTraceChart.setOption(_option);
	},
	
	resize: function() {
		areaWorksheetContactRateChart.resize();
		skillWorksheetContactRateChart.resize();
		contactTendChart.resize();
		areaSuccessChart.resize();
		skillSuccessChart.resize();
		areaSuccessAllChart.resize();
		indicatorChangeChart.resize();
		userTraceChart.resize();
	}
};
var observationTimeValue;
var initVals = function(){
	//初始化需要默认传入的指标值
	//接触用户数日趋势——日期设置值
	/*var contactTendTime = {'startT':'2017-06-15','endT':'2017-07-15'};
	$('#contactBeginDate').val(contactTendTime.startT);
	$('#contactEndDate').val(contactTendTime.endT);*/

	//价值提升——观察月select值
	var valProObsTime = [{'key':'01','text':'活动开展第一个月'},{'key':'02','text':'活动开展第二个月'},{'key':'03','text':'活动开展第三个月'}
	,{'key':'04','text':'活动开展第四个月'}
	,{'key':'05','text':'活动开展第五个月'}
	,{'key':'06','text':'活动开展第六个月'}
	,{'key':'07','text':'活动开展第七个月'}
	,{'key':'08','text':'活动开展第八个月'}
	,{'key':'09','text':'活动开展第九个月'}
	,{'key':'10','text':'活动开展第十个月'}
	,{'key':'11','text':'活动开展第十一个月'}
	,{'key':'12','text':'活动开展第十二个月'}];
	var observationTimeSel = $('#observationTime').triber_select({'data':valProObsTime,'onselect': function(){
		var str = observationTimeSel.getValue() + '    ' + observationTimeSel.getText();
		observationTimeValue = observationTimeSel.getValue();
		if(observationTimeValue!=undefined){
			//console.log(str);
			var jsonObj={'orgId':'018','activityId':'100008825','monthId':observationTimeValue};		
			getCheckMonth(jsonObj);
		}		
	}});
	// 内容过多时出现滚动条
	$('.select_box ul').niceScroll({cursorcolor: '#ccc'});
	//observationTimeSel.setValue('01');
};

$(function(){	
	//sesInitTouch();
	//exeInitTouch();
	//evInitTouch();
	initData(orgRangeClick,initBindClick);
	// 动态计算图表外层div的高度
	calcChartsWrapH();
	chartsObj.init();
	initVals();
	$(window).resize(function(){
		// 动态计算图表外层div的高度
		calcChartsWrapH();
		chartsObj.resize();
	});
	initBindClick();	
});
var initBindClick = function() {
	//注册点击事件
	sesMarketingSkillClick();
	exeMarketingSkillClick();
	evInitTouchClick();
	//orgRangeClick();
};