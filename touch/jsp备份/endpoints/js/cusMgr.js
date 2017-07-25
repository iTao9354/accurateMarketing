/*
* @Author: Administrator
* @Date:   2017-06-12 15:00:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-19 19:54:27
*/

'use strict';
/**
 *  "checkRes" : "",                   // 判断校验是否通过
 *  "sendUserNum"                      // 客户群总数
	"isFilter" : "",    			   // 筛选数据	
	"filterCondition" : "",            // 筛选数据条件
	"filterConditionSql" : "",         // 二次筛选sql  			
	"marketingWords" : "",             // 营销话术
	"orderInvalidDate" : "",           // 工单有效期
	"touchRuleObj" : "",		       // 接触频次

	"managerDrawInfolist" : ""         // 工单下发规则列表
	"orderIssuedRule" : ""             // 工单下发规则
	"orderIssuedRuleType" : ""         // 工单下发规则的类型
	
	"newGroupId"                       // 经过二次筛选后的groupId
 */
datas.touches.cusMgr = $.extend({}, datas.touches.cusMgr, {
	"title" : "客户经理"               // 触点名称
});

// 客户经理触点的操作
var cusMgrWrap = $('#cusMgrWrapper'),                              // 客户经理最外层div
 	completedCusMgr;                                               // 已配完的客户经理数据对象

touchObj.cusMgr = {
	// 初始化
	init: function() {
		// 刷新用户数量
//		touchModUtil.refreshUserCount('cusMgr');

		// 加载筛选数据单选框
		touchModUtil.loadFilterRadio('filterRadio', cusMgrWrap);

		// 加载话术变量
		touchModUtil.loadWords('cusMgr');

		// 只有新增的时候初始化
		if(datas.touches.cusMgr == undefined || datas.touches.cusMgr.managerDrawInfolist == undefined) {
			// 加载工单下拉规则下拉框
			cusMgrObj.loadFirOrdRuleSel();
			cusMgrObj.loadSecOrdRuleSel();	
		}
					
	},

	// 确定
	confirmTouch: function() {
		var formObj = cusMgrWrap.find('#JForm');
		completedCusMgr = datas.touches.cusMgr;
		completedCusMgr.sendUserNum = cusMgrWrap.find('#userCount').text();         // 总用户数
		completedCusMgr.isFilter = cusMgrWrap.find('#filterRadio').prevAll('.hidden-inp').val();      // 筛选数据的已选项
		completedCusMgr.filterCondition = cusMgrWrap.find('#chooseCdt').val();    // 筛选条件
		completedCusMgr.filterConditionSql = cusMgrWrap.find('#filterConditionSql').val();    // 筛选条件sql
		completedCusMgr.marketingWords = touchModUtil.getWords(cusMgrWrap);     // 话术变量
		cusMgrWrap.find('#wordsInp').val(touchModUtil.getWords(cusMgrWrap)); 
		completedCusMgr.managerDrawInfolist = cmWorkOrderRuleData;     // 工单下发规则
		// debugger;
		completedCusMgr.orderInvalidDate = cusMgrWrap.find('#orderInvalidDate').val();   // 工单有效期
		completedCusMgr.touchRuleObj = cusMgrObj.getContactRules();   // 接触频次

		// 校验
		// if(form.isValidator(formObj)) {
		if(cusMgrObj.allCheck()) {
			layerUtil.alertMsg(1, '客户经理触点配置成功！');
			cusMgrWrap.hide();     // 客户经理触点隐藏
			$('.touchLinkWrap').show();     // 触点主页显示
			completedCusMgr.checkRes = 1;
			$('.touchLink[data-type="cusMgr"]').addClass('active');
			$('.touchLink[data-type="cusMgr"]').find('.checkbox').addClass('active');
			datas.selectedType.push('cusMgr');
		}else {
			completedCusMgr.checkRes = 0;
		}		
	}
};


// 客户经理页面的单选框、复选框、下拉框
var ruleCount = 0,
	cmWorkOrderRuleData = [],   // 用于存放工单下拉框数据
	cmWorkOrderRuleArr = [],    // 用于存放工单下拉框对象
	cmRuleClass, cmRuleType, cmRuleClassName, cmRuleTypeName,                // 工单下发规则分类
	cmRuleClassObj, cmRuleTypeObj        // 工单规则下拉框
