<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%   String webpath = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
    	<form action="" class="touch-form" id="JForm">
    		<!-- <input type="hidden" id="cusMgrRecId" name="recId" /> -->
			<input type="hidden" id="groupId" name="groupId" value="222" />
			<h2>
				<p>
					<i class="formTitleIcon"></i>本地短信
				</p>
			</h2>
			<div class="userCount">
				<p>
					<span class="countTxt">当前目标用户数：</span>
				</p>
				<span class="countData" id="userCount"></span> 
				<i class="iconfont cRefresh" id="userRefresh">&#xe63d;</i>
			</div>
			<table class="content-table">
				<tbody>
					<tr>
						<th>筛选数据：</th>
						<td class="filter-td">
							<input type="hidden" name="isFilter" class="hidden-inp">
							<div id="filterRadio"></div>
							<div class="filterContent form-group secondLayer" id="filterContent">
								<div>
									<span>筛选数据条件：</span>
									<textarea id="chooseCdt" name="filterCondition" class="form-control" readonly="readonly"></textarea>
									<input type="hidden" id="filterConditionSql" name="filterConditionSql" />
									<input type="hidden" id="groupSql" name="groupSql" />
									<a href="javascript:modules.toshift.setFilterCdt(2, null, 'sms', modules.toshift.secFilter);" class="text-ab">选择条件</a>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th><i class="cSign">*</i> 发送内容：</th>
						<td class="clearfix wordsWrapper">
							<input type="hidden" id="wordsInp" data-rule="required;length(1~50);" name="marketingWords">
							<div contenteditable="true" data-rule="required;length(0~100)" id="wordsContent"
						name="marketingWords" class="fl form-control"></div>
							<div class="fl wordsVariableWrap">
								<div class="wordsVariable">
									<span>话术变量：</span>
									<div class="variables" id="wordsVariable">
										<!-- <p>
											<span onclick="insertWordsVariable(this,'cm')">话术变量</span>
										</p> -->
									</div>
								</div>								
							</div>
						</td>
					</tr>
					<tr>
						<th class="plabel"><i class="cSign">*</i> 发送网关：</th>
						<td>
							<input type="hidden" name="smsGatewayCode" class="hidden-inp">
							<div id="smsGatewayCode"></div>
						</td>
					</tr>
					<tr>
						<th class="plabel">测试号码：</th>
						<td>
							<input type="text" placeholder="示例：13*********" id="testPhonenum" name="testPhonenum" class="form-control linkIpt" data-rule="mobile;integer;length(0~11)" /> 
							<a href="javascript:;" class="text-a" id="showWords">话术预览</a>
							<a href="javascript:;" class="text-a" id="sendTestSMS">发送测试</a>
							<i class="common-inquiry" data-tips="0"></i>
						</td>
					</tr>
					<tr>
						<th class="plabel">源地址：</th>
						<td> 
							<input type="text" class="form-control linkIpt" placeholder="示例：http://www.10010.com" id="marketingUrl" name="marketingUrl" />
							<a href="javascript:;" class="text-a" id="testURL">测试URL地址正确性</a>
							<a href="javascript:;" class="text-a" id="combineShortUrl">合成短链接</a>
						</td>
					</tr>
					<tr>
						<th class="plabel">短链接：</th>
						<td> 
							<input type="text" id="marketingUrlShort" name="marketingUrlShort" class="form-control linkIpt form-readonly" readonly="readonly" />
						</td>
					</tr>
					<tr>
						<th class="plabel">免打扰编码：</th>
						<td>
							<input type="text" id="smsNodisturbCode" name="smsNodisturbCode" class="form-control linkIpt" data-rule="length(0~10)" /> 
							<i class="common-inquiry" data-tips="1"></i>
						</td>
					</tr>
					<tr>
						<th class="plabel"><i class="cSign">*</i> 短信存活期：</th>
						<td>
							<input type="text" id="smsAlivePeriod" name="smsAlivePeriod" class="form-control input-sm" value="30" /> 分钟
						</td>
					</tr>
					<tr>
						<th>支持短信订购：</th>
						<td class="filter-td common-content">
							<input type="hidden" name="isSmsReply" class="hidden-inp">
							<div id="orderMsgRadio"></div>
							<div class="thirdFilterContent secondLayer">
								<div>
									<span class="plabel">短信有效时间：</span> 
									<input type="text" id="smsEffectiveTime" name="smsEffectiveTime" class="form-sm" data-rule="integer;range(1~600)" />
									<span>分钟</span>
								</div>
								<table id="thirdFilterTbl">
									<thead>
										<tr>
											<th>序号</th>
											<th>客户群筛选规则</th>
											<th>筛选后用户数</th>
											<th>匹配产品</th>
											<th>操作</th>
										</tr>
									</thead>
									<!-- <thead><tr><th class="TFtd1">序号</th><th class="TFtd2">客户群筛选规则</th><th class="TFtd3">筛选后用户数</th><th class="TFtd4">匹配产品</th><th class="TFtd6">短信订购码</th><th class="TFtd5">操作</th></tr></thead>
									<tbody>
										<tr id="1">
										<td class="TFtd1">1</td>
										<td class="TFtd2"><a class="TFcdt" href="javascript:;" onclick="openToshift(this);">选择条件</a></td>
										<td class="TFtd3"><span class="thirdFilterUserCount">0</span></td>
										<td class="TFtd4"><div class="thirdFilterProductSel"></div></td>
										<td class="TFtd6"><span class="thirdFilterReplyCode"></span></td>
										<td class="TFtd5"><a class="addThirdFilter" onclick="addThirdFilterCdt();">增加</a></td>
										</tr>
									</tbody> -->
								</table>
							</div>
						</td>
					</tr>
					<tr class="co-touch">
						<td colspan="2">
							<h2>触点协同设置</h2>
						</td>
					</tr>
					<tr>
						<th class="plabel"><i class="cSign">*</i> 工单有效期设置：</th>
						<td>
							<input type="text" id="orderInvalidDate" name="orderInvalidDate" class="form-control form-sm" /> 
							<span>天</span>
						</td>
					</tr>
					<tr>
						<th class="rule-label"><i class="cSign">*</i> 接触频次定义：</th>
						<td class="common-content">
							<div class="rulesWrap clearfix contact-times">
								<ul class="fl rules-list" id="contactWrapper">
									<!-- <li class="rules clearfix">
										<div class="fl times-setting">
											每月 <input type="text" class="form-control form-sm"> 日到 <input type="text" class="form-control form-sm"> 日 <input type="text" class="form-control form-sm"> 到 <input type="text" class="form-control form-sm">，<input type="text" class="form-control form-sm"> 天接触一次
										</div>										
										<div class="fl rule-select rule-opt"><i class="delIcon"></i></div>
									</li> -->
								</ul>
								<i class="fl addCdt" id="addContactTimes"></i>
							</div>
						</td>
						<!-- <th class="plabel">接触频次定义：</th>
						<td>
							每月<input type="text" class="form-control form-sm">日到<input type="text" class="form-control form-sm">日<input type="text" class="form-control form-sm">到<input type="text" class="form-control form-sm">，<input type="text" class="form-control form-sm">天接触一次 -->
							<!-- <input type="text" id="touchLimitDay"	name="skillLimitDay" class="form-control form-sm" /> 天接触一次 -->
						<!-- </td> -->
					</tr>
				</tbody>
			</table>
			<div class="buttonDiv clearfix">
				<button type="button" class="b-grayBtn btn-i" id="backBtn">返回</button>
				<button type="button" class="b-redBtn btn-i" onclick="touchObj.sms.confirmTouch();">确认</button>
			</div>
    	</form>


		<!-- 话术 -->
		<div class="dialog-wrap" id="verbalTrickLayer">
			<p id="wordsContext" class="words-context"></p>
		</div>

    	<script src="endpoints/js/sms.js"></script>
    </body>
</html>