<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%if(detailMap.containsKey("sms"))  {//判定，只有当有短信触点时，才显示
					TouchSmsInfo tsi = (TouchSmsInfo)detailMap.get("sms");
					flag = 1;
				%>
				<div class="local-SMS noElement">		    
					<ul>
					    <li>
					    	<h5>
					    		<i class="imgs message"></i>
					    		<span>本地短信</span>
					    	</h5>
					    </li>
					    <li>
					    	<span class="p-title">用户群人数：</span>
					    	<span id="sms-touch-count"><%=tsi.getSendUserNum() %></span>
					    </li>
					   	<li>
					   		<span class="p-title">是否筛选数据：</span>
					   		<span id="sms-screen-data" class="p-text"><%=tsi.getIsFilter().equals("1")?"是":"否" %></span>
					   	</li>
					   	<li class="clearfix smsFilterCondation">
					   		<span class="p-title textarea">筛选条件：</span>
					   		<p readonly="readonly" id="sms-filterCondition" class="p-text">
					   		     <%=StringUtils.isEmpty(tsi.getFilterCondition())?"暂无":tsi.getFilterCondition() %>
					   		</p>
					   	</li>
					   	<li class="clearfix">
					   		<span class="p-title textarea">发送内容：</span>
					   		<p readonly="readonly" id="sms-marketingWords" class="p-text">
					   		      <%=StringUtils.isEmpty(tsi.getMarketingWords())?"暂无": tsi.getMarketingWords()%>
					   		</p>
					   	</li>
					   	<li>
					   		<span class="p-title">测试号码：</span>
					   		<span id="sms-testPhonenum" class="p-text">
					   		      <%=StringUtils.isEmpty(tsi.getTestPhonenum())?"暂无":tsi.getTestPhonenum() %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">源地址：</span>
					   		<span id="sms-marketingUrl" class="p-text">
					   		      <%=StringUtils.isEmpty(tsi.getMarketingUrl())?"暂无":tsi.getMarketingUrl() %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">短链接：</span>
					   		<span id="sms-marketingUrlShort" class="p-text">
					   			  <%=StringUtils.isEmpty(tsi.getMarketingUrlShort())?"暂无":tsi.getMarketingUrlShort() %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">工单有效期设置：</span>
					   		<span id="sms-workorder-validity" class="p-text">
					   		     <%=tsi.getOrderInvalidDate()>0?"暂无":tsi.getOrderInvalidDate()+"&nbsp;天" %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">短信有效期设置：</span>
					   		<span id="sms-workorder-validity" class="p-text">
					   		      <%=tsi.getSmsEffectiveTime()==0?"暂无":tsi.getSmsEffectiveTime()+"&nbsp;分钟" %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">接触规则：</span>
					   		<%
					   		   JSONObject object = tsi.getTouchRuleObj();
					   		   JSONArray  array  = object.getJSONArray("touchTimes");
					   		   StringBuffer sb = new StringBuffer();
					   		   if(array.size()==0){
					   			   sb.append("暂无");
					   		   }
					   		   for(int i=0;i<array.size();i++){
					   			   JSONObject obj = array.getJSONObject(i);
					   			   sb.append("每月").append(obj.getString("sDate")).append("号~")
					   			     .append(obj.getString("eDate")).append("号，")
					   			     .append(obj.getString("sTime")).append("点~")
					   			     .append(obj.getString("sTime")).append("点，")
					   			     .append("共发送").append(obj.getString("times"))
					   			     .append("次</br>");
					   		   }
					   		%>
					   		<span id="sms-install-time" class="p-text">
					   		       <%=sb.toString() %>
					   		</span>
					   	</li>
					</ul>
				</div>
				<%}%>