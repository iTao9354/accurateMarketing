//各地市营销活动策划情况数据
var areaBranchListX = pramterMap.areaBranchListX;
var areaBranchListY = pramterMap.areaBranchListY;
console.log(areaBranchListX,areaBranchListY);
function calcHeight() {
    var wH = $(window).height();
    wH = wH < 1080 ? 1080:wH;
    var screenH = screen.availHeight < 1080 ? 1080:screen.availHeight;
    var screenW = screen.availWidth <1920 ? 1920:screen.availWidth;
    if (document.all)   
	{
    	$('html,body,.content').width(screenW).height(screenH);
    	wH = screenH;
	}
    $('.content').width(screenW);
    var titleH = $('.ptitle').height();
    $('.main, .main>div').height(wH - titleH - 1);
    var pthirdH = (wH - titleH - $('.pl1').height() - 30) / 3;
    $('.pleft>.pthird').height(pthirdH - 15);
    $('.centerBtm').height(wH - titleH - $('.pl1').height() - 45);
}
function generateSort(option,id) {
    var htmlTxt = '',
        specitificCls = '';
    for (var i = 1; i < option.title.length; i++) {
        specitificCls = 'sort' + i;
        htmlTxt += '<p class="' + specitificCls + '"><span class="topTxt">' + option.title[i] + '</span><span class="topImg"><i style="width:' + option.data[i] / option.maxData * 100 + '%"></i></span><span class="topVal">' + option.data[i] + option.unit + '</span></p>';
    }
    $('#' + id).html(htmlTxt);
}
var leftPart = {
    initLeftPart: function() {
        leftPart.initLeftPart1();
        leftPart.initLeftPart2();
        leftPart.initLeftPart3();
    },
    initLeftPart1: function() {
        var myChart = echarts.init(document.getElementById('pl2'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '20%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data:areaBranchListX,
                //data: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                }
            }],
            series: [{
                name: '活动策划数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.8, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    }
                },
                barWidth: '40%',
                //data: [10, 52, 20, 34, 39, 30, 22, 10, 25, 20, 33]
                data:areaBranchListY
            }]
        };
        myChart.setOption(option);
    },
    initLeftPart2: function() {
        var myChart1 = echarts.init(document.getElementById('pl31'));
        var option1 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#fbf699', '#53f0bc', '#4ba5ab', '#1c94dd'],
            series: [{
                name: '主题分类',
                type: 'pie',
                radius: ['30%', '35%'],
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 9
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#fff'
                        },
                        length: 8,
                        length2: 5
                    }
                },
                data: [
                    { value: 234, name: '营销类' },
                    { value: 125, name: '关怀类' },
                    { value: 148, name: '预警挽留类' }
                ]
            }]
        };
        myChart1.setOption(option1);
        var myChart2 = echarts.init(document.getElementById('pl32'));
        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };

        var option2 = {
            tooltip: {},
            legend: {
                data: ['营销类', '关怀类', '预警挽留类'],
                itemGap: 5,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 9
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top: '20%',
                containLabel: true
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: '石家庄', max: 6500 },
                    { name: '唐山', max: 16000 },
                    { name: '秦皇岛', max: 30000 },
                    { name: '邯郸', max: 38000 },
                    { name: '邢台', max: 52000 },
                    { name: '保定', max: 25000 }
                ],
                shape: 'circle',
                splitNumber: 5,
                name: {
                    textStyle: {
                        color: '#6c759d'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(108, 117, 157, 0.1)', 'rgba(108, 117, 157, 0.2)',
                            'rgba(108, 117, 157, 0.4)', 'rgba(108, 117, 157, 0.6)',
                            'rgba(108, 117, 157, 0.8)', 'rgba(108, 117, 157, 1)'
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'transparent'
                    }
                }
            },
            series: [{
                name: '营销类',
                type: 'radar',
                lineStyle: lineStyle,
                data: [
                    [4300, 10000, 28000, 35000, 50000, 19000]
                ],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#eb1b53'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            }, {
                name: '关怀类',
                type: 'radar',
                lineStyle: lineStyle,
                data: [
                    [5000, 14000, 28000, 31000, 42000, 21000]
                ],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#53f0bc'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            }, {
                name: '预警挽留类',
                type: 'radar',
                lineStyle: lineStyle,
                data: [
                    [5000, 13000, 24000, 30000, 40000, 22000]
                ],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#4ba5ab'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            }]
        };
        myChart2.setOption(option2);
        var myChart3 = echarts.init(document.getElementById('pl33'));
        var option3 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['营销类', '关怀类', '预警挽留类'],
                itemGap: 5,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 9
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top: '20%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06'],
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            series: [{
                name: '营销类',
                type: 'line',
                symbol:'circle',
                itemStyle: {
                    normal: {
                        color: '#eb1b53'
                    }
                },
                data: [10, 52, 200, 334, 390, 330, 220]
            }, {
                name: '关怀类',
                type: 'line',
                symbol:'circle',
                itemStyle: {
                    normal: {
                        color: '#53f0bc'
                    }
                },
                data: [10, 42, 20, 34, 30, 130, 200]
            }, {
                name: '预警挽留类',
                type: 'line',
                symbol:'circle',
                itemStyle: {
                    normal: {
                        color: '#fec220'
                    }
                },
                data: [30, 42, 50, 63, 90, 80, 30]
            }]
        };
        myChart3.setOption(option3);
    },
    initLeftPart3: function() {
        var option = {
            title: ['市场营销部', '信息化事业部', '产品创新部', '集团客户事业部', '呼叫中心', '信息导航业务中心', '电子商务部', '运行运维部'],
            data: [80, 70, 60, 50, 40, 35, 30, 20],
            maxData: 100,
            unit: '%'
        };
        generateSort(option,'pl4');
    }
};

