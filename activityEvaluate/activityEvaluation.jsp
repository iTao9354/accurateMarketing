<%@ page contentType="text/html; charset=UTF-8" isErrorPage="true" %>
<%@ page import="com.bonc.frame.basic.util.RequestUtil" %>
<%@ page import="com.bonc.frame.basic.util.ResponseMessage" %>
<%
   String webpath = request.getContextPath();
   boolean isAjax = RequestUtil.isAjaxReq(request);
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1.0, user-scalable=yes" /> 
	<title>活动评估报告</title>
	<link rel="stylesheet" href="<%=webpath %>/static/resource/plugin/bootstrap-3.3.6/dist/css/bootstrap.min.css"></link>
	<link rel="stylesheet" href="<%=webpath %>/static/resource/plugin/triber/triber.css"></link>
	<link rel="stylesheet" href="<%=webpath %>/static/resource/css/common-layer-ext.css"></link>
	<link rel="stylesheet" href="<%=webpath %>/static/resource/css/common.css"></link>
	<link rel="stylesheet" href="<%=webpath %>/static/evl/css/activityEvaluation.css"></link>
</head>
<body>
	<div class="content">
		<div class="part basicInfo">
			<h2><span>基本信息</span></h2>
			<div class="infos">
				<p><span class="attrName actName">活动名称：</span><span class="attrVal" id="activityName">4G流量促销活动</span></p>
				<p><span class="attrName actThem">活动主题：</span><span class="attrVal" id="activityThemeName">2G换机</span></p>
				<p><span class="attrName actType">活动周期：</span><span class="attrVal" id="activityType">一次性</span></p>
				<p><span class="attrName actoriState">活动状态：</span><span class="attrVal" id="oriState">正进行</span></p>
				<p><span class="attrName actBeginDate">开始时间：</span><span class="attrVal" id="activityBeginDate">2016-06-14</span></p>
				<p><span class="attrName actEndDate">结束时间：</span><span class="attrVal" id="activityEndDate">2017-06-14</span></p>
				<p><span class="attrName actCreatName">创建人：</span><span class="attrVal" id="creatName">XXX</span></p>
				<p><span class="attrName successTypeName">成功标准：</span><span class="attrVal" id="successTypeName">换机</span></p>
				<p class="oneLine"><span class="attrName groupId">客户群提取标签/来源：</span><span class="attrVal" id="cumGroupResource">阿三打算放到手动阀手动阀手动阀手动阀手动阀大撒旦发射点发射点啊沙发上的地方</span></p>
				<p class="oneLine"><span class="attrName groupName">执行渠道：</span><span class="attrVal" id="ImplementatioChannel">客户经理</span></p>
				<p class="oneLine"><span class="attrName cumGroupResource">营销范围：</span><span class="marketingSkillVal linksType" id="orgRangeList"></span></p>
			</div>
		</div>
		<div class="part marketingExe">
			<h2><span>营销执行情况</span></h2>
			<div class="marketingSkill">
				<span class="attrName">营销触点：</span>
				<p class="marketingSkillVal linksType" id="executeWrapId"><!-- <span class="active">客户经理</span><span class="active">短信</span>--></p> 
			</div>
			<div class="discribeTxt"><form id="exe_form"><p>截止<span class="red currentDate">--</span>，营销目标用户<span class="red totalUser">--</span>位，接触用户<span class="red touchUser">--</span>位，接触率<span class="red bili">--%</span>，其中<span class="red cityDescName">石家庄、唐山、保定</span>排前三位，分别为<span class="red desc">--%、--%、--%</span>，后三位<span class="red cityAseName">石家庄、唐山、保定</span>，分别为<span class="red ase">--%、--%、--%</span>；</p></form></div>
			<div class="dataShow">
				<div class="areaWorksheetContactRateWrap col-md-4">
					<div class="oneChartWrap">
						<h3>营销范围的工单量&接触率</h3>
						<div id="areaWorksheetContactRate" class="chartWrap"></div>
					</div>
				</div>
				<div class="skillWorksheetContactRateWrap col-md-4">
					<div class="oneChartWrap">
						<h3>触点的工单量占比、接触占比</h3>
						<div id="skillWorksheetContactRate" class="chartWrap"></div>
					</div>
				</div>
				<div class="contactTendWrap col-md-4">
					<div class="oneChartWrap">
						<div>
							<h3>接触用户数日趋势：</h3>
							
							 <input id="contactBeginDate" name="contactBeginDate" readonly="readonly"  class="form-control Wdate input-sm" type="text" data-rule="required;length(0~30)" onfocus="WdatePicker({onpicked:function(){WdatePickerBlurEvt.beginTime(this)},maxDate:'#F{$dp.$D(\'contactEndDate\')||\'2020-10-01\'}'})" />
							-
							<input id="contactEndDate" name="contactEndDate" readonly="readonly"  class="form-control input-sm Wdate" type="text" data-rule="required;length(0~30)" onfocus="WdatePicker({onpicked:function(){WdatePickerBlurEvt.endTime(this)},minDate:'#F{$dp.$D(\'contactBeginDate\')||\'new Date()\'}',maxDate:'2020-10-01'})"/>
						</div>
						<div id="contactTend" class="chartWrap"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="part marketingSuccessed">
			<h2><span>营销成功情况</span></h2>
			<div class="marketingSkill">
				<span class="attrName">营销触点：</span>
				<p class="marketingSkillVal linksType" id="successWrapId"></p><!-- <span class="active">客户经理</span><span class="active">短信</span> -->
			</div>
			<div class="discribeTxt"><form id="ses_form"><p>截止<span class="red" id="ses_time">--</span>，营销目标用户<span class="red" id="ses_t_user">--</span>位，成功用户<span class="red" id="ses_s_user">--</span>位，成功率<span class="red" id="ses_e_successUser"></span><span class="red">%</span>；接触用户数<span class="red" id="ses_t_user">--</span>，接触后成功用户数<span class="red" id="ses_t_successUser">--</span>，接触后成功率<span class="red" id="ses_e_tSuccessUser"></span><span class="red">%</span>；未接触自然成功用户数<span class="red" id="ses_not_nUser">--</span>，自然办理率<span class="red" id="ses_e_nUser"></span><span class="red">%</span>；</p></form></div>
			<div class="dataShow">
				<div class="areaSuccessWrap col-md-4">
					<div class="oneChartWrap">
						<h3>营销范围的成功情况</h3>
						<div id="areaSuccess" class="chartWrap"></div>
					</div>
				</div>
				<div class="skillSuccessWrap col-md-4">
					<div class="oneChartWrap">
						<h3>不同触点接触成功占比</h3>
						<div id="skillSuccess" class="chartWrap"></div>
					</div>
				</div>
				<div class="areaSuccessAllWrap col-md-4">
					<div class="oneChartWrap">
						<h3>用户办理率各地市对比</h3>
						<div id="areaSuccessAll" class="chartWrap"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="part valuePromotion">
			<h2><span>价值提升</span></h2>
			<div class="discribeTxt" id="evIndicatorLine"><form id="ev_form"><p>截止<span class="red dataValue">2017年06月12日</span>，办理用户中出账用户占比<span class="red debtRatio">99.95</span><span class="red">%</span>，相比未办理用户出账比例<span class="red unDebtRatio">98.08</span><span class="red">%</span>，高于<span class="red deUn">1.87</span><span class="red">%</span>；办理用户中离网用户比例<span class="red awayUser">0</span><span class="red">%</span>，相比未办理用户比例<span class="red unAwayUser">0.01</span><span class="red">%</span>，低于<span class="red awayCou">0.01</span><span class="red">%</span>；</p></form></div>
			<div class="evIndicator">
				<span class="attrName">评估指标：</span>
				<p class="evIndicatorVal linksType" id="evIndicator"><!-- <span>月使用流量</span><span>ARPU</span><span>通话分钟数</span></p> -->
			</div>
			<div class="dataShow">
				<div class="indicatorChangeWrap col-md-6">
					<div class="oneChartWrap twoChartWrap">
						<h3>指标变化率对比图</h3>
						<div id="indicatorChange" class="chartWrap"></div>
					</div>
				</div>
				<div class="userTraceWarp  col-md-6">
					<div class="oneChartWrap twoChartWrap">
						<h3>营销目标用户指标变化率频数分布</h3>
						<p><span>观察月：</span><span id="observationTime"></span></p>
						<div id="userTrace" class="chartWrap"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="<%=webpath %>/static/resource/plugin/jquery/jquery-1.9.1.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/bootstrap-3.3.6/dist/js/bootstrap.min.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/frame-fix/ajax-fix.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/utils/jquery-ext.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/utils/json.js"></script> 
	<script type="text/javascript">
	    var $jQuery = $;
	    var webpath = '<%=webpath %>';
	</script>	
	<script src="<%=webpath %>/static/resource/plugin/nicescroll/jquery.nicescroll.min.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/My97Date/My97DatePicker/WdatePicker.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/My97Date/My97DatePicker/InitWdatePicker.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/layer/layer.js"></script>
	<script>
		//定义全局使用的layer样式
		layer.config({
			skin: 'layui-layer-ext'
		})
	</script>
	<script src="<%=webpath %>/static/resource/plugin/echarts3/echarts.min.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript">
		$.extend( $.fn.dataTable.defaults, {
			"searching": false,
		    "ordering":  false,
		    "info": false,
		    "lengthChange": false,
	    	"bAutoWidth": true,
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
	<script>
		var activityId= ${pramterMap}.activityId;
		var orgId= ${pramterMap}.orgId;
	</script>
	<script src="<%=webpath %>/static/resource/plugin/triber/triber.js"></script>
	<script src="<%=webpath %>/static/resource/plugin/util.js"></script>
    <script src="<%=webpath %>/static/evl/js/evaluation.js"></script>
    <%-- <script src="<%=webpath %>/static/evl/js/evaluationtest.js"></script> --%>
    <script src="<%=webpath %>/static/evl/js/evaluationInitData.js"></script>
</body>
</html>
