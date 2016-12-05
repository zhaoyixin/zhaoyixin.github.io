---
layout:     post
title:      "《javascript权威指南》读书笔记"
date:       2016-11-24
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

#### 词法结构

区分大小写，HTML并不区分大小写。

注释：//单行注释
     /*多行注释
     */
     
{x:1,y:2}    //对象
[1,2,3,4,5]  //数组
 
#### 值和变量

整型直接量： 0,3,100……

浮点型直接量：3.1,5,5,6,02e23……

无穷大值，基于它们的加减乘除运算结果还是无穷大值（当然还保留它们的正负号）

被0整除在javascript中不报错，它只是简单的返回Infinity或-Infinity。

0除以0是没有意义的，返回NaN。

无穷大除以无穷大，给任意负数作开方运算或者算术运算符不是数字或无法转换为数字的操作数一起使用时都将返回NaN。

下面这些值会被转换成false：undefined,null,0,-0,NaN,空字符串

typeof null   //object

undefined是预定义的全局变量，不是关键字，它的值就是“未定义”

typeof undefined   //undefined
     
null == undefined   //true

null === undefined   //false

null和undefined都是假值，都不包含任何的属性和方法

undefined“系统级”，出乎意料的或类似错误的值

null“程序级”，正常的或在意料之中的值，通常赋值给变量或者属性，或者将它们作为参数传入函数

当javascript解释器启动时，它将创建一个新的全局对象，并给它一组定义的初始属性：

- 全局属性，undefined、Infinity、NaN

- 全局函数，isNaN() parseInt() parseFloat() eval()

- 构造函数，Date() RegExp() String() Object() Array()

- 全局对象，Math JSON

null == undefined

'0' == 0   //比较之前字符串转换成数字

0 == false //比较之前布尔值转换成数字

'0' == false  //比较之前字符串和布尔值转换成数字

所有的对象继承了两个转换方法。一个是toString()，它的作用是返回一个反映这个对象的字符串

({x;1,y;2}).toString()     //[object object]

转换对象的函数：toString()  valueOf()

javascript函数里声明的所有变量（但不涉及赋值）都被“提前”至函数体的顶部

当声明一个javascript全局变量时，实际上是定义了一个全局对象的一个属性。当使用var声明一个变量时，创建的这个属性是不可配置的，也就是说这个变量是不能通过delete运算符删除。

```
var a = 1;
delete a   //false
```

如果没有使用严格模式并给一个未声明的变量赋值的话，javascript会自动创建一个全局变量。以这种方式创建的变量是全局对象的正常的可配置属性，可以删除。

```
b = 2;
delete b;   //true
```

#### 表达式和运算符

函数定义表达式：var square = function(x){return x*x;}     //返回传入参数值的平方

```
var i=1; j=++i    //i和j的值都是2，对操作符进行增量计算，并返回计算后的值

var i=1; j=i++    //i是2，j是1，对操作符进行增量计算，并返回未做增量计算的值
```

in运算符希望它的左操作数是字符串或可以转换为字符串，希望它的右侧操作数是一个对象。如果右侧的对象拥有一个名为左操作数值的属性名，则表达式返回true

```
var point = {x:1,y:2};
'x' in point;    //true
'z' in point;    //false
```

instanceof操作符希望左操作数是一个对象，右操作数标识对象的类。如果左侧的对象是右侧类的实例，则表达式返回true，否则返回false。

```
var d = new Date();
d instanceof Date;   //true
d instanceof Object;  //true
d instanceof Number;  //false
```

如果instanceof的左操作数不是对象，instanceof会返回false，如果右操作数不是函数，则抛出一个类型错误异常。

typeof是一元运算符，放在单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

delete是一元操作符，它用来删除对象属性或者数组元素。

#### 语句

全局变量是全局对象的属性，然而和其他全局对象属性不同的是，var声明的变量是无法通过delete删除的

两种函数定义写法：

- var f = function(x){return x+1;}       //将表达式赋值给一个变量

- function f(x){return x+1;}             //含有变量名的语句

函数声明的语句语法如下：

```
function funcname([arg1[,arg2[.../argn]]]){
    statements
}
```

break语句是跳转到循环或者其他语句的结束

continue语句是终止本次循环的执行并开始下一次循环的执行

return语句只能出现在函数体内，如果不是得话会报语法错误

#### 对象

对象是javascript的基本数据类型

除了包含属性之外，每个对象还拥有三个相关的对象特性：

- 对象的原型指向另外一个对象，本对象的属性继承自它的原型对象

- 对象的类是一个标识对象类型的字符串

- 对象的拓展标记指明了是否可以向该对象添加新属性

javascript中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关

访问不存在的属性不会报错，会返回undefined

如果对象不存在，试图查询这个不存在的对象的属性就会报错

```
//内置构造函数的原型是只读的
Object.prototype = o;     //赋值失败，但没报错，Object.prototype没有修改
```

#### 函数

return语句导致函数停止执行，并返回它的表达式（如果有的话）的值给调用者

如果return语句没有一个与之相关的表达式，则返回undefined值给调用者

构成函数主体的javascript代码在定义之时并不会执行，只有在调用该函数时，它们才会执行。有四种方法来调用javascript函数：

- 作为函数

- 作为方法

- 作为构造函数

- 通过它们的call()和apply()方法间接调用

在一个调用中，每个参数表达式（圆括号之间的部分）都会计算出一个值，计算的结果作为参数传递给另外一个函数

这些值作为实参传递给声明函数时定义的形参

在函数体中存在一个形参的引用，指向当前传入的实参列表，通过它可以获得参数的值












