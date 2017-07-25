<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<% 
    String webpath = request.getContextPath();
%>
<%@ page language="java" import="java.util.Map,com.bonc.touch.entity.*,com.bonc.touch.entity.win.*
                                ,com.bonc.touch.entity.sms.*,com.bonc.touch.entity.mgr.*
                                ,com.bonc.frame.basic.util.JsonUtils,org.apache.commons.lang3.StringUtils
                                ,com.alibaba.fastjson.JSONObject,com.alibaba.fastjson.JSONArray
                                ,java.text.SimpleDateFormat,java.util.List" %>
<%
	Map<String,TouchBasicInfo> detailMap = (Map<String,TouchBasicInfo>)request.getAttribute("detail");
    Map<String,String> canalMap = (Map<String,String>)request.getAttribute("canalMap");
    int flag = 0;// 1 有数据   0 无数据
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>触点配置明细</title>
<link rel="stylesheet" href="<%=webpath %>/static/touch/css/detail/touchDetail.css">
</head>
<body>
	<div class="plan-complete">
		<div class="divBody">
			<div class="p-channel-contact">
				<h4><span><i class="icon icons-skill" ></i><span>渠道触点</span></span></h4>
				<%@include file="cusMgr.jsp" %>
				<%@include file="sms.jsp" %>
				<%@include file="win.jsp" %>
				<%if(flag==0){//如果没有触点，显示暂无数据%>
				   <p readonly="readonly" class="p-text" id="marketWord" style="margin-top:10px;margin-left:20px;">暂无数据</p>
				<%} %>
			</div>
		</div>
	</div>
</body>
</html>