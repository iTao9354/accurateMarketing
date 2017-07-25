/*
* @Author: 靳海月
* @Date:   2017-02-25 09:50:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-28 15:40:40
*/

'use strict';
$(function(){
	//初始化修改图标的zTree树状结构---带右键菜单
	identityTree();

	// 加载带checkbox复选框的多选下拉菜单树状结构
	initDownTree();


	// 初始化文件上传
	initUploader();


	// 饼状图
	initPieChart();
	// 折线图
	initLineChart();

	// 加载表格
	initDataTable();
	// 为datatable外的父级设置高度
	var $userTab = $('#userTable_wrapper');
	$userTab.css('height', $userTab.parent().height()-$userTab.siblings('.searchWrap').height() - 40);
	// 动态为表格添加父级
	$('#userTable').wrap('<div class="tab-wrapper"></div>');
	$('.tab-wrapper').css('height', $('#userTable_wrapper').height()-$('#userTable_paginate').height() - 50);
	$('.tab-wrapper').niceScroll({ cursorcolor: "#ccc", horizrailenabled: false});
	// 点击查询按钮，重新加载目标数据
	$("#searchBtn").bind("click",reloadTableData);

})

//初始化修改图标的zTree树状结构---带右键菜单
var identityTree = function(){
	var setting = {
		data: {
			simpleData: {
				enable:true, 
				idKey:'orgId',
				pIdKey:'parentId'
			},
			key:{
				name:'orgName'
			}
		},		
		callback: {
			onRightClick:function(e,treeId,treeNode){
				if(!treeNode) return;
				treeObj.selectNode(treeNode);
				$(".bootstrapMenu").hide();
				var oWidth = e.clientX - $('#idTreeContent').parents('.part').width() - 10;
				var oHeight = e.clientY;
				switch (treeNode.nodeTypeId){
					case 0:
						$("#folderContextMenu").show();
						$("#folderContextMenu").css("left",oWidth);
						$("#folderContextMenu").css("top",oHeight);
						break;
					case 1:
						$("#linkContextMenu").show();
						$("#linkContextMenu").css("left",oWidth);
						$("#linkContextMenu").css("top",oHeight);
						break;
					default:;						
				}
		    }
		}
	};
	var data = [
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"root","parentId":null,"path":"/root","ord":1,"orgName":"北京分公司"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"xicheng","parentId":"root","path":"/root/xicheng","ord":1,"orgName":"西城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg003","parentId":"xicheng","path":"/root/xicheng/testOrg003","ord":1,"orgName":"testName003"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc01","parentId":"xicheng","path":"/root/xicheng/xc01","ord":1,"orgName":"西城区01"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg002","parentId":"xicheng","path":"/root/xicheng/testOrg002","ord":1,"orgName":"testName002"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc02","parentId":"xicheng","path":"/root/xicheng/xc02","ord":2,"orgName":"西城区02"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"dongcheng","parentId":"root","path":"/root/dongcheng","ord":2,"orgName":"东城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc03","parentId":"xicheng","path":"/root/xicheng/xc03","ord":3,"orgName":"西城区03"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"haidian","parentId":"root","path":"/root/haidian","ord":3,"orgName":"海淀区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"chaoyang","parentId":"root","path":"/root/chaoyang","ord":4,"orgName":"朝阳区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"root","parentId":null,"path":"/root","ord":1,"orgName":"北京分公司"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"xicheng","parentId":"root","path":"/root/xicheng","ord":1,"orgName":"西城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg003","parentId":"xicheng","path":"/root/xicheng/testOrg003","ord":1,"orgName":"testName003"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc01","parentId":"xicheng","path":"/root/xicheng/xc01","ord":1,"orgName":"西城区01"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg002","parentId":"xicheng","path":"/root/xicheng/testOrg002","ord":1,"orgName":"testName002"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc02","parentId":"xicheng","path":"/root/xicheng/xc02","ord":2,"orgName":"西城区02"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"dongcheng","parentId":"root","path":"/root/dongcheng","ord":2,"orgName":"东城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc03","parentId":"xicheng","path":"/root/xicheng/xc03","ord":3,"orgName":"西城区03"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"haidian","parentId":"root","path":"/root/haidian","ord":3,"orgName":"海淀区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"chaoyang","parentId":"root","path":"/root/chaoyang","ord":4,"orgName":"朝阳区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"root","parentId":null,"path":"/root","ord":1,"orgName":"北京分公司"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"xicheng","parentId":"root","path":"/root/xicheng","ord":1,"orgName":"西城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg003","parentId":"xicheng","path":"/root/xicheng/testOrg003","ord":1,"orgName":"testName003"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc01","parentId":"xicheng","path":"/root/xicheng/xc01","ord":1,"orgName":"西城区01"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg002","parentId":"xicheng","path":"/root/xicheng/testOrg002","ord":1,"orgName":"testName002"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc02","parentId":"xicheng","path":"/root/xicheng/xc02","ord":2,"orgName":"西城区02"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"dongcheng","parentId":"root","path":"/root/dongcheng","ord":2,"orgName":"东城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc03","parentId":"xicheng","path":"/root/xicheng/xc03","ord":3,"orgName":"西城区03"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"haidian","parentId":"root","path":"/root/haidian","ord":3,"orgName":"海淀区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"chaoyang","parentId":"root","path":"/root/chaoyang","ord":4,"orgName":"朝阳区"}
	];
	if(data!=null&&data.length>0){
		for(var i = 0; i < data.length; i++){
			data[i].icon = nodeTypeIcon[data[i].nodeTypeId];
		}
		var treeObj = $.fn.zTree.init($("#identityTree"), setting, data);
		treeObj.expandAll(true);
	}else{
		layer.msg('暂无数据', {time:1000, icon:5});
	}
}
// 图标样式
var nodeTypeIcon = {
		"0":"img/icons/16x16/floder1-org.png",
		"1":"img/icons/16x16/resorce.png"
};

