/*
* @Author: Administrator
* @Date:   2017-06-11 20:00:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-19 20:51:45
*/

'use strict';
// 其他模块的方法
var modules = {};
//tosift接口 本地版
var toSiftLocal = "/triber/tosifttest/feign/group";
//tosift接口 发布版
//var toSiftLocal = "";
var assignLocal = "";
//var assignLocal = "http://localhost:28086";

// 细分
modules.toshift = {
	// 获取用户数
	getUserCount: function(type) {
		var touchWrap = $('#'+type+'Wrapper');
		var isFilterVal = touchWrap.find('#filterRadio').prev('.hidden-inp').val();
		var params = {
			"groupId": datas.params.groupId,
			"orgPath": datas.params.orgPath
		};
		// 如果有二次筛选条件，则groupId为二次筛选返回的id
		if(isFilterVal == 1) {
			params.groupId = datas.touches[type].groupId;
		}
		// 整理iniCmUserCount()方法	
		 $.ajax({
		 	url: toSiftLocal + '/querySQLAndCountByIdAndOrgPathUpperRoot',
		 	type: 'POST',
		 	dataType: 'json',
		 	data: {
		 		"groupId": datas.params.groupId,
				"orgPath": datas.params.orgPath
		 	},//JSON.stringify(params),
		 	success: function(data) {
				 if (data.errorCode == "0") {
					 touchWrap.find('#userCount').text(data.total);
					// 回显主页用户数
					$('.touchLink[data-type="'+type+'"]').find('.count').text(data.total);
				 } else {
				 	layer.msg('获取客户群人数失败', {
				 		time : 1000,
				 		icon : 2
				 	});
				 }
		 	}		 	
		})
	},
	
	// 设置筛选条件
	setFilterCdt: function(n, ele, type, fnCallback) {
		var data = '?groupId='+datas.params.groupId+'&type='+n+'&orgPath='+datas.params.orgPath
		layerUtil.openMaxLayer(2, '客户群筛选条件', [ '800px', '300px' ], toSiftLocal+'/toGroupPageSkill' + data, function(index,layero) {
			var iframeWin = window[layero.find('iframe')[0]['name']];
			var jsonData = iframeWin.getValue();
			fnCallback(ele, type, jsonData);
		});
	},
	// 触点调用细分客户群二次筛选
	secFilter: function(ele, type, jsonData) {
		var touchWrap = $('#'+type+'Wrapper');
		 if(jsonData.descOnly != ""){
			 touchWrap.find('#chooseCdt').val(jsonData.descOnly);				
		 }else{
		 	 touchWrap.find('#chooseCdt').val("默认客户群");
		 }
		 touchWrap.find('#filterConditionSql').val(jsonData.sql);
		 $('.touchLink[data-type="'+type+'"]').find(".count").text(jsonData.total);
		 touchWrap.find("#userCount").text(jsonData.total);
		 datas.touches[type].groupId = jsonData.groupId;
		
	},

	// 触点调用细分客户群三次筛选
	thirdFilter: function(ele, type, jsonData) {
		// 将细分页面配置的条件添加到表格中
		if(jsonData.descOnly != ""){
			$(ele).text(jsonData.descOnly);					
		}else{
			$(ele).text("默认客户群");	
		}
		$(ele).prev('.hidden-inp').val(jsonData.sql);
		$(ele).parent().next().text(jsonData.total);
	},
	
	// 把由老groupId和已选中的触点的新的groupId组成对象转成字符串传给细分
	giveGroupIdsTosift: function() {		
		var allBackJson = datas.touches,
			oldGroupIdArr = [],
			backGroupIdJson = {};
		backGroupIdJson.newGroupId = datas.params.groupId;
		for(var name in allBackJson) {
			oldGroupIdArr.push(allBackJson[name].groupId);
		}
		backGroupIdJson.oldGroupId = oldGroupIdArr;
		if(oldGroupIdArr.length > 0) {
			console.log(backGroupIdJson);
			var params = {"newGroupId":"ad9743f291dd480f9418","oldGroupId":["93b4511ee8cb4e0bbf0ff55e737ed47c","06eb7234892f4405b65eb5023dabd19c"]};
			$.ajax({
			 	url: toSiftLocal+'/updateSkillGroupId',
			 	type: 'POST',
			 	dataType: 'json',
			 	data: params,//JSON.stringify(params),
			 	success: function(data) {
			 	
			 	}
			});
		}
	}
};

