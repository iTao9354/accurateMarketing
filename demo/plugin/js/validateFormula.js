(function(){  
    /* 
     * 验证细分中公式
     * 2017/5/12
     * 姚林刚
     */  
    function validate(string, obj){ 
        // 剔除空白符  
        string = string.replace(/\s/g, '');  
        if(!obj||obj.length<1){
        	return false;
        }
        //将所有变量全部替换为a
        for(var i=0;i<obj.length;i++){
        	string = string.replace(obj[i],"a");
        }
        //判断括号是否匹配
        var stack = [];  
        for(var i = 0, item; i < string.length; i++){  
            item = string.charAt(i);  
            if('(' === item){  
                stack.push('(');  
            }else if(')' === item){  
                if(stack.length > 0){  
                    stack.pop();  
                }else{  
                    return false;  
                }  
            }  
        }  
        if(!validateFormule(string)){
        	return false;
        }
        return true;
    }
    
    //递归括号内表达式验证公式是否正确
    function validateFormule(string){
    	//如果有子公式，那么直接递归判断子公式，如果正确，将自公式提花为一个变量，继续判断公式
    	if(string.indexOf("(")>-1){
    		var start = string.indexOf("(");
    		var end = string.lastIndexOf(")");
    		if(!validateFormule(string.substr(start+1,end-start-1))){
    			return false;
    		}
    		string = string.replace(string.substr(start,end-start+1),"a");
    	}
    	//判断括号中的子公式是否正确公式是否正确
    	if(!validateInBrackets(string)){
			return false;
		}
		return true;
    }
    
    //判断括号中的子公式是否正确
    function validateInBrackets(string){
    	if(/^a(((AND)|(OR))a)*$/.test(string)){
    		return true;
    	}
    	return false;
    }
    
    window.triber = {validate:validate,validateInBrackets:validateInBrackets,validateFormule:validateFormule};
})();  