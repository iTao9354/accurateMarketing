var exeInitTouch = function(touchtypeList){
	var list=[];
	
	list.push({'key':'0','value':'全部'});
	/*list.push({'key':'1','value':'客户经理'});
	list.push({'key':'2','value':'本地短信'});
	list.push({'key':'3','value':'本地弹窗'});*/
	if(touchtypeList){
		for(var i=0;i<touchtypeList.length;i++){
			list.push({'key':touchtypeList[i].TOUCH_TYPE,'value':touchtypeList[i].TOUCH_NAME});
		}
	}
	var str='',_claz='';
	$.each(list,function(i){
		_claz=i==0?'active':'';
		str+='<span class="'+_claz+'" data-name="'+list[i].key+'">'+list[i].value+'</span>'
	})
	$('#executeWrapId').append(str);
	$('#successWrapId').append(str);
}
//触点选择点击事件
var exeMarketingSkillClick= function(){
	$("#executeWrapId > span").click(function(){
		var thisOn = $(this);
		//此处需要传入 活动id 地域id  和org_id一致
		/*if(thisOn.hasClass('active')){			
			return;
		}*/	
		//alert(scopeData);
		thisOn.siblings().removeClass('active');
		thisOn.addClass('active');
		var contactBeginDate = $("#contactBeginDate").val();
		var contactEndDate = $("#contactEndDate").val();
		var exeObj={'touchType':thisOn.attr('data-name'),'activityId':activityId,'orgId':scopeData};
		//var exeObj={'touchType':_this.attr('data-name'),'activityId':'100008825','orgId':'018','contactBeginDate':contactBeginDate,'contactEndDate':contactEndDate};
		//console.log(exeObj);
		if("全部" == $('#executeWrapId span[class=active]').text()){
			var index = '1';
			var jsonObj={'orgId':scopeData,'activityId':activityId,'index':index};			
			jsonObject(jsonObj);	
		}else{
		exeGetAjax(exeObj);}
	});
}
//开始时间结束时间绑定方法
var WdatePickerBlurEvt={
		beginTime:function(evt){
			var contactBeginDate = $(evt).val();
			var contactEndDate=$('#contactEndDate').val();
			//console.log('开始时间为'+$(evt).val());
			var exeObjDate = {'activityId':'100008825','orgId':orgId,'contactBeginDate':contactBeginDate,'contactEndDate':contactEndDate};
			freashDateTouch(exeObjDate);	
		},
		endTime:function(evt){
			//console.log('结束事件为'+$(evt).val());
			var contactBeginDate = $('#contactBeginDate').val();
			var contactEndDate=$(evt).val();
			var exeObjDate = {'activityId':'100008825','orgId':orgId,'contactBeginDate':contactBeginDate,'contactEndDate':contactEndDate};
		    freashDateTouch(exeObjDate);
		}
}

function freashDateTouch(exeObjDate){
	//var exeObjDate = {'activityId':activityId,'orgId':'018','contactBeginDate':contactBeginDate,'contactEndDate':contactEndDate};
	//console.log(exeObjDate);
	if(exeObjDate.contactBeginDate!="" && exeObjDate.contactBeginDate!=null && exeObjDate.contactEndDate!="" && exeObjDate.contactEndDate!=null){			
	$.ajax({
		url : webpath + '/evl/exefreashDateTouch',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(exeObjDate),
		dataType : "json",
		success : function(data) {
			chartsObj.initContactTend(exeChartsTouchObj.marketingExeContactTouchJson(data));
			exeChartsTouchObj.loadFormObj("#exe_form",data.detl);			
		}
	});
	}
}

var exeGetAjax = function(datv){
	$.ajax({
		url : webpath + '/evl/exeMarketingData',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(datv),
		dataType : "json",
		success : function(data) {
			chartsObj.initAreaWorksheetContactRate(exeChartsTouchObj.marketingExeAreaTouchJson(data));
			chartsObj.initSkillWorksheetContactRate(exeChartsTouchObj.marketingExeSkillTouchJson(data));
			chartsObj.initContactTend(exeChartsTouchObj.marketingExeContactTouchJson(data));
			exeChartsTouchObj.loadFormObj("#exe_form",data.detl);
			initExeDateC(data);
			
		}
	});
}


