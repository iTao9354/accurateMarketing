/*
* @Author: Administrator
* @Date:   2017-06-12 15:13:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-19 19:54:22
*/

'use strict';
/**
 * "checkRes" : "",                    // 判断校验是否通过
 * "sendUserNum"                       // 客户群总数
	"isFilter" : "",    			   // 筛选数据	
	"filterCondition" : "",            // 筛选数据条件
	"filterConditionSql" : "",         // 筛选条件sql
	"groupSql" : "",                   // 客户群sql
	"marketingWords" : "",             // 营销话术
	"orderInvalidDate" : "",           // 工单有效期
	"touchRuleObj" : "",		       // 接触频次规则设置

	"smsGatewayCode" : ""              // 发送网关
	"testPhonenum" : "",               // 测试号码
	"marketingUrl" : "",               // 源地址      √
	"marketingUrlShort" : "",          // 短链接地址  √
	"smsNodisturbCode" : "",    	   // 免打扰编码  √
	"smsAlivePeriod"                   // 短信存活期
	"isSmsReply" : "",                 // 是否支持短信订购  √
	"smsEffectiveTime" : ""			   // 短信有效时间   √
	"produceReflist" : ""              // 短信订购筛选规则obj
	"filterCondition" : ""			   // 客户群三次筛选规则 √
	"filterConditionSql" : "",         // 三次筛选条件sql
 	"productName" : ""                 // 匹配产品名称   √
 	"productId" : ""                   // 匹配产品ID √
 	
 	"newGroupId"                       // 经过二次筛选后的groupId

 */

datas.touches.sms = $.extend({}, datas.touches.sms, {
	"title" : "本地短信"               // 触点名称
});

// 本地短信触点的操作
var smsWrap = $('#smsWrapper'),                                 // 本地短信最外层div
 	completedSms;                                               // 已配完的本地短信数据对象
touchObj.sms = {
	// 初始化
	init: function() {		
		// 刷新用户数量
//		touchModUtil.refreshUserCount('sms');
		// 加载筛选数据单选框
		touchModUtil.loadFilterRadio('filterRadio', smsWrap);

		// 加载话术变量
		touchModUtil.loadWords('sms');

		// 加载发送网关下拉框
		smsObj.loadGatewayCodeSel();

		// 加载是否支持短信订购单选框
		touchModUtil.loadFilterRadio('orderMsgRadio', smsWrap);
		
		// 只有新增的时候初始化
		if(datas.touches.sms == undefined || datas.touches.sms.isSmsReply == undefined) {
			// 加载支持短信订购的table筛选表格		
			smsObj.loadThirdFilterTbl('选择条件','',0);
			// 接触频次定义
			smsObj.loadContactTimes(1,30,0,0,7,1);
		}
		
	},

	// 确定
	confirmTouch: function() {
		// var formObj = $('#smsForm');
		completedSms = datas.touches.sms;
		completedSms.sendUserNum = smsWrap.find('#userCount').text();                    // 总用户数
		completedSms.isFilter = smsWrap.find('.hidden-inp[name="isFilter"]').val();      // 筛选数据的已选项
		completedSms.filterCondition = smsWrap.find('#chooseCdt').val();                 // 筛选条件
		completedSms.filterConditionSql = smsWrap.find('#filterConditionSql').val();     // 筛选条件sql
		completedSms.marketingWords = touchModUtil.getWords(smsWrap);                    // 话术变量
		smsWrap.find('#wordsInp').val(touchModUtil.getWords(smsWrap)); 
		completedSms.smsGatewayCode = gatewayCodeObj.getValue();             // 发送网关
		completedSms.testPhonenum = smsWrap.find('#testPhonenum').val();     // 测试号码
		completedSms.marketingUrl = smsWrap.find('#marketingUrl').val();     // 源地址
		completedSms.marketingUrlShort = smsWrap.find('#marketingUrlShort').val();     // 短链接
		completedSms.smsNodisturbCode = smsWrap.find('#smsNodisturbCode').val();       // 免打扰编码
		completedSms.smsAlivePeriod = smsWrap.find('#smsAlivePeriod').val();           // 短信存活期
		completedSms.isSmsReply = smsWrap.find('#orderMsgRadio').prev('.hidden-inp').val();      // 是否支持短信订购
		completedSms.smsEffectiveTime = smsWrap.find('#smsEffectiveTime').val();       // 短信有效时间
		completedSms.produceReflist = smsObj.getMsgOrdFilterCdt();        // 短信订购筛选条件                                             // 短信订购匹配产品的id
		completedSms.orderInvalidDate = smsWrap.find('#orderInvalidDate').val();   // 工单有效期
		completedSms.touchRuleObj = smsObj.getContactRules();                    // 接触频次规则

		// 校验
		if(smsObj.allCheck()) {
			layerUtil.alertMsg(1, '本地短信触点配置成功！');
			smsWrap.hide();     // 本地短信触点隐藏
			$('.touchLinkWrap').show();     // 触点主页显示
			completedSms.checkRes = 1;	
			$('.touchLink[data-type="sms"]').addClass('active');
			$('.touchLink[data-type="sms"]').find('.checkbox').addClass('active');
			datas.selectedType.push('sms');
		}else {
			completedSms.checkRes = 0;
		}	
	}
};

