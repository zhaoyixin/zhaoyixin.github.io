---
layout:     post
title:      "javaScript高级程序设计（第三版）读书笔记——引用类型"
date:       2016-05-12
author:     "赵祎鑫"
header-img: "img/post-bg-jquery-version.jpg"
tags:
    - 笔记
---

引用类型的值（对象）是引用类型的一个实例。引用类型是一种数据结构，用于将数据和功能组织在一起。它也常被称为类，但这种称呼并不恰当。

如前所述，对象是某个特定引用类型的实例。新对象是使用new操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。

```
var person = new Object();
```

上面这行代码创建了Object引用类型的一个新实例。然后把该实例保存在了变量person中。使用的构造函数时Object，它只为新对象定义了默认的属性和方法。

#### Object类型

创建Object实例的方式有两种。第一种是使用new操作符后跟Object构造函数（对象字面量表示法）：

```
var person = new Object();
person.name = "zhaoyixin";
person.age = 29;
```

在使用对象字面量语法时，属性名也可以使用字符串：

```
var person = {
    "name":"zhaoyixin",
    "age":25,
    5:true
};
```

这个例子会创建一个对象，包含三个属性：name、age和5。但这里的数值属性名会自动转换为字符串。

另外，使用对象字面量语法时，如果留空其花括号，则可以定义只包含默认属性和方法的对象：

```
var person = {};          //与new Object()相同
person.name = "zhaoyixin";
person.age = 25;
```

#### Array类型

ECMAScript数组的每一项可以保存任何类型的数据。

创建数据的基本方式有两种。第一种是使用array构造函数：

```
var colors = new Array();
```

如果预先知道数组要保存的项目数量，也可以给构造函数传递该数量，而改数量会自动变成length属性的值

```
var colors = new Array(20);
```

也可以向array构造函数传递数组中应该包含的项：

```
var colors = new Array("red","blue","green");
```

创建数组的第二种基本方式是使用数组字面量表示法。数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开：

```
var colors = ["red","blue","green"];
var names = [];
var values = [1,2,];
var options = [,,,,,];
```

**与对象一样，在使用数组字面量表示法时，也不会调用array构造函数。** 

在读取和设置数组的值时，要使用方括号并提供相应值的基于0的数字索引：

```
var colors = ["red","green","blue"];
alert(colors[0]);     //red
colors[2] = "black";
colors[3] = "yellow";
```

##### 检测数组

Array.isArray()方法，用来确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的：

```
if(Array.isArray(value)){
    //对数组执行某些操作
}
```

##### 转换方法

```
var colors = ["red","blue","yellow"];
alert(colors.toAtring());    //red,blue,yellow
alert(colors.valueOf());     //red,blue,yellow
alert(colors);               //red,blue,yellow
```

在这里显示地调用了toString()方法，以便返回数组的字符串表示，每个值的字符串表示拼接成了一个字符串，中间以逗号分隔。接着调用valueOf()方法，而最后一行代码直接将数组传递给了alert()。由于alert()要接收字符串参数，所以它会在后台调用toString()方法。

如果使用join()方法，则可以使用不同的分隔符来构建这个字符串。join()方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。

```
var colors = ["red","blue","yellow"];
alert(colors.join(","));             //red,blue,yellow
alert(colors.join("||"));            //red||blue||yellow
```

如果数组中的某一项的值是null或者underfined，那么该值在join()、toLocaleString()、toString()和valueOf()方法返回的结果中以空字符串表示。

##### 栈方法

push()方法可以接收任何数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度：

```
var colors = new Array();
var count = colors.push("red","blue");
alert(count);                              //2

count = colors.push("yellow");
alert(count);                              //3
```

pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项：

```
var colors = ["red","blue","black"];
var item = colors.pop();
alert(item);                               //"black"
alert(item.length);                        //2
```

##### 队列方法

shift()方法是移除数组中的第一个项并返回该项，同时将数组长度减1：

```
var colors = new Array();
var count = colors.push("red","green");
alert(count);                                //2
    
count = colors.push("black");
alert(count);                                //3
    
var item = colors.shift();
alert(item);                                 //"red"
alert(colors.length);                        //2
```

unshift()方法能在数组前端添加任意个项并返回新数组的长度：

```
var colors = new Array();
var count = colors.push("red","green");
alert(count);                                //2

count = colors.unshift("black");
alert(count);                                //3

var item = colors.pop();
alert(item);                                 //"green"
alert(colors.length);                        //2
```

##### 重排序方法

数组中已经存在两个可以直接用来重排序的方法：reverse()和sort()。reverse()方法会反转数组项的顺序：

```
var values = [1,2,3,4,5];
values.reverse();
alert(values);            //5,4,3,2,1
```

sort()方法：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序，sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值，sort()方法比较的也是字符串：

```
var values = [0,1,5,10,15];
values.sort();
alert(values);                    //0,1,10,15,5
```

