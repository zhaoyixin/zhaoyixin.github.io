/*
	1.用来获取元素
	2.判断某个元素是否包含某个class
	3.给元素添加class
	4.给元素删除class
*/

// 获取元素 id class tag all
function M(sele) {
	var first = sele.substr(0,1),
		isArr = sele.split(' ');  // #id .class tag
	if(first === '#' && isArr.length == 1){  //#id
		return document.getElementById(sele.substr(1));
	}else{
		var arr = Array.from(document.querySelectorAll(sele));
		return arr.length == 1 ? arr[0] : arr;
	}
}

// 判断某个元素是否包含某个class
function hasClass(obj,cls) {
	var re = new RegExp(`\\b${cls}\\b`);
	if(re.test(obj.className)){
		return true;
	}else{
		return false;
	}
}

// 给某个元素添加class
function addClass(obj,cls) {
	if(!hasClass(obj,cls)){
		obj.className += ` ${cls}`;
	}
	obj.className = obj.className.trim();
}

// 给某个元素删除class
function rmClass(obj,cls) {
	var re = new RegExp(`\\b${cls}\\b`);
	if(hasClass(obj,cls)){// aaa bbb ccc 
		obj.className = obj.className.replace(re,'').replace(/\s{2}/,' ').trim();
		console.log('移除完毕');
	}
}
