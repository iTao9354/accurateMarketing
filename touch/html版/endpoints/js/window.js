/*
* @Author: Administrator
* @Date:   2017-06-12 15:13:17
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-19 19:54:50
*/

'use strict';
/**
 * "checkRes" : "",                    // 判断校验是否通过
 * "sendUserNum"                       // 客户群总数
 * "isFilter" : "",    			       // 筛选数据	
	"filterCondition" : "",            // 筛选数据条件
	"filterConditionSql" : "",         // 二次筛选sql  			
	"marketingWords" : "",             // 营销话术
	"orderInvalidDate" : "",           // 工单有效期
	"touchRuleObj" : "",      	       // 接触频次

	"serviceChannel" : "",             // 服务渠道
	"userDescription" : "",            // 用户状态
	"sellTarget" : "",                 // 营销目标
	"startTime" : "",                  // 生效时间
	"endTime" : "",                    // 失效时间
	"sendLevel" : "",                  // 优先级
	"dayWinLimit" : ""                 // 日弹窗次数设置
	
	"newGroupId"                       // 经过二次筛选后的groupId
 */
datas.touches.win = $.extend({}, datas.touches.win, {
	"title" : "本地弹窗"               // 触点名称
});

// 本地弹窗触点的操作
var winWrap = $('#winWrapper'),                               // 本地弹窗最外层div
 	completedWin;                                             // 已配完的本地弹窗数据对象
touchObj.win = {
	// 初始化
	init: function() {
		// 刷新用户数量
//		touchModUtil.refreshUserCount('win');
		
		// 加载筛选数据单选框
		touchModUtil.loadFilterRadio('filterRadio', winWrap);

		// 服务渠道复选框
		winObj.loadServeChannelChk();

		// 加载话术变量
		touchModUtil.loadWords('win');
	},

	// 确定
	confirmTouch: function() {		
		// var formObj = $('#cusMgrForm');
		completedWin = datas.touches.win;
		completedWin.sendUserNum = winWrap.find('#userCount').text();               // 总用户数
		completedWin.isFilter = winWrap.find('#filterRadio').prevAll('.hidden-inp').val();      // 筛选数据的已选项
		completedWin.filterCondition = winWrap.find('#chooseCdt').val();           // 筛选条件
		completedWin.filterConditionSql = winWrap.find('#filterConditionSql').val();    // 筛选条件sql
		completedWin.serviceChannel = winObj.getServeChannelVal();                 // 服务渠道的已选项
		completedWin.userDescription = winWrap.find('#userDescription').val();     // 用户状态
		completedWin.sellTarget = winWrap.find('#sellTarget').val();               // 营销目标
		completedWin.marketingWords = touchModUtil.getWords(winWrap);              // 话术变量
		winWrap.find('#wordsInp').val(touchModUtil.getWords(winWrap)); 
		completedWin.startTime = winWrap.find('#startTime').val();                 // 生效时间
		completedWin.endTime = winWrap.find('#endTime').val();                     // 失效时间
		completedWin.sendLevel = winWrap.find('#sendLevel').val();                 // 优先级
		completedWin.orderInvalidDate = winWrap.find('#orderInvalidDate').val();   // 工单有效期
		completedWin.touchRuleObj = winObj.getContactRules();                         // 接触频次
		
		// 校验
		if(winObj.allCheck()) {
			layerUtil.alertMsg(1, '本地弹窗触点配置成功！');
			winWrap.hide();     // 本地弹窗触点隐藏
			$('.touchLinkWrap').show();     // 触点主页显示
			completedWin.checkRes = 1;
			$('.touchLink[data-type="win"]').addClass('active');
			$('.touchLink[data-type="win"]').find('.checkbox').addClass('active');
			datas.selectedType.push('win');
		}else {
			completedWin.checkRes = 0;
		}		
	}
};