var centerTopPart = {
	initCenterTopPart:function(){
		centerTopPart.initTrend({},'totalValChart');
	},
	initTrend:function(dataObj,id){
		var myChart = echarts.init(document.getElementById(id));
		var xFakeData = ['一月', '一月', '一月', '一月', '一月', '一月', '一月', '一月', '一月', '一月', '一月', '一月'];
		var yFakeData = [10, 52, 20, 34, 39, 30, 22, 10, 25, 20, 33, 35];
		var XData = dataObj.xAxisData?dataObj.xAxisData : xFakeData;
		var YData = dataObj.yAxisData?dataObj.yAxisData : yFakeData;
		var option = {
            tooltip: {
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '20%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: XData,
                axisTick: {
                    show: false
                },
                axisLine: {
                	show:false
                },
                axisLabel: {
                    show:false
                }
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    alignWithLabel:true
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }],
            series: [{
                name: '营销成功总额',
                type: 'line',
                symbol:'circle',
                symbolSize:8,
                showAllSymbol:true,
                itemStyle: {
                    normal: {
                        color: '#f4b017'
                    }
                },
                lineStyle:{
                	normal:{
                		color:'#fff'
                	}
                },
                data: YData
            }]
		};
		myChart.setOption(option);
	}
};

var centerLeftPart = {
    initCenterLeftPart: function() {
        centerLeftPart.initMap();
        centerLeftPart.initSkillCircle();
        var skillBarIds = ['skillBtm1','skillBtm2','skillBtm3','skillBtm4'];
        var skillBarDatas=[{
        	xData:['客户经理', '短信', '渠道触点', '手厅', '网厅'],
        	seriesName:'有效工单量',
        	seriesData:[10, 52, 70, 34, 39]
        },{
        	xData:['客户经理', '短信', '渠道触点', '手厅', '网厅'],
        	seriesName:'覆盖用户数量',
        	seriesData:[10, 52, 70, 34, 39]
        },{
        	xData:['客户经理', '短信', '渠道触点', '手厅', '网厅'],
        	seriesName:'接触工单量',
        	seriesData:[10, 52, 70, 34, 39]
        },{
        	xData:['客户经理', '短信', '渠道触点', '手厅', '网厅'],
        	seriesName:'接触成功量',
        	seriesData:[10, 52, 70, 34, 39]
        }];
        centerLeftPart.initSkillBar(skillBarDatas,skillBarIds);
    },
    initMap: function() {
        var myChart = echarts.init(document.getElementById('map'));
        var dataxx=data = [
             {name: '唐山', value: 50},
             {name: '沧州', value: 58},
             {name: '石家庄', value: 80},
             {name: '邯郸', value: 40},
             {name: '承德', value: 40},
             {name: '张家口市', value: 40},
             {name: '保定', value: 40},
             {name: '邢台', value: 40},
             {name: '秦皇岛', value: 40},
             {name: '衡水', value: 40},
             {name: '廊坊市', value: 40}
        ];
        var geoCoordMap = {
            '唐山':[118.4766, 39.6826],
            '沧州':[116.8286, 38.2104],
            '石家庄':[114.4995, 38.1006],
            '邯郸':[114.4775, 36.535],
            '承德':[117.5757, 41.4075],
            '张家口市':[115.1477, 40.8527],
            '保定':[115.0488, 39.0948],
            '邢台':[114.8071, 37.2821],
            '秦皇岛':[119.2126, 40.0232],
            '衡水':[115.8838, 37.7161],
            '廊坊市':[116.521, 39.0509]
        };
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        var color = ['rgba(34,187,255,0.6)', '#22bbff', '#22bbff'];	

        var name ='河北';

        var option = {
        	    tooltip : {
        	        trigger: 'item'
        	    },
	            grid: {
	                left: '3%',
	                right: '3%',
	                bottom: '5%',
	                top: '20%',
	                containLabel: true
	            },
        	    geo: {
        	        map: name,
        	        zoom:1.2,
        	        label: {
        	            emphasis: {
        	                show: false
        	            }
        	        },
        	        itemStyle: {
        	            normal: {
        	                areaColor: 'transparent',
        	                borderColor: '#255baa',
        	                shadowColor: 'rgba(0, 219, 255, 0.5)',
    						shadowBlur: 20,
    						borderWidth:1
        	            },
        	            emphasis: {
        	                borderColor: '#00dbff',
        	                areaColor: 'transparent',
        	                shadowColor: 'rgba(0, 219, 255, 0.5)',
    						shadowBlur: 20,
    						borderWidth:2
        	            }
        	        }
        	    },
        	    series : [
        	        {
        	            name: name,
        	            type: 'effectScatter',
        	            coordinateSystem: 'geo',
        	            data: convertData(data.sort(function (a, b) {
        	                return b.value - a.value;
        	            }).slice(0, 6)),
        	            symbolSize: function (val) {
        	                return val[2] / 5;
        	            },
        	            showEffectOn: 'render',
        	            rippleEffect: {
        	                brushType: 'stroke'
        	            },
        	            hoverAnimation: true,
        	            label: {
        	                normal: {
        	                	textStyle:{
        	                		color:'#6c759d'
        	                	},
        	                    formatter: '{b}',
        	                    position: 'right',
        	                    show: true
        	                }
        	            },
        	            itemStyle: {
        	                normal: {
        	                    color: '#22bbff',
        	                    shadowBlur: 10,
        	                    shadowColor: '#22bbff'
        	                }
        	            },
        	            zlevel: 1
        	        }
        	    ]
        };
        myChart.setOption(option);
    },
    initSkillCircle: function(datas,ids) {
    	 require.config({
            packages: [
                {
                    name: 'zrender',
                    location: webpath+'/static/resource/plugin/zrender-master/src',
                    main: 'zrender'
                }
            ]
        });
        require(
        [
            'zrender',
            //'zrender/vml/vml',
            webpath+'/static/resource/plugin/zrender-master/src/custom/circleTypes'
        ],
        function(zrender,circleTypes,datas,ids){
        	var colors = [{
        		valTxtColor:'#e75a5d',
        		decribeTxtColor:'#fff',
        		circleLineColor:'rgba(237,94,96,1)',
        		lineShadowColor:'rgba(237,94,96,.6)',
        		unit:'条'
        	},
        	{
        		valTxtColor:'#ffa52a',
        		decribeTxtColor:'#fff',
        		circleLineColor:'rgba(251,163,42,1)',
        		lineShadowColor:'rgba(251,163,42,.6)',
        		unit:'条'
        	},
        	{
        		valTxtColor:'#3499cb',
        		decribeTxtColor:'#fff',
        		circleLineColor:'rgba(52,153,203,1)',
        		lineShadowColor:'rgba(52,153,203,.6)',
        		unit:'条'
        	},
        	{
        		valTxtColor:'#ed5e60',
        		decribeTxtColor:'#fff',
        		circleLineColor:'rgba(237,94,96,1)',
        		lineShadowColor:'rgba(237,94,96,.6)',
        		unit:'条'
        	}];
        	var ids = ['skillTop1','skillTop2','skillTop3','skillTop4'];
	        var datas = [{
	        	valTxt:'22343',
	        	decribeTxt:'有效工单量'
	        },{
	        	valTxt:'22343',
	        	decribeTxt:'覆盖用户数量'
	        },{
	        	valTxt:'22343',
	        	decribeTxt:'接触工单量'
	        },{
	        	valTxt:'22343',
	        	decribeTxt:'接触成功量'
	        }];
	        //js ajax 加载函数
	        var Ajax={
			    post: function (url, data, fn) {
			        var obj = new XMLHttpRequest();
			        obj.open("POST", url, true);
			        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
			        obj.onreadystatechange = function () {
			            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
			                fn.call(this, obj.responseText);
			            }
			        };
			        obj.send(data);
			    }
			}
        	for(var i=0; i < datas.length; i++){
        		var cx = $('#' + ids[i]).width()/2 + 10;
	        	var cy = $('#' + ids[i]).height()/2;
	        	var cr = cy - 20;
	            circleTypes(2,{
	                canvasId:ids[i],
	                crX:cx,//主圆的圆心x坐标
	                crY:cy,//主圆的圆心y坐标
	                cxr:cr, //主圆半径;
	                valTxt:datas[i].valTxt,
	                valTxtFontSize:20,
	                unitTxt:colors[i].unit,
	                unitTxtFontSize:10,
	                valTxtColor:colors[i].valTxtColor,
	                decribeTxt:datas[i].decribeTxt,
	                decribeTxtColor:colors[i].decribeTxtColor,
	                decribeTxtFontSize:14,
	                circleLineColor:colors[i].circleLineColor,//主圆线的颜色
	                lineShadowColor:colors[i].lineShadowColor
	            });
        	}
        });
    },
    initSkillBar:function(datas, ids){
    	var dataObjs = datas?datas:[];
    	var ids = ids?ids:[];
    	for(var i = 0; i<ids.length;i++){
    		if(!dataObjs || !dataObjs[i]) return;
    		var myChart = echarts.init(document.getElementById(ids[i]));
	    	option = {
			    color: ['#22bbb9'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '10%',
			        top:'10%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : dataObjs[i].xData,
			            axisTick: {
			                alignWithLabel: true,
			                show: false
			            },
			            axisLine:{
			                lineStyle:{
			                    color:'#22bbb9',
			                    width:2
			                }
			            },
			            axisLabel:{
			                textStyle:{
			                    color:'#fff',
			                    fontFamily:'微软雅黑',
			                    fontSize:10
			                }
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            show:false
			        }
			    ],
			    series : [
			        {
			            name:dataObjs[i].seriesName,
			            type:'bar',
			            barWidth: '60%',
			            data:dataObjs[i].seriesData
			        }
			    ]
			};
			myChart.setOption(option);
    	}
    	
    }
};

