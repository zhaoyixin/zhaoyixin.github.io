---
layout:     post
title:      "javaScript高级程序设计（第三版）读书笔记——函数表达式"
date:       2016-06-01
author:     "赵祎鑫"
header-img: "img/post-bg-jquery-version.jpg"
tags:
    - 笔记
---

函数表达式是javascript中的一个既强大又容易令人困惑的特性。定义函数的方式有两种：一种是函数声明，另一种就是函数表达式。

函数声明的语法是这样的：

```
function functionName(arg0,arg1,arg2){
    //函数体
}
```

首先是function关键字，然后是函数的名字，这就是指定函数名的方式。浏览器给函数定义了一个非标准的name属性，通过这个属性可以访问到给函数指定的名字。这个属性的值永远等于跟在function关键字后面的标识符。

```
//只在 Firefox、Safari、Chrome 和 Opera 有效
alert(functionName.name); //"functionName"
```

关于函数声明，它的一个重要特征就是函数声明提升，意思是在执行代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。

```
sayHi();
function sayHi(){
    alert("Hi!");
}
```

这个例子不会抛出错误，因为在代码执行之前会先读取函数声明。

第二种创建函数的方式是使用函数表达式。函数表达式有几种不同的语法形式。下面是最常见的一种形式：

```
var functionName = function(arg0, arg1, arg2){
    //函数体
};
```

这种形式看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量。这种情况下创建的函数叫做匿名函数，因为function关键字后面没有标识符。匿名函数的name属性是空字符串。

函数表达式与其他表达式一样，在使用前必须先赋值。以下代码会导致错误：

```
sayHi(); //错误：函数还不存在
var sayHi = function(){
    alert("Hi!");
};
```

理解函数提升的关键，就是理解函数声明与函数表达式之间的区别。

#### 递归

递归函数是在一个函数通过名字调用自身的情况下构成的，如下所示：

```
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }
}
```

这是一个经典的递归阶乘函数。虽然这个函数表面看来没什么问题，但下面的代码却可能导致它出错。

```
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //出错！
```

以上代码先把 factorial() 函数保存在变量 anotherFactorial 中，然后将 factorial 变量设置为 null ，结果指向原始函数的引用只剩下一个。但在接下来调用 anotherFactorial() 时，由于必须执行 factorial() ， 而 factorial 已经不再是函数， 所以就会导致错误。 在这种情况下， 使用 arguments.callee 可以解决这个问题。

我们知道， arguments.callee 是一个指向正在执行的函数的指针，因此可以用它来实现对函数的递归调用

```
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}
```

加粗的代码显示，通过使用 arguments.callee 代替函数名，可以确保无论怎样调用函数都不会出问题。因此，在编写递归函数时，使用 arguments.callee 总比使用函数名更保险。

但在严格模式下，不能通过脚本访问 arguments.callee ，访问这个属性会导致错误。不过，可以使用命名函数表达式来达成相同的结果。

```
var factorial = (function f(num){
    if (num <= 1){
        return 1;
    } else {
        return num * f(num-1);
    }
});
```

以上代码创建了一个名为 f() 的命名函数表达式，然后将它赋值给变量 factorial 。即便把函数赋值给了另一个变量，函数的名字 f 仍然有效，所以递归调用照样能正确完成。这种方式在严格模式和非严格模式下都行得通。

#### 闭包

有不少开发人员总是搞不清匿名函数和闭包这两个概念，因此经常混用。闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数：

```
function createComparisonFunction(propertyName) {
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}
```

在这个例子中，突出的那两行代码是内部函数（一个匿名函数）中的代码，这两行代码访问了外部函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量propertyName。之所以还能够访问这个变量，是因为内部函数的作用域链中包含createComparisonFunction() 的作用域。要彻底搞清楚其中的细节，必须从理解函数被调用的时候都会发生什么入手。

有关如何创建作用域链及作用域链有什么作用的细节，对彻底理解闭包至关重要。当某个函数被调用时，会创建一个执行环境及相应的作用域链。然后，使用arguments和其他命名参数的值来初始化函数的活动对象。但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链重点的全局执行环境。

##### 闭包与变量

作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。闭包所保存的是整个变量对象，而不是某个特殊的变量。下面这个例子可以清晰地说明这个问题。

```
function createFunctions(){
    var result = new Array();
    
    for (var i=0; i < 10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
```

这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返自己的索引值，即位置 0 的函数返回 0，位置 1 的函数返回 1，以此类推。但实际上，每个函数都返回 10。因为每个函数的作用域链中都保存着 createFunctions() 函数的活动对象，所以它们引用的都是同一个变量 i 。当createFunctions() 函数返回后，变量 i 的值是 10，此时每个函数都引用着保存变量 i 的同一个变量对象，所以在每个函数内部 i 的值都是 10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期：

```
function createFunctions(){
    var result = new Array();
    
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```

在重写了前面的 createFunctions() 函数后，每个函数就会返回各自不同的索引值了。在这个版本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋给数组。这里的匿名函数有一个参数 num ，也就是最终的函数要返回的值。在调用每个匿名函数时，我们传入了变量 i 。由于函数参数是按值传递的，所以就会将变量 i 的当前值复制给参数 num 。而在这个匿名函数内部，又创建并返回了一个访问 num 的闭包。这样一来， result 数组中的每个函数都有自己num 变量的一个副本，因此就可以返回各自不同的数值了。

##### 关于this对象

在闭包中使用this对象也可能会导致一些问题。我们知道，this 对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性，因此其 this 对象通常指向window。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
```