//营销成功后台数据转换为echart数据
var exeChartsTouchObj={
		marketingExeAreaTouchJson:function(data){			
			var xData=[],yWorkSheet=[],yContectRate=[];
			for(var i=0;i<data.exeDataVic.length;i++){
				xData.push(data.exeDataVic[i].xData);
				yWorkSheet.push(data.exeDataVic[i].yWorkSheet);
				yContectRate.push(data.exeDataVic[i].yContectRate);
			}
			return {'xData':xData,'yWorkSheet':yWorkSheet,'yContectRate':yContectRate};
		},
		marketingExeSkillTouchJson:function(data){
			var skillWorkSheet=[],allSkillContactData=[];
			for(var i=0;i<data.exeDataToc.length;i++){			
				skillWorkSheet.push({'value':data.exeDataToc[i].total,'name':data.exeDataToc[i].name});
				if(data.exeDataToc[i].touchType == '1'){
				allSkillContactData.push({name:'客户经理接触成功',value:data.exeDataToc[i].touchSuccess});
				allSkillContactData.push({name:'客户经理接触失败',value:data.exeDataToc[i].touchFailed});
				allSkillContactData.push({name:'客户经理未接触',value:data.exeDataToc[i].notTouch});}
				if(data.exeDataToc[i].touchType == '2'){
					allSkillContactData.push({name:'本地短信接触成功',value:data.exeDataToc[i].touchSuccess});
					allSkillContactData.push({name:'本地短信接触失败',value:data.exeDataToc[i].touchFailed});
					allSkillContactData.push({name:'本地短信未接触',value:data.exeDataToc[i].notTouch});}
				if(data.exeDataToc[i].touchType == '3'){
					allSkillContactData.push({name:'本地弹窗接触成功',value:data.exeDataToc[i].touchSuccess});
					allSkillContactData.push({name:'本地弹窗接触失败',value:data.exeDataToc[i].touchFailed});
					allSkillContactData.push({name:'本地弹窗未接触',value:data.exeDataToc[i].notTouch});}
			}
			return {'skillWorkSheet':skillWorkSheet,'allSkillContactData':allSkillContactData};
		},
		marketingExeContactTouchJson:function(data){
			var xData=[],yData=[];
			for(var i=0;i<data.exeDataCf.length;i++){
				xData.push(data.exeDataCf[i].ACCOUNT_DATE.replace(/\-/g,"").slice(-4));
				yData.push(data.exeDataCf[i].touchUser);				
			}
			return {'xData':xData,'yData':yData};
		},
		loadFormObj : function (className, obj) {
			for ( var key in obj) {
				var targetSpan = $(className).find(
						'span[id="' + key + '"], p[data-name="' + key + '"]');
				if (null != targetSpan && undefined != targetSpan) {
					targetSpan.text(obj[key]);
				}
			}
		}
}
//初始化营销执行统计数据
function initExeDateC(data){
	var exeDataAsc = data.exeDataAsc;
	var exeDataDesc = data.exeDataDesc;
	$('#exe_form .currentDate').html(data.dateFount);
	$('#exe_form .totalUser').html(data.countUser);
	$('#exe_form .touchUser').html(data.touchUser);
	$('#exe_form .bili').html(data.filesize +"%");
	var arrAscName=[],arrAscValue = [];
	for(var i=0;i<exeDataAsc.length;i++){	
		arrAscName[i]=exeDataAsc[i].areaName;
		arrAscValue[i]=exeDataAsc[i].yContectRate +"%";
	}
	$('#exe_form .cityAseName').html(arrAscName.toString());
	$('#exe_form .ase').html(arrAscValue.toString());
	var arrDescName=[],arrDescValue = [];
	for(var i=0;i<exeDataDesc.length;i++){	
		arrDescName[i]=exeDataDesc[i].areaName;
		arrDescValue[i]=exeDataDesc[i].yContectRate +"%";
	}
	$('#exe_form .cityDescName').html(arrDescName.toString());
	$('#exe_form .desc').html(arrDescValue.toString());		
}