因为数值5虽然小于10，但在进行字符串比较时，"10"则位于"5"的前面，于是驻足的顺序就被修改了。因此sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。

比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数：

```
function compare(value1,value2){
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        return 1;
    }else{
        reutrn 0;
    }
}
```

这个比较函数可以适用于大多数数据类型，只要将其作为参数传递给sort()方法即可：

```
var values = [0,1,5,10,15];
values.sort(compare);
alert(values);                  //0,1,5,10,15
```

#### function类型

函数实际上是对象。每个函数都是function类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。函数通常是使用函数声明语法定义的：

```
function sum(num1,num2){
    return num1+num2;
}
```

这与下面使用函数表达式定义函数的方式几乎相差无几：

```
var sum = function(num1,num2){
    return num1+num2;
};
```

由于函数名仅仅是指向函数的指针，因此函数名与包含对象指针的其他变量没有什么不同。换句话说，一个函数可能会有多个名字：

```
function sum(num1,num2){
    return num1 + num2;
}
alert(sum(10,10));               //20

var anotherSum = sum;
alert(anotherSum(10,10));        //20

sum = null;
alert(anotherSum(10,10));        //20
```

使用不带圆括号的函数名是访问函数指针，而非调用函数。

##### 没有重载（深入理解）

将函数名想象为指针，也有助于理解为什么ECMASxript中没有函数重载的概念。

```
function addSomeNumber(num){
    return num + 100;
}

function addSomeNumber(num){
    return num + 200;
}

var result = addSomeNumber(100);         //300
```

这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面得函数。以上代码实际上与下面的代码没有什么区别：

```
var addSomeNumber = function(num){
    return num + 100;
};

addSomeNumber = function(num){
    return num + 200;
};

var result = addSomeNumber(100);         //300
```

通过观察重写之后的代码，发现，在创建第二个函数时，实际上覆盖了引用第一个函数的变量addSomeNumber。

##### 函数声明与函数表达式

解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

```
alert(sum(10,10));                //20
function sum(num1,num2){
    return num1 + num2;
}
```

以上代码完全可以正常运行。因为在代码开始执行之前，解析器就已经通过一个名为函数声明提升的过程，读取并将函数声明添加到执行环境中。对代码求值时，javascript引擎在第一遍会声明函数并将它们放到源代码树的顶部。如果像下面例子所示的，把函数声明改为等价的函数表达式，就会在执行期间导致错误。

```
alert(sum(10,10));                //报错
var sum = function(num1,num2){
    return num1 + num2;
};
```

除了什么时候可以通过变量访问函数这一点区别之外，函数声明与函数表达式的语法其实是等价的。

##### 作为值的函数

因为ECMAScript中的函数本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回：

```
function callSomeFunction(someFunction,someArgument){
    return someFunction(someArgument);
}
```

这个函数接受两个参数。第一个参数应该是一个函数，第二个参数应该是要传递给该函数的一个值。然后，就可以像下面的例子一样传递函数了。

```
function add10(num){
    reutrn num + 10;
}

var result1 = callSomeFunction(add10,10);
alert(result1);                                  //20

function getGreeting(name){
    return "Hello, " + name;
}

var result2 = callSomeFunction(getGreeting,"zyx");
alert(result2);                                  //"Hello, zyx"
```

要访问函数的指针而不执行函数的话，必须去掉函数名后面的那对圆括号。因此上面例子中传递给callSomeFunction()的是add10和getGreeting，而不是执行它们之后的结果。

##### 函数内部属性

在函数内部，有两个特殊的对象：arguments和this。其中，argyments是一个类数组对象，包含着传入函数中的所有参数。虽然arguments的主要用途是保存函数参数，但这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。请看下面这个非常经典的阶乘函数。

```
function facrorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num*facrorial(num-1)
    }
}
```

在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但问题是这个函数的执行与函数名factorial紧紧耦合在了一起。为了消除这种紧密耦合的现象，可以像下面这样使用arguments.callee

```
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num*arguments.callee(num-1)
    }
}
```

在这个重写后的factorial()函数的函数体内，没有再引用函数名factorial。这样，无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。

```
var trueFactorial = factorial;

factorial = function(){
    return 0;
};

alert(trueFactorial(5));           //120
alert(factorial(5));               //0
```

在此，变量trueFactorial获得了factorial的值，实际上是在另一个位置上保存了一个函数的指针。然后，我们又将一个简单地返回0的函数赋值给factorial变量。如果像原来的factorial()那样不使用arguments.callee，调用trueFactorial()就会返回0。可是，在解除了函数体内的代码与函数名的耦合状态之后，trueFactorial()仍然能够正常地计算阶乘；至于factorial()，它现在只是一个返回0的函数。

函数内部的另一个特殊对象是this，this引用的是函数据以执行的环境对象——或者也可以说是this值（当在网页的全局作用域中调用函数时，this对象引用的就是window）

```
window.color = "red";
var o = {color:"blue"};

function sayColor(){
    alert(this.color);
}
sayColor();                 //red

o.sayColor = sayColor;
o.sayColor();               //blue
```

