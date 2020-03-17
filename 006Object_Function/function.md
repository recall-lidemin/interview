## 1.函数创建

- function fn(){}
- const fn = function() { }
- const fn = new Function(参数,参数,函数体)

![image-20200312182330399](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200312182330399.png)

## 2.函数调用，内部this指向

- 普通函数，() 和 call()可以调用函数 function.call( )
  - this指向window
  - 严格模式下全局作用域函数this指向undefined
- 对象方法，实例.方法()
  - 对象方法内this指向调用方法的实例对象
- 构造函数，只需要 new 就可以
  - 构造函数内this指向实例化对象
- 绑定事件函数 ，触发事件调用
  - 绑定该事件的DOM元素对象
- 定时器函数，过一段时间自己调用
  - 指向window
- 立即执行函数 ( function () { } )():立即自动调用
  - 指向window

## 3.高阶函数--回调函数

- 

## 4.高阶函数--递归

- 

## 5.函数内部属性
- this
  - this引用的是函数据以执行的环境对象
  - 这也就指明了我们应该如何确定函数内的this指向
- arguments
  - arguments有一个方法,callee()它是一个指针,指向这个arguments对象所在的函数
  - 可以用来解耦

## 6.函数的属性和方法
- 每个函数都有两个属性
  - length:表明了函数接收的参数个数
  - prototype