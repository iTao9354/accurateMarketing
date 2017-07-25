/*
* @Author: Administrator
* @Date:   2017-06-09 14:31:15
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-28 14:42:25
*/

'use strict';
//内存模型
var datas = {
	// 活动id
	"activityId" : function(){
		return $('#activityId').val()
	}(),
	// 向后台提供参数，返回用户数
	"params": {
		// 组织机构
		"orgPath" : function(){
			return $('#orgRange').val();
		}(),
		// 客户群id
		"groupId" : function(){
			return $('#cmGroupId').val();
		}()
	},
	// 由成功标准配成功的产品id
	"productIds" : function(){
		return $('#productIds').val();
	}(),

	// 已点亮的触点的type的集合
	"selectedType" : [],

	// 各个触点配置完成后的数据
	"touches": {}
};

// 触点数据
datas.config = [
	{
		"width": 2,
		"title": "客户经理",
		"type": "cusMgr",
		"status": 1,
		"iconSm": "/cusMgr.png",
		"iconMd": "/phone.png",
		"url": "mgrPage"
	},
	{
		"width": 1,
		"title": "本地短信",
		"type": "sms",
		"status": 1,
		"iconSm": "/SMS.png",
		"iconMd": "/phone.png",
		"url" : "smsPage"
	},
	{
		"width": 2,
		"title": "本地弹窗",
		"type": "win",
		"status": 1,
		"iconSm": "/cusMgr.png",
		"iconMd": "/window_md.png",
		"url" :  "winPage"
	},
	{
		"width": 1,
		"title": "维系挽留",
		"type": "maintain",
		"status": 0,
		"iconSm": "/cusMgr.png",
		"iconMd": "/phone.png"
	}
];

	

;$(function() {
	// 初始化触点主页
	touchObj.index.init();
	$('body').niceScroll({cursorcolor : "#ccc", cursorwidth : "10"});
	
	// 初始化完成后调活动的方法，通知活动开始进行配置
	modules.activity.completeInitToAct();
	
	// 回显触点主页状态
	touchEchoUtil.echoTouchHome();
});


// 定义一个大对象，用于存放触点主页模板和各个触点模块
var touchObj = {};
//模板
touchObj.template = function(obj){
	var useCls = '',
		icon;   // 图标
	// 判断状态是否可用
	if(obj.status == 1) {
		useCls = 'available';
		icon = obj.iconSm;
	}
	else { 
		useCls = '';
		icon = obj.iconMd;
	}

	// 初始化每个触点的用户数			
	var html = '<div class="touchLink '+useCls+' width'+obj.width+'" data-type="'+obj.type+'">'+
					'<img src="images/'+icon+'" class="touch-icon">'+
					'<div class=" ptitle" onclick="touchObj.index.fnClick(\''+obj.type+'\', \''+obj.url+'\');">'+
						'<span class="touch-title">'+obj.title+'</span>'+
						'<p class="user-count">'+
							'<span title="0" class="count">0</span><i>(户)</i>'+
						'</p>'+
						'<p class="building">'+
							'<span>( 正在建设中... )</span>'+
						'</p>'+
					'</div>'+
					'<a class="checkbox" href="javascript:touchObj.index.chkkBoxClick(\''+obj.type+'\');" data-value="0"></a>'+
				'</div>';
	return html;
};


