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
        console.log(this)
    }
}

const ldh = new Father(1,2)
console.log(ldh)
ldh.say()
ldh.sum()

// 1.谁调用指向谁，构造函数中的this指向实例化对象
// 2.对象方法中的this指向调用方法的实例

