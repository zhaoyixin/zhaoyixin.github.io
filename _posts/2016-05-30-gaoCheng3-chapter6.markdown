---
layout:     post
title:      "javaScript高级程序设计（第三版）读书笔记——面向对象的程序设计"
date:       2016-05-30
author:     "赵祎鑫"
header-img: "img/post-bg-jquery-version.jpg"
tags:
    - 笔记
---

面向对象的语言有一个标志，那就是它们都有类的概念，而通过类可以创建多个具有相同属性和方法的对象。

ECMAScript把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”严格来说，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。正因为这样，我们可以把ECMAScript的对象想象成散列表：无非就是一组名值对，其中值可以是数据或函数。

每个对象都是基于一个引用类型创建的，这个引用类型可以是第五章讨论的原生类型，也可以是开发人员定义的类型。

#### 理解对象

创建自定义对象的最简单方式就是创建一个Object的实例，然后再为它添加属性和方法：

```
var person = new Object();
person.name = "zyx";
person.age = 25;
person.job = "it";
person.sayName = function(){
    alert(this.name);
};
```

早期的javascript开发人员经常使用这个模式创建新对戏那个。几年后，对象字面量成为创建这种对象的首选模式。

```
var person = {
    name:"zyx",
    age:25,
    job:"it",
    sayName:function(){
        alert(this.name);
    }
}
```

这个例子中的person对象与前面例子中的person对象是一样的，都有相同的属性和方法。

##### 属性类型

ECMAScript第五版在定义只有内部采用的特性时，描述了属性的各种特征。

ECMAScript中有两种属性：数据属性和访问器属性

1.数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。

 [[Configurable]] ：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为 true 。

 [[Enumerable]] ：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定
义的属性，它们的这个特性默认值为 true 。

 [[Writable]] ：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为 true 。

 [[Value]] ：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，
把新值保存在这个位置。这个特性的默认值为 undefined 。

##### 定义多个属性

由于为对象定义多个属性的可能性很大，ECMAScript5又定义了一个Object.defineproperties()方法。利用这个方法可以通过描述一次定义多个属性。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。

```
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
            }
        }
    }
});
```

#### 创建对象

虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。

##### 工厂模式

工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的规程。考虑到在ECMAScript中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节

```
function createPerson(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = createPerson("zyx",25,"it");
var person2 = createPerson("yz",24,"it");
```

函数createPerson()能够根据接受的参数来创建一个包含所有必要信息的Person对象。可以无数次地调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着javascript的发展，又一个新模式出现了。

##### 构造函数模式

ECMAScript中的构造函数可用来创建特定类型的对象。像Object和Array这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写

```
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}

var person1 = new Person("zyx",25,"it");
var person2 = new Person("yz",24,"it");
```

在这个例子中，Person()函数取代了createPerson()函数。我们注意到， Person() 中的代码除了与 createPerson() 中相同的部分外，还存在以下不同之处：
  没有显式地创建对象；
  直接将属性和方法赋给了 this 对象；
  没有 return 语句。

此外，还应该注意到函数名 Person 使用的是大写字母 P。按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。这个做法借鉴自其他 OO 语言，主要是为了区别于 ECMAScript 中的其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
(3) 执行构造函数中的代码（为这个新对象添加属性） ；
(4) 返回新对象。

在前面例子的最后， person1 和 person2 分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor （构造函数）属性，该属性指向 Person：

```
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
```

对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instanceof 操作符要更可靠一些。 我们在这个例子中创建的所有对象既是 Object 的实例， 同时也是 Person的实例，这一点通过 instanceof 操作符可以得到验证。

```
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true
```

1.将构造函数当作函数

构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么两样。例如，前面例子中定义的Person()函数可以通过下列任何一种方式来调用。

```
// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); //"Nicholas"
// 作为普通函数调用
Person("Greg", 27, "Doctor"); // 添加到 window
window.sayName(); //"Greg"
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); //"Kristen"
```

