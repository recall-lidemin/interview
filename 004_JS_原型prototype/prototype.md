### 1.原型对象prototype

- 构造函数原型对象 prototype  作用
  - 解决构造函数内存浪费的问题
  - 共享方法

- 原型是一个对象，所以也称原型对象prototype

### 2.对象原型  __ proto __

- 对象身上，系统自动添加一个__proto__，他指向构造函数的原型对象，所以这样对象就能访问原型上的方法了

- ` obj.__proto__ === Object.prototype` true

### 3.constructor

- 原型对象prototype和对象原型__ proto __中都有一个constructor，他指回构造函数，记录了这个对象是由哪个构造函数创建的

- 利用这个属性手动指回构造函数

  - ```js
    Object.prototype = { 
    	constructor: 构造函数,
        func1(){},
        func2(){},
    
    }
    ```

### 4.原型对象，实例对象，构造函数的关系

- ![image-20200312173355214](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200312173355214.png)

### 5.JS的查找规则

- 按照原型链的机制查找
- 冲突时采取就近原则

### 6.原型对象的this指向

- 构造函数的this指向的是实例
- 原型对象的this指向的是调用原型方法的那个实例对象
- 最终就是谁调用指向谁

### 7.原型对象的应用---扩展内置对象

- Array.prototype.新增方法，扩展数组原型对象的方法
- 不能采取 = 的方式，不然会覆盖原来的属性方法，应该使用  .  形式