// 主页
touchObj.index = {
	// 初始化
	init: function() {
		for(var i = 0; i < datas.config.length; i++) {
			var html = touchObj.template(datas.config[i]),
			 	status = datas.config[i].status,
			 	type = datas.config[i].type,
			 	url = datas.config[i].url;
			$('#touchWrapper').append(html);
			if(status == 1) {
				$('.content').append('<div class="noElement" id="'+type+'Wrapper"></div>');
				$('#'+type+'Wrapper').load(url);
			}			
		}
	},
	

	// 点击每个触点: type为触点类型，url为触点页面链接
	fnClick: function(type, url) {
		var obj = $('.touchLink[data-type="'+type+'"]');
		if(obj.hasClass('available')) {
			$('.touchLinkWrap').hide();     // 触点主页隐藏
			$('#'+type+'Wrapper').show();   // 相应的触点页面显示，并加载内容
			// 本地短信触点用户数
			modules.toshift.getUserCount(type);
			if(type == 'sms') {
				modules.activity.forbidFilter($('#smsWrapper'));				
			}
		}		
	},

	// 点击每个触点的复选框
	chkkBoxClick: function(type) {
		var obj = $('.touchLink.available[data-type="'+type+'"]');
		// 判断某个触点是否点亮：未点亮，则将其点亮；已点亮，则要判断点亮个数，如果为1，再点击后则不可取消点亮
		if(obj.hasClass('active')) {			
			obj.removeClass('active').find('.checkbox').removeClass('active');
			datas.selectedType.removeByValue(type);
		}else {
			obj.addClass('active').find('.checkbox').addClass('active');
			datas.selectedType.push(type);
		}	
	}
};


// layer弹出层公用方法
var layerUtil = {
	/**
	 * msg提示信息:
	 * type 0失败，1成功，3警告
	 * msg 提示信息
	 */
	alertMsg: function(type, msg) {
		try{
			parent.window.openLayerUtils(msg, 1000, type);
		}catch(err) {
			layer.msg(msg, {
				icon : type,
				time : 1000
			})
		}		
	},

	/**
	 * tips提示信息	 * 
	 */
	showTips: function(touchWrap, selector, tipArr) {
		var index;
		touchWrap.find(selector).hover(function() {
			var idx = $(this).attr('data-tips');
			index = layer.tips(tipArr[idx], this, {
				tips: [2, '#fbfbd6'],
				time: 0
			}); 
		}, function() {
			layer.close(index);
		})
		 
	},

	/**
	 * 普通弹出层：
	 * type     1 dom元素  2
	 * title    弹出层标题
	 * size     弹出层大小
	 * content  弹出层内容
	 */
	openLayer: function(type, title, size, content) {
		layer.open({
			type : type,
			title : title,
			area : size,
			content : content
		});
		// 内容过多时出现滚动条
		layerScroll();
	},
	openMaxLayer: function(type, title, size, content, fnConfirm) {
		layer.open({
			type : type,
			title : title,
			area : size,
			content : content,
			success : function(layero, index) {
				$(' .layui-layer-min').addClass("noElement"); // 弹出窗最小化隐藏
				layer.full(index);
			},
			btn: [ '确认', '取消' ],
			btn1: function(index, layero) {
				fnConfirm(index, layero);
				layer.close(index);
			},
			btn2: function(index, layero) {
				layer.close(index);
			}
		});
		// 内容过多时出现滚动条
		layerScroll();
	}
};

