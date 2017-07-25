<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
                <%if(detailMap.containsKey("cusMgr"))  {//判定，只有当有客户经理触点时，才显示
					TouchManagerInfo tmi = (TouchManagerInfo)detailMap.get("cusMgr");
					flag = 1;
				%>
				<div class="account-manager ">		  
					<ul>
					    <li>
					    	<h5>
					    		<i class="imgs manager"></i>
					    		<span>客户经理</span>
					    	</h5>
					    </li>
					    <li>
					    	<span class="p-title">用户群人数：</span>
					    	<span id="cm-touch-count"><%=tmi.getSendUserNum() %></span>
					    </li>
					  	<li>
					  		<span class="p-title">是否筛选数据：</span>
					  		<span class="p-text" id="screen-data"><%=tmi.getIsFilter().equals("1")?"是":"否" %></span>
					  	</li>
					  	<li class="clearfix manaFilterCondation">
					  		<span class="p-title textarea">筛选条件：</span>
					  		<p readonly="readonly" class="p-text" id="filterCondition">
					  		      <%=StringUtils.isEmpty(tmi.getFilterCondition())?"暂无":tmi.getFilterCondition() %>
					  		</p>
					  	</li>
					  	<li class="clearfix">
					  		<span class="p-title textarea">营销话术：</span>
					  		<p readonly="readonly"  class="p-text"  id="marketWord">
					  		      <%=StringUtils.isEmpty(tmi.getMarketingWords())?"暂无": tmi.getMarketingWords()%>
					  		</p>
					  	</li>
				  		<li class="clearfix">
					  		<span class="p-title btitle  cm-title" >工单下发规则：</span>
					  		<ol id="cm-li" style="display: inline-block;" class="p-text">
					  		    <%
					  		       StringBuffer rule = new StringBuffer();
					  		       List<TouchManagerDrawInfo> list = tmi.getManagerDrawInfolist();
					  		       if(list==null||list.size()==0){
					  		    	   rule.append("暂无");
					  		       }else{
					  		    	   for(int i=0;i<list.size();i++){
					  		    		   TouchManagerDrawInfo tdi  = list.get(i);
					  		    		   rule.append("[").append(i+1).append("]&nbsp;").append(tdi.getOrderIssuedRuleName()).append("</br>");
					  		    	   }
					  		       }
					  		    %>
					  		    <%=rule.toString()%>
					  		</ol>
					  	</li>
					  	<li>
					  		<span class="p-title">工单有效期：</span>
					  		<span id="cm-workOrderValidity">
					  		    <%=tmi.getOrderInvalidDate()>0?"暂无":tmi.getOrderInvalidDate()+"&nbsp;天" %>
					  		</span>
					  	</li>
					  	<%-- <li>
					  		<span class="p-title">接触频次定义：</span>
					  		<span id="cm-touch-define">
					  		     <%=tmi.getTouchRule() %>
					  		</span>
					  	</li> --%>
					  	<li>
					  		<span class="p-title">接触频次：  </span>
					  		<span id="cm-touch-time">
					  		      <%
					  		    	JSONObject  object = tmi.getTouchRuleObj();
					  		        JSONArray   array  = object.getJSONArray("touchTimes");
					  		        JSONObject  first  = array.getJSONObject(0);
					  		        String nums = first.getString("times");
					  		      %>
					  		      <%=StringUtils.isEmpty(nums)?"暂无":nums+"&nbsp;&nbsp;天一次" %>
					  		</span>
					  	</li>
				  	</ul>
				</div>
				<%}%>