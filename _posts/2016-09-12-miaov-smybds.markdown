---
layout:     post
title:      "妙味课堂——函数声明与函数表达式"
date:       2016-09-12
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

函数声明：funtcion 函数名(){}

函数表达式：function 函数名（可写可不写）(){} : 命名函数表达式,匿名函数表达式

```
function aaa(){}   //函数声明

var a = function aaa(){}      //命名函数表达式

var a = function(){}          //匿名函数表达式

(function aaa(){})            //函数表达式
```

区别：

1、函数表达式可以直接后面加括号执行，而函数声明是不可以的。

2、函数声明可以被提前解析出来。