这个例子中的前两行代码展示了构造函数的典型用法， 即使用 new 操作符来创建一个新对象。 接下来的两行代码展示了不使用 new 操作符调用 Person() 会出现什么结果： 属性和方法都被添加给 window对象了。有读者可能还记得，当在全局作用域中调用一个函数时， this 对象总是指向 Global 对象（在浏览器中就是 window 对象） 。因此，在调用完函数之后，可以通过 window 对象来调用 sayName() 方法，并且还返回了 "Greg" 。最后，也可以使用 call() （或者 apply() ）在某个特殊对象的作用域中调用 Person() 函数。 这里是在对象 o 的作用域中调用的， 因此调用后 o 就拥有了所有属性和 sayName()方法。

2.构造函数的问题

构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面得例子中，person1和person2都有一个名为sayName()的方法，但那两个方法不是同一个function的实例。不要忘了——ECMAScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义。

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("alert(this.name)"); //  与声明函数在逻辑上是等价的
}
```

从这个角度上来看构造函数，更容易明白每个 Person 实例都包含一个不同的 Function 实例（以显示 name 属性）的本质。说明白些，以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍然是相同的。因此，不同实例上的同名函数是不相等的，以下代码可以证明这一点。

```
alert(person1.sayName == person2.sayName); //false
```

然而，创建两个完成同样任务的 Function 实例的确没有必要；况且有 this 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

在这个例子中，我们把 sayName() 函数的定义转移到了构造函数外部。而在构造函数内部，我们将 sayName 属性设置成等于全局的 sayName 函数。这样一来，由于 sayName 包含的是一个指向函数的指针，因此 person1 和 person2 对象就共享了在全局作用域中定义的同一个 sayName() 函数。这样做确实解决了两个函数做同一件事的问题，可是新问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在，这些问题可以通过使用原型模式来解决。

##### 原型模式

我们创建的每个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，如下面的例子所示。

```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true
```

在此，我们将 sayName() 方法和所有属性直接添加到了 Person 的 prototype 属性中，构造函数变成了空函数。即使如此，也仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。但与构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。换句话说，person1 和 person2 访问的都是同一组属性和同一个 sayName() 函数。要理解原型模式的工作原理，必须先理解 ECMAScript 中原型对象的性质。

1.理解原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。就拿前面得例子来说，Person.prototype.constructor指向Person。而通过这个构造函数，我们还可以继续为原型对象添加其他属性和方法。

创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性；至于其他方法，则都是从Object继承而来的。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ECMAScript5中管这个指针叫prototype。虽然在脚本中没有标准的方式访问 [[Prototype]] ，但 Firefox、Safari 和 Chrome 在每个对象上都支持一个属性 __proto__ ；而在其他实现中，这个属性对脚本则是完全不可见的。不过，要明确的真正重要的一点就是，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。

以前面使用 Person 构造函数和 Person.prototype创建实例的代码为例，图 6-1 展示了各个对象之间的关系。

<img src="http://zhaoyixin.xyz/img/2016-05-30-1.png"/>

图 6-1 展示了 Person 构造函数、 Person 的原型属性以及 Person 现有的两个实例之间的关系。在此， Person.prototype 指向了原型对象， 而 Person.prototype.constructor 又指回了 Person 。原型对象中除了包含 constructor 属性之外，还包括后来添加的其他属性。 Person 的每个实例——person1 和 person2 都包含一个内部属性，该属性仅仅指向了 Person.prototype ；换句话说，它们与构造函数没有直接的关系。此外，要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用 person1.sayName() 。这是通过查找对象属性的过程来实现的。

虽然在所有实现中都无法访问到 [[Prototype]] ，但可以通过 isPrototypeOf() 方法来确定对象之间是否存在这种关系。从本质上讲，如果 [[Prototype]] 指向调用 isPrototypeOf() 方法的对象（ Person.prototype ） ，那么这个方法就返回 true ，如下所示：

```
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true
```

这里，我们用原型对象的 isPrototypeOf() 方法测试了 person1 和 person2 。因为它们内部都有一个指向 Person.prototype 的指针，因此都返回了 true 。

ECMAScript 5 增加了一个新方法，叫 Object.getPrototypeOf() ，在所有支持的实现中，这个方法返回 [[Prototype]] 的值。例如：

```
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas"
```

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。也就是说，在我们调用 person1.sayName() 的时候，会先后执行两次搜索。首先，解析器会问： “实例 person1 有 sayName 属性吗？”答： “没有。 ”然后，它继续搜索，再问： “ person1 的原型有 sayName 属性吗？”答： “有。 ”于是，它就读取那个保存在原型对象中的函数。当我们调用 person2.sayName() 时，将会重现相同的搜索过程，得到相同的结果。而这正是多个对象实例共享原型所保存的属性和方法的基本原理。

前面提到过，原型最初只包含constructor属性，而该属性也是共享的，因此可以通过对象实例访问。

虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性。来看下面的例子。

```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg" —— 来自实例
alert(person2.name); //"Nicholas" —— 来自原型
```

在这个例子中， person1 的 name 被一个新值给屏蔽了。但无论访问 person1.name 还是访问person2.name 都能够正常地返回值，即分别是 "Greg" （来自对象实例）和 "Nicholas" （来自原型） 。当在 alert() 中访问 person1.name 时，需要读取它的值，因此就会在这个实例上搜索一个名为 name的属性。这个属性确实存在，于是就返回它的值而不必再搜索原型了。当以同样的方式访问 person2.name 时，并没有在实例上发现该属性，因此就会继续搜索原型，结果在那里找到了 name 属性。

当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 null ，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，如下所示。

```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person2.name); //"Nicholas"——来自原型
delete person1.name;
alert(person1.name); //"Nicholas" ——
```

在这个修改后的例子中，我们使用 delete 操作符删除了 person1.name ，之前它保存的 "Greg"值屏蔽了同名的原型属性。把它删除以后，就恢复了对原型中 name 属性的连接。因此，接下来再调用person1.name 时，返回的就是原型中 name 属性的值了。

使用 hasOwnProperty() 方法可以检测一个属性是存在于实例中， 还是存在于原型中。 这个方法 （不要忘了它是从 Object 继承来的）只在给定属性存在于对象实例中时，才会返回 true 。来看下面这个例子。

```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true
alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false
delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false
```

通过使用 hasOwnProperty() 方法，什么时候访问的是实例属性，什么时候访问的是原型属性就一清二楚了。调用 person1.hasOwnProperty( "name") 时，只有当 person1 重写 name 属性后才会返回 true ，因为只有这时候 name 才是一个实例属性，而非原型属性。

2.原型与in操作符

有两种方式使用in操作符：单独使用和在for-in循环中使用。在单独使用时，in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。

```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true

