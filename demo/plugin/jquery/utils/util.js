/**
 *姚林刚
 *常用操作工具方法
 */
(function(window){
	
	$(function(){
		//内容区高度=整个父级高度-同级已知部分的高度
		$('.common-content').each(function(i){
			var $this = $(this);
			$('.common-content').eq(i).css('height', $this.parent('.common-wrapper').height()-$this.siblings('.common-part').height());
		})
		

		// 所有ztree树节点过多时出现滚动条
		$('.ztree').niceScroll({cursorcolor: '#ccc', horizrailenabled: false});
	})
	
	
	window.util=t_util = {};
//	t_util = {};
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
	        return "IE";
	    }; //判断是否IE浏览器, ie11判断不了，ie10以下可以判断出来
	    //如果都没出去返回
	    return "Can not judge";
	}

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
			
		},
		load:function(form, data){//将json格式的数据根据name加载到form中，只支持普通元素，复杂元素（如下拉树）需要单独写或扩充该方法
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
				}
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
	window.form = form;



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
	changeSingleBoxBg = function(ele){
		$(ele).addClass('active').siblings('.radio').removeClass('active');
		
	}
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
})(window);
