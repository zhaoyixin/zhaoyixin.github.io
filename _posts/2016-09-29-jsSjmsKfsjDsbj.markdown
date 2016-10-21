---
layout:     post
title:      "javascript设计模式与开发实践读书笔记"
date:       2016-09-29
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

#### this

##### this的指向

出去不常用的with和eval的情况，具体到实际应用中，this的指向大致可以分为以下4种。

- 作为对象的方法调用

- 作为普通函数调用。

- 构造器调用。

- Function.prototype.call或Function.prototype.apply调用。

1、作为对象的方法调用

当函数作为对象的方法被调用时，this指向该对象：

```
var obj = {
    a:1,
    getA:function(){
        alert(this===obj);        //输出true
        alert(this.a);            //输出1
    }
};
obj.getA();
```

2、作为普通函数调用

当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的this总是指向全局对象。在浏览器的javascript里，这个全局对象就是window对象。

```
window.name = 'globalName';
var getName = function(){
    return this.name;
};
console.log(getName());         //输出globalName
或者：
window.name = 'globalName';
var myObject = {
    name:'sven',
    getName:function(){
        return this.name;
    }
};
var getName = myObject.getName;
console.log(getName());          //globalName
```

有时候我们会遇到一些困扰， 比如在 div 节点的事件函数内部， 有一个局部的 callback 方法，callback 被作为普通函数调用时， callback 内部的 this 指向了 window ，但我们往往是想让它指向该 div 节点，见如下代码：

```
<html>
    <body>
        <div id="div1">我是一个 div</div>
    </body>
    <script>
        window.id = 'window';
        document.getElementById( 'div1' ).onclick = function(){
            alert ( this.id ); // 输出：'div1'
            var callback = function(){
                alert ( this.id ); // 输出：'window'
            }
            callback();
        };
    </script>
</html>
```

此时有一种简单的解决方案，可以用一个变量保存 div 节点的引用：

```
document.getElementById( 'div1' ).onclick = function(){
    var that = this; // 保存 div 的引用
    var callback = function(){
        alert ( that.id ); // 输出：'div1'
    }
    callback();
};
```

3、构造器调用

javascript中没有类，但是可以从构造器中创建对象，同时也提供了new运算符，使得构造器看起来更像一个类。

除了宿主提供的一些内置函数，大部分javascript函数都可以当作构造器使用。构造器的外表跟普通函数一模一样，它们的区别在于被调用的方式。当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里this就指向返回的这个对象，见如下代码：

```
var MyClass = function(){
    this.name = 'sven';
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven
```

但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this ：

```
var MyClass = function(){
    this.name = 'sven';
    return{    //显式地返回一个对象
        name:'anne'
    }
};
var obj = new MyClass();
alert(obj.name);     //输出anne
```

如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述问题：

```
var MyClass = function(){
    this.name = 'sven';
    return 'anne';     //返回string类型
};
var obj = new MyClass();
alert(oj.name);     //sven
```

4、Function.prototype.call或Function.prototype.apply调用

跟普通的函数调用相比， 用 Function.prototype.call 或 Function.prototype.apply可以动态地改变传入函数的 this ：

```
var obj1 = {
    name:'sven',
    getName:function(){
        return this.name;
    }
};
var obj2 = {
    name:'anne'
};
console.log(obj1.getName());   //sven
console.log(obj1.getName.call(obj2));  //anne
```

##### 丢失的this

```
var obj = {
    myName : 'sven',
    getName : function(){
        return this.myName;
    }
};
console.log(obj.getName());    //sven
var getName2 = obj.getName;
console.log(getName2());       //undefined
```

当用另外一个变量 getName2 来引用 obj.getName ，并且调用 getName2 时，根据 2.1.2节提到的规律，此时是普通函数调用方式， this 是指向全局 window 的，所以程序的执行结果是 undefined 。

#### call和apply

ECAMScript 3给 Function 的原型定义了两个方法， 它们是 Function.prototype.call 和 Function.prototype.apply 。

apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组， apply 方法把这个集合中的元素作为参数传递给被调用的函数：

```
var func = function(a,b,c){
    alert([a,b,c]);    //[1,2,3]
};
func.apply(null,[1,2,3]);
```

call 传入的参数数量不固定， 跟 apply 相同的是， 第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数：

```
var func = function(a,b,c){
    alert([a,b,c]);    //[1,2,3]
};
func.call(null,1,2,3);
```

##### call和apply的用途

1、改变this指向

call和apply最常见的用途是改变函数内部的this指向：

```
var obj1 = {
    name:'sven'
};
var obj2 = {
    name:'anne'
};
window.name = 'window';
var getName = function(){
    alert(this.name);
};
getName();    //window
getName.call(obj1);  //sven
getName.call(obj2);  //anne
```

2、Function.prototype.bind

大部分高级浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向，即使没有原生的Function.prototype.bind实现，我们来模拟一个也不是难事：

```
Function.prototype.bind = function(context){
    var self = this;     //保存原函数
    return function(){   //返回一个新的函数
        return self.apply(context,arguments);  //执行新的函数的时候，会把之前传入的context当作新函数体内的this
    }
};
var obj = {
    name : 'sven'
};
var func = function(){
    alert(this.name);   //sven
}.bind(obj);
func();
```

3、借用其他对象的方法

借用方法的第一种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果：

```
var A = function(name){
    this.name = name;
};
var B = function(){
    A.apply(this,arguments);
};
B.prototype.getName = function(){
    return this.name;
};
var b = new B('sven');
console.log(b.getName());   //sven
```

#### 闭包

##### 变量的作用域

```
var func = function(){
    var a = 1;
    alert(a);   //1
};
func();
alert(a);    //Uncaught ReferenceError: a is not defined
```

##### 变量的生存周期

```
var func = function(){
    var a = 1;     //退出函数后局部变量a将被销毁
    alert(a);
};
func();
现在我们来看看下面这段代码：
var func = function(){
    var a = 1;
    return function(){
        a++;
        alert(a);
    }
};
var f = func():
f();    //2
f();    //3
f();    //4
f();    //5
```

当退出函数后，局部变量 a 并没有消失，而是似乎一直在某个地方存活着。这是因为当执行 var f = func(); 时， f 返回了一个匿名函数的引用，它可以访问到 func()被调用时产生的环境，而局部变量 a 一直处在这个环境里。既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。在这里产生了一个闭包结构，局部变量的生命看起来被延续了。

解决方法是在闭包的帮助下，把每次循环的 i 值都封闭起来。当在事件函数中顺着作用域链中从内到外查找变量 i 时，会先找到被封闭在闭包环境中的 i ，如果有 5个 div ，这里的 i 就分别是 0,1,2,3,4：

```
for(var i=0;i<nodes.length;i++){
    (function(i){
        nodes[i].onclick = function(){
            console.log(i);
        }
    })(i)
};
```

##### 闭包的更多作用

1、封装变量

闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量”。假设有一个计算乘积的简单函数：

```
var mult = function(){
    var a = 1;
    for(var i=0;l<arguments.length;i<l;i++){
        a = a*arguments[i];
    }
    return a;
};
```

2、延续局部变量的寿命

```
var report = (function(){
    var imgs = [];
    return function(src){
        var img = new Image();
        img.push(img);
        img.src = src;
    }
})();
```