person1.name = "Greg";
alert(person1.name); //"Greg" ——来自实例
alert(person1.hasOwnProperty("name")); //true
alert("name" in person1); //true

alert(person2.name); //"Nicholas" ——来自原型
alert(person2.hasOwnProperty("name")); //false
alert("name" in person2); //true

delete person1.name;
alert(person1.name); //"Nicholas" ——来自原型
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
```

3.更简单的原型方法

前面例子中每添加一个属性和方法就要敲一遍Person.prototype。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：

```
function Person(){}

Person.prototype = {
    name:"zyx",
    age:25,
    job:"it",
    sayName:function(){
        alert(this.name);
    }
};
```

在上面的代码中，我们将Person.prototype设置为一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外：constructor属性不再指向Person了。前面曾经介绍过，每创建一个函数，就会同时创建它的prototype对象，这个对象也会自动获得constructor属性。而我们在这里使用的语法，本质上完全重写了默认的prototype对象，因此constructor属性也就变成了新对象的constructor属性（指向Object构造函数），不再指向Person函数。此时，尽管instanceof操作符还能返回正确的结果，但通过constructor已经无法确认对象的类型了：

```
var friend = new Person();

alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true
```

4.原型的动态性

由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此。

```
var friend = new Person();

Person.prototype.sayHi = function(){
    alert("hi");
};

