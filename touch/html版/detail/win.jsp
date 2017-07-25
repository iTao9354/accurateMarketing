<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%if(detailMap.containsKey("win"))  {//判定，只有当有短信触点时，才显示
					TouchWinInfo twi = (TouchWinInfo)detailMap.get("win");
					flag = 1;
					SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
				%>
				<div class="local-window noElement">		    
					<ul>
					   	<li>
					   		<h5>
					   			<i class="imgs localWindow"></i>
					   			<span>本地弹窗</span>
					   		</h5>
					   	</li>
					    <li>
					    	<span class="p-title">用户群人数：</span>
					    	<span id="window-touch-count">
					    	     <%=twi.getSendUserNum() %>
					    	</span>
					    </li>
					   	<li>
					   		<span class="p-title">筛选数据：</span>
					   		<span id="window-screen-data" class="p-text">
					   		     <%=twi.getIsFilter().equals("1")?"是":"否" %>
					   		</span>
					   	</li>
					   	<li class="clearfix filteShow">
					   		<span class="p-title textarea">是否筛选条件：</span>
					   		<p readonly="readonly" id="window-filterCondition" class="p-text">
					   		      <%=StringUtils.isEmpty(twi.getFilterCondition())?"暂无":twi.getFilterCondition() %>
					   		</p>
					   	</li>
					   	<li>
					   		<span class="p-title">服务渠道：</span>
					   		<span id="window-serviceChannel" class="p-text">
					   		      <%
					   		         StringBuffer channelStr = new StringBuffer();
					   		         Object[] channels = JsonUtils.toArray(twi.getServiceChannel());
					   		         for(int i=0;i<channels.length;i++){
					   		        	 Object obj  = channels[i];
					   		        	 String name = canalMap.get(obj.toString());
					   		        	 channelStr.append("[").append(i+1).append("]&nbsp;").append(name).append("</br>");
					   		         }
					   		      %>
					   		      <%=channelStr.toString() %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">用户状态：</span>
					   		<span id="window-userState" class="p-text">
					   		      <%=StringUtils.isEmpty(twi.getUserDescription())?"暂无":twi.getUserDescription() %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">营销目标：</span>
					   		<span id="window-marketingObjectives" class="p-text">
					   		      <%=StringUtils.isEmpty(twi.getSellTarget())?"暂无":twi.getSellTarget() %>
					   		</span>
					   	</li>
					   	<li  class="clearfix">
					   		<span class="p-title textarea">营销话术：</span>
					   		<p id="window-marketingiscourse" class="p-text">
					   		     <%=StringUtils.isEmpty(twi.getMarketingWords())?"暂无": twi.getMarketingWords()%>
					   		</p>
					   	</li>							   
					   	<li class="clearfix"> 
			    	   		<span class="p-title">营销周期：</span>
			    	   		<span class="p-text" id="window-startDate">
			    	   		    <%=sdf.format(twi.getStartTime()) %>&nbsp;&nbsp;到&nbsp;&nbsp;<%=sdf.format(twi.getEndTime()) %>
			    	   	    </span>
			    		</li>
					   	<li>
					   		<span class="p-title">优先级：</span>
					   		<span id="window-priority" class="p-text">
					   		    <%
					   		        String levelStr = "低";
					   		        int level = twi.getSendLevel();
					   		        if(level>0&&level<4){
					   		        	levelStr = "<span style=\"color:#00ff00\">低</span>";
					   		        }else if(level>=4&&level<8){
					   		        	levelStr = "<span style=\"color:#ff9900\">中</span>";
					   		        }else if(level>=8&&level<12){
					   		        	levelStr = "<span style=\"color:#ff004f\">高</span>";
					   		        }else if(level==12){
					   		        	levelStr = "<span style=\"color:#ff0017\">必弹</span>";
					   		        }else{
					   		        	levelStr = "未知级别";
					   		        }
					   		    %>
					   		    <%=levelStr %>
					   		</span>
					   	</li>
					   	<li>
					   		<span class="p-title">工单有效期：</span>
					   		<span id="win-workorder-validity" class="p-text">
					   		   <%=twi.getOrderInvalidDate()==0?"暂无":twi.getOrderInvalidDate()+"&nbsp;&nbsp;天" %>
					   		</span>
					   	</li>
					</ul>
				</div>
			    <%}%>