//初始化zTree树状结构---带 checkbox复选框 的多选下拉菜单
var initDownTree = function(){
	var setting = {
		data: {
			simpleData: {
				enable:true, 
				idKey:'orgId',
				pIdKey:'parentId'
			},
			key:{
				name:'orgName'
			}
		},
		check: {
			enable: true,
			chkboxType: {"Y":"s", "N":"s"}
		},
		callback: {
			beforeClick: function(treeId, treeNode){
				var zTree = $.fn.zTree.getZTreeObj("downTree");
				zTree.checkNode(treeNode, !treeNode.checked, null, true);
				return false;
			},
			onCheck: function(e, treeId, treeNode){
				var zTree = $.fn.zTree.getZTreeObj("downTree"),
				nodes = zTree.getCheckedNodes(true),
				v = "";
				for (var i=0, l=nodes.length; i<l; i++) {
					v += nodes[i].orgName + ",";
				}
				if (v.length > 0 ) v = v.substring(0, v.length-1);
				var cityObj = $("#formSel");
				cityObj.attr("value", v);
			}
		}
	};

	var data = [
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"root","parentId":null,"path":"/root","ord":1,"orgName":"北京分公司"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"xicheng","parentId":"root","path":"/root/xicheng","ord":1,"orgName":"西城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg003","parentId":"xicheng","path":"/root/xicheng/testOrg003","ord":1,"orgName":"testName003"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc01","parentId":"xicheng","path":"/root/xicheng/xc01","ord":1,"orgName":"西城区01"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"testOrg002","parentId":"xicheng","path":"/root/xicheng/testOrg002","ord":1,"orgName":"testName002"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc02","parentId":"xicheng","path":"/root/xicheng/xc02","ord":2,"orgName":"西城区02"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"dongcheng","parentId":"root","path":"/root/dongcheng","ord":2,"orgName":"东城区"},
	            {"nodeTypeId":1,"tenantId":"admin","orgId":"xc03","parentId":"xicheng","path":"/root/xicheng/xc03","ord":3,"orgName":"西城区03"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"haidian","parentId":"root","path":"/root/haidian","ord":3,"orgName":"海淀区"},
	            {"nodeTypeId":0,"tenantId":"admin","orgId":"chaoyang","parentId":"root","path":"/root/chaoyang","ord":4,"orgName":"朝阳区"}
	];
	if(data!=null&&data.length>0){
		var treeObj = $.fn.zTree.init($("#downTree"), setting, data);
		treeObj.expandAll(true);
	}else{
		layer.msg('暂无数据', {time:1000, icon:5});
	}
};
function showMenu() {
	var cityObj = $("#formSel");
	var cityOffset = $("#formSel").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "formSel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}



// 显示本页面弹出层
var showLayer = function(){
	layer.open({
		type: 1,
		title:'<i class="iconfont">&#xe65b;</i>&nbsp;弹出层标题',
		area: ['900px', '600px'],
		content: '<div>此处为弹出层内容区</div>',
		btn: ['确定','取消'],
		btn1: function(index, layero){
			layer.close(index);
		},
		btn2: function(index, layero){
			layer.close(index);
		}
	})
}
// 显示父页面弹出层，父页面若无显示弹出层方法，则调用本页面方法
var showHrefLayer = function(){
	var href = 'http://www.baidu.com';
	try{
		parent.window.openByContent(2, href, ['900px', '600px']);
	}catch(err){
		layer.open({
			type: 2,
			title: false,
			closeBtn: false,
			area: ['900px', '600px'],
			content: href,
			btn: ['关闭'],
			btn1: function(index, layero){
				layer.close(index);
			}
		})
	}	
}



// 初始化文件上传功能
// ps:此为demo页面，功能未完善，使用时需要配置server接口以及所有含webpath的接口
var initUploader = function(){
	// 初始化webuploader组件，设置上传等事件监听
	var $list = $('#thelist');
	var $btn =$("#ctlBtn");   //开始上传
	var thumbnailWidth = 100;   //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算  
	var thumbnailHeight = 100; 
	var uploader = WebUploader.create({		
	    // swf文件路径
	    swf: 'plugin/webuploader-0.1.5/Uploader.swf',
	    // 文件接收服务端。
	    server: '/file/uploadAll',
	    // 选择文件的按钮。可选。
	    pick: '#picker',
	    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
	    resize: false,
	    method:'POST',
	    // 可重复上传
	    duplicate: true
	});
	$btn.on('click',function(){
		//添加完需要与图片一起上传的参数之后,就可以手动触发uploader的上传事件了.
		uploader.upload();
	});
	
	// 上传事件对象
	var uploaderObj = {
		'fileQueued': function(file){
			$list.append( '<div id="' + file.id + '" class="item">' +
			        '<h4 class="info clearfix" name="'+file.name+'">' + file.name + '<i class="fr iconfont file-delete" title="删除">&#xe61b;</i>'+
			        												'<i class="fr iconfont file-download" title="下载">&#xe724;</i>'+
			        '</h4>' +
			        '<p class="state">等待上传...</p>' +
			    '</div>' );
		},
		'uploadProgress': function( file, percentage ) {
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.progress .progress-bar');

		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<div class="progress progress-striped active">' +
		          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
		          '</div>' +
		        '</div>').appendTo( $li ).find('.progress-bar');
		    }

		    $li.find('p.state').text('上传中');

		    $percent.css( 'width', percentage * 100 + '%' );
		},
		'uploadSucc': function( file ) {
		    $( '#'+file.id ).find('p.state').text('已上传');
		    $('.info .iconfont').show();
		    // 文件下载
		    $('.file-download').on('click', function(){
		    	var name = $(this).parent().attr('name');
		    	window.open(webpath+'/file/download?fileName='+name+'&filePath=D\:\\frame\\app\\res\\cruser\\'+name);
		    })
		    // 文件删除
		    $('.file-delete').on('click', function(){
		    	var name = $(this).parent().attr('name');
		    	var _this = this;
		    	layer.confirm('删除该用户？（删除后不可恢复）', {
		    		icon: 3,
		    		btn: ['是', '否']   		
		    	}, function(index, layero){
		    		$.ajax({
			    		url: webpath + '/file/delete',
			    		type: 'POST',
			    		data: {
			    			filePath: 'D\:\\frame\\app\\res\\cruser\\'+name
			    		},
			    		success: function(data){			    			
			    			if(data){
			    				$(_this).parents('.item').remove();
			    				layer.msg('删除成功！', {icon: 1});			    				
			    			}else{
			    				layer.msg('删除失败！', {icon: 1});
			    			}
			    		}
			    	})
		    	})
		    	
		    })
		},
		'uploadErr': function( file ) {
		    $( '#'+file.id ).find('p.state').text('上传出错');
		},
		'uploadComp': function( file ) {
		    $( '#'+file.id ).find('.progress').fadeOut();
		}
	};
	
	// 当有文件被添加进队列的时候
	uploader.on( 'fileQueued', uploaderObj.fileQueued);	
	// 文件上传过程中创建进度条实时显示。
	uploader.on( 'uploadProgress', uploaderObj.uploadProgress);	
	// 文件上传成功
	uploader.on( 'uploadSuccess', uploaderObj.uploadSucc);
	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', uploaderObj.uploadErr);
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', uploaderObj.uploadComp);
}