//价值提升js部分
var evInitTouch = function(targettypeList){
	var list=[];
	/*list.push({'key':'TAG00001','value':'月使用流量'});
	list.push({'key':'TAG00002','value':'ARPU'});
	list.push({'key':'TAG00003','value':'通话分钟数'});
	list.push({'key':'TAG00004','value':'流量饱和度'});*/
	if(targettypeList){
		for(var i=0;i<targettypeList.length;i++){
			list.push({'key':targettypeList[i].TARGET_CODE,'value':targettypeList[i].TARGET_NAME});
		}
	}
	var str='',_claz='';
	$.each(list,function(i){
		_claz=i==0?'':'';
		str+='<span class="'+_claz+'" data-name="'+list[i].key+'">'+list[i].value+'</span>'
	})
	$("#evIndicator").append(str);
}
//评估指标点击事件
var evInitTouchClick= function(){
	$("#evIndicator > span").click(function(){
		var thisOn = $(this);
		//此处需要传入 活动id 地域id  和org_id一致
		/*if(thisOn.hasClass('active'))
		return;*/
		//alert(scopeData);
		thisOn.siblings().removeClass('active');
		thisOn.addClass('active');
		var index = '3';
		var exeObj={'targetCode':thisOn.attr('data-name'),'activityId':activityId,'provNo':scopeData,'index':index};
		//console.log(exeObj);
		//if("月使用流量" == $('#evIndicator span[class=active]').text() || "ARPU" == $('#evIndicator span[class=active]').text() ||
		//		"通话分钟数" == $('#evIndicator span[class=active]').text() || "流量饱和度" == $('#evIndicator span[class=active]').text()){
		//	var index = '3';
		//	var jsonObj={'orgId':scopeData,'activityId':activityId,'index':index};		
		//	jsonObject(jsonObj);	
		//}else{
		evGetAjax(exeObj);
		//}
	});
}
var evGetAjax = function(datv){
	$.ajax({
		url : webpath + '/evl/evGetAjax',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(datv),
		dataType : "json",
		success : function(data) {
			chartsObj.initIndicatorChange(dataObj.indicatorChange(data));
			chartsObj.initUserTrace(dataObj.userTrace(data));			
			dataObj.loadFormObj("#ev_form",data.detl);
			initDateC(data);			
		}
	});
}
var dataObj={
		indicatorChange:function(data){			
			var xData=[],ySucUseAvgRateData=[],yNotUseAvgRateData=[],yBigNetAvgRateData=[];
			for(var i=0;i<data.evGet.length;i++){
				xData.push(data.evGet[i].xData);
				ySucUseAvgRateData.push(data.evGet[i].yBigNetAvgRateData);
				yNotUseAvgRateData.push(data.evGet[i].yNotUseAvgRateData);
				yBigNetAvgRateData.push(data.evGet[i].ySucUseAvgRateData);
			}
			return {'xData':xData,'ySucUseAvgRateData':ySucUseAvgRateData,'yNotUseAvgRateData':yNotUseAvgRateData,'yBigNetAvgRateData':yBigNetAvgRateData};
		},
		userTrace:function(data){
			var xData=[],useCountData=[],unuseCountData=[];
			for(var i=0;i<data.evGetChange.length;i++){			
				xData.push(data.evGetChange[i].xData);
				useCountData.push(data.evGetChange[i].useCountData);
				unuseCountData.push(data.evGetChange[i].unuseCountData);
			}
			return {'xData':xData,'useCountData':useCountData,'unuseCountData':unuseCountData};
		},		
		loadFormObj : function (className, obj) {
			for ( var key in obj) {
				var targetSpan = $(className).find(
						'span[id="' + key + '"], p[data-name="' + key + '"]');
				if (null != targetSpan && undefined != targetSpan) {
					targetSpan.text(obj[key]);
				}
			}
		}
}

function initDateC(data){
	var evGetValue = data.evGetValue;
	$('#evIndicatorLine .dataValue').html(data.dateFount);
	if(evGetValue!=null){
	$('#evIndicatorLine .debtRatio').html(evGetValue[0].debtRatio);
	$('#evIndicatorLine .unDebtRatio').html(evGetValue[0].unDebtRatio);
	$('#evIndicatorLine .deUn').html(evGetValue[0].deUn);
	$('#evIndicatorLine .awayUser').html(evGetValue[0].awayUser);
	$('#evIndicatorLine .unAwayUser').html(evGetValue[0].unAwayUser);
	$('#evIndicatorLine .awayCou').html(evGetValue[0].awayCou);
	}else{
		$('#evIndicatorLine .debtRatio').html(0.0);
		$('#evIndicatorLine .unDebtRatio').html(0.0);
		$('#evIndicatorLine .deUn').html(0.0);
		$('#evIndicatorLine .awayUser').html(0.0);
		$('#evIndicatorLine .unAwayUser').html(0.0);
		$('#evIndicatorLine .awayCou').html(0.0);
	}
}

