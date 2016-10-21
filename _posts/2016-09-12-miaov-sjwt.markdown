---
layout:     post
title:      "妙味课堂——事件委托"
date:       2016-09-12
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

event对象：事件源 不管在哪个事件中，只要你操作的那个元素就是事件源。

ie： window.event.srcElement 
标准：event.target

nodeName：找到当前元素的标签名

事件委托：利用事件冒泡的原理，把事件加到父级上，触发执行效果

好处：

1、提高性能

2、新添加的元素，还有之前的事件

```
for (var i=0;i<aLi.length;i++){
    aLi[i].onclick = function(){
        alert('123');
    }
}

oUl.onclick = function () {
    alert('123');
}
```

```
oUl.onmouseover = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    
    if(target.nodeName.toLowerCase() == 'li'){
        target.style.background = 'red';
    }
}

oUl.onmouseout = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    
    if(target.nodeName.toLowerCase() == 'li'){
        target.style.background = '';
    }
}
```