上面这个函数sayColor()是在全局作用域中定义的，它引用了this对象。由于在调用函数之前，this的值并不确定，因此this可能会在代码执行过程中引用不同的对象。当在全局作用域中调用sayColor()时，this引用的是全局对象window；而当把这个函数赋给对象o并调用o.sayColor()时，this引用的是对象o。

**函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的sayColor()函数与o.sayColor()指向的仍然是同一个函数。**

##### 函数的属性和方法

ECMAScript中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接收的命名参数的个数：

```
function sayName(name){
    alert(name);
}

function sum(num1,num2){
    return num1 + num2;
}

function sayHi(){
    alert("hi");
}

alert(sayName.length);         //1
alert(sum.length);             //2
alert(sayHi.length);           //0
```

对于ECMAScript中的引用类型而言，prototype是保存它们所有实例方法的真正所在。换句话说，诸如toString()和valueOf()等方法实际上都保存在prototype名下，只不过是通过各自对象的实例访问罢了。在创建自定义引用类型以及实现继承时。prototype属性的作用是极为重要的。在ECMAScript5中，prototype属性是不可枚举的，因此使用for-in无法发现。

每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先，apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组，其中，第二个参数可以是Array的实例，也可以是arguments对象。

```
function sum(num1, num2){
    return num1 + num2;
}
function callSum1(num1, num2){
    return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]); // 传入数组
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20
```

call() 方法与 apply() 方法的作用相同，它们的区别仅在于接收参数的方式不同。对于 call()方法而言，第一个参数是 this 值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call() 方法时，传递给函数的参数必须逐个列举出来，如下面的例子所示。

```
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
alert(callSum(10,10)); //20
```

事实上，传递参数并非 apply() 和 call() 真正的用武之地；它们真正强大的地方是能够扩充函数赖以运行的作用域。下面来看一个例子：

```
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor(); //red
sayColor.call(this); //red
sayColor.call(window); //red
sayColor.call(o); //blue
```

这个例子是在前面说明 this 对象的示例基础上修改而成的。这一次， sayColor() 也是作为全局函数定义的，而且当在全局作用域中调用它时，它确实会显示 "red" ——因为对 this.color 的求值会转换成对 window.color 的求值。而 sayColor.call(this) 和 sayColor.call(window) ，则是两种显式地在全局作用域中调用函数的方式， 结果当然都会显示 "red" 。 但是， 当运行 sayColor.call(o)时， 函数的执行环境就不一样了， 因为此时函数体内的 this 对象指向了 o ， 于是结果显示的是 "blue" 。


使用 call() （或 apply() ）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。在前面例子的第一个版本中， 我们是先将 sayColor() 函数放到了对象 o 中， 然后再通过 o 来调用它的；而在这里重写的例子中，就不需要先前那个多余的步骤了。

ECMAScript 5 还定义了一个方法： bind() 。这个方法会创建一个函数的实例，其 this 值会被绑
定到传给 bind() 函数的值。例如：

```
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```

在这里， sayColor() 调用 bind() 并传入对象 o ，创建了 o bjectSayColor() 函数。 object-SayColor() 函数的 this 值等于 o ，因此即使是在全局作用域中调用这个函数，也会看到 "blue" 。

#### 基本包装类型

为了便于操作基本类型值，ECMAScript还提供了3个特殊的引用类型：Boolean、Number和string。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。

```
var s1 = "some text";
var s2 = s1.substring(2);
```

这个例子中的变量 s1 包含一个字符串，字符串当然是基本类型值。而下一行调用了 s1 的substring() 方法，并将返回的结果保存在了 s2 中。我们知道，基本类型值不是对象，因而从逻辑上讲它们不应该有方法（尽管如我们所愿，它们确实有方法） 。其实，为了让我们实现这种直观的操作，后台已经自动完成了一系列的处理。当第二行代码访问 s1 时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台都会自动完成下列处理。
(1) 创建 String 类型的一个实例；
(2) 在实例上调用指定的方法；
(3) 销毁这个实例。

引用类型和基本包装类型的主要区别就是对象的生存期。使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着我们不能再运行时为基本类型值添加属性和方法。

```
var s1 = "some text";
s1.color = "red";
alert(s1.color); //undefined
```

对基本包装类型的实例调用typeof会返回"ovject"，而且所有基本包装类型的对象都会被转换为布尔值true。

object构造函数也会像工厂方法一样，根据传入值的类型返回响应基本包装类型的实例。

```
var obj = new Object("some text");
alert(obj instanceof String);           //true
```

##### Boolean类型

Boolean类型是与布尔值对应的引用类型。要创建Boolean对象，可以像下面这样调用boolean构造函数并传入true或false值。

##### Number类型

Number是与数字值对应的引用类型。要创建Number对象，可以在调用Number构造函数时向其中传递对应的数值。

```
var numberObject = new Number(10);
```