/*var sesInitTouch = function(touchtypeList){
	var list=[];
	
	list.push({'key':'0','value':'全部'});
	list.push({'key':'1','value':'客户经理'});
	list.push({'key':'2','value':'本地短信'});
	list.push({'key':'3','value':'本地弹窗'});
	if(touchtypeList){
		for(var i=0;i<touchtypeList.length;i++){
			list.push({'key':touchtypeList[i].TOUCH_TYPE,'value':touchtypeList[i].TOUCH_NAME});
		}
	}
	var str='',_claz='';
	$.each(list,function(i){
		_claz=i==0?'active':'';
		str+='<span class="'+_claz+'" data-name="'+list[i].key+'">'+list[i].value+'</span>'
	})
	$('#successWrapId').append(str);
}*/
//触点选择点击事件
var sesMarketingSkillClick= function(){
	$('#successWrapId > span').click(function(){
		var _this = $(this);
		//if(_this.hasClass('active')) return;
		_this.siblings().removeClass('active');
		_this.addClass('active');
		//alert(scopeData);
		//此处需要传入 活动id 地域id  和org_id一致
		var obj={'touchType':_this.attr('data-name'),'activityId':activityId,'orgId':scopeData};
		if("全部" == $('#successWrapId span[class=active]').text()){
			var index = '2';
			var obj={'orgId':scopeData,'activityId':activityId,'index':index};	
			//console.log(obj);
			jsonObject(obj);	
		}else{
		_sesGetAjax(obj);}
	});
}
var _sesGetAjax = function(datv){
	$.ajax({
		url : webpath + '/evl/marketingSkill',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(datv),
		dataType : "json",
		success : function(data) {
			chartsObj.initAreaSuccess(sesChartsTouchObj.marketingTouchJson(data));
			chartsObj.initSkillSuccess(sesChartsTouchObj.marketingTaskTouchJson(data));
			chartsObj.initAreaSuccessAll(sesChartsTouchObj.marketingUserTouchJson(data));
			sesChartsTouchObj.loadFormObj("#ses_form",data.detl);
		}
	});
}
//营销成功后台数据转换为echart数据
var sesChartsTouchObj={
		marketingTouchJson:function(data){
			var xData=[],yContectSucData=[],yNatureSucData=[],ySucRateData=[];
			for(var i=0;i<data.vic.length;i++){
				xData.push(data.vic[i].xData);
				yContectSucData.push(data.vic[i].yContectSucData);
				yNatureSucData.push(data.vic[i].yNatureSucData);
				ySucRateData.push(data.vic[i].ySucRateData);
			}
			return {'xData':xData,'yContectSucData':yContectSucData,'yNatureSucData':yNatureSucData,'ySucRateData':ySucRateData};
		},
		marketingTaskTouchJson:function(data){
			var ydata=[];
			for(var i=0;i<data.toc.length;i++){
				ydata.push({'value':data.toc[i].value,'name':data.toc[i].name});
			}
			return {'ydata':ydata};
		},
		marketingUserTouchJson:function(data){
			var xData=[],allUseCountData=[],contactUseRateData=[],natureUseRateData=[];
			for(var i=0;i<data.cf.length;i++){
				xData.push(data.cf[i].xData);
				allUseCountData.push(data.cf[i].allUseCountData);
				contactUseRateData.push(data.cf[i].contactUseRateData);
				natureUseRateData.push(data.cf[i].natureUseRateData);
			}
			return {'xData':xData,'allUseCountData':allUseCountData,'contactUseRateData':contactUseRateData,'natureUseRateData':natureUseRateData};
		},
		loadFormObj : function (className, obj) {
			for ( var key in obj) {
				var targetSpan = $(className).find(
						'span[id="' + key + '"], p[data-name="' + key + '"]');
				if (null != targetSpan && undefined != targetSpan) {
					targetSpan.text(obj[key]);
				}
			}
		}
}
//初始化基本信息数据
function initData(callback,bindClick){
	//var datv={'activityId':activityId};
	var datv={'activityId':activityId,'orgId':orgId};
	$.ajax({
		url : webpath + '/evl/getBaseInfo',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(datv),
		dataType : "json",
		success : function(data) {
				//console.log(data);	
				var dataIndex = data.ImplementatioChannel;
				var ImplementatioChannel = [];
				for(var i=0;i<dataIndex.length;i++){
					ImplementatioChannel[i] = dataIndex[i].SKILL_NAME;
				}
				
				var orgList = data.evlDimActinfo.orgRange.split(',');
				var orgPathList = data.evlDimActinfo.orgPath.split(',');				
				var orgRangeList=[];
				
				//新的初始化营销范围
				//新的省份的初始化
				if(orgId.length <= 3){
				var orgIdName = data.orgIdList[0];
				orgRangeList.push({'key':orgIdName.PARENTID,'value':orgIdName.PROVNAME});
				//orgRangeList.push({'key':'018','value':'河北'});
				for(var i=0;i<orgList.length;i++){
					orgRangeList.push({'key':orgPathList[i],'value':orgList[i]});
				}
				}else{
				//地市的初始化
				var areaNameIndex = data.areaList[0];
				orgRangeList.push({'key':areaNameIndex.AREANO,'value':areaNameIndex.AREANAME});
				for(var i=0;i<data.areaCountyList.length;i++){
					orgRangeList.push({'key':data.areaCountyList[i].AREAID,'value':data.areaCountyList[i].ORGBUINAME});
				}	
				}
				var str='',_claz='';
				$.each(orgRangeList,function(i){
					_claz=i==0?'active':'';
					str+='<span class="'+_claz+'" data-name="'+orgRangeList[i].key+'">'+orgRangeList[i].value+'</span>'
				})
				$('#orgRangeList').append(str);
				dataObj.loadFormObj(".infos",data.evlDimActinfo);
				$('#ImplementatioChannel').html(ImplementatioChannel.toString());
				var touchList = data.targettypeList;
				var targetList = data.touchtypeList;
				exeInitTouch(touchList);
				//sesInitTouch(touchList);
				evInitTouch(targetList);
				callback();bindClick();
				
		}
	});
}