var centerRightPart = {
    initCenterRightPart: function() {
        centerRightPart.initCRPart1();
        centerRightPart.initCRPart2();
        centerRightPart.initCRPart3();
    },
    initCRPart1: function() {
        var myChart = echarts.init(document.getElementById('cbtmRight1'));
        var option = {
        	color:['#1e469b','#2665b5','#22bbb9','#00af7b','#e69654'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '10%',
                top: '25%',
                containLabel: true
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                splitLine: { show: false },
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                name: '用户数(户)',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }, {
                type: 'value',
                name: 'ARPU(元)',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            series: [{
                name: '收入分档10-20',
                type: 'bar',
                tooltip: { trigger: 'item' },
                stack: '用户数',
                yAxisIndex: 0,
                barWidth: '40%',
                data: [120, 132, 101, 134, 90, 230]
            }, {
                name: '收入分档20-30',
                type: 'bar',
                tooltip: { trigger: 'item' },
                stack: '用户数',
                yAxisIndex: 0,
                barWidth: '40%',
                data: [220, 182, 191, 234, 290, 330]
            }, {
                name: '收入分档30-40',
                type: 'bar',
                tooltip: { trigger: 'item' },
                stack: '用户数',
                yAxisIndex: 0,
                barWidth: '40%',
                data: [150, 232, 201, 154, 190, 330]
            }, {
                name: 'ARPU',
                type: 'line',
                symbol:'circle',
                yAxisIndex: 1,
                data: [662, 818, 464, 526, 1679, 1500]

            }, {
                name: 'DOU',
                type: 'line',
                symbol:'circle',
                yAxisIndex: 1,
                data: [762, 918, 564, 626, 1779, 1600]
            }]
        };
        myChart.setOption(option);
    },
    initCRPart2:function(){
    	var myChart = echarts.init(document.getElementById('cbtmRight2'));
        var option = {
        	color:['#eb1b53','#1e469b','#ff8617'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '15%',
                top: '25%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                splitLine: { show: false },
                data: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
                axisLabel:{
                	rotate:45
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                name: '用户数(户)',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }, {
                type: 'value',
                name: '成功率',
                axisLabel: {
                    formatter: '{value}%'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                }
            }],
            series: [{
                name: '接触用户数(户)',
                type: 'line',
                symbol:'circle',
                areaStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: 'rgb(219, 40, 88)'
	                    }, {
	                        offset: 1,
	                        color: 'rgb(253, 82, 128)'
	                    }])
	                }
	            },
                data: [120, 132, 101, 134, 90, 230, 191, 234, 290, 330, 310]
            }, {
                name: '接触率',
                type: 'line',
                symbol:'circle',
	            areaStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: 'rgb(6, 30, 87)'
	                    }, {
	                        offset: 1,
	                        color: 'rgb(4, 90, 142)'
	                    }])
	                }
	            },
                data: [220, 182, 191, 234, 290, 330,201, 154, 190, 330, 410]
            }]
        };
        myChart.setOption(option);
    },
    initCRPart3:function(){
    	var option = {
            title: ['用户4G化', '用户4G化', '用户4G化', '用户4G化', '用户4G化', '用户4G化', '用户4G化', '用户4G化'],
            data: [80, 70, 60, 50, 40, 35, 30, 20],
            maxData: 100,
            unit: '%'
        };
        generateSort(option,'cbtmRight3');
    }
};