// 正则表达式
var regUtil = {
	// 只能为纯数字
	digit: function(str) {
		var reg = /^\d+$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	// 只能为1-100的纯数字
	range: function(str) {
		var reg = /^([1-9]\d?|100)$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	// 只能为0-99的纯数字
	range99: function(str) {
		var reg = /^([0-9]\d?)$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	range10: function(str) {
		var reg = /^([0-9]|10)$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	range600: function(str) {
		var reg = /^([0-9]|10)$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	range780: function(str) {
		var reg = /^([1-6](\d{1,2})?|[7-9]\d?|7[0-7]\d|780)$/;
		return reg.test(str.replace(/\s+/g,''));
	},
	// 日期不能超过31号
	dateRange: function(str) {
		var reg = /^([1-2]\d?|[3-9]|3[0-1])$/;
		return reg.test(str.replace(/\s+/g,''));
	},

	// 手机号
	testPhoneNum: function(str) {
		var reg = /^1[3-9]\d{9}$/;
		return reg.test(str.replace(/\s+/g,''));
	},

	// 最大字数不能超过i
	maxLen: function(str,i) {
		var reg = new RegExp('^.{1,'+i+'}$');
		return reg.test(str);
	},

	// 源地址
	testUrl: function(str) {
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)" 
		  + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
		  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
		  + "|" // 允许IP和DOMAIN（域名）
		  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
		  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
		  + "[a-z]{2,6})" // first level domain- .com or .museum 
		  + "(:[0-9]{1,4})?" // 端口- :80 
		  + "((/?)|" // a slash isn't required if there is no file name 
		  + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    	var re=new RegExp(strRegex);
    	return re.test(str);
	}
};


// 触点模块的公用子方法
var touchModUtil = {
	// 刷新用户数
	refreshUserCount: function(type) {
		var touchWrap = $('#'+type+'Wrapper');
		touchWrap.find('#userRefresh').off('click').on('click', function() {
			modules.toshift.getUserCount(type);
		})
	},

	// 筛选数据单选框
	loadFilterRadio : function(id, touchWrap) {
		// 初始化为0
		touchWrap.find("#"+id).prev('.hidden-inp').val(0);
		touchWrap.find("#"+id).triber_radiobox({
			data : [ {
				key : "1",
				text : "是"
			}, {
				key : "0",
				text : "否",
				selected : true
			} ],
			onclick : function(data) {
				// 给input框赋值
				$(this).prev('.hidden-inp').val(data);
				if (data == 1) {
					$(this).next('.secondLayer').slideDown();
				} else {
					$(this).next('.secondLayer').slideUp();
				}
			}
		});
	},


	// 动态获取营销话术变量并添加话术内容
	loadWords: function(type) {
		var wordsList = datas.wordsListStr,    // 从后台获取的所有触点的话术变量集合
			touchWrap = $('#'+type+'Wrapper');
		var wordsVarisArr = [];
		for(var i = 0; i < wordsList.length; i++) {
			var touchType = wordsList[i].skillType;
			if(touchType == type) {
				wordsVarisArr.push(wordsList[i].wordsName);
			}			
		}
		for(var i = 0; i < wordsVarisArr.length; i++) {
			touchWrap.find('#wordsVariable').append('<p><span>'+wordsVarisArr[i]+'</span></p>');
		}		
		// 配置话术内容
		touchWrap.find('#wordsVariable > p').on('click', function() {
			var words = $(this).children().html();
			touchModUtil.insertWords(touchWrap, words);		
		})
	},
	// 向div里插入话术内容
	insertWords: function(touchWrap, words) {
		touchWrap.find('#wordsContent').append('<span contenteditable="false">'+
				'<i class="icon iconfont deValue">&#xe614;</i>'+
				'<span contenteditable="false">'+words+'</span>'+
			'</span>');	
		// touchWrap.find('#wordsContent > span').after(' ');
		// 删除话术描述里面的值
		touchWrap.find('.deValue').on('click', function(e){
            touchModUtil.deletValue(this); 
		})
	},
	// 删除话术描述里面的值
	deletValue: function(obj) {
		$(obj).parent().remove();
	},
	// 获取营销话术文本内容
	getWords: function(touchWrap) {
		var wordsTxt = touchWrap.find('#wordsContent').text();
		// 去掉多余部分
		var strRegex = "";
		var re = new RegExp(strRegex, "g");
		return wordsTxt.replace(re, "");
	},
	
	// 去掉下拉框中的“请选择”默认值
	remSelDefault: function(arr) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].key == 0) {
				arr.splice(i,1);
			}
		}
		return arr;
	},


	// 返回到主页
	goBack: function(touchWrap) {
		touchWrap.find('#backBtn').off('click').on('click', function() {
			touchWrap.hide();     // 客户经理触点隐藏
			$('.touchLinkWrap').show();     // 触点主页显示
		})
	}
};