// 初始化echarts饼状图
function initPieChart(){
	var myChart = echarts.init(document.getElementById('pieChart'));
	var option = {
		title:{
			text:'流量趋势',
			left:'left',
			textStyle:{
				color:'#FF7F00',
				fontFamily:'黑体',
				fontSize:20,					
			},
		},
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	    	textStyle:{
	    		color:'#FFFFFF'
	    	},
	    	bottom:2,
	        orient: 'horizontal',
	        bottom:'0.5%',
	        data:['T1','T2','T3','T4','T5','其他']
	    },
	    series: [
	        {
	            name:'地域分布',
	            type:'pie',
	            clockwise: false,//顺时针方向
	            radius: ['30%', '60%'],
	            label: {	            	
	                normal: {
	                	show:false,
	                	textStyle:{
		            		color:'#FFFFFF'
		            	},
	                    formatter:'{d}%',
	                   
	                },
	                emphasis: {
	                    show: false,
	                    textStyle: {
	                        fontSize: '15',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false,
	                 
	                }
	            },
	            
	            data:[
	                {value:400, name:'T1'},
	                {value:200, name:'T2'},
	                {value:80, name:'T3'},
	                {value:40, name:'T4'},
	                {value:30, name:'T5'},
	                {value:20, name:'其他'}
	            ]
	        }
	    ]
	};

	myChart.setOption(option);
}
// 初始化echarts折线图
function initLineChart(){
	var myChart = echarts.init(document.getElementById('lineChart'));
	var option = {
		title:{
			text:'流量趋势',
			left:'left',
			textStyle:{
				color:'#FF7F00',
				fontFamily:'黑体',
				fontSize:20,					
			},
		},
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {//标注
	    	textStyle:{
	    		color:'#FFFFFF'
	    	},
	    	bottom:2,
	        data:['访客数(UV)','浏览量(PV)']
	    },		    
	    toolbox: {
	        feature: {
	            saveAsImage:false
	        }
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	             show:false//去辅助网格
	        },
	        axisTick:{
	        	show:false
	        },
	        axisLine:{
	        	lineStyle:{
	        		color:'#87CEFF',//x轴
	        		width:3
	        	}
	        },
	        axisLabel:{
	        	textStyle:{
	        		color:'#FFFFFF',//x刻度标注
	        		width:4
	        	}
	        },
	        data: ['17日','18日','19日','20日','21日','22日','23日']
	    },
	    yAxis: {		    	
	    	splitLine:{
	            show:false
	        },
	        axisLine:{
	        	show:false,
	        },
	        axisTick:{
	        	show:false
	        },
	        axisLabel:{
	        	show:false
	        }
	    },
	    series: [
	        {
	            name:'访客数(UV)',
	            type:'line',
	            stack: '总量',
	            label:{
		            normal:{
		            	show:true,//线上标注
		            	position:'bottom'
		            }
	       		},
	       		lineStyle:{//线
	       			normal:{
	       				color:'#FF7F00',
	       				width:2
	       			}
	       		},
	       		itemStyle:{//折点
	       			normal:{
	       				color:'#FF7F00',
	       				borderColor:'#FF7F00'
	       			}
	       		},
	       		symbol:'rect',//折点类型
	            smooth:true,
	            data:[2120, 2132, 1101, 1134, 1390, 1230, 2210]
	        },
	        {
	            name:'浏览量(PV)',
	            type:'line',
	            stack: '总量',
	            label:{
		            normal:{
		            	show:true,
		            	position:'top'			            	
		            }
	       		},
	       		lineStyle:{
	       			normal:{
	       				color:'#63B8FF',
	       				width:2
	       			}
	       		},
	       		itemStyle:{
	       			normal:{
	       				color:'#63B8FF',
	       				borderColor:'#63B8FF'
	       			}
	       		},
	       		symbol:'rect',
	            smooth:true,
	            data:[6220, 6182, 6191, 5234, 3290, 2730, 6310]
	        }
	    ]
	};

	myChart.setOption(option);
}

