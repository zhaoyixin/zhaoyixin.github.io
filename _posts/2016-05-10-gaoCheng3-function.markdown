---
layout:     post
title:      "javaScript高级程序设计（第三版）读书笔记——函数"
date:       2016-05-10
author:     "赵祎鑫"
header-img: "img/post-bg-jquery-version.jpg"
tags:
    - 笔记
---

#### 函数

```
//ECMAScript函数比介意传递进来多少个参数，也不在乎传进来参数是什么数据类型。因为ECMAScript中的参数在内部是用一个数组来表示的。函数接收到的始终都是这个数组。
//在函数体内可以通过arguments对象来访问这个参数数组。从而获取传递给函数的每一个参数。
function sayHi() {
            alert('hello,'+ arguments[0]+','+arguments[1]);
        }
        sayHi('name','age');
```

```
//ECMAScript函数的另一个重要特点：命名的参数只提供便利，但不是必须的。
//在ECMAScript中，没有这些条条框框，解析器不会验证命名参数。
//下面这个函数会在每次被调用时，输出传入其中的参数个数：
function howManyArgs(){
    alert(arguments.length);
}

howManyArgs(1,2);    //2
howManyArgs();       //0
howManyArgs(3);      //1
```

```
//另一个与参数相关的重要方面，就是arguments对象可以与命名参数一同使用
function doAdd(num1,num2){
    if(arguments.length == 1){
        alert(num1+10);
    }else if(arguments.length == 2){
        alert(arguments[0]+num2);
    }
}
//因此，arguments[0]的值与num1的值相同，可以互换。
```

```
//还有一个需要注意的，那就是它的值永远与对应的命名参数的值保持同步。
function doAdd(num1,num2){
    arguments[1] = 10;
    alert(arguments[0]+num2);
}
//每次执行这个doAdd()函数都会重写第二个参数，将第二个参数的值修改为10。
//不过，这并不是说读取这两个值会访问相同的内存空间，它们的内存空间是独立的，但是它们的值会同步。
//没有传递值的命名参数将自动被赋予underfined值。
//ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数。
```

##### 没有重载

```
//ECMAScript函数不能像传统意义上那样实现重载。其他语言中，可以为一个函数编写两个定义，只要这两个定义的签名（接收的参数的类型和数量）不同即可。
//ECMAScript函数没有签名，因为其参数是由包含零或多个值的数组来表示的。而没有函数签名，真正的重载是不可能做到的。
//如果在ECMAScript中定义了两个名字相同的函数，则改名字只属于后定义的函数。
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num){
    return num + 200;
}

var result = addSomeNumber(100);    //300

```



