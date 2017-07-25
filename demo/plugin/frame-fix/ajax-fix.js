/***重写ajax 错误方法，此文件依赖    frame-layer。js    layer。js*/
/***重寫了jquery的error方法，正常使用ajax即可*/

(function($){  
    //备份jquery的ajax方法  
    var _ajax=$.ajax;  
      
    //重写jquery的ajax方法  
    $.ajax=function(opt){  
        //备份opt中error和success方法  
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus){},
            beforeSend:function(jqXHR,settings){},
            complete:function(jqXHR,textStatus){}
        }  
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }  
        if(opt.beforeSend){
        	fn.beforeSend = opt.beforeSend;
        }
        if(opt.complete){
        	fn.complete = opt.complete;
        } 
          
        //扩展增强处理  
        var _opt = $.extend({  
        	ajaxLoadIndex:null,
            error:function(XMLHttpRequest, textStatus, errorThrown){ 
            	var obj  =  JSON.parse(XMLHttpRequest.responseText);
            	//错误方法增强处理
            	try{
            		console.log("ajax返回出错，走了error方法：" + obj.message);
            	}catch(err){
            	}
            },
            beforeSend:function(jqXHR,settings){
            	this.ajaxLoadIndex = layer.load(2, {
            		  shade: [0.1,'#fff'] //0.1透明度的白色背景
            	});
            },
            complete:function(jqXHR,textStatus){
            	if(this.ajaxLoadIndex!=null){
            		layer.close(this.ajaxLoadIndex);
            		this.ajaxLoadIndex = null;
            	}
            }
        },opt);  
        _ajax(_opt);  
    };  
})(jQuery);  