// 划配
modules.draw = {
		
};

// 活动
var selectTouchArr = [],          // 已选中的配置成功的触点的type组成的数组
	selectTouch2;
modules.activity = {
	// 初始化完成后调活动的方法，通知活动开始进行配置
	completeInitToAct: function() {
//		window.parent.restSkill.skillCloseLayer();
	},
	
	// 上一步
	prev: function() {
		 window.parent.restSkill.prevBtnSkill();    // 调取父页面的方法
	},
	// 下一步
	next: function() {
		if(modules.activity.touchCheck()) {
			modules.activity.tempSave(false,function(){
				window.parent.restSkill.nextBtnSkill();
			});
		}
	},
	// 暂存
	tempSave: function(flag,callBack) {
		if(modules.activity.touchCheck()) {			 
			// 为每个触点添加activityId、
			var allTouchObj = {};			
			for(var i = 0; i < datas.selectedType.length; i++) {
				var touchType = datas.selectedType[i];
				var perTouch = datas.touches[touchType];
				perTouch.activityId = datas.activityId;     // 活动id
				perTouch.orgPath = datas.params.orgPath;     // 组织机构
				if(perTouch.isFilter == 1) {
					perTouch.groupId = datas.touches[touchType].groupId;     //客户群id
				}else {
					perTouch.groupId = datas.params.groupId;     //客户群id
				}				
				allTouchObj[touchType] = perTouch;
			}
//			console.log(JSON.stringify(allTouchObj));
			$.ajax({
				url: 'insertAll',
				type: 'POST',
				dataType: 'JSON',
				data: {
					"jsonStr":JSON.stringify(allTouchObj),
					"activityId": datas.activityId
				},
				success: function(data) {
					flag=flag==true?flag:false;
					if(callBack!=undefined)
						callBack();
					else
						window.parent.restSkill.temporarySaveAct(flag);
						
				}
			})
			
		}
	},
	// 主页校验
	touchCheck: function() {
		var touchFlag = true;
		if(datas.selectedType.length <= 0 ) {
			layerUtil.alertMsg(3, '请至少选择一个触点！');
			touchFlag = false;
			return touchFlag;
		}else {
			// 遍历已选中的触点type组成的数组，如果当前触点的校验结果checkRes为1，向空数组selectTouchArr中push该触点的type，通过判断两个数组的length确定是否进行下一步；
			// 否则将中间变量selectTouch2赋值成未通过校验的触点的type，再进行提示
			for(var i = 0; i < datas.selectedType.length; i++) {
				var selectTouch = datas.selectedType[i];
				if(datas.touches[selectTouch].checkRes) {
					selectTouchArr.push(selectTouch);					
				}else {
					selectTouch2 = selectTouch;
				}			
			}
			var selectTouchArr2 = selectTouchArr.unique(),  // 数组去重
				selectedTypeArr = datas.selectedType.unique();
			if(selectTouchArr2.length < selectedTypeArr.length) {
				layerUtil.alertMsg(3, datas.touches[selectTouch2].title+'数据不正确！');
				touchFlag = false;
				return touchFlag;
			}else {
				touchFlag = true;
				return touchFlag;
			}
		}
	},
	
	// 新增时从活动获取groupId、orgPath、productIds
	getInfoFromActivity: function(obj) {
		if(obj.groupId !== undefined) {
			$('#cmGroupId').val(obj.groupId);
		}
		if(obj.orgPath !== undefined) {
			$('#orgRange').val(obj.orgPath);
		}
		
		var oldProductIds = $('#productIds').val();
		if(obj.productIds !== undefined && obj.productIds !== oldProductIds ) {
			$('#productIds').val(obj.productIds);
		}
		
		// 把由老groupId和已选中的触点的新的groupId组成对象转成字符串传给细分
		modules.toshift.giveGroupIdsTosift();
		return obj;
	},
	
	// 本地短信禁止二次筛选
	forbidFilter: function(touchWrap) {
		var obj = modules.activity.getInfoFromActivity();
		if(!obj.selCustom) {
			touchWrap.find('#filterRadio').hide().parent().append('否');
		}		
	}
};



$(function() {	
	modules.toshift.giveGroupIdsTosift();
})