//触点模块的公用的回显子方法
var touchEchoUtil = {
	// 回显主页状态
	echoTouchHome: function() {
		var echoData = datas.touches;
		for(var name in echoData) {
			if(echoData[name].isFilter !== undefined) {
				$('.touchLink[data-type="'+name+'"]').addClass('active');
				$('.touchLink[data-type="'+name+'"]').find('.checkbox').addClass('active');
				echoData[name].checkRes = 1;
				datas.selectedType.push(name);
			}
		}
		// 默认选中客户经理
//		$('.touchLink[data-type="cusMgr"]').addClass('active');
//		$('.touchLink[data-type="cusMgr"]').find('.checkbox').addClass('active');
	},
	
	// 普通的input框回显，如工单有效期等
	echoForm: function(type) {
		if(datas.touches[type] !== undefined) {
			var touchWrap = $('#'+type+'Wrapper'),
				echoData = datas.touches[type],
				formObj = touchWrap.find('#JForm');
			form.load(formObj, echoData);
		}		
	},
	
	// 筛选数据
	echoFilterRadio: function(id, type, fnCallback) {
		if(datas.touches[type] && datas.touches[type].isFilter !== undefined) {
			var echoData = datas.touches[type],
				filterEchoVal = echoData.isFilter,
				touchWrap = $('#'+type+'Wrapper'),
				filterRadioEle = touchWrap.find('#'+id);
			filterRadioEle.children('.radio').removeClass('active');
			filterRadioEle.children('.radio[value="'+filterEchoVal+'"]').addClass('active');
			if(filterEchoVal == 1) {
				filterRadioEle.next('.secondLayer').slideDown();
				// 回显条件和sql
				fnCallback(type, touchWrap, echoData);
			}else {
				filterRadioEle.next('.secondLayer').slideUp();
			}
		}		
	},
	
	// 营销话术
	echoMarketingWords: function(type) {
		if(datas.touches[type] && datas.touches[type].marketingWords!== undefined) {
			var echoData = datas.touches[type],
				echoWords = echoData.marketingWords,
				touchWrap = $('#'+type+'Wrapper');
			touchWrap.find('#wordsInp').val(echoWords);
			touchEchoUtil.markEchoWords(echoWords, touchWrap);
		}		
	},
	// 将营销话术内容中的变量带上标记
	markEchoWords: function(words, touchWrap) {
		if(words !== undefined) {
			var wordsList = words.split(/\${(\S*?)}/);
			for(var i = 0; i < wordsList.length; i++) {
				if (i % 2) {
					touchModUtil.insertWords(touchWrap, '${'+wordsList[i]+'}');				
				} else {
					touchWrap.find('#wordsContent').append(wordsList[i]);
				}
			}
		}
		// 内容过多时出现滚动条
		touchWrap.find('#wordsContent').niceScroll({cursorcolor : "#ccc", cursorwidth : "3"});
	},	
	
	// 接触规则回显
	echoTouchRuleObj: function(type) {
		if(datas.touches[type] && datas.touches[type].touchRuleObj !== undefined) {
			var touchEchoRuleObj = datas.touches[type].touchRuleObj,
				touchWrap = $('#'+type+'Wrapper'),
				formObj = touchWrap.find('#JForm');
			// 接触频次
			if(touchEchoRuleObj.touchTimes !== undefined) {
				var touchEchoRule = touchEchoRuleObj.touchTimes;
				if(touchEchoRule[0].sDate == undefined) {
					form.load(formObj, touchEchoRule[0]);
				}else {
					for(var i = 0; i < touchEchoRule.length; i++) {						
						nonSharedMethod.loadEchoContactTimes(touchEchoRule[i].sDate,touchEchoRule[i].eDate,touchEchoRule[i].sTime,touchEchoRule[i].eTime,touchEchoRule[i].times,touchEchoRule[i].space);						
					}
				}
			}			
			// 日弹窗次数设置
			if(touchEchoRuleObj.dayWinLimit !== undefined) {
				form.load(formObj, touchEchoRuleObj);
			}
		}		
	}
};


// 非公用的方法集合，之所以放此处，是为了在子页面的html上能调到
var nonSharedMethod = {};


