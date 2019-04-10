##ES5继承

###1、原型链实现继承

超类的实例作为子类的原型。

	// 子类
	function Sub(){
	  this.property = 'Sub Property'
	}
	Sub.prototype = new Super()
	// 注意这里new Super()生成的超类对象并没有constructor属性,故需添加上
	//否则子类的原型的constructor指向Super，而不是Sub
	Sub.prototype.constructor = Sub
优缺点：
	
	优点：父类新增的原型方法、属性，子类都能访问到
	缺点：无法实现多继承(所有的子类实例都继承同一个超类的属性方法)；
		 子类型实例不能向超类构造函数中传递参数(导致所有实例没有自己特有的属性)
	
###2、借用构造函数

子类构造函数内部调用超类构造函数，通过apply()、call()可以在新创建的对象上执行构造函数
	
	// 子类
	function Sub(name){
	  Super.call(this,name)
	  this.property = 'Sub Property'
	}
优缺点：

	优点：可传递参数
	缺点：无法继承原型链上的属性、方法(导致所有方法都在构造函数中定义，无法实现函数的复用)；
###3、组合继承

原型链继承、构造继承的结合，原型链继承实现对原型属性和方法的继承、构造继承实现对实例属性的继承，实现了函数的复用(基于原型)，又保证每个实例都有自己的属性(可传参)


	function Sub(name){
	  Super.call(this,name)
	  this.property = 'Sub Property'
	}
	Sub.prototype = new Super()
	Sub.prototype.constructor = Sub
优缺点：
	
	优点：解决了不可传参、不可函数复用问题
	缺点：子类上会拥有超类的两份属性(超类型构造函数总会调用两次)
###4、原型式继承
不需要定义一个类，传入参数obj,生成一个继承obj对象的对象

	function objectCreate(obj){
	  function F(){}
	  F.prototype = obj
	  return new F()
	}
	// 调用
    var person = {
        name:'a',
        friends:['a','b']
    }
    var person1 = objectCreate(person);
    person1.name = 'c';
    person1.friends.push('c1');
    var person2 = objectCreate(person);
    person2.name = 'd';
    person2.friends.push('d1');
	person1.name // c
	person.friends、person1.friends // ['a','b','c1','d1']

	// ES5新增Object.create规范了原型式继承
	//    接收两个参数：参数一作为新对象的原型对象；参数二可选，为新对象添加额外的属性对象。
	//    只有一个参数时，Object.create和上面的objectCreate行为相同

 ​
优缺点：

	优点：直接通过对象生成一个继承该对象的对象
	缺点：不是类式继承，而是原型式继承；
		 新创建的对象其包含引用类型的值的属性始终会共享
			(比如上面的friends属性，不像构造函数可传参，私有化属性)
		  
###5、寄生式继承
与原型式继承紧密相关，创造一个仅用于封装继承过程的函数，在函数内部以某种方式增强对象，最后返回对象

	function objectCreate(obj){
	  function F(){}
	  F.prototype = obj
	  return new F()
	}
	
	// 用于封装继承过程的函数	
	function createAnother(original){
	    var clone = objectCreate(original); // 通过调用函数创建一个新对象
	    clone.sayHi = fuuction(){           // 以某种方式来增强对象
	        alert("Hi");
	    };
	    return clone                        // 返回这个对象
	}
优缺点：
	
	优点：原型式继承的一种拓展
	缺点：依旧没有类的概念；
		 使用寄生式继承为对象添加函数，由于做不到函数复用，而降低效率；

###6、寄生组合式继承
结合寄生式继承和组合继承，实现不带两份超类属性的继承方式
	
	// 组合继承中原型链继承的改进封装-----寄生式继承
	function inheritPrototype(Super,Sub){
	  var superProtoClone = Object.Create(Super.prototype) // 原型式继承
	  superProtoClone.constructor = Sub
	  Sub.prototype = superProtoClone
	}
	function Sub(name){
	  Super.call(this,name)
	  Sub.property = 'Sub Property'
	}
	inheritPrototype(Super,Sub)
优缺点：
	
	优点：解决了组合式继承带两份属性的问题，超类构造函数只会执行一次
	缺点：过于繁琐，但仍被认为是最理想的继承方式

##ES6继承
###class-extends-super实现继承
	
	class Colorpoint extends Point {
	    constructor(x,y,color){
	        super(x,y); //调用父类的constructor(x,y)
	        this.color = color
	    }
	    toString(){
	        //调用父类的方法
	        return this.color + ' ' + super.toString(); 
	    }
	}

	同时存在两条继承链：一条实现属性继承，一条实现方法的继承
 	class A extends B{}
	A.__proto__ === B;  //继承属性
	A.prototype.__proto__ == B.prototype;	//继承方法