// 本地弹窗页面的单选框、复选框、下拉框
var serveChannelChkObj;      // 服务渠道复选框
var winObj = {
	// 服务渠道复选框
	loadServeChannelChk: function() {
		var serveChannelData = touchModUtil.remSelDefault(datas.serviceChannelListStr);
		serveChannelChkObj = winWrap.find("#serveChannelChk").triber_checkbox({
			data: serveChannelData,
			onclick: function(data){
				// return data;
			}
		});
		serveChannelChkObj.setValue(winObj.getServeChannelVal());
	},
	// 获取服务渠道已选项
	getServeChannelVal: function() {
		return serveChannelChkObj.getValue();
	},

	//  将接触规则存到数组中并返回该数组
	getContactRules: function() {
		var contactObj = {},
			contactArr = [],                // 接触频次数组;
			contactJson = {"times": winWrap.find('#touchLimitDay').val()};		
		contactArr.push(contactJson);
		contactObj.touchTimes = contactArr;
		contactObj.dayWinLimit = winWrap.find('#dayWinLimit').val();
		return contactObj;
	},

	// 校验方法
	allCheck: function() {
		var chkResFlag = true;
		// 筛选条件
		if(completedWin.isFilter == 1 && completedWin.filterCondition == '') {
			layerUtil.alertMsg(3, '二次筛选条件不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 服务渠道
		if(completedWin.serviceChannel.length == 0) {
			layerUtil.alertMsg(3, '服务渠道不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 用户状态
		if(completedWin.userDescription !== '' && !regUtil.maxLen(completedWin.userDescription,10)) {
			layerUtil.alertMsg(3, '用户状态最大字数不能超过100个！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 营销目标
		if(completedWin.sellTarget == '') {
			layerUtil.alertMsg(3, '营销目标不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.maxLen(completedWin.sellTarget,10)) {
			layerUtil.alertMsg(3, '营销目标最大字数不能超过100个！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 营销话术
		if(completedWin.marketingWords == '') {
			layerUtil.alertMsg(3, '触点话术不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 生效时间
		if(completedWin.startTime == '') {
			layerUtil.alertMsg(3, '生效时间不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 失效时间
		if(completedWin.endTime == '') {
			layerUtil.alertMsg(3, '失效时间不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 优先级
		if(completedWin.sendLevel == '') {
			layerUtil.alertMsg(3, '优先级不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range99(completedWin.sendLevel)) {
			layerUtil.alertMsg(3, '优先级只能为0-99的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 有效期
		if(completedWin.orderInvalidDate == '') {
			layerUtil.alertMsg(3, '触点工单有效期不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range(completedWin.orderInvalidDate)) {
			layerUtil.alertMsg(3, '触点工单有效期只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 日弹窗次数
		if(completedWin.touchRuleObj.dayWinLimit == '') {
			layerUtil.alertMsg(3, '日弹窗次数不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range(completedWin.touchRuleObj.dayWinLimit)) {
			layerUtil.alertMsg(3, '日弹窗次数只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 接触频次
		if(completedWin.touchRuleObj.touchTimes[0].times != '' && !regUtil.range(completedWin.touchRuleObj.touchTimes[0].times)) {
			layerUtil.alertMsg(3, '触点接触频次只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		return chkResFlag;
	}
};


//本地弹窗回显数据的方法
if(datas.touches.win !== undefined) {
	var winEchoData = datas.touches.win;             // 本地弹窗数据回显
}
var winEchoObj = {
	// 本地弹窗回显
	setData: function() {
		// 回显普通表单数据
		touchEchoUtil.echoForm('win');
		
		// 筛选数据
		touchEchoUtil.echoFilterRadio('filterRadio', 'win', function(){});	
		// 营销话术
		touchEchoUtil.echoMarketingWords('win');
		
		// 服务渠道复选框
		winEchoObj.echoServeChannelData();
		
		// 接触频次
		touchEchoUtil.echoTouchRuleObj('win');
	},
	
	// 服务渠道复选框回显
	echoServeChannelData: function() {
		if(winEchoData && winEchoData.serviceChannel !== undefined) {
			var serveEchoChannel = winEchoData.serviceChannel,
				serveEchoChannelArr = eval('('+serveEchoChannel+')');
			serveChannelChkObj.setValue(serveEchoChannelArr);
		}		
	}
};

$(function() {
	// 初始化本地弹窗触点
	touchObj.win.init();

	// 返回到触点主页
	touchModUtil.goBack(winWrap);
	
	// 本地弹窗回显
	winEchoObj.setData();
});