---
layout:     post
title:      "javaScript高级程序设计（第三版）读书笔记——变量、作用域和内存问题"
date:       2016-05-10
author:     "赵祎鑫"
header-img: "img/post-bg-jquery-version.jpg"
tags:
    - 笔记
---

#### 基本类型和引用类型的值

ECMAScript变量可能包含两种不同数据类型的值：基本类型值和引用类型值。

基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。

基本类型值：underfined、null、boolean、number、string

引用类型值：是保存在内存中的对象。javascript不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是按引用访问的。

##### 动态的属性

```
var person = new Object();
person.name = 'zhaoyixin';
alert(person.name);   //zhaoyixin
```

如果对象不被销毁或者这个属性不被删除，则这个属性将一直存在。

但是，我们不能给基本类型的值添加属性

```
var name = 'zhaoyixin';
name.age = 27;
alert(name.age);    //underfined
```

我们为字符串name定义了一个名为age的属性，并为该属性赋值27。但在下一行访问这个属性时，发现该属性不见了。这说明我们只能给引用类型值动态地添加属性，以便将来使用。

##### 复制变量值

除了保存的方式不同之外，在从一个变量向另一个变量复制基本类型值和引用类型值时，也存在不同。如果从一个变量向另一个变量复制基本类型值，会在变量对象上创建一个新值，然后把该值复制到新变量分配的位置上。

```
var num1 = 5;
var num2 = num1;
```

在此，num1与num2是完全独立的，这两个变量可以参与任何操作而互相不受影响。

当从一个变量向另一个变量复制引用类型的值时， 同样也会将存储在变量对象中的值复制一份放到
为新变量分配的空间中。不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一
个对象。复制操作结束后，两个变量实际上将引用同一个对象。因此，改变其中一个变量，就会影响另
一个变量

```
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Nicholas";
alert(obj2.name); //"Nicholas"
```

##### 传递参数

ECMAScript中所有函数的参数都是按值传递的。在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量（即命名参数，或者用ECMAScript的概念来说，就是arguments对象中的一个元素）。在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部。

```
function addTen(num){
    num += 10;
    return num;
}

var count = 20;
var result = addTen(count);
alert(count);      //20
alert(result);     //30
```

这里的函数 addTen() 有一个参数 num ，而参数实际上是函数的局部变量。在调用这个函数时，变量 count 作为参数被传递给函数， 这个变量的值是20。 于是， 数值20被复制给参数 num 以便在 addTen()中使用。在函数内部，参数 num 的值被加上了 10，但这一变化不会影响函数外部的 count 变量。参数num 与变量 count 互不相识， 它们仅仅是具有相同的值。 假如 num 是按引用传递的话， 那么变量 count的值也将变成 30，从而反映函数内部的修改。当然，使用数值等基本类型值来说明按值传递参数比较简单，但如果使用对象，那问题就不怎么好理解了。

```
function setName(obj) {
obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas"
```

以上代码中创建一个对象，并将其保存在了变量 person 中。然后，这个变量被传递到 setName()函数中之后就被复制给了 obj 。在这个函数内部， obj 和 person 引用的是同一个对象。换句话说，即使这个变量是按值传递的， obj 也会按引用来访问同一个对象。于是，当在函数内部为 obj 添加 name属性后，函数外部的 person 也将有所反映；因为 person 指向的对象在堆内存中只有一个，而且是全局对象。有很多开发人员错误地认为：在局部作用域中修改的对象会在全局作用域中反映出来，就说明参数是按引用传递的。为了证明对象是按值传递的，我们再看一看下面这个经过修改的例子：

```
function setName(obj) {
obj.name = "Nicholas";
obj = new Object();
obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas"
```

这个例子与前一个例子的唯一区别，就是在 setName() 函数中添加了两行代码：一行代码为 obj重新定义了一个对象，另一行代码为该对象定义了一个带有不同值的 name 属性。在把 person 传递给setName() 后， 其 name 属性被设置为 "Nicholas" 。 然后， 又将一个新对象赋给变量 obj ， 同时将其 name属性设置为 "Greg" 。 如果 person 是按引用传递的， 那么 person 就会自动被修改为指向其 name 属性值为 "Greg" 的新对象。但是，当接下来再访问 person.name 时，显示的值仍然是 "Nicholas" 。这说明即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上，当在函数内部重写 obj 时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁。

##### 检测类型

typeof操作符是确定一个变量是字符串、数值、布尔值，还是underfined的最佳工具。

如果变量的值是一个对象或者null，则typeof操作符会像下面例子中所示的那样返回"object"

```
var s = "Nicholas";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
alert(typeof s); //string
alert(typeof i); //number
alert(typeof b); //boolean
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object
```

typeof是检测基本数据类型时的得力助手，检测引用数据类型用instanceof操作符

```
result = variable instanceof constructor
```

如果变量是给定引用类型的实例，那么instanceof操作符就会返回true。

```
alert(person instanceof Object);     //变量person是Object吗？
alert(colors instanceof Array);      //变量colors是Array吗？
alert(pattern instanceof RegExp);    //变量pattern是RegExp吗？
```

规矩规定，所有引用类型的值都是Object的实例，在检测一个引用类型值和object构造函数时，instanceof操作符始终会返回true，如果使用instanceof操作符检测基本类型的值，该操作符始终会返回false，因为基本类型值不是对象。

**使用typeof操作符检测函数时，该操作符会返回funtcion**

#### 执行环境及作用域

每个函数都有自己的执行环境。

全局执行环境是最外围的一个执行环境。

当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象作为变量对象。活动对象在最开始时只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

```
var color = "blue";

function changeColor(){
    if(clolor === "blue"){
        color = "red";
    }else{
        color = "blue";
    }
}

changeColor();

alert("Color is now" + color);
```

在局部作用域中定义的变量可以在局部环境中与全局变量互换使用

```
var color = "blue";

function changeColor(){
    var anotherColor = "red";
    
    function seapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        
        //这里可以访问color、anotherColor、tempColor
    }
    
    //这里可以访问anotherColor、color
    swapColors();
}
//这里只能访问color
changeColor();
```

内部环境可以通过作用域链访问所有的外部环境，但是外部环境不能访问内部环境中的任何变量和函数。

函数参数也被当作变量来对待，因此其访问规则与执行环境中的其他变量相同。

##### 延长作用域链

当执行流进入下列任何一个语句时，作用域链就会得到加长：
 * try-catch语句的catch块
 * with语句
 
##### 没有块级作用域 

```
if(true){
    var color = "blue";
}
alert(color);    //blue
```

在javascript中，if语句中的变量声明会将变量添加到当前的执行环境（在这里是全局环境）中。在使用for语句时油漆要牢记这一差异。

对于javascript来说，由for语句创建的变量即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中。

**1.声明变量**

使用var声明的变量会自动被添加到最接近的环境中。

```
function add(num1,num2){
    var sum = num1+num2;
    return sum;
}

var result = add(10,20);   //30
alert(sum);                //由于sum不是有效的变量，因此会导致错误。
```

如果省略了上面例子中的var关键字，那么当add()执行完毕后，sum变量是可以在外部访问到的。

```
function add(num1,num2){
    sum = num1+num2;
    return sum;
}

var result = add(10,20);     //30
alert(sum);                  //30
```

**2.查询标识符**

如果存在一个局部的变量的定义，则搜索会自动停止，不再进入另一个变量对象。换句话说，如果局部环境中存在着同名标识符，就不会使用位于父环境中的标识符：

```
var color = "blue";

function getColor(){
    var color = "red";
    reutrn color;
}

alert(color)          //"red"
```

