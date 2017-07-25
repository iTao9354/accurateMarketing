<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
    String webpath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  		<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1.0, user-scalable=yes"/>
  		<title>领导工作台</title>
  		<link rel="stylesheet" href="<%=webpath %>/static/resource/plugin/bootstrap-3.3.6/dist/css/bootstrap.min.css">
  		<link rel="stylesheet" href="<%=webpath %>/static/resource/css/common-layer-ext.css"></link>
  		<link rel="stylesheet" href="<%=webpath %>/static/resource/css/common.css"></link>
  		<link rel="stylesheet" href="<%=webpath %>/static/lwb/css/workbench/leaderWorkbench.css">
    </head>
    <body>
    	<div class="content">
    		 <div class="ptitle">
           <h1>大数据精准化营销平台</h1>
           <div class="fr txt">
                  <p>今天是2017年06月26日</p>
                  <div class="weather" style="display:none;">
                    <div class="weatherIcon fl"></div>
                    <div class="weatherTxt fl">
                      <div class="weather1"><span class="weathercp">北京</span><span class="weatherState">晴</span><span class="weatherTemp">25 &#8451;</span></div>
                      <div class="weather2"><p>空气质量：<span class="airQua">良好</span></p></div>
                    </div>
                  </div>
            </div>
         </div>
         <div class="row main">
          <div class="col-xs-3 col-sm-3 col-md-3 pleft">
            <div class="pl1 row">
            	<div class="col-xs-8 col-sm-8 col-md-8 onlineActivity">
            		<p class="onlineActivityTxt">在线营销活动</p>
            		<p class="onlineActivityCount">63</p>
            	</div>
            	<div class="col-xs-4 col-sm-4 col-md-4 onlineActivityPartition">
            		<div>
            			<p>常规营销</p>
            			<p><i class="aIcon"></i><span>30</span></p>
            		</div>
            		<div>
            			<p>场景营销</p>
            			<p><i class="aIcon"></i><span>33</span></p>
            		</div>
            	</div>
            </div>
            <div class="pl2 pthird">
            	<h2>各地市营销活动策划情况</h2>
            	<div id="pl2"></div>
            </div>
            <div class="pl3 pthird">
            	<h2>活动主题</h2>
            	<div id="pl31"></div>
            	<div id="pl32"></div>
            	<div id="pl33"></div>
            </div>
            <div class="pl4 pthird">
            	<h2>部门活动策划数排名</h2>
            	<div id="pl4" class="sortType1">
            	</div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 pcenter">
            <div class="row centerTop">
              <div class="col-xs-7 col-sm-7 col-md-7 centerTopLeft">
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4">
                  	<p class="cttitle">覆盖用户数</p>
                  	<p><span class="centerTopVal">5,062万</span><span class="centerTopUnit">户</span></p>
                  	<div class="phalf fl">
                  		<p>今日覆盖用户</p>
                  		<p>1705</p>
                  	</div>
                  	<div class="phalf fr">
                  		<p>占比率</p>
                  		<p>70%</p>
                  	</div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4">
                  	<p class="cttitle">触达用户数</p>
                  	<p><span class="centerTopVal">5,062万</span><span class="centerTopUnit">户</span></p>
                  	<div class="phalf fl">
                  		<p>今日触达数</p>
                  		<p>1705</p>
                  	</div>
                  	<div class="phalf fr">
                  		<p>占比率</p>
                  		<p>70%</p>
                  	</div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4">
                  	<p class="cttitle">营销成功数</p>
                  	<p><span class="centerTopVal">5,062万</span><span class="centerTopUnit">户</span></p>
                  	<div class="phalf fl">
                  		<p>今日营销数</p>
                  		<p>1705</p>
                  	</div>
                  	<div class="phalf fr">
                  		<p>占比率</p>
                  		<p>70%</p>
                  	</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-5 col-sm-5 col-md-5 centerTopRight">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5">
                    <p class="cttitle">营销成功总额</p>
                    <p><span class="centerTopVal">5,062人</span></p>
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-5">
                    <p class="cttitle">触达用户总额</p>
                    <p><span class="centerTopVal">5,062人</span></p>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-md-2">
                    <p class="arrowTrendWrap"><i class="arrowTrend"></i><span class="cttitle">4.5%</span></p>
                  </div>
                </div>
                <div id="totalValChart">
                </div>
              </div>
            </div>
            <div class="row centerBtm">
              <div class="col-xs-8 col-sm-8 col-md-8 centerBtmLeft">
                <div class="map" id="map"></div>
                <div class="skillData">
                  <div class="row skillTop">
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillTop1"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillTop2"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillTop3"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillTop4"></div></div>
                  </div>
                  <div class="row skillBtm">
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillBtm1"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillBtm2"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillBtm3"></div></div>
                    <div class="col-xs-3 col-sm-3 col-md-3"><div id="skillBtm4"></div></div>
                  </div>
                </div>
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 centerBtmRight">
                <div>
                  <h2>各档用户数及指标趋势</h2>
                  <div id="cbtmRight1" class="chart"></div>
                </div>
                <div>
                  <h2>各地市接触情况</h2>
                  <div id="cbtmRight2" class="chart"></div>
                </div>
                <div>
                  <h2>金牌活动排名</h2>
                  <div id="cbtmRight3" class="chart">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3 pright">
            <div>
              <h2>各地市实时接触用户数</h2>
              <div id="scene1" class="chart"></div>
            </div>
            <div>
              <h2>地市的各场景成功办理用户数</h2>
              <div id="scene2" class="chart"></div>
            </div>
            <div>
              <h2>成功办理用户数Top10</h2>
              <div id="scene3" class="chart"></div>
            </div>
          </div>
         </div>
    	</div>
		<script src="<%=webpath %>/static/resource/plugin/jquery/jquery-1.9.1.js"></script>
		<script type="text/javascript">
	    var $jQuery = $;
	    var webpath = '<%=webpath %>';
		</script>	
		<script>
		var pramterMap= ${pramterMap};
		//console.log(areaBranchData.areaBranchListX);
	    </script>
		<script src="<%=webpath %>/static/resource/plugin/echarts3/echarts.min.js"></script>
    	<script src="<%=webpath %>/static/resource/plugin/echarts3/maps/hebei.js"></script>
   		<script src="<%=webpath %>/static/resource/plugin/zrender-master/test/esl.js"></script>
		<script src="<%=webpath %>/static/lwb/js/workbench/leaderWorkbench.js"></script>
    </body>
</html>