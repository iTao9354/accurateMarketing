<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
    String webpath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>触点主页</title>
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/css/common-layer-ext.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/jquery/validator/dist/jquery.validator.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/jquery/datatables/media/css/jquery.dataTables.min.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/css/common-font.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/css/common.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/resource/jquery/triber/triber.css">
		<link rel="stylesheet" href="<%=webpath %>/static/touch/css/touch.css">
		<!--[if lt IE 9]>
		  	<script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  	<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
    </head>
    <body>
    	<form action="">
    		<input type="hidden" id="activityId" name="activityId" value="100007802" />
    		<input type="hidden" id="oldActivityId" name="oldActivityId" value="1" />
    		<input type="hidden" id="cmGroupId" name="groupId" value="4ce97ee6228d4291affa" />
    		<input type="hidden" id="orgRange" name="orgRange" value="3" />
    		<input type="hidden" id=saveType name="saveType" value="0" />
    		<input type="hidden" id=productIds name="productIds" value="1,2" />
<!--     		<input type="hidden" id=productType name="productType" value="6" /> -->
    	</form>
		<div class="content-wrapper">
			<h1>渠道触点</h1>
			<div class="content">
				<div class="touchLinkWrap">
					<div class="clearfix" id="touchWrapper">
						<!-- <div class="touchLink width2 cusMgrLink" data-type="cusMgr">
							<img src="images/cusMgr.png" class="touch-icon">
							<div class=" ptitle active">
								<i class="icon"></i> <span>客户经理</span>
								<p>
									<span id="cmCount">0</span><i>(户)</i>
								</p>
								<a class="checkbox manager" href="javascript:"
									data-value="0"></a>
							</div>
						</div> -->
					</div>
					<div class="prenext-btn">
						<a href="javascript:modules.activity.prev();" data-value="3">上一步</a> 
						<a href="javascript:modules.activity.tempSave();" data-value="3">暂存</a> 
						<a href="javascript:modules.activity.next();" data-value="3">下一步</a> 
					</div>
				</div>
			</div>
		</div>

    	<script src="resource/jquery/jquery-1.9.1.min.js"></script>
    	<script src="resource/jquery/layer/layer.js"></script>
    	<script>
			//定义全局使用的layer样式
			layer.config({
				skin: 'layui-layer-ext'
			})
		</script>
    	<script src="resource/jquery/nicescroll/jquery.nicescroll.min.js"></script>
    	<script src="resource/js/json.js"></script>
    	<script src="resource/My97Date/My97DatePicker/WdatePicker.js"></script>
    	<script src="resource/My97Date/My97DatePicker/InitWdatePicker.js"></script>
    	<script src="resource/jquery/validator/dist/jquery.validator.min.js"></script>
    	<script src="resource/jquery/validator/dist/local/zh-CN.js"></script>
    	<!-- datatables表格 -->
		<script src="resource/jquery/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript">
			$.extend( $.fn.dataTable.defaults, {
				"searching": false,
			    "ordering":  false,
			    "info": false,
			    "lengthChange": false,
		    	"bAutoWidth": false,
		    	"bPaginate": true, //翻页功能
				"bLengthChange": false, //改变每页显示数据数量
				"bFilter": false, //过滤功能
				"pageLength": 10,
				"bSort": false, //排序功能
				"bInfo": false,//页脚信息
				"serverSide": true,
				"pagingType":   "full_numbers",
				"oLanguage":{   //设置中文文本 
				    "sProcessing":   "处理中...",
				    "sLengthMenu":   "显示 _MENU_ 项结果",
				    "sZeroRecords":  "没有匹配结果",
				    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
				    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
				    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
				    "sInfoPostFix":  "",
				    "sSearch":       "搜索:",
				    "sUrl":          "",
				    "sEmptyTable":     "表中数据为空",
				    "sLoadingRecords": "载入中...",
				    "sInfoThousands":  ",",
				    "oPaginate": {
				        "sFirst":    "首 页",
				        "sPrevious": "上一页",
				        "sNext":     "下一页",
				        "sLast":     "末 页"
				    },
				    "oAria": {
				        "sSortAscending":  ": 以升序排列此列",
				        "sSortDescending": ": 以降序排列此列"
				    }
				}
			});
		</script>
    	<script src="resource/jquery/triber/triber.js"></script>
    	<script src="resource/js/util.js"></script>
    	<script src="js/index.js"></script>
    	<script>
    		datas.productList = $.extend([], ${productList});//产品列表信息
    		datas.wordsListStr = $.extend([], ${wordsListStr});//话术列表信息
    		datas.DrawListStr = $.extend([], ${DrawListStr});//划配规则列表信息
    		datas.smsGatewayListStr = $.extend([], ${smsGatewayListStr});//短信网关列表信息 
    		datas.serviceChannelListStr = $.extend([],${serviceChannelListStr});//服务渠道列表
    		datas.touches = $.extend({},${activityMap});//回显触点数据
    		datas.activityId = $.extend({},${pramterMap}).activityId;
		</script>
    	<script src="js/interface.js"></script>
    </body>
</html>