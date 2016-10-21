---
layout:     post
title:      "妙味课堂——对象引用"
date:       2016-09-12
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

```
var a = 5;
var b = a;

b += 3;

alert(b);    //8
alert(a);    //5
```

```
var a = [1,2,3];
var b = a;

b.push(4);

alert(b);   //1,2,3,4
alert(a);   //1,2,3,4
```

对象和函数都是引用的关系

```
var a = [1,2,3];
var b = a;
b = [1,2,3,4];

alert(b);   //1,2,3,4
alert(a);   //1,2,3
```

```
var obj = {
    a : 10
}

var obj2 = obj;

obj2.a = 20;

alert(obj.a);    //20
```

```
var obj = {     
    a:10
}

function copy(obj){   //浅拷贝
    var newObj = {};
    
    for(var attr in obj){
        newObj[attr] = obj[attr];
    }
    
    return newObj;
}

function deepCopy(obj){   //深拷贝
    if(typeof obj !== 'object'){
        return obj;
    }
    
    var newObj = {};
        
    for(var attr in obj){
        newObj[attr] = obj[attr];
    }
    
    return newObj;
}

var obj2 = copy(obj);

obj2.a = 20;

alert(obj.a);   //10
```

递归

1、函数调用函数自身，执行递的动作

2、最后一次判断一个终止条件，可以执行归的工作

```
function text(n){

    if(n == 1)(
        return 1;
    )
    
    return n*text(n-1);
}

alert(text(4));
```








