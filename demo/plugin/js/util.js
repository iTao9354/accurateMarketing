/**
 *姚林刚
 *常用操作工具方法
 */
;(function(window){
	window.util = t_util = {};
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    t_util.PROJECT_NAME=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    
    t_util.BASE_PATH = localhostPaht+t_util.PROJECT_NAME;
    
    /**
     * 动态加载css文件
     * 金术静
     */
	function loadDynamicStyles(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}
	t_util.loadDynamicStyles = loadDynamicStyles;
	/**
	 * 动态加载js文件
	 * 金术静
	 */
	function loadDynamicJavascript(url) {
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src = url;
	    document.getElementsByTagName("head")[0].appendChild(script);
	}
	t_util.loadDynamicJavascript = loadDynamicJavascript;
	/**
	 * 为请求字符串添加随机码，处理ie中请求只访问一次的问题
	 * @author 姚林刚
	 * @param url 需要处理的URL
	 */
	function warpRandom(url){
		if(url){
			if(/\?+/.test(url)){
				url = url+"&math="+Math.random();
			}else{
				url = url+"?math="+Math.random();
			}
			return url;
		}
		return null;
	}
	t_util.warpRandom = warpRandom;
	/**
	 * 日期解析为字符串
	 * @author 姚林刚
	 * @param date 要解析的日期
	 */
	function dateFormatter(date){
		if(typeof(date) !="undefined" && date != null){
			if(date instanceof Date){
				var y = date.getFullYear();
				var m = date.getMonth()+1;
				var d = date.getDate();
				return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
			}else if(typeof(date) == "number" || typeof(date) == "string"){
				var value = date+"";
				var date1 = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
                //月份为0-11，所以+1，月份小于10时补个0       
                var month = date1.getMonth() + 1 < 10 ? "0" + (date1.getMonth() + 1) : date1.getMonth() + 1;
                var currentDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate();
                return date1.getFullYear() + "-" + month + "-" + currentDate;
			}else{
				return "";
			}			
		}		
	}
	t_util.dateFormatter = dateFormatter;
	/**
	 * 字符串解析为日期
	 * @author 姚林刚
	 * @param s 要解析的日期字符串
	 */
	function dateParser(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	}
	t_util.dateParser = dateParser;
	/**
	 * 时间解析为字符串
	 * @author 姚林刚
	 * @param 要解析的时间
	 */
	function datetimeFormatter(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		var h = date.getHours();
		var mm = date.getMinutes();
		var s = date.getSeconds();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+(mm<10?('0'+mm):mm)+':'+(s<10?('0'+s):s);
	}
	t_util.datetimeFormatter = datetimeFormatter;
	/**
	 * 字符串解析为时间
	 * @author 姚林刚
	 * @param s 要解析的时间字符串
	 */
	function datetimeParser(s){
		if (!s) return new Date();
		var d = s.split(' ');
		var ss = d[0].split("-");
		var dd = d[1].split(":");
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		var h = parseInt(dd[0],10);
		var mm = parseInt(dd[1],10);
		var si = parseInt(dd[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)&&!isNaN(h) && !isNaN(mm) && !isNaN(si)){
			return new Date(y,m-1,d,h,mm,si);
		} else {
			return new Date();
		}
	}
	t_util.datetimeParser = datetimeParser;
	
	//数字分割方法,将数字切割为三位一组，用，号隔开
	function formatNum(strNum) {
		var result = '';
		if (strNum.length <= 3) {
			return strNum;
		}
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			return strNum;
		}
		var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
		var re = new RegExp();
		re.compile("(\\d)(\\d{3})(,|$)");
		while (re.test(b)) {
			b = b.replace(re, "$1,$2$3");
		}
		result =  a + "" + b + "" + c;
		return result;
	}
	t_util.formatNum = formatNum;
	/**
	 * esayUI数据表格组件
	 * @author 姚林刚
	 * @param selected 用jquery选择器选择的用于渲染的datagrid组件
	 * @param tbselected 表格组件逐渐
	 * @param column 列数据
	 * @param url 数据连接地址
	 * @param title 表格标题
	 * @param msg 提示信息
	 * @param noPage 是否分页 true表示无分页
	 * @param data 其他参数，为对象
	 */
	function dataGrid(selected,tbselected,column,url,title,msg,noPage,data,pageParam){
		if(noPage){
			var param = {
					url:url,
				    autoRowHeight:true,//自动行高
				    striped:true,//隔行换色
				    columns:column,
					fitColumns:true,//自适应列宽
			 		fit:true,//自适应宽高
			 		border:true,  //是否有外边框
					scrollbarSize:0,
			    	rownumbers:true, //是否显示行号
			    	singleSelect:true,//设置选择单行
			    	title:title,
					msg:msg,
					top:50,
					toolbar:tbselected,
					showType:'show'
				};
			$.extend(param,data);
			var dg = $(selected).datagrid(param);
			return dg;
		}else{
			var param = {
					url:url,
				    autoRowHeight:true,//自动行高
				    striped:true,//隔行换色
				    columns:column,
					fitColumns:true,//自适应列宽
			 		fit:true,//自适应宽高
			 		pagination:true,
			 		border:true,  //是否有外边框
					scrollbarSize:0,
			    	rownumbers:true, //是否显示行号
			    	singleSelect:true,//设置选择单行
			    	title:title,
					msg:msg,
					top:50,
					pagination:true,
					pageNumber:1,
					pageSize: 15,
					pageList:[10,15,20,50,100],
					toolbar:tbselected,
					showType:'show'
				};
			$.extend(param,data);
			var dg = $(selected).datagrid(param);
			var p = dg.datagrid('getPager'); //分页框设置
			if(typeof(pageParam) != "undefined") {
				if(pageParam == null){
					pageParam = pageParam || {};					
					pageParam.pageSize = 15;
					pageParam.pageList = [10,15,20,50,100];
					pageParam.beforePageText= '';//页数文本框前显示的汉字 
					pageParam.afterPageText= '';
					pageParam.displayMsg= '';
					$(p).pagination(pageParam); 
				}else{
					if(!pageParam.pageSize){
						pageParam.pageSize = 15;
					}
					if(!pageParam.pageList){
						pageParam.pageList = [10,15,20,50,100];
					}
					pageParam.beforePageText= '';//页数文本框前显示的汉字 
					pageParam.afterPageText= '';
					pageParam.displayMsg= '';
					$(p).pagination(pageParam); 
				}
			}else{
				 $(p).pagination({ 
			        pageSize: 15,//每页显示的记录条数，默认为10 
			        pageList: [10,15,20,50,100],//可以设置每页记录条数的列表 
			        beforePageText: '第',//页数文本框前显示的汉字 
			        afterPageText: '页    共 {pages} 页', 
			        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
			    }); 
			}
			return dg;
		}
	}
	t_util.dataGrid = dataGrid;
	
	
	
	/**
	 * 封装dialog，在URL中加上随机码，防止ie浏览器中不重新请求
	 * @author 姚林刚
	 * @param id 组件id值
	 * @param data 参数 
	 */
	function dialog(id,data){
		if(data.href){
			if(/\?+/.test(data.href)){
				data.href = data.href+"&math="+Math.random();
			}else{
				data.href = data.href+"?math="+Math.random();
			}
		}
		data.inline = true;
		return $(id).dialog(data); 
	}
	t_util.dialog = dialog;
	
	
	/**
	 * 替换所有匹配字符串方法
	 * @author 姚林刚
	 * @param source 原字符串
	 * @param rex 要匹配的正则表达式
	 * @param newChar 替换成的字符串
	 */
	function replaceAll(source,rex,newChar){
		while(source.search(rex)!=-1){
			source = source.replace(rex,newChar);
		}
		return source;
	}
	t_util.replaceAll = replaceAll;
	
	/**
	 * 字符串过长时的截断方法,并加上提示完整信息的标题
	 * @author 姚林刚
	 * @param str 原字符串
	 * @param len 字符串长度
	 * @param extStr 切去多余长度，替换的字符串
	 */
	function subTextWithTitle(str,len,extStr){
		if(!str){
			return "";
		}
		var resStr="";
		if(str.length+2<len){
			resStr = str;
		}else{
			if(extStr){
				resStr = str.substr(0,len)+extStr;
			}else{
				resStr = str.substr(0,len)+"...";
			}
		}
		return "<span title='"+str+"'>"+resStr+"</span>";
	}
	t_util.subTextWithTitle = subTextWithTitle;
	
	/**
	 * 阻止其他组件事件方法，主要避免组件的冒泡触发
	 * @author 姚林刚
	 * @param e 触发的事件
	 */
	function stopFn(e){
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}
	t_util.stopFn = stopFn;
	
	//设置ajax请求超时方法
	$(document).ajaxError(function(event,request, settings){
		if(request.responseText.indexOf("登陆失效")!=-1){
			top.tipAndReLoad();
		}
	});

	
	/**
	 * 当前html页面加载方法
	 * @author 姚林刚
	 * @param url 网页链接
	 * @param divId 放入网页的divId
	 * @param callBack 回调方法
	 */
	function loadHtml(url, divId, callBack) {
		$.ajax({
			url : url,
			async: false,
			dataType : "html",
			success : function(data) {
				$("#" + divId).empty();
				$("#" + divId).append(data);
				$("#" + divId).find(".main").width($("#" + divId).width());
				$("#" + divId).find(".main").height($("#" + divId).height());
				$("#" + divId).find(".progressBar").hide();
				//$("#" + divId).css("background-color", "#222222");
				if(callBack){
					callBack.apply();
				}
			}
		});
	}
	t_util.loadHtml = loadHtml;
	
	
	t_util.loadMulit = function(parentDiv,targetDiv,targetContent,defindedprovId,targetUrl,changeFun,provId,extend){
		if(!targetUrl){
			targetUrl = "/out/tour/getAreaList.do?json";
		}
		
		if(provId){
			targetUrl = targetUrl + "&provId=" + provId;
		}
		
		$.ajax({
			url:warpRandom(t_util.PROJECT_NAME+targetUrl),
			type: "POST",
			dataType:'json',
			error:function(e){
				console(e);
				top.jAlert("服务器异常");
			},success:function(data){
				var param = {
			        title : "城市列表",
			        parentId : parentDiv,
			        data: data,
			        callback : changeFun,
			        enableArea : true,
			        defindedprovId:defindedprovId
			    };
				if(extend){
					$.extend(param,extend);
				}
				if(data){
					$("#"+targetDiv).click(function(){
					    $("#"+targetContent).mulitselector(param);
					});
				}
			}
		});
		
	}
	
	/**获取系统根路径author lvyx 2016/1/18**/
	function getContextPath() {
	    var pathName = document.location.pathname;
	    var index = pathName.substr(1).indexOf("/");
	    var result = pathName.substr(0,index+1);
	    return result;
	}      
	t_util.getContextPath = getContextPath;
	
	/**
	 * 初始化对话框方法
	 */
	function initWindow(){
		$("body").append('<div class="windows">'
				+'<a href="#this" style="z-index: 20" class="windowsClose"></a>'
				+'<div id="windowsTra" class="windowsCon"></div>'
				+'</div>'
				+'<div class="windowsShadow"></div>');
		$("body").find(".windows").find(".windowsClose").click(function(){
			$('.windows').removeClass('windowsO');
			$('.windows').addClass('windowsC');
			setTimeout(function () { 
				$('.windows, .windowsShadow').hide(30);
		    }, 760);
			$('#windowsTra').empty();
		})
		/**
		 * 弹出对话框方法
		 * obj：对话框弹出的页面dom对象
		 * callback：回调函数，接收高度，宽度值
		 */
		t_util.openWindow=function(obj,callback){
			$('#windowsTra').empty();
			$('#windowsTra').append($(obj));
			$('.windows').removeClass('windowsC');
			$('.windows').addClass('windowsO');
			$('.windows, .windowsShadow').show();
			if(callback){
				callback($('.windows').width(),$('.windows').height());
			}
		}
	}
	t_util.initWindow = initWindow;
	
	
	var successCode = "1",//成功代码
    failCode = "-1";//请求失败代码

	//获取浏览器类型
	var browser = function() {
	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	    var isOpera = userAgent.indexOf("Opera") > -1;
	    if (isOpera) {
	        return "Opera"
	    }; //判断是否Opera浏览器
	    if (userAgent.indexOf("Firefox") > -1) {
	        return "FF";
	    } //判断是否Firefox浏览器
	    if (userAgent.indexOf("Chrome") > -1) {
	        return "Chrome";
	    }
	    if (userAgent.indexOf("Safari") > -1) {
	        return "Safari";
	    } //判断是否Safari浏览器
	    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
	    	var appName=navigator.appName 
	        var b_version=navigator.appVersion 
	        var version=b_version.split(";"); 
	        var trim_Version=version[1].replace(/[ ]/g,""); 
	        if(appName =="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
	        { 
	        	return "IE 6"; 
	        } 
	        else if(appName =="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
	        { 
	        	return "IE 7";
	        } 
	        else if(appName =="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
	        { 
	        	return "IE 8"; 
	        }else{
	        	return "IE";
	        }
	    }; //判断是否IE浏览器, ie11判断不了，ie10以下可以判断出来
	    //如果都没出去返回
	    return "Can not judge";
	}
	t_util.browser = browser;
	
	//给textArea的鼠标处添加值
	function insertAtCursor(field, value) {
	    //IE support
	    if (document.selection) {
	        field.focus();
	        sel = document.selection.createRange();
	        sel.text = value;
	        sel.select();
	    }
	    //MOZILLA/NETSCAPE support 
	    else if (field.selectionStart || field.selectionStart == '0') {
	        var startPos = field.selectionStart;
	        var endPos = field.selectionEnd;
	        // save scrollTop before insert www.keleyi.com
	        var restoreTop = field.scrollTop;
	        field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
	        if (restoreTop > 0) {
	            field.scrollTop = restoreTop;
	        }
	        field.focus();
	        field.selectionStart = startPos + value.length;
	        field.selectionEnd = startPos + value.length;
	    } else {
	        field.value += value;
	        field.focus();
	    }
	}
	t_util.insertAtCursor = insertAtCursor;
	/**
	阻止向上冒泡
	*/
	function preventEvent(e) {
	    if (e && e.stopPropagation) {
	        e.stopPropagation()
	    } else {
	        window.event.cancelBubble = true
	    }
	}
	t_util.preventEvent = preventEvent;
	/**
	阻止默认方法
	*/
	function preventDefault(e) {
	    if (e && e.preventDefault) {
	        e.preventDefault();
	    } else {
	        window.event.returnValue = false;
	        return false;
	    }
	}
	t_util.preventDefault = preventDefault;
	
	/**
	 * 问号提示框的鼠标事件
	 */
	function showTips() {
		// 页面中的问号注释语句显示
		$('.common-inquiry').off("mouseover mouseout").on("mouseover mouseout", function(event) {
			event = event||window.event;
			var tips = $(this).attr("data-value");
			var html = '';
			html = '<span class="common-itipsBox"><i class="common-itipArrow"></i><span class="common-itxtWrap">提示：<span class="common-itxt">' + tips + '</span></span></span>';
			if (event.type == "mouseover") {
				// 鼠标悬浮
				$(this).html(html);
			} else if (event.type == "mouseout") {
				// 鼠标离开
				$(this).empty();
			}
		});
	}
	t_util.showTips = showTips;
})(window);


$(function(){
	// 单选框
	$('.radioChange').on('click', function(i) {
		$(this).addClass('active').siblings('.radioChange').removeClass('active');
	})
	
	//内容区高度=整个父级高度-同级已知部分的高度
	$('.common-content').each(function(i){
		var $this = $(this);
		$('.common-content').eq(i).css('height', $this.parent('.common-wrapper').outerHeight()-$this.siblings('.common-part').outerHeight());
	})
	

	// 所有ztree树节点过多时出现滚动条
	$('.ztree').niceScroll({cursorcolor: '#ccc', zindex: 2147483647});
});

var successCode = "1",//成功代码
    failCode = "-1";//请求失败代码

/**
 * 公用js
 */

/**获得body的高度**/
function getBodyHeight(){
	return $("body").height();
}

/**获得body的宽度*/
function getBodyWidth(){
	return $("body").width();
}


/**
 * 清空表单内容
 * */
var form = {
		clear:function(form){//清空表单内容
			var target = form;
			if(!target){
				return;
			}
			$('input,select,textarea', target).each(function(){
				var t = this.type, tag = this.tagName.toLowerCase();
				if (t == 'text' || t == 'hidden' || t == 'password' || tag == 'textarea'){
					this.value = '';
				} else if (t == 'file'){
					var file = $(this);
					file.after(file.clone().val(''));
					file.remove();
				} else if (t == 'checkbox' || t == 'radio'){
					this.checked = false;
				} else if (tag == 'select'){
					this.selectedIndex = -1;
				}
			});
			// 清空带文字编辑功能的div内容
			form.find('div[contenteditable="true"]').html('');			
		},
		clearSelfRadio: function(form) {
			// 清空单选框选项并设置默认为第一个
			form.find('.radio').removeClass('active').eq(0).addClass('active');
		},
		load:function(form, data){//将json格式的数据根据name加载到form中，只支持普通元素，复杂元素（如下拉树）需要单独写或扩充该方法
//			var isVal = data.isValid;
			for(var name in data){
				var val = data[name];
				var rr = false;
				var cc = form.find('[switchbuttonName="'+name+'"]');
				if (cc.length){
					cc.switchbutton('uncheck');
					cc.each(function(){
						if (_isChecked($(this).switchbutton('options').value, val)){
							$(this).switchbutton('check');
						}
					});
					rr = true;
				}
				cc = form.find('input[name="'+name+'"][type=radio], input[name="'+name+'"][type=checkbox]');
				if (cc.length){
					cc.prop('checked', false);
					cc.each(function(){
						if (_isChecked($(this).val(), val)){
							$(this).prop('checked', true);
						}
					});
					rr =  true;
					continue;
				}
				if (!rr){
					$('input[name="'+name+'"]', form).val(val);
					$('textarea[name="'+name+'"]', form).val(val);
					$('select[name="'+name+'"]', form).val(val);
					// 特殊元素--带文字编辑功能的div，高度可自动被内容撑开
					$('div[contenteditable="true"][name="'+name+'"]').html(val);
				}
			}
			// 特殊元素--单选框
//			if(isVal === "1") {
//				form.find('.radio[value="1"]').addClass('active');
//			}else if(isVal === "0") {
//				form.find('.radio[value="0"]').addClass('active');
//			}else {
//				layer.msg('信息返回异常！',{time:1000,icon:2});
//			}
		},
		loadRadio:function(form, data, isValidFlaf){//将json格式的数据根据name加载到form中，只支持普通元素，复杂元素（如下拉树）需要单独写或扩充该方法
			var isVal = data.isValidFlaf;
			// 特殊元素--单选框
			if(isVal === "1") {
				form.find('.radio[value="1"]').addClass('active');
			}else if(isVal === "0") {
				form.find('.radio[value="0"]').addClass('active');
			}else {
				layer.msg('信息返回异常！',{time:1000,icon:2});
			}
		},
		serializeJson:function(form){//将form表单序列化成jsonObject格式
			var str = this.serializeStr(form);
			return JSON.parse(str)
		},
		serializeStr:function(form){//将form表单序列化成jsonStr格式
	    	var formInfo = jQueryExt.serialize(form);
	    	formInfo = decodeURIComponent(formInfo, true);
	    	return jQueryExt.par2Json(formInfo, true);
		},
		isValidator:function(form){//当没有异步验证的时候使用该方法校验表单
			return form.isValid();
		},
		isSynValidator:function(form,callback){//当有异步验证使用该方法进行表单提交
			form.isValid(function(v){
			    if (v) {
			        callback();
			    }
			});
		},
		cleanValidator:function(form){
			form.validator('cleanUp');
		}
}

function _isChecked(v, val){
	if (v == String(val) || $.inArray(v, $.isArray(val)?val:[val]) >= 0){
		return true;
	} else {
		return false;
	}
}	
	
	/**
	 * 公用js
	 */
	//复选框
	changeCheckBoxBg = function(ele){
		$(ele).toggleClass('active');
	}

	/*li隔行变色*/
	function liDiscolor(id){
		var row=$(id+">li");
		row.each(function(i){
			if(i%2==0){
			 	$(id+">li").eq(i).addClass('even');
			}else{
			 	$(id+">li").eq(i).addClass('odd');
			}
		})
	}
	/*滑动tab切换*/
	function tabChange(id,elementclass){
		var row=$(id+">li");
		row.each(function(i){
		$(this).click(function(){
		    $(this).addClass('active').siblings().removeClass('active');
			 	var left=-i*100+"%";
			 	$(elementclass).animate({"left":left},500);	
			 	});
		});
	}
	
	// 带有分页的datatables表格内容区高度
	// ps: 必须在表格加载后执行
	function pageTableHeight(){
		$('.dataTable').wrap('<div class="pagetab-wrapper"></div>');
		$('.pagetab-wrapper').each(function(i){
			var $this = $(this);
			$this.css('height', $this.parent('.dataTables_wrapper').outerHeight()-$this.siblings('.dataTables_paginate').outerHeight()-50);
		});
		// 内容过多时出现滚动条
		$('.pagetab-wrapper').niceScroll({ cursorcolor: "#ccc", horizrailenabled: false});
	}

	// 弹出层内容过多时出现滚动条
	function layerScroll(){
		$('.layui-layer-content').niceScroll({cursorcolor: "#ccc", horizrailenabled: false});
	}
	
	// 全选
	function selectAll($headChk, $bodyChks){
		// 一选多
		$headChk.on('click', function(){
			var $this = $(this);
			if($this.hasClass('active')){
				$bodyChks.addClass('active');
			}else {
				$bodyChks.removeClass('active');
			}		
		})
		//	多选一
		$bodyChks.on('click', function(){
			var count = 0;
			$bodyChks.each(function(i){
				if($bodyChks.eq(i).hasClass('active')){
					count ++;
				}
			})
			if(count === $bodyChks.length) {
				$headChk.addClass('active');
			}else{
				$headChk.removeClass('active');
			}
		})
	}
	
	// datatables添加跳转到指定页
	function extendPages(settings) {
		var tabId = $('.dataTable').eq($(this).index()).attr('id');
		// 初始化
		$('#'+tabId+'_inp').val(1);
		var info = $('#'+tabId).DataTable().page.info();
		$(".gotoPage").remove(); 
		var pageHtml = "<span class='gotoPage'>" +  
	        "<span>第</span> " +  
	        "<input type='text' class='integer-lg' id='"+tabId+"_inp' data-prev='"+(info.page+1)+"' value='"+(info.page+1)+"'>" +  
	        " <span>页</span>" + 
	        "<a class='paginate_button_lg' id='"+tabId+"_confirm'>确定</a>"+
	        "</span>"; 
		$(pageHtml).appendTo($('#'+tabId+'_paginate'));

		// 对页码输入进行限制，只能输入数字  
		var sfn = function() {  
		    var value = $(this).val();  
		    if (value == '') {  
		        $(this).data("prev", $(this).val());  
		        return;  
		    }  
		  
		    var max = $(this).attr("maxlength");  
		    if (value.length > max)  
		        $(this).val(value.slice(0, max));  
		  
		    var regex = /^\d+$/;  
		    if (!regex.test(value)) {  
		        $(this).val($(this).data("prev"));  
		    }  
		  
		    $(this).data("prev", $(this).val());  
		};  
		  
		var testinput = document.createElement('input');       
		if('oninput' in testinput){   
		    document.getElementById(tabId+'_inp').addEventListener("input", sfn, false);   
		} else {  
		    $('#'+tabId+'_inp').onpropertychange = sfn;   
		}  
		
		var curInx = $('#'+tabId+'_inp').val();    
		// 为确认按钮添加点击事件，执行分页跳转  
		$('#'+tabId+'_confirm').click(function(){
		    var textGotoPage = $('#'+tabId+'_inp').val(); 
		    if (textGotoPage == null || textGotoPage === '' || textGotoPage.match(/[^0-9]/)) {  
		        // 没有输入或者输入了非数字，清除非数字  
		        $('#'+tabId+'_inp').val(textGotoPage.replace(/[^\d]/g, ''));  
		        return;  
		    }  
		    
		    if(parseInt(textGotoPage) > 0){  
		        var oSettings = settings;
//		        var maxPage;
//		        if(oSettings._iRecordsTotal%oSettings._iDisplayLength) {
//		        	var mol = oSettings._iRecordsTotal%oSettings._iDisplayLength;
//		        	maxPage = ((oSettings._iRecordsTotal-mol)/oSettings._iDisplayLength)+1;
//		        }else {
//		        	maxPage = oSettings._iRecordsTotal/oSettings._iDisplayLength;
//		        }
//		    	$('#'+tabId+'_paginate').find('.paginate_button').removeClass('current');
//		    	
//		    	if(textGotoPage > maxPage) {
//		    		layer.msg('输入的页码不能超出最大页数！', {
//		    			time: 1500,
//		    			icon: 3
//		    		})
//		    		// 回到当前页
//		    		$('#'+tabId+'_inp').val(curInx);
//		    		$('#'+tabId+'_paginate').find('span:eq(0) .paginate_button').eq(curInx-1).addClass('current');
//		    	}else {
//		    		$('#'+tabId+'_paginate').find('span:eq(0) .paginate_button').eq(textGotoPage-1).addClass('current').trigger('click').trigger('keypress');
//		    	}
		        var iNewStart = oSettings._iDisplayLength * (textGotoPage - 1);  
		        if (iNewStart < 0) {  
		            iNewStart = 0;  
		        }  
		        if (iNewStart >= oSettings.fnRecordsDisplay()) {  
		            iNewStart = (Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;  
		        }  		  
		        oSettings._iDisplayStart = iNewStart; 
		        alert(oSettings._iDisplayStart);
		        console.log(oSettings);
		        $('#'+tabId).dataTable().fnDraw(oSettings);
		    }else {
		    	layer.msg('输入的页码不能小于最小页数！', {
	    			time: 1500,
	    			icon: 3
	    		})
	    		// 回到当前页
//	    		$('#'+tabId+'_inp').val(curInx);
//	    		$('#'+tabId+'_paginate').find('span:eq(0) .paginate_button').eq(curInx-1).addClass('current');
		    }  
		});  
	}

	//	普通公用选项卡
	function tab(id) {
		var $headBtn = $('#'+id).find('.tab-header').children(),
			$content = $('#'+id).find('.tab-content').children();
		// 初始化
		$headBtn.removeClass('active').eq(0).addClass('active');
		$content.hide().css({'opacity':0}).eq(0).show().css({'opacity':1});
		// 点击事件
		$headBtn.on('click', function() {
			var inx = $(this).index();
			$headBtn.removeClass('active').eq(inx).addClass('active');
			$content.hide().stop().animate({'opacity':0}, 500).eq(inx).show().stop().animate({'opacity':1}, 500);
		})
	}
	
	// 去掉字符串中的所有标签
	function delEle(str) {
		return str.replace(/<.*?>/ig,'');
	}
	
	// 页面一屏表格行数根据屏幕大小而定
	function setTabRow() {
		var oBodyH = $('body').height();
		var tabLen = Math.floor((oBodyH-250)/34);
		return tabLen;
	}
		// 右上角没有新增和刷新行时
	function setTabRow2() {
		var oBodyH = $('body').height();
		var tabLen = Math.floor((oBodyH-220)/34);
		return tabLen;
	}