// 初始化表格
function initDataTable(){
	$("#userTable").width("100%").dataTable({
		"columns":[
		            { "data": "userName" },
		            { "data": "loginId" },
		            { "data": "emall" },
		            { "data": "mobile" },
		            { "data": "state" },
		            { "data": "lockLoginTimes" },
		            { "data": "regDate"}
		 ],
//		 "json":{
//			 "total":14,
			 "data":[
			         {"createrId":null,"dataAuth":null,"emall":"admin@bonc.com.cn","lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"admin","memo":null,"mobile":"15942411681","orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":"2017-02-18 13:18:51","pwdValidState":0,"regDate":null,"sex":"男","state":"1","telephone":"66666","tenantAdmin":0,"tenantId":null,"updateDate":"2017-02-18 13:18:51","userId":"admin","userName":"超级管理员"},
			         {"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"5343","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:20:51","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a6c29e60032","userName":"gg"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"888","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:20:38","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a6bf5240031","userName":"888"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"777","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:20:12","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a6b931b0030","userName":"777"},
			         {"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"666","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:19:53","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a6b471e002f","userName":"666"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"555","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:17:25","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a6906e1002c","userName":"555"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"444","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:17:16","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a68e11a002b","userName":"444"},
			         {"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"333","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:17:06","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a68b993002a","userName":"333"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"222","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:16:59","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a689dd50029","userName":"222"},{"createrId":"admin","dataAuth":null,"emall":null,"lastLoginDate":null,"lockDate":null,"lockLoginTimes":0,"loginId":"fff","memo":null,"mobile":null,"orgId":null,"orgnization":[],"password":null,"pwdState":"1","pwdUpdateDate":null,"pwdValidState":0,"regDate":"2017-02-14 10:16:46","sex":null,"state":"1","telephone":null,"tenantAdmin":0,"tenantId":null,"updateDate":null,"userId":"2c90bf625a3a318b015a3a686b100028","userName":"fff"}
			 ],
//		 },
//		 ajax: {
//		     url:webpath+'/user/selectPage',
//		     "type": 'POST',
//		     "dataSrc": function (json) {
//		    	 console.log(JSON.stringify(json));
//		           json.iTotalRecords = json.total;
//		           json.iTotalDisplayRecords = json.total;
//		           return json.data;
//		     }
//		},
		columnDefs:[{
			"targets" : 4,//操作按钮目标列
			"data" : null,
			"render" : function(data, type,row) {
				  var html = '';
				  if(data=="1"){
					  html += '<span style="color:green;">未锁定</span>';
				  }else{
					  html += '<span style="color:red;">已锁定</span>';
				  }
			      return html;
			   }
		},{
			  "targets" : 7,//操作按钮目标列
			  "data" : null,
			  "render" : function(data, type,row) {
				  var id = row.userId;
				  var html =  '<a href="javascript:void(0);" class="icon-wrap" title="编辑"><i class="iconfont i-btn">&#xe66f;</i></a>';
				      html += '&nbsp;&nbsp;';
				      html +=  '<a href="javascript:void(0);" class="icon-wrap" title="删除"><i class="iconfont i-btn">&#xe614;</i></a>';
				      html += '&nbsp;&nbsp;';
				      html +=  '<a href="javascript:void(0);" class="icon-wrap" title="重置密码"><i class="iconfont i-btn">&#xe637;</i></a>';
				      html += '&nbsp;&nbsp;';
				      html +=  '<a href="javascript:void(0);" class="icon-wrap" title="角色授权"><i class="iconfont i-btn">&#xe646;</i></a>';
				      return html;
			   }
		}],
		"serverSide": false      // 数据从后台调取时此处为true，在公用的common-js.jsp已定义
	});
}

//刷新数据  true  整个刷新      false 保留当前页刷新
function reloadTableData(isCurrentPage){
	$("#userTable").dataTable().fnDraw(isCurrentPage==null?true:isCurrentPage);
}