var scopeData = orgId;
//基本信息营销范围点击事件
var orgRangeClick= function(){
	$("#orgRangeList > span").click(function(){
		var thisOn = $(this);
		//此处需要传入 活动id 地域id  和org_id一致
		if(thisOn.hasClass('active'))
		return;
		thisOn.siblings().removeClass('active');
		thisOn.addClass('active');
		var orgId = thisOn.attr('data-name');
		scopeData = orgId;
		var index = '99';
		var jsonObj={'orgId':orgId,'activityId':activityId,'index':index};
		//console.log(jsonObj);		
		jsonObject(jsonObj);
	});
}
//初始化全部或者点击全部按钮后触发该方法
function jsonObject(data){
	var index = data.index;
	//console.log(index);
	$.ajax({
		url : webpath + '/evl/initAllData',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(data),
		dataType : "json",
		success : function(data) {
			//console.log(data);
			//初始化营销执行情况
			if(index == '99' || index == '1'){
			chartsObj.initAreaWorksheetContactRate(exeChartsTouchObj.marketingExeAreaTouchJson(data));
			chartsObj.initSkillWorksheetContactRate(exeChartsTouchObj.marketingExeSkillTouchJson(data));
			chartsObj.initContactTend(exeChartsTouchObj.marketingExeContactTouchJson(data));
			exeChartsTouchObj.loadFormObj("#exe_form",data.detl);
			initExeDateC(data);	}
			//营销成功情况
			if(index == '99' || index == '2'){
			chartsObj.initAreaSuccess(sesChartsTouchObj.marketingTouchJson(data));
			chartsObj.initSkillSuccess(sesChartsTouchObj.marketingTaskTouchJson(data));
			chartsObj.initAreaSuccessAll(sesChartsTouchObj.marketingUserTouchJson(data));
			sesChartsTouchObj.loadFormObj("#ses_form",data.detl);}
			//价值提升
			if(index == '99' || index == '3'){
			chartsObj.initIndicatorChange(dataObj.indicatorChange(data));
			chartsObj.initUserTrace(dataObj.userTrace(data));			
			dataObj.loadFormObj("#ev_form",data.detl);
			initDateC(data);}
		}
	});
}
/* 价值提升接触详情*/
function getCheckMonth(Obj){
	//console.log(Obj);
	$.ajax({
		url : webpath + '/evl/getCheckMonth',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		data : JSON.stringify(Obj),
		dataType : "json",
		success : function(data) {
				//console.log(data);
				chartsObj.initUserTrace(dataObj.userTrace(data));			
				dataObj.loadFormObj("#ev_form",data.detl);				
		}
	});
}
