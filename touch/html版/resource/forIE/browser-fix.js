/**
 * 解决ie浏览器下不支持trim方法
 * ie 6 7 8 不支持trim方法，无法去掉字符串，采用正则表达式方式进行填补
 */
if(!String.prototype.trim){
	String.prototype.trim = function () {
		return this .replace(/^\s /, '' ).replace(/\s $/, '' );
	};
}
//解决ie不支持冒泡方法
if (event == undefined ? false:(event.stopPropagation==undefined?false:event.stopPropagation)) {   
    // 针对 Mozilla 和 Opera   
    event.stopPropagation();   
}   
else if (window.event) {   
    // 针对 IE   
    window.event.cancelBubble = true;   
}

/**
 * ie下有时候console会报错引起出错
 * 金术静
 */
window.console = window.console || (function () {  
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile  
    = c.clear = c.exception = c.trace = c.assert = function () { };  
    return c;  
})();