var cusMgrObj = {
	// 工单下发规则下拉框
	loadFirOrdRuleSel : function() {
		var ruleHtml = '<li class="rules clearfix">'+
						'<div class="fl rule-select ruleClass'+ruleCount+'" data-idx="'+ruleCount+'"></div>'+
						'<span class="fl">按照</span>'+
						'<div class="fl rule-select ruleType'+ruleCount+'"></div>'+
						'<div class="fl rule-select rule-opt"><i class="delIcon"></i></div>'+
					'</li>';
		// 最多为10条规则
		var ruleLen = cusMgrWrap.find('.rules').length;
		if(ruleLen <= 10) {
			ruleCount ++;
			cusMgrWrap.find('#ruleWrapper').append(ruleHtml);
//			debugger;
		}else {
			layerUtil.alertMsg(3, '最多只能添加十条！');
		}
		// 至少需要配一条规则
		var ruleDel = cusMgrWrap.find(".delIcon");
		if (ruleDel.length == 1) ruleDel.hide();		
		if (ruleDel.length > 1) ruleDel.show();
		
		
		// 加载下拉框
		// 获取第一个工单下拉规则数据
		var ruleClassData = datas.DrawListStr;// eval('('+datas.DrawListStr+')');
		cmRuleClassObj = cusMgrWrap.find('.ruleClass'+(ruleCount-1)).triber_select({
			data : ruleClassData,
			onselect : function(data) {
				var idx = $(this).attr('data-idx');
				cmRuleClass = data;
				for(var i = 0; i < ruleClassData.length; i++) {
					if(ruleClassData[i].key == data) {
						cmRuleClassName = ruleClassData[i].text;					
						var ruleTypeData = ruleClassData[i].children;				
						// 加载第二个工单下拉规则
						cmRuleTypeObj = cusMgrWrap.find('.ruleType'+idx).triber_select({
							data : ruleTypeData,
							onselect: function(data) {
								cmRuleType = data;
								for(var i = 0; i < ruleTypeData.length; i++) {
									if(ruleTypeData[i].key == data) {
										cmRuleTypeName = ruleTypeData[i].text;
									}
								}
								cmWorkOrderRuleData.push({
									"orderIssuedRule": cmRuleClass,
									"orderIssuedRuleName": cmRuleClassName,
									"orderIssuedRuleType": cmRuleType,
									"orderIssuedRuleTypeName": cmRuleTypeName
								})
							}
						});
					}
				}
			}
		});

		cmWorkOrderRuleArr.push({
			"ruleClass" : cmRuleClassObj,
			"ruleType" : cmRuleTypeObj
		});

		// 删除一行规则
		cusMgrWrap.find('.delIcon').off('click').on('click', function() {
			var arrIdx = $(this).parents('.rules').index();
			$(this).parents('.rules').remove();
			cmWorkOrderRuleData.splice(arrIdx,1);
			cmWorkOrderRuleArr.splice(arrIdx,1);
			// 至少保留一条规则
			var ruleDel = cusMgrWrap.find(".delIcon");
			if (ruleDel.length == 1) ruleDel.hide();		
			if (ruleDel.length > 1) ruleDel.show();
		});
	},
	// 初始化第二个工单下发规则下拉框
	loadSecOrdRuleSel: function() {
		cmRuleTypeObj = cusMgrWrap.find('.ruleType'+(ruleCount-1)).triber_select({
			data : null
		}).on('click', function() {
			var iNow = $(this).parents('.rules').index(),
				ruleClsVal = cmWorkOrderRuleArr[iNow].ruleClass.getValue();
			if(typeof(ruleClsVal) == 'undefined') {
				layerUtil.alertMsg(3, '请先选择工单下发规则的类别！');
			}
		})
	},

	//  将接触规则存到数组中并返回该数组
	getContactRules: function() {
		var contactObj = {},
			contactArr = [],                // 接触频次数组;
			contactJson = {"times": cusMgrWrap.find('#touchLimitDay').val()};		
		contactArr.push(contactJson);
		contactObj.touchTimes = contactArr;
		return contactObj;
	},


	// 校验方法
	allCheck: function() {
		var chkResFlag = true;
		// 筛选条件
		if(completedCusMgr.isFilter == "1" && completedCusMgr.filterCondition == '') {
			layerUtil.alertMsg(3, '二次筛选条件不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 营销话术
		if(completedCusMgr.marketingWords == '') {
			layerUtil.alertMsg(3, '触点话术不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 工单规则
		if (cmWorkOrderRuleData.length < cmWorkOrderRuleArr.length) {
			debugger;
			layerUtil.alertMsg(3, '工单下发规则不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 有效期
		if(completedCusMgr.orderInvalidDate == '') {
			layerUtil.alertMsg(3, '触点工单有效期不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range(completedCusMgr.orderInvalidDate)) {
			layerUtil.alertMsg(3, '触点工单有效期只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 接触频次
		if(completedCusMgr.touchRuleObj.touchTimes[0].times != '' && !regUtil.range(completedCusMgr.touchRuleObj.touchTimes[0].times)) {
			layerUtil.alertMsg(3, '触点接触频次只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		return chkResFlag;
	}
};

// 客户经理回显数据的方法
if(datas.touches.cusMgr !== undefined) {
	var mgrEchoData = datas.touches.cusMgr;             // 本地短信数据回显
}
var cusMgrEchoObj = {
	// 客户经理回显
	setData: function() {
		// 回显普通表单数据
		touchEchoUtil.echoForm('cusMgr');
	
		// 筛选数据
		touchEchoUtil.echoFilterRadio('filterRadio', 'cusMgr', function(){});	
		// 营销话术
		touchEchoUtil.echoMarketingWords('cusMgr');
		
		// 工单划配下拉框
		cusMgrEchoObj.echoOrdRuleSel();
		
		// 工单有效期
		touchEchoUtil.echoForm('cusMgr','orderInvalidDate');
		
		// 接触频次
		touchEchoUtil.echoTouchRuleObj('cusMgr');
	},
	
	// 工单下拉规则回显
	echoOrdRuleSel: function() {
		if(mgrEchoData && mgrEchoData.managerDrawInfolist !== undefined) {
			var drawEchoInfo = mgrEchoData.managerDrawInfolist;
			for(var i = 0; i < drawEchoInfo.length; i++) {				
				// 加载工单下拉规则下拉框
				cusMgrObj.loadFirOrdRuleSel();
				cusMgrObj.loadSecOrdRuleSel();
				cmRuleClassObj.setValue(drawEchoInfo[i].orderIssuedRule);
				cmRuleTypeObj.setValue(drawEchoInfo[i].orderIssuedRuleType);
			}
		}
	},
};


$(function() {
	// 初始化客户经理触点
	touchObj.cusMgr.init();
	// 点击工单下拉规则新增规则
	cusMgrWrap.find('#addWorkOrderRule').on('click', function() {
		// 加载工单下拉规则下拉框
		cusMgrObj.loadFirOrdRuleSel();
		cusMgrObj.loadSecOrdRuleSel();
	})

	// 返回到触点主页
	touchModUtil.goBack(cusMgrWrap);
	
	// 客户经理回显数据
	cusMgrEchoObj.setData();
});