//ES6创建类
class Father {
    // 构造器
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    say(){
        console.log('我是父亲')
    }
    sum(){
        console.log(this.x + this.y)
    }
}

const ldh = new Father(1,2)
console.log(ldh)
ldh.say()
ldh.sum()

//ES6继承
class Son extends Father{
    constructor(x,y) {
        //super关键字会自动去调用父类的函数
        //super必须放在最前面，先调用父类的函数，才能用自己的，否则会报错
        super(x,y);
        this.x = x
        this.y = y
    }
    say(){
        console.log('我是儿子')
        //调用父类的普通函数
        super.say()
    }
}

const son = new Son(3,4)
console.log(son)
son.say()
son.sum()

// 1.ES6类没有提升，必须先定义再使用
// 2.类里面共有的属性和方法，一定要加this
