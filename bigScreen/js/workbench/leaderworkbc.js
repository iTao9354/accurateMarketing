/*
* @Author: 靳海月
* @Date:   2017-02-25 09:50:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-26 17:30:24
*/

'use strict';
$(function(){
	// 加载金牌活动排行列表
	topRankTable();
	$('.common-content').niceScroll({cursorcolor: "#ccc", horizrailenabled: false});
})


// 初始化表格
function topRankTable(){
	$("#topActivityRank").width("100%").dataTable({
		"columns":[
					{ "width": 0, "data": "order" ,"targets":0},
		            { "width": "20px", "data": "icon", "targets":1 },
		            { "width": "10%", "data": "content", "targets":2 },
		            { "width": "20%", "data": "progress", "targets":3 },
		            { "width": "10%", "data": "percent", "targets":4 }
		 ],
//		 "json":{
//			 "total":14,
			 "data":[
			         {"order":5,"icon":"normal","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":10,"percent":10},
			         {"order":3,"icon":"third","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":40,"percent":40},
			         {"order":6,"icon":"normal","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":5,"percent":5},
			         {"order":1,"icon":"first","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":70,"percent":70},
			         {"order":2,"icon":"second","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":55,"percent":55},
			         {"order":4,"icon":"normal","content":null,"actName":"SIM换卡","userSource":"河南省","userName":"小强","actDate":"2017-02-18","progress":25,"percent":25}
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
			"targets" : 0,			
			"visible": false,
			"searchable": false
		},{
			"width":"20px",
			"targets" : 1,//操作按钮目标列
			"render" : function(data, type,row) {
				var html = '';				
				switch(data){
					case "first":
						html += '<i class="iconfont icon-rank1">&#xe622;</i>';
						break;
					case "second":
						html += '<i class="iconfont icon-rank2">&#xe622;</i>';
						break;
					case "third":
						html += '<i class="iconfont icon-rank3">&#xe622;</i>';
						break;
					default:
						html += '<i class="iconfont icon-rank0">&#xe622;</i>';
						break;
				}
			    return html;
			}
		},{
			"targets" : 2,//操作按钮目标列
			"data" : null,
			"render" : function(data, type,row) {
			  	var html = '';
			  	html += '<div class="activity-content"><h3 class="activity-name">'+row.actName+'</h3><p>'+row.userSource+''+row.userName+''+row.actDate+'</p><div>';
				return html;
			}
		},{
			"targets" : 3,//操作按钮目标列
			"data" : null,
			"render" : function(data, type,row) {
			  	var html = '';
			  	html += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+row.progress+'%;"></div></div>';
				return html;
			}
		},{
			"targets" : 4,
			"render" : function(data, type, row) {
				var html = '';
				html += data+'%';
				return html;
			}
		}],
		"paging": false,
		"bSort":  true,
		"order": [[0, "asc"]],
		"serverSide": false      // 数据从后台调取时此处为true，在公用的common-js.jsp已定义
	});
}

//刷新数据  true  整个刷新      false 保留当前页刷新
function reloadTableData(isCurrentPage){
	$("#userTable").dataTable().fnDraw(isCurrentPage==null?true:isCurrentPage);
}