friend.sayHi(); //"hi"（没有问题！）
```

以上代码先创建了 Person 的一个实例，并将其保存在 person 中。然后，下一条语句在 Person.prototype 中添加了一个方法 sayHi() 。即使 person 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法。 其原因可以归结为实例与原型之间的松散连接关系。 当我们调用 person.sayHi()时，首先会在实例中搜索名为 sayHi 的属性，在没找到的情况下，会继续搜索原型。因为实例与原型之间的连接只不过是一个指针，而非一个副本，因此就可以在原型中找到新的 sayHi 属性并返回保存在那里的函数。

尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是重写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时会为实例添加一个指向最初原型的[[Prototype]] 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。请记住：实例中的指针仅指向原型，而不指向构造函数。看下面的例子。

```
function Person(){
}
var friend = new Person();
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
friend.sayName(); //error
```

在这个例子中，我们先创建了 Person 的一个实例，然后又重写了其原型对象。然后在调用friend.sayName() 时发生了错误，因为 friend 指向的原型中不包含以该名字命名的属性。

5.原生对象的原型

原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（ Object 、 Array 、 String ，等等）都在其构造函数的原型上定义了方法。例如，在 Array.prototype 中可以找到 sort() 方法，而在 String.prototype 中可以找到substring() 方法，如下所示。

```
alert(typeof Array.prototype.sort); //"function"
alert(typeof String.prototype.substring); //"function"
```

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。

6.原型对象的问题

原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下豆浆取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。原型模式的最大问题是由其共享的本性所导致的。

原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说的过去，毕竟，通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就不叫突出了。

```
function Person(){
}

Person.prototype = {
constructor: Person,
name : "Nicholas",
age : 29,
job : "Software Engineer",
friends : ["Shelby", "Court"],
sayName : function () {
    alert(this.name);
}
};
var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true
```

在此，Person.prototype对象有一个名为friends的属性，该属性包含一个字符串数组。然后，创建了Person的两个实例。接着，修改了person1.friends引用的数组，向数组中添加了一个字符串。由于friends数组存在于Person.prototype而非person1中，所以刚刚提到的修改也会通过person2.friends（与person1.friends指向同一个数组）反映出来。假如我们的初衷就是像这样在所有实例中共享一个数组，那么对这个结果我没有话可说。可是，实例一般都是要有属于自己的全部属性的。而这个问题正是我们很少看到有人单独使用原型模式的原因所在。

##### 组合使用构造函数模式和原型模式

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。下面的代码重写了前面的例子：

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
constructor : Person,
sayName : function(){
alert(this.name);
}
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性constructor和方法sayName()则是在原型中定义的。而修改了person1.friends（向其中添加一个新字符串），并不会影响到person2.friends，因为它们分别引用了不同的数组。

这种构造函数与原型混成的模式，是目前在ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

#### 继承

继承时OO语言中最为人津津乐道的概念。许多OO语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。如前所述，由于函数没有签名，在ECMAScript中无法实现接口继承。ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

##### 原型链

ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

实现原型链有一种基本模式，其代码大致如下。

```
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true
```

以上代码定义了两个类型： SuperType 和 SubType 。每个类型分别有一个属性和一个方法。它们的主要区别是 SubType 继承了 SuperType ，而继承是通过创建 SuperType 的实例，并将该实例赋给SubType.prototype 实现的。实现的本质是重写原型对象，代之以一个新类型的实例。换句话说，原来存在于 SuperType 的实例中的所有属性和方法，现在也存在于 SubType.prototype 中了。在确立了继承关系之后，我们给 SubType.prototype 添加了一个方法，这样就在继承了 SuperType 的属性和方法的基础上又添加了一个新方法。

通过实现原型链，本质上扩展了本章前面介绍的原型搜索机制。读者大概还记得，当以读取模式访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上。就拿上面的例子来说，调用instance.getSuperValue() 会经历三个搜索步骤：1）搜索实例；2）搜索 SubType.prototype ；3）搜索 SuperType.prototype ，最后一步才会找到该方法。在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。