// 本地短信页面的单选框、复选框、下拉框
var matchSel,                           // 匹配产品下拉框对象
	smsMatchProductId,                  // 匹配产品的下拉框的id
	smsPhoneNum = smsWrap.find('#testPhonenum').val(),    // 手机号
	smsContactCount = 0,                // 定义计数器用来标记接触规则
	smsMatchProductArr = [],            // 只要匹配产品配置完成，变将表格该行的id存到该数组
	gatewayCodeObj;                     // 短信网关下拉框对象
var smsObj = {
	// 短信网关下拉框
	loadGatewayCodeSel: function() {
		var gatewayData = touchModUtil.remSelDefault(datas.smsGatewayListStr);
		gatewayCodeObj = smsWrap.find('#smsGatewayCode').triber_select({
			data : gatewayData,
			onselect : function(data) {
				$(this).prev('.hidden-inp').val(data);
			}
		});
	},
	// 测试手机号
	chkPhoneNum: function(phoneNum) {
		var showWordsRes = true;
		// 营销话术
		if(phoneNum == '') {
			layerUtil.alertMsg(3, '测试号码不能为空！');
			showWordsRes = false;
		}else if(!regUtil.testPhoneNum(phoneNum)) {
			layerUtil.alertMsg(3, '测试号码格式不符！');
			showWordsRes = false;
		}else {
			showWordsRes = true;			
		}
		return showWordsRes;
	},
	// 话术预览
	viewWords: function() {	
		smsWrap.find('#showWords').off('click').on('click', function() {
			var phoneNum = $(this).prevAll('#testPhonenum').val(),
				phoneNumChkRes = smsObj.chkPhoneNum(phoneNum);
			var wordsStr = touchModUtil.getWords(smsWrap);    // 话术内容
			// 营销话术
			if(phoneNumChkRes) {
				if(wordsStr !== undefined) {
					var wordsList = wordsStr.split(/\${(\S*?)}/);
				}
				var wordsCon = wordsList.join('');
				smsWrap.find("#wordsContext").html(wordsCon);
				layerUtil.openLayer(1, '话术', [ '350px', '220px' ], smsWrap.find("#verbalTrickLayer"));
			}
		})
	},
	// 发送测试
	sendTestPhone: function() {
		smsWrap.find('#sendTestSMS').off('click').on('click', function() {
			var phoneNum = $(this).prevAll('#testPhonenum').val(),
				phoneNumChkRes = smsObj.chkPhoneNum(phoneNum);
			// 营销话术
			if(phoneNumChkRes) {
				alert('开始测试！');
				// $.ajax({
				// 		url : webpath + 'skill/getWordsReplace',
				// 		type : 'GET',
				// 		dataType : "json",
				// 		data : {
				// 			phoneNumber : phoneNum,
				// 			sendContent : touchModUtil.getWords(smsWrap),
				// 			activityId : activityId
				// 		},
				// 		success : function(data) {
				// 				$.ajax({
				// 				url : webpath + 'skill/sendSMS?'
				// 						+ "deviceNumber=" + cm.testPhonenum
				// 						+ "&smsContent=" + data.changeContent,
				// 				type : 'GET',
				// 				dataType : "json",
				// 				success : function(data) {
				// 				}
				// 			});
				// 		}
				// 	});
				// }
			}
		})
	},

	// 测试url地址正确性
	testUrl: function() {
		smsWrap.find('#testURL').click(function() {
			var urlTxt = $(this).prevAll('#marketingUrl').val();
			if (urlTxt == '') {
				layerUtil.alertMsg(3, '请输入源地址值！');
			} else {
				layerUtil.openLayer(2, '链接测试', [ '600px', '500px' ], urlTxt);
			}
		});
	},
	// 合成短链接
	combineShortUrl: function() {
		smsWrap.find('#combineShortUrl').click(function() {
			var urlTxt = $(this).prevAll('#marketingUrl').val();
			if (urlTxt == '' || urlTxt.length > 100) {
				layerUtil.alertMsg(3, '源地址的长度需为大于0小于20！');
			} else {
				 $.ajax({
					url :'getUrlShort',
				 	type : 'GET',
				 	contentType : 'application/json;charset=UTF-8',
				 	data : "urlLong=" + urlTxt,
				 	dataType : "json",
				 	success : function(data) {
				 		$('#marketingUrlShort').val(data.urls[0].url_short);
				 	}
				 });
			}
		});
	},

	// 短信订购的table筛选表格
	loadThirdFilterTbl: function(filterCdt,filterCdtSql,userCount) {
		var thirdFilterTblData = [
			{"id": 0,"userFiterRule": filterCdt, "userCount": userCount, "matchProducts": null, "handler": null}
		];
		var table = $('#thirdFilterTbl').width('100%').dataTable({
			"columns":[
			            { "data": "userFiterRule", "width": "10%" },
			            { "data": "userFiterRule", "width": "26%" },
			            { "data": "userCount", "width": "22%" },
			            { "data": "matchProducts", "width": "32%" },
			            { "data": "handler", "width": "10%" }
			],
			"data": thirdFilterTblData,
			columnDefs: [
				// {
				// 	"targets":  0,   //操作按钮目标列
				// 	"render": function(data, type, row, meta) {
				// 		var startInx = meta.settings._iDisplayStart;
				// 		console.log(row);
				// 	  	return startInx + meta.row + 1;
				//     }
				// },
				{
					"targets": 1,
					"render": function(data, type, row) {
						var html = '';
						html = '<input type="hidden" class="hidden-inp" value="'+filterCdtSql+'" /><a href="javascript:;" class="text-ab" onclick="modules.toshift.setFilterCdt(3,this,\'sms\',modules.toshift.thirdFilter);">'+data+'</a>';
						return html;
					}
				},
				{
					"targets": 2,
					"render": function(data, type, row) {
						var html = '';
						html = data;
						return html;
					}
				},
				{
					"targets": 3,
					"className": "show-content",
					"render": function(data, type, row) {
						var html = '';
						smsMatchProductId = row.id;
						html += '<input type="hidden" name="productId" class="hidden-inp" /><div class="inTable-select" id="inTblSel'+smsMatchProductId+'" data-idx="'+smsMatchProductId+'"></div>';
//						debugger;
						return html;
					}
				},
				{
					"targets": 4,
					"data": null,
					"render": function(data, type, row) {
						var html = '';
						if(row.id == 0) {
							html = '<a href="javascript:;" class="text-ab" onclick="nonSharedMethod.smsAddThirdFilterRow(\'选择条件\',\'\',0);">增加</a>';
						}else {
							html += '<i class="iconfont inTable-delBtn" id="inTblDelBtn'+row.id+'" onclick="nonSharedMethod.smsRemThirdFilterRow(\''+row.id+'\');">&#xe614;</i>';
						}
						
						return html;
					}
				}
			],
			"paging": false,
			"serverSide" : false,
			"drawCallback": function(settings) {
				// 设置第0行序号
				this.api().column(0).nodes().each(function(ceil, i) {
					ceil.innerHTML = i + 1;
				})

				var lastMatchSelIdx = smsWrap.find('#thirdFilterTbl tbody > tr:last-child > td:eq(3) > input[name="productId"]').val();
				// 加载匹配产品下拉框
				var matchProduct = touchModUtil.remSelDefault(datas.productList);   // 全部产品
				var succProduct = datas.productIds.split(',');      // 匹配成功的产品
				var matchProArr = [];
				for(var i = 0; i < matchProduct.length; i++) {
					if(succProduct.contains(matchProduct[i].key)) {
						matchProArr.push(matchProduct[i]);
					}
				}
				matchSel = smsWrap.find('#inTblSel'+smsMatchProductId).triber_select({
					data : matchProArr,
					onselect : function(data) {
						$(this).prev('.hidden-inp').val(data);
						smsMatchProductArr.push($(this).attr('data-idx'));
					}
				});
				if(lastMatchSelIdx!==null&&lastMatchSelIdx!==""&&lastMatchSelIdx!==undefined){
					matchSel.setValue(lastMatchSelIdx);
				}
			}
		});
	},
	// 获取短信订购客户群筛选条件
	getMsgOrdFilterCdt: function() {
		var msgOrdArr = [];		
		smsWrap.find('#thirdFilterTbl tbody > tr').each(function(i) {
			var msgOrdObj = {};
			msgOrdObj.filterCondition = $(this).find('td:eq(1) > .text-ab').text();
			msgOrdObj.filterConditionSql = $(this).find('td:eq(1) > .hidden-inp').val();
			msgOrdObj.filteredNum = $(this).find('td:eq(2)').text();
			msgOrdObj.productId = $(this).find('td:eq(3) > input[name="productId"]').val();
			msgOrdArr.push(msgOrdObj);
		})
		return msgOrdArr;
	},


	// 接触频次定义
	loadContactTimes: function(sDate,eDate,sTime,eTime,times,space) {
		var contactHtml = '<li class="rules clearfix">'+
						'<div class="fl times-setting" data-idx="'+smsContactCount+'">'+
							'每月 <input type="text" class="form-control form-sm" name="sDate" value="'+sDate+'"> 日到 '+
							'<input type="text" class="form-control form-sm" name="eDate" value="'+eDate+'"> 日 '+
							'<input type="hidden" class="hidden-inp" name="sTime" />'+
							'<div class="rule-select" id="sTime'+smsContactCount+'"></div>时至 '+
							'<input type="hidden" class="hidden-inp" name="eTime" />'+
							'<div class="rule-select" id="eTime'+smsContactCount+'"></div>时， '+
							'共接触 <input type="text" class="form-control form-sm" name="times" value="'+times+'"> 次， '+
							'间隔<input type="text" class="form-control form-sm" name="space" value="'+space+'"> 天'+
						'</div>'+										
						'<div class="fl rule-select rule-opt"><i class="delIcon"></i></div>'+
					'</li>';
		// 最多配十条接触规则
		var ruleLen = smsWrap.find('#contactWrapper .rules').length;
		if(ruleLen <= 10) {
			smsContactCount ++;
			smsWrap.find('#contactWrapper').append(contactHtml);
		}else {
			layerUtil.alertMsg(3, '最多只能添加十条！');
		}
		// 至少保留一条接触规则
		var ruleDel = smsWrap.find('#contactWrapper .delIcon');
		if(ruleDel.length == 1) ruleDel.hide();
		if(ruleDel.length > 1) ruleDel.show();

		// 加载接触规则开始和结束时间下拉框
		smsObj.loadStartTimeSel(smsContactCount,sTime);
		smsObj.loadEndTimeSel(smsContactCount,eTime);
		
		
		// 内容过多时出现滚动条
		smsWrap.find('.times-setting .select_box ul').niceScroll({cursorcolor: '#ccc'});

		// 删除一行接触频次
		smsWrap.find('#contactWrapper .delIcon').off('click').on('click', function() {
			var idx = $(this).parents('.rules').index();
			$(this).parents('.rules').remove();
			smsObj.getContactRules().touchTimes.splice(idx, 1);
			
			// 至少保留一条接触规则
			var ruleDel = smsWrap.find('#contactWrapper .delIcon');
			if(ruleDel.length == 1) ruleDel.hide();
			if(ruleDel.length > 1) ruleDel.show();
		})		
	},
	// 接触规则开始时间下拉框
	loadStartTimeSel: function(count,sTime) {
		// 加载下拉框
		var timeArr = [];
		for(var i = 0; i < 24; i++) {
			var timeJson = {
				"key": i,
				"text": i
			};
			timeArr.push(timeJson);
		}
		// 开始时间
		var sTimeSel = smsWrap.find('#sTime'+(count-1)).triber_select({
			data : timeArr,
			onselect : function(data) {
				$(this).prev('.hidden-inp').val(data);
			}
		});
		sTimeSel.setValue(sTime);     // 设置默认值
	},
	// 接触规则结束时间下拉框
	loadEndTimeSel: function(count,eTime) {
		// 加载下拉框
		var timeArr = [];
		for(var i = 0; i < 24; i++) {
			var timeJson = {
				"key": i,
				"text": i
			};
			timeArr.push(timeJson);
		}
		// 开始时间
		var eTimeSel = smsWrap.find('#eTime'+(count-1)).triber_select({
			data : timeArr,
			onselect : function(data) {
				$(this).prev('.hidden-inp').val(data);
			}
		});
		eTimeSel.setValue(eTime);     // 设置默认值
	},

	// 将接触规则存到数组中并返回该数组
	getContactRules: function() {
		var contactObj = {},
			contactArr = [];                // 接触频次数组;
		smsWrap.find('.times-setting').each(function(i) {
			var selector = smsWrap.find('.times-setting').eq(i).find('input');
			var contactJson = {
				"sDate": selector.eq(0).val(),
				"eDate": selector.eq(1).val(),
				"sTime": selector.eq(2).val(),
				"eTime": selector.eq(3).val(),
				"times": selector.eq(4).val(),
				"space": selector.eq(5).val()
			};
			contactArr.push(contactJson);
		})
		contactObj.touchTimes = contactArr;
		return contactObj;
	},


	// 校验方法
	allCheck: function() {
		var chkResFlag = true;
		// 筛选条件
		if(completedSms.isFilter == 1 && completedSms.filterCondition == '') {
			layerUtil.alertMsg(3, '二次筛选条件不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 营销话术
		if(completedSms.marketingWords == '') {
			layerUtil.alertMsg(3, '触点话术不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 短信网关
		if(completedSms.smsGatewayCode == '') {
			layerUtil.alertMsg(3, '短信网关不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 测试号码
		if(completedSms.testPhonenum !== '' && !regUtil.testPhoneNum(completedSms.testPhonenum)) {
			layerUtil.alertMsg(3, '手机号码格式不正确！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 源地址   ps:此处是否需要先测试源地址再提交确认？？？？？
		if(completedSms.marketingUrl !== '' && !regUtil.testUrl(completedSms.marketingUrl)) {
			layerUtil.alertMsg(3, '源地址格式不正确！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 免打扰编码
		if(completedSms.smsNodisturbCode !== '' && !regUtil.maxLen(completedSms.smsNodisturbCode,10)) {
			layerUtil.alertMsg(3, '免打扰编码只能为0-10的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		
		// 短信存活期
		if(completedSms.smsAlivePeriod == '') {
			layerUtil.alertMsg(3, '短信存活期不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range780(completedSms.smsAlivePeriod)) {
			layerUtil.alertMsg(3, '短信存活期只能为1-780的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 短信订购
		var thirdFilTrLen = smsWrap.find('#thirdFilterTbl tbody > tr').length;
		if(completedSms.isSmsReply == 1) {
			// 短信有效时间
			 if(completedSms.smsEffectiveTime !== '' && !regUtil.range(completedSms.smsEffectiveTime)) {
			 	layerUtil.alertMsg(3, '短信有效时间只能为1-100的数字！');
			 	chkResFlag = false;
			 	return chkResFlag;
			 }
			// 匹配产品
			if(smsMatchProductArr.length < thirdFilTrLen) {
				layerUtil.alertMsg(3, '短信订购筛选表中匹配产品不能为空!');
				chkResFlag = false;
				return chkResFlag;
			}			
		}
		// 有效期
		if(completedSms.orderInvalidDate == '') {
			layerUtil.alertMsg(3, '触点工单有效期不能为空！');
			chkResFlag = false;
			return chkResFlag;
		}else if(!regUtil.range(completedSms.orderInvalidDate)) {
			layerUtil.alertMsg(3, '触点工单有效期只能为1-100的数字！');
			chkResFlag = false;
			return chkResFlag;
		}
		// 接触规则
		var contactResArr = smsObj.getContactRules().touchTimes;
		for(var i = 0; i < contactResArr.length; i++) {
			for(var name in contactResArr[i]) {
				var sTime = Math.floor(contactResArr[i].sTime), eTime = Math.floor(contactResArr[i].eTime),
					sDate = Math.floor(contactResArr[i].sDate), eDate = Math.floor(contactResArr[i].eDate);
				if(name == 'sTime' || name == 'eTime') {					
					if(sTime > eTime) {
						layerUtil.alertMsg(3, '触点接触的开始时间不能大于结束时间！');
						chkResFlag = false;
						return chkResFlag;
					}
				}else {
					if(contactResArr[i][name] == '') {
						layerUtil.alertMsg(3, '触点接触规则不能为空！');
						chkResFlag = false;
						return chkResFlag;
					}else {
						if(name == 'sDate' || name == 'eDate') {
							if(!regUtil.dateRange(contactResArr[i][name])) {
								layerUtil.alertMsg(3, '触点接触的开始日期和结束日期只能为1-31的数字！');
								chkResFlag = false;
								return chkResFlag;
							}
							if(sDate > eDate) {
								layerUtil.alertMsg(3, '触点接触的开始日期不能大于结束日期！');
								chkResFlag = false;
								return chkResFlag;
							}							
						}else if(name == 'space') {
							if(!regUtil.dateRange(contactResArr[i].space)) {
								layerUtil.alertMsg(3, '触点接触的间隔天数只能为1-31的数字！');
								chkResFlag = false;
								return chkResFlag;
							}
						}else {
							if(!regUtil.range(contactResArr[i][name])) {
								layerUtil.alertMsg(3, '触点接触频次只能为1-100的数字！');
								chkResFlag = false;
								return chkResFlag;
							}
						}						
					}					
				}				
			}
		}
		return chkResFlag;
	}
};

// 点击新增按钮，新增一行短信订购筛选规则
var count = 0;
nonSharedMethod.smsAddThirdFilterRow = function(filterCdt,filterCdtSql,userCount) {
	var thirdFilterTbl = smsWrap.find('#thirdFilterTbl').DataTable();
	count ++;
    thirdFilterTbl.row.add({
    	"id": count,"userFiterRule": filterCdt, "userCount": userCount, "matchProducts": null, "handler": null
    }).draw();
};
// 点击表格内的删除按钮，删除整行短信订购筛选规则
nonSharedMethod.smsRemThirdFilterRow = function(id) {
	var thirdFilterTbl = smsWrap.find('#thirdFilterTbl').DataTable();
	smsWrap.find('#inTblDelBtn'+id).parents('tr').addClass('selected');
	thirdFilterTbl.row('.selected').remove().draw();
	smsMatchProductArr.removeByValue(id);    // 同时剔除“匹配产品”下拉框所在行的id
};


//本地短信回显数据的方法
if(datas.touches.sms !== undefined) {
	var smsEchoData = datas.touches.sms;             // 本地短信数据回显
}
var smsEchoObj = {
	// 本地短信回显
	setData: function() {
		console.log(datas.touches);
		// 回显普通表单数据
		touchEchoUtil.echoForm('sms');
		
		// 筛选数据
		touchEchoUtil.echoFilterRadio('filterRadio', 'sms', function(){});	
		// 营销话术
		touchEchoUtil.echoMarketingWords('sms');
		
		// 回显短信网关下拉框
		smsEchoObj.echoGatewayCode();
		
		// 支持短信订购
		touchEchoUtil.echoFilterRadio('orderMsgRadio', 'sms', function(){
			// 加载支持短信订购的table筛选表格
			var smsEchoList = smsEchoData.produceReflist;
			console.log(smsEchoList);			
			for(var i = 0; i < smsEchoList.length; i++) {
				if(smsEchoList[i].filterCondition && smsEchoList[i].filterConditionSql && smsEchoList[i].filteredNum && smsEchoList[i].productId) {
				
					if(i <= 0) {
						smsObj.loadThirdFilterTbl(smsEchoList[0].filterCondition,smsEchoList[0].filterConditionSql,smsEchoList[0].filteredNum,smsEchoList[0].productId);
					}else {
						nonSharedMethod.smsAddThirdFilterRow(smsEchoList[i].filterCondition,smsEchoList[i].filterConditionSql,smsEchoList[i].filteredNum,smsEchoList[i].productId);
					}
					matchSel.setValue(smsEchoList[i].productId);    // 为匹配产品下拉框赋值
				}
			}			
		});	
		
		// 接触频次
		touchEchoUtil.echoTouchRuleObj('sms');
	},
	
	// 回显短信网关下拉框
	echoGatewayCode: function() {
		var gatewayEchoCode = smsEchoData.smsGatewayCode;
		gatewayCodeObj.setValue(gatewayEchoCode)
	}
};

// 采用一个方法中转一下方法loadContactTimes()为了可以在index.js中访问到
nonSharedMethod.loadEchoContactTimes = function(sDate,eDate,sTime,eTime,times,space) {
	// 添加接触频次规则
	smsObj.loadContactTimes(sDate,eDate,sTime,eTime,times,space);
};


$(function() {
	// 初始化本地短信触点
	touchObj.sms.init();

	// 话术预览
	smsObj.viewWords();
	// 发送测试
	smsObj.sendTestPhone();

	// 测试url地址正确性
	smsObj.testUrl();
	// 合成短链接
	smsObj.combineShortUrl();
	

	// 鼠标划入显示提示框	
	var tipsArr = [
		"话术变量中的'产品名称'以及'订购编码'在保存配置后才可获得，在话术预览中无法展现真实数据，仍以${产品名称}，${订购编码}展现",
		"客户回复此编码进入免打扰列表"
	];	
	layerUtil.showTips(smsWrap, '.common-inquiry', tipsArr);

	// 新增接触频次
	smsWrap.find('#addContactTimes').off('click').on('click', function() {
		smsObj.loadContactTimes(1,30,0,0,7,1);
	})

	// 返回到触点主页
	touchModUtil.goBack(smsWrap);
	
	
	//本地短信回显数据
	smsEchoObj.setData();
});