var rightPart = {
    initRightPart: function() {
        rightPart.initRightPart1();
        rightPart.initRightPart2();
        rightPart.initRightPart3();
    },
    initRightPart1: function() {
        var myChart = echarts.init(document.getElementById('scene1'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: '接触用户数',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 360, name: '石家庄' },
                    { value: 310, name: '廊坊' },
                    { value: 274, name: '秦皇岛' },
                    { value: 235, name: '唐山' },
                    { value: 410, name: '邯郸' },
                    { value: 335, name: '邢台' },
                    { value: 310, name: '保定' },
                    { value: 274, name: '张家口' },
                    { value: 235, name: '承德' },
                    { value: 340, name: '衡水' },
                    { value: 390, name: '沧州' }
                ].sort(function(a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: '#6c759d'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#6c759d'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531'
                    }
                }
            }]
        };
        myChart.setOption(option);
    },
    initRightPart2: function() {
        var myChart = echarts.init(document.getElementById('scene2'));
        var option = {
        	color:['#eb1b53','#ff8617','#fec220','#97c659','#3499cb'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['地理围栏', '互联网访问', '业务使用', '实时信令'],
                itemGap: 5,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#6c759d',
                    fontSize: 9
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(108,117,157,.1)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            yAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c759d'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                },
                data: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水']
            },
            series: [{
                name: '地理围栏',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                data: [320, 302, 301, 334, 390, 330, 320, 334, 390, 330, 320]
            }, {
                name: '互联网访问',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                data: [120, 132, 101, 134, 90, 230, 210, 334, 390, 330, 320]
            }, {
                name: '业务使用',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134]
            }, {
                name: '实时信令',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                data: [150, 212, 201, 154, 190, 330, 410, 120, 132, 101, 134]
            }]
        };
        myChart.setOption(option);
    },
    initRightPart3: function() {
    	var myChart = echarts.init(document.getElementById('scene3'));
    	var data = [
		    [[500,500,80,'石家庄','app访问类办理成功数'],
		    [130,400,45,'秦皇岛','app访问类办理成功数'],
		    [100,700,40,'廊坊','app访问类办理成功数'],
		    [550,100,55,'唐山','app访问类办理成功数'],
		    [750,850,59,'邢台','app访问类办理成功数'],
		    [800,250,60,'保定','app访问类办理成功数'],
		    [550,880,50,'张家口','app访问类办理成功数'],
		    [300,200,55,'承德','app访问类办理成功数'],
		    [260,850,45,'沧州','app访问类办理成功数'],
		    [900,600,40,'衡水','app访问类办理成功数'],
		    [1000,1000,0,'',]]
		];

		option = {
		    tooltip:{
		        formatter: function(params, ticket, callback){
		            var html =  params.data[4] +'<br/> '+params.data[3]+'：'+ params.data[2];
		            return html;
		        }
		    },
		    grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: true
            },
		    xAxis: {
		        type:'value',
		        splitLine: {
		            show:false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:false
		        },
		        axisLine:{
		            show:false
		        }
		    },
		    yAxis: {
		        splitLine: {
		           show:false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:false
		        },
		        axisLine:{
		            show:false
		        }
		    },
		    series: [{
		        name: 'app访问接触量',
		        data: data[0],
		        type: 'scatter',
		        symbolSize: function (data) {
		            return data[2];
		        },
		        label: {
		            normal:{
		                show:true,
		                formatter: function (param) {
		                    return param.data[3];
		                }
		            },
		            emphasis: {
		                show: true
		            }
		        },
		        itemStyle: {
		            normal: {
		                shadowBlur: 10,
		                shadowColor: 'rgba(3, 154, 244, 0.5)',
		                shadowOffsetY: 5,
		                color: new echarts.graphic.RadialGradient(0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(3, 154, 244,.5)'
		                }, {
		                    offset: 1,
		                    color: 'rgb(3, 154, 244)'
		                }])
		            }
		        }
		    }]
		};
		myChart.setOption(option);
    }
}
$(function() {
    $(window).resize(function() {
        calcHeight();
        leftPart.initLeftPart();
	    centerTopPart.initCenterTopPart();
	    centerLeftPart.initCenterLeftPart();
	    centerRightPart.initCenterRightPart();
	    rightPart.initRightPart();
    